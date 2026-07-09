"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import WSJLayout from "@/components/WSJLayout";
import {
  WHT, INK, GRY, BLU, T2, TM,
  serif, mono,
  Hair, HeavyRule,
} from "@/lib/wsj";

/* Popular tickers grouped by theme for quick access */
const GROUPS: { label: string; tickers: string[] }[] = [
  { label: "Mega-Cap Tech", tickers: ["AAPL", "MSFT", "GOOG", "AMZN", "META", "NVDA", "TSLA"] },
  { label: "Semiconductors", tickers: ["AVGO", "AMD", "INTC", "QCOM", "TXN", "ASML", "ARM", "AMAT"] },
  { label: "Software & Cloud", tickers: ["CRM", "ADBE", "ORCL", "NOW", "SNOW", "PLTR", "CRWD", "DDOG"] },
  { label: "Financials", tickers: ["JPM", "GS", "MS", "BAC", "V", "MA", "BRK-B", "AXP"] },
  { label: "Healthcare", tickers: ["JNJ", "UNH", "LLY", "PFE", "ABBV", "MRK", "TMO", "ABT"] },
  { label: "Energy & Materials", tickers: ["XOM", "CVX", "COP", "SLB", "LIN", "APD", "FCX", "NEM"] },
  { label: "Consumer", tickers: ["COST", "WMT", "HD", "MCD", "SBUX", "NKE", "PG", "KO"] },
  { label: "Industrials & Defense", tickers: ["CAT", "BA", "LMT", "RTX", "GE", "HON", "DE", "UNP"] },
  { label: "REITs & Dividends", tickers: ["O", "AMT", "PLD", "SPG", "VZ", "T", "XLU", "SCHD"] },
  { label: "ETFs & Indices", tickers: ["SPY", "QQQ", "IWM", "DIA", "XLF", "XLV", "XLE", "XLK"] },
];

export default function TechnicalIndexPage() {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const handleGo = () => {
    const t = search.trim().toUpperCase();
    if (t) {
      router.push(`/technical/${encodeURIComponent(t)}`);
      setSearch("");
    }
  };

  const navContent = (
    <div className="flex items-center gap-4">
      <Link href="/" className="text-[10px] font-semibold hover:underline" style={{ fontFamily: mono, color: BLU }}>
        Home
      </Link>
      <Link href="/screener-v4" className="text-[10px] font-semibold hover:underline" style={{ fontFamily: mono, color: BLU }}>
        Screener
      </Link>
    </div>
  );

  return (
    <WSJLayout navContent={navContent}>
      <div className="mx-auto max-w-[1200px] px-4 py-6">
        {/* Header */}
        <h1 className="text-3xl font-bold sm:text-4xl" style={{ fontFamily: serif, color: INK }}>
          Technical Analysis
        </h1>
        <p className="mt-1 text-sm" style={{ color: T2, fontFamily: mono }}>
          Charts with Bollinger Bands, RSI, MACD, Stochastic, Support/Resistance, Fibonacci, Parabolic SAR, and multi-indicator setup detection.
        </p>

        <HeavyRule />

        {/* Search bar */}
        <div className="my-4">
          <form
            onSubmit={(e) => { e.preventDefault(); handleGo(); }}
            className="flex items-center gap-2"
          >
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Enter any ticker symbol…"
              className="w-full max-w-xs border px-3 py-2 text-sm uppercase"
              style={{
                borderColor: GRY, background: WHT, color: INK,
                fontFamily: mono, outline: "none",
              }}
            />
            <button
              type="submit"
              className="border px-4 py-2 text-sm font-bold transition-colors hover:opacity-80"
              style={{ background: INK, color: WHT, borderColor: INK, fontFamily: mono }}
            >
              Analyze
            </button>
          </form>
        </div>

        <Hair />

        {/* Ticker groups */}
        <div className="mt-4 space-y-5">
          {GROUPS.map((g) => (
            <div key={g.label}>
              <h3
                className="mb-2 text-[10px] font-extrabold uppercase tracking-[0.2em]"
                style={{ fontFamily: mono, color: INK }}
              >
                {g.label}
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {g.tickers.map((t) => (
                  <Link
                    key={t}
                    href={`/technical/${t}`}
                    className="inline-block border px-2.5 py-1 text-xs font-bold transition-colors hover:opacity-80"
                    style={{
                      borderColor: GRY, color: INK, fontFamily: mono,
                      background: WHT,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = INK;
                      e.currentTarget.style.color = WHT;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = WHT;
                      e.currentTarget.style.color = INK;
                    }}
                  >
                    {t}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <Hair />

        {/* Info blurb */}
        <div className="mt-4 grid gap-4 sm:grid-cols-3" style={{ fontFamily: mono }}>
          <div>
            <h4 className="mb-1 text-[10px] font-bold uppercase tracking-widest" style={{ color: INK }}>
              Overlays
            </h4>
            <p className="text-[11px] leading-relaxed" style={{ color: T2 }}>
              Bollinger Bands, EMA 8/21 ribbon, Parabolic SAR, auto-detected support &amp; resistance levels, Fibonacci retracements.
            </p>
          </div>
          <div>
            <h4 className="mb-1 text-[10px] font-bold uppercase tracking-widest" style={{ color: INK }}>
              Studies
            </h4>
            <p className="text-[11px] leading-relaxed" style={{ color: T2 }}>
              RSI (14) with overbought/oversold zones, MACD (12, 26, 9) histogram, Stochastic %K/%D oscillator.
            </p>
          </div>
          <div>
            <h4 className="mb-1 text-[10px] font-bold uppercase tracking-widest" style={{ color: INK }}>
              Setup Detection
            </h4>
            <p className="text-[11px] leading-relaxed" style={{ color: T2 }}>
              BB squeeze breakouts, RSI divergences, golden/death crosses, MACD crosses, EMA pullbacks, volume climax reversals, candlestick patterns.
            </p>
          </div>
        </div>
      </div>
    </WSJLayout>
  );
}
