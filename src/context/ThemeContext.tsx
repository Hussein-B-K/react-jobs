import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

interface ThemeContext {
  isDark: boolean;
  toggleTheme: () => void;
}

const STORAGE_KEY = 'theme-preference';

const ThemeContext = createContext<ThemeContext | undefined>(undefined);

/**
 * @function useTheme
 * @description A custom hook to consume the Theme Context, providing access to 
 * the theme state and toggle function.
 * @returns {ThemeContext} The context value.
 * @throws {Error} If used outside of a ThemeProvider.
 */
export const useTheme = (): ThemeContext => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }: { children: ReactNode }): JSX.Element => {
  const [isDark, setIsDark] = useState<boolean>(() => {
    // Initial state: there is a stored value? then apply it. "this is the top priority"
    const storedTheme = localStorage.getItem(STORAGE_KEY);
    if (storedTheme !== null) {
      return storedTheme === 'dark';
    }
    // no stored value exists? a Fallback
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    const root = window.document.documentElement;
    
    const themeString = isDark ? 'dark' : 'light';
    localStorage.setItem(STORAGE_KEY, themeString);

    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(prevMode => !prevMode);
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};