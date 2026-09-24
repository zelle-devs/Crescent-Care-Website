'use client';

import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext({
  theme: 'dark',
  toggleTheme: () => {},
  mounted: false,
});

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('dark');
  const [mounted, setMounted] = useState(false);

  // Detect system theme
  const getSystemTheme = () => {
    if (
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-color-scheme: light)').matches
    ) {
      return 'light';
    }

    return 'dark';
  };

  // Initial theme
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');

    // If user has manually selected a theme before,
    // keep that preference.
    if (savedTheme === 'light' || savedTheme === 'dark') {
      setTheme(savedTheme);
    } else {
      // Otherwise follow device/browser system theme.
      setTheme(getSystemTheme());
    }

    setMounted(true);
  }, []);

  // Apply theme to <html>
  useEffect(() => {
    if (!mounted) return;

    const root = document.documentElement;

    root.setAttribute('data-theme', theme);

    localStorage.setItem('theme', theme);
  }, [theme, mounted]);

  // Toggle manually
  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
        mounted,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }

  return context;
};


// 'use client';

// import { createContext, useContext, useEffect, useState } from 'react';

// const ThemeContext = createContext({
//   theme: 'dark',
//   toggleTheme: () => {},
// });

// export const ThemeProvider = ({ children }) => {
//   const [theme, setTheme] = useState('dark');
//   const [mounted, setMounted] = useState(false);

//   // Load saved theme from localStorage on mount
//   useEffect(() => {
//     const savedTheme = localStorage.getItem('theme');
//     const initialTheme = savedTheme || 'dark'; // default dark (kyunki aapki site dark hai)
//     setTheme(initialTheme);
//     setMounted(true);
//   }, []);

//   // Apply theme to <html> tag
//   useEffect(() => {
//     if (!mounted) return;

//     const root = document.documentElement;
//     if (theme === 'light') {
//       root.setAttribute('data-theme', 'light');
//     } else {
//       root.setAttribute('data-theme', 'dark');
//     }
//     localStorage.setItem('theme', theme);
//   }, [theme, mounted]);

//   const toggleTheme = () => {
//     setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
//   };

//   return (
//     <ThemeContext.Provider value={{ theme, toggleTheme, mounted }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// };

// export const useTheme = () => {
//   const context = useContext(ThemeContext);
//   if (!context) {
//     throw new Error('useTheme must be used within ThemeProvider');
//   }
//   return context;
// };