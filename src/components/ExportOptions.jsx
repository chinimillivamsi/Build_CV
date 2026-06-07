import { useState } from 'react'
import { exportToPDF, exportToDocx } from '../utils/exportUtils'

export default function ExportOptions({ resumeData, resumeElementId }) {
  const [pdfLoading,  setPdfLoading]  = useState(false)
  const [docxLoading, setDocxLoading] = useState(false)
  const [error, setError] = useState('')

  const filename = (resumeData?.personalInfo?.name || 'resume')
    .toLowerCase().replace(/\s+/g, '_') + '_resume'

  const handlePDF = async () => {
    setError('')
    setPdfLoading(true)
    try {
      await exportToPDF(resumeElementId, filename)
    } catch (e) {
      setError('PDF export failed. Please try again.')
      console.error(e)
    } finally {
      setPdfLoading(false)
    }
  }

  const handleDocx = async () => {
    setError('')
    setDocxLoading(true)
    try {
      await exportToDocx(resumeData, filename)
    } catch (e) {
      setError('DOCX export failed. Please try again.')
      console.error(e)
    } finally {
      setDocxLoading(false)
    }
  }

  return (
    <div className="card p-6">
      <h3 className="section-title">Export Resume</h3>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm mb-4">
          {error}
        </div>
      )}

      <div className="space-y-3">
        <button
          onClick={handlePDF}
          disabled={pdfLoading}
          className="w-full flex items-center gap-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white rounded-xl px-5 py-4 font-medium transition-colors"
        >
          <span className="text-2xl">📄</span>
          <div className="text-left">
            <div className="font-semibold">{pdfLoading ? 'Generating PDF…' : 'Download as PDF'}</div>
            <div className="text-blue-200 text-xs">Best for submitting to job applications</div>
          </div>
          {!pdfLoading && <span className="ml-auto">↓</span>}
          {pdfLoading && <span className="ml-auto animate-spin">⏳</span>}
        </button>

        <button
          onClick={handleDocx}
          disabled={docxLoading}
          className="w-full flex items-center gap-3 bg-white hover:bg-gray-50 disabled:opacity-60 text-gray-700 border border-gray-200 rounded-xl px-5 py-4 font-medium transition-colors"
        >
          <span className="text-2xl">📝</span>
          <div className="text-left">
            <div className="font-semibold">{docxLoading ? 'Generating DOCX…' : 'Download as DOCX'}</div>
            <div className="text-gray-400 text-xs">Editable Word document</div>
          </div>
          {!docxLoading && <span className="ml-auto text-gray-400">↓</span>}
          {docxLoading && <span className="ml-auto animate-spin">⏳</span>}
        </button>

        <button
          onClick={() => window.print()}
          className="w-full flex items-center gap-3 bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 rounded-xl px-5 py-4 font-medium transition-colors"
        >
          <span className="text-2xl">🖨️</span>
          <div className="text-left">
            <div className="font-semibold">Print Resume</div>
            <div className="text-gray-400 text-xs">Print or save as PDF via browser</div>
          </div>
          <span className="ml-auto text-gray-400">⌘P</span>
        </button>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-100 text-xs text-gray-400 text-center">
        Tip: Use "Save as PDF" in print dialog for highest quality output.
      </div>
    </div>
  )
}
