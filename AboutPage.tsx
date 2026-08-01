import React from 'react';
import { Building2, Award, Users, ShieldCheck, Quote, CheckCircle, Mail, Phone } from 'lucide-react';
import InternationalComplianceSection from '../common/InternationalComplianceSection';

export const AboutPage: React.FC = () => {
  return (
    <div className="bg-[#FDFCF8] min-h-screen py-10 px-4 sm:px-8 space-y-12">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#8C715E]">
            Corporate Profile & Leadership
          </span>
          <h1 className="text-4xl font-serif text-[#2D2926]">About Sukoon Properties Ltd.</h1>
          <p className="text-sm text-[#8C8C7F] leading-relaxed">
            Founded on principles of absolute legal integrity, transparent mutation deeds, and sustainable township architecture in Bangladesh.
          </p>
        </div>

        {/* Director Message Card */}
        <div className="bg-[#5A5A40] text-white rounded-3xl p-8 sm:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border border-[#484833] shadow-xl">
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-64 h-64 sm:w-80 sm:h-80 rounded-2xl overflow-hidden border-4 border-[#8C715E] shadow-2xl">
              <img
                src="/src/assets/images/sukoon_director_portrait_1785534211944.jpg"
                alt="Rayhanul Mobarak - Managing Director"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          <div className="lg:col-span-7 space-y-4">
            <Quote className="w-10 h-10 text-[#8C715E]" />
            <h2 className="text-2xl sm:text-3xl font-serif text-[#FDFCF8]">
              "Pioneering Transparent Real Estate Solutions Across Bangladesh & Diaspora"
            </h2>
            <p className="text-xs sm:text-sm text-[#E5E5DF] leading-relaxed">
              Under my stewardship, Sukoon Properties Ltd. has guaranteed that every single square foot sold—whether in Purbachal Smart City, Gulshan 2, or Uttara—is 100% verified, mutation-cleared, and RAJA compliant. We take pride in building eco-conscious communities with underground utilities, wide tree-lined avenues, and instant digital booking convenience.
            </p>
            <div>
              <h3 className="font-serif font-bold text-lg text-[#FDFCF8]">Rayhanul Mobarak</h3>
              <p className="text-xs text-[#E5E5DF]">Managing Director, Sukoon Properties Ltd.</p>
              <p className="text-xs text-[#E5E5DF]">Email: sukoonpropertiesltd@gmail.com | Hotline: +880 1913-780386</p>
            </div>
          </div>
        </div>

        {/* Core Values */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-[#E5E5DF] shadow-xs space-y-3 text-center">
            <ShieldCheck className="w-8 h-8 text-[#5A5A40] mx-auto" />
            <h3 className="font-serif font-bold text-lg text-[#2D2926]">100% Legal Integrity</h3>
            <p className="text-xs text-[#8C8C7F]">Clean title deeds, zero encumbrances, and transparent mutation verification.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-[#E5E5DF] shadow-xs space-y-3 text-center">
            <Award className="w-8 h-8 text-[#8C715E] mx-auto" />
            <h3 className="font-serif font-bold text-lg text-[#2D2926]">Smart Architecture</h3>
            <p className="text-xs text-[#8C8C7F]">Lakeside parks, underground wiring, and solar streetlights in all townships.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-[#E5E5DF] shadow-xs space-y-3 text-center">
            <Users className="w-8 h-8 text-[#5A5A40] mx-auto" />
            <h3 className="font-serif font-bold text-lg text-[#2D2926]">Global Diaspora Trust</h3>
            <p className="text-xs text-[#8C8C7F]">Serving NRBs in UK, USA, Canada, UAE, and Saudi Arabia with digital power of attorney support.</p>
          </div>
        </div>

        {/* International Standards & Compliance Section */}
        <InternationalComplianceSection />
      </div>
    </div>
  );
};
