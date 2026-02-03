/**
 * Theme Synchronization Hook
 *
 * Keeps the app theme and Reown wallet modal theme in sync.
 * Listens to system preference changes and manual toggles.
 */

import { useEffect, useState, useCallback } from 'react';
import { useAppKit } from '@reown/appkit/react';

type ThemeMode = 'light' | 'dark';

export function useThemeSync() {
  const { setThemeMode } = useAppKit();
  const [theme, setTheme] = useState<ThemeMode>('dark');

  // Detect system preference
  const getSystemTheme = useCallback((): ThemeMode => {
    if (typeof window === 'undefined') return 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  }, []);

  // Initialize theme from system preference or localStorage
  useEffect(() => {
    const stored = localStorage.getItem('theme') as ThemeMode | null;
    const initial = stored || getSystemTheme();
    setTheme(initial);
    setThemeMode(initial);

    // Apply to document
    document.documentElement.classList.toggle('dark', initial === 'dark');
  }, [getSystemTheme, setThemeMode]);

  // Listen for system preference changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = (e: MediaQueryListEvent) => {
      // Only auto-update if user hasn't set a manual preference
      const stored = localStorage.getItem('theme');
      if (!stored) {
        const newTheme = e.matches ? 'dark' : 'light';
        setTheme(newTheme);
        setThemeMode(newTheme);
        document.documentElement.classList.toggle('dark', newTheme === 'dark');
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [setThemeMode]);

  // Manual theme toggle function
  const toggleTheme = useCallback(() => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    setThemeMode(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  }, [theme, setThemeMode]);

  // Set specific theme
  const setSpecificTheme = useCallback((newTheme: ThemeMode) => {
    setTheme(newTheme);
    setThemeMode(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  }, [setThemeMode]);

  return {
    theme,
    isDark: theme === 'dark',
    toggleTheme,
    setTheme: setSpecificTheme,
  };
}
