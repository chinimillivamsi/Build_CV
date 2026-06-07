// Netlify serverless function – mirrors the client-side ATS scorer
// POST /api/ats-score  body: { resumeData }

const ACTION_VERBS = [
  'achieved','accelerated','administered','analyzed','architected','automated',
  'built','coached','collaborated','created','delivered','designed','developed',
  'drove','enhanced','established','executed','expanded','generated','grew',
  'implemented','improved','increased','initiated','integrated','launched',
  'led','managed','mentored','migrated','optimized','orchestrated','pioneered',
  'produced','reduced','refactored','scaled','shipped','spearheaded','streamlined',
  'supervised','transformed','unified',
]

const TECH_KEYWORDS = [
  'javascript','typescript','python','java','c++','c#','go','rust','ruby',
  'sql','html','css','react','angular','vue','nextjs','node','express',
  'django','flask','spring','graphql','rest','aws','azure','gcp','docker',
  'kubernetes','terraform','linux','redis','kafka','machine learning',
  'deep learning','nlp','pytorch','tensorflow','spark','mongodb','postgresql',
  'agile','scrum','leadership','communication',
]

const NUMBER_REGEX = /\b\d+[%$kKmMbB]?\b|\b\d+x\b/

function extractText(resumeData) {
  const parts = []
  const r = resumeData
  if (r.personalInfo?.summary) parts.push(r.personalInfo.summary)
  ;(r.experience || []).forEach(exp => {
    if (exp.description) parts.push(exp.description)
    ;(exp.achievements || []).forEach(a => parts.push(a))
  })
  ;(r.projects || []).forEach(p => { if (p.description) parts.push(p.description) })
  ;(r.skills?.technical || []).forEach(s => parts.push(s))
  ;(r.skills?.soft || []).forEach(s => parts.push(s))
  return parts.join(' ').toLowerCase()
}

function score(resumeData) {
  const text = extractText(resumeData)
  const r = resumeData
  let total = 0
  const suggestions = []

  // Contact (12 pts)
  const contactFields = ['name', 'email', 'phone', 'location']
  const contactScore = contactFields.filter(f => r.personalInfo?.[f]?.trim()).length * 3
  total += contactScore

  // Summary (10 pts)
  const summaryWords = (r.personalInfo?.summary || '').split(/\s+/).filter(Boolean).length
  if (summaryWords >= 30) total += 10
  else if (summaryWords > 0) { total += 4; suggestions.push({ priority: 'high', category: 'Summary', suggestion: 'Expand your summary to at least 30 words.' }) }
  else suggestions.push({ priority: 'high', category: 'Summary', suggestion: 'Add a professional summary section.' })

  // Experience (15 pts)
  const expCount = (r.experience || []).length
  if (expCount > 0) total += 15
  else suggestions.push({ priority: 'high', category: 'Structure', suggestion: 'Work experience section is missing.' })

  // Education (8 pts)
  if ((r.education || []).length > 0) total += 8
  else suggestions.push({ priority: 'medium', category: 'Structure', suggestion: 'Add your education history.' })

  // Skills (10 pts)
  const skillCount = [...(r.skills?.technical || []), ...(r.skills?.soft || [])].length
  if (skillCount >= 8) total += 10
  else if (skillCount >= 4) { total += 6; suggestions.push({ priority: 'medium', category: 'Skills', suggestion: 'Add more skills (aim for 8+).' }) }
  else suggestions.push({ priority: 'high', category: 'Skills', suggestion: 'Skills section needs more entries.' })

  // Keywords (25 pts)
  const kFound = TECH_KEYWORDS.filter(k => text.includes(k)).length
  total += Math.round(Math.min(kFound / 15, 1) * 25)
  if (kFound < 8) suggestions.push({ priority: 'high', category: 'Keywords', suggestion: `Add more industry keywords (found ${kFound}, aim for 15+).` })

  // Action verbs (10 pts)
  const vFound = ACTION_VERBS.filter(v => text.includes(v)).length
  total += Math.round(Math.min(vFound / 6, 1) * 10)
  if (vFound < 4) suggestions.push({ priority: 'high', category: 'Impact Language', suggestion: 'Use strong action verbs to begin bullet points.' })

  // Quantification (10 pts)
  let qHits = 0
  ;(r.experience || []).forEach(exp => {
    if (NUMBER_REGEX.test([exp.description, ...(exp.achievements||[])].join(' '))) qHits++
  })
  total += Math.round(Math.min(qHits / 4, 1) * 10)
  if (qHits === 0) suggestions.push({ priority: 'high', category: 'Quantification', suggestion: 'Add measurable results (e.g., "Improved performance by 40%").' })

  return { total: Math.min(total, 100), suggestions }
}

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method Not Allowed' }) }
  }

  let body
  try {
    body = JSON.parse(event.body)
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid JSON body' }) }
  }

  const { resumeData } = body
  if (!resumeData) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Missing resumeData' }) }
  }

  const result = score(resumeData)

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify(result),
  }
}
