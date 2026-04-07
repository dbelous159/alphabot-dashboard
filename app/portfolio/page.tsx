export const revalidate = 30
import { supabase } from '@/lib/supabase'

async function getTrades() {
  const { data } = await supabase
    .from('trades')
    .select('*, decisions(symbol, l4_reasoning, l3_analysis, allocation_pct, stop_loss_pct, take_profit_pct)')
    .order('created_at', { ascending: false })
  return data ?? []
}

async function getLatestReviews() {
  const { data } = await supabase
    .from('position_reviews')
    .select('*')
    .order('created_at', { ascending: false })
  return data ?? []
}

function groupBySymbol(trades: any[]) {
  const map: Record<string, any> = {}
  for (const t of trades) {
    const sym = t.symbol
    if (!map[sym]) {
      map[sym] = { symbol: sym, buys: [], sells: [], position_type: t.position_type }
    }
    if (t.side === 'buy') map[sym].buys.push(t)
    else map[sym].sells.push(t)
  }
  return Object.values(map)
}

export default async function PortfolioPage() {
  const [trades, reviews] = await Promise.all([getTrades(), getLatestReviews()])

  const latestReviewBySymbol: Record<string, any> = {}
  for (const r of reviews) {
    if (!latestReviewBySymbol[r.symbol]) latestReviewBySymbol[r.symbol] = r
  }

  const grouped = groupBySymbol(trades)
  const momentum = grouped.filter(g => g.position_type !== 'value')
  const value = grouped.filter(g => g.position_type === 'value')

  const totalBuys = trades.filter(t => t.side === 'buy').length
  const totalSells = trades.filter(t => t.side === 'sell').length
  const totalNotional = trades.filter(t => t.side === 'buy').reduce((s: number, t: any) => s + Number(t.notional ?? 0), 0)

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Portfolio</h1>
        <p className="text-[#8b8fa8] text-sm mt-1">Long-term value plays and short-term momentum trades</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-[#1a1d27] border border-[#2a2d3a] rounded-xl p-5">
          <p className="text-[#8b8fa8] text-sm mb-1">Total Deployed</p>
          <p className="text-white text-2xl font-bold">${totalNotional.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</p>
        </div>
        <div className="bg-[#1a1d27] border border-purple-500/20 rounded-xl p-5">
          <p className="text-purple-400 text-sm mb-1">Value Positions</p>
          <p className="text-white text-2xl font-bold">{value.length}</p>
          <p className="text-[#8b8fa8] text-xs mt-1">Long-term holds (6–12 mo)</p>
        </div>
        <div className="bg-[#1a1d27] border border-blue-500/20 rounded-xl p-5">
          <p className="text-blue-400 text-sm mb-1">Momentum Trades</p>
          <p className="text-white text-2xl font-bold">{momentum.length}</p>
          <p className="text-[#8b8fa8] text-xs mt-1">Short-term swing trades</p>
        </div>
      </div>

      {trades.length === 0 ? (
        <div className="bg-[#1a1d27] border border-[#2a2d3a] rounded-xl p-12 text-center">
          <p className="text-[#8b8fa8]">No trades yet. AlphaBot will start executing once it finds high-conviction opportunities.</p>
        </div>
      ) : (
        <div className="space-y-10">

          {/* Long-term value plays */}
          {value.length > 0 && (
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-lg">💎</span>
                <h2 className="text-white font-semibold">Long-Term Value Plays</h2>
                <span className="text-xs px-2.5 py-1 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">6–12 month horizon</span>
              </div>
              <div className="space-y-3">
                {value.map((g: any) => {
                  const review = latestReviewBySymbol[g.symbol]
                  const totalBought = g.buys.reduce((s: number, t: any) => s + Number(t.notional ?? 0), 0)
                  const avgEntry = g.buys.reduce((s: number, t: any) => s + Number(t.fill_price ?? 0), 0) / (g.buys.length || 1)
                  return (
                    <div key={g.symbol} className="bg-[#1a1d27] border border-purple-500/20 rounded-xl p-5">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <span className="text-white font-bold text-lg">{g.symbol}</span>
                          <span className="text-xs px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">Value</span>
                          {review && (
                            <span className={`text-xs px-2 py-0.5 rounded-full border ${
                              review.action === 'HOLD' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                              review.action === 'ADD' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                              review.action === 'REDUCE' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' :
                              'bg-red-500/10 text-red-400 border-red-500/20'
                            }`}>{review.action}</span>
                          )}
                        </div>
                        <span className="text-[#8b8fa8] text-xs">{new Date(g.buys[0]?.created_at).toLocaleDateString('en-US', { timeZone: 'America/New_York' })}</span>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3 text-xs">
                        <div><span className="text-[#8b8fa8]">Deployed </span><span className="text-white font-medium">${totalBought.toFixed(0)}</span></div>
                        <div><span className="text-[#8b8fa8]">Avg entry </span><span className="text-white font-medium">{avgEntry > 0 ? `$${avgEntry.toFixed(2)}` : '—'}</span></div>
                        {review && <div><span className="text-[#8b8fa8]">Current </span><span className="text-white font-medium">${Number(review.current_price ?? 0).toFixed(2)}</span></div>}
                        {review && (
                          <div>
                            <span className="text-[#8b8fa8]">P&L </span>
                            <span className={`font-medium ${Number(review.unrealized_pct) >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                              {Number(review.unrealized_pct) >= 0 ? '+' : ''}{Number(review.unrealized_pct ?? 0).toFixed(2)}%
                            </span>
                          </div>
                        )}
                      </div>

                      {review && (
                        <div className="text-xs text-[#8b8fa8] pt-3 border-t border-[#2a2d3a]">
                          <span className="text-purple-400 font-medium">AI View: </span>
                          {review.reasoning}
                        </div>
                      )}

                      {!review && g.buys[0]?.decisions?.l4_reasoning && (
                        <div className="text-xs text-[#8b8fa8] pt-3 border-t border-[#2a2d3a]">
                          <span className="text-purple-400 font-medium">Entry thesis: </span>
                          {g.buys[0].decisions.l4_reasoning}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Momentum trades */}
          {momentum.length > 0 && (
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-lg">⚡</span>
                <h2 className="text-white font-semibold">Momentum Trades</h2>
                <span className="text-xs px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">Intraday / swing</span>
              </div>
              <div className="space-y-3">
                {momentum.map((g: any) => {
                  const review = latestReviewBySymbol[g.symbol]
                  const totalBought = g.buys.reduce((s: number, t: any) => s + Number(t.notional ?? 0), 0)
                  const avgEntry = g.buys.reduce((s: number, t: any) => s + Number(t.fill_price ?? 0), 0) / (g.buys.length || 1)
                  return (
                    <div key={g.symbol} className="bg-[#1a1d27] border border-[#2a2d3a] rounded-xl p-5">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <span className="text-white font-bold text-lg">{g.symbol}</span>
                          <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">Momentum</span>
                          {g.sells.length > 0 && <span className="text-xs text-[#8b8fa8]">Closed</span>}
                          {review && (
                            <span className={`text-xs px-2 py-0.5 rounded-full border ${
                              review.action === 'HOLD' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                              review.action === 'ADD' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                              review.action === 'REDUCE' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' :
                              'bg-red-500/10 text-red-400 border-red-500/20'
                            }`}>{review.action}</span>
                          )}
                        </div>
                        <span className="text-[#8b8fa8] text-xs">{new Date(g.buys[0]?.created_at).toLocaleDateString('en-US', { timeZone: 'America/New_York' })}</span>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3 text-xs">
                        <div><span className="text-[#8b8fa8]">Deployed </span><span className="text-white font-medium">${totalBought.toFixed(0)}</span></div>
                        <div><span className="text-[#8b8fa8]">Avg entry </span><span className="text-white font-medium">{avgEntry > 0 ? `$${avgEntry.toFixed(2)}` : '—'}</span></div>
                        {review && <div><span className="text-[#8b8fa8]">Current </span><span className="text-white font-medium">${Number(review.current_price ?? 0).toFixed(2)}</span></div>}
                        {review && (
                          <div>
                            <span className="text-[#8b8fa8]">P&L </span>
                            <span className={`font-medium ${Number(review.unrealized_pct) >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                              {Number(review.unrealized_pct) >= 0 ? '+' : ''}{Number(review.unrealized_pct ?? 0).toFixed(2)}%
                            </span>
                          </div>
                        )}
                      </div>

                      {g.buys[0]?.decisions?.l4_reasoning && (
                        <div className="text-xs text-[#8b8fa8] pt-3 border-t border-[#2a2d3a]">
                          <span className="text-blue-400 font-medium">AI Reasoning: </span>
                          {g.buys[0].decisions.l4_reasoning}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          )}

        </div>
      )}
    </div>
  )
}
