// Dense single-column ATS-optimized layout — maximum info density, clean parsing
export default function CompactTemplate({ data }) {
  const r = data || {}
  const pi = r.personalInfo || {}

  const Rule = () => <div style={{ height: '1px', background: '#d1d5db', margin: '6px 0 8px' }} />

  const SectionTitle = ({ children }) => (
    <div style={{ background: '#1e293b', color: 'white', padding: '3px 8px', marginBottom: '8px', fontSize: '9px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
      {children}
    </div>
  )

  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif", fontSize: '10.5px', color: '#111827', background: 'white', minHeight: '297mm', width: '100%', padding: '28px 36px' }}>

      {/* ── Header — single line of contact ── */}
      <div style={{ textAlign: 'center', marginBottom: '10px' }}>
        <h1 style={{ fontSize: '22px', fontWeight: 700, color: '#0f172a', letterSpacing: '-0.01em', marginBottom: '4px' }}>
          {pi.name || 'Your Name'}
        </h1>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0', fontSize: '10px', color: '#374151' }}>
          {[pi.email, pi.phone, pi.location, pi.linkedin, pi.website].filter(Boolean).map((item, i, arr) => (
            <span key={i}>
              {item}
              {i < arr.length - 1 && <span style={{ color: '#9ca3af', margin: '0 6px' }}>|</span>}
            </span>
          ))}
        </div>
      </div>

      <div style={{ borderTop: '2px solid #0f172a', borderBottom: '1px solid #9ca3af', padding: '3px 0', marginBottom: '12px' }} />

      {/* ── Summary ── */}
      {pi.summary && (
        <div style={{ marginBottom: '12px' }}>
          <SectionTitle>Summary</SectionTitle>
          <p style={{ color: '#374151', lineHeight: 1.55, margin: 0 }}>{pi.summary}</p>
        </div>
      )}

      {/* ── Experience ── */}
      {(r.experience || []).length > 0 && (
        <div style={{ marginBottom: '12px' }}>
          <SectionTitle>Professional Experience</SectionTitle>
          {r.experience.map((exp, i) => (
            <div key={i} style={{ marginBottom: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1px' }}>
                <div>
                  <span style={{ fontWeight: 700, fontSize: '11.5px', color: '#0f172a' }}>{exp.position}</span>
                  {exp.company && <span style={{ color: '#374151' }}>, {exp.company}</span>}
                </div>
                <span style={{ color: '#6b7280', fontSize: '10px', whiteSpace: 'nowrap', marginLeft: '12px' }}>
                  {[exp.startDate, exp.current ? 'Present' : exp.endDate].filter(Boolean).join(' – ')}
                </span>
              </div>
              {exp.description && exp.description.split('\n').filter(Boolean).map((line, j) => (
                <div key={j} style={{ display: 'flex', gap: '6px', marginTop: '2px', color: '#374151', lineHeight: 1.45 }}>
                  <span style={{ flexShrink: 0, color: '#6b7280' }}>•</span>
                  <span>{line.replace(/^[-•]\s*/, '')}</span>
                </div>
              ))}
              {(exp.achievements || []).filter(Boolean).map((a, j) => (
                <div key={`a${j}`} style={{ display: 'flex', gap: '6px', marginTop: '2px', color: '#374151', lineHeight: 1.45 }}>
                  <span style={{ flexShrink: 0, color: '#6b7280' }}>•</span>
                  <span>{a}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      {/* ── Education ── */}
      {(r.education || []).length > 0 && (
        <div style={{ marginBottom: '12px' }}>
          <SectionTitle>Education</SectionTitle>
          {r.education.map((edu, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
              <div>
                <span style={{ fontWeight: 700, color: '#0f172a', fontSize: '11px' }}>{edu.institution}</span>
                {(edu.degree || edu.field) && (
                  <span style={{ color: '#374151' }}> — {[edu.degree, edu.field ? `in ${edu.field}` : ''].filter(Boolean).join(' ')}</span>
                )}
                {edu.gpa && <span style={{ color: '#6b7280' }}> · GPA: {edu.gpa}</span>}
              </div>
              <span style={{ color: '#6b7280', fontSize: '10px', whiteSpace: 'nowrap', marginLeft: '12px' }}>
                {[edu.startDate, edu.endDate].filter(Boolean).join(' – ')}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* ── Skills (single line) ── */}
      {((r.skills?.technical || []).length > 0 || (r.skills?.soft || []).length > 0) && (
        <div style={{ marginBottom: '12px' }}>
          <SectionTitle>Skills</SectionTitle>
          {(r.skills?.technical || []).length > 0 && (
            <div style={{ marginBottom: '4px' }}>
              <span style={{ fontWeight: 600, color: '#0f172a' }}>Technical: </span>
              <span style={{ color: '#374151' }}>{r.skills.technical.join(' · ')}</span>
            </div>
          )}
          {(r.skills?.soft || []).length > 0 && (
            <div style={{ marginBottom: '4px' }}>
              <span style={{ fontWeight: 600, color: '#0f172a' }}>Soft Skills: </span>
              <span style={{ color: '#374151' }}>{r.skills.soft.join(' · ')}</span>
            </div>
          )}
          {(r.skills?.languages || []).length > 0 && (
            <div>
              <span style={{ fontWeight: 600, color: '#0f172a' }}>Languages: </span>
              <span style={{ color: '#374151' }}>{r.skills.languages.join(' · ')}</span>
            </div>
          )}
        </div>
      )}

      {/* ── Projects ── */}
      {(r.projects || []).length > 0 && (
        <div style={{ marginBottom: '12px' }}>
          <SectionTitle>Projects</SectionTitle>
          {r.projects.map((proj, i) => (
            <div key={i} style={{ marginBottom: '7px' }}>
              <div>
                <span style={{ fontWeight: 700, color: '#0f172a', fontSize: '11px' }}>{proj.name}</span>
                {proj.technologies && <span style={{ color: '#6b7280' }}> | {proj.technologies}</span>}
                {proj.link && <span style={{ color: '#2563eb' }}> · {proj.link}</span>}
              </div>
              {proj.description && (
                <div style={{ display: 'flex', gap: '6px', marginTop: '2px', color: '#374151', lineHeight: 1.45 }}>
                  <span style={{ color: '#6b7280', flexShrink: 0 }}>•</span>
                  <span>{proj.description}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* ── Certifications ── */}
      {(r.certifications || []).length > 0 && (
        <div>
          <SectionTitle>Certifications</SectionTitle>
          {r.certifications.map((c, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
              <span>
                <span style={{ fontWeight: 600, color: '#0f172a' }}>{c.name}</span>
                {c.issuer && <span style={{ color: '#374151' }}> — {c.issuer}</span>}
              </span>
              {c.date && <span style={{ color: '#6b7280', fontSize: '10px' }}>{c.date}</span>}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
