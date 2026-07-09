"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import WSJLayout from "@/components/WSJLayout";
import { formatCurrency } from "@/lib/format";
import {
  WHT, INK, GRY, RED, T2, TM,
  serif, mono, sans,
  Hair, WSJSection,
} from "@/lib/wsj";
import {
  fetchDividendScreener,
  type DividendScreenerResponse,
  type DividendStock,
  type DividendScreenerParams,
} from "@/lib/api";
import { useWatchlist } from "@/lib/useWatchlist";

type SortField = "symbol" | "dividendYield" | "trailingAnnualDividendRate" | "fiveYearAvgDividendYield" | "marketCap" | "trailingPE" | "profitMargins" | "exDividendDate";

export default function DividendsPage() {
  const [data, setData] = useState<DividendScreenerResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [sortField, setSortField] = useState<SortField>("dividendYield");
  const [sortDesc, setSortDesc] = useState(true);
  const { watchlist, toggle } = useWatchlist();

  // Filters
  const [minYield, setMinYield] = useState<string>("");
  const [maxYield, setMaxYield] = useState<string>("");
  const [sector, setSector] = useState<string>("");
  const [minCap, setMinCap] = useState<string>("");

  const load = useCallback(() => {
    setLoading(true);
    const params: DividendScreenerParams = {};
    if (minYield) params.minYield = parseFloat(minYield);
    if (maxYield) params.maxYield = parseFloat(maxYield);
    if (sector) params.sector = sector;
    if (minCap) params.minCap = parseFloat(minCap) * 1e9;
    fetchDividendScreener(params)
      .then(setData)
      .catch(() => setData(null))
      .finally(() => setLoading(false));
  }, [minYield, maxYield, sector, minCap]);

  useEffect(() => { load(); }, [load]);

  const handleSort = (field: SortField) => {
    if (sortField === field) setSortDesc(!sortDesc);
    else { setSortField(field); setSortDesc(true); }
  };

  const sorted = data?.stocks
    ? [...data.stocks].sort((a, b) => {
        const av = a[sortField] ?? (sortDesc ? -Infinity : Infinity);
        const bv = b[sortField] ?? (sortDesc ? -Infinity : Infinity);
        if (typeof av === "string" && typeof bv === "string") return sortDesc ? bv.localeCompare(av) : av.localeCompare(bv);
        return sortDesc ? (bv as number) - (av as number) : (av as number) - (bv as number);
      })
    : [];

  const navContent = (
    <div className="flex items-center gap-4">
      <Link href="/" className="text-[10px] font-semibold hover:underline" style={{ fontFamily: mono, color: T2 }}>← Home</Link>
    </div>
  );

  const cols: { key: SortField; label: string; fmt: (s: DividendStock) => string; align?: string }[] = [
    { key: "symbol", label: "Ticker", fmt: (s) => s.symbol, align: "left" },
    { key: "dividendYield", label: "Yield", fmt: (s) => s.dividendYield != null && isFinite(Number(s.dividendYield)) ? `${Number(s.dividendYield).toFixed(2)}%` : "—" },
    { key: "trailingAnnualDividendRate", label: "Ann. Rate", fmt: (s) => s.trailingAnnualDividendRate != null && isFinite(Number(s.trailingAnnualDividendRate)) ? `$${Number(s.trailingAnnualDividendRate).toFixed(2)}` : "—" },
    { key: "fiveYearAvgDividendYield", label: "5Y Avg", fmt: (s) => s.fiveYearAvgDividendYield != null && isFinite(Number(s.fiveYearAvgDividendYield)) ? `${Number(s.fiveYearAvgDividendYield).toFixed(2)}%` : "—" },
    { key: "marketCap", label: "Mkt Cap", fmt: (s) => formatCurrency(s.marketCap) },
    { key: "trailingPE", label: "P/E", fmt: (s) => s.trailingPE != null && isFinite(Number(s.trailingPE)) ? Number(s.trailingPE).toFixed(1) : "—" },
    { key: "profitMargins", label: "Margin", fmt: (s) => s.profitMargins != null && isFinite(Number(s.profitMargins)) ? `${(Number(s.profitMargins) * 100).toFixed(1)}%` : "—" },
    { key: "exDividendDate", label: "Ex-Div Date", fmt: (s) => s.exDividendDate ?? "—" },
  ];

  return (
    <WSJLayout navContent={navContent}>
      <WSJSection title="Dividend Screener" />

      {/* Filters */}
      <div className="flex flex-wrap items-end gap-3 mb-5 pb-4" style={{ borderBottom: `1px solid ${GRY}` }}>
        <div>
          <label className="block text-[8px] uppercase tracking-wider font-extrabold mb-0.5" style={{ fontFamily: sans, color: TM }}>Min Yield %</label>
          <input
            type="number" step="0.1" min="0" placeholder="0"
            className="border px-2 py-1.5 text-[12px] w-20 tabular-nums"
            style={{ borderColor: GRY, fontFamily: mono, background: WHT }}
            value={minYield} onChange={(e) => setMinYield(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-[8px] uppercase tracking-wider font-extrabold mb-0.5" style={{ fontFamily: sans, color: TM }}>Max Yield %</label>
          <input
            type="number" step="0.1" min="0" placeholder="∞"
            className="border px-2 py-1.5 text-[12px] w-20 tabular-nums"
            style={{ borderColor: GRY, fontFamily: mono, background: WHT }}
            value={maxYield} onChange={(e) => setMaxYield(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-[8px] uppercase tracking-wider font-extrabold mb-0.5" style={{ fontFamily: sans, color: TM }}>Sector</label>
          <select
            className="border px-2 py-1.5 text-[12px]"
            style={{ borderColor: GRY, fontFamily: mono, background: WHT }}
            value={sector} onChange={(e) => setSector(e.target.value)}
          >
            <option value="">All Sectors</option>
            {data?.sectors.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-[8px] uppercase tracking-wider font-extrabold mb-0.5" style={{ fontFamily: sans, color: TM }}>Min Cap ($B)</label>
          <input
            type="number" step="1" min="0" placeholder="0"
            className="border px-2 py-1.5 text-[12px] w-20 tabular-nums"
            style={{ borderColor: GRY, fontFamily: mono, background: WHT }}
            value={minCap} onChange={(e) => setMinCap(e.target.value)}
          />
        </div>
      </div>

      {/* Summary */}
      {!loading && data && (
        <div className="text-[10px] mb-3" style={{ fontFamily: sans, color: TM }}>
          Showing <strong style={{ color: INK }}>{sorted.length}</strong> dividend-paying stocks
        </div>
      )}

      {loading && (
        <div className="flex items-center justify-center py-24">
          <div className="text-[11px] uppercase tracking-[0.2em] animate-pulse" style={{ fontFamily: sans, color: TM }}>Loading dividend stocks…</div>
        </div>
      )}

      {!loading && sorted.length > 0 && (
        <div className="overflow-x-auto -mx-6 px-6">
          <table className="w-full text-[12px] border-collapse" style={{ fontFamily: mono }}>
            <thead>
              <tr style={{ borderBottom: `2px solid ${INK}` }}>
                <th className="py-2 px-1 w-8 text-center text-[9px]" style={{ fontFamily: sans, color: TM }}>★</th>
                {cols.map((c) => (
                  <th
                    key={c.key}
                    className={`py-2 px-2 cursor-pointer hover:underline text-[9px] uppercase tracking-wider font-extrabold ${c.align === "left" ? "text-left" : "text-right"}`}
                    style={{ fontFamily: sans, color: sortField === c.key ? INK : TM }}
                    onClick={() => handleSort(c.key)}
                  >
                    {c.label}{sortField === c.key && (sortDesc ? " ▾" : " ▴")}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sorted.map((stock) => (
                <tr key={stock.symbol} className="hover:bg-[#f0ead8] transition-colors" style={{ borderBottom: `1px solid ${GRY}` }}>
                  <td className="py-1.5 px-1 text-center">
                    <button onClick={() => toggle(stock.symbol)} className="text-[14px]" title="Toggle watchlist">
                      {watchlist.includes(stock.symbol) ? "★" : "☆"}
                    </button>
                  </td>
                  {cols.map((c) => (
                    <td key={c.key} className={`py-1.5 px-2 tabular-nums ${c.align === "left" ? "text-left" : "text-right"}`}>
                      {c.key === "symbol" ? (
                        <Link href={`/stocks/${stock.symbol}`} className="font-bold hover:underline" style={{ color: INK }}>
                          {stock.symbol}
                          <span className="ml-1.5 text-[10px] font-normal" style={{ color: TM, fontFamily: serif }}>{stock.shortName}</span>
                        </Link>
                      ) : (
                        <span style={{ color: INK }}>{c.fmt(stock)}</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!loading && data && sorted.length === 0 && (
        <div className="text-center py-12 text-[11px]" style={{ fontFamily: sans, color: TM }}>
          No stocks match your filters.
        </div>
      )}
    </WSJLayout>
  );
}
