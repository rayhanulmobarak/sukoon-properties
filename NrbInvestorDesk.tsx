import React, { useState } from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import { DollarSign, Landmark, ShieldCheck, ArrowRightLeft, FileCheck2, Percent, CheckCircle, Calculator, Building2, ExternalLink } from 'lucide-react';

export interface CurrencyRate {
  code: string;
  name: string;
  symbol: string;
  flag: string;
  rateToBdt: number; // How many BDT per 1 Unit of Currency
}

export const CURRENCIES: CurrencyRate[] = [
  { code: 'BDT', name: 'Bangladeshi Taka', symbol: '৳', flag: '🇧🇩', rateToBdt: 1 },
  { code: 'USD', name: 'US Dollar', symbol: '$', flag: '🇺🇸', rateToBdt: 118.5 },
  { code: 'KWD', name: 'Kuwaiti Dinar', symbol: 'د.ك', flag: '🇰🇼', rateToBdt: 386.2 },
  { code: 'SAR', name: 'Saudi Riyal', symbol: '﷼', flag: '🇸🇦', rateToBdt: 31.6 },
  { code: 'AED', name: 'UAE Dirham', symbol: 'د.إ', flag: '🇦🇪', rateToBdt: 32.2 },
  { code: 'GBP', name: 'British Pound', symbol: '£', flag: '🇬🇧', rateToBdt: 152.4 },
  { code: 'EUR', name: 'Euro', symbol: '€', flag: '🇪🇺', rateToBdt: 128.6 },
];

export const NrbInvestorDesk: React.FC = () => {
  const { language, isRtl, translate, formatCurrency } = useTranslation();
  const [activeTab, setActiveTab] = useState<'converter' | 'tax' | 'poa'>('converter');

  // Currency Converter State
  const [bdtAmount, setBdtAmount] = useState<number>(15000000); // 1.5 Crore default
  const [selectedCurrency, setSelectedCurrency] = useState<string>('KWD');

  const curr = CURRENCIES.find((c) => c.code === selectedCurrency) || CURRENCIES[1];
  const convertedValue = bdtAmount / curr.rateToBdt;

  // PoA Checklist state
  const [completedSteps, setCompletedSteps] = useState<number[]>([0, 1]);

  const toggleStep = (index: number) => {
    setCompletedSteps((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const poaSteps = [
    {
      title: { en: 'Draft Power of Attorney Form', bn: 'পাওয়ার অফ অ্যাটর্নি খসড়া তৈরি', ar: 'صياغة نموذج التوكيل الرسمي' },
      desc: {
        en: 'Download standard RAJUK / Land Ministry PoA format for Sukoon property registration.',
        bn: 'সুকুন প্রপার্টি রেজিস্ট্রেশনের জন্য রাজউক ও ভূমি মন্ত্রণালয়ের প্রমিত খসড়া গ্রহণ করুন।',
        ar: 'تحميل نموذج التوكيل المعتمد لوزارة الأراضي لتسجيل عقارات سكون.',
      },
    },
    {
      title: { en: 'Embassy Attestation Abroad', bn: 'দূতাবাস সত্যায়ন (লন্ডন / রিয়াদ / দুবাই / কুয়েত)', ar: 'تصديق السفارة في الخارج' },
      desc: {
        en: 'Sign before the Bangladesh High Commission or Consulate officer in your host country.',
        bn: 'আপনার প্রবাসী দেশের বাংলাদেশ হাই কমিশন বা কনস্যুলেট অফিসারের সামনে স্বাক্ষর করুন।',
        ar: 'التوقيع أمام القنصلية العامة لجمهورية بنغلاديش في بلد إقامتك.',
      },
    },
    {
      title: { en: 'MOFA Dhaka Verification', bn: 'পররাষ্ট্র মন্ত্রণালয় (ঢাকা) ভেরিফিকেশন', ar: 'توثيق وزارة الخارجية (دكا)' },
      desc: {
        en: 'Submit embassy-sealed PoA to Ministry of Foreign Affairs (MOFA) Consular Wing in Dhaka.',
        bn: 'ঢাকার পররাষ্ট্র মন্ত্রণালয়ের কনস্যুলার শাখায় দূতাবাস সিলমোহরযুক্ত খসড়া জমা দিন।',
        ar: 'تقديم التوكيل المصدق إلى قسم التوثيق بوزارة الخارجية في دكا.',
      },
    },
    {
      title: { en: 'DC Office Stamping & Registry', bn: 'জেলা প্রশাসক (ডি সি) কার্যালয় স্ট্যাম্পিং', ar: 'ختم وتدقيق مكتب المحافظ (DC)' },
      desc: {
        en: 'Final stamping by Collectorate Office and submission to Sub-Registrar for land mutation.',
        bn: 'কালেক্টরেট অফিস থেকে চূড়ান্ত স্ট্যাম্পিং এবং সাব-রেজিস্ট্রারে জমা প্রদান।',
        ar: 'الختم النهائي من مكتب الجباية وتقديمه إلى مسجل الأراضي لنقل الملكية.',
      },
    },
  ];

  return (
    <div className="bg-[#FDFCF8] border border-[#5A5A40]/30 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#5A5A40]/20 pb-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 bg-[#8C715E]/10 border border-[#8C715E]/30 text-[#8C715E] text-xs font-semibold px-3 py-1 rounded-full">
            <Landmark className="w-3.5 h-3.5" />
            <span>
              {language === 'bn' ? 'এনআরবি ও বৈদেশিক বিনিয়োগকারী ডেক্স' : language === 'ar' ? 'مكتب المستثمرين المغتربين والقطاع الدولي' : 'NRB & Foreign Investor Desk'}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif text-[#2D2926]">
            {language === 'bn' ? 'প্রবাসী ও আন্তর্জাতিক বিনিয়োগ সহায়ক নির্দেশিকা' : language === 'ar' ? 'دليل الاستثمار والتحويلات المعتمدة للمغتربين' : 'NRB Remittance, PoA & Global Currency Hub'}
          </h2>
          <p className="text-xs sm:text-sm text-[#8C8C7F] font-light">
            {language === 'bn'
              ? 'কুয়েতি দিনার, রিয়াল, দিরহাম ও ডলারের লাইভ রেট, কর মওকুফ তথ্য এবং ডিজিটাল পাওয়ার অফ অ্যাটর্নি নির্দেশিকা।'
              : language === 'ar'
              ? 'أسعار الصرف الحية للدينار الكويتي والريال والدولار، مع الإعفاءات الضريبية وتصديق التوكيل.'
              : 'Live exchange rates for KWD, USD, EUR, GBP, SAR & AED, 0% tax remittance incentives & step-by-step PoA guidance.'}
          </p>
        </div>

        {/* Tab Navigation Buttons */}
        <div className="flex items-center bg-[#F5F5F0] p-1.5 rounded-2xl border border-[#5A5A40]/30 shrink-0">
          <button
            onClick={() => setActiveTab('converter')}
            className={`px-3 py-2 text-xs font-semibold rounded-xl transition-all flex items-center gap-1.5 ${
              activeTab === 'converter' ? 'bg-[#2D2926] text-white shadow-md' : 'text-[#5A5A40] hover:text-[#2D2926]'
            }`}
          >
            <ArrowRightLeft className="w-3.5 h-3.5 text-[#8C715E]" />
            <span>{language === 'bn' ? 'কারেন্সি কনভার্টার' : language === 'ar' ? 'محول العملات' : 'Live Currency'}</span>
          </button>
          <button
            onClick={() => setActiveTab('tax')}
            className={`px-3 py-2 text-xs font-semibold rounded-xl transition-all flex items-center gap-1.5 ${
              activeTab === 'tax' ? 'bg-[#2D2926] text-white shadow-md' : 'text-[#5A5A40] hover:text-[#2D2926]'
            }`}
          >
            <Percent className="w-3.5 h-3.5 text-[#8C715E]" />
            <span>{language === 'bn' ? 'কর মওকুফ সুবিধা' : language === 'ar' ? 'الحوافز الضريبية' : 'Tax Exemptions'}</span>
          </button>
          <button
            onClick={() => setActiveTab('poa')}
            className={`px-3 py-2 text-xs font-semibold rounded-xl transition-all flex items-center gap-1.5 ${
              activeTab === 'poa' ? 'bg-[#2D2926] text-white shadow-md' : 'text-[#5A5A40] hover:text-[#2D2926]'
            }`}
          >
            <FileCheck2 className="w-3.5 h-3.5 text-[#8C715E]" />
            <span>{language === 'bn' ? 'পাওয়ার অফ অ্যাটর্নি' : language === 'ar' ? 'التوكيل الرسمي' : 'PoA Checklist'}</span>
          </button>
        </div>
      </div>

      {/* TAB 1: CURRENCY CONVERTER & LIVE RATES */}
      {activeTab === 'converter' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 bg-[#F5F5F0] border border-[#5A5A40]/30 rounded-2xl p-6 space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-lg text-[#2D2926] flex items-center gap-2">
                <Calculator className="w-4 h-4 text-[#8C715E]" />
                <span>{language === 'bn' ? 'প্রপার্টি মূল্য কনভার্টার' : language === 'ar' ? 'حاسبة تحويل أسعار العقار' : 'Property Price Converter'}</span>
              </h3>
              <span className="text-[10px] font-mono bg-[#8C715E]/10 text-[#8C715E] font-bold px-2 py-0.5 rounded-md">
                Live Central Bank Exchange Rates
              </span>
            </div>

            {/* Input Slider & Text */}
            <div className="space-y-3">
              <div className="flex justify-between items-center text-xs">
                <label className="text-[#8C8C7F] font-medium">
                  {language === 'bn' ? 'প্রপার্টির আনুমানিক মূল্য (বিডিটি):' : language === 'ar' ? 'سعر العقار التقديري بالتاكا:' : 'Estimated Property Price (BDT):'}
                </label>
                <span className="font-serif font-bold text-base text-[#2D2926]">
                  {formatCurrency(bdtAmount)}
                </span>
              </div>
              <input
                type="range"
                min={2000000}
                max={100000000}
                step={500000}
                value={bdtAmount}
                onChange={(e) => setBdtAmount(Number(e.target.value))}
                className="w-full accent-[#8C715E] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[#8C8C7F] font-mono">
                <span>৳ 20 Lakh</span>
                <span>৳ 5 Crore</span>
                <span>৳ 10 Crore</span>
              </div>
            </div>

            {/* Target Currency Selector */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-[#2D2926] block">
                {language === 'bn' ? 'পছন্দের বৈদেশিক মুদ্রা নির্বাচন করুন:' : language === 'ar' ? 'اختر العملة الأجنبية المستهدفة:' : 'Select Target Currency:'}
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {CURRENCIES.filter((c) => c.code !== 'BDT').map((c) => (
                  <button
                    key={c.code}
                    onClick={() => setSelectedCurrency(c.code)}
                    className={`p-2.5 rounded-xl text-xs flex items-center justify-between border transition-all ${
                      selectedCurrency === c.code
                        ? 'bg-[#2D2926] text-white border-[#2D2926] shadow-md font-bold'
                        : 'bg-white text-[#2D2926] border-[#5A5A40]/30 hover:bg-[#8C715E]/10'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span>{c.flag}</span>
                      <span>{c.code}</span>
                    </div>
                    <span className="text-[10px] font-mono opacity-80">1 {c.symbol} = {c.rateToBdt} ৳</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Conversion Result Box */}
            <div className="bg-[#2D2926] text-white p-5 rounded-2xl border border-[#5A5A40]/40 flex items-center justify-between shadow-lg">
              <div>
                <span className="text-[11px] text-[#8C8C7F] uppercase tracking-wider block font-medium">
                  {language === 'bn' ? 'সমপরিমাণ আন্তর্জাতিক মূল্য:' : language === 'ar' ? 'المبلغ المستحق بالعملة المحولة:' : 'Converted Foreign Value:'}
                </span>
                <div className="font-serif text-2xl sm:text-3xl text-[#FDFCF8] font-bold">
                  {curr.symbol} {convertedValue.toLocaleString('en-US', { maximumFractionDigits: 2 })} {curr.code}
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs font-mono text-[#8C715E] block font-semibold">1 {curr.code} = ৳{curr.rateToBdt}</span>
                <span className="text-[10px] text-[#8C8C7F]">Zero Remittance Fee Channel</span>
              </div>
            </div>
          </div>

          {/* Currency Table & Highlights */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-[#F5F5F0] border border-[#5A5A40]/30 rounded-2xl p-5 space-y-3">
              <h4 className="font-serif text-sm font-bold text-[#2D2926] flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-[#8C715E]" />
                <span>{language === 'bn' ? 'লাইভ ব্যাংক এক্সচেঞ্জ রেট (মার্চ ২০২৬)' : language === 'ar' ? 'أسعار الصرف الرسمية المعتمدة' : 'Official NRB Bank Rates'}</span>
              </h4>
              <div className="divide-y divide-[#5A5A40]/10 text-xs">
                {CURRENCIES.map((c) => (
                  <div key={c.code} className="py-2 flex items-center justify-between">
                    <div className="flex items-center gap-2 font-medium text-[#2D2926]">
                      <span>{c.flag}</span>
                      <span>{c.name} ({c.code})</span>
                    </div>
                    <span className="font-mono font-bold text-[#8C715E]">
                      {c.symbol} 1 = ৳ {c.rateToBdt.toFixed(1)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#8C715E]/10 border border-[#8C715E]/30 p-4 rounded-2xl text-xs text-[#2D2926] space-y-2">
              <span className="font-bold flex items-center gap-1 text-[#8C715E]">
                <ShieldCheck className="w-4 h-4" />
                <span>{language === 'bn' ? 'বৈধ ব্যাংকিং চ্যানেলে ২.৫% প্রণোদনা' : language === 'ar' ? 'حافز التحويل البنكي القانوني 2.5%' : '2.5% Government Remittance Cash Bonus'}</span>
              </span>
              <p className="text-[11px] text-[#5A5A40] leading-relaxed">
                {language === 'bn'
                  ? 'বৈধ ব্যাংকিং বা এক্সচেঞ্জ হাউজের মাধ্যমে জমি ও অ্যাপার্টমেন্টের মূল্য পরিশোধে বাংলাদেশ সরকার কর্তৃক ২.৫% নগদ ক্যাশব্যাক সুবিধা।'
                  : language === 'ar'
                  ? 'تحصل على حافز نقدي بنسبة 2.5% من الحكومة عند إرسال أموال العقارات عبر البنوك المعتمدة.'
                  : 'NRBs sending property investment funds via official banking channels receive an extra 2.5% government cash incentive credited directly to their bank account.'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: TAX EXEMPTIONS & NRB INCENTIVES */}
      {activeTab === 'tax' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
          <div className="bg-[#F5F5F0] border border-[#5A5A40]/30 p-5 rounded-2xl space-y-3">
            <div className="w-8 h-8 rounded-xl bg-[#8C715E] text-white flex items-center justify-center font-bold">
              0%
            </div>
            <h4 className="font-serif text-base text-[#2D2926] font-semibold">
              {language === 'bn' ? 'রেমিট্যান্স ইনকাম ট্যাক্স মওকুফ' : language === 'ar' ? 'إعفاء تام من ضريبة الدخل' : '0% Income Tax on Remittance'}
            </h4>
            <p className="text-[#8C8C7F] leading-relaxed">
              {language === 'bn'
                ? 'বৈধভাবে প্রেরিত বৈদেশিক আয় দিয়ে বাংলাদেশের যেকোনো ভূমি বা ফ্ল্যাট ক্রয়ে জাতীয় রাজস্ব বোর্ড (NBR) কর্তৃক ১০০% ইনকাম ট্যাক্স ফ্রি সুবিধা।'
                : language === 'ar'
                ? 'جميع الأموال المحولة من الخارج لشراء العقارات معفاة تمامًا من ضريبة الدخل لدى هيئة الضرائب.'
                : 'Funds remitted through banking channels to purchase real estate are 100% tax-free under National Board of Revenue (NBR) rules.'}
            </p>
          </div>

          <div className="bg-[#F5F5F0] border border-[#5A5A40]/30 p-5 rounded-2xl space-y-3">
            <div className="w-8 h-8 rounded-xl bg-[#5A5A40] text-white flex items-center justify-center font-bold">
              <CheckCircle className="w-5 h-5" />
            </div>
            <h4 className="font-serif text-base text-[#2D2926] font-semibold">
              {language === 'bn' ? 'দ্বৈত নাগরিকত্ব ও সরাসরি নামজারি' : language === 'ar' ? 'الجنسية المزدوجة ونقل الملكية' : 'Dual Citizenship Title Protection'}
            </h4>
            <p className="text-[#8C8C7F] leading-relaxed">
              {language === 'bn'
                ? 'যুক্তরাজ্য, আমেরিকা, কানাডা বা মধ্যপ্রাচ্যে বসবাসকারী দ্বৈত নাগরিকরা সরাসরি নিজেদের অথবা মনোনীত ব্যক্তির নামে জমির দলিল রেজিস্ট্রি করতে পারেন।'
                : language === 'ar'
                ? 'يحق للحاملين للجنسية المزدوجة تسجيل ملكية الأراضي مباشرة باسمهم دون أدنى عوائق قانونية.'
                : 'Dual citizens & NRBs can register land titles in their direct personal name or via nominated family members with 100% legal ownership guarantee.'}
            </p>
          </div>

          <div className="bg-[#F5F5F0] border border-[#5A5A40]/30 p-5 rounded-2xl space-y-3">
            <div className="w-8 h-8 rounded-xl bg-[#2D2926] text-white flex items-center justify-center font-bold">
              <Building2 className="w-5 h-5" />
            </div>
            <h4 className="font-serif text-base text-[#2D2926] font-semibold">
              {language === 'bn' ? 'অফশোর রিপ্যাট্রিয়শন ক্যাপিটাল সুবিধা' : language === 'ar' ? 'حق إعادة تحويل الأرباح للخارج' : 'Capital & Profit Repatriation'}
            </h4>
            <p className="text-[#8C8C7F] leading-relaxed">
              {language === 'bn'
                ? 'প্রপার্টি পুনঃবিক্রি বা ভাড়া বাবদ অর্জিত আয় বাংলাদেশ ব্যাংকের অনুমোদিত অনাবাসী বৈদেশী মুদ্রা (NFCD) অ্যাকাউন্টে নিরাপদে স্থানান্তর সম্ভব।'
                : language === 'ar'
                ? 'إمكانية إعادة تحويل عائدات البيع أو الإيجار إلى حسابك المصرفي بالخارج عبر البنك المركزي.'
                : 'Capital gains and rental yields can be freely repatriated back to host countries via Non-Resident Foreign Currency Deposit (NFCD) accounts.'}
            </p>
          </div>
        </div>
      )}

      {/* TAB 3: POWER OF ATTORNEY CHECKLIST */}
      {activeTab === 'poa' && (
        <div className="space-y-4">
          <div className="bg-[#F5F5F0] border border-[#5A5A40]/30 p-5 rounded-2xl space-y-2">
            <h4 className="font-serif text-base text-[#2D2926] font-bold">
              {language === 'bn' ? 'ডিজিটাল পাওয়ার অফ অ্যাটর্নি (PoA) ভেরিফিকেশন প্রসেস' : language === 'ar' ? 'خطوات اعتماد التوكيل الرسمي للمغتربين' : '4-Step Digital Power of Attorney (PoA) Legal Verification'}
            </h4>
            <p className="text-xs text-[#8C8C7F]">
              {language === 'bn'
                ? 'দেশে উপস্থিত না থেকে প্রবাসী হিসেবে সুকুন প্রপার্টিজ বুকিং ও দলিলের জন্য এই ৪টি ধাপ অনুসরণ করুন:'
                : language === 'ar'
                ? 'قم بإنهاء إجراءات ملكية عقارك دون الحاجة للسفر إلى بنغلاديش عبر هذه الخطوات الأربع:'
                : 'Follow these essential verified legal steps to assign a trusted attorney or relative in Bangladesh:'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {poaSteps.map((step, idx) => {
              const isChecked = completedSteps.includes(idx);
              return (
                <div
                  key={idx}
                  onClick={() => toggleStep(idx)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 ${
                    isChecked
                      ? 'bg-[#8C715E]/10 border-[#8C715E] text-[#2D2926]'
                      : 'bg-white border-[#5A5A40]/30 text-[#8C8C7F] hover:bg-[#F5F5F0]'
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${
                      isChecked ? 'bg-[#8C715E] text-white' : 'bg-[#5A5A40]/20 text-[#5A5A40]'
                    }`}
                  >
                    {isChecked ? '✓' : idx + 1}
                  </div>
                  <div className="space-y-1 text-xs">
                    <h5 className="font-semibold text-sm text-[#2D2926]">{translate(step.title)}</h5>
                    <p className="text-[#8C8C7F] font-light leading-relaxed">{translate(step.desc)}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default NrbInvestorDesk;
