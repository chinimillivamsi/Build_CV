export default function TechTemplate({ data }) {
  const r = data || {}
  const pi = r.personalInfo || {}

  const bg      = '#0f172a'
  const green   = '#22d3ee'
  const greenDim = '#164e63'
  const card    = '#1e293b'
  const border  = '#334155'

  const Tag = ({ children, accent }) => (
    <span style={{ background: accent ? `${green}18` : '#334155', color: accent ? green : '#94a3b8', border: `1px solid ${accent ? green + '44' : '#475569'}`, padding: '2px 8px', borderRadius: '4px', fontSize: '9.5px', fontFamily: 'monospace', marginRight: '4px', marginBottom: '4px', display: 'inline-block' }}>
      {children}
    </span>
  )

  const SectionLabel = ({ children }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
      <span style={{ color: green, fontFamily: 'monospace', fontSize: '9px' }}>&lt;</span>
      <h2 style={{ fontSize: '9.5px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#e2e8f0', margin: 0 }}>{children}</h2>
      <span style={{ color: green, fontFamily: 'monospace', fontSize: '9px' }}>/&gt;</span>
      <div style={{ flex: 1, height: '1px', background: border }} />
    </div>
  )

  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif", fontSize: '11px', color: '#cbd5e1', background: bg, minHeight: '297mm', width: '100%' }}>

      {/* ── Dark Header ── */}
      <div style={{ background: card, borderBottom: `1px solid ${border}`, padding: '28px 36px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ fontFamily: 'monospace', fontSize: '11px', color: green, marginBottom: '4px' }}>
              {'// Hello, World! I am'}
            </div>
            <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#f1f5f9', marginBottom: '6px', letterSpacing: '-0.02em' }}>
              {pi.name || 'Your Name'}
            </h1>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', color: '#64748b', fontSize: '10px' }}>
              {pi.email    && <span style={{ color: '#94a3b8' }}>✉ {pi.email}</span>}
              {pi.phone    && <span style={{ color: '#94a3b8' }}>☏ {pi.phone}</span>}
              {pi.location && <span style={{ color: '#94a3b8' }}>⌖ {pi.location}</span>}
              {pi.linkedin && <span style={{ color: green }}>{pi.linkedin}</span>}
              {pi.website  && <span style={{ color: green }}>{pi.website}</span>}
            </div>
          </div>

          {/* Terminal window decoration */}
          <div style={{ background: bg, border: `1px solid ${border}`, borderRadius: '8px', padding: '10px 14px', minWidth: '140px' }}>
            <div style={{ display: 'flex', gap: '4px', marginBottom: '8px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ef4444' }} />
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#f59e0b' }} />
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22c55e' }} />
            </div>
            <div style={{ fontFamily: 'monospace', fontSize: '9px', color: '#64748b', lineHeight: 1.6 }}>
              <span style={{ color: green }}>$</span> npm run hire<br />
              <span style={{ color: '#22c55e' }}>✓ </span><span style={{ color: '#94a3b8' }}>ready</span>
            </div>
          </div>
        </div>

        {/* Summary */}
        {pi.summary && (
          <div style={{ marginTop: '14px', background: bg, border: `1px solid ${border}`, borderRadius: '6px', padding: '10px 14px', fontFamily: 'monospace', fontSize: '10px', color: '#94a3b8', lineHeight: 1.65 }}>
            <span style={{ color: '#475569' }}>/** </span>{pi.summary}<span style={{ color: '#475569' }}> */</span>
          </div>
        )}
      </div>

      {/* ── Body ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 240px', gap: '0' }}>

        {/* Main column */}
        <div style={{ padding: '24px 28px 24px 36px', borderRight: `1px solid ${border}` }}>

          {/* Experience */}
          {(r.experience || []).length > 0 && (
            <div style={{ marginBottom: '24px' }}>
              <SectionLabel>experience</SectionLabel>
              {r.experience.map((exp, i) => (
                <div key={i} style={{ background: card, border: `1px solid ${border}`, borderRadius: '8px', padding: '12px 16px', marginBottom: '10px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span style={{ fontWeight: 700, fontSize: '12px', color: '#f1f5f9' }}>{exp.position}</span>
                    <span style={{ background: greenDim, color: green, fontSize: '9px', padding: '2px 8px', borderRadius: '4px', fontFamily: 'monospace', whiteSpace: 'nowrap' }}>
                      {[exp.startDate, exp.current ? 'now' : exp.endDate].filter(Boolean).join(' → ')}
                    </span>
                  </div>
                  <div style={{ color: green, fontSize: '10.5px', fontWeight: 600, marginBottom: '6px' }}>{exp.company}</div>
                  {exp.description && exp.description.split('\n').filter(Boolean).map((line, j) => (
                    <div key={j} style={{ display: 'flex', gap: '6px', marginBottom: '3px', color: '#94a3b8', lineHeight: 1.5 }}>
                      <span style={{ color: green, fontFamily: 'monospace', flexShrink: 0 }}>→</span>
                      <span>{line.replace(/^[-•]\s*/, '')}</span>
                    </div>
                  ))}
                  {(exp.achievements || []).filter(Boolean).map((a, j) => (
                    <div key={`a${j}`} style={{ display: 'flex', gap: '6px', marginBottom: '3px', color: '#94a3b8', lineHeight: 1.5 }}>
                      <span style={{ color: green, fontFamily: 'monospace', flexShrink: 0 }}>→</span>
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
              <SectionLabel>projects</SectionLabel>
              {r.projects.map((proj, i) => (
                <div key={i} style={{ background: card, border: `1px solid ${border}`, borderRadius: '8px', padding: '12px 16px', marginBottom: '10px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                    <span style={{ fontWeight: 700, color: '#f1f5f9', fontSize: '11.5px' }}>{proj.name}</span>
                    {proj.link && <span style={{ color: green, fontSize: '9.5px', fontFamily: 'monospace' }}>{proj.link}</span>}
                  </div>
                  {proj.technologies && (
                    <div style={{ marginBottom: '6px' }}>
                      {proj.technologies.split(',').map((t, i) => <Tag key={i} accent>{t.trim()}</Tag>)}
                    </div>
                  )}
                  {proj.description && <p style={{ color: '#94a3b8', lineHeight: 1.5, margin: 0 }}>{proj.description}</p>}
                </div>
              ))}
            </div>
          )}

          {/* Education */}
          {(r.education || []).length > 0 && (
            <div>
              <SectionLabel>education</SectionLabel>
              {r.education.map((edu, i) => (
                <div key={i} style={{ background: card, border: `1px solid ${border}`, borderRadius: '8px', padding: '12px 16px', marginBottom: '10px' }}>
                  <div style={{ fontWeight: 700, color: '#f1f5f9', fontSize: '11.5px' }}>{edu.institution}</div>
                  <div style={{ color: green, fontSize: '10.5px', marginTop: '2px' }}>
                    {[edu.degree, edu.field ? `in ${edu.field}` : ''].filter(Boolean).join(' ')}
                  </div>
                  <div style={{ color: '#64748b', fontSize: '9.5px', fontFamily: 'monospace', marginTop: '2px' }}>
                    {[edu.startDate, edu.endDate].filter(Boolean).join(' – ')}
                    {edu.gpa && ` · GPA: ${edu.gpa}`}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right sidebar */}
        <div style={{ padding: '24px 20px', background: card }}>

          {/* Skills */}
          {(r.skills?.technical || []).length > 0 && (
            <div style={{ marginBottom: '20px' }}>
              <div style={{ fontFamily: 'monospace', color: green, fontSize: '9px', marginBottom: '8px' }}>// tech_stack</div>
              <div>
                {r.skills.technical.map((s, i) => <Tag key={i} accent>{s}</Tag>)}
              </div>
            </div>
          )}

          {(r.skills?.soft || []).length > 0 && (
            <div style={{ marginBottom: '20px' }}>
              <div style={{ fontFamily: 'monospace', color: '#64748b', fontSize: '9px', marginBottom: '8px' }}>// soft_skills</div>
              <div>
                {r.skills.soft.map((s, i) => <Tag key={i}>{s}</Tag>)}
              </div>
            </div>
          )}

          {(r.skills?.languages || []).length > 0 && (
            <div style={{ marginBottom: '20px' }}>
              <div style={{ fontFamily: 'monospace', color: '#64748b', fontSize: '9px', marginBottom: '8px' }}>// languages</div>
              <div>
                {r.skills.languages.map((s, i) => <Tag key={i}>{s}</Tag>)}
              </div>
            </div>
          )}

          {/* Certifications */}
          {(r.certifications || []).length > 0 && (
            <div>
              <div style={{ fontFamily: 'monospace', color: green, fontSize: '9px', marginBottom: '8px' }}>// certifications</div>
              {r.certifications.map((c, i) => (
                <div key={i} style={{ background: bg, border: `1px solid ${border}`, borderRadius: '6px', padding: '8px 10px', marginBottom: '6px' }}>
                  <div style={{ color: '#e2e8f0', fontSize: '10px', fontWeight: 600 }}>{c.name}</div>
                  {(c.issuer || c.date) && <div style={{ color: '#64748b', fontSize: '9px', fontFamily: 'monospace' }}>{[c.issuer, c.date].filter(Boolean).join(' · ')}</div>}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
