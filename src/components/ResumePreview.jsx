import MinimalistTemplate from './templates/MinimalistTemplate'
import CreativeTemplate   from './templates/CreativeTemplate'
import CorporateTemplate  from './templates/CorporateTemplate'

const TEMPLATE_MAP = {
  minimalist: MinimalistTemplate,
  creative:   CreativeTemplate,
  corporate:  CorporateTemplate,
}

export default function ResumePreview({ templateId, resumeData, previewId }) {
  const Template = TEMPLATE_MAP[templateId] || MinimalistTemplate

  return (
    <div
      style={{
        background: '#f1f5f9',
        borderRadius: '12px',
        padding: '12px',
        overflow: 'hidden',
      }}
    >
      {/* Page shadow container — fills the full column width */}
      <div
        style={{
          background: 'white',
          boxShadow: '0 4px 24px rgba(0,0,0,0.12), 0 1px 4px rgba(0,0,0,0.08)',
          borderRadius: '4px',
          overflow: 'hidden',
          width: '100%',
        }}
      >
        <div id={previewId}>
          <Template data={resumeData} />
        </div>
      </div>
    </div>
  )
}
