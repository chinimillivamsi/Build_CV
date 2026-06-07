export default function CreativeTemplate({ data }) {
  const r = data || {}
  const pi = r.personalInfo || {}

  const accent = '#7c3aed'
  const accentLight = '#ede9fe'
  const dark = '#1e1b4b'

  const SideSection = ({ title, children }) => (
    <div style={{ marginBottom: '20px' }}>
      <h2 style={{
        fontSize: '9px', fontWeight: 700, letterSpacing: '0.15em',
        textTransform: 'uppercase', color: accentLight,
        marginBottom: '10px', paddingBottom: '6px',
        borderBottom: '1px solid rgba(255,255,255,0.15)',
      }}>
        {title}
      </h2>
      {children}
    </div>
  )

  const MainSection = ({ title, children }) => (
    <div style={{ marginBottom: '20px' }}>
      <h2 style={{
        fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em',
        textTransform: 'uppercase', color: accent,
        marginBottom: '10px', paddingBottom: '5px',
        borderBottom: `2px solid ${accent}`,
      }}>
        {title}
      </h2>
      {children}
    </div>
  )

  return (
    <div style={{
      fontFamily: "'Inter', system-ui, sans-serif",
      fontSize: '11px',
      color: '#1f2937',
      background: 'white',
      display: 'flex',
      minHeight: '297mm',
      width: '100%',
    }}>
      {/* Sidebar */}
      <div style={{
        width: '220px',
        flexShrink: 0,
        background: dark,
        padding: '36px 24px',
        color: 'white',
      }}>
        {/* Avatar initials */}
        <div style={{
          width: '72px', height: '72px', borderRadius: '50%',
          background: accent, display: 'flex', alignItems: 'center',
          justifyContent: 'center', marginBottom: '20px',
          fontSize: '24px', fontWeight: 700, color: 'white',
        }}>
          {(pi.name || 'YN').split(' ').map(w => w[0]).join('').slice(0,2).toUpperCase()}
        </div>

        <h1 style={{ fontSize: '18px', fontWeight: 700, color: 'white', marginBottom: '4px', lineHeight: 1.2 }}>
          {pi.name || 'Your Name'}
        </h1>

        <div style={{ color: accentLight, fontSize: '10px', marginBottom: '24px', lineHeight: 1.6 }}>
          {pi.email    && <div style={{ marginBottom: '4px' }}>✉ {pi.email}</div>}
          {pi.phone    && <div style={{ marginBottom: '4px' }}>✆ {pi.phone}</div>}
          {pi.location && <div style={{ marginBottom: '4px' }}>⌖ {pi.location}</div>}
          {pi.linkedin && <div style={{ marginBottom: '4px', wordBreak: 'break-all' }}>in {pi.linkedin}</div>}
          {pi.website  && <div style={{ wordBreak: 'break-all' }}>⊕ {pi.website}</div>}
        </div>

        {/* Skills */}
        {((r.skills?.technical || []).length > 0) && (
          <SideSection title="Technical Skills">
            {r.skills.technical.map((s, i) => (
              <div key={i} style={{ marginBottom: '6px' }}>
                <div style={{ color: 'rgba(255,255,255,0.85)', fontSize: '10.5px', marginBottom: '3px' }}>{s}</div>
                <div style={{ height: '3px', borderRadius: '2px', background: 'rgba(255,255,255,0.15)' }}>
                  <div style={{ height: '100%', borderRadius: '2px', background: accent, width: `${70 + (i % 3) * 10}%` }} />
                </div>
              </div>
            ))}
          </SideSection>
        )}

        {((r.skills?.soft || []).length > 0) && (
          <SideSection title="Soft Skills">
            {r.skills.soft.map((s, i) => (
              <div key={i} style={{
                display: 'inline-block', background: 'rgba(255,255,255,0.1)',
                color: 'rgba(255,255,255,0.85)', padding: '2px 8px',
                borderRadius: '12px', fontSize: '9.5px', margin: '2px 2px 0 0',
              }}>{s}</div>
            ))}
          </SideSection>
        )}

        {(r.certifications || []).length > 0 && (
          <SideSection title="Certifications">
            {r.certifications.map((cert, i) => (
              <div key={i} style={{ marginBottom: '8px' }}>
                <div style={{ color: 'white', fontWeight: 600, fontSize: '10.5px' }}>{cert.name}</div>
                {(cert.issuer || cert.date) && (
                  <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '9.5px' }}>
                    {[cert.issuer, cert.date].filter(Boolean).join(' · ')}
                  </div>
                )}
              </div>
            ))}
          </SideSection>
        )}
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: '36px 32px', overflow: 'hidden' }}>
        {/* Summary */}
        {pi.summary && (
          <div style={{
            background: '#faf5ff', border: `1px solid ${accentLight}`,
            borderRadius: '8px', padding: '12px 16px', marginBottom: '24px',
          }}>
            <p style={{ color: '#374151', lineHeight: 1.65, margin: 0 }}>{pi.summary}</p>
          </div>
        )}

        {/* Experience */}
        {(r.experience || []).length > 0 && (
          <MainSection title="Work Experience">
            {r.experience.map((exp, i) => (
              <div key={i} style={{
                marginBottom: '16px', paddingLeft: '12px',
                borderLeft: `3px solid ${i === 0 ? accent : '#e5e7eb'}`,
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
                  <span style={{ fontWeight: 700, fontSize: '12px', color: '#111827' }}>{exp.position}</span>
                  <span style={{
                    background: accentLight, color: accent, fontSize: '9.5px',
                    padding: '1px 8px', borderRadius: '10px', fontWeight: 500, whiteSpace: 'nowrap',
                  }}>
                    {[exp.startDate, exp.current ? 'Present' : exp.endDate].filter(Boolean).join(' – ')}
                  </span>
                </div>
                <div style={{ color: accent, fontWeight: 600, fontSize: '10.5px', marginBottom: '6px' }}>{exp.company}</div>
                {exp.description && exp.description.split('\n').filter(Boolean).map((line, j) => (
                  <div key={j} style={{ display: 'flex', gap: '6px', marginBottom: '3px', color: '#4b5563' }}>
                    <span style={{ color: accent, fontWeight: 700 }}>›</span>
                    <span>{line.replace(/^[-•]\s*/, '')}</span>
                  </div>
                ))}
                {(exp.achievements || []).filter(Boolean).map((a, j) => (
                  <div key={`ach-${j}`} style={{ display: 'flex', gap: '6px', marginBottom: '3px', color: '#4b5563' }}>
                    <span style={{ color: accent, fontWeight: 700 }}>›</span>
                    <span>{a}</span>
                  </div>
                ))}
              </div>
            ))}
          </MainSection>
        )}

        {/* Education */}
        {(r.education || []).length > 0 && (
          <MainSection title="Education">
            {r.education.map((edu, i) => (
              <div key={i} style={{ marginBottom: '12px', display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '12px', color: '#111827' }}>{edu.institution}</div>
                  <div style={{ color: '#6b7280', fontSize: '10.5px' }}>
                    {[edu.degree, edu.field ? `in ${edu.field}` : ''].filter(Boolean).join(' ')}
                    {edu.gpa && ` · GPA: ${edu.gpa}`}
                  </div>
                </div>
                <div style={{
                  background: '#f3f4f6', color: '#6b7280', fontSize: '9.5px',
                  padding: '2px 10px', borderRadius: '10px', height: 'fit-content',
                }}>
                  {[edu.startDate, edu.endDate].filter(Boolean).join(' – ')}
                </div>
              </div>
            ))}
          </MainSection>
        )}

        {/* Projects */}
        {(r.projects || []).length > 0 && (
          <MainSection title="Projects">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              {r.projects.map((proj, i) => (
                <div key={i} style={{
                  border: '1px solid #e5e7eb', borderRadius: '8px',
                  padding: '10px 12px', background: '#fafafa',
                }}>
                  <div style={{ fontWeight: 700, fontSize: '11.5px', color: '#111827', marginBottom: '2px' }}>{proj.name}</div>
                  {proj.technologies && (
                    <div style={{ color: accent, fontSize: '9.5px', marginBottom: '4px' }}>{proj.technologies}</div>
                  )}
                  {proj.description && (
                    <p style={{ color: '#6b7280', lineHeight: 1.5, margin: 0 }}>{proj.description}</p>
                  )}
                  {proj.link && (
                    <div style={{ color: '#2563eb', fontSize: '9.5px', marginTop: '4px' }}>{proj.link}</div>
                  )}
                </div>
              ))}
            </div>
          </MainSection>
        )}
      </div>
    </div>
  )
}
