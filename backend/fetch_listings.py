"""
Fetch S&P 500, NASDAQ-100, and full NASDAQ exchange listings.

Sources (all free, no API key):
  - S&P 500:    Wikipedia
  - NASDAQ-100: Wikipedia
  - Full NASDAQ: nasdaqtrader.com (official)

Usage:
    python fetch_listings.py              # fetch all three
    python fetch_listings.py sp500        # fetch only S&P 500
    python fetch_listings.py nasdaq100    # fetch only NASDAQ-100
    python fetch_listings.py nasdaq_all   # fetch only full NASDAQ
"""

import json
import os
import sys
from io import StringIO

import pandas as pd
import requests

OUT_DIR = os.path.join(os.path.dirname(__file__), "cache", "listings")
HEADERS = {"User-Agent": "Mozilla/5.0 (compatible; zero-sum-bot/1.0)"}


def fetch_sp500() -> list[dict]:
    """Fetch S&P 500 constituents from Wikipedia."""
    url = "https://en.wikipedia.org/wiki/List_of_S%26P_500_companies"
    r = requests.get(url, headers=HEADERS, timeout=15)
    r.raise_for_status()
    df = pd.read_html(StringIO(r.text))[0]
    stocks = []
    for _, row in df.iterrows():
        stocks.append({
            "symbol": row["Symbol"],
            "name": row["Security"],
            "sector": row["GICS Sector"],
            "subIndustry": row.get("GICS Sub-Industry", ""),
        })
    return stocks


def fetch_nasdaq100() -> list[dict]:
    """Fetch NASDAQ-100 constituents from Wikipedia."""
    url = "https://en.wikipedia.org/wiki/Nasdaq-100"
    r = requests.get(url, headers=HEADERS, timeout=15)
    r.raise_for_status()
    tables = pd.read_html(StringIO(r.text))
    # Find the table with 'Ticker' column
    df = None
    for t in tables:
        if "Ticker" in t.columns:
            df = t
            break
    if df is None:
        raise ValueError("Could not find NASDAQ-100 table on Wikipedia")
    stocks = []
    for _, row in df.iterrows():
        sector_col = [c for c in df.columns if "Industry" in c]
        stocks.append({
            "symbol": row["Ticker"],
            "name": row["Company"],
            "sector": row[sector_col[0]] if sector_col else "",
        })
    return stocks


def fetch_nasdaq_all() -> list[dict]:
    """Fetch all NASDAQ-listed common stocks from nasdaqtrader.com."""
    url = "https://www.nasdaqtrader.com/dynamic/SymDir/nasdaqtraded.txt"
    df = pd.read_csv(url, sep="|")
    df = df[df["Symbol"].notna() & (df["Symbol"] != "")]
    # NASDAQ-listed only
    df = df[df["Listing Exchange"] == "Q"]
    # Common stocks: exclude ETFs, test issues, warrants, rights, units
    df = df[
        (df["ETF"] == "N")
        & (df["Test Issue"] == "N")
        & (~df["Security Name"].str.contains("Warrant|Right|Unit", case=False, na=False))
    ]
    stocks = []
    for _, row in df.iterrows():
        stocks.append({
            "symbol": row["Symbol"],
            "name": row["Security Name"],
            "marketCategory": row["Market Category"],  # Q=Global Select, G=Global, S=Capital
        })
    return stocks


def save(name: str, stocks: list[dict]) -> None:
    os.makedirs(OUT_DIR, exist_ok=True)
    path = os.path.join(OUT_DIR, f"{name}.json")
    with open(path, "w") as f:
        json.dump({"count": len(stocks), "stocks": stocks}, f, indent=2)
    size_kb = os.path.getsize(path) / 1024
    print(f"  {name}: {len(stocks)} stocks ({size_kb:.0f} KB) → {path}")


FETCHERS = {
    "sp500": ("S&P 500", fetch_sp500),
    "nasdaq100": ("NASDAQ-100", fetch_nasdaq100),
    "nasdaq_all": ("Full NASDAQ", fetch_nasdaq_all),
}


def main():
    targets = sys.argv[1:] if len(sys.argv) > 1 else list(FETCHERS.keys())
    for key in targets:
        if key not in FETCHERS:
            print(f"Unknown listing: {key}  (choices: {', '.join(FETCHERS)})")
            continue
        label, fetcher = FETCHERS[key]
        print(f"Fetching {label}...")
        try:
            stocks = fetcher()
            save(key, stocks)
        except Exception as e:
            print(f"  ERROR: {e}")
    print("Done.")


if __name__ == "__main__":
    main()
