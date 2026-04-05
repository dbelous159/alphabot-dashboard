import { supabase } from '@/lib/supabase'

async function getDecisions() {
  const { data } = await supabase
    .from('decisions')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(100)
  return data ?? []
}

const layerColors: Record<string, string> = {
  L1: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  L2: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
  L3: 'bg-red-500/10 text-red-400 border-red-500/20',
  L4: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
}

export default async function DecisionsPage() {
  const decisions = await getDecisions()

  const executed = decisions.filter(d => d.executed).length
  const blocked = decisions.length - executed

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Decisions</h1>
          <p className="text-[#8b8fa8] text-sm mt-1">Every stock analyzed by the 4-layer AI</p>
        </div>
        <div className="flex gap-3">
          <span className="bg-green-500/10 text-green-400 text-xs px-3 py-1 rounded-full border border-green-500/20">{executed} Executed</span>
          <span className="bg-[#2a2d3a] text-[#8b8fa8] text-xs px-3 py-1 rounded-full">{blocked} Blocked</span>
        </div>
      </div>

      {decisions.length === 0 ? (
        <div className="bg-[#1a1d27] border border-[#2a2d3a] rounded-xl p-12 text-center">
          <p className="text-[#8b8fa8]">No decisions yet — the agent will start logging when the market opens.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {decisions.map((d: any) => (
            <div key={d.id} className="bg-[#1a1d27] border border-[#2a2d3a] rounded-xl p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-white font-bold text-lg">{d.symbol}</span>
                  <span className={`text-sm font-medium ${d.action === 'BUY' ? 'text-green-400' : d.action === 'SELL' ? 'text-red-400' : 'text-[#8b8fa8]'}`}>
                    {d.action}
                  </span>
                  {d.executed ? (
                    <span className="bg-green-500/10 text-green-400 text-xs px-2 py-0.5 rounded-full border border-green-500/20">EXECUTED</span>
                  ) : d.rejection_layer ? (
                    <span className={`text-xs px-2 py-0.5 rounded-full border ${layerColors[d.rejection_layer] ?? 'bg-[#2a2d3a] text-[#8b8fa8] border-transparent'}`}>
                      BLOCKED AT {d.rejection_layer}
                    </span>
                  ) : null}
                </div>
                <span className="text-[#8b8fa8] text-xs">{new Date(d.created_at).toLocaleString()}</span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
                {d.price && <div className="text-xs"><span className="text-[#8b8fa8]">Price </span><span className="text-white">${Number(d.price).toFixed(2)}</span></div>}
                {d.rsi && <div className="text-xs"><span className="text-[#8b8fa8]">RSI </span><span className="text-white">{Number(d.rsi).toFixed(1)}</span></div>}
                {d.pe_ratio && <div className="text-xs"><span className="text-[#8b8fa8]">P/E </span><span className="text-white">{Number(d.pe_ratio).toFixed(1)}</span></div>}
                {d.analyst_target && <div className="text-xs"><span className="text-[#8b8fa8]">Target </span><span className="text-white">${Number(d.analyst_target).toFixed(2)}</span></div>}
              </div>

              <div className="space-y-2">
                {d.l1_reasoning && (
                  <div className="text-xs">
                    <span className="text-yellow-400 font-medium">L1 ({d.l1_confidence}%): </span>
                    <span className="text-[#8b8fa8]">{d.l1_reasoning}</span>
                  </div>
                )}
                {d.l2_concerns && (
                  <div className="text-xs">
                    <span className="text-orange-400 font-medium">L2: </span>
                    <span className="text-[#8b8fa8]">{d.l2_concerns}</span>
                  </div>
                )}
                {d.l3_analysis && (
                  <div className="text-xs">
                    <span className="text-blue-400 font-medium">L3 ({d.l3_confidence}%, {d.l3_risk_rating}): </span>
                    <span className="text-[#8b8fa8]">{d.l3_analysis}</span>
                  </div>
                )}
                {d.l4_reasoning && (
                  <div className="text-xs">
                    <span className="text-purple-400 font-medium">L4: </span>
                    <span className="text-[#8b8fa8]">{d.l4_reasoning}</span>
                  </div>
                )}
                {d.rejection_reason && !d.executed && (
                  <div className="text-xs mt-2 pt-2 border-t border-[#2a2d3a]">
                    <span className="text-red-400 font-medium">Rejection: </span>
                    <span className="text-[#8b8fa8]">{d.rejection_reason}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
