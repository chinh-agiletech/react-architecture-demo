import 'i18next';
import { translations } from '../lib/translations';

// Type definitions for i18next to know the structure of our translation resources
declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'common';
    resources: {
      common: {
        welcome: string;
        account: string;
        xMember: string;
        longStay: string;
        aboutXHotel: string;
        language: string;
        vietnamese: string;
        english: string;
        [key: string]: string;
      };
    };
  }
}
