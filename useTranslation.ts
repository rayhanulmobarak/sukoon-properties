import { useCallback } from 'react';
import { useLanguage, LocalizedContent } from '../context/LanguageContext';
import { Language } from '../types';
import { TranslationDictionary } from '../data/translations';

/**
 * Helper function to map dynamic or static localized content objects or strings
 * to the specified target language ('en', 'bn', 'ar') with fallback to English.
 */
export function getLocalizedContent<T = string>(
  content: LocalizedContent<T> | T | undefined | null,
  language: Language = 'en'
): T {
  if (content === undefined || content === null) return '' as unknown as T;
  if (typeof content !== 'object') return content as T;

  const obj = content as LocalizedContent<T>;
  if (language === 'bn' && obj.bn) return obj.bn;
  if (language === 'ar' && obj.ar) return obj.ar;
  return obj.en !== undefined ? obj.en : ('' as unknown as T);
}

export interface TranslationHookResult {
  t: ((key: string, fallback?: string) => string) & TranslationDictionary;
  dict: TranslationDictionary;
  translations: TranslationDictionary;
  language: Language;
  setLanguage: (lang: Language) => void;
  isRtl: boolean;
  translate: <T = string>(content: LocalizedContent<T> | T | undefined | null) => T;
  translateContent: <T = string>(content: LocalizedContent<T> | T | undefined | null) => T;
  formatNumber: (val: number | string) => string;
  formatCurrency: (amountBDT: number) => string;
  getCategoryName: (category: string) => string;
  getStatusName: (status: string) => string;
  getDistrictName: (district: string) => string;
  tPath: (path: string, fallback?: string) => string;
}

/**
 * Custom hook inside `src/hooks/useTranslation.ts` that consumes `LanguageContext`.
 * Provides a `t(key: string)` function that retrieves the correct string for the currently
 * selected language (EN, BN, AR) from the centralized dictionary object, ensuring all UI labels
 * automatically update when the language state changes.
 */
export function useTranslation(): TranslationHookResult {
  const context = useLanguage();

  const tFunction = useCallback(
    (key: string, fallback?: string): string => {
      return context.tPath(key, fallback);
    },
    [context]
  );

  // Combine function lookup t('actions.bookSiteVisit') and object access t.nav.home
  const t = Object.assign(tFunction, context.t);

  return {
    t,
    dict: context.t,
    translations: context.t,
    language: context.language,
    setLanguage: context.setLanguage,
    isRtl: context.isRtl,
    translate: context.translateContent,
    translateContent: context.translateContent,
    formatNumber: context.formatNumber,
    formatCurrency: context.formatCurrency,
    getCategoryName: context.getCategoryName,
    getStatusName: context.getStatusName,
    getDistrictName: context.getDistrictName,
    tPath: context.tPath,
  };
}
