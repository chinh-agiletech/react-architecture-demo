'use client';

import React, { useEffect, useState } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from 'i18next';
import initI18n from './i18n';

interface I18nProviderProps {
  children: React.ReactNode;
}

const I18nProvider: React.FC<I18nProviderProps> = ({ children }) => {
  const [i18nInstance, setI18nInstance] = useState<typeof i18n | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Initialize i18n
    const i18n = initI18n();
    setI18nInstance(i18n);

    // Handle language from localStorage only on client side
    try {
      if (typeof window !== 'undefined') {
        const storedLang = localStorage.getItem('language');
        if (storedLang) {
          i18n.changeLanguage(storedLang);
        }
      }
    } catch (error) {
      console.error('Error accessing localStorage:', error);
    }
    
    setMounted(true);
  }, []);

  // Handle SSR/hydration issues - wait for mounting to avoid mismatches
  if (!i18nInstance || !mounted) {
    return <div>Loading...</div>;
  }

  return (
    <I18nextProvider i18n={i18nInstance}>
      {children}
    </I18nextProvider>
  );
};

export default I18nProvider;
