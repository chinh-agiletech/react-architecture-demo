// Language utilities for i18n
import { i18n } from 'i18next';

/**
 * Change the application language and store the preference
 * @param i18nInstance i18n instance
 * @param language Language code ('en', 'vi')
 */
export const changeLanguage = (i18nInstance: i18n, language: string): void => {
  if (i18nInstance) {
    i18nInstance.changeLanguage(language);
    // Storage is handled via the languageChanged event in i18n.ts
  }
};

/**
 * Get the current language from localStorage or default to 'vi'
 */
export const getCurrentLanguage = (): string => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('language') || 'vi';
  }
  return 'vi';
};
