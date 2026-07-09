"use client";

import { useState, useEffect, useCallback, useSyncExternalStore } from "react";

const STORAGE_KEY = "zs_watchlist";

const DEFAULT_WATCHLIST = [
  "AAPL", "MSFT", "GOOG", "AMZN", "NVDA",
  "META", "TSLA", "JPM", "V", "JNJ",
];

/* ── External store for cross-component sync ── */
let listeners: (() => void)[] = [];
function emitChange() {
  for (const l of listeners) l();
}
function subscribe(listener: () => void) {
  listeners = [...listeners, listener];
  return () => { listeners = listeners.filter((l) => l !== listener); };
}

// Cache the parsed snapshot so useSyncExternalStore gets a stable reference
let cachedRaw: string | null = null;
let cachedSnapshot: string[] = DEFAULT_WATCHLIST;

function getSnapshot(): string[] {
  if (typeof window === "undefined") return DEFAULT_WATCHLIST;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw !== cachedRaw) {
      cachedRaw = raw;
      cachedSnapshot = raw ? JSON.parse(raw) : DEFAULT_WATCHLIST;
    }
    return cachedSnapshot;
  } catch {
    return DEFAULT_WATCHLIST;
  }
}
function getServerSnapshot(): string[] {
  return DEFAULT_WATCHLIST;
}

function persist(list: string[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  emitChange();
}

export function useWatchlist() {
  const watchlist = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const add = useCallback((ticker: string) => {
    if (!ticker) return;
    const t = ticker.trim().toUpperCase();
    if (!t) return;
    const current = getSnapshot();
    if (current.includes(t)) return;
    persist([...current, t]);
  }, []);

  const remove = useCallback((ticker: string) => {
    if (!ticker) return;
    const t = ticker.trim().toUpperCase();
    const current = getSnapshot();
    persist(current.filter((x) => x !== t));
  }, []);

  const toggle = useCallback((ticker: string) => {
    if (!ticker) return;
    const t = ticker.trim().toUpperCase();
    if (!t) return;
    const current = getSnapshot();
    if (current.includes(t)) {
      persist(current.filter((x) => x !== t));
    } else {
      persist([...current, t]);
    }
  }, []);

  const has = useCallback((ticker: string) => {
    if (!ticker) return false;
    return watchlist.includes(ticker.trim().toUpperCase());
  }, [watchlist]);

  const reorder = useCallback((newList: string[]) => {
    persist(newList);
  }, []);

  return { watchlist, add, remove, toggle, has, reorder };
}
