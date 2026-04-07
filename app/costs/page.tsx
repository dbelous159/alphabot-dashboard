export const revalidate = 30
import { supabase } from '@/lib/supabase'

async function getCosts() {
  const { data } = await supabase
    .from('decisions')
    .select('ai_cost_usd, created_at')
    .order('created_at', { ascending: false })
    .limit(500)
  return data ?? []
}

async function getSnapshots() {
  const { data } = await supabase
    .from('portfolio_snapshots')
    .select('ai_cost_today, created_at')
    .order('created_at', { ascending: false })
    .limit(30)
  return data ?? []
}

export default async function CostsPage() {
  const [decisions, snapshots] = await Promise.all([getCosts(), getSnapshots()])

  const totalCost = decisions.reduce((sum: number, d: any) => sum + Number(d.ai_cost_usd ?? 0), 0)
  const todayStr = new Date().toDateString()
  const todayCost = decisions
    .filter((d: any) => new Date(d.created_at).toDateString() === todayStr)
    .reduce((sum: number, d: any) => sum + Number(d.ai_cost_usd ?? 0), 0)
  const avgPerDecision = decisions.length > 0 ? totalCost / decisions.length : 0
  const projectedMonthly = todayCost * 30

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">AI Costs</h1>
        <p className="text-[#8b8fa8] text-sm mt-1">Spending breakdown across all 4 AI models</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-[#1a1d27] border border-[#2a2d3a] rounded-xl p-5">
          <p className="text-[#8b8fa8] text-sm mb-1">Total Spent</p>
          <p className="text-white text-2xl font-bold">${totalCost.toFixed(4)}</p>
        </div>
        <div className="bg-[#1a1d27] border border-[#2a2d3a] rounded-xl p-5">
          <p className="text-[#8b8fa8] text-sm mb-1">Today</p>
          <p className="text-white text-2xl font-bold">${todayCost.toFixed(4)}</p>
        </div>
        <div className="bg-[#1a1d27] border border-[#2a2d3a] rounded-xl p-5">
          <p className="text-[#8b8fa8] text-sm mb-1">Per Decision</p>
          <p className="text-white text-2xl font-bold">${avgPerDecision.toFixed(4)}</p>
        </div>
        <div className="bg-[#1a1d27] border border-[#2a2d3a] rounded-xl p-5">
          <p className="text-[#8b8fa8] text-sm mb-1">Est. Monthly</p>
          <p className="text-white text-2xl font-bold">${projectedMonthly.toFixed(2)}</p>
        </div>
      </div>

      <div className="bg-[#1a1d27] border border-[#2a2d3a] rounded-xl p-5 mb-6">
        <h2 className="font-semibold text-white mb-4">Model Pricing</h2>
        <div className="space-y-3">
          {[
            { name: 'Gemini 2.5 Flash', role: 'Layer 1 — Scanner', input: '$0.075', output: '$0.30', color: 'text-yellow-400' },
            { name: 'Claude Haiku', role: 'Layer 2 — Validator', input: '$0.80', output: '$4.00', color: 'text-orange-400' },
            { name: 'Gemini 2.5 Pro', role: 'Layer 3 — Analyst', input: '$1.25', output: '$5.00', color: 'text-blue-400' },
            { name: 'Claude Opus', role: 'Layer 4 — Final Call', input: '$15.00', output: '$75.00', color: 'text-purple-400' },
          ].map(m => (
            <div key={m.name} className="flex items-center justify-between py-2 border-b border-[#2a2d3a] last:border-0">
              <div>
                <span className={`font-medium text-sm ${m.color}`}>{m.name}</span>
                <span className="text-[#8b8fa8] text-xs ml-2">{m.role}</span>
              </div>
              <div className="text-xs text-[#8b8fa8]">
                {m.input} / {m.output} per 1M tokens
              </div>
            </div>
          ))}
        </div>
      </div>

      {snapshots.length > 0 && (
        <div className="bg-[#1a1d27] border border-[#2a2d3a] rounded-xl p-5">
          <h2 className="font-semibold text-white mb-4">Daily Cost History</h2>
          <div className="space-y-2">
            {snapshots.map((s: any) => (
              <div key={s.id} className="flex items-center justify-between py-1">
                <span className="text-[#8b8fa8] text-sm">{new Date(s.created_at).toLocaleDateString()}</span>
                <span className="text-white text-sm font-medium">${Number(s.ai_cost_today ?? 0).toFixed(4)}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
