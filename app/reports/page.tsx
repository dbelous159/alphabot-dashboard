import { supabase } from '@/lib/supabase'

export const revalidate = 60

async function getReports() {
  const { data } = await supabase
    .from('daily_reports')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(30)
  return data ?? []
}

export default async function ReportsPage() {
  const reports = await getReports()

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Daily Reports</h1>
        <p className="text-[#8b8fa8] text-sm mt-1">End-of-day summaries sent at 4:30 PM ET</p>
      </div>

      {reports.length === 0 ? (
        <div className="bg-[#1a1d27] border border-[#2a2d3a] rounded-xl p-12 text-center">
          <p className="text-[#8b8fa8]">No reports yet — the first one will appear after 4:30 PM ET today.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {reports.map((r: any) => {
            const date = new Date(r.created_at).toLocaleDateString('en-US', {
              weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
              timeZone: 'America/New_York',
            })
            const dayPL = parseFloat(r.day_pl ?? 0)
            const totalPL = parseFloat(r.total_pl ?? 0)
            const positive = (n: number) => n >= 0

            return (
              <details key={r.id} className="bg-[#1a1d27] border border-[#2a2d3a] rounded-xl group">
                <summary className="p-5 cursor-pointer list-none flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="text-white font-semibold">{date}</span>
                    <span className={`text-sm font-medium ${positive(dayPL) ? 'text-green-400' : 'text-red-400'}`}>
                      Day P&L: {positive(dayPL) ? '+' : ''}${dayPL.toFixed(2)}
                    </span>
                    <span className={`text-sm ${positive(totalPL) ? 'text-green-400' : 'text-red-400'}`}>
                      Total: {positive(totalPL) ? '+' : ''}${totalPL.toFixed(2)}
                    </span>
                    {r.ai_cost_usd != null && (
                      <span className="text-[#8b8fa8] text-xs">AI cost: ${parseFloat(r.ai_cost_usd).toFixed(4)}</span>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[#8b8fa8] text-xs">{r.position_count} position{r.position_count !== 1 ? 's' : ''}</span>
                    <span className="text-[#8b8fa8] text-xs group-open:rotate-180 transition-transform">▼</span>
                  </div>
                </summary>
                {r.html_content && (
                  <div
                    className="border-t border-[#2a2d3a] p-5 text-sm text-[#c8cbd8] prose prose-invert max-w-none"
                    dangerouslySetInnerHTML={{ __html: r.html_content }}
                  />
                )}
              </details>
            )
          })}
        </div>
      )}
    </div>
  )
}
