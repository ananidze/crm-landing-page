'use client';

import { useEffect } from 'react';

// This component is used to prevent dark mode flickering on page load
export default function DarkModeScript() {
  useEffect(() => {
    // This script runs on the client side before React hydration
    // It ensures the initial theme is set correctly to avoid flickering
    // The actual theme state will be managed by ThemeContext after hydration
    
    // On page load, best to add inline in `head` to avoid FOUC
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  return null;
} 