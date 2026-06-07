import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, BorderStyle, Table, TableRow, TableCell, WidthType } from 'docx'
import { saveAs } from 'file-saver'

// ── PDF Export ────────────────────────────────────────────────────────────────

export async function exportToPDF(elementId, filename = 'resume') {
  const element = document.getElementById(elementId)
  if (!element) throw new Error('Resume element not found')

  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    logging: false,
    backgroundColor: '#ffffff',
    width: element.scrollWidth,
    height: element.scrollHeight,
  })

  const imgData = canvas.toDataURL('image/png')
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  })

  const pdfWidth  = pdf.internal.pageSize.getWidth()
  const pdfHeight = pdf.internal.pageSize.getHeight()
  const imgWidth  = canvas.width
  const imgHeight = canvas.height
  const ratio     = pdfWidth / imgWidth
  const scaledH   = imgHeight * ratio

  if (scaledH <= pdfHeight) {
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, scaledH)
  } else {
    // Multi-page
    let yPosition = 0
    let page = 0
    while (yPosition < imgHeight) {
      if (page > 0) pdf.addPage()
      const pageH = pdfHeight / ratio
      pdf.addImage(imgData, 'PNG', 0, -(yPosition * ratio), pdfWidth, scaledH)
      yPosition += pageH
      page++
    }
  }

  pdf.save(`${filename}.pdf`)
}

// ── DOCX Export ───────────────────────────────────────────────────────────────

function makeHr() {
  return new Paragraph({
    border: { bottom: { color: 'cccccc', style: BorderStyle.SINGLE, size: 6 } },
    spacing: { after: 120 },
  })
}

function sectionHeading(text) {
  return new Paragraph({
    text: text.toUpperCase(),
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 240, after: 80 },
    border: { bottom: { color: '2563eb', style: BorderStyle.SINGLE, size: 8 } },
  })
}

export async function exportToDocx(resumeData, filename = 'resume') {
  const r = resumeData
  const pi = r.personalInfo || {}

  const children = []

  // ── Header ──
  if (pi.name) {
    children.push(new Paragraph({
      children: [new TextRun({ text: pi.name, bold: true, size: 48, color: '1e3a5f' })],
      alignment: AlignmentType.CENTER,
      spacing: { after: 60 },
    }))
  }

  const contactParts = [pi.email, pi.phone, pi.location, pi.linkedin, pi.website].filter(Boolean)
  if (contactParts.length) {
    children.push(new Paragraph({
      children: contactParts.map((c, i) => new TextRun({
        text: i < contactParts.length - 1 ? `${c}  |  ` : c,
        size: 20,
        color: '555555',
      })),
      alignment: AlignmentType.CENTER,
      spacing: { after: 200 },
    }))
  }

  // ── Summary ──
  if (pi.summary) {
    children.push(sectionHeading('Professional Summary'))
    children.push(new Paragraph({
      children: [new TextRun({ text: pi.summary, size: 22 })],
      spacing: { after: 160 },
    }))
    children.push(makeHr())
  }

  // ── Experience ──
  if ((r.experience || []).length > 0) {
    children.push(sectionHeading('Work Experience'))
    r.experience.forEach(exp => {
      const dateStr = [exp.startDate, exp.current ? 'Present' : exp.endDate].filter(Boolean).join(' – ')
      children.push(new Paragraph({
        children: [
          new TextRun({ text: exp.position || '', bold: true, size: 24 }),
          new TextRun({ text: exp.company ? `  ·  ${exp.company}` : '', size: 22, color: '2563eb' }),
          new TextRun({ text: dateStr ? `  |  ${dateStr}` : '', size: 20, color: '888888' }),
        ],
        spacing: { before: 160, after: 60 },
      }))
      if (exp.description) {
        exp.description.split('\n').filter(Boolean).forEach(line => {
          children.push(new Paragraph({
            children: [new TextRun({ text: line.replace(/^[-•]\s*/, ''), size: 22 })],
            bullet: { level: 0 },
            spacing: { after: 40 },
          }))
        })
      }
      ;(exp.achievements || []).filter(Boolean).forEach(a => {
        children.push(new Paragraph({
          children: [new TextRun({ text: a, size: 22 })],
          bullet: { level: 0 },
          spacing: { after: 40 },
        }))
      })
    })
    children.push(makeHr())
  }

  // ── Education ──
  if ((r.education || []).length > 0) {
    children.push(sectionHeading('Education'))
    r.education.forEach(edu => {
      children.push(new Paragraph({
        children: [
          new TextRun({ text: edu.institution || '', bold: true, size: 24 }),
          new TextRun({ text: edu.degree ? `  ·  ${edu.degree}${edu.field ? ' in ' + edu.field : ''}` : '', size: 22 }),
          new TextRun({ text: edu.endDate ? `  |  ${edu.endDate}` : '', size: 20, color: '888888' }),
        ],
        spacing: { before: 120, after: 80 },
      }))
    })
    children.push(makeHr())
  }

  // ── Skills ──
  const allSkills = [
    ...(r.skills?.technical || []),
    ...(r.skills?.soft || []),
    ...(r.skills?.languages || []),
  ]
  if (allSkills.length) {
    children.push(sectionHeading('Skills'))
    children.push(new Paragraph({
      children: [new TextRun({ text: allSkills.join('  ·  '), size: 22 })],
      spacing: { after: 120 },
    }))
    children.push(makeHr())
  }

  // ── Projects ──
  if ((r.projects || []).length > 0) {
    children.push(sectionHeading('Projects'))
    r.projects.forEach(proj => {
      children.push(new Paragraph({
        children: [
          new TextRun({ text: proj.name || '', bold: true, size: 24 }),
          proj.technologies ? new TextRun({ text: `  ·  ${proj.technologies}`, size: 20, color: '888888' }) : null,
        ].filter(Boolean),
        spacing: { before: 120, after: 40 },
      }))
      if (proj.description) {
        children.push(new Paragraph({
          children: [new TextRun({ text: proj.description, size: 22 })],
          spacing: { after: 80 },
        }))
      }
    })
    children.push(makeHr())
  }

  // ── Certifications ──
  if ((r.certifications || []).length > 0) {
    children.push(sectionHeading('Certifications'))
    r.certifications.forEach(cert => {
      children.push(new Paragraph({
        children: [
          new TextRun({ text: cert.name || '', bold: true, size: 22 }),
          cert.issuer ? new TextRun({ text: `  ·  ${cert.issuer}`, size: 20, color: '555555' }) : null,
          cert.date ? new TextRun({ text: `  (${cert.date})`, size: 20, color: '888888' }) : null,
        ].filter(Boolean),
        spacing: { after: 60 },
      }))
    })
  }

  const doc = new Document({
    sections: [{
      properties: {},
      children,
    }],
    styles: {
      paragraphStyles: [{
        id: 'Heading2',
        name: 'Heading 2',
        basedOn: 'Normal',
        next: 'Normal',
        run: { size: 26, bold: true, color: '1e3a5f' },
      }],
    },
  })

  const blob = await Packer.toBlob(doc)
  saveAs(blob, `${filename}.docx`)
}
