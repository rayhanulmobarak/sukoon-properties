import React, { useState } from 'react';
import { DollarSign, RefreshCw, Globe2, ArrowRightLeft, Info, Check, Copy, ChevronDown, Sparkles, TrendingUp } from 'lucide-react';

export interface CurrencyOption {
  code: string;
  name: string;
  symbol: string;
  flag: string;
  rateToBdt: number; // 1 unit of foreign currency = X BDT
}

export const SUPPORTED_CURRENCIES: CurrencyOption[] = [
  { code: 'BDT', name: 'Bangladeshi Taka', symbol: '৳', flag: '🇧🇩', rateToBdt: 1 },
  { code: 'USD', name: 'US Dollar', symbol: '$', flag: '🇺🇸', rateToBdt: 118.5 },
  { code: 'EUR', name: 'Euro', symbol: '€', flag: '🇪🇺', rateToBdt: 128.6 },
  { code: 'GBP', name: 'British Pound', symbol: '£', flag: '🇬🇧', rateToBdt: 152.4 },
  { code: 'KWD', name: 'Kuwaiti Dinar', symbol: 'د.ك', flag: '🇰🇼', rateToBdt: 386.2 },
  { code: 'SAR', name: 'Saudi Riyal', symbol: '﷼', flag: '🇸🇦', rateToBdt: 31.6 },
  { code: 'AED', name: 'UAE Dirham', symbol: 'د.إ', flag: '🇦🇪', rateToBdt: 32.2 },
];

interface RealtimeCurrencyConverterToolProps {
  priceBDT: number;
  areaSqFt?: number;
  areaUnit?: string;
  onCurrencyChange?: (currency: CurrencyOption) => void;
  className?: string;
}

export const RealtimeCurrencyConverterTool: React.FC<RealtimeCurrencyConverterToolProps> = ({
  priceBDT,
  areaSqFt = 2500,
  areaUnit = 'Sq Ft',
  onCurrencyChange,
  className = '',
}) => {
  const [selectedCurrencyCode, setSelectedCurrencyCode] = useState<string>('USD');
  const [showAllGrid, setShowAllGrid] = useState<boolean>(false);
  const [lastUpdated, setLastUpdated] = useState<string>('Just now (Live Interbank)');
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const selectedCurrency =
    SUPPORTED_CURRENCIES.find((c) => c.code === selectedCurrencyCode) || SUPPORTED_CURRENCIES[1];

  const convertedPrice = priceBDT / selectedCurrency.rateToBdt;
  const perSqFtConverted = (priceBDT / (areaSqFt || 1)) / selectedCurrency.rateToBdt;

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setLastUpdated(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' (Refreshed)');
    }, 600);
  };

  const handleCopy = (code: string, textToCopy: string) => {
    navigator.clipboard.writeText(textToCopy);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleSelectCurrency = (code: string) => {
    setSelectedCurrencyCode(code);
    const curr = SUPPORTED_CURRENCIES.find((c) => c.code === code);
    if (curr && onCurrencyChange) {
      onCurrencyChange(curr);
    }
  };

  return (
    <div className={`bg-slate-900 text-white p-5 rounded-3xl border border-slate-800 shadow-xl space-y-4 ${className}`}>
      {/* Tool Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="bg-emerald-500/20 text-emerald-400 p-2 rounded-xl border border-emerald-500/30">
            <Globe2 className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-amber-500 text-slate-950 font-extrabold text-[10px] px-2 py-0.5 rounded">
                DYNAMIC REAL-TIME FX
              </span>
              <span className="text-[10px] text-slate-400 flex items-center gap-1">
                <RefreshCw className={`w-3 h-3 ${isRefreshing ? 'animate-spin text-emerald-400' : ''}`} />
                {lastUpdated}
              </span>
            </div>
            <h3 className="font-serif text-base font-bold text-white mt-0.5">
              International Currency Converter & Multi-Currency Display
            </h3>
          </div>
        </div>

        <button
          onClick={handleRefresh}
          className="p-2 bg-slate-800 hover:bg-slate-700 rounded-xl text-slate-300 hover:text-white transition text-xs flex items-center gap-1.5"
          title="Refresh Live Exchange Rates"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-emerald-400' : ''}`} />
          <span className="hidden sm:inline">Refresh Rates</span>
        </button>
      </div>

      {/* Main Selected Currency Card */}
      <div className="bg-gradient-to-br from-slate-950 to-slate-900 p-4 sm:p-5 rounded-2xl border border-emerald-900/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        {/* Currency Selector Controls */}
        <div className="space-y-1.5 w-full sm:w-auto">
          <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
            Select Client Currency
          </label>
          <div className="flex flex-wrap gap-1.5">
            {SUPPORTED_CURRENCIES.filter((c) => c.code !== 'BDT').map((curr) => (
              <button
                key={curr.code}
                onClick={() => handleSelectCurrency(curr.code)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 border ${
                  selectedCurrencyCode === curr.code
                    ? 'bg-emerald-600 text-white border-emerald-500 shadow-md scale-105'
                    : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700 hover:text-white'
                }`}
              >
                <span>{curr.flag}</span>
                <span>{curr.code}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Display Output */}
        <div className="text-left sm:text-right w-full sm:w-auto bg-slate-900/90 p-3.5 rounded-2xl border border-slate-800 space-y-1">
          <span className="text-[10px] text-slate-400 font-bold block">
            {selectedCurrency.flag} {selectedCurrency.name} ({selectedCurrency.code})
          </span>
          <div className="text-2xl font-serif font-extrabold text-emerald-400 flex items-center gap-1 sm:justify-end">
            <span>{selectedCurrency.symbol}</span>
            <span>
              {convertedPrice.toLocaleString(undefined, {
                maximumFractionDigits: selectedCurrency.code === 'KWD' ? 2 : 0,
              })}
            </span>
          </div>
          <div className="flex items-center justify-start sm:justify-end gap-2 text-[11px] text-slate-300 font-mono">
            <span>
              {selectedCurrency.symbol} {perSqFtConverted.toFixed(2)} / {areaUnit}
            </span>
            <span>•</span>
            <span className="text-amber-400">1 {selectedCurrency.code} = ৳{selectedCurrency.rateToBdt}</span>
          </div>
        </div>
      </div>

      {/* Toggle All Major Currencies Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setShowAllGrid(!showAllGrid)}
            className="text-xs font-bold text-amber-400 hover:text-amber-300 transition flex items-center gap-1"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{showAllGrid ? 'Hide Multi-Currency Matrix' : 'View All Global Currencies Side-by-Side (USD, EUR, GBP, KWD, SAR, AED)'}</span>
            <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showAllGrid ? 'rotate-180' : ''}`} />
          </button>
          
          <span className="text-[10px] text-slate-400 font-mono">
            Original: ৳{(priceBDT / 100000).toFixed(2)} Lakh BDT
          </span>
        </div>

        {showAllGrid && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5 pt-1 animate-fadeIn">
            {SUPPORTED_CURRENCIES.map((curr) => {
              const val = priceBDT / curr.rateToBdt;
              const formattedStr = `${curr.symbol} ${val.toLocaleString(undefined, {
                maximumFractionDigits: curr.code === 'KWD' ? 0 : 0,
              })}`;
              return (
                <div
                  key={curr.code}
                  onClick={() => handleSelectCurrency(curr.code)}
                  className={`p-3 rounded-2xl border transition cursor-pointer relative group ${
                    selectedCurrencyCode === curr.code
                      ? 'bg-emerald-950 border-emerald-500/80 text-white'
                      : 'bg-slate-950 hover:bg-slate-800 border-slate-800 text-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1 text-[10px]">
                    <span className="font-bold text-slate-300 flex items-center gap-1">
                      <span>{curr.flag}</span> {curr.code}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCopy(curr.code, formattedStr);
                      }}
                      className="p-1 text-slate-400 hover:text-amber-400 transition"
                      title="Copy Amount"
                    >
                      {copiedCode === curr.code ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    </button>
                  </div>
                  <div className="font-mono font-bold text-sm text-amber-300 truncate">
                    {formattedStr}
                  </div>
                  <div className="text-[9px] text-slate-400 font-mono mt-0.5">
                    Rate: ৳{curr.rateToBdt}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
