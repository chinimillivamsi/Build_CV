// ─── ATS Scoring Engine ──────────────────────────────────────────────────────

const ACTION_VERBS = [
  'achieved','accelerated','administered','analyzed','architected','automated',
  'built','coached','collaborated','coordinated','created','customized',
  'delivered','designed','developed','directed','drove','enhanced',
  'established','evaluated','executed','expanded','facilitated','generated',
  'grew','guided','identified','implemented','improved','increased','initiated',
  'integrated','launched','led','managed','mentored','migrated','minimized',
  'optimized','orchestrated','oversaw','partnered','pioneered','produced',
  'reduced','refactored','resolved','scaled','shipped','simplified',
  'spearheaded','streamlined','strengthened','supervised','transformed',
  'unified','utilized','validated',
]

const WEAK_PHRASES = [
  'responsible for','worked on','helped with','assisted with','participated in',
  'involved in','worked with','duties included','tasks included','knowledge of',
  'familiar with','exposure to','experience with',
]

const TECH_KEYWORDS = [
  // Languages
  'javascript','typescript','python','java','c++','c#','go','rust','ruby','swift',
  'kotlin','scala','php','r','matlab','sql','html','css','bash','shell',
  // Frameworks/Libraries
  'react','angular','vue','nextjs','node','express','django','flask','spring',
  'fastapi','rails','laravel','graphql','rest','grpc',
  // Cloud/DevOps
  'aws','azure','gcp','docker','kubernetes','terraform','ci/cd','jenkins',
  'github actions','ansible','helm','linux','nginx','redis','kafka',
  // Data
  'machine learning','deep learning','nlp','pytorch','tensorflow','spark',
  'hadoop','tableau','power bi','elasticsearch','mongodb','postgresql',
  // Soft
  'agile','scrum','kanban','leadership','communication','problem solving',
  'cross-functional','stakeholder','roadmap','strategy',
]

const NUMBER_REGEX = /\b\d+[%$kKmMbB]?\b|\b\d+x\b/

function countWords(text) {
  return text ? text.trim().split(/\s+/).filter(Boolean).length : 0
}

function extractText(resumeData) {
  const parts = []
  const r = resumeData

  if (r.personalInfo?.summary) parts.push(r.personalInfo.summary)

  ;(r.experience || []).forEach(exp => {
    if (exp.description) parts.push(exp.description)
    ;(exp.achievements || []).forEach(a => parts.push(a))
  })

  ;(r.projects || []).forEach(p => {
    if (p.description) parts.push(p.description)
  })

  ;(r.skills?.technical || []).forEach(s => parts.push(s))
  ;(r.skills?.soft || []).forEach(s => parts.push(s))

  ;(r.certifications || []).forEach(c => {
    if (c.name) parts.push(c.name)
  })

  return parts.join(' ').toLowerCase()
}

// ── Scorers ──────────────────────────────────────────────────────────────────

function scoreContactInfo(personalInfo) {
  const fields = ['name','email','phone','location']
  const filled = fields.filter(f => personalInfo?.[f]?.trim())
  const base = Math.round((filled.length / fields.length) * 10)

  const bonus = [personalInfo?.linkedin, personalInfo?.website].filter(Boolean).length * 2
  return { score: Math.min(base + bonus, 12), max: 12 }
}

function scoreStructure(resumeData) {
  let score = 0
  const max = 25
  const issues = []

  // Required sections
  if (resumeData.personalInfo?.summary?.trim()?.length > 30) score += 5
  else issues.push({ type: 'error', msg: 'Add a professional summary (30+ words).' })

  if ((resumeData.experience || []).length > 0) score += 6
  else issues.push({ type: 'error', msg: 'Work experience section is empty.' })

  if ((resumeData.education || []).length > 0) score += 4
  else issues.push({ type: 'warning', msg: 'Add your educational background.' })

  const skills = [
    ...(resumeData.skills?.technical || []),
    ...(resumeData.skills?.soft || []),
  ]
  if (skills.length >= 5) score += 5
  else if (skills.length > 0) score += 2
  else issues.push({ type: 'error', msg: 'Add at least 5 skills.' })

  if ((resumeData.projects || []).length > 0) score += 3
  else issues.push({ type: 'info', msg: 'Projects section can strengthen your resume.' })

  if ((resumeData.certifications || []).length > 0) score += 2

  return { score: Math.min(score, max), max, issues }
}

function scoreKeywords(text) {
  const max = 30
  let found = 0

  TECH_KEYWORDS.forEach(kw => {
    if (text.includes(kw.toLowerCase())) found++
  })

  // Normalize: 20+ keywords = full score
  const score = Math.round(Math.min(found / 20, 1) * max)
  const missing = TECH_KEYWORDS.filter(kw => !text.includes(kw.toLowerCase())).slice(0, 8)

  return { score, max, foundCount: found, missing }
}

function scoreActionVerbs(text) {
  const max = 15
  const found = ACTION_VERBS.filter(v => text.includes(v))
  const score = Math.round(Math.min(found.length / 8, 1) * max)
  const missing = ACTION_VERBS.filter(v => !text.includes(v)).slice(0, 5)

  return { score, max, found, missing }
}

function scoreQuantification(resumeData) {
  const max = 10
  let hits = 0
  const issues = []

  ;(resumeData.experience || []).forEach(exp => {
    const text = [exp.description, ...(exp.achievements || [])].join(' ')
    if (NUMBER_REGEX.test(text)) hits++
  })

  ;(resumeData.projects || []).forEach(p => {
    if (NUMBER_REGEX.test(p.description || '')) hits++
  })

  if (hits === 0) {
    issues.push({ type: 'error', msg: 'Add measurable results (e.g., "Increased sales by 30%").' })
  } else if (hits < 3) {
    issues.push({ type: 'warning', msg: `Add more quantifiable achievements (found ${hits}, aim for 5+).` })
  }

  const score = Math.round(Math.min(hits / 5, 1) * max)
  return { score, max, hits, issues }
}

function scoreWeakLanguage(text) {
  const max = 8
  const found = WEAK_PHRASES.filter(p => text.includes(p))
  const penalty = Math.min(found.length * 2, max)
  const score = max - penalty
  const issues = found.map(p => ({
    type: 'warning',
    msg: `Replace weak phrase "${p}" with a strong action verb.`,
  }))
  return { score, max, issues }
}

function scoreLength(resumeData) {
  const text = extractText(resumeData)
  const words = countWords(text)
  const max = 5
  let score = 0

  if (words >= 150 && words <= 700) score = 5
  else if (words >= 80) score = 3
  else if (words > 0) score = 1

  const issues = []
  if (words < 150) issues.push({ type: 'warning', msg: `Resume is too brief (${words} words). Aim for 150–700 words.` })
  if (words > 700) issues.push({ type: 'info', msg: `Resume may be too long (${words} words). Keep it concise for ATS.` })

  return { score, max, words, issues }
}

// ── Main scorer ───────────────────────────────────────────────────────────────

export function calculateATSScore(resumeData) {
  const text = extractText(resumeData)

  const contact    = scoreContactInfo(resumeData.personalInfo)
  const structure  = scoreStructure(resumeData)
  const keywords   = scoreKeywords(text)
  const verbs      = scoreActionVerbs(text)
  const quantify   = scoreQuantification(resumeData)
  const weakLang   = scoreWeakLanguage(text)
  const length     = scoreLength(resumeData)

  const total = Math.min(
    contact.score + structure.score + keywords.score +
    verbs.score + quantify.score + weakLang.score + length.score,
    100
  )

  const allIssues = [
    ...structure.issues,
    ...quantify.issues,
    ...weakLang.issues,
    ...length.issues,
  ]

  // Build suggestions
  const suggestions = []

  if (keywords.foundCount < 10) {
    suggestions.push({
      category: 'Keywords',
      priority: 'high',
      suggestion: `Add more industry keywords. Try including: ${keywords.missing.slice(0,5).join(', ')}.`,
    })
  }

  if (verbs.found.length < 5) {
    suggestions.push({
      category: 'Impact Language',
      priority: 'high',
      suggestion: `Start bullet points with strong action verbs like: ${verbs.missing.slice(0,4).join(', ')}.`,
    })
  }

  allIssues.forEach(issue => {
    if (issue.type === 'error') {
      suggestions.push({ category: 'Structure', priority: 'high', suggestion: issue.msg })
    } else if (issue.type === 'warning') {
      suggestions.push({ category: 'Content', priority: 'medium', suggestion: issue.msg })
    } else {
      suggestions.push({ category: 'Enhancement', priority: 'low', suggestion: issue.msg })
    }
  })

  if (!resumeData.personalInfo?.linkedin) {
    suggestions.push({
      category: 'Contact',
      priority: 'medium',
      suggestion: 'Add your LinkedIn profile URL to increase credibility.',
    })
  }

  if ((resumeData.skills?.technical || []).length < 8) {
    suggestions.push({
      category: 'Skills',
      priority: 'medium',
      suggestion: 'List 8–15 technical skills relevant to your target role.',
    })
  }

  return {
    total,
    breakdown: {
      contactInfo:   { score: contact.score,   max: contact.max,   label: 'Contact Info' },
      structure:     { score: structure.score,  max: structure.max,  label: 'Structure' },
      keywords:      { score: keywords.score,   max: keywords.max,   label: 'Keywords' },
      actionVerbs:   { score: verbs.score,      max: verbs.max,      label: 'Action Verbs' },
      quantification:{ score: quantify.score,   max: quantify.max,   label: 'Quantification' },
      language:      { score: weakLang.score,   max: weakLang.max,   label: 'Strong Language' },
      length:        { score: length.score,     max: length.max,     label: 'Length' },
    },
    suggestions: suggestions.sort((a, b) => {
      const order = { high: 0, medium: 1, low: 2 }
      return order[a.priority] - order[b.priority]
    }),
    meta: {
      wordCount: length.words,
      keywordsFound: keywords.foundCount,
      actionVerbsFound: verbs.found.length,
    },
  }
}

export function getScoreColor(score) {
  if (score >= 80) return { text: 'text-emerald-600', bg: 'bg-emerald-50', ring: '#10b981', label: 'Excellent' }
  if (score >= 60) return { text: 'text-blue-600',    bg: 'bg-blue-50',    ring: '#3b82f6', label: 'Good' }
  if (score >= 40) return { text: 'text-amber-600',   bg: 'bg-amber-50',   ring: '#f59e0b', label: 'Fair' }
  return                  { text: 'text-red-600',     bg: 'bg-red-50',     ring: '#ef4444', label: 'Needs Work' }
}
