import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Language } from '../../types';
import { Globe, ChevronDown, Check } from 'lucide-react';

export interface LanguageOption {
  code: Language;
  label: string;
  nativeName: string;
  flag: string;
}

export const LANGUAGE_OPTIONS: LanguageOption[] = [
  { code: 'en', label: 'English', nativeName: 'English (EN)', flag: '🇬🇧' },
  { code: 'bn', label: 'Bangla', nativeName: 'বাংলা (BN)', flag: '🇧🇩' },
  { code: 'ar', label: 'Arabic', nativeName: 'العربية (AR)', flag: '🇸🇦' },
];

export interface LanguageSwitcherProps {
  variant?: 'dropdown' | 'buttons' | 'pills';
  className?: string;
  buttonClassName?: string;
  onSelect?: (lang: Language) => void;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  variant = 'dropdown',
  className = '',
  buttonClassName = '',
  onSelect,
}) => {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentOption = LANGUAGE_OPTIONS.find((opt) => opt.code === language) || LANGUAGE_OPTIONS[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectLanguage = (code: Language) => {
    setLanguage(code);
    setIsOpen(false);
    if (onSelect) onSelect(code);
  };

  if (variant === 'buttons') {
    return (
      <div className={`flex items-center gap-1.5 ${className}`}>
        {LANGUAGE_OPTIONS.map((opt) => (
          <button
            key={opt.code}
            onClick={() => handleSelectLanguage(opt.code)}
            className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all flex items-center gap-1.5 ${
              language === opt.code
                ? 'bg-[#8C715E] text-white shadow-xs'
                : 'bg-[#3D3834] text-[#E5E5DF] hover:bg-[#5A5A40]'
            }`}
            title={opt.label}
          >
            <span>{opt.flag}</span>
            <span>{opt.code.toUpperCase()}</span>
          </button>
        ))}
      </div>
    );
  }

  if (variant === 'pills') {
    return (
      <div className={`flex items-center bg-[#23201D] p-1 rounded-full border border-[#5A5A40]/40 ${className}`}>
        {LANGUAGE_OPTIONS.map((opt) => (
          <button
            key={opt.code}
            onClick={() => handleSelectLanguage(opt.code)}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
              language === opt.code
                ? 'bg-[#5A5A40] text-white font-bold shadow-xs'
                : 'text-[#8C8C7F] hover:text-white'
            }`}
          >
            {opt.code.toUpperCase()}
          </button>
        ))}
      </div>
    );
  }

  // Default dropdown variant
  return (
    <div className={`relative inline-block text-left ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-1.5 bg-[#2D2926] hover:bg-[#5A5A40] text-white px-2.5 py-1 rounded-full text-xs font-medium border border-[#5A5A40] transition ${buttonClassName}`}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <Globe className="w-3.5 h-3.5 text-[#8C715E]" />
        <span className="font-semibold uppercase">{currentOption.code}</span>
        <span className="text-[#8C8C7F] text-[10px] hidden sm:inline">({currentOption.label})</span>
        <ChevronDown className={`w-3 h-3 text-[#8C8C7F] transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div
          className="absolute right-0 mt-1.5 w-40 bg-[#2D2926] border border-[#5A5A40] rounded-xl shadow-2xl py-1.5 z-50 divide-y divide-[#3D3834]"
          role="menu"
        >
          <div className="px-3 py-1 text-[10px] font-bold text-[#8C8C7F] uppercase tracking-wider">
            Select Language / ভাষা
          </div>
          <div className="py-1">
            {LANGUAGE_OPTIONS.map((opt) => (
              <button
                key={opt.code}
                onClick={() => handleSelectLanguage(opt.code)}
                className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-[#5A5A40] transition ${
                  language === opt.code ? 'bg-[#5A5A40]/60 text-[#FDFCF8] font-bold' : 'text-[#E5E5DF]'
                }`}
                role="menuitem"
              >
                <div className="flex items-center gap-2">
                  <span className="text-sm">{opt.flag}</span>
                  <span>{opt.nativeName}</span>
                </div>
                {language === opt.code && <Check className="w-3.5 h-3.5 text-[#8C715E]" />}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
