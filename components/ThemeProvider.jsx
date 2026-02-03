'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext({
    theme: 'light',
    setTheme: () => null,
    resolvedTheme: 'light',
});

export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState('light');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') || 'light';
        setTheme(savedTheme === 'system' ? 'light' : savedTheme); // Migrate system to light
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted) return;

        const root = window.document.documentElement;

        const updateTheme = () => {
            console.log(`[Theme] Setting theme to: ${theme}`);

            if (theme === 'dark') {
                root.classList.add('dark');
            } else {
                root.classList.remove('dark');
            }
        };

        updateTheme();
        localStorage.setItem('theme', theme);
    }, [theme, mounted]);

    return (
        <ThemeContext.Provider value={{ theme, setTheme, resolvedTheme: theme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export const useTheme = () => useContext(ThemeContext);
