import MinimalistTemplate from './templates/MinimalistTemplate'
import CreativeTemplate   from './templates/CreativeTemplate'
import CorporateTemplate  from './templates/CorporateTemplate'
import ExecutiveTemplate  from './templates/ExecutiveTemplate'
import TimelineTemplate   from './templates/TimelineTemplate'
import ElegantTemplate    from './templates/ElegantTemplate'
import TechTemplate       from './templates/TechTemplate'
import CompactTemplate    from './templates/CompactTemplate'

const TEMPLATE_MAP = {
  minimalist: MinimalistTemplate,
  creative:   CreativeTemplate,
  corporate:  CorporateTemplate,
  executive:  ExecutiveTemplate,
  timeline:   TimelineTemplate,
  elegant:    ElegantTemplate,
  tech:       TechTemplate,
  compact:    CompactTemplate,
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
