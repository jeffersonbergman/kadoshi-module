
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { useTheme } from 'next-themes';
import { useTranslation } from 'react-i18next';

interface AppContextProps {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  theme: string;
  setTheme: (theme: string) => void;
  language: string;
  setLanguage: (language: string) => void;
  login?: (username: string, password: string) => Promise<boolean>;
}

// Create the context with a default value that's null
// This avoids deep type instantiation issues
export const AppContext = createContext<AppContextProps | null>(null);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { theme, setTheme } = useTheme();
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState(i18n.language);

  const updateLanguage = (newLanguage: string) => {
    i18n.changeLanguage(newLanguage);
    setLanguage(newLanguage);
  };

  const login = async (username: string, password: string): Promise<boolean> => {
    // Mock login functionality
    if (username && password) {
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  return (
    <AppContext.Provider value={{
      isAuthenticated,
      setIsAuthenticated,
      theme: theme || 'light',
      setTheme,
      language,
      setLanguage: updateLanguage,
      login
    }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook that handles the null check
export const useApp = () => {
  const context = useContext(AppContext);
  if (context === null) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
