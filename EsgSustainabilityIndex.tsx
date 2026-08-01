import React from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import { Leaf, Sun, Droplets, TreePine, Zap, Award, CheckCircle2, FileText, Download, ShieldCheck } from 'lucide-react';

export const EsgSustainabilityIndex: React.FC = () => {
  const { language, translate } = useTranslation();

  const metrics = [
    {
      title: { en: 'LEED Platinum Green Score', bn: 'লিড প্ল্যাটিনাম গ্রিন স্কোর', ar: 'درجة المباني الخضراء LEED' },
      value: '88/100',
      subtitle: { en: 'US Green Building Council Standard', bn: 'ইউএস গ্রিন বিল্ডিং কাউন্সিল মানদণ্ড', ar: 'معيار المجلس الأمريكي للمباني الخضراء' },
      icon: Leaf,
      color: 'bg-emerald-600',
    },
    {
      title: { en: 'Solar Micro-grid Capacity', bn: 'সোলার মাইক্রো-গ্রিড ক্ষমতা', ar: 'قدرة الشبكة الشمسية المصغرة' },
      value: '1.5 MW',
      subtitle: { en: 'Powers 100% Street Lighting & Parks', bn: '১০০% রোড লাইট ও পার্কে সৌর বিদ্যুৎ', ar: 'تغطي 100% من إضاءة الشوارع والحدائق' },
      icon: Sun,
      color: 'bg-amber-500',
    },
    {
      title: { en: 'Water Recycling Efficiency', bn: 'পানি পুনর্ব্যবহার ক্ষমতা', ar: 'كفاءة إعادة تدوير المياه' },
      value: '92%',
      subtitle: { en: 'Underground Zero Waste Water Treatment', bn: 'ভূগর্ভস্থ শূন্য বর্জ্য পানি শোধন ব্যবস্থা', ar: 'معالجة مياه التواليت والحدائق بالكامل' },
      icon: Droplets,
      color: 'bg-cyan-600',
    },
    {
      title: { en: 'Greenery to Concrete Ratio', bn: 'সবুজ উদ্যান ও লেক অনুপাত', ar: 'نسبة المساحات الخضراء والبحيرات' },
      value: '40 : 60',
      subtitle: { en: '40% Dedicated Open Parks & Lakes', bn: '৪০% উন্মুক্ত পার্ক, খেলার মাঠ ও লেক', ar: '40% مخصصة للحدائق المفتوحة والبحيرات' },
      icon: TreePine,
      color: 'bg-emerald-800',
    },
  ];

  return (
    <div className="bg-[#FDFCF8] border border-[#5A5A40]/30 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#5A5A40]/20 pb-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 bg-[#5A5A40]/10 border border-[#5A5A40]/30 text-[#5A5A40] text-xs font-semibold px-3 py-1 rounded-full">
            <Leaf className="w-3.5 h-3.5 text-emerald-600" />
            <span>
              {language === 'bn'
                ? 'ইএসজি ও পরিবেশবান্ধব স্মার্ট সিটি ইনডেক্স'
                : language === 'ar'
                ? 'مؤشر الاستدامة والبيئة الخضراء ESG'
                : 'ESG & Smart City Sustainability Index'}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif text-[#2D2926]">
            {language === 'bn'
              ? 'পরিবেশবান্ধব নগর পরিকল্পনা ও সবুজ অবকাঠামো'
              : language === 'ar'
              ? 'التخطيط العمراني المستدام والتكنولوجيا الخضراء'
              : 'Eco-Smart Architecture & Sustainability Standards'}
          </h2>
          <p className="text-xs sm:text-sm text-[#8C8C7F] font-light">
            {language === 'bn'
              ? 'পূর্বাচল ইকো টাউনশিপের সোলার মাইক্রোগ্রিড, ভূগর্ভস্থ ক্যাবলিং এবং ৪০% উদ্যান প্রকল্পসমূহ।'
              : language === 'ar'
              ? 'تلتزم مشاريعنا بالطاقة الشمسية المتجددة وتخفيض البصمة الكربونية بنسبة 45%.'
              : 'Sukoon townships incorporate solar micro-grids, underground utilities, and 40% open green space to ensure carbon reduction.'}
          </p>
        </div>

        <div className="flex items-center gap-2 bg-[#F5F5F0] border border-[#5A5A40]/30 px-3.5 py-2 rounded-2xl text-xs font-semibold text-[#2D2926]">
          <Award className="w-4 h-4 text-emerald-600" />
          <span>LEED Eco-Township Certified</span>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {metrics.map((m, idx) => {
          const IconComp = m.icon;
          return (
            <div
              key={idx}
              className="bg-[#F5F5F0] border border-[#5A5A40]/30 p-5 rounded-2xl space-y-3 shadow-xs hover:border-[#8C715E] transition"
            >
              <div className="flex items-center justify-between">
                <div className={`w-9 h-9 rounded-xl ${m.color} text-white flex items-center justify-center shadow-xs`}>
                  <IconComp className="w-5 h-5" />
                </div>
                <span className="font-serif text-2xl font-bold text-[#2D2926]">{m.value}</span>
              </div>

              <div>
                <h3 className="font-serif text-base font-semibold text-[#2D2926]">{translate(m.title)}</h3>
                <p className="text-[11px] text-[#8C8C7F] mt-0.5">{translate(m.subtitle)}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Sustainability Features List */}
      <div className="bg-[#2D2926] text-white p-6 rounded-2xl border border-[#5A5A40]/40 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl">
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 text-xs text-emerald-400 font-bold uppercase tracking-wider">
            <Zap className="w-4 h-4" />
            <span>Green Urban Smart Features</span>
          </div>
          <h3 className="font-serif text-xl text-[#FDFCF8]">
            {language === 'bn' ? 'ভূগর্ভস্থ ড্রেনেজ ও ডাস্ট-ফ্রি সবুজ সরণি' : language === 'ar' ? 'شبكات مرافق تحت الأرض بنسبة 100%' : '100% Underground Utilities & Dust-Free Avenues'}
          </h3>
          <p className="text-xs text-[#E5E5DF]/90 leading-relaxed font-light">
            {language === 'bn'
              ? 'বিদ্যুৎ, ওয়াসা ও ফাইবার অপটিক্সের সম্পূর্ণ ভূগর্ভস্থ নেটওয়ার্ক, ওভারহেড তারবিহীন দৃষ্টিনন্দন প্রাকৃতিক পরিবেশ।'
              : language === 'ar'
              ? 'شبكات كهربائية ومياه وألياف ضوئية مدفونة تحت الأرض بالكامل للحفاظ على الجمال المعماري.'
              : 'All electric cables, water pipelines, and fiber optic internet run entirely underground, eliminating ugly overhead wiring and preserving scenic natural skylines.'}
          </p>
        </div>

        <div className="shrink-0 space-y-2">
          <button
            onClick={() => alert('Eco-Township Sustainability Audit Report (PDF) requested. Sending copy to email.')}
            className="px-5 py-2.5 bg-[#8C715E] hover:bg-[#5A5A40] text-white rounded-full text-xs font-bold transition flex items-center gap-2 shadow-md w-full justify-center"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Eco Audit PDF</span>
          </button>
          <span className="block text-[10px] text-center text-[#8C8C7F]">Third-Party Verified Audit 2026</span>
        </div>
      </div>
    </div>
  );
};

export default EsgSustainabilityIndex;
