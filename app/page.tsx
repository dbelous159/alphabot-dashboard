import { supabase } from '@/lib/supabase'

async function getStats() {
  const [snapshotRes, decisionsRes, tradesRes] = await Promise.all([
    supabase.from('portfolio_snapshots').select('*').order('created_at', { ascending: false }).limit(1),
    supabase.from('decisions').select('id, executed, action, symbol, created_at, rejection_layer').order('created_at', { ascending: false }).limit(8),
    supabase.from('trades').select('*').order('created_at', { ascending: false }).limit(5),
  ])
  return {
    snapshot: snapshotRes.data?.[0] ?? null,
    recentDecisions: decisionsRes.data ?? [],
    recentTrades: tradesRes.data ?? [],
  }
}

function StatCard({ label, value, color }: { label: string; value: string; color?: string }) {
  return (
    <div className="bg-[#1a1d27] border border-[#2a2d3a] rounded-xl p-5">
      <p className="text-[#8b8fa8] text-sm mb-1">{label}</p>
      <p className={`text-2xl font-bold ${color ?? 'text-white'}`}>{value}</p>
    </div>
  )
}

export default async function HomePage() {
  const { snapshot, recentDecisions, recentTrades } = await getStats()

  const portfolioValue = Number(snapshot?.portfolio_value ?? 100000)
  const totalPnl = Number(snapshot?.total_pnl ?? 0)
  const dayPnl = Number(snapshot?.day_pnl ?? 0)

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Portfolio</h1>
          <p className="text-[#8b8fa8] text-sm mt-1">Paper trading — $100k starting balance</p>
        </div>
        <span className="bg-green-500/10 text-green-400 text-xs font-medium px-3 py-1 rounded-full border border-green-500/20">
          Live
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <StatCard label="Portfolio Value" value={`$${portfolioValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`} />
        <StatCard label="Total P&L" value={`${totalPnl >= 0 ? '+' : ''}$${totalPnl.toFixed(2)}`} color={totalPnl >= 0 ? 'text-green-400' : 'text-red-400'} />
        <StatCard label="Today's P&L" value={`${dayPnl >= 0 ? '+' : ''}$${dayPnl.toFixed(2)}`} color={dayPnl >= 0 ? 'text-green-400' : 'text-red-400'} />
        <StatCard label="Open Positions" value={String(snapshot?.position_count ?? 0)} />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-[#1a1d27] border border-[#2a2d3a] rounded-xl p-5">
          <h2 className="font-semibold text-white mb-4">Recent Decisions</h2>
          {recentDecisions.length === 0 ? (
            <p className="text-[#8b8fa8] text-sm">No decisions yet — waiting for market open.</p>
          ) : (
            <div className="space-y-2">
              {recentDecisions.map((d: any) => (
                <div key={d.id} className="flex items-center justify-between py-2 border-b border-[#2a2d3a] last:border-0">
                  <div>
                    <span className="font-medium text-white text-sm">{d.symbol}</span>
                    <span className="text-[#8b8fa8] text-xs ml-2">{new Date(d.created_at).toLocaleTimeString('en-US', { timeZone: 'America/New_York' })}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-medium ${d.action === 'BUY' ? 'text-green-400' : d.action === 'SELL' ? 'text-red-400' : 'text-[#8b8fa8]'}`}>
                      {d.action}
                    </span>
                    {d.executed ? (
                      <span className="bg-green-500/10 text-green-400 text-xs px-2 py-0.5 rounded-full">EXECUTED</span>
                    ) : (
                      <span className="bg-[#2a2d3a] text-[#8b8fa8] text-xs px-2 py-0.5 rounded-full">
                        BLOCKED {d.rejection_layer ?? ''}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-[#1a1d27] border border-[#2a2d3a] rounded-xl p-5">
          <h2 className="font-semibold text-white mb-4">Recent Trades</h2>
          {recentTrades.length === 0 ? (
            <p className="text-[#8b8fa8] text-sm">No trades executed yet.</p>
          ) : (
            <div className="space-y-2">
              {recentTrades.map((t: any) => (
                <div key={t.id} className="flex items-center justify-between py-2 border-b border-[#2a2d3a] last:border-0">
                  <div>
                    <span className="font-medium text-white text-sm">{t.symbol}</span>
                    <span className="text-[#8b8fa8] text-xs ml-2">{new Date(t.created_at).toLocaleString('en-US', { timeZone: 'America/New_York' })}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-medium ${t.side === 'buy' ? 'text-green-400' : 'text-red-400'}`}>
                      {t.side.toUpperCase()}
                    </span>
                    <span className="text-[#8b8fa8] text-xs">${Number(t.notional ?? 0).toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
