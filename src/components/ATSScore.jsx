import { useEffect, useState } from 'react'
import { getScoreColor } from '../utils/atsScoring'

function ScoreRing({ score, size = 140 }) {
  const [animated, setAnimated] = useState(0)
  const r = 52
  const circumference = 2 * Math.PI * r
  const colors = getScoreColor(score)
  const offset = circumference - (animated / 100) * circumference

  useEffect(() => {
    const timeout = setTimeout(() => setAnimated(score), 100)
    return () => clearTimeout(timeout)
  }, [score])

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} viewBox="0 0 120 120">
        <circle cx="60" cy="60" r={r} className="score-circle-bg" />
        <circle
          cx="60" cy="60" r={r}
          className="score-circle-fill"
          stroke={colors.ring}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className={`text-3xl font-bold ${colors.text}`}>{score}</span>
        <span className="text-xs text-gray-400 font-medium">{colors.label}</span>
      </div>
    </div>
  )
}

function BreakdownBar({ label, score, max }) {
  const pct = Math.round((score / max) * 100)
  const color = pct >= 70 ? 'bg-emerald-500' : pct >= 40 ? 'bg-amber-400' : 'bg-red-400'

  return (
    <div className="mb-3">
      <div className="flex justify-between text-sm mb-1">
        <span className="text-gray-600 font-medium">{label}</span>
        <span className="text-gray-500">{score}/{max}</span>
      </div>
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ${color}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}

export default function ATSScore({ result }) {
  if (!result) return null

  const { total, breakdown, meta } = result
  const colors = getScoreColor(total)

  return (
    <div className="card p-6">
      <h3 className="section-title flex items-center gap-2">
        <span>ATS Score</span>
        <span className={`badge ${colors.bg} ${colors.text} ml-auto`}>{colors.label}</span>
      </h3>

      <div className="flex justify-center mb-6">
        <ScoreRing score={total} />
      </div>

      {/* Meta stats */}
      <div className="grid grid-cols-3 gap-3 mb-6 text-center">
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="text-xl font-bold text-gray-900">{meta?.wordCount ?? 0}</div>
          <div className="text-xs text-gray-500 mt-0.5">Words</div>
        </div>
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="text-xl font-bold text-gray-900">{meta?.keywordsFound ?? 0}</div>
          <div className="text-xs text-gray-500 mt-0.5">Keywords</div>
        </div>
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="text-xl font-bold text-gray-900">{meta?.actionVerbsFound ?? 0}</div>
          <div className="text-xs text-gray-500 mt-0.5">Action Verbs</div>
        </div>
      </div>

      {/* Breakdown */}
      <div className="border-t border-gray-100 pt-4">
        <h4 className="text-sm font-semibold text-gray-700 mb-3">Score Breakdown</h4>
        {Object.values(breakdown).map(({ label, score, max }) => (
          <BreakdownBar key={label} label={label} score={score} max={max} />
        ))}
      </div>
    </div>
  )
}
