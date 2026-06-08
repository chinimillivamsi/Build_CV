export default function ExecutiveTemplate({ data }) {
  const r = data || {}
  const pi = r.personalInfo || {}

  const navy   = '#1a2e4a'
  const gold   = '#c9a84c'
  const light  = '#eef2f7'

  const initials = (pi.name || 'YN').split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()

  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif", fontSize: '11px', color: '#1f2937', display: 'flex', minHeight: '297mm', width: '100%', background: 'white' }}>

      {/* ── Sidebar ── */}
      <div style={{ width: '210px', flexShrink: 0, background: navy, display: 'flex', flexDirection: 'column', padding: '32px 20px' }}>

        {/* Photo placeholder */}
        <div style={{ alignSelf: 'center', width: '88px', height: '88px', borderRadius: '50%', background: gold, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', fontWeight: 700, color: 'white', marginBottom: '16px', border: '3px solid rgba(255,255,255,0.2)' }}>
          {initials}
        </div>

        {/* Name */}
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div style={{ color: 'white', fontWeight: 700, fontSize: '14px', lineHeight: 1.3 }}>{pi.name || 'Your Name'}</div>
          {pi.location && <div style={{ color: gold, fontSize: '9.5px', marginTop: '4px' }}>{pi.location}</div>}
        </div>

        {/* Divider */}
        <div style={{ height: '1px', background: 'rgba(255,255,255,0.15)', marginBottom: '20px' }} />

        {/* Contact */}
        <div style={{ marginBottom: '20px' }}>
          <div style={{ color: gold, fontSize: '8.5px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '8px' }}>Contact</div>
          {pi.email    && <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: '9.5px', marginBottom: '5px', wordBreak: 'break-all' }}>{pi.email}</div>}
          {pi.phone    && <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: '9.5px', marginBottom: '5px' }}>{pi.phone}</div>}
          {pi.linkedin && <div style={{ color: gold, fontSize: '9.5px', marginBottom: '5px', wordBreak: 'break-all' }}>{pi.linkedin}</div>}
          {pi.website  && <div style={{ color: gold, fontSize: '9.5px', wordBreak: 'break-all' }}>{pi.website}</div>}
        </div>

        {/* Skills */}
        {(r.skills?.technical || []).length > 0 && (
          <div style={{ marginBottom: '20px' }}>
            <div style={{ color: gold, fontSize: '8.5px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '8px' }}>Skills</div>
            {r.skills.technical.map((s, i) => (
              <div key={i} style={{ marginBottom: '6px' }}>
                <div style={{ color: 'rgba(255,255,255,0.85)', fontSize: '9.5px', marginBottom: '3px' }}>{s}</div>
                <div style={{ height: '3px', background: 'rgba(255,255,255,0.12)', borderRadius: '2px' }}>
                  <div style={{ height: '100%', background: gold, borderRadius: '2px', width: `${65 + (i % 4) * 9}%` }} />
                </div>
              </div>
            ))}
          </div>
        )}

        {(r.skills?.soft || []).length > 0 && (
          <div style={{ marginBottom: '20px' }}>
            <div style={{ color: gold, fontSize: '8.5px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '8px' }}>Competencies</div>
            {r.skills.soft.map((s, i) => (
              <div key={i} style={{ color: 'rgba(255,255,255,0.8)', fontSize: '9.5px', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: gold, flexShrink: 0 }} />
                {s}
              </div>
            ))}
          </div>
        )}

        {/* Certifications */}
        {(r.certifications || []).length > 0 && (
          <div>
            <div style={{ color: gold, fontSize: '8.5px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '8px' }}>Certifications</div>
            {r.certifications.map((c, i) => (
              <div key={i} style={{ marginBottom: '8px' }}>
                <div style={{ color: 'white', fontSize: '9.5px', fontWeight: 600 }}>{c.name}</div>
                {(c.issuer || c.date) && <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '9px' }}>{[c.issuer, c.date].filter(Boolean).join(' · ')}</div>}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── Main ── */}
      <div style={{ flex: 1, padding: '32px 32px 32px 28px', minWidth: 0 }}>

        {/* Gold top bar */}
        <div style={{ height: '4px', background: `linear-gradient(90deg, ${gold}, transparent)`, marginBottom: '20px', borderRadius: '2px' }} />

        {/* Summary */}
        {pi.summary && (
          <div style={{ marginBottom: '22px' }}>
            <h2 style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: navy, marginBottom: '8px', paddingBottom: '4px', borderBottom: `2px solid ${gold}`, display: 'inline-block' }}>Professional Profile</h2>
            <p style={{ color: '#374151', lineHeight: 1.65, marginTop: '8px' }}>{pi.summary}</p>
          </div>
        )}

        {/* Experience */}
        {(r.experience || []).length > 0 && (
          <div style={{ marginBottom: '22px' }}>
            <h2 style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: navy, marginBottom: '12px', paddingBottom: '4px', borderBottom: `2px solid ${gold}`, display: 'inline-block' }}>Career Experience</h2>
            {r.experience.map((exp, i) => (
              <div key={i} style={{ marginTop: '14px', paddingLeft: '12px', borderLeft: `3px solid ${i === 0 ? gold : '#e5e7eb'}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
                  <span style={{ fontWeight: 700, fontSize: '12px', color: navy }}>{exp.position}</span>
                  <span style={{ color: '#9ca3af', fontSize: '9.5px', whiteSpace: 'nowrap', marginLeft: '8px' }}>
                    {[exp.startDate, exp.current ? 'Present' : exp.endDate].filter(Boolean).join(' – ')}
                  </span>
                </div>
                <div style={{ color: gold, fontWeight: 600, fontSize: '10.5px', marginBottom: '6px' }}>{exp.company}</div>
                {exp.description && exp.description.split('\n').filter(Boolean).map((line, j) => (
                  <div key={j} style={{ display: 'flex', gap: '6px', marginBottom: '3px', color: '#4b5563', lineHeight: 1.5 }}>
                    <span style={{ color: gold, fontWeight: 700, flexShrink: 0 }}>›</span>
                    <span>{line.replace(/^[-•]\s*/, '')}</span>
                  </div>
                ))}
                {(exp.achievements || []).filter(Boolean).map((a, j) => (
                  <div key={`a${j}`} style={{ display: 'flex', gap: '6px', marginBottom: '3px', color: '#4b5563', lineHeight: 1.5 }}>
                    <span style={{ color: gold, fontWeight: 700, flexShrink: 0 }}>›</span>
                    <span>{a}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}

        {/* Education */}
        {(r.education || []).length > 0 && (
          <div style={{ marginBottom: '22px' }}>
            <h2 style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: navy, marginBottom: '12px', paddingBottom: '4px', borderBottom: `2px solid ${gold}`, display: 'inline-block' }}>Education</h2>
            {r.education.map((edu, i) => (
              <div key={i} style={{ marginTop: '10px', display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '12px', color: navy }}>{edu.institution}</div>
                  <div style={{ color: '#6b7280', fontSize: '10.5px' }}>
                    {[edu.degree, edu.field ? `in ${edu.field}` : ''].filter(Boolean).join(' ')}
                    {edu.gpa && ` · GPA: ${edu.gpa}`}
                  </div>
                </div>
                <div style={{ color: '#9ca3af', fontSize: '9.5px', whiteSpace: 'nowrap' }}>
                  {[edu.startDate, edu.endDate].filter(Boolean).join(' – ')}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Projects */}
        {(r.projects || []).length > 0 && (
          <div>
            <h2 style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: navy, marginBottom: '12px', paddingBottom: '4px', borderBottom: `2px solid ${gold}`, display: 'inline-block' }}>Key Projects</h2>
            {r.projects.map((proj, i) => (
              <div key={i} style={{ marginTop: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontWeight: 700, color: navy, fontSize: '11.5px' }}>{proj.name}</span>
                  {proj.link && <span style={{ color: gold, fontSize: '9.5px' }}>{proj.link}</span>}
                </div>
                {proj.technologies && <div style={{ color: '#6b7280', fontSize: '9.5px', fontStyle: 'italic' }}>{proj.technologies}</div>}
                {proj.description && <p style={{ color: '#4b5563', marginTop: '3px', lineHeight: 1.5 }}>{proj.description}</p>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
