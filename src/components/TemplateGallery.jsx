import { useState } from 'react'
import MinimalistTemplate from './templates/MinimalistTemplate'
import CreativeTemplate   from './templates/CreativeTemplate'
import CorporateTemplate  from './templates/CorporateTemplate'
import ExecutiveTemplate  from './templates/ExecutiveTemplate'
import TimelineTemplate   from './templates/TimelineTemplate'
import ElegantTemplate    from './templates/ElegantTemplate'
import TechTemplate       from './templates/TechTemplate'
import CompactTemplate    from './templates/CompactTemplate'

const TEMPLATES = [
  {
    id: 'minimalist',
    name: 'Minimalist',
    description: 'Clean white-space design. Timeless and widely accepted.',
    tags: ['ATS Friendly', 'Clean', 'Single Column'],
    accent: '#111827',
    category: 'Simple',
    component: MinimalistTemplate,
  },
  {
    id: 'corporate',
    name: 'Corporate',
    description: 'Navy header with structured two-column layout. Executive look.',
    tags: ['Professional', 'Two Column', 'Classic'],
    accent: '#1e3a5f',
    category: 'Professional',
    component: CorporateTemplate,
  },
  {
    id: 'executive',
    name: 'Executive',
    description: 'Dark sidebar with photo avatar and gold highlights. Senior roles.',
    tags: ['Sidebar', 'Photo', 'Leadership'],
    accent: '#c9a84c',
    category: 'Professional',
    component: ExecutiveTemplate,
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'Bold purple sidebar with skill bars. Ideal for creative fields.',
    tags: ['Bold', 'Two Column', 'Modern'],
    accent: '#7c3aed',
    category: 'Modern',
    component: CreativeTemplate,
  },
  {
    id: 'timeline',
    name: 'Timeline',
    description: 'Gradient header with vertical timeline experience. Stands out.',
    tags: ['Timeline', 'Modern', 'Visual'],
    accent: '#0d9488',
    category: 'Modern',
    component: TimelineTemplate,
  },
  {
    id: 'elegant',
    name: 'Elegant',
    description: 'Serif typography with gold accents and centered layout. Refined.',
    tags: ['Serif', 'Classic', 'Centered'],
    accent: '#8b6914',
    category: 'Classic',
    component: ElegantTemplate,
  },
  {
    id: 'tech',
    name: 'Tech / Dev',
    description: 'Dark mode with code-style labels. Built for developers.',
    tags: ['Dark Mode', 'Developer', 'Modern'],
    accent: '#22d3ee',
    category: 'Modern',
    component: TechTemplate,
  },
  {
    id: 'compact',
    name: 'Compact',
    description: 'Dense single-column maximising content. Best ATS parse rate.',
    tags: ['ATS Optimized', 'Dense', 'Single Column'],
    accent: '#0f172a',
    category: 'Simple',
    component: CompactTemplate,
  },
]

const CATEGORIES = ['All', 'Simple', 'Modern', 'Professional', 'Classic']

const SAMPLE_DATA = {
  personalInfo: {
    name: 'Alex Johnson',
    email: 'alex@example.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    summary: 'Senior Software Engineer with 6+ years building scalable web applications. Led teams to deliver products used by 1M+ users. Increased performance by 40%.',
    linkedin: 'linkedin.com/in/alexjohnson',
  },
  experience: [{
    position: 'Senior Software Engineer',
    company: 'TechCorp Inc.',
    startDate: 'Jan 2021',
    endDate: '',
    current: true,
    description: 'Led development of microservices architecture\nReduced API latency by 40%\nMentored 4 junior engineers',
    achievements: [],
  }],
  education: [{
    institution: 'UC Berkeley',
    degree: 'B.S.',
    field: 'Computer Science',
    startDate: '2014',
    endDate: '2018',
  }],
  skills: {
    technical: ['React', 'Node.js', 'Python', 'AWS', 'Docker'],
    soft: ['Leadership', 'Communication'],
    languages: [],
  },
  projects: [{
    name: 'OpenMetrics',
    description: 'Real-time analytics dashboard',
    technologies: 'React, D3.js, PostgreSQL',
    link: '',
  }],
  certifications: [],
}

export default function TemplateGallery({ selected, onSelect, onNext }) {
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered = activeCategory === 'All'
    ? TEMPLATES
    : TEMPLATES.filter(t => t.category === activeCategory)

  const selectedTpl = TEMPLATES.find(t => t.id === selected)

  return (
    <div className="max-w-7xl mx-auto px-8 py-10">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Choose Your Template</h1>
        <p className="text-gray-500 text-lg">8 templates — all ATS-optimized and print-ready.</p>
      </div>

      {/* Category filter */}
      <div className="flex justify-center gap-2 mb-8 flex-wrap">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              activeCategory === cat
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-600 border border-gray-200 hover:border-blue-300 hover:text-blue-600'
            }`}
          >
            {cat}
            <span className="ml-1.5 text-xs opacity-70">
              ({cat === 'All' ? TEMPLATES.length : TEMPLATES.filter(t => t.category === cat).length})
            </span>
          </button>
        ))}
      </div>

      {/* Template grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mb-10">
        {filtered.map(tpl => {
          const Preview = tpl.component
          const isSelected = selected === tpl.id
          return (
            <div
              key={tpl.id}
              onClick={() => onSelect(tpl.id)}
              className={`group cursor-pointer rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                isSelected
                  ? 'border-blue-600 shadow-lg shadow-blue-100 scale-[1.02]'
                  : 'border-gray-200 hover:border-blue-300 hover:shadow-md'
              }`}
            >
              {/* Thumbnail */}
              <div style={{ height: '240px', overflow: 'hidden', background: '#f9fafb', position: 'relative' }}>
                <div style={{ transform: 'scale(0.3)', transformOrigin: 'top left', width: '333%', pointerEvents: 'none' }}>
                  <Preview data={SAMPLE_DATA} />
                </div>
                {isSelected && (
                  <div style={{
                    position: 'absolute', top: '8px', right: '8px',
                    background: '#2563eb', color: 'white', borderRadius: '50%',
                    width: '24px', height: '24px', display: 'flex',
                    alignItems: 'center', justifyContent: 'center', fontSize: '12px',
                  }}>✓</div>
                )}
                <div style={{
                  position: 'absolute', top: '8px', left: '8px',
                  background: 'rgba(0,0,0,0.55)', color: 'white',
                  fontSize: '9px', fontWeight: 600, padding: '2px 7px', borderRadius: '10px',
                }}>
                  {tpl.category}
                </div>
              </div>

              {/* Info */}
              <div className="p-3 bg-white">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: tpl.accent, flexShrink: 0 }} />
                  <h3 className="font-semibold text-gray-900 text-sm">{tpl.name}</h3>
                </div>
                <p className="text-gray-400 text-xs mb-2 leading-snug">{tpl.description}</p>
                <div className="flex flex-wrap gap-1">
                  {tpl.tags.slice(0, 2).map(tag => (
                    <span key={tag} className="text-xs bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* CTA */}
      <div className="flex justify-center">
        <button
          onClick={onNext}
          disabled={!selected}
          className="btn-primary px-10 py-3 text-base disabled:opacity-40"
        >
          {selectedTpl ? `Use "${selectedTpl.name}" Template →` : 'Select a Template to Continue'}
        </button>
      </div>
    </div>
  )
}
