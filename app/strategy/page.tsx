export default function StrategyPage() {
  return (
    <div className="max-w-3xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Strategy</h1>
        <p className="text-[#8b8fa8] text-sm mt-1">How AlphaBot finds, evaluates, and manages trades</p>
      </div>

      <div className="space-y-6">

        {/* Overview */}
        <div className="bg-[#1a1d27] border border-[#2a2d3a] rounded-xl p-6">
          <h2 className="text-white font-semibold mb-3">Overview</h2>
          <p className="text-[#8b8fa8] text-sm leading-relaxed">
            AlphaBot is a fully autonomous AI trading agent running 24/7 on Railway. It scans up to 80 stocks every 30 minutes during market hours, filters for high-conviction opportunities, and routes each candidate through a 4-layer AI consensus before executing a trade. Once in a position, it reviews holdings twice daily using fundamental data to decide whether to hold, add, reduce, or exit.
          </p>
        </div>

        {/* Diamond in the rough */}
        <div className="bg-[#1a1d27] border border-purple-500/30 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-purple-400 text-lg">💎</span>
            <h2 className="text-white font-semibold">Diamond in the Rough</h2>
            <span className="text-xs px-2.5 py-1 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">Daily 8:30 AM</span>
          </div>
          <p className="text-[#8b8fa8] text-sm leading-relaxed mb-4">
            Every morning at 8:30 AM, a separate fundamental screener scans small and mid-cap US stocks (market cap $300M–$10B) looking for undervalued companies the momentum crowd hasn't found yet. These are evaluated as 6–12 month holds, not short-term trades.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
            <div className="bg-[#12141c] rounded-lg p-4">
              <p className="text-white text-xs font-semibold mb-2">What it looks for</p>
              <div className="space-y-1 text-xs text-[#8b8fa8]">
                <p>• 3–4 consecutive earnings beats</p>
                <p>• Analyst price target &gt;20% above current price</p>
                <p>• PEG ratio &lt;1 (undervalued for its growth rate)</p>
                <p>• Revenue growing &gt;10% year-over-year</p>
                <p>• Strong ROE (&gt;15%) and low debt</p>
              </div>
            </div>
            <div className="bg-[#12141c] rounded-lg p-4">
              <p className="text-white text-xs font-semibold mb-2">What it avoids</p>
              <div className="space-y-1 text-xs text-[#8b8fa8]">
                <p>• Micro-caps under $300M (too risky)</p>
                <p>• Penny stocks under $5</p>
                <p>• Financials, utilities, REITs (P/E unreliable)</p>
                <p>• Negative earnings (unprofitable companies)</p>
                <p>• Low volume (illiquid stocks)</p>
              </div>
            </div>
          </div>
          <div className="bg-[#12141c] rounded-lg p-4">
            <p className="text-white text-xs font-semibold mb-2">2-layer consensus (L3 + L4 only)</p>
            <p className="text-[#8b8fa8] text-xs leading-relaxed">Since stocks are already fundamentally pre-screened, the fast L1/L2 momentum filters are skipped. Gemini Pro evaluates the value thesis, then Claude Opus makes the final call considering portfolio concentration. Position size is kept smaller (2–5%) given these are lesser-known companies.</p>
          </div>
        </div>

        {/* Step 1 — Screener */}
        <div className="bg-[#1a1d27] border border-[#2a2d3a] rounded-xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[#2a2d3a] text-[#8b8fa8]">Step 1</span>
            <h2 className="text-white font-semibold">Market Screener</h2>
          </div>
          <p className="text-[#8b8fa8] text-sm leading-relaxed mb-4">
            Every 30 minutes, AlphaBot builds a watchlist of up to ~80 stocks by combining a fixed core list with live market movers pulled from Financial Modeling Prep.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-[#12141c] rounded-lg p-4">
              <p className="text-white text-xs font-semibold mb-2">Core Watchlist (27 stocks)</p>
              <p className="text-[#8b8fa8] text-xs leading-relaxed">Large-cap leaders: AAPL, MSFT, NVDA, GOOGL, META, AMZN, TSLA, AMD, JPM, BAC, GS, UNH, LLY, XOM, WMT and others. Plus SPY, QQQ, IWM, IBIT, FBTC.</p>
            </div>
            <div className="bg-[#12141c] rounded-lg p-4">
              <p className="text-white text-xs font-semibold mb-2">Dynamic Movers (up to 50)</p>
              <p className="text-[#8b8fa8] text-xs leading-relaxed">Live feed of today's most active stocks, biggest gainers, and biggest losers. Penny stocks (under $5) and OTC/foreign listings are filtered out.</p>
            </div>
          </div>
          <div className="mt-4 bg-[#12141c] rounded-lg p-4">
            <p className="text-white text-xs font-semibold mb-2">Pre-filter — only candidates with a signal pass through</p>
            <div className="space-y-1 text-xs text-[#8b8fa8]">
              <p>• <span className="text-white">Momentum + volume:</span> 5-day price move &gt;1.5% AND volume &gt;1.2× average</p>
              <p>• <span className="text-white">Oversold bounce:</span> RSI below 35</p>
              <p>• <span className="text-white">Golden cross:</span> 5-day MA just crossed above 20-day MA</p>
            </div>
          </div>
        </div>

        {/* Step 2 — Technical data */}
        <div className="bg-[#1a1d27] border border-[#2a2d3a] rounded-xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[#2a2d3a] text-[#8b8fa8]">Step 2</span>
            <h2 className="text-white font-semibold">Data Collection</h2>
          </div>
          <p className="text-[#8b8fa8] text-sm leading-relaxed mb-4">
            For each candidate that passes the pre-filter, AlphaBot fetches 30 days of price history and the latest fundamental data.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-[#12141c] rounded-lg p-4">
              <p className="text-white text-xs font-semibold mb-2">Technical Indicators</p>
              <div className="space-y-1 text-xs text-[#8b8fa8]">
                <p>• RSI (14-period)</p>
                <p>• 5-day and 20-day simple moving averages</p>
                <p>• 5-day and 20-day price momentum</p>
                <p>• Volume ratio vs 20-day average</p>
                <p>• Bid/ask spread</p>
              </div>
            </div>
            <div className="bg-[#12141c] rounded-lg p-4">
              <p className="text-white text-xs font-semibold mb-2">Fundamental Data (cached 24h)</p>
              <div className="space-y-1 text-xs text-[#8b8fa8]">
                <p>• P/E ratio and EPS</p>
                <p>• Revenue growth (year-over-year)</p>
                <p>• Net margin and return on equity</p>
                <p>• Debt-to-equity ratio</p>
                <p>• Last 4 earnings surprises</p>
                <p>• Analyst price targets (low, median, high)</p>
              </div>
            </div>
          </div>
        </div>

        {/* Step 3 — 4-layer consensus */}
        <div className="bg-[#1a1d27] border border-[#2a2d3a] rounded-xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[#2a2d3a] text-[#8b8fa8]">Step 3</span>
            <h2 className="text-white font-semibold">4-Layer AI Consensus</h2>
          </div>
          <p className="text-[#8b8fa8] text-sm leading-relaxed mb-4">
            Each candidate goes through four independent AI models in sequence. All four must agree before a trade is executed. Any single rejection kills the trade.
          </p>
          <div className="space-y-3">
            {[
              {
                layer: 'L1',
                model: 'Gemini 2.5 Flash',
                role: 'Scanner',
                color: 'text-yellow-400',
                threshold: 'Confidence ≥ 65 to pass',
                desc: 'Fast, cheap scan of all market data. Outputs BUY / SELL / HOLD with a confidence score and brief reasoning. Most candidates are eliminated here.',
              },
              {
                layer: 'L2',
                model: 'Claude Haiku',
                role: 'Risk Filter',
                color: 'text-orange-400',
                threshold: 'Must approve to pass',
                desc: 'Validates the L1 idea. Rejects trades with weak reasoning, unfavorable market conditions, or confidence below 65. Acts as a fast noise filter.',
              },
              {
                layer: 'L3',
                model: 'Gemini 2.5 Pro',
                role: 'Deep Analyst',
                color: 'text-blue-400',
                threshold: 'Confidence ≥ 70 to pass',
                desc: 'Full analysis: risk/reward ratio, position sizing, stop loss and take profit levels, time horizon, and downside scenarios. Sets the trade parameters.',
              },
              {
                layer: 'L4',
                model: 'Claude Opus',
                role: 'Final Approver',
                color: 'text-purple-400',
                threshold: 'Must execute = true',
                desc: 'Sees the full portfolio — all positions, buying power, total risk exposure. Makes the final call with full context. Default bias is HOLD when in doubt.',
              },
            ].map(l => (
              <div key={l.layer} className="bg-[#12141c] rounded-lg p-4">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs font-bold text-[#8b8fa8] w-6">{l.layer}</span>
                  <span className={`text-sm font-semibold ${l.color}`}>{l.model}</span>
                  <span className="text-[#8b8fa8] text-xs">{l.role}</span>
                  <span className="ml-auto text-xs text-[#8b8fa8] border border-[#2a2d3a] px-2 py-0.5 rounded-full">{l.threshold}</span>
                </div>
                <p className="text-xs text-[#8b8fa8] leading-relaxed">{l.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Step 4 — Execution */}
        <div className="bg-[#1a1d27] border border-[#2a2d3a] rounded-xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[#2a2d3a] text-[#8b8fa8]">Step 4</span>
            <h2 className="text-white font-semibold">Trade Execution</h2>
          </div>
          <div className="space-y-1 text-sm text-[#8b8fa8] leading-relaxed">
            <p>• Orders placed through <span className="text-white">Alpaca Markets</span> (currently paper trading)</p>
            <p>• Position size: <span className="text-white">0–10% of portfolio</span> per trade, set by L3</p>
            <p>• Max 3 candidates evaluated per cycle to control AI costs</p>
            <p>• Bracket orders attach stop loss and take profit at entry when possible</p>
            <p>• Trade alert emailed immediately after execution</p>
          </div>
        </div>

        {/* Step 5 — Position management */}
        <div className="bg-[#1a1d27] border border-[#2a2d3a] rounded-xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[#2a2d3a] text-[#8b8fa8]">Step 5</span>
            <h2 className="text-white font-semibold">Position Management</h2>
          </div>
          <p className="text-[#8b8fa8] text-sm leading-relaxed mb-4">
            After entering a position, AlphaBot reviews every open holding twice per day using Gemini Pro. The goal is long-term alpha — beating the S&P 500 over 3–12 months by holding winners and cutting losers when the thesis breaks.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
            {[
              { action: 'HOLD', color: 'text-blue-400', desc: 'Thesis intact, fundamentals strong. No action — let it run.' },
              { action: 'ADD', color: 'text-green-400', desc: 'High conviction, room to grow, position under 15% of portfolio. Scale in.' },
              { action: 'REDUCE', color: 'text-yellow-400', desc: 'Thesis weakening or position oversized (>15%). Trim partially.' },
              { action: 'EXIT', color: 'text-red-400', desc: 'Thesis broken, fundamentals deteriorated. Close the full position.' },
            ].map(a => (
              <div key={a.action} className="bg-[#12141c] rounded-lg p-3">
                <p className={`text-xs font-bold mb-1 ${a.color}`}>{a.action}</p>
                <p className="text-xs text-[#8b8fa8] leading-relaxed">{a.desc}</p>
              </div>
            ))}
          </div>
          <div className="bg-[#12141c] rounded-lg p-4">
            <p className="text-white text-xs font-semibold mb-2">Review Schedule</p>
            <div className="space-y-1 text-xs text-[#8b8fa8]">
              <p>• <span className="text-white">9:00 AM ET</span> — Pre-market review of all positions before trading begins</p>
              <p>• <span className="text-white">2:00 PM ET</span> — Midday check to catch afternoon thesis changes before close</p>
            </div>
          </div>
        </div>

        {/* Schedule */}
        <div className="bg-[#1a1d27] border border-[#2a2d3a] rounded-xl p-6">
          <h2 className="text-white font-semibold mb-3">Daily Schedule</h2>
          <div className="space-y-2">
            {[
              { time: '8:30 AM ET', event: 'Fundamental screener', detail: 'Scans 150 small/mid-cap stocks for undervalued diamonds — earns beats, analyst upside, PEG < 1' },
              { time: '9:00 AM ET', event: 'Pre-market analysis + position review', detail: 'Gemini Pro builds a market outlook and reviews all open holdings' },
              { time: '9:31 AM ET', event: 'Market open burst', detail: 'First trading cycle — highest volatility window' },
              { time: '9:45 AM ET', event: 'Market open burst', detail: 'Second cycle' },
              { time: '10:00 AM ET', event: 'Market open burst', detail: 'Third cycle' },
              { time: 'Every 30 min', event: 'Trading cycles', detail: '10 AM – 4 PM ET, scanning for new opportunities' },
              { time: '2:00 PM ET', event: 'Midday position review', detail: 'Re-evaluates all holdings mid-session' },
              { time: '4:30 PM ET', event: 'Daily report', detail: 'P&L summary, positions, AI cost breakdown — sent by email' },
            ].map(s => (
              <div key={s.time} className="flex gap-4 py-2 border-b border-[#2a2d3a] last:border-0">
                <span className="text-white text-xs font-medium w-28 flex-shrink-0">{s.time}</span>
                <div>
                  <p className="text-white text-xs font-medium">{s.event}</p>
                  <p className="text-[#8b8fa8] text-xs">{s.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 10 Intelligence Improvements */}
        <div className="bg-[#1a1d27] border border-[#2a2d3a] rounded-xl p-6">
          <h2 className="text-white font-semibold mb-1">Intelligence Layer</h2>
          <p className="text-[#8b8fa8] text-xs mb-4">10 market-awareness systems layered on top of the base consensus</p>
          <div className="space-y-3">
            {[
              {
                num: '01',
                title: 'Sector Rotation',
                color: 'text-blue-400',
                desc: 'Fetches live performance of 11 sector ETFs (XLK, XLV, XLF, etc.) every 30 minutes. Leading and lagging sectors are passed to every AI layer so trade ideas align with where money is actually flowing.',
              },
              {
                num: '02',
                title: 'VIX Macro Regime',
                color: 'text-yellow-400',
                desc: 'Reads the VIX fear index live. VIX > 35: all new buys halted. VIX > 25: position sizes cut 50%. VIX < 15: sizes increased 20%. Every AI layer sees the current regime.',
              },
              {
                num: '03',
                title: 'Earnings Calendar',
                color: 'text-orange-400',
                desc: 'Checks Yahoo Finance calendar events before evaluating each candidate. Any stock with earnings in the next 2 days is automatically skipped — avoids the binary risk of an earnings surprise.',
              },
              {
                num: '04',
                title: 'Sector Correlation Check',
                color: 'text-purple-400',
                desc: 'Tracks how many open positions are in each sector. If already holding 2+ positions in the same sector, new candidates in that sector are skipped to prevent concentration risk.',
              },
              {
                num: '05',
                title: 'Trailing Stops',
                color: 'text-green-400',
                desc: 'After every buy, a GTC trailing stop order is placed on Alpaca. The stop follows the price up as gains accumulate, then triggers on a reversal — locking in profits automatically without manual intervention.',
              },
              {
                num: '06',
                title: 'Max Drawdown Kill Switch',
                color: 'text-red-400',
                desc: 'Tracks portfolio peak value in memory. If the current portfolio value drops 10% or more from the peak, all new trading is halted for the session. Protects capital during bad market conditions.',
              },
              {
                num: '07',
                title: 'Position Age Limit',
                color: 'text-pink-400',
                desc: 'Momentum trades are expected to play out within 5 days. During every position review, the AI is told how old the trade is. Trades over 5 days old receive an explicit warning in the prompt to exit if the thesis hasn\'t materialized.',
              },
              {
                num: '08',
                title: 'Insider Buying Signal',
                color: 'text-cyan-400',
                desc: 'Counts open-market insider purchases (not option exercises) in the last 90 days from Yahoo Finance insider transactions. Used by the screener and consensus as a conviction signal — insiders buying their own stock is bullish.',
              },
              {
                num: '09',
                title: 'Short Interest Awareness',
                color: 'text-indigo-400',
                desc: 'Fetches short % of float and days-to-cover for every candidate. High short interest combined with positive momentum can signal a squeeze setup. High short interest alone is flagged as squeeze risk.',
              },
              {
                num: '10',
                title: 'Earnings Surprise Streak',
                color: 'text-teal-400',
                desc: 'Tracks how many consecutive quarters a company has beaten earnings estimates (up to the last 4). A 4-quarter streak is a strong signal of management execution quality, weighted heavily in the screener scoring.',
              },
            ].map(item => (
              <div key={item.num} className="bg-[#12141c] rounded-lg p-4 flex gap-4">
                <span className={`text-xs font-bold ${item.color} w-6 flex-shrink-0 mt-0.5`}>{item.num}</span>
                <div>
                  <p className={`text-xs font-semibold mb-1 ${item.color}`}>{item.title}</p>
                  <p className="text-xs text-[#8b8fa8] leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Risk controls */}
        <div className="bg-[#1a1d27] border border-[#2a2d3a] rounded-xl p-6">
          <h2 className="text-white font-semibold mb-3">Risk Controls</h2>
          <div className="space-y-1 text-sm text-[#8b8fa8]">
            <p>• Trading pauses if buying power falls below <span className="text-white">$500</span></p>
            <p>• Maximum <span className="text-white">10% of portfolio</span> per single trade</p>
            <p>• Maximum <span className="text-white">20% of portfolio</span> in any one position after scaling in</p>
            <p>• Max <span className="text-white">3 candidates</span> evaluated per cycle to limit AI spend</p>
            <p>• All 4 AI layers must independently agree before any trade executes</p>
            <p>• L4 Claude Opus has an explicit instruction: <span className="text-white">"When in doubt, HOLD"</span></p>
            <p>• Dynamic movers: penny stocks and illiquid names auto-filtered out</p>
          </div>
        </div>

      </div>
    </div>
  )
}
