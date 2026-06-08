export default function ElegantTemplate({ data }) {
  const r = data || {}
  const pi = r.personalInfo || {}

  const gold   = '#8b6914'
  const goldBg = '#fdf8ee'
  const dark   = '#1c1917'

  const Divider = () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: '4px 0 16px' }}>
      <div style={{ flex: 1, height: '1px', background: '#d4b483' }} />
      <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: gold }} />
      <div style={{ flex: 1, height: '1px', background: '#d4b483' }} />
    </div>
  )

  const SectionTitle = ({ children }) => (
    <div style={{ textAlign: 'center', marginBottom: '4px' }}>
      <h2 style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: gold, fontFamily: "'Playfair Display', Georgia, serif" }}>
        {children}
      </h2>
    </div>
  )

  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif", fontSize: '11px', color: dark, background: 'white', minHeight: '297mm', width: '100%', padding: '40px 52px' }}>

      {/* ── Centered Header ── */}
      <div style={{ textAlign: 'center', marginBottom: '8px' }}>
        <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '32px', fontWeight: 700, color: dark, letterSpacing: '0.04em', marginBottom: '10px' }}>
          {pi.name || 'Your Name'}
        </h1>

        {/* Decorative rule under name */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '10px' }}>
          <div style={{ width: '48px', height: '1px', background: gold }} />
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', border: `1.5px solid ${gold}`, background: goldBg }} />
          <div style={{ width: '48px', height: '1px', background: gold }} />
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0', color: '#6b7280', fontSize: '10.5px' }}>
          {[pi.email, pi.phone, pi.location, pi.linkedin, pi.website].filter(Boolean).map((item, i, arr) => (
            <span key={i}>
              {item}
              {i < arr.length - 1 && <span style={{ color: gold, margin: '0 8px' }}>·</span>}
            </span>
          ))}
        </div>
      </div>

      {/* ── Summary ── */}
      {pi.summary && (
        <div style={{ marginBottom: '24px' }}>
          <SectionTitle>Profile</SectionTitle>
          <Divider />
          <p style={{ textAlign: 'center', color: '#374151', lineHeight: 1.7, fontStyle: 'italic', maxWidth: '520px', margin: '0 auto' }}>
            "{pi.summary}"
          </p>
        </div>
      )}

      {/* ── Experience ── */}
      {(r.experience || []).length > 0 && (
        <div style={{ marginBottom: '24px' }}>
          <SectionTitle>Professional Experience</SectionTitle>
          <Divider />
          {r.experience.map((exp, i) => (
            <div key={i} style={{ marginBottom: '16px', background: i % 2 === 0 ? goldBg : 'white', padding: '12px 16px', borderRadius: '6px', border: `1px solid ${i % 2 === 0 ? '#e8d5a3' : 'transparent'}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <div>
                  <span style={{ fontWeight: 700, fontSize: '12.5px', color: dark, fontFamily: "'Playfair Display', Georgia, serif" }}>{exp.position}</span>
                  {exp.company && <span style={{ color: gold, fontWeight: 500, fontSize: '11px' }}> · {exp.company}</span>}
                </div>
                <span style={{ color: '#9ca3af', fontSize: '9.5px', fontStyle: 'italic', whiteSpace: 'nowrap', marginLeft: '12px' }}>
                  {[exp.startDate, exp.current ? 'Present' : exp.endDate].filter(Boolean).join(' – ')}
                </span>
              </div>
              {exp.description && exp.description.split('\n').filter(Boolean).map((line, j) => (
                <div key={j} style={{ display: 'flex', gap: '8px', marginBottom: '3px', color: '#4b5563', lineHeight: 1.5 }}>
                  <span style={{ color: gold }}>◆</span>
                  <span>{line.replace(/^[-•]\s*/, '')}</span>
                </div>
              ))}
              {(exp.achievements || []).filter(Boolean).map((a, j) => (
                <div key={`a${j}`} style={{ display: 'flex', gap: '8px', marginBottom: '3px', color: '#4b5563', lineHeight: 1.5 }}>
                  <span style={{ color: gold }}>◆</span>
                  <span>{a}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      {/* ── Two column: Education + Skills ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '28px', marginBottom: '24px' }}>
        {/* Education */}
        {(r.education || []).length > 0 && (
          <div>
            <SectionTitle>Education</SectionTitle>
            <Divider />
            {r.education.map((edu, i) => (
              <div key={i} style={{ marginBottom: '12px', textAlign: 'center' }}>
                <div style={{ fontWeight: 700, color: dark, fontSize: '12px', fontFamily: "'Playfair Display', Georgia, serif" }}>{edu.institution}</div>
                <div style={{ color: gold, fontSize: '10.5px', marginTop: '2px' }}>
                  {[edu.degree, edu.field ? `in ${edu.field}` : ''].filter(Boolean).join(' ')}
                </div>
                <div style={{ color: '#9ca3af', fontSize: '9.5px', fontStyle: 'italic' }}>
                  {[edu.startDate, edu.endDate].filter(Boolean).join(' – ')}
                  {edu.gpa && ` · GPA: ${edu.gpa}`}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Skills */}
        {((r.skills?.technical || []).length > 0 || (r.skills?.soft || []).length > 0) && (
          <div>
            <SectionTitle>Skills & Expertise</SectionTitle>
            <Divider />
            {(r.skills?.technical || []).length > 0 && (
              <div style={{ marginBottom: '8px', textAlign: 'center' }}>
                <div style={{ color: gold, fontSize: '9px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '6px' }}>Technical</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '4px' }}>
                  {r.skills.technical.map((s, i) => (
                    <span key={i} style={{ background: goldBg, color: dark, border: `1px solid #d4b483`, padding: '2px 10px', borderRadius: '12px', fontSize: '9.5px' }}>{s}</span>
                  ))}
                </div>
              </div>
            )}
            {(r.skills?.soft || []).length > 0 && (
              <div style={{ textAlign: 'center' }}>
                <div style={{ color: gold, fontSize: '9px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '6px', marginTop: '8px' }}>Soft Skills</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '4px' }}>
                  {r.skills.soft.map((s, i) => (
                    <span key={i} style={{ color: '#6b7280', fontSize: '9.5px' }}>
                      {s}{i < r.skills.soft.length - 1 ? <span style={{ color: gold }}> · </span> : ''}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ── Projects ── */}
      {(r.projects || []).length > 0 && (
        <div style={{ marginBottom: '24px' }}>
          <SectionTitle>Notable Projects</SectionTitle>
          <Divider />
          {r.projects.map((proj, i) => (
            <div key={i} style={{ marginBottom: '10px', display: 'flex', gap: '12px' }}>
              <div style={{ width: '4px', borderRadius: '2px', background: gold, flexShrink: 0, marginTop: '2px' }} />
              <div>
                <span style={{ fontWeight: 700, color: dark, fontFamily: "'Playfair Display', Georgia, serif", fontSize: '11.5px' }}>{proj.name}</span>
                {proj.technologies && <span style={{ color: gold, fontSize: '9.5px', marginLeft: '8px', fontStyle: 'italic' }}>{proj.technologies}</span>}
                {proj.description && <p style={{ color: '#4b5563', marginTop: '3px', lineHeight: 1.5 }}>{proj.description}</p>}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Certifications ── */}
      {(r.certifications || []).length > 0 && (
        <div>
          <SectionTitle>Certifications</SectionTitle>
          <Divider />
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '10px' }}>
            {r.certifications.map((c, i) => (
              <div key={i} style={{ background: goldBg, border: `1px solid #d4b483`, borderRadius: '6px', padding: '8px 14px', textAlign: 'center' }}>
                <div style={{ fontWeight: 600, color: dark, fontSize: '10.5px' }}>{c.name}</div>
                {(c.issuer || c.date) && <div style={{ color: '#9ca3af', fontSize: '9px' }}>{[c.issuer, c.date].filter(Boolean).join(' · ')}</div>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Footer */}
      <div style={{ textAlign: 'center', marginTop: '28px', color: '#d4b483', fontSize: '9.5px' }}>
        ✦ &nbsp; {pi.name} &nbsp; ✦
      </div>
    </div>
  )
}
