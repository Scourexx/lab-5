import { createContext, useState, useContext, useEffect } from 'react';
import { ConfigProvider } from 'antd';
import { getThemeConfig, getThemeVariables } from '../utils/theme';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme || 'dark'; // Set dark as default theme
  });
  
  const isDarkMode = theme === 'dark';
  
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };
  
  const setDarkMode = () => setTheme('dark');
  const setLightMode = () => setTheme('light');
  
  useEffect(() => {
    localStorage.setItem('theme', theme);
    
    document.documentElement.style.colorScheme = theme;
    document.body.className = theme === 'dark' ? 'dark-theme' : 'light-theme';
    
    Object.entries(getThemeVariables(theme)).forEach(([key, value]) => {
      document.documentElement.style.setProperty(key, value);
    });
  }, [theme]);
  
  const themeConfig = getThemeConfig(theme);
  
  return (
    <ThemeContext.Provider value={{
      theme,
      isDarkMode,
      toggleTheme,
      setDarkMode,
      setLightMode,
      themeConfig
    }}>
      <ConfigProvider theme={themeConfig}>
        {children}
      </ConfigProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext); 