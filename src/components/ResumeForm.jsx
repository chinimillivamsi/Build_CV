import { useState } from 'react'

const TABS = [
  { id: 'personal', label: 'Personal Info', icon: '👤' },
  { id: 'experience', label: 'Experience', icon: '💼' },
  { id: 'education', label: 'Education', icon: '🎓' },
  { id: 'skills', label: 'Skills', icon: '⚡' },
  { id: 'projects', label: 'Projects', icon: '🚀' },
  { id: 'certifications', label: 'Certifications', icon: '🏆' },
]

const emptyExperience = () => ({ company: '', position: '', startDate: '', endDate: '', current: false, description: '', achievements: [''] })
const emptyEducation  = () => ({ institution: '', degree: '', field: '', startDate: '', endDate: '', gpa: '' })
const emptyProject    = () => ({ name: '', description: '', technologies: '', link: '' })
const emptyCert       = () => ({ name: '', issuer: '', date: '' })

function SkillChips({ skills, onChange, placeholder }) {
  const [input, setInput] = useState('')

  const add = () => {
    const val = input.trim()
    if (val && !skills.includes(val)) {
      onChange([...skills, val])
    }
    setInput('')
  }

  const remove = (skill) => onChange(skills.filter(s => s !== skill))

  return (
    <div>
      <div className="flex gap-2 mb-2">
        <input
          className="input-field flex-1"
          placeholder={placeholder}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); add() } }}
        />
        <button type="button" onClick={add} className="btn-secondary px-4 text-sm">Add</button>
      </div>
      <div className="flex flex-wrap gap-2">
        {skills.map((s, i) => (
          <span key={i} className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 text-sm px-3 py-1 rounded-full">
            {s}
            <button type="button" onClick={() => remove(s)} className="hover:text-red-500 leading-none text-xs">×</button>
          </span>
        ))}
      </div>
    </div>
  )
}

function AchievementList({ achievements, onChange }) {
  const update = (i, val) => {
    const next = [...achievements]
    next[i] = val
    onChange(next)
  }
  const add    = () => onChange([...achievements, ''])
  const remove = (i) => onChange(achievements.filter((_, idx) => idx !== i))

  return (
    <div>
      <label className="label">Key Achievements</label>
      {achievements.map((a, i) => (
        <div key={i} className="flex gap-2 mb-2">
          <input
            className="input-field"
            placeholder={`e.g., Increased revenue by 30% in Q3`}
            value={a}
            onChange={e => update(i, e.target.value)}
          />
          {achievements.length > 1 && (
            <button type="button" onClick={() => remove(i)} className="text-red-400 hover:text-red-600 px-2">✕</button>
          )}
        </div>
      ))}
      <button type="button" onClick={add} className="text-blue-600 hover:text-blue-700 text-sm font-medium">+ Add achievement</button>
    </div>
  )
}

// ── Tab Panels ────────────────────────────────────────────────────────────────

function PersonalTab({ data, onChange }) {
  const up = (field, val) => onChange({ ...data, [field]: val })
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div><label className="label">Full Name *</label>
          <input className="input-field" placeholder="Alex Johnson" value={data.name} onChange={e => up('name', e.target.value)} /></div>
        <div><label className="label">Email *</label>
          <input className="input-field" type="email" placeholder="alex@example.com" value={data.email} onChange={e => up('email', e.target.value)} /></div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div><label className="label">Phone</label>
          <input className="input-field" placeholder="+1 (555) 123-4567" value={data.phone} onChange={e => up('phone', e.target.value)} /></div>
        <div><label className="label">Location</label>
          <input className="input-field" placeholder="San Francisco, CA" value={data.location} onChange={e => up('location', e.target.value)} /></div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div><label className="label">LinkedIn URL</label>
          <input className="input-field" placeholder="linkedin.com/in/yourname" value={data.linkedin} onChange={e => up('linkedin', e.target.value)} /></div>
        <div><label className="label">Website / Portfolio</label>
          <input className="input-field" placeholder="yourportfolio.com" value={data.website} onChange={e => up('website', e.target.value)} /></div>
      </div>
      <div>
        <label className="label">Professional Summary</label>
        <textarea
          className="input-field resize-none"
          rows={4}
          placeholder="Write 2–3 sentences highlighting your experience, top skills, and career goal..."
          value={data.summary}
          onChange={e => up('summary', e.target.value)}
        />
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>Tip: Mention your years of experience, key skills, and biggest achievement.</span>
          <span>{data.summary?.split(/\s+/).filter(Boolean).length || 0} words</span>
        </div>
      </div>
    </div>
  )
}

function ExperienceTab({ data, onChange }) {
  const update = (i, field, val) => {
    const next = [...data]
    next[i] = { ...next[i], [field]: val }
    onChange(next)
  }
  const add    = () => onChange([...data, emptyExperience()])
  const remove = (i) => onChange(data.filter((_, idx) => idx !== i))

  return (
    <div>
      {data.map((exp, i) => (
        <div key={i} className="card p-5 mb-4 relative">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-gray-700">Position {i + 1}</h3>
            {data.length > 0 && (
              <button type="button" onClick={() => remove(i)} className="text-red-400 hover:text-red-600 text-sm">Remove</button>
            )}
          </div>
          <div className="grid grid-cols-2 gap-4 mb-3">
            <div><label className="label">Job Title *</label>
              <input className="input-field" placeholder="Senior Engineer" value={exp.position} onChange={e => update(i, 'position', e.target.value)} /></div>
            <div><label className="label">Company *</label>
              <input className="input-field" placeholder="TechCorp Inc." value={exp.company} onChange={e => update(i, 'company', e.target.value)} /></div>
          </div>
          <div className="grid grid-cols-3 gap-4 mb-3">
            <div><label className="label">Start Date</label>
              <input className="input-field" placeholder="Jan 2021" value={exp.startDate} onChange={e => update(i, 'startDate', e.target.value)} /></div>
            <div><label className="label">End Date</label>
              <input className="input-field" placeholder="Dec 2023" value={exp.endDate} disabled={exp.current} onChange={e => update(i, 'endDate', e.target.value)} /></div>
            <div className="flex items-end pb-2.5">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={exp.current} onChange={e => update(i, 'current', e.target.checked)} className="w-4 h-4 rounded accent-blue-600" />
                <span className="text-sm text-gray-600">Current role</span>
              </label>
            </div>
          </div>
          <div className="mb-3">
            <label className="label">Responsibilities (one per line)</label>
            <textarea
              className="input-field resize-none"
              rows={4}
              placeholder="- Led development of payment module&#10;- Reduced latency by 40%&#10;- Mentored 3 junior engineers"
              value={exp.description}
              onChange={e => update(i, 'description', e.target.value)}
            />
          </div>
          <AchievementList
            achievements={exp.achievements}
            onChange={val => update(i, 'achievements', val)}
          />
        </div>
      ))}
      <button type="button" onClick={add} className="w-full border-2 border-dashed border-gray-300 hover:border-blue-400 text-gray-500 hover:text-blue-600 rounded-xl py-4 text-sm font-medium transition-colors">
        + Add Work Experience
      </button>
    </div>
  )
}

function EducationTab({ data, onChange }) {
  const update = (i, field, val) => {
    const next = [...data]
    next[i] = { ...next[i], [field]: val }
    onChange(next)
  }
  const add    = () => onChange([...data, emptyEducation()])
  const remove = (i) => onChange(data.filter((_, idx) => idx !== i))

  return (
    <div>
      {data.map((edu, i) => (
        <div key={i} className="card p-5 mb-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-gray-700">Education {i + 1}</h3>
            {data.length > 1 && (
              <button type="button" onClick={() => remove(i)} className="text-red-400 hover:text-red-600 text-sm">Remove</button>
            )}
          </div>
          <div className="mb-3">
            <label className="label">Institution *</label>
            <input className="input-field" placeholder="University of California, Berkeley" value={edu.institution} onChange={e => update(i, 'institution', e.target.value)} />
          </div>
          <div className="grid grid-cols-2 gap-4 mb-3">
            <div><label className="label">Degree</label>
              <input className="input-field" placeholder="B.S. / M.S. / Ph.D." value={edu.degree} onChange={e => update(i, 'degree', e.target.value)} /></div>
            <div><label className="label">Field of Study</label>
              <input className="input-field" placeholder="Computer Science" value={edu.field} onChange={e => update(i, 'field', e.target.value)} /></div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div><label className="label">Start Year</label>
              <input className="input-field" placeholder="2018" value={edu.startDate} onChange={e => update(i, 'startDate', e.target.value)} /></div>
            <div><label className="label">End Year</label>
              <input className="input-field" placeholder="2022" value={edu.endDate} onChange={e => update(i, 'endDate', e.target.value)} /></div>
            <div><label className="label">GPA (optional)</label>
              <input className="input-field" placeholder="3.8 / 4.0" value={edu.gpa} onChange={e => update(i, 'gpa', e.target.value)} /></div>
          </div>
        </div>
      ))}
      <button type="button" onClick={add} className="w-full border-2 border-dashed border-gray-300 hover:border-blue-400 text-gray-500 hover:text-blue-600 rounded-xl py-4 text-sm font-medium transition-colors">
        + Add Education
      </button>
    </div>
  )
}

function SkillsTab({ data, onChange }) {
  const up = (field, val) => onChange({ ...data, [field]: val })
  return (
    <div className="space-y-6">
      <div>
        <label className="label text-base mb-2">Technical Skills</label>
        <p className="text-xs text-gray-400 mb-2">Type a skill and press Enter or click Add.</p>
        <SkillChips skills={data.technical || []} onChange={val => up('technical', val)} placeholder="React, Python, AWS..." />
      </div>
      <div>
        <label className="label text-base mb-2">Soft Skills</label>
        <SkillChips skills={data.soft || []} onChange={val => up('soft', val)} placeholder="Leadership, Communication..." />
      </div>
      <div>
        <label className="label text-base mb-2">Languages</label>
        <SkillChips skills={data.languages || []} onChange={val => up('languages', val)} placeholder="English (Native), Spanish (B2)..." />
      </div>
    </div>
  )
}

function ProjectsTab({ data, onChange }) {
  const update = (i, field, val) => {
    const next = [...data]
    next[i] = { ...next[i], [field]: val }
    onChange(next)
  }
  const add    = () => onChange([...data, emptyProject()])
  const remove = (i) => onChange(data.filter((_, idx) => idx !== i))

  return (
    <div>
      {data.map((proj, i) => (
        <div key={i} className="card p-5 mb-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-gray-700">Project {i + 1}</h3>
            <button type="button" onClick={() => remove(i)} className="text-red-400 hover:text-red-600 text-sm">Remove</button>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-3">
            <div><label className="label">Project Name *</label>
              <input className="input-field" placeholder="E-commerce Platform" value={proj.name} onChange={e => update(i, 'name', e.target.value)} /></div>
            <div><label className="label">Technologies Used</label>
              <input className="input-field" placeholder="React, Node.js, PostgreSQL" value={proj.technologies} onChange={e => update(i, 'technologies', e.target.value)} /></div>
          </div>
          <div className="mb-3">
            <label className="label">Description</label>
            <textarea className="input-field resize-none" rows={3}
              placeholder="Describe the project, your role, and impact..."
              value={proj.description} onChange={e => update(i, 'description', e.target.value)} />
          </div>
          <div><label className="label">Project Link (optional)</label>
            <input className="input-field" placeholder="github.com/yourusername/project" value={proj.link} onChange={e => update(i, 'link', e.target.value)} /></div>
        </div>
      ))}
      <button type="button" onClick={add} className="w-full border-2 border-dashed border-gray-300 hover:border-blue-400 text-gray-500 hover:text-blue-600 rounded-xl py-4 text-sm font-medium transition-colors">
        + Add Project
      </button>
    </div>
  )
}

function CertificationsTab({ data, onChange }) {
  const update = (i, field, val) => {
    const next = [...data]
    next[i] = { ...next[i], [field]: val }
    onChange(next)
  }
  const add    = () => onChange([...data, emptyCert()])
  const remove = (i) => onChange(data.filter((_, idx) => idx !== i))

  return (
    <div>
      {data.map((cert, i) => (
        <div key={i} className="card p-5 mb-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-gray-700">Certification {i + 1}</h3>
            <button type="button" onClick={() => remove(i)} className="text-red-400 hover:text-red-600 text-sm">Remove</button>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-1"><label className="label">Certification Name *</label>
              <input className="input-field" placeholder="AWS Solutions Architect" value={cert.name} onChange={e => update(i, 'name', e.target.value)} /></div>
            <div><label className="label">Issuing Organization</label>
              <input className="input-field" placeholder="Amazon Web Services" value={cert.issuer} onChange={e => update(i, 'issuer', e.target.value)} /></div>
            <div><label className="label">Date Earned</label>
              <input className="input-field" placeholder="Mar 2023" value={cert.date} onChange={e => update(i, 'date', e.target.value)} /></div>
          </div>
        </div>
      ))}
      <button type="button" onClick={add} className="w-full border-2 border-dashed border-gray-300 hover:border-blue-400 text-gray-500 hover:text-blue-600 rounded-xl py-4 text-sm font-medium transition-colors">
        + Add Certification
      </button>
    </div>
  )
}

// ── Main Form Component ───────────────────────────────────────────────────────

export default function ResumeForm({ resumeData, onChange, onNext, onBack }) {
  const [activeTab, setActiveTab] = useState('personal')

  const tabIndex = TABS.findIndex(t => t.id === activeTab)
  const isLast   = tabIndex === TABS.length - 1

  const updateSection = (section, val) => onChange({ ...resumeData, [section]: val })

  const nextTab = () => {
    if (isLast) onNext()
    else setActiveTab(TABS[tabIndex + 1].id)
  }
  const prevTab = () => {
    if (tabIndex === 0) onBack()
    else setActiveTab(TABS[tabIndex - 1].id)
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-1">Build Your Resume</h2>
        <p className="text-gray-500">Fill in your details — the preview updates in real-time.</p>
      </div>

      {/* Tab nav */}
      <div className="flex gap-1 bg-gray-100 rounded-xl p-1 mb-6 overflow-x-auto">
        {TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
              activeTab === tab.id
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Active panel */}
      <div className="animate-fade-in-up">
        {activeTab === 'personal'       && <PersonalTab       data={resumeData.personalInfo}    onChange={val => updateSection('personalInfo', val)} />}
        {activeTab === 'experience'     && <ExperienceTab     data={resumeData.experience}      onChange={val => updateSection('experience', val)} />}
        {activeTab === 'education'      && <EducationTab      data={resumeData.education}       onChange={val => updateSection('education', val)} />}
        {activeTab === 'skills'         && <SkillsTab         data={resumeData.skills}          onChange={val => updateSection('skills', val)} />}
        {activeTab === 'projects'       && <ProjectsTab       data={resumeData.projects}        onChange={val => updateSection('projects', val)} />}
        {activeTab === 'certifications' && <CertificationsTab data={resumeData.certifications}  onChange={val => updateSection('certifications', val)} />}
      </div>

      {/* Footer nav */}
      <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
        <button onClick={prevTab} className="btn-secondary">
          ← {tabIndex === 0 ? 'Back to Templates' : 'Previous'}
        </button>
        <div className="flex items-center gap-2 text-sm text-gray-400">
          {TABS.map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full transition-colors ${i === tabIndex ? 'bg-blue-600' : 'bg-gray-200'}`}
            />
          ))}
        </div>
        <button onClick={nextTab} className="btn-primary">
          {isLast ? 'Preview & Analyze →' : 'Next →'}
        </button>
      </div>
    </div>
  )
}
