import { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { updateUserSettings } from '../firebase/firestore';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  const { user } = useAuth();

  useEffect(() => {
    // Get theme from localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
    } else if (user?.settings?.theme) {
      // If not in localStorage but user has a preference, use that
      setTheme(user.settings.theme);
      localStorage.setItem('theme', user.settings.theme);
    }
    
    // Apply theme to document
    document.documentElement.setAttribute('data-theme', theme);
  }, [user, theme]);

  const toggleTheme = async () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    
    // Save to user settings if logged in
    if (user) {
      try {
        await updateUserSettings(user.uid, {
          ...user.settings,
          theme: newTheme
        });
      } catch (error) {
        console.error('Error updating theme in user settings', error);
      }
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);