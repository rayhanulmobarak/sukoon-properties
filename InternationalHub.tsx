import React, { useState } from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import NrbInvestorDesk from './NrbInvestorDesk';
import InteractiveMasterplanSelector, { MasterplotItem } from './InteractiveMasterplanSelector';
import InvestmentRoiEngine from './InvestmentRoiEngine';
import EsgSustainabilityIndex from './EsgSustainabilityIndex';
import VipDirectorConcierge from './VipDirectorConcierge';
import { Globe, ArrowRightLeft, Layers, TrendingUp, Leaf, Video, Award } from 'lucide-react';

export interface InternationalHubProps {
  initialTab?: 'nrb' | 'masterplan' | 'roi' | 'esg' | 'vip';
  onBookPlot?: (plot: MasterplotItem) => void;
}

export const InternationalHub: React.FC<InternationalHubProps> = ({ initialTab = 'nrb', onBookPlot }) => {
  const { language } = useTranslation();
  const [activeTab, setActiveTab] = useState<'nrb' | 'masterplan' | 'roi' | 'esg' | 'vip'>(initialTab);

  const tabs = [
    {
      id: 'nrb',
      label: language === 'bn' ? 'এনআরবি ও মুদ্রা' : language === 'ar' ? 'مكتب المغتربين والعملات' : 'NRB & Live Currency',
      icon: ArrowRightLeft,
    },
    {
      id: 'masterplan',
      label: language === 'bn' ? 'মাস্টারপ্ল্যান সিলেকশন' : language === 'ar' ? 'المخطط التفاعلي' : 'Interactive Masterplan',
      icon: Layers,
    },
    {
      id: 'roi',
      label: language === 'bn' ? 'বিনিয়োগ রিটার্ন (ROI)' : language === 'ar' ? 'حاسبة العوائد ROI' : 'Investment ROI',
      icon: TrendingUp,
    },
    {
      id: 'esg',
      label: language === 'bn' ? 'ইএসজি ও গ্রিন সিটি' : language === 'ar' ? 'الاستدامة والبيئة' : 'ESG & Smart City',
      icon: Leaf,
    },
    {
      id: 'vip',
      label: language === 'bn' ? 'ভিআইপি ডিরেক্টর কল' : language === 'ar' ? 'مكالمة المدير VIP' : 'VIP Concierge',
      icon: Video,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Outer Hub Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#2D2926] text-white p-6 rounded-3xl border border-[#5A5A40]/40 shadow-2xl">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 bg-[#8C715E] text-white text-xs font-semibold px-3.5 py-1 rounded-full shadow-xs">
            <Globe className="w-3.5 h-3.5" />
            <span>
              {language === 'bn'
                ? 'আন্তর্জাতিক বিনিয়োগকারী কেন্দ্র'
                : language === 'ar'
                ? 'مركز الاستثمار العقاري الدولي'
                : 'Sukoon International Investor Hub'}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif text-[#FDFCF8]">
            {language === 'bn'
              ? 'গ্লোবাল রিয়েল এস্টেট মানদণ্ড ও ডিজিটাল ইনভেস্টমেন্ট টুলস'
              : language === 'ar'
              ? 'أدوات الاستثمار العقاري العالمي المتقدمة'
              : 'Global Standard Investment & Advisory Suite'}
          </h2>
          <p className="text-xs text-[#E5E5DF]/80 font-light">
            {language === 'bn'
              ? 'কুয়েতি দিনার, রিয়াল ও ডলারের লাইভ রূপান্তর, ৩ডি প্লট ম্যাপিং, রিটার্ন সিমুলেটর এবং ডিরেক্টর ভিডিও বুকিং।'
              : language === 'ar'
              ? 'تصفح أسعار الصرف، حاسبة الأرباح، المخطط التفاعلي واستشارات الفيديو المباشرة.'
              : 'Enterprise suite inspired by Emaar & Sotheby’s: Multi-currency converter (KWD, USD, SAR, AED, EUR, GBP), Masterplan plot picker, ROI analytics & VIP Concierge.'}
          </p>
        </div>

        {/* Global Badges */}
        <div className="flex items-center gap-2 text-xs font-mono text-[#8C8C7F] bg-[#3D3834] px-4 py-2 rounded-2xl border border-[#5A5A40]/30 shrink-0">
          <Award className="w-4 h-4 text-[#8C715E]" />
          <span>FIABCI Paris & ISO 9001 Compliant</span>
        </div>
      </div>

      {/* Navigation Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {tabs.map((t) => {
          const IconComp = t.icon;
          const isActive = activeTab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id as any)}
              className={`px-4 py-2.5 rounded-2xl text-xs font-semibold transition-all duration-200 flex items-center gap-2 shrink-0 border ${
                isActive
                  ? 'bg-[#8C715E] text-white border-[#8C715E] shadow-md'
                  : 'bg-[#F5F5F0] text-[#2D2926] border-[#5A5A40]/30 hover:bg-[#8C715E]/10'
              }`}
            >
              <IconComp className="w-4 h-4" />
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>

      {/* Active Tab View */}
      <div className="transition-all duration-300">
        {activeTab === 'nrb' && <NrbInvestorDesk />}
        {activeTab === 'masterplan' && <InteractiveMasterplanSelector onBookPlot={onBookPlot} />}
        {activeTab === 'roi' && <InvestmentRoiEngine />}
        {activeTab === 'esg' && <EsgSustainabilityIndex />}
        {activeTab === 'vip' && <VipDirectorConcierge />}
      </div>
    </div>
  );
};

export default InternationalHub;
