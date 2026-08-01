import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Language } from '../types';
import { translations, TranslationDictionary } from '../data/translations';

export interface LocalizedContent<T = string> {
  en: T;
  bn?: T;
  ar?: T;
}

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: TranslationDictionary;
  isRtl: boolean;
  tPath: (path: string, fallback?: string) => string;
  translateContent: <T = string>(content: LocalizedContent<T> | T | undefined | null) => T;
  formatNumber: (val: number | string) => string;
  formatCurrency: (amountBDT: number) => string;
  getCategoryName: (category: string) => string;
  getStatusName: (status: string) => string;
  getDistrictName: (district: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('en');

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('sukoon_language', lang);
  };

  useEffect(() => {
    const saved = localStorage.getItem('sukoon_language') as Language;
    if (saved && (saved === 'en' || saved === 'bn' || saved === 'ar')) {
      setLanguageState(saved);
    }
  }, []);

  const isRtl = language === 'ar';

  useEffect(() => {
    const dir = isRtl ? 'rtl' : 'ltr';
    document.documentElement.dir = dir;
    document.documentElement.lang = language;
    document.body.dir = dir;
    document.body.setAttribute('dir', dir);
    if (isRtl) {
      document.body.classList.add('rtl-mode', 'rtl');
      document.documentElement.classList.add('rtl-mode', 'rtl');
    } else {
      document.body.classList.remove('rtl-mode', 'rtl');
      document.documentElement.classList.remove('rtl-mode', 'rtl');
    }
  }, [language, isRtl]);

  const currentTranslations = translations[language] || translations.en;

  const tPath = useCallback((path: string, fallback?: string): string => {
    const keys = path.split('.');
    let current: any = currentTranslations;
    for (const key of keys) {
      if (current && typeof current === 'object' && key in current) {
        current = current[key];
      } else {
        return fallback || path;
      }
    }
    return typeof current === 'string' ? current : (fallback || path);
  }, [currentTranslations]);

  const translateContent = useCallback(<T = string>(content: LocalizedContent<T> | T | undefined | null): T => {
    if (content === undefined || content === null) return '' as unknown as T;
    if (typeof content !== 'object') return content as T;
    const obj = content as LocalizedContent<T>;
    if (language === 'bn' && obj.bn) return obj.bn;
    if (language === 'ar' && obj.ar) return obj.ar;
    return obj.en || ('' as unknown as T);
  }, [language]);

  const formatNumber = useCallback((val: number | string): string => {
    const str = String(val);
    if (language === 'bn') {
      const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
      return str.replace(/[0-9]/g, (digit) => bnDigits[parseInt(digit, 10)]);
    }
    if (language === 'ar') {
      const arDigits = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
      return str.replace(/[0-9]/g, (digit) => arDigits[parseInt(digit, 10)]);
    }
    return str;
  }, [language]);

  const formatCurrency = useCallback((amountBDT: number): string => {
    const formattedNum = new Intl.NumberFormat(
      language === 'bn' ? 'bn-BD' : language === 'ar' ? 'ar-EG' : 'en-US'
    ).format(amountBDT);

    const kwdVal = amountBDT / 386.2;
    const kwdFormatted = kwdVal >= 1000 ? `${(kwdVal / 1000).toFixed(1)}K` : Math.round(kwdVal).toLocaleString();

    if (language === 'bn') return `৳ ${formattedNum} (د.ك ${kwdFormatted})`;
    if (language === 'ar') return `৳ ${formattedNum} (د.ك ${kwdFormatted})`;
    return `৳ ${formattedNum} BDT (د.ك ${kwdFormatted} KWD)`;
  }, [language]);

  const getCategoryName = useCallback((category: string): string => {
    const catKey = category.toLowerCase() as keyof TranslationDictionary['propertyCategory'];
    if (currentTranslations.propertyCategory && currentTranslations.propertyCategory[catKey]) {
      return currentTranslations.propertyCategory[catKey];
    }
    return category;
  }, [currentTranslations]);

  const getStatusName = useCallback((status: string): string => {
    if (status === 'Ongoing' || status === 'Under Construction') return currentTranslations.propertyStatus.ongoing;
    if (status === 'Ready to Move' || status === 'Ready') return currentTranslations.propertyStatus.readyToMove;
    if (status === 'Upcoming') return currentTranslations.propertyStatus.upcoming;
    if (status === 'Sold Out') return currentTranslations.propertyStatus.soldOut;
    return status;
  }, [currentTranslations]);

  const getDistrictName = useCallback((district: string): string => {
    const distKey = district.toLowerCase().replace(/['\s]/g, '') as keyof TranslationDictionary['districts'];
    if (currentTranslations.districts && currentTranslations.districts[distKey]) {
      return currentTranslations.districts[distKey];
    }
    return district;
  }, [currentTranslations]);

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t: currentTranslations,
        isRtl,
        tPath,
        translateContent,
        formatNumber,
        formatCurrency,
        getCategoryName,
        getStatusName,
        getDistrictName,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const useTranslation = useLanguage;

