export const revalidate = 30
import { supabase } from '@/lib/supabase'

async function getTrades() {
  const { data } = await supabase
    .from('trades')
    .select('*, decisions(symbol, l4_reasoning, allocation_pct, stop_loss_pct, take_profit_pct)')
    .order('created_at', { ascending: false })
    .limit(50)
  return data ?? []
}

export default async function TradesPage() {
  const trades = await getTrades()

  const totalNotional = trades.reduce((sum: number, t: any) => sum + Number(t.notional ?? 0), 0)
  const buys = trades.filter((t: any) => t.side === 'buy').length
  const sells = trades.filter((t: any) => t.side === 'sell').length

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Trades</h1>
          <p className="text-[#8b8fa8] text-sm mt-1">All executed orders</p>
        </div>
        <div className="flex gap-3">
          <span className="bg-green-500/10 text-green-400 text-xs px-3 py-1 rounded-full border border-green-500/20">{buys} Buys</span>
          <span className="bg-red-500/10 text-red-400 text-xs px-3 py-1 rounded-full border border-red-500/20">{sells} Sells</span>
        </div>
      </div>

      {trades.length === 0 ? (
        <div className="bg-[#1a1d27] border border-[#2a2d3a] rounded-xl p-12 text-center">
          <p className="text-[#8b8fa8]">No trades executed yet.</p>
        </div>
      ) : (
        <>
          <div className="bg-[#1a1d27] border border-[#2a2d3a] rounded-xl p-5 mb-6">
            <p className="text-[#8b8fa8] text-sm">Total traded</p>
            <p className="text-white text-2xl font-bold">${totalNotional.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
          </div>

          <div className="space-y-3">
            {trades.map((t: any) => (
              <div key={t.id} className="bg-[#1a1d27] border border-[#2a2d3a] rounded-xl p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-white font-bold text-lg">{t.symbol}</span>
                    <span className={`text-sm font-medium px-2 py-0.5 rounded-full ${t.side === 'buy' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                      {t.side.toUpperCase()}
                    </span>
                    <span className="text-[#8b8fa8] text-xs">{t.status}</span>
                  </div>
                  <span className="text-[#8b8fa8] text-xs">{new Date(t.created_at).toLocaleString('en-US', { timeZone: 'America/New_York' })}</span>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-3">
                  <div className="text-xs"><span className="text-[#8b8fa8]">Amount </span><span className="text-white">${Number(t.notional ?? 0).toFixed(2)}</span></div>
                  {t.fill_price && <div className="text-xs"><span className="text-[#8b8fa8]">Fill </span><span className="text-white">${Number(t.fill_price).toFixed(2)}</span></div>}
                  {t.decisions?.stop_loss_pct && <div className="text-xs"><span className="text-[#8b8fa8]">Stop </span><span className="text-red-400">-{t.decisions.stop_loss_pct}%</span></div>}
                </div>

                {t.decisions?.l4_reasoning && (
                  <div className="text-xs text-[#8b8fa8] pt-3 border-t border-[#2a2d3a]">
                    <span className="text-purple-400 font-medium">AI Reasoning: </span>
                    {t.decisions.l4_reasoning}
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
