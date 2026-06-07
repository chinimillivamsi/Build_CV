export default function CorporateTemplate({ data }) {
  const r = data || {}
  const pi = r.personalInfo || {}

  const navyBlue = '#1e3a5f'
  const midBlue = '#2563eb'
  const lightBlue = '#dbeafe'

  const SectionTitle = ({ children }) => (
    <h2 style={{
      fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em',
      textTransform: 'uppercase', color: navyBlue,
      marginBottom: '8px', paddingBottom: '4px',
      borderBottom: `2px solid ${navyBlue}`,
    }}>
      {children}
    </h2>
  )

  return (
    <div style={{
      fontFamily: "'Inter', system-ui, sans-serif",
      fontSize: '11px',
      color: '#1f2937',
      background: 'white',
      minHeight: '297mm',
      width: '100%',
    }}>
      {/* Header Band */}
      <div style={{ background: navyBlue, padding: '28px 48px 24px' }}>
        <h1 style={{ fontSize: '30px', fontWeight: 700, color: 'white', marginBottom: '6px', letterSpacing: '-0.01em' }}>
          {pi.name || 'Your Name'}
        </h1>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', color: '#93c5fd', fontSize: '10.5px' }}>
          {pi.email    && <span>✉ {pi.email}</span>}
          {pi.phone    && <span>☏ {pi.phone}</span>}
          {pi.location && <span>⌖ {pi.location}</span>}
          {pi.linkedin && <span>in {pi.linkedin}</span>}
          {pi.website  && <span>⊕ {pi.website}</span>}
        </div>
      </div>

      {/* Accent stripe */}
      <div style={{ height: '4px', background: midBlue }} />

      {/* Body */}
      <div style={{ display: 'flex', padding: '28px 0' }}>
        {/* Left column */}
        <div style={{ flex: '0 0 62%', padding: '0 32px 0 48px', borderRight: '1px solid #e5e7eb' }}>
          {/* Summary */}
          {pi.summary && (
            <div style={{ marginBottom: '24px' }}>
              <SectionTitle>Professional Summary</SectionTitle>
              <p style={{ color: '#374151', lineHeight: 1.65, marginTop: '8px' }}>{pi.summary}</p>
            </div>
          )}

          {/* Experience */}
          {(r.experience || []).length > 0 && (
            <div style={{ marginBottom: '24px' }}>
              <SectionTitle>Professional Experience</SectionTitle>
              {r.experience.map((exp, i) => (
                <div key={i} style={{ marginTop: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '12.5px', color: navyBlue }}>{exp.position}</div>
                      <div style={{ color: midBlue, fontWeight: 600, fontSize: '11px' }}>{exp.company}</div>
                    </div>
                    <div style={{
                      background: lightBlue, color: navyBlue, fontSize: '9.5px',
                      padding: '2px 10px', borderRadius: '4px', fontWeight: 600,
                      whiteSpace: 'nowrap', flexShrink: 0, marginLeft: '12px',
                    }}>
                      {[exp.startDate, exp.current ? 'Present' : exp.endDate].filter(Boolean).join(' – ')}
                    </div>
                  </div>
                  {exp.description && (
                    <div style={{ marginTop: '6px' }}>
                      {exp.description.split('\n').filter(Boolean).map((line, j) => (
                        <div key={j} style={{ display: 'flex', gap: '8px', marginBottom: '3px', color: '#374151', lineHeight: 1.5 }}>
                          <span style={{ color: midBlue, fontWeight: 700, flexShrink: 0 }}>▪</span>
                          <span>{line.replace(/^[-•]\s*/, '')}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  {(exp.achievements || []).filter(Boolean).map((a, j) => (
                    <div key={`ach-${j}`} style={{ display: 'flex', gap: '8px', marginBottom: '3px', color: '#374151', lineHeight: 1.5 }}>
                      <span style={{ color: midBlue, fontWeight: 700, flexShrink: 0 }}>▪</span>
                      <span>{a}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}

          {/* Projects */}
          {(r.projects || []).length > 0 && (
            <div style={{ marginBottom: '24px' }}>
              <SectionTitle>Key Projects</SectionTitle>
              {r.projects.map((proj, i) => (
                <div key={i} style={{ marginTop: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <span style={{ fontWeight: 700, color: navyBlue, fontSize: '12px' }}>{proj.name}</span>
                    {proj.link && <span style={{ color: midBlue, fontSize: '10px' }}>{proj.link}</span>}
                  </div>
                  {proj.technologies && (
                    <div style={{ color: '#6b7280', fontSize: '10px', marginTop: '1px', fontStyle: 'italic' }}>
                      Tech: {proj.technologies}
                    </div>
                  )}
                  {proj.description && (
                    <p style={{ color: '#374151', marginTop: '4px', lineHeight: 1.5 }}>{proj.description}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right column */}
        <div style={{ flex: 1, padding: '0 40px 0 28px' }}>
          {/* Education */}
          {(r.education || []).length > 0 && (
            <div style={{ marginBottom: '24px' }}>
              <SectionTitle>Education</SectionTitle>
              {r.education.map((edu, i) => (
                <div key={i} style={{ marginTop: '12px' }}>
                  <div style={{ fontWeight: 700, color: navyBlue, fontSize: '12px' }}>{edu.institution}</div>
                  <div style={{ color: '#374151', marginTop: '2px' }}>
                    {[edu.degree, edu.field ? `in ${edu.field}` : ''].filter(Boolean).join(' ')}
                  </div>
                  <div style={{ color: '#9ca3af', fontSize: '10px', marginTop: '2px' }}>
                    {[edu.startDate, edu.endDate].filter(Boolean).join(' – ')}
                    {edu.gpa && ` · GPA: ${edu.gpa}`}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Skills */}
          {((r.skills?.technical || []).length > 0 || (r.skills?.soft || []).length > 0) && (
            <div style={{ marginBottom: '24px' }}>
              <SectionTitle>Skills</SectionTitle>
              {(r.skills?.technical || []).length > 0 && (
                <div style={{ marginTop: '8px' }}>
                  <div style={{ fontWeight: 600, fontSize: '9.5px', color: '#6b7280', marginBottom: '5px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Technical
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                    {r.skills.technical.map((s, i) => (
                      <span key={i} style={{
                        background: lightBlue, color: navyBlue,
                        padding: '2px 8px', borderRadius: '4px', fontSize: '10px', fontWeight: 500,
                      }}>{s}</span>
                    ))}
                  </div>
                </div>
              )}
              {(r.skills?.soft || []).length > 0 && (
                <div style={{ marginTop: '10px' }}>
                  <div style={{ fontWeight: 600, fontSize: '9.5px', color: '#6b7280', marginBottom: '5px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Core Competencies
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                    {r.skills.soft.map((s, i) => (
                      <span key={i} style={{
                        background: '#f3f4f6', color: '#374151',
                        padding: '2px 8px', borderRadius: '4px', fontSize: '10px',
                      }}>{s}</span>
                    ))}
                  </div>
                </div>
              )}
              {(r.skills?.languages || []).length > 0 && (
                <div style={{ marginTop: '10px' }}>
                  <div style={{ fontWeight: 600, fontSize: '9.5px', color: '#6b7280', marginBottom: '5px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Languages
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                    {r.skills.languages.map((s, i) => (
                      <span key={i} style={{
                        background: '#f0fdf4', color: '#15803d',
                        padding: '2px 8px', borderRadius: '4px', fontSize: '10px',
                      }}>{s}</span>
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
                <div key={i} style={{ marginTop: '8px', paddingLeft: '10px', borderLeft: `3px solid ${midBlue}` }}>
                  <div style={{ fontWeight: 600, fontSize: '11.5px', color: navyBlue }}>{cert.name}</div>
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
      </div>

      {/* Footer */}
      <div style={{ borderTop: '2px solid #e5e7eb', padding: '10px 48px', textAlign: 'center' }}>
        <span style={{ color: '#9ca3af', fontSize: '9.5px' }}>
          {pi.name && `${pi.name} · `}{pi.email}
        </span>
      </div>
    </div>
  )
}
