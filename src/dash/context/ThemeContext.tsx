import React, { createContext, useContext, useEffect, useRef, useState } from 'react';

export type AccentColor = {
  name: string;
  primary: string;
  container: string;
};

export const accents: AccentColor[] = [
  { name: 'Teal', primary: '#006054', container: '#0f7b6c' },
  { name: 'Blue', primary: '#005fb0', container: '#004a80' },
  { name: 'Purple', primary: '#7c4dff', container: '#5e35b1' },
  { name: 'Rose', primary: '#d81b60', container: '#ad1457' },
];

interface ThemeContextType {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  accent: AccentColor;
  setAccent: (accent: AccentColor) => void;
  scopeRef: React.RefObject<HTMLDivElement | null>;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [accent, setAccent] = useState(accents[0]);
  const scopeRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = scopeRef.current;
    if (!el) return;
    el.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  useEffect(() => {
    const el = scopeRef.current;
    if (!el) return;
    el.style.setProperty('--primary', accent.primary);
    el.style.setProperty('--primary-container', accent.container);
  }, [accent]);

  const toggleDarkMode = () => setIsDarkMode((v) => !v);

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode, accent, setAccent, scopeRef }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within a ThemeProvider');
  return context;
};
