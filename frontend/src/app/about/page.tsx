"use client";

import Link from "next/link";
import Image from "next/image";
import WSJLayout from "@/components/WSJLayout";
import {
  WHT, INK, GRY, T2, TM,
  serif, display, mono, sans,
  Hair, HeavyRule,
} from "@/lib/wsj";

/* ─── Feature sections ─── */

interface Feature {
  title: string;
  description: string;
  image: string;
  href: string;
}

const FEATURES: Feature[] = [
  {
    title: "Fundamental Analysis",
    description:
      "Dive deep into any stock with a full-page breakdown: price history with moving averages, company profile, cash & debt overview, balance sheet visualizations (assets vs. liabilities vs. equity), ratings snapshot radar, and cash vs. debt trends. Key metrics — market cap, P/E, P/S, beta, dividend yield, 52-week range, and average volume — are displayed at a glance.",
    image: "/about/fundamental_analysis.png",
    href: "/stocks/AAPL",
  },
  {
    title: "Landing Page & Market Dashboard",
    description:
      "The home page provides a real-time market overview: major indices (S&P 500, Dow Jones, NASDAQ, Russell 2000, VIX), crypto & commodity tickers (Bitcoin, Ethereum, Gold, Crude Oil, 10Y Treasury), a color-coded sector performance heatmap, top market movers (gainers, losers, most active), curated market news, and an upcoming earnings calendar.",
    image: "/about/landing_page.png",
    href: "/",
  },
  {
    title: "Advanced Charting Terminal",
    description:
      "A professional-grade charting terminal with TradingView-powered interactive charts, multiple timeframes (intraday to 5Y), and extensive customization. Toggle chart types (Heikin Ashi, candlestick), overlays (Bollinger Bands, EMA, Ichimoku, VWAP, Fibonacci, SAR), structure tools (trendlines, ranges, volume profile, FVG), and studies (RSI, MACD, Stochastic, OBV, ADX/DMI, Williams %R, CCI). Includes drawing tools, chart presets, data export, and replay mode.",
    image: "/about/advanced_charting.png",
    href: "/chart",
  },
  {
    title: "Technical Analysis & Setup Detection",
    description:
      "Automated technical analysis with an AI-generated scoring dashboard. Provides a composite BUY/SELL score, indicator scorecard (RSI, MACD, Bollinger %B, Stochastic, EMA), key price levels (stop-loss, SAR trailing stop, SMA, Fibonacci retracements, support/resistance), and contextual commentary on trend direction, momentum, and volatility. Compare performance vs. SPY and QQQ benchmarks at a glance.",
    image: "/about/technical_analysis.png",
    href: "/technical",
  },
  {
    title: "Market Heatmap",
    description:
      "An interactive treemap visualization of 500+ stocks, sized by market cap and colored by daily performance. Filter by S&P 500 or NASDAQ-100, switch between time periods (1D, 1W, 1M, YTD) and chart ranges (3M–5Y), group by sector or view flat, filter by sector, and search for any ticker. Toggle between map, sector summary, and table views.",
    image: "/about/market_heatmap.png",
    href: "/heatmap",
  },
  {
    title: "Watchlist",
    description:
      "A personalized watchlist with grid and chart views. Each card shows a TradingView price chart with moving average overlays, a revenue & profit mini-chart (net income, margin trend, revenue bars), and a dividend history chart with yield and growth indicators. Toggle visibility layers (MA, Revenue, Dividends), switch time periods, and manage tickers. A persistent sidebar tracks real-time prices and daily changes.",
    image: "/about/watchlist_grid.png",
    href: "/watchlist",
  },
  {
    title: "Stock Comparison",
    description:
      "Compare any set of stocks side by side. Summary cards show price, YTD/1Y performance, 52-week range, and sector/industry. Includes a normalized price chart (rebased to 100) for direct performance comparison, a multi-period return table (1M through 5Y), a fundamentals radar chart (profit margin, operating margin, gross margin, ROE, ROA, liquidity), and a risk vs. return scatter plot.",
    image: "/about/stock_comparison.png",
    href: "/compare",
  },
  {
    title: "Sector Analysis",
    description:
      "Cross-sector correlation analysis across all 11 S&P 500 sectors. Features a color-coded correlation matrix showing how sectors move together, with cap-weighted and equal-weighted views over 3M–5Y windows. Includes normalized sector performance charts (rebased to $100) to visualize cumulative returns, helping identify diversification opportunities and hedging strategies.",
    image: "/about/sector_correlation.png",
    href: "/sector-analysis",
  },
  {
    title: "Sector Hexagonal Density Plot",
    description:
      "An interactive hexbin scatter plot showing daily return correlations between any two sectors. Pairs are categorized by correlation strength (strong positive, moderate, weak, near zero) and selected via the correlation matrix or quick-pick buttons. Displays regression line, R² value, and data point count — useful for visualizing sector co-movement patterns and tail-risk events.",
    image: "/about/correlation_analysis.png",
    href: "/correlation",
  },
  {
    title: "Congress Trading Tracker",
    description:
      "Track stock trades disclosed by U.S. Congress members under the STOCK Act. Dashboard shows total trades, unique tickers, buy/sell breakdown by party (Democrats vs. Republicans), buy/sell sentiment donut chart, and monthly trading activity. Tables highlight the most bought and most sold stocks with estimated volumes, plus best and worst performing trades ranked by excess return vs. S&P 500.",
    image: "/about/congress_trade_tracker.png",
    href: "/congress",
  },
];

const TECH_STACK = [
  { layer: "Frontend", tech: "Next.js 16, React 19, TypeScript, Tailwind CSS" },
  { layer: "Backend", tech: "Python 3, Flask 3, pandas, NumPy, yfinance" },
  { layer: "Charts", tech: "TradingView Lightweight Charts, Recharts, D3.js" },
  { layer: "Data", tech: "Yahoo Finance API, batch caching, scheduled updates" },
  { layer: "Infrastructure", tech: "Docker, Docker Compose, Nginx reverse proxy" },
];

/* ─── Page ─── */

export default function AboutPage() {
  return (
    <WSJLayout wideContent>
      <div className="mx-auto max-w-[960px] px-6 py-10">
        {/* ── Hero ── */}
        <div className="text-center mb-8">
          <p className="text-[13px] uppercase tracking-[0.25em] mb-2"
             style={{ fontFamily: sans, color: TM }}>
            Platform Overview
          </p>
          <h1 className="text-[36px] md:text-[48px] leading-tight mb-3"
              style={{ fontFamily: display, color: INK }}>
            The Zero Sum Times
          </h1>
          <p className="text-[15px] leading-relaxed max-w-[640px] mx-auto mb-5"
             style={{ fontFamily: serif, color: T2 }}>
            A comprehensive, Wall Street Journal-inspired stock market analysis platform.
            Real-time quotes, interactive charting, fundamental analysis, sector correlations,
            and more — all in one place.
          </p>
          <a
            href="https://zero-sum-times.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-2.5 text-[12px] font-bold uppercase tracking-[0.15em] transition-opacity hover:opacity-80"
            style={{
              fontFamily: sans,
              background: INK,
              color: WHT,
              borderRadius: 2,
            }}
          >
            Visit zero-sum-times.com
          </a>
          <div className="flex flex-wrap items-center justify-center gap-3 mt-4">
            <a
              href="https://github.com/tristcoil/zero-sum-public"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2 text-[11px] font-bold uppercase tracking-[0.12em] transition-opacity hover:opacity-80"
              style={{ fontFamily: sans, background: "#181717", color: "#fff", borderRadius: 3 }}
            >
              <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
              </svg>
              GitHub
            </a>
            <a
              href="https://discord.gg/a89Ua6CQj"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2 text-[11px] font-bold uppercase tracking-[0.12em] transition-opacity hover:opacity-80"
              style={{ fontFamily: sans, background: "#5865F2", color: "#fff", borderRadius: 3 }}
            >
              <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
              </svg>
              Discord
            </a>
          </div>
        </div>

        <HeavyRule />

        {/* ── Feature Sections ── */}
        {FEATURES.map((feature, idx) => (
          <section key={feature.title} className="py-8">
            {/* Section heading */}
            <div className="flex items-baseline gap-3 mb-2">
              <span className="text-[11px] font-bold tabular-nums"
                    style={{ fontFamily: mono, color: TM }}>
                {String(idx + 1).padStart(2, "0")}
              </span>
              <h2 className="text-[22px] md:text-[26px] leading-tight"
                  style={{ fontFamily: display, color: INK }}>
                {feature.title}
              </h2>
            </div>

            <Hair />

            <p className="text-[13px] leading-relaxed mt-3 mb-5"
               style={{ fontFamily: serif, color: T2 }}>
              {feature.description}
            </p>

            {/* Screenshot */}
            <Link href={feature.href} className="block group">
              <div
                className="overflow-hidden border transition-shadow group-hover:shadow-lg"
                style={{ borderColor: GRY, borderRadius: 2 }}
              >
                <Image
                  src={feature.image}
                  alt={feature.title}
                  width={960}
                  height={540}
                  className="w-full h-auto"
                  style={{ display: "block" }}
                />
              </div>
              <p className="text-[10px] uppercase tracking-[0.12em] mt-2 group-hover:underline"
                 style={{ fontFamily: sans, color: TM }}>
                Open {feature.title} →
              </p>
            </Link>

            {idx < FEATURES.length - 1 && <div className="mt-8"><Hair /></div>}
          </section>
        ))}

        {/* ── Tech Stack ── */}
        <div className="py-8">
          <HeavyRule />
          <h2 className="text-[22px] mt-4 mb-4"
              style={{ fontFamily: display, color: INK }}>
            Tech Stack
          </h2>
          <table className="w-full text-[12px] border-collapse"
                 style={{ fontFamily: mono }}>
            <thead>
              <tr>
                <th className="text-left py-2 px-3 border-b"
                    style={{ fontFamily: sans, fontSize: 10, fontWeight: 700,
                             letterSpacing: "0.08em", textTransform: "uppercase",
                             color: TM, borderColor: GRY }}>
                  Layer
                </th>
                <th className="text-left py-2 px-3 border-b"
                    style={{ fontFamily: sans, fontSize: 10, fontWeight: 700,
                             letterSpacing: "0.08em", textTransform: "uppercase",
                             color: TM, borderColor: GRY }}>
                  Technology
                </th>
              </tr>
            </thead>
            <tbody>
              {TECH_STACK.map((row, i) => (
                <tr key={row.layer}
                    style={{ background: i % 2 === 0 ? "transparent" : WHT }}>
                  <td className="py-2 px-3 border-b font-bold"
                      style={{ color: INK, borderColor: GRY + "66" }}>
                    {row.layer}
                  </td>
                  <td className="py-2 px-3 border-b"
                      style={{ color: T2, borderColor: GRY + "66" }}>
                    {row.tech}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ── Community & Open Source ── */}
        <div className="py-6">
          <Hair />
          <div className="text-center mt-6">
            <p className="text-[11px] uppercase tracking-[0.15em] mb-2"
               style={{ fontFamily: sans, color: TM }}>
              Community & Open Source
            </p>
            <p className="text-[13px] leading-relaxed mb-4"
               style={{ fontFamily: serif, color: T2 }}>
              The Zero Sum Times is MIT-licensed and open source.
              Join our Discord community to discuss features, report bugs, and connect with other users.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              {/* GitHub */}
              <a
                href="https://github.com/tristcoil/zero-sum-public"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-2.5 text-[12px] font-bold uppercase tracking-[0.12em] transition-opacity hover:opacity-80"
                style={{
                  fontFamily: sans,
                  background: "#181717",
                  color: "#fff",
                  borderRadius: 3,
                }}
              >
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                </svg>
                GitHub
              </a>
              {/* Discord */}
              <a
                href="https://discord.gg/a89Ua6CQj"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-2.5 text-[12px] font-bold uppercase tracking-[0.12em] transition-opacity hover:opacity-80"
                style={{
                  fontFamily: sans,
                  background: "#5865F2",
                  color: "#fff",
                  borderRadius: 3,
                }}
              >
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                </svg>
                Join Discord
              </a>
            </div>
          </div>
        </div>

        <Hair />
        <p className="text-[10px] text-center mt-3 pb-4"
           style={{ fontFamily: serif, color: TM }}>
          Data sourced from Yahoo Finance · Updated periodically · Not financial advice
        </p>
      </div>
    </WSJLayout>
  );
}
