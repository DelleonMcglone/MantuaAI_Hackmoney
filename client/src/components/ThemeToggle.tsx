/**
 * Theme Toggle Button
 *
 * Allows users to manually switch between light and dark mode.
 * Automatically syncs the Reown wallet modal theme.
 */

import { useThemeSync } from '@/hooks/useThemeSync';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function ThemeToggle() {
  const { isDark, toggleTheme } = useThemeSync();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      data-testid="theme-toggle"
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      className="rounded-lg"
    >
      {isDark ? (
        <Sun className="h-5 w-5 text-yellow-500" />
      ) : (
        <Moon className="h-5 w-5 text-gray-700" />
      )}
    </Button>
  );
}
