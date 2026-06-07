import { useState, useEffect, useCallback, useRef } from 'react'
import TemplateGallery from './components/TemplateGallery'
import ResumeForm      from './components/ResumeForm'
import ResumePreview   from './components/ResumePreview'
import ATSScore        from './components/ATSScore'
import Suggestions     from './components/Suggestions'
import ExportOptions   from './components/ExportOptions'
import { calculateATSScore } from './utils/atsScoring'

const STEPS = ['Template', 'Build', 'Preview & Analyze']

const INITIAL_RESUME = {
  personalInfo: {
    name: '', email: '', phone: '', location: '',
    summary: '', linkedin: '', website: '',
  },
  experience: [
    { company: '', position: '', startDate: '', endDate: '', current: false, description: '', achievements: [''] }
  ],
  education: [
    { institution: '', degree: '', field: '', startDate: '', endDate: '', gpa: '' }
  ],
  skills: { technical: [], soft: [], languages: [] },
  projects: [],
  certifications: [],
}

function Stepper({ current }) {
  return (
    <div className="flex items-center gap-0">
      {STEPS.map((label, i) => (
        <div key={i} className="flex items-center">
          <div className={`flex items-center gap-2 ${i <= current ? 'text-blue-600' : 'text-gray-400'}`}>
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors
              ${i < current ? 'bg-blue-600 text-white' : i === current ? 'border-2 border-blue-600 text-blue-600' : 'border-2 border-gray-300 text-gray-400'}`}>
              {i < current ? '✓' : i + 1}
            </div>
            <span className={`text-sm font-medium hidden sm:block ${i === current ? 'text-blue-600' : ''}`}>{label}</span>
          </div>
          {i < STEPS.length - 1 && (
            <div className={`mx-3 h-px w-12 sm:w-20 transition-colors ${i < current ? 'bg-blue-600' : 'bg-gray-200'}`} />
          )}
        </div>
      ))}
    </div>
  )
}

export default function App() {
  const [step, setStep]               = useState(0)
  const [templateId, setTemplateId]   = useState('minimalist')
  const [resumeData, setResumeData]   = useState(INITIAL_RESUME)
  const [atsResult, setAtsResult]     = useState(null)
  const [showPreview, setShowPreview] = useState(true)
  const debounceRef = useRef(null)

  // Debounced ATS scoring on resume changes
  useEffect(() => {
    clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      const result = calculateATSScore(resumeData)
      setAtsResult(result)
    }, 600)
    return () => clearTimeout(debounceRef.current)
  }, [resumeData])

  const handleResumeChange = useCallback((updated) => {
    setResumeData(updated)
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navbar */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">CV</span>
            </div>
            <span className="font-bold text-gray-900 text-lg">BuildCV</span>
            <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full font-medium ml-1 hidden sm:inline">ATS-Powered</span>
          </div>

          <Stepper current={step} />

          <div className="flex items-center gap-2">
            {step > 0 && (
              <div className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                atsResult
                  ? atsResult.total >= 70 ? 'bg-emerald-50 text-emerald-700'
                  : atsResult.total >= 45 ? 'bg-amber-50 text-amber-700'
                  : 'bg-red-50 text-red-700'
                  : 'bg-gray-100 text-gray-500'
              }`}>
                {atsResult ? `ATS: ${atsResult.total}` : 'ATS: –'}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1">
        {/* STEP 0: Template Gallery */}
        {step === 0 && (
          <TemplateGallery
            selected={templateId}
            onSelect={setTemplateId}
            onNext={() => setStep(1)}
          />
        )}

        {/* STEP 1: Form + Live Preview (split view) */}
        {step === 1 && (
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex gap-6">
              {/* Form panel */}
              <div className={showPreview ? 'flex-1 min-w-0' : 'flex-1'}>
                <ResumeForm
                  resumeData={resumeData}
                  onChange={handleResumeChange}
                  onNext={() => setStep(2)}
                  onBack={() => setStep(0)}
                />
              </div>

              {/* Live preview toggle & panel */}
              <div className={`hidden xl:block ${showPreview ? 'w-96 shrink-0' : 'hidden'}`}>
                <div className="sticky top-20">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-semibold text-gray-700">Live Preview</span>
                    <span className="text-xs text-gray-400">Updates as you type</span>
                  </div>
                  <div style={{ transform: 'scale(0.62)', transformOrigin: 'top left', width: '161%' }}>
                    <ResumePreview
                      templateId={templateId}
                      resumeData={resumeData}
                      previewId="resume-live"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: Full Preview + ATS + Export */}
        {step === 2 && (
          <div className="max-w-7xl mx-auto px-8 py-6">
            <div className="grid gap-8" style={{ gridTemplateColumns: 'minmax(0, 3fr) minmax(0, 2fr)', alignItems: 'start' }}>
              {/* Left: resume preview */}
              <div className="min-w-0">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-900">Resume Preview</h2>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setStep(1)}
                      className="btn-secondary text-sm"
                    >
                      ← Edit
                    </button>
                    <button
                      onClick={() => setStep(0)}
                      className="btn-ghost text-sm"
                    >
                      Change Template
                    </button>
                  </div>
                </div>
                <ResumePreview
                  templateId={templateId}
                  resumeData={resumeData}
                  previewId="resume-export"
                />
              </div>

              {/* Right: ATS + Suggestions + Export — sticky, independently scrollable */}
              <div
                className="space-y-4 overflow-y-auto"
                style={{ position: 'sticky', top: '68px', maxHeight: 'calc(100vh - 84px)' }}
              >
                <ATSScore result={atsResult} />
                <Suggestions suggestions={atsResult?.suggestions} />
                <ExportOptions
                  resumeData={resumeData}
                  resumeElementId="resume-export"
                />
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-4 text-center text-xs text-gray-400">
        BuildCV · Powered by React & Tailwind · ATS scoring runs locally in your browser
      </footer>
    </div>
  )
}
