import React, { useState } from 'react';
import {
  X,
  User,
  Building2,
  Mail,
  Phone,
  Lock,
  CheckCircle2,
  KeyRound,
  ShieldCheck,
  Globe,
  Smartphone,
  ArrowRight,
  UserCheck,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultMode?: 'login' | 'register';
  onOpenAppDownload?: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  defaultMode = 'register',
  onOpenAppDownload,
}) => {
  const { login, register, requestOtp, verifyOtp, otpRequested } = useAuth();
  const [mode, setMode] = useState<'login' | 'register'>(defaultMode);
  
  // Form State
  const [fullName, setFullName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole>('customer');
  const [successMessage, setSuccessMessage] = useState('');
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);

  if (!isOpen) return null;

  const currentWebUrl = window.location.href;

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !phone) {
      alert('দয়া করে আপনার নাম, ইমেইল এবং মোবাইল নম্বর পূরণ করুন।');
      return;
    }

    register(fullName, email, phone, companyName, selectedRole);
    setSuccessMessage(`স্বাগতম! "${fullName}" নামে আপনার কোম্পানির অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে।`);
    setTimeout(() => {
      onClose();
    }, 1800);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email && !phone) {
      alert('দয়া করে ইমেইল বা ফোন নম্বর প্রদান করুন।');
      return;
    }

    if (isVerifyingOtp) {
      const ok = verifyOtp(otpCode);
      if (ok) {
        login(email || 'client@sukoon.bd', phone || '+8801913780386', selectedRole);
        setSuccessMessage('ওটিপি যাচাইকরণ সফল! অ্যাপে লগইন হয়েছে।');
        setTimeout(() => onClose(), 1500);
      } else {
        alert('ভুল ওটিপি কোড! সঠিক কোড দিন (যেমন: 1234)');
      }
    } else {
      login(email || 'client@sukoon.bd', phone || '+8801913780386', selectedRole);
      setSuccessMessage('সফলভাবে লগইন সম্পূর্ণ হয়েছে।');
      setTimeout(() => onClose(), 1500);
    }
  };

  const handleSendOtp = () => {
    if (!phone && !email) {
      alert('ওটিপি পাঠাতে আপনার মোবাইল নম্বর বা ইমেইল লিখুন।');
      return;
    }
    requestOtp(phone || email);
    setIsVerifyingOtp(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl overflow-hidden border border-slate-200 my-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#2D2926] via-slate-900 to-[#5A5A40] text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 text-slate-300 hover:text-white rounded-xl hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-amber-500/20 border border-amber-400/40 rounded-2xl flex items-center justify-center text-amber-300">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-mono tracking-widest text-amber-300 font-bold block">
                SUKOON PROPERTIES LTD.
              </span>
              <h2 className="font-serif text-xl font-bold text-white">
                {mode === 'register' ? 'কোম্পানি / গ্রাহক নাম রেজিস্ট্রেশন' : 'অ্যাপ ও ওয়েবসাইটে লগইন করুন'}
              </h2>
            </div>
          </div>

          <p className="text-xs text-slate-300">
            {mode === 'register'
              ? 'অ্যাপ থেকে সরাসরি প্রপার্টি ব্রাউজ, বুকিং এবং ৩৬০° ভিডিও ট্যুর দেখতে অ্যাকাউন্ট খুলুন।'
              : 'আপনার নিবন্ধিত ইমেইল/ফোন নম্বর দিয়ে লগইন করুন।'}
          </p>

          {/* Toggle Tabs */}
          <div className="flex bg-slate-950/50 p-1 rounded-xl mt-4 border border-slate-700">
            <button
              onClick={() => {
                setMode('register');
                setSuccessMessage('');
              }}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition ${
                mode === 'register'
                  ? 'bg-amber-500 text-slate-950 shadow'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              নাম রেজিস্ট্রেশন (Register)
            </button>
            <button
              onClick={() => {
                setMode('login');
                setSuccessMessage('');
              }}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition ${
                mode === 'login'
                  ? 'bg-amber-500 text-slate-950 shadow'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              লগইন করুন (Sign In)
            </button>
          </div>
        </div>

        {/* Form Area */}
        <div className="p-6 space-y-5">
          {successMessage ? (
            <div className="bg-emerald-50 border border-emerald-300 p-4 rounded-2xl flex items-center gap-3 text-emerald-900 text-xs font-bold animate-pulse">
              <CheckCircle2 className="w-6 h-6 text-emerald-600 flex-shrink-0" />
              <span>{successMessage}</span>
            </div>
          ) : null}

          {/* Website Link Banner */}
          <div className="bg-amber-50/80 border border-amber-200 p-3.5 rounded-2xl flex items-center justify-between text-xs gap-2">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-emerald-700 flex-shrink-0" />
              <div>
                <span className="font-bold text-slate-900 block">কোম্পানি অফিশিয়াল ওয়েবসাইট লিংক</span>
                <span className="text-[10px] text-slate-600 font-mono truncate max-w-[200px] sm:max-w-xs block">
                  {currentWebUrl}
                </span>
              </div>
            </div>
            <a
              href={currentWebUrl}
              target="_blank"
              rel="noreferrer"
              className="px-2.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-amber-300 font-bold text-[11px] rounded-lg transition flex items-center gap-1 flex-shrink-0"
            >
              <span>ওয়েবসাইটে যান</span>
              <ArrowRight className="w-3 h-3" />
            </a>
          </div>

          {mode === 'register' ? (
            <form onSubmit={handleRegister} className="space-y-3.5">
              {/* Name Registration Input */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  আপনার পূর্ণ নাম (Full Name) *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    placeholder="যেমন: রায়হানুল মোবারক"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium focus:bg-white focus:border-emerald-600 focus:outline-none"
                  />
                </div>
              </div>

              {/* Company Name */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  কোম্পানি/প্রতিষ্ঠানের নাম (Company Name)
                </label>
                <div className="relative">
                  <Building2 className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    placeholder="যেমন: Sukoon Real Estate / Partner Ltd."
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium focus:bg-white focus:border-emerald-600 focus:outline-none"
                  />
                </div>
              </div>

              {/* Email & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    ইমেইল এড্রেস (Email) *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="email"
                      required
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium focus:bg-white focus:border-emerald-600 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    মোবাইল নম্বর (Phone) *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="tel"
                      required
                      placeholder="+880 1913-780386"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium focus:bg-white focus:border-emerald-600 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  পাসওয়ার্ড তৈরি করুন (Password) *
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium focus:bg-white focus:border-emerald-600 focus:outline-none"
                  />
                </div>
              </div>

              {/* User Role Selection */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  অ্যাকাউন্টের ধরন (Account Role)
                </label>
                <select
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value as UserRole)}
                  className="w-full py-2.5 px-3 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-800 focus:outline-none"
                >
                  <option value="customer">সাধারণ গ্রাহক / ফ্ল্যাট প্রত্যাশী (Buyer)</option>
                  <option value="investor">প্রবাসী / NRI বিনিয়োগকারী (NRI Investor)</option>
                  <option value="buyer">জমি / কমার্শিয়াল ক্লায়েন্ট (Land Owner)</option>
                  <option value="sales_exec">সেলস রিপ্রেজেন্টেটিভ (Sales Representative)</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-800 hover:bg-emerald-700 text-white font-extrabold text-xs py-3 rounded-xl shadow-lg transition flex items-center justify-center gap-2 mt-2"
              >
                <UserCheck className="w-4 h-4 text-amber-300" />
                <span>কোম্পানি নাম রেজিস্ট্রেশন সম্পন্ন করুন</span>
              </button>
            </form>
          ) : (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  ইমেইল বা মোবাইল নম্বর (Email or Phone)
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    placeholder="sukoonpropertiesltd@gmail.com / +8801913780386"
                    value={email || phone}
                    onChange={(e) => {
                      if (e.target.value.includes('@')) {
                        setEmail(e.target.value);
                      } else {
                        setPhone(e.target.value);
                      }
                    }}
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium focus:bg-white focus:border-emerald-600 focus:outline-none"
                  />
                </div>
              </div>

              {!isVerifyingOtp ? (
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    পাসওয়ার্ড (Password)
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium focus:bg-white focus:border-emerald-600 focus:outline-none"
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    ৪-ডিজিটের ওটিপি কোড (OTP Code)
                  </label>
                  <div className="relative">
                    <KeyRound className="w-4 h-4 text-amber-600 absolute left-3 top-3" />
                    <input
                      type="text"
                      maxLength={4}
                      placeholder="1234"
                      value={otpCode}
                      onChange={(e) => setOtpCode(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 bg-amber-50 border border-amber-300 rounded-xl text-xs font-bold text-slate-900 tracking-widest focus:outline-none"
                    />
                  </div>
                  <span className="text-[10px] text-slate-500 mt-1 block">
                    পরীক্ষামূলক ওটিপি: <strong className="text-emerald-700 font-mono">1234</strong>
                  </span>
                </div>
              )}

              <div className="flex items-center justify-between text-xs pt-1">
                <button
                  type="button"
                  onClick={handleSendOtp}
                  className="text-emerald-800 hover:underline font-bold flex items-center gap-1"
                >
                  <KeyRound className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{isVerifyingOtp ? 'পুনরায় ওটিপি পাঠান' : 'ওটিপি (OTP) কোড দ্বারা প্রবেশ করুন'}</span>
                </button>
              </div>

              <button
                type="submit"
                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs py-3 rounded-xl shadow-lg transition flex items-center justify-center gap-2"
              >
                <ShieldCheck className="w-4 h-4 text-amber-300" />
                <span>{isVerifyingOtp ? 'ওটিপি যাচাই করে প্রবেশ করুন' : 'লগইন করুন (Login)'}</span>
              </button>
            </form>
          )}

          {/* Download App Shortcut Banner */}
          {onOpenAppDownload && (
            <div className="bg-slate-100 p-3.5 rounded-2xl border border-slate-200 flex items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <Smartphone className="w-5 h-5 text-emerald-700 flex-shrink-0" />
                <div>
                  <span className="font-bold text-slate-900 block">মোবাইল অ্যাপ ডাউনলোড করুন</span>
                  <span className="text-[10px] text-slate-600 block">গুগল প্লে স্টোর ও সরাসরি অ্যান্ড্রয়েড এপিকে</span>
                </div>
              </div>
              <button
                onClick={() => {
                  onClose();
                  onOpenAppDownload();
                }}
                className="px-3 py-1.5 bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-[11px] rounded-lg transition"
              >
                ডাউনলোড লিংক
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
