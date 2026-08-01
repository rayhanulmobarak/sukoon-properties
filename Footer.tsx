import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import {
  Building2,
  Phone,
  Mail,
  MapPin,
  Send,
  CheckCircle2,
  ShieldCheck,
  Award,
  Clock,
  ExternalLink,
  Smartphone,
  Download,
} from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: string) => void;
  onOpenAppDownloadModal?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab, onOpenAppDownloadModal }) => {
  const { t } = useLanguage();
  const [emailInput, setEmailInput] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setSubscribed(true);
      setEmailInput('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Top Badges / Value Props */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pb-12 border-b border-slate-800 text-center md:text-left">
          <div className="flex items-start gap-3">
            <div className="p-3 rounded-xl bg-emerald-950 border border-emerald-800/60 text-emerald-400 shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm">100% RAJA Approved</h4>
              <p className="text-xs text-slate-400 mt-1">Clear title, mutated land deeds & transparent legal verification.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="p-3 rounded-xl bg-emerald-950 border border-emerald-800/60 text-emerald-400 shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm">Smart City Urban Planner</h4>
              <p className="text-xs text-slate-400 mt-1">Eco-townships with underground utilities in Purbachal & Uttara.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="p-3 rounded-xl bg-emerald-950 border border-emerald-800/60 text-emerald-400 shrink-0">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm">On-Time Handover Guarantee</h4>
              <p className="text-xs text-slate-400 mt-1">Strict adherence to structural deadlines with monthly updates.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="p-3 rounded-xl bg-emerald-950 border border-emerald-800/60 text-emerald-400 shrink-0">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm">Flexible Installments</h4>
              <p className="text-xs text-slate-400 mt-1">Easy bKash / Nagad / SSLCommerz payment plans up to 60 months.</p>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 py-12 border-b border-slate-800">
          {/* Col 1: Brand & Contact Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-lg bg-emerald-800 text-amber-300 flex items-center justify-center font-bold">
                <Building2 className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-xl text-white tracking-tight">SUKOON Properties Ltd.</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Sukoon Properties Ltd. is Bangladesh’s premier real estate & housing development company. Spearheaded by Director Rayhanul Mobarak, we craft sustainable townships, luxury duplexes, and prime commercial hubs.
            </p>
            <div className="space-y-2 text-xs text-slate-300 pt-2">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Sukoon Corporate Tower, Level 14, Gulshan Avenue 2, Dhaka 1212, Bangladesh</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href="tel:+8801913780386" className="hover:text-emerald-400 transition">
                  +880 1913-780386 / +880 1800-SUKOON
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href="mailto:sukoonpropertiesltd@gmail.com" className="hover:text-emerald-400 underline transition">
                  sukoonpropertiesltd@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Col 2: Housing Projects */}
          <div>
            <h4 className="font-bold text-white text-sm uppercase tracking-wider mb-4 border-l-2 border-emerald-500 pl-2">
              Projects
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={() => setActiveTab('projects')} className="hover:text-emerald-400 transition">
                  Purbachal Smart City Plots
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('projects')} className="hover:text-emerald-400 transition">
                  Gulshan Royal Sky Duplexes
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('projects')} className="hover:text-emerald-400 transition">
                  Uttara Metro Green Valley
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('projects')} className="hover:text-emerald-400 transition">
                  Agrabad Commercial Skyscraper
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('projects')} className="hover:text-emerald-400 transition">
                  Cox’s Bazar Beachfront Condos
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Quick Navigation */}
          <div>
            <h4 className="font-bold text-white text-sm uppercase tracking-wider mb-4 border-l-2 border-emerald-500 pl-2">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={() => setActiveTab('about')} className="hover:text-emerald-400 transition">
                  About Sukoon Properties
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('about')} className="hover:text-emerald-400 transition">
                  Director Rayhanul Mobarak Message
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('properties')} className="hover:text-emerald-400 transition">
                  All Property Listings
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('gallery')} className="hover:text-emerald-400 transition">
                  HD Media & Video Gallery
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('blog')} className="hover:text-emerald-400 transition">
                  Real Estate News & Insights
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('contact')} className="hover:text-emerald-400 transition">
                  Branch Locations & Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Newsletter & Payment Gateways */}
          <div>
            <h4 className="font-bold text-white text-sm uppercase tracking-wider mb-4 border-l-2 border-emerald-500 pl-2">
              Stay Updated
            </h4>
            <p className="text-xs text-slate-400 mb-3">
              Subscribe to get instant alerts on new housing plot releases & exclusive discounts.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="Enter your email address..."
                  required
                  className="w-full bg-slate-900 border border-slate-700 text-slate-200 text-xs rounded-lg px-3 py-2.5 focus:outline-none focus:border-emerald-500"
                />
                <button
                  type="submit"
                  className="absolute right-1 top-1 bottom-1 bg-emerald-700 hover:bg-emerald-600 text-white px-3 rounded-md text-xs font-semibold flex items-center gap-1 transition"
                >
                  <Send className="w-3 h-3" />
                </button>
              </div>
              {subscribed && (
                <p className="text-[11px] text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Subscribed successfully!
                </p>
              )}
            </form>

            <div className="mt-6 pt-4 border-t border-slate-800">
              <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Supported Payment Partners
              </p>
              <div className="flex flex-wrap items-center gap-2">
                <span className="bg-emerald-900/60 text-emerald-300 border border-emerald-700/50 text-[10px] font-bold px-2 py-0.5 rounded">
                  EFTN Bank Transfer
                </span>
                <span className="bg-teal-900/60 text-teal-300 border border-teal-700/50 text-[10px] font-bold px-2 py-0.5 rounded">
                  NPSB Realtime Interbank
                </span>
                <span className="bg-pink-900/60 text-pink-300 border border-pink-700/50 text-[10px] font-bold px-2 py-0.5 rounded">
                  bKash
                </span>
                <span className="bg-orange-900/60 text-orange-300 border border-orange-700/50 text-[10px] font-bold px-2 py-0.5 rounded">
                  Nagad
                </span>
                <span className="bg-purple-900/60 text-purple-300 border border-purple-700/50 text-[10px] font-bold px-2 py-0.5 rounded">
                  Rocket
                </span>
                <span className="bg-blue-900/60 text-blue-300 border border-blue-700/50 text-[10px] font-bold px-2 py-0.5 rounded">
                  SSLCommerz
                </span>
                <span className="bg-indigo-900/60 text-indigo-300 border border-indigo-700/50 text-[10px] font-bold px-2 py-0.5 rounded">
                  Stripe
                </span>
                <span className="bg-slate-800 text-slate-300 border border-slate-700 text-[10px] font-bold px-2 py-0.5 rounded">
                  Visa / Mastercard
                </span>
              </div>
            </div>

            {/* Google Play Store & Mobile App Banner */}
            {onOpenAppDownloadModal && (
              <div className="mt-5 p-3.5 bg-gradient-to-r from-emerald-950 to-slate-900 rounded-xl border border-emerald-800 space-y-2">
                <div className="flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-serif font-bold text-white">Official Android App</span>
                </div>
                <p className="text-[10px] text-slate-300">
                  Access properties, 360° virtual tours & offline records on your phone.
                </p>
                <button
                  onClick={onOpenAppDownloadModal}
                  className="w-full bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs py-2 rounded-lg transition flex items-center justify-center gap-1.5 shadow"
                >
                  <Download className="w-3.5 h-3.5 text-amber-300" />
                  <span>Google Play App Download</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 Sukoon Properties Ltd. All rights reserved. Director: Rayhanul Mobarak.</p>
          <div className="flex items-center gap-4">
            <button onClick={() => setActiveTab('privacy')} className="hover:text-slate-300 transition">
              Privacy Policy
            </button>
            <span>•</span>
            <button onClick={() => setActiveTab('terms')} className="hover:text-slate-300 transition">
              Terms & Conditions
            </button>
            <span>•</span>
            <button onClick={() => setActiveTab('faq')} className="hover:text-slate-300 transition">
              FAQ
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
