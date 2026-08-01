import React, { useState } from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import { Video, Calendar, Clock, Globe, UserCheck, ShieldCheck, Sparkles, CheckCircle2, Phone, Mail, Check } from 'lucide-react';

export const VipDirectorConcierge: React.FC = () => {
  const { language, translate } = useTranslation();
  const [selectedDirector, setSelectedDirector] = useState<string>('Rayhanul Mobarak (Managing Director)');
  const [selectedTimezone, setSelectedTimezone] = useState<string>('GMT+3 (Saudi Arabia / UAE / Kuwait)');
  const [selectedDate, setSelectedDate] = useState<string>('2026-08-05');
  const [selectedTime, setSelectedTime] = useState<string>('04:00 PM');
  const [selectedTopic, setSelectedTopic] = useState<string>('NRB High-Value Investment');
  const [clientName, setClientName] = useState<string>('');
  const [clientEmail, setClientEmail] = useState<string>('');
  const [clientPhone, setClientPhone] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientEmail) {
      alert('Please fill in your name and email.');
      return;
    }
    setIsSubmitted(true);
  };

  return (
    <div className="bg-[#FDFCF8] border border-[#5A5A40]/30 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#5A5A40]/20 pb-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 bg-[#8C715E]/10 border border-[#8C715E]/30 text-[#8C715E] text-xs font-semibold px-3 py-1 rounded-full">
            <Video className="w-3.5 h-3.5" />
            <span>
              {language === 'bn'
                ? 'ভিআইপি ডিরেক্টর কনসিয়ার্জ ও ভিডিও কল মিটিং'
                : language === 'ar'
                ? 'خدمة الاستشارات الإدارية لمكالمات الفيديو VIP'
                : 'VIP Director Concierge & Video Consultation'}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif text-[#2D2926]">
            {language === 'bn'
              ? 'ম্যানেজিং ডিরেক্টর ও এক্সিকিউটিভ কনসালট্যান্ট মিটিং বুকিং'
              : language === 'ar'
              ? 'احجز جلسة استشارية مرئية مباشرة مع المدير التنفيذي'
              : '1-on-1 Video Advisory with Executive Directors'}
          </h2>
          <p className="text-xs sm:text-sm text-[#8C8C7F] font-light">
            {language === 'bn'
              ? 'প্রবাসী ও আন্তর্জাতিক ইনভেস্টরদের জন্য সরাসরি ওয়ান-অন-ওয়ান প্রাইভেট ভিডিও কনফারেন্স।'
              : language === 'ar'
              ? 'جلسة استشارية خاصة ومباشرة مخصصة لكبار المستثمرين والمغتربين.'
              : 'Dedicated 1-on-1 Zoom / Google Meet advisory session with Managing Director Rayhanul Mobarak for high-net-worth investments.'}
          </p>
        </div>

        <div className="flex items-center gap-3 bg-[#2D2926] text-white p-3 rounded-2xl border border-[#5A5A40]/30 text-xs shrink-0">
          <UserCheck className="w-5 h-5 text-[#8C715E]" />
          <div>
            <span className="font-semibold block text-[#FDFCF8]">Rayhanul Mobarak</span>
            <span className="text-[10px] text-[#8C8C7F]">Managing Director & CEO</span>
          </div>
        </div>
      </div>

      {!isSubmitted ? (
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Form Controls */}
          <div className="lg:col-span-7 bg-[#F5F5F0] border border-[#5A5A40]/30 rounded-2xl p-6 space-y-4">
            <h3 className="font-serif text-base font-bold text-[#2D2926] flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#8C715E]" />
              <span>Session Schedule Details</span>
            </h3>

            {/* Advisory Official Selection */}
            <div className="space-y-1 text-xs">
              <label className="font-medium text-[#2D2926] block">Select Advisor:</label>
              <select
                value={selectedDirector}
                onChange={(e) => setSelectedDirector(e.target.value)}
                className="w-full bg-white border border-[#5A5A40]/30 rounded-xl p-2.5 text-xs text-[#2D2926] focus:outline-none focus:border-[#8C715E]"
              >
                <option value="Rayhanul Mobarak (Managing Director)">Rayhanul Mobarak (Managing Director & CEO)</option>
                <option value="Senior Executive Sales Director">Senior Executive Sales Director (NRB Desk)</option>
                <option value="Lead Structural Architect">Chief Architect (Duplex & Township Planning)</option>
              </select>
            </div>

            {/* Timezone & Date */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="space-y-1">
                <label className="font-medium text-[#2D2926] block">Your Timezone:</label>
                <select
                  value={selectedTimezone}
                  onChange={(e) => setSelectedTimezone(e.target.value)}
                  className="w-full bg-white border border-[#5A5A40]/30 rounded-xl p-2.5 text-xs text-[#2D2926] focus:outline-none focus:border-[#8C715E]"
                >
                  <option value="GMT+3 (Saudi Arabia / UAE / Kuwait)">GMT+3 (Saudi Arabia / UAE / Qatar / Kuwait)</option>
                  <option value="GMT+6 (Bangladesh Standard Time)">GMT+6 (Dhaka Standard Time)</option>
                  <option value="GMT+0 (London / UK)">GMT+0 (London / UK / Europe)</option>
                  <option value="EST (New York / Canada)">EST (New York / Toronto)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-medium text-[#2D2926] block">Preferred Date:</label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full bg-white border border-[#5A5A40]/30 rounded-xl p-2 text-xs text-[#2D2926] focus:outline-none focus:border-[#8C715E]"
                />
              </div>
            </div>

            {/* Time Slot Selector */}
            <div className="space-y-1.5 text-xs">
              <label className="font-medium text-[#2D2926] block">Select Time Slot:</label>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {['11:00 AM', '02:00 PM', '04:00 PM', '07:00 PM', '09:00 PM'].map((slot) => (
                  <button
                    type="button"
                    key={slot}
                    onClick={() => setSelectedTime(slot)}
                    className={`p-2 rounded-xl border text-center font-mono font-semibold transition ${
                      selectedTime === slot
                        ? 'bg-[#8C715E] text-white border-[#8C715E]'
                        : 'bg-white text-[#2D2926] border-[#5A5A40]/30 hover:bg-[#8C715E]/10'
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            {/* Topic Selector */}
            <div className="space-y-1 text-xs">
              <label className="font-medium text-[#2D2926] block">Consultation Agenda:</label>
              <select
                value={selectedTopic}
                onChange={(e) => setSelectedTopic(e.target.value)}
                className="w-full bg-white border border-[#5A5A40]/30 rounded-xl p-2.5 text-xs text-[#2D2926] focus:outline-none focus:border-[#8C715E]"
              >
                <option value="NRB High-Value Investment">NRB High-Value Investment & Multi-Plot Booking</option>
                <option value="Commercial High-Rise Acquisition">Commercial High-Rise Acquisition & Yield Analysis</option>
                <option value="Custom Duplex Architectural Design">Custom Duplex Architectural & Interior Design</option>
                <option value="Legal Title & Power of Attorney Audit">Legal Title & Power of Attorney Audit</option>
              </select>
            </div>
          </div>

          {/* Right Column: User Contact Details */}
          <div className="lg:col-span-5 bg-[#2D2926] text-white p-6 rounded-2xl space-y-4 border border-[#5A5A40]/40 flex flex-col justify-between shadow-xl">
            <div className="space-y-4">
              <h3 className="font-serif text-base font-bold text-[#FDFCF8] flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#8C715E]" />
                <span>Investor Contact Details</span>
              </h3>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="text-[#8C8C7F] block mb-1">Full Name *</label>
                  <input
                    type="text"
                    placeholder="Engr. M. A. Rahman"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    required
                    className="w-full bg-[#3D3834] border border-[#5A5A40]/40 rounded-xl p-2.5 text-xs text-white placeholder-[#8C8C7F] focus:outline-none focus:border-[#8C715E]"
                  />
                </div>

                <div>
                  <label className="text-[#8C8C7F] block mb-1">Email Address *</label>
                  <input
                    type="email"
                    placeholder="investor@domain.com"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    required
                    className="w-full bg-[#3D3834] border border-[#5A5A40]/40 rounded-xl p-2.5 text-xs text-white placeholder-[#8C8C7F] focus:outline-none focus:border-[#8C715E]"
                  />
                </div>

                <div>
                  <label className="text-[#8C8C7F] block mb-1">WhatsApp / Phone (With Country Code)</label>
                  <input
                    type="tel"
                    placeholder="+966 50 123 4567 / +880 17..."
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    className="w-full bg-[#3D3834] border border-[#5A5A40]/40 rounded-xl p-2.5 text-xs text-white placeholder-[#8C8C7F] focus:outline-none focus:border-[#8C715E]"
                  />
                </div>
              </div>
            </div>

            <div className="pt-4 space-y-2">
              <button
                type="submit"
                className="w-full py-3 bg-[#8C715E] hover:bg-[#5A5A40] text-white rounded-full text-xs font-bold transition shadow-lg flex items-center justify-center gap-2"
              >
                <Video className="w-4 h-4" />
                <span>Confirm VIP Video Appointment</span>
              </button>
              <p className="text-[10px] text-center text-[#8C8C7F]">
                An automated Google Meet link & Calendar invite will be emailed.
              </p>
            </div>
          </div>
        </form>
      ) : (
        /* Confirmation View */
        <div className="bg-[#2D2926] text-white p-8 rounded-3xl border border-[#5A5A40]/40 text-center space-y-4 shadow-2xl">
          <div className="w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center mx-auto text-white shadow-lg">
            <Check className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-2xl text-[#FDFCF8]">VIP Video Consultation Scheduled!</h3>
          <p className="text-xs text-[#E5E5DF] max-w-md mx-auto leading-relaxed">
            Thank you, <strong className="text-white">{clientName}</strong>. Your 1-on-1 private video advisory session with{' '}
            <strong className="text-[#8C715E]">{selectedDirector}</strong> has been confirmed for:
          </p>

          <div className="bg-[#3D3834] p-4 rounded-2xl border border-[#5A5A40]/40 max-w-sm mx-auto text-xs space-y-1 font-mono">
            <div className="text-[#8C8C7F]">📅 Date: <span className="text-white">{selectedDate}</span></div>
            <div className="text-[#8C8C7F]">⏰ Time: <span className="text-[#8C715E]">{selectedTime} ({selectedTimezone})</span></div>
            <div className="text-[#8C8C7F]">📋 Topic: <span className="text-white">{selectedTopic}</span></div>
          </div>

          <p className="text-[11px] text-[#8C8C7F]">
            A calendar invitation with your private video room URL has been dispatched to <strong>{clientEmail}</strong>.
          </p>

          <button
            onClick={() => setIsSubmitted(false)}
            className="px-6 py-2 bg-[#8C715E] text-white rounded-full text-xs font-semibold hover:bg-[#5A5A40] transition"
          >
            Book Another Appointment
          </button>
        </div>
      )}
    </div>
  );
};

export default VipDirectorConcierge;
