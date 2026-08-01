import React, { useState } from 'react';
import {
  Smartphone,
  Wifi,
  Battery,
  Signal,
  Home,
  Search,
  MessageCircle,
  Building2,
  Globe,
  User,
  ExternalLink,
  ShieldCheck,
  Share2,
  Bell,
  ArrowLeft
} from 'lucide-react';

interface MobileSimulatorProps {
  children: React.ReactNode;
  activeTab?: string;
  setActiveTab?: (tab: string) => void;
  onSwitchToWeb?: () => void;
  mode?: string;
}

export const MobileSimulator: React.FC<MobileSimulatorProps> = ({
  children,
  activeTab = 'home',
  setActiveTab = (_tab: string) => {},
  onSwitchToWeb = () => {},
  mode = 'mobile_app',
}) => {
  const [deviceOS, setDeviceOS] = useState<'android' | 'ios'>('android');

  return (
    <div className="bg-slate-950 py-8 px-4 min-h-screen flex flex-col items-center justify-center font-sans">
      {/* Top Toolbar: Switcher between Native Mobile App Mode and Website Browser Mode */}
      <div className="bg-slate-900 text-slate-200 p-4 rounded-3xl border border-slate-800 shadow-2xl mb-6 flex flex-col sm:flex-row items-center justify-between gap-4 max-w-2xl w-full">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-lg font-bold">
            <Smartphone className="w-6 h-6 text-amber-300" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-sm text-white">Sukoon Properties Native Mobile App</span>
              <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-500/30">
                PWA Active
              </span>
            </div>
            <p className="text-xs text-slate-400">ফেসবুক ও হোয়াটসঅ্যাপ স্টাইল সোশ্যাল মোবাইল অ্যাপ</p>
          </div>
        </div>

        {/* Switch to Full Website Mode button */}
        <div className="flex items-center gap-2">
          <button
            onClick={onSwitchToWeb}
            className="px-4 py-2 bg-gradient-to-r from-emerald-700 to-teal-800 hover:from-emerald-600 hover:to-teal-700 text-white font-extrabold text-xs rounded-2xl shadow-lg border border-emerald-500/40 transition flex items-center gap-1.5 cursor-pointer"
            title="ওয়েবসাইট ব্রাউজার খুলুন"
          >
            <Globe className="w-4 h-4 text-amber-300" />
            <span>ওয়েবসাইট ব্রাউজ করুন (Web Version)</span>
          </button>

          <div className="bg-slate-950 p-1 rounded-xl border border-slate-800 flex items-center text-xs font-semibold">
            <button
              onClick={() => setDeviceOS('android')}
              className={`px-3 py-1 rounded-lg transition ${deviceOS === 'android' ? 'bg-emerald-700 text-white' : 'text-slate-400 hover:text-white'}`}
            >
              Android
            </button>
            <button
              onClick={() => setDeviceOS('ios')}
              className={`px-3 py-1 rounded-lg transition ${deviceOS === 'ios' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}
            >
              iOS
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Device Frame */}
      <div
        className={`relative w-[380px] h-[780px] bg-slate-950 shadow-2xl overflow-hidden transition-all duration-300 border-[12px] ${
          deviceOS === 'ios' ? 'rounded-[50px] border-slate-800' : 'rounded-[36px] border-slate-700'
        }`}
      >
        {/* iOS Notch or Android Camera Hole */}
        {deviceOS === 'ios' ? (
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-6 bg-slate-950 rounded-b-2xl z-50 flex items-center justify-center">
            <div className="w-3 h-3 rounded-full bg-slate-900 border border-slate-800 mr-2" />
            <div className="w-12 h-1 bg-slate-900 rounded-full" />
          </div>
        ) : (
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-slate-900 border border-slate-800 z-50" />
        )}

        {/* Device Status Bar */}
        <div className="bg-emerald-950 text-slate-200 px-6 pt-3 pb-1 flex items-center justify-between text-[11px] font-semibold z-40 relative border-b border-emerald-900/50">
          <span>09:41</span>
          <div className="flex items-center gap-1.5">
            <Signal className="w-3 h-3 text-slate-300" />
            <Wifi className="w-3 h-3 text-slate-300" />
            <Battery className="w-3.5 h-3.5 text-emerald-400" />
          </div>
        </div>

        {/* Facebook/WhatsApp Style Mobile App Top Header */}
        <div className="bg-emerald-900 text-white px-4 py-2.5 flex items-center justify-between z-40 relative shadow-md">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center font-bold text-xs shadow">
              SP
            </div>
            <div>
              <div className="flex items-center gap-1">
                <span className="font-extrabold text-xs text-white">Sukoon App</span>
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400 fill-amber-400/20" />
              </div>
              <span className="text-[10px] text-emerald-200 block -mt-0.5">Director Rayhanul Mobarak</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onSwitchToWeb}
              className="px-2.5 py-1 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-[10px] rounded-lg shadow flex items-center gap-1 cursor-pointer"
              title="ওয়েবসাইট দেখুন"
            >
              <Globe className="w-3 h-3" />
              <span>ওয়েবসাইট</span>
            </button>
          </div>
        </div>

        {/* Mobile Screen Viewport */}
        <div className="h-[calc(100%-128px)] overflow-y-auto bg-slate-50 relative pb-16">
          {children}
        </div>

        {/* Native Mobile Bottom Navigation Bar (WhatsApp & Facebook Style) */}
        <div className="absolute bottom-0 inset-x-0 h-16 bg-white border-t border-slate-200 flex items-center justify-around px-1 z-50 shadow-2xl">
          <button
            onClick={() => setActiveTab('home')}
            className={`flex flex-col items-center gap-0.5 text-[10px] font-bold ${
              activeTab === 'home' ? 'text-emerald-800 font-extrabold' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Home className="w-5 h-5" />
            <span>ফিড (Feed)</span>
          </button>

          <button
            onClick={() => setActiveTab('properties')}
            className={`flex flex-col items-center gap-0.5 text-[10px] font-bold ${
              activeTab === 'properties' ? 'text-emerald-800 font-extrabold' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Search className="w-5 h-5" />
            <span>সার্চ (Search)</span>
          </button>

          <button
            onClick={() => setActiveTab('contact')}
            className={`flex flex-col items-center gap-0.5 text-[10px] font-bold ${
              activeTab === 'contact' ? 'text-emerald-800 font-extrabold' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <div className="w-9 h-9 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-lg -mt-4 border-2 border-white">
              <MessageCircle className="w-5 h-5 text-amber-300" />
            </div>
            <span>হোয়াটসঅ্যাপ</span>
          </button>

          <button
            onClick={() => setActiveTab('projects')}
            className={`flex flex-col items-center gap-0.5 text-[10px] font-bold ${
              activeTab === 'projects' ? 'text-emerald-800 font-extrabold' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Building2 className="w-5 h-5" />
            <span>প্রজেক্টস</span>
          </button>

          <button
            onClick={onSwitchToWeb}
            className="flex flex-col items-center gap-0.5 text-[10px] font-bold text-slate-600 hover:text-emerald-800 cursor-pointer"
            title="ওয়েবসাইট ব্রাউজারে যান"
          >
            <Globe className="w-5 h-5 text-amber-600" />
            <span>ওয়েবসাইট</span>
          </button>
        </div>
      </div>
    </div>
  );
};
