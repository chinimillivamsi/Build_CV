import MinimalistTemplate from './templates/MinimalistTemplate'
import CreativeTemplate from './templates/CreativeTemplate'
import CorporateTemplate from './templates/CorporateTemplate'

const TEMPLATES = [
  {
    id: 'minimalist',
    name: 'Minimalist',
    description: 'Clean, white-space-focused design. Perfect for tech and design roles.',
    tags: ['ATS Optimized', 'Clean', 'Modern'],
    accent: '#111827',
    preview: MinimalistTemplate,
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'Bold sidebar with vibrant accent. Ideal for creative and product roles.',
    tags: ['Eye-catching', 'Two-Column', 'Modern'],
    accent: '#7c3aed',
    preview: CreativeTemplate,
  },
  {
    id: 'corporate',
    name: 'Corporate',
    description: 'Professional navy header with structured layout. Best for corporate roles.',
    tags: ['Professional', 'Traditional', 'Executive'],
    accent: '#1e3a5f',
    preview: CorporateTemplate,
  },
]

const SAMPLE_DATA = {
  personalInfo: {
    name: 'Alex Johnson',
    email: 'alex@example.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    summary: 'Senior Software Engineer with 6+ years building scalable web applications. Led teams to deliver products used by 1M+ users.',
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
    institution: 'University of California, Berkeley',
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
  projects: [],
  certifications: [],
}

export default function TemplateGallery({ selected, onSelect, onNext }) {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Choose Your Template</h1>
        <p className="text-gray-500 text-lg">All templates are ATS-optimized and print-ready.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {TEMPLATES.map(tpl => {
          const Preview = tpl.preview
          const isSelected = selected === tpl.id
          return (
            <div
              key={tpl.id}
              onClick={() => onSelect(tpl.id)}
              className={`group cursor-pointer rounded-2xl overflow-hidden border-2 transition-all duration-200 ${
                isSelected
                  ? 'border-blue-600 shadow-lg shadow-blue-100 scale-[1.01]'
                  : 'border-gray-200 hover:border-blue-300 hover:shadow-md'
              }`}
            >
              {/* Scaled preview thumbnail */}
              <div style={{ height: '320px', overflow: 'hidden', background: '#f9fafb', position: 'relative' }}>
                <div style={{ transform: 'scale(0.38)', transformOrigin: 'top left', width: '263%', pointerEvents: 'none' }}>
                  <Preview data={SAMPLE_DATA} />
                </div>
                {isSelected && (
                  <div style={{
                    position: 'absolute', top: '10px', right: '10px',
                    background: '#2563eb', color: 'white', borderRadius: '50%',
                    width: '28px', height: '28px', display: 'flex',
                    alignItems: 'center', justifyContent: 'center', fontSize: '14px',
                  }}>
                    ✓
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="p-4 bg-white">
                <div className="flex items-center gap-2 mb-1">
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: tpl.accent }} />
                  <h3 className="font-semibold text-gray-900">{tpl.name}</h3>
                </div>
                <p className="text-gray-500 text-sm mb-3">{tpl.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {tpl.tags.map(tag => (
                    <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="flex justify-center">
        <button
          onClick={onNext}
          disabled={!selected}
          className="btn-primary px-8 py-3 text-base disabled:opacity-40"
        >
          Use {selected ? TEMPLATES.find(t => t.id === selected)?.name : ''} Template →
        </button>
      </div>
    </div>
  )
}
