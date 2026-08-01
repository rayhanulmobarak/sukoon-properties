import React, { useState } from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import { Award, ShieldCheck, CheckCircle2, Globe, FileCheck, ExternalLink, Sparkles, Building2, Check, Download } from 'lucide-react';

export interface CertificationItem {
  id: string;
  title: { en: string; bn: string; ar: string };
  category: { en: string; bn: string; ar: string };
  issuer: { en: string; bn: string; ar: string };
  certNo: string;
  year: string;
  description: { en: string; bn: string; ar: string };
  icon: string;
  verified: boolean;
  badgeText: { en: string; bn: string; ar: string };
}

export const CERTIFICATIONS: CertificationItem[] = [
  {
    id: 'iso-9001',
    title: {
      en: 'ISO 9001:2015 Quality Management',
      bn: 'আইএসও ৯০০০১:২০১৫ কোয়ালিটি ম্যানেজমেন্ট',
      ar: 'ISO 9001:2015 إدارة الجودة المعتمدة',
    },
    category: {
      en: 'Quality Standard',
      bn: 'মান নিয়ন্ত্রণ মানদণ্ড',
      ar: 'معيار الجودة العالمية',
    },
    issuer: {
      en: 'International Organization for Standardization (ISO)',
      bn: 'আন্তর্জাতিক মানসংস্থা (ISO)',
      ar: 'المنظمة الدولية للمعايير (ISO)',
    },
    certNo: 'ISO-BD-9001-2024-8890',
    year: '2024 - 2027',
    description: {
      en: 'Certified for structural engineering precision, zero-defect construction standards, and customer-first property delivery protocols.',
      bn: 'কাঠামোগত প্রকৌশল সূক্ষ্মতা, শূন্য-ত্রুটি নির্মাণ মান এবং সময়মতো গ্রাহক প্রপার্টি হস্তান্তরের জন্য শংসাপত্রপ্রাপ্ত।',
      ar: 'معتمد للدقة الهندشية الإنشائية ومعايير البناء خالية من العيوب وتسليم العقارات في الوقت المحدد.',
    },
    icon: 'ShieldCheck',
    verified: true,
    badgeText: { en: 'Global ISO Standard', bn: 'গ্লোবাল আইএসও মান', ar: 'معيار ISO العالمي' },
  },
  {
    id: 'iso-14001',
    title: {
      en: 'ISO 14001:2015 Environmental System',
      bn: 'আইএসও ১৪০০০১:২০১৫ এনভায়রনমেন্টাল সিস্টেম',
      ar: 'ISO 14001:2015 إدارة البيئة المستدامة',
    },
    category: {
      en: 'Eco Sustainability',
      bn: 'পরিবেশবান্ধব স্থায়ীত্ব',
      ar: 'الاستدامة البيئية',
    },
    issuer: {
      en: 'UKAS Quality Management & ISO',
      bn: 'ইউকেএএস কোয়ালিটি ম্যানেজমেন্ট ও আইএসও',
      ar: 'إدارة الجودة UKAS و ISO',
    },
    certNo: 'ISO-ENV-14001-9921',
    year: '2023 - 2026',
    description: {
      en: 'Guarantees green urban planning, underground drainage, solar-assisted street lights, and zero water waste across Purbachal Eco-Townships.',
      bn: 'পূর্বাচল ইকো-টাউনশিপে পরিবেশবান্ধব নগর পরিকল্পনা, ভূগর্ভস্থ নিষ্কাশন ও সৌর বিদ্যুৎ নিশ্চিত করে।',
      ar: 'يضمن التخطيط العمراني الأخضر والصرف الصحي تحت الأرض والإضاءة الشمسية في جميع مشاريعنا.',
    },
    icon: 'Sparkles',
    verified: true,
    badgeText: { en: 'Eco Township Certified', bn: 'ইকো টাউনশিপ সনদপ্রাপ্ত', ar: 'معتمد كمدينة بيئية' },
  },
  {
    id: 'fiabci',
    title: {
      en: 'FIABCI International Federation Member',
      bn: 'এফআইএবিসিআই আন্তর্জাতিক রিয়েল এস্টেট সদস্য',
      ar: 'عضوية الاتحاد الدولي للعقارات FIABCI',
    },
    category: {
      en: 'Global Federation',
      bn: 'আন্তর্জাতিক ফেডারেশন',
      ar: 'الاتحاد العقاري العالمي',
    },
    issuer: {
      en: 'FIABCI Global Real Estate Federation (Paris, France)',
      bn: 'এফআইএবিসিআই গ্লোবাল রিয়েল এস্টেট (প্যারিস, ফ্রান্স)',
      ar: 'الاتحاد العقاري العالمي (باريس، فرنسا)',
    },
    certNo: 'FIABCI-INT-MEMBER-4402',
    year: 'Official Corporate Member',
    description: {
      en: 'Direct affiliation with the world’s leading real estate network representing 1.5M professionals across 70 countries.',
      bn: 'বিশ্বের ৭০টি দেশের ১৫ লাখ রিয়েল এস্টেট পেশাদারদের প্রতিনিধিত্বকারী সংস্থার অফিসিয়াল কর্পোরেট সদস্য।',
      ar: 'عضوية مباشرة مع أكبر شبكة عقارية عالمية تضم 1.5 مليون محترف في 70 دولة.',
    },
    icon: 'Globe',
    verified: true,
    badgeText: { en: 'Paris HQ Affiliated', bn: 'প্যারিস প্রধান কার্যালয় ভেরিফায়েড', ar: 'معتمد من باريس' },
  },
  {
    id: 'asia-awards',
    title: {
      en: 'Asia Pacific Property Awards 2025–2026 Winner',
      bn: 'এশিয়া প্যাসিফিক প্রপার্টি অ্যাওয়ার্ডস বিজয়ী',
      ar: 'جائزة العقارات لآسيا والمحيط الهادئ 2025',
    },
    category: {
      en: 'Excellence Award',
      bn: 'আন্তর্জাতিক শ্রেষ্ঠত্ব পুরস্কার',
      ar: 'جائزة التميز المعماري',
    },
    issuer: {
      en: 'International Property Awards (London, UK)',
      bn: 'ইন্টারন্যাশনাল প্রপার্টি অ্যাওয়ার্ডস (লন্ডন, ইউকে)',
      ar: 'جوائز العقارات الدولية (لندن، المملكة المتحدة)',
    },
    certNo: 'APPA-BD-RESIDENTIAL-2025',
    year: '2025 Winner',
    description: {
      en: 'Awarded Best Mixed-Use Residential Development & Architectural Innovation for Purbachal Sukoon Eco Smart City.',
      bn: 'পূর্বাচল সুকুন ইকো স্মার্ট সিটির জন্য সেরা স্থাপত্য নকশা ও আবাসিক প্রকল্প হিসেবে ভূষিত।',
      ar: 'فازت بأفضل تطوير سكني متكامل والتصميم المعماري الذكي لمشروع بورباتشال سكون.',
    },
    icon: 'Award',
    verified: true,
    badgeText: { en: 'London Award Winner', bn: 'লন্ডন বিজয়ী স্মারক', ar: 'فائز بجائزة لندن' },
  },
  {
    id: 'rajuk-rehab',
    title: {
      en: '100% RAJUK & REHAB Certified Compliance',
      bn: '১০০% রাজউক ও রিহ্যাব অনুমোদিত নিভেজাল ক্লিয়ারেন্স',
      ar: 'اعتماد كامل من هیئة RAJUK و REHAB',
    },
    category: {
      en: 'Government & National Body',
      bn: 'সরকারি ও জাতীয় অনুমোদন',
      ar: 'التراخيص الحكومية الوطنية',
    },
    issuer: {
      en: 'Rajdhani Unnayan Kartripakkha (RAJUK) & REHAB Bangladesh',
      bn: 'রাজধানী উন্নয়ন কর্তৃপক্ষ (রাজউক) ও রিহ্যাব বাংলাদেশ',
      ar: 'هيئة تطوير العاصمة (RAJUK) وجمعية العقارات (REHAB)',
    },
    certNo: 'RAJUK-NOC-2024-11029',
    year: 'Valid Permitted Land',
    description: {
      en: 'Full mutation land deeds, zero dispute clearance, legal title assurance, and RAJUK urban plan clearance.',
      bn: 'সম্পূর্ণ নামজারি খতিয়ান, নির্ভেজাল মালিকানা নিশ্চয়তা ও রাজউক অনুমোদিত মাস্টারপ্ল্যান।',
      ar: 'ملكية واضحة 100%، عقود أراضي موثقة ومخططات معتمدة من هيئة التخطيط العمراني.',
    },
    icon: 'FileCheck',
    verified: true,
    badgeText: { en: '100% Legal Title', bn: '১০০% নির্ভেজাল মালিকানা', ar: 'ملكية قانونية 100%' },
  },
];

export const InternationalComplianceSection: React.FC = () => {
  const { language, isRtl, translate } = useTranslation();
  const [selectedCert, setSelectedCert] = useState<CertificationItem | null>(null);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8 py-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#5A5A40]/20 pb-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-[#5A5A40]/10 border border-[#5A5A40]/30 text-[#5A5A40] text-xs font-semibold px-3.5 py-1.5 rounded-full">
            <Globe className="w-3.5 h-3.5 text-[#8C715E]" />
            <span>
              {language === 'bn'
                ? 'আন্তর্জাতিক মানদণ্ড ও আন্তর্জাতিক ট্রাস্ট'
                : language === 'ar'
                ? 'المعايير الدولية والاعتمادات العالمية'
                : 'International Standards & Global Compliance'}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif text-[#2D2926]">
            {language === 'bn'
              ? 'আইএসও সনদ, গ্লোবাল অ্যাওয়ার্ড ও গ্লোবাল মেম্বারশিপ'
              : language === 'ar'
              ? 'شهادات ISO، الجوائز العالمية والعضويات الدولية'
              : 'ISO Certifications, Global Awards & FIABCI Membership'}
          </h2>
          <p className="text-xs sm:text-sm text-[#8C8C7F] font-light">
            {language === 'bn'
              ? 'সুকুন প্রপার্টিজ লিমিটেড আন্তর্জাতিক স্থাপত্য মান, প্যারিসভিত্তিক এফআইএবিসিআই সদস্যপদ এবং ১০০% রাজউক অনুমোদিত আইনি স্বচ্ছতা অনুসরণ করে।'
              : language === 'ar'
              ? 'تلتزم شركة سكون العقارية بالمعايير العالمية للجودة والاستدامة وعضوية الاتحاد الدولي للعقارات بباريس.'
              : 'Sukoon Properties Ltd. strictly complies with ISO 9001 quality management, FIABCI Paris membership, USGBC green urban planning, and 100% clear RAJUK land deeds.'}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-[#F5F5F0] border border-[#5A5A40]/30 rounded-2xl p-3 flex items-center gap-3 shadow-xs">
            <div className="p-2 bg-[#8C715E] text-white rounded-xl">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="block text-[10px] font-bold text-[#8C8C7F] uppercase tracking-wider">
                {language === 'bn' ? 'গ্লোবাল ট্রাস্ট স্কোর' : language === 'ar' ? 'درجة الثقة العالمية' : 'Global Trust Score'}
              </span>
              <span className="font-serif text-lg text-[#2D2926]">100% Verified</span>
            </div>
          </div>
        </div>
      </div>

      {/* Grid of Certifications & Badges */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {CERTIFICATIONS.map((cert) => (
          <div
            key={cert.id}
            onClick={() => setSelectedCert(cert)}
            className="group bg-[#F5F5F0] hover:bg-[#FDFCF8] border border-[#5A5A40]/30 hover:border-[#8C715E] p-6 rounded-3xl transition-all duration-300 shadow-xs hover:shadow-xl cursor-pointer flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold text-[#8C715E] bg-[#8C715E]/10 px-2.5 py-1 rounded-full">
                  {translate(cert.badgeText)}
                </span>
                <span className="text-xs font-mono font-bold text-[#8C8C7F] bg-[#2D2926]/5 px-2 py-0.5 rounded">
                  {cert.year}
                </span>
              </div>

              <div className="flex items-start gap-3 pt-1">
                <div className="p-3 bg-[#5A5A40] text-white rounded-2xl group-hover:bg-[#8C715E] transition-colors shrink-0">
                  {cert.icon === 'ShieldCheck' && <ShieldCheck className="w-6 h-6" />}
                  {cert.icon === 'Sparkles' && <Sparkles className="w-6 h-6" />}
                  {cert.icon === 'Globe' && <Globe className="w-6 h-6" />}
                  {cert.icon === 'Award' && <Award className="w-6 h-6" />}
                  {cert.icon === 'FileCheck' && <FileCheck className="w-6 h-6" />}
                </div>
                <div>
                  <h3 className="font-serif text-lg text-[#2D2926] leading-snug group-hover:text-[#8C715E] transition-colors">
                    {translate(cert.title)}
                  </h3>
                  <p className="text-[11px] text-[#8C8C7F] font-medium pt-0.5">{translate(cert.issuer)}</p>
                </div>
              </div>

              <p className="text-xs text-[#3D3834] font-light leading-relaxed line-clamp-3">
                {translate(cert.description)}
              </p>
            </div>

            <div className="pt-3 border-t border-[#5A5A40]/15 flex items-center justify-between text-xs text-[#5A5A40] group-hover:text-[#8C715E] font-medium">
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#8C715E]" />
                <span className="font-mono text-[11px]">{cert.certNo}</span>
              </span>
              <span className="underline underline-offset-2 flex items-center gap-1 text-[11px]">
                {language === 'bn' ? 'সনদ যাচাই করুন' : language === 'ar' ? 'التحقق من الشهادة' : 'Verify Details'}
                <ExternalLink className="w-3 h-3" />
              </span>
            </div>
          </div>
        ))}

        {/* International Standards Summary Card */}
        <div className="bg-[#2D2926] text-white p-6 rounded-3xl border border-[#5A5A40]/40 flex flex-col justify-between space-y-4 shadow-xl">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-1.5 text-[#8C715E] text-xs font-bold uppercase tracking-wider">
              <Building2 className="w-4 h-4" />
              <span>{language === 'bn' ? 'সুকুন কোয়ালিটি সনদ' : language === 'ar' ? 'ضمان سكون للجودة' : 'Sukoon Quality Pledge'}</span>
            </div>
            <h3 className="font-serif text-2xl text-[#FDFCF8]">
              {language === 'bn'
                ? 'আন্তর্জাতিক বিনিয়োগকারীদের জন্য বিশ্বস্ত আবাসন'
                : language === 'ar'
                ? 'استثمار عقاري آمن للمستثمرين الدوليين'
                : 'Global Grade Investment Assurance'}
            </h3>
            <p className="text-xs text-[#E5E5DF]/90 font-light leading-relaxed">
              {language === 'bn'
                ? 'প্রবাসী বাংলাদেশী ও আন্তর্জাতিক বিনিয়োগকারীদের জন্য আন্তর্জাতিক মানের নামজারি দলিল, ভূগর্ভস্থ ক্যাবলিং এবং সবুজ স্মার্ট অবকাঠামোর শতভাগ নিশ্চয়তা।'
                : language === 'ar'
                ? 'نضمن للمستثمرين والمغتربين أعلى معايير الشفافية القانونية والتصميم البيئي الحديث.'
                : 'Designed specifically for non-resident Bangladeshis (NRB) & international investors seeking bulletproof legal titles and smart green living.'}
            </p>
          </div>

          <div className="pt-2">
            <div className="grid grid-cols-2 gap-2 text-center text-xs">
              <div className="bg-[#3D3834] p-2.5 rounded-xl border border-[#5A5A40]/30">
                <span className="block font-serif text-base text-[#FDFCF8]">100%</span>
                <span className="text-[10px] text-[#8C8C7F]">Title Clean</span>
              </div>
              <div className="bg-[#3D3834] p-2.5 rounded-xl border border-[#5A5A40]/30">
                <span className="block font-serif text-base text-[#FDFCF8]">70+</span>
                <span className="text-[10px] text-[#8C8C7F]">Global Standards</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Detail Verification Modal */}
      {selectedCert && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-[#FDFCF8] border border-[#5A5A40] rounded-3xl max-w-lg w-full p-6 space-y-6 shadow-2xl relative">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-[#5A5A40] text-white rounded-2xl">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase text-[#8C715E]">
                    {translate(selectedCert.category)}
                  </span>
                  <h3 className="font-serif text-xl text-[#2D2926]">{translate(selectedCert.title)}</h3>
                </div>
              </div>
              <button
                onClick={() => setSelectedCert(null)}
                className="text-[#8C8C7F] hover:text-[#2D2926] p-1 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs text-[#3D3834]">
              <div className="bg-[#F5F5F0] p-4 rounded-2xl space-y-2 border border-[#5A5A40]/20">
                <div className="flex justify-between">
                  <span className="text-[#8C8C7F]">Issuing Body:</span>
                  <span className="font-semibold text-[#2D2926]">{translate(selectedCert.issuer)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8C8C7F]">Certificate Reg No:</span>
                  <span className="font-mono font-bold text-[#8C715E]">{selectedCert.certNo}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8C8C7F]">Validity Term:</span>
                  <span className="font-medium text-[#2D2926]">{selectedCert.year}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8C8C7F]">Verification Status:</span>
                  <span className="inline-flex items-center gap-1 text-emerald-700 font-bold">
                    <Check className="w-3.5 h-3.5" /> Authenticated & Active
                  </span>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-[#2D2926] mb-1">Audit Summary & Scope:</h4>
                <p className="text-[#5A5A40] leading-relaxed">{translate(selectedCert.description)}</p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setSelectedCert(null)}
                className="px-5 py-2.5 bg-[#2D2926] text-white rounded-full text-xs font-medium hover:bg-black transition"
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default InternationalComplianceSection;
