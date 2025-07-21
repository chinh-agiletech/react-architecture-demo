import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { translations } from './translations';

// Using translations from translations.ts file
const resources = translations;

// Khởi tạo i18n cho App Router
const initI18n = () => {
  if (!i18n.isInitialized) {
    i18n
      .use(initReactI18next)
      .init({
        resources,
        lng: 'vi', // Default to Vietnamese
        fallbackLng: 'vi',
        debug: process.env.NODE_ENV === 'development',
        
        interpolation: {
          escapeValue: false, // React đã escape theo mặc định
        },
        
        defaultNS: 'common',
        ns: ['common'],
        
        // App Router compatibility
        react: {
          useSuspense: false
        }
      });
      
    // Handle language changes and save to localStorage
    i18n.on('languageChanged', (lng) => {
      if (typeof window !== 'undefined') {
        localStorage.setItem('language', lng);
      }
    });
  }
  return i18n;
};

export default initI18n;
