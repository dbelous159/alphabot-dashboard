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
            AlphaBot is a fully autonomous AI trading agent running 24/7 on Railway. It scans 100+ stocks every 15 minutes during market hours, filters for high-conviction opportunities, and routes each candidate through a 4-layer AI consensus before executing a trade. It trades both <span className="text-white">stocks</span> and <span className="text-white">options</span> — buying puts when the market is bearish so it profits in both directions rather than sitting idle.
          </p>
        </div>

        {/* Options Trading — new */}
        <div className="bg-[#1a1d27] border border-red-500/30 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-red-400 text-lg">📉</span>
            <h2 className="text-white font-semibold">Options Trading — Profiting from Downturns</h2>
            <span className="text-xs px-2.5 py-1 rounded-full bg-red-500/10 text-red-400 border border-red-500/20">Put Options</span>
          </div>
          <p className="text-[#8b8fa8] text-sm leading-relaxed mb-4">
            When the market is in a downtrend, AlphaBot doesn't just sit on cash — it buys <span className="text-white">put options</span>, which increase in value when stocks fall. A put is a contract that gives the right to sell 100 shares at a set price — if the stock drops, the put becomes worth more.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
            <div className="bg-[#12141c] rounded-lg p-4">
              <p className="text-white text-xs font-semibold mb-2">SPY Puts — Market Hedge</p>
              <div className="space-y-1 text-xs text-[#8b8fa8]">
                <p>• Triggered when SPY momentum &lt; -1.5% <span className="text-white">AND</span> SMA5 below SMA20</p>
                <p>• Buys put options on SPY (S&P 500 ETF)</p>
                <p>• Profits if the broad market keeps falling</p>
                <p>• Up to 2% of portfolio per position</p>
                <p>• Only one SPY put position at a time</p>
              </div>
            </div>
            <div className="bg-[#12141c] rounded-lg p-4">
              <p className="text-white text-xs font-semibold mb-2">Individual Stock Puts</p>
              <div className="space-y-1 text-xs text-[#8b8fa8]">
                <p>• Triggered when a stock has RSI &gt; 65 (overbought) <span className="text-white">OR</span> momentum &lt; -5% in downtrend</p>
                <p>• Buys puts on the specific stock</p>
                <p>• Profits if that stock continues to fall</p>
                <p>• Up to 2% of portfolio per position</p>
              </div>
            </div>
          </div>
          <div className="bg-[#12141c] rounded-lg p-4">
            <p className="text-white text-xs font-semibold mb-2">Contract Selection Logic</p>
            <div className="space-y-1 text-xs text-[#8b8fa8]">
              <p>• <span className="text-white">Expiration:</span> 14–25 days out — enough time to be right, not too expensive</p>
              <p>• <span className="text-white">Strike:</span> ATM to 3% out-of-the-money — moves well, affordable premium</p>
              <p>• <span className="text-white">Liquidity filter:</span> minimum 50 open interest — no illiquid contracts</p>
              <p>• <span className="text-white">Premium filter:</span> $0.10–$15.00/share — filters garbage and overpriced contracts</p>
            </div>
          </div>
        </div>

        {/* Diamond in the rough */}
        <div className="bg-[#1a1d27] border border-purple-500/30 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-purple-400 text-lg">💎</span>
            <h2 className="text-white font-semibold">Diamond in the Rough</h2>
            <span className="text-xs px-2.5 py-1 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">Daily 8:30 AM</span>
          </div>
          <p className="text-[#8b8fa8] text-sm leading-relaxed mb-4">
            Every morning at 8:30 AM, a separate fundamental screener scans small and mid-cap US stocks looking for undervalued companies the momentum crowd hasn't found yet. These are evaluated as 6–12 month holds, not short-term trades.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
            <div className="bg-[#12141c] rounded-lg p-4">
              <p className="text-white text-xs font-semibold mb-2">What it looks for</p>
              <div className="space-y-1 text-xs text-[#8b8fa8]">
                <p>• 3–4 consecutive earnings beats</p>
                <p>• Analyst price target &gt;20% above current price</p>
                <p>• PEG ratio &lt;1 (undervalued for its growth rate)</p>
                <p>• Revenue growing &gt;10% year-over-year</p>
                <p>• Strong ROIC (&gt;15%) and free cash flow growth</p>
              </div>
            </div>
            <div className="bg-[#12141c] rounded-lg p-4">
              <p className="text-white text-xs font-semibold mb-2">What it avoids</p>
              <div className="space-y-1 text-xs text-[#8b8fa8]">
                <p>• Micro-caps under $100M (too risky)</p>
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
            Every 15 minutes, AlphaBot builds a watchlist of 100+ stocks by combining a fixed core list with live market movers from Yahoo Finance.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-[#12141c] rounded-lg p-4">
              <p className="text-white text-xs font-semibold mb-2">Core Watchlist (53 stocks)</p>
              <p className="text-[#8b8fa8] text-xs leading-relaxed">Large-cap leaders across tech, healthcare, energy, financials, and consumer sectors. AAPL, MSFT, NVDA, GOOGL, META, AMZN, TSLA, AMD, JPM, UNH, LLY, XOM, WMT and others. Plus SPY, QQQ, GLD.</p>
            </div>
            <div className="bg-[#12141c] rounded-lg p-4">
              <p className="text-white text-xs font-semibold mb-2">Dynamic Movers (up to 75)</p>
              <p className="text-[#8b8fa8] text-xs leading-relaxed">Live feed from Yahoo Finance screeners: small cap gainers, undervalued growth, day gainers/losers, most actives, aggressive small caps, and more. Penny stocks and foreign listings filtered out.</p>
            </div>
            <div className="bg-[#12141c] rounded-lg p-4">
              <p className="text-white text-xs font-semibold mb-2">YTD Leaders (top 30)</p>
              <p className="text-[#8b8fa8] text-xs leading-relaxed">Every 2 hours, AlphaBot batch-fetches a ~100-stock S&P 500 universe (SNOW, CRWD, PLTR, NET, COST, PANW and others) and ranks by 52-week momentum. The top 30 are added to every scan — so the strongest-performing stocks are always in the mix.</p>
            </div>
          </div>
          <div className="mt-4 bg-[#12141c] rounded-lg p-4">
            <p className="text-white text-xs font-semibold mb-2">Pre-filter — only candidates with a signal pass through</p>
            <div className="space-y-1 text-xs text-[#8b8fa8]">
              <p>• <span className="text-white">Momentum + volume:</span> 5-day price move &gt;1.5% AND volume &gt;1.2× average</p>
              <p>• <span className="text-white">Oversold bounce:</span> RSI below 35</p>
              <p>• <span className="text-white">Golden cross:</span> 5-day MA just crossed above 20-day MA</p>
              <p>• <span className="text-white">Spread filter:</span> bid/ask spread must be under 1.5% — illiquid names skipped before any AI call</p>
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
            For each candidate that passes the pre-filter, AlphaBot fetches both daily and intraday price history along with fundamental data.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-[#12141c] rounded-lg p-4">
              <p className="text-white text-xs font-semibold mb-2">Technical Indicators</p>
              <div className="space-y-1 text-xs text-[#8b8fa8]">
                <p>• RSI (14-period) — daily and intraday</p>
                <p>• 5-day and 20-day simple moving averages</p>
                <p>• 5-day and 20-day price momentum</p>
                <p>• Volume ratio vs 20-day average</p>
                <p>• 15-min intraday bars (52 periods) for real-time signals</p>
                <p>• Bid/ask spread health check</p>
              </div>
            </div>
            <div className="bg-[#12141c] rounded-lg p-4">
              <p className="text-white text-xs font-semibold mb-2">Fundamental Data (cached 24h)</p>
              <div className="space-y-1 text-xs text-[#8b8fa8]">
                <p>• P/E ratio, EPS, and PEG ratio</p>
                <p>• Revenue growth (year-over-year)</p>
                <p>• ROIC, ROE, FCF margin, FCF yield</p>
                <p>• Debt-to-equity ratio</p>
                <p>• Last 4 earnings surprises</p>
                <p>• Analyst price targets (consensus)</p>
                <p>• Share count trend (buybacks vs dilution)</p>
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
            <p>• Stock positions: <span className="text-white">0–10% of portfolio</span> per trade, set by L3</p>
            <p>• Options positions: <span className="text-white">up to 2% of portfolio</span> per contract position</p>
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
            After entering a position, AlphaBot reviews every open holding twice per day using Gemini Pro.
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
              { time: '8:30 AM ET', event: 'Fundamental screener', detail: 'Scans 150+ stocks for undervalued diamonds — earnings beats, analyst upside, PEG < 1, ROIC > 15%' },
              { time: '9:00 AM ET', event: 'Pre-market analysis + position review', detail: 'Gemini Pro builds a market outlook and reviews all open holdings' },
              { time: '9:31 AM ET', event: 'Market open burst', detail: 'First trading cycle — highest volatility window, options checked immediately' },
              { time: '9:45 AM ET', event: 'Market open burst', detail: 'Second cycle' },
              { time: '10:00 AM ET', event: 'Market open burst', detail: 'Third cycle' },
              { time: 'Every 15 min', event: 'Trading cycles', detail: '10 AM – 4 PM ET — stocks and options, both directions' },
              { time: '2:00 PM ET', event: 'Midday position review', detail: 'Re-evaluates all holdings mid-session' },
              { time: '4:30 PM ET', event: 'Daily report', detail: 'P&L summary, positions, AI cost breakdown — sent by email and saved to Reports page' },
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

        {/* Intelligence Layer */}
        <div className="bg-[#1a1d27] border border-[#2a2d3a] rounded-xl p-6">
          <h2 className="text-white font-semibold mb-1">Intelligence Layer</h2>
          <p className="text-[#8b8fa8] text-xs mb-4">12 market-awareness systems layered on top of the base consensus</p>
          <div className="space-y-3">
            {[
              {
                num: '01',
                title: 'SPY Trend Filter',
                color: 'text-red-400',
                desc: 'Checks SPY momentum and moving averages every cycle. If SPY momentum < -1.5% AND SMA5 is below SMA20, the bearish market filter activates — stock buys are blocked and SPY put options are purchased instead.',
              },
              {
                num: '02',
                title: 'Options — Bearish Profits',
                color: 'text-orange-400',
                desc: 'When the market or individual stocks show strong bearish signals, AlphaBot buys put options rather than sitting idle. Puts increase in value as prices fall. Contracts are selected for 14–25 day expiry at near-the-money strikes with sufficient liquidity.',
              },
              {
                num: '03',
                title: 'Intraday Signal Layer',
                color: 'text-cyan-400',
                desc: 'Fetches 15-minute bars (52 periods) for every candidate in addition to daily bars. Computes intraday RSI, 2-hour momentum, and intraday volume ratio — giving the AI real-time context, not just yesterday\'s data.',
              },
              {
                num: '04',
                title: 'Sector Rotation',
                color: 'text-blue-400',
                desc: 'Fetches live performance of 11 sector ETFs (XLK, XLV, XLF, etc.) every cycle. Leading and lagging sectors are passed to every AI layer so trade ideas align with where money is actually flowing.',
              },
              {
                num: '05',
                title: 'VIX Macro Regime',
                color: 'text-yellow-400',
                desc: 'Reads the VIX fear index live. VIX > 35: all new buys halted. VIX > 25: position sizes cut 50%. VIX < 15: sizes increased 20%. Every AI layer sees the current regime.',
              },
              {
                num: '06',
                title: 'Earnings Calendar',
                color: 'text-orange-400',
                desc: 'Checks earnings calendar events before evaluating each candidate. Any stock with earnings in the next 2 days is automatically skipped — avoids the binary risk of an earnings surprise.',
              },
              {
                num: '07',
                title: 'Sector Correlation Check',
                color: 'text-purple-400',
                desc: 'Tracks how many open positions are in each sector. If already holding 2+ positions in the same sector, new candidates in that sector are skipped to prevent concentration risk.',
              },
              {
                num: '08',
                title: 'Trailing Stops',
                color: 'text-green-400',
                desc: 'After every buy, a GTC trailing stop order is placed on Alpaca. The stop follows the price up as gains accumulate, then triggers on a reversal — locking in profits automatically.',
              },
              {
                num: '09',
                title: 'Max Drawdown Kill Switch',
                color: 'text-red-400',
                desc: 'Tracks portfolio peak value in memory. If the current portfolio value drops 10% or more from the peak, all new trading is halted for the session. Protects capital during bad market conditions.',
              },
              {
                num: '10',
                title: 'Spread Pre-filter',
                color: 'text-pink-400',
                desc: 'Checks bid/ask spread before running any AI analysis. If the spread exceeds 1.5% of the stock price, the candidate is skipped entirely — wide spreads indicate illiquid or data-quality issues that make execution unreliable.',
              },
              {
                num: '11',
                title: 'Insider Buying Signal',
                color: 'text-teal-400',
                desc: 'Counts open-market insider purchases (not option exercises) in the last 90 days. Used by the screener and consensus as a conviction signal — insiders buying their own stock is a strong bullish indicator.',
              },
              {
                num: '12',
                title: 'Earnings Surprise Streak',
                color: 'text-indigo-400',
                desc: 'Tracks how many consecutive quarters a company has beaten earnings estimates (up to the last 4). A 4-quarter streak is heavily weighted in the screener — it signals consistent management execution.',
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
            <p>• Maximum <span className="text-white">10% of portfolio</span> per single stock trade</p>
            <p>• Maximum <span className="text-white">2% of portfolio</span> per options position</p>
            <p>• Maximum <span className="text-white">20% of portfolio</span> in any one position after scaling in</p>
            <p>• Max <span className="text-white">3 candidates</span> evaluated per cycle to limit AI spend</p>
            <p>• All 4 AI layers must independently agree before any stock trade executes</p>
            <p>• Options trades go through the full 4-layer AI consensus — all 4 models must agree before a put is purchased</p>
            <p>• L4 Claude Opus has an explicit instruction: <span className="text-white">"When in doubt, HOLD"</span></p>
            <p>• Dynamic movers: penny stocks and illiquid names auto-filtered out</p>
          </div>
        </div>

      </div>
    </div>
  )
}
