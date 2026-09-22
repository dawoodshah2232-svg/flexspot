import { useCallback, useEffect, useState } from 'react';

const KEY = 'flexspot-theme';

function initial() {
  if (typeof window === 'undefined') return 'light';
  const saved = localStorage.getItem(KEY);
  if (saved === 'light' || saved === 'dark') return saved;
  return 'light'; // light is the default theme
}

export function useTheme() {
  const [theme, setTheme] = useState(initial);
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(KEY, theme);
  }, [theme]);
  const toggle = useCallback(() => setTheme((t) => (t === 'dark' ? 'light' : 'dark')), []);
  return { theme, toggle };
}

export function useLiveViewers() {
  const [viewers, setViewers] = useState(() => 120 + Math.floor(Math.random() * 80));
  useEffect(() => {
    const t = setInterval(() => {
      setViewers((v) => Math.max(60, v + Math.floor(Math.random() * 21) - 10));
    }, 6000);
    return () => clearInterval(t);
  }, []);
  return viewers;
}
