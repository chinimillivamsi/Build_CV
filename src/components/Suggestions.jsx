const PRIORITY_CONFIG = {
  high:   { label: 'Critical',  bg: 'bg-red-50',    text: 'text-red-700',   border: 'border-red-200',   icon: '🔴', dot: 'bg-red-500' },
  medium: { label: 'Suggested', bg: 'bg-amber-50',  text: 'text-amber-700', border: 'border-amber-200', icon: '🟡', dot: 'bg-amber-400' },
  low:    { label: 'Optional',  bg: 'bg-blue-50',   text: 'text-blue-700',  border: 'border-blue-200',  icon: '🔵', dot: 'bg-blue-400' },
}

export default function Suggestions({ suggestions }) {
  if (!suggestions || suggestions.length === 0) {
    return (
      <div className="card p-6 text-center">
        <div className="text-4xl mb-3">🎉</div>
        <h3 className="font-semibold text-gray-900 mb-1">Looking great!</h3>
        <p className="text-gray-500 text-sm">No major improvements detected.</p>
      </div>
    )
  }

  const high   = suggestions.filter(s => s.priority === 'high')
  const medium = suggestions.filter(s => s.priority === 'medium')
  const low    = suggestions.filter(s => s.priority === 'low')

  const groups = [
    { priority: 'high',   items: high },
    { priority: 'medium', items: medium },
    { priority: 'low',    items: low },
  ].filter(g => g.items.length > 0)

  return (
    <div className="card p-6">
      <h3 className="section-title flex items-center gap-2">
        Improvement Suggestions
        <span className="ml-auto text-xs font-normal text-gray-400">{suggestions.length} items</span>
      </h3>

      <div className="space-y-4">
        {groups.map(({ priority, items }) => {
          const cfg = PRIORITY_CONFIG[priority]
          return (
            <div key={priority}>
              <div className="flex items-center gap-2 mb-2">
                <div className={`w-2 h-2 rounded-full ${cfg.dot}`} />
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{cfg.label}</span>
                <span className="text-xs text-gray-400">({items.length})</span>
              </div>
              <div className="space-y-2 pl-4">
                {items.map((s, i) => (
                  <div
                    key={i}
                    className={`${cfg.bg} ${cfg.border} border rounded-lg px-4 py-3 animate-slide-in`}
                    style={{ animationDelay: `${i * 50}ms` }}
                  >
                    <div className="flex items-start gap-2">
                      <span className="text-xs">{cfg.icon}</span>
                      <div>
                        <span className={`text-xs font-semibold ${cfg.text} mr-1.5`}>[{s.category}]</span>
                        <span className="text-sm text-gray-700">{s.suggestion}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
