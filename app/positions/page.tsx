export const revalidate = 30
import { supabase } from '@/lib/supabase'

async function getPositionReviews() {
  const { data } = await supabase
    .from('position_reviews')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(100)
  return data ?? []
}

const actionColors: Record<string, string> = {
  HOLD: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  ADD: 'bg-green-500/10 text-green-400 border-green-500/20',
  REDUCE: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  EXIT: 'bg-red-500/10 text-red-400 border-red-500/20',
}

const outlookColors: Record<string, string> = {
  bullish: 'text-green-400',
  neutral: 'text-[#8b8fa8]',
  bearish: 'text-red-400',
}

export default async function PositionsPage() {
  const reviews = await getPositionReviews()

  // Group by symbol to show latest review per position
  const latestBySymbol: Record<string, typeof reviews[0]> = {}
  for (const r of reviews) {
    if (!latestBySymbol[r.symbol]) latestBySymbol[r.symbol] = r
  }
  const latest = Object.values(latestBySymbol)

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Position Reviews</h1>
        <p className="text-[#8b8fa8] text-sm mt-1">AI fundamental analysis of open positions — HOLD, ADD, REDUCE, or EXIT</p>
      </div>

      {reviews.length === 0 ? (
        <div className="bg-[#1a1d27] border border-[#2a2d3a] rounded-xl p-12 text-center">
          <p className="text-[#8b8fa8]">No position reviews yet. Reviews run at 9 AM and 2 PM ET on trading days.</p>
        </div>
      ) : (
        <>
          {/* Latest verdict per symbol */}
          <div className="mb-8">
            <p className="text-xs uppercase tracking-widest text-[#8b8fa8] mb-4">Current AI Verdict</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {latest.map(r => (
                <div key={r.symbol} className="bg-[#1a1d27] border border-[#2a2d3a] rounded-xl p-5">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-white font-bold text-lg">{r.symbol}</span>
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${actionColors[r.action] ?? 'text-white'}`}>
                      {r.action}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mb-3 text-xs">
                    <div>
                      <span className="text-[#8b8fa8]">Conviction </span>
                      <span className="text-white font-medium">{r.conviction ?? '—'}%</span>
                    </div>
                    <div>
                      <span className="text-[#8b8fa8]">Beat market </span>
                      <span className="text-white font-medium">{r.beat_market_probability ?? '—'}%</span>
                    </div>
                    <div>
                      <span className="text-[#8b8fa8]">Entry </span>
                      <span className="text-white font-medium">${Number(r.entry_price ?? 0).toFixed(2)}</span>
                    </div>
                    <div>
                      <span className="text-[#8b8fa8]">Now </span>
                      <span className={`font-medium ${Number(r.unrealized_pct) >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {Number(r.unrealized_pct) >= 0 ? '+' : ''}{Number(r.unrealized_pct ?? 0).toFixed(2)}%
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-[#8b8fa8] text-xs">Outlook:</span>
                    <span className={`text-xs font-medium capitalize ${outlookColors[r.fundamental_outlook] ?? 'text-white'}`}>
                      {r.fundamental_outlook ?? '—'}
                    </span>
                    <span className="text-[#8b8fa8] text-xs ml-2">Thesis:</span>
                    <span className={`text-xs font-medium ${r.thesis_intact ? 'text-green-400' : 'text-red-400'}`}>
                      {r.thesis_intact ? 'Intact' : 'Broken'}
                    </span>
                  </div>

                  <p className="text-xs text-[#8b8fa8] leading-relaxed">{r.reasoning}</p>
                  <p className="text-xs text-[#8b8fa8] mt-2">{new Date(r.created_at).toLocaleString('en-US', { timeZone: 'America/New_York' })}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Full review history */}
          <div>
            <p className="text-xs uppercase tracking-widest text-[#8b8fa8] mb-4">Review History</p>
            <div className="space-y-3">
              {reviews.map(r => (
                <div key={r.id} className="bg-[#1a1d27] border border-[#2a2d3a] rounded-xl p-5">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <span className="text-white font-bold">{r.symbol}</span>
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${actionColors[r.action] ?? 'text-white'}`}>
                        {r.action}
                      </span>
                      {r.action === 'ADD' && r.add_allocation_pct && (
                        <span className="text-xs text-green-400">+{r.add_allocation_pct}%</span>
                      )}
                      {r.action === 'REDUCE' && r.reduce_pct && (
                        <span className="text-xs text-yellow-400">-{r.reduce_pct}% of position</span>
                      )}
                    </div>
                    <span className="text-[#8b8fa8] text-xs">{new Date(r.created_at).toLocaleString('en-US', { timeZone: 'America/New_York' })}</span>
                  </div>

                  <div className="flex gap-4 text-xs mb-2">
                    <span className="text-[#8b8fa8]">Conviction <span className="text-white">{r.conviction ?? '—'}%</span></span>
                    <span className="text-[#8b8fa8]">Beat market <span className="text-white">{r.beat_market_probability ?? '—'}%</span></span>
                    <span className="text-[#8b8fa8]">P&L <span className={Number(r.unrealized_pct) >= 0 ? 'text-green-400' : 'text-red-400'}>
                      {Number(r.unrealized_pct) >= 0 ? '+' : ''}{Number(r.unrealized_pct ?? 0).toFixed(2)}%
                    </span></span>
                    <span className={`capitalize ${outlookColors[r.fundamental_outlook] ?? 'text-white'}`}>{r.fundamental_outlook ?? '—'}</span>
                  </div>

                  <p className="text-xs text-[#8b8fa8] leading-relaxed">{r.reasoning}</p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
