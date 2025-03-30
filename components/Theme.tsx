'use client';

import React, { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

const Theme = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    // Check for system preference and existing theme on component mount
    useEffect(() => {
        // Check if user has already set a theme preference
        const storedTheme = localStorage.getItem('theme');

        if (storedTheme === 'dark') {
            setIsDarkMode(true);
        } else if (storedTheme === 'light') {
            setIsDarkMode(false);
        } else {
            // Check system preference
            const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            setIsDarkMode(systemPrefersDark);
            localStorage.setItem('theme', systemPrefersDark ? 'dark' : 'light');
        }
    }, []);

    const toggleTheme = () => {
        const newIsDarkMode = !isDarkMode;
        setIsDarkMode(newIsDarkMode);

        if (newIsDarkMode) {
            // Switch to dark mode
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            // Switch to light mode
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    };

    return (
        <button
            onClick={toggleTheme}
            className="flex h-9 w-9 items-center justify-center rounded-md border border-input bg-background p-2 text-muted-foreground shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
            aria-label="Toggle theme"
        >
            {isDarkMode ? (
                <Sun className="h-5 w-5" />
            ) : (
                <Moon className="h-5 w-5" />
            )}
        </button>
    );
};

export default Theme;
