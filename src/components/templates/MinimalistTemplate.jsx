export default function MinimalistTemplate({ data }) {
  const r = data || {}
  const pi = r.personalInfo || {}

  const SectionTitle = ({ children }) => (
    <div className="mb-3">
      <h2 style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#6b7280', marginBottom: '6px' }}>
        {children}
      </h2>
      <div style={{ height: '1px', background: '#e5e7eb' }} />
    </div>
  )

  return (
    <div
      style={{
        fontFamily: "'Inter', system-ui, sans-serif",
        fontSize: '11px',
        color: '#111827',
        background: 'white',
        padding: '40px 48px',
        minHeight: '297mm',
        width: '100%',
        lineHeight: 1.5,
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 700, color: '#111827', marginBottom: '8px', letterSpacing: '-0.02em' }}>
          {pi.name || 'Your Name'}
        </h1>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', color: '#6b7280', fontSize: '10.5px' }}>
          {pi.email    && <span>{pi.email}</span>}
          {pi.phone    && <span>{pi.phone}</span>}
          {pi.location && <span>{pi.location}</span>}
          {pi.linkedin && <span style={{ color: '#2563eb' }}>{pi.linkedin}</span>}
          {pi.website  && <span style={{ color: '#2563eb' }}>{pi.website}</span>}
        </div>
      </div>

      {/* Summary */}
      {pi.summary && (
        <div style={{ marginBottom: '24px' }}>
          <SectionTitle>Summary</SectionTitle>
          <p style={{ color: '#374151', lineHeight: 1.6, marginTop: '8px' }}>{pi.summary}</p>
        </div>
      )}

      {/* Experience */}
      {(r.experience || []).length > 0 && (
        <div style={{ marginBottom: '24px' }}>
          <SectionTitle>Experience</SectionTitle>
          {r.experience.map((exp, i) => (
            <div key={i} style={{ marginTop: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '2px' }}>
                <div>
                  <span style={{ fontWeight: 600, fontSize: '12px', color: '#111827' }}>{exp.position}</span>
                  {exp.company && <span style={{ color: '#6b7280' }}> · {exp.company}</span>}
                </div>
                <span style={{ color: '#9ca3af', fontSize: '10px', whiteSpace: 'nowrap', marginLeft: '12px' }}>
                  {[exp.startDate, exp.current ? 'Present' : exp.endDate].filter(Boolean).join(' – ')}
                </span>
              </div>
              {exp.description && (
                <div style={{ marginTop: '4px' }}>
                  {exp.description.split('\n').filter(Boolean).map((line, j) => (
                    <div key={j} style={{ display: 'flex', gap: '6px', marginBottom: '2px', color: '#374151' }}>
                      <span style={{ color: '#9ca3af', flexShrink: 0 }}>·</span>
                      <span>{line.replace(/^[-•]\s*/, '')}</span>
                    </div>
                  ))}
                </div>
              )}
              {(exp.achievements || []).filter(Boolean).map((a, j) => (
                <div key={`ach-${j}`} style={{ display: 'flex', gap: '6px', marginBottom: '2px', color: '#374151' }}>
                  <span style={{ color: '#9ca3af', flexShrink: 0 }}>·</span>
                  <span>{a}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {(r.education || []).length > 0 && (
        <div style={{ marginBottom: '24px' }}>
          <SectionTitle>Education</SectionTitle>
          {r.education.map((edu, i) => (
            <div key={i} style={{ marginTop: '12px', display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <span style={{ fontWeight: 600, fontSize: '12px' }}>{edu.institution}</span>
                {(edu.degree || edu.field) && (
                  <div style={{ color: '#6b7280', marginTop: '1px' }}>
                    {[edu.degree, edu.field].filter(Boolean).join(' in ')}
                    {edu.gpa && ` · GPA: ${edu.gpa}`}
                  </div>
                )}
              </div>
              <span style={{ color: '#9ca3af', fontSize: '10px' }}>
                {[edu.startDate, edu.endDate].filter(Boolean).join(' – ')}
              </span>
            </div>
          ))}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        {/* Skills */}
        {((r.skills?.technical || []).length > 0 || (r.skills?.soft || []).length > 0) && (
          <div style={{ marginBottom: '24px' }}>
            <SectionTitle>Skills</SectionTitle>
            {(r.skills?.technical || []).length > 0 && (
              <div style={{ marginTop: '8px' }}>
                <div style={{ fontWeight: 600, fontSize: '10px', color: '#6b7280', marginBottom: '4px' }}>TECHNICAL</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                  {r.skills.technical.map((s, i) => (
                    <span key={i} style={{ background: '#f3f4f6', color: '#374151', padding: '2px 8px', borderRadius: '4px', fontSize: '10px' }}>{s}</span>
                  ))}
                </div>
              </div>
            )}
            {(r.skills?.soft || []).length > 0 && (
              <div style={{ marginTop: '8px' }}>
                <div style={{ fontWeight: 600, fontSize: '10px', color: '#6b7280', marginBottom: '4px' }}>SOFT SKILLS</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                  {r.skills.soft.map((s, i) => (
                    <span key={i} style={{ background: '#f3f4f6', color: '#374151', padding: '2px 8px', borderRadius: '4px', fontSize: '10px' }}>{s}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Certifications */}
        {(r.certifications || []).length > 0 && (
          <div style={{ marginBottom: '24px' }}>
            <SectionTitle>Certifications</SectionTitle>
            {r.certifications.map((cert, i) => (
              <div key={i} style={{ marginTop: '8px' }}>
                <div style={{ fontWeight: 600 }}>{cert.name}</div>
                {(cert.issuer || cert.date) && (
                  <div style={{ color: '#6b7280', fontSize: '10px' }}>
                    {[cert.issuer, cert.date].filter(Boolean).join(' · ')}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Projects */}
      {(r.projects || []).length > 0 && (
        <div style={{ marginBottom: '24px' }}>
          <SectionTitle>Projects</SectionTitle>
          {r.projects.map((proj, i) => (
            <div key={i} style={{ marginTop: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ fontWeight: 600, fontSize: '12px' }}>{proj.name}</span>
                {proj.link && <span style={{ color: '#2563eb', fontSize: '10px' }}>{proj.link}</span>}
              </div>
              {proj.technologies && (
                <div style={{ color: '#6b7280', fontSize: '10px', marginTop: '2px' }}>{proj.technologies}</div>
              )}
              {proj.description && (
                <p style={{ color: '#374151', marginTop: '4px' }}>{proj.description}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
