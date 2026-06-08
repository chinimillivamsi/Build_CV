export default function TimelineTemplate({ data }) {
  const r = data || {}
  const pi = r.personalInfo || {}

  const teal   = '#0d9488'
  const tealBg = '#f0fdfa'
  const dark   = '#134e4a'

  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif", fontSize: '11px', color: '#1f2937', background: 'white', minHeight: '297mm', width: '100%' }}>

      {/* ── Gradient Header ── */}
      <div style={{ background: `linear-gradient(135deg, ${dark} 0%, ${teal} 100%)`, padding: '32px 40px 28px', position: 'relative', overflow: 'hidden' }}>
        {/* Decorative circle */}
        <div style={{ position: 'absolute', right: '-40px', top: '-40px', width: '200px', height: '200px', borderRadius: '50%', background: 'rgba(255,255,255,0.06)' }} />
        <div style={{ position: 'absolute', right: '60px', bottom: '-60px', width: '140px', height: '140px', borderRadius: '50%', background: 'rgba(255,255,255,0.04)' }} />

        <h1 style={{ fontSize: '30px', fontWeight: 800, color: 'white', marginBottom: '6px', letterSpacing: '-0.02em', position: 'relative' }}>
          {pi.name || 'Your Name'}
        </h1>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', color: 'rgba(255,255,255,0.75)', fontSize: '10.5px', position: 'relative' }}>
          {pi.email    && <span>✉ {pi.email}</span>}
          {pi.phone    && <span>☏ {pi.phone}</span>}
          {pi.location && <span>⌖ {pi.location}</span>}
          {pi.linkedin && <span style={{ color: '#99f6e4' }}>in {pi.linkedin}</span>}
          {pi.website  && <span style={{ color: '#99f6e4' }}>⊕ {pi.website}</span>}
        </div>

        {/* Summary inside header */}
        {pi.summary && (
          <p style={{ color: 'rgba(255,255,255,0.85)', marginTop: '14px', lineHeight: 1.65, maxWidth: '680px', fontSize: '10.5px', position: 'relative' }}>
            {pi.summary}
          </p>
        )}
      </div>

      {/* ── Teal accent stripe ── */}
      <div style={{ height: '4px', background: `linear-gradient(90deg, ${teal}, transparent)` }} />

      <div style={{ padding: '28px 40px' }}>

        {/* ── Experience Timeline ── */}
        {(r.experience || []).length > 0 && (
          <div style={{ marginBottom: '28px' }}>
            <h2 style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: teal, marginBottom: '18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '20px', height: '2px', background: teal }} />
              Work Experience
              <div style={{ flex: 1, height: '1px', background: '#e5e7eb' }} />
            </h2>

            <div style={{ position: 'relative', paddingLeft: '28px' }}>
              {/* Vertical line */}
              <div style={{ position: 'absolute', left: '7px', top: '6px', bottom: '0', width: '2px', background: '#e5e7eb' }} />

              {r.experience.map((exp, i) => (
                <div key={i} style={{ position: 'relative', marginBottom: '20px' }}>
                  {/* Timeline dot */}
                  <div style={{ position: 'absolute', left: '-24px', top: '4px', width: '14px', height: '14px', borderRadius: '50%', background: i === 0 ? teal : 'white', border: `2px solid ${teal}`, zIndex: 1 }} />

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '3px' }}>
                    <div>
                      <span style={{ fontWeight: 700, fontSize: '12.5px', color: dark }}>{exp.position}</span>
                      {exp.company && <span style={{ color: teal, fontWeight: 600, fontSize: '11px' }}> · {exp.company}</span>}
                    </div>
                    <span style={{ background: tealBg, color: teal, fontSize: '9.5px', padding: '2px 10px', borderRadius: '10px', fontWeight: 500, whiteSpace: 'nowrap', flexShrink: 0, marginLeft: '12px' }}>
                      {[exp.startDate, exp.current ? 'Present' : exp.endDate].filter(Boolean).join(' – ')}
                    </span>
                  </div>

                  {exp.description && exp.description.split('\n').filter(Boolean).map((line, j) => (
                    <div key={j} style={{ display: 'flex', gap: '6px', marginBottom: '2px', color: '#4b5563', lineHeight: 1.5 }}>
                      <span style={{ color: teal, flexShrink: 0 }}>▸</span>
                      <span>{line.replace(/^[-•]\s*/, '')}</span>
                    </div>
                  ))}
                  {(exp.achievements || []).filter(Boolean).map((a, j) => (
                    <div key={`a${j}`} style={{ display: 'flex', gap: '6px', marginBottom: '2px', color: '#4b5563', lineHeight: 1.5 }}>
                      <span style={{ color: teal, flexShrink: 0 }}>▸</span>
                      <span>{a}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Projects Timeline ── */}
        {(r.projects || []).length > 0 && (
          <div style={{ marginBottom: '28px' }}>
            <h2 style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: teal, marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '20px', height: '2px', background: teal }} />
              Projects
              <div style={{ flex: 1, height: '1px', background: '#e5e7eb' }} />
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              {r.projects.map((proj, i) => (
                <div key={i} style={{ background: tealBg, border: `1px solid #99f6e4`, borderRadius: '8px', padding: '12px 14px' }}>
                  <div style={{ fontWeight: 700, color: dark, fontSize: '11.5px', marginBottom: '2px' }}>{proj.name}</div>
                  {proj.technologies && <div style={{ color: teal, fontSize: '9.5px', marginBottom: '4px' }}>{proj.technologies}</div>}
                  {proj.description && <p style={{ color: '#4b5563', lineHeight: 1.5, margin: 0 }}>{proj.description}</p>}
                  {proj.link && <div style={{ color: teal, fontSize: '9.5px', marginTop: '4px' }}>{proj.link}</div>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Bottom row: Education + Skills + Certs ── */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}>

          {/* Education */}
          {(r.education || []).length > 0 && (
            <div>
              <h2 style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: teal, marginBottom: '10px', paddingBottom: '4px', borderBottom: `2px solid ${teal}` }}>Education</h2>
              {r.education.map((edu, i) => (
                <div key={i} style={{ marginTop: '8px' }}>
                  <div style={{ fontWeight: 700, color: dark, fontSize: '11px' }}>{edu.institution}</div>
                  <div style={{ color: '#6b7280', fontSize: '10px' }}>
                    {[edu.degree, edu.field ? `in ${edu.field}` : ''].filter(Boolean).join(' ')}
                  </div>
                  <div style={{ color: '#9ca3af', fontSize: '9.5px' }}>
                    {[edu.startDate, edu.endDate].filter(Boolean).join(' – ')}
                    {edu.gpa && ` · ${edu.gpa}`}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Skills */}
          {((r.skills?.technical || []).length > 0 || (r.skills?.soft || []).length > 0) && (
            <div>
              <h2 style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: teal, marginBottom: '10px', paddingBottom: '4px', borderBottom: `2px solid ${teal}` }}>Skills</h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '6px' }}>
                {(r.skills?.technical || []).map((s, i) => (
                  <span key={i} style={{ background: tealBg, color: dark, padding: '2px 8px', borderRadius: '4px', fontSize: '9.5px', fontWeight: 500 }}>{s}</span>
                ))}
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                {(r.skills?.soft || []).map((s, i) => (
                  <span key={i} style={{ background: '#f3f4f6', color: '#374151', padding: '2px 8px', borderRadius: '4px', fontSize: '9.5px' }}>{s}</span>
                ))}
              </div>
            </div>
          )}

          {/* Certifications */}
          {(r.certifications || []).length > 0 && (
            <div>
              <h2 style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: teal, marginBottom: '10px', paddingBottom: '4px', borderBottom: `2px solid ${teal}` }}>Certifications</h2>
              {r.certifications.map((c, i) => (
                <div key={i} style={{ marginTop: '8px', paddingLeft: '8px', borderLeft: `2px solid ${teal}` }}>
                  <div style={{ fontWeight: 600, color: dark, fontSize: '10.5px' }}>{c.name}</div>
                  {(c.issuer || c.date) && <div style={{ color: '#9ca3af', fontSize: '9.5px' }}>{[c.issuer, c.date].filter(Boolean).join(' · ')}</div>}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
