import React, { useState } from 'react';
import { X, Video, Calendar, Clock, Globe2, Phone, CheckCircle2, MessageSquare } from 'lucide-react';

interface WhatsAppVideoSchedulerModalProps {
  isOpen: boolean;
  onClose: () => void;
  propertyTitle?: string;
}

export const WhatsAppVideoSchedulerModal: React.FC<WhatsAppVideoSchedulerModalProps> = ({
  isOpen,
  onClose,
  propertyTitle = 'Purbachal Smart City / Executive Duplex',
}) => {
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('+880 ');
  const [countryZone, setCountryZone] = useState('Kuwait (KWD / UTC+3)');
  const [date, setDate] = useState('2026-08-05');
  const [timeSlot, setTimeSlot] = useState('05:00 PM (Gulf Time)');
  const [notes, setNotes] = useState('Interested in live video walkthrough and KWD payment options.');

  if (!isOpen) return null;

  const handleScheduleWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    const formattedMessage = encodeURIComponent(
      `Hello Director Rayhanul Mobarak (Sukoon Properties Ltd.),\n\nI would like to schedule a 1-on-1 Live WhatsApp Video Consultation.\n\n👤 Name: ${
        clientName || 'Valued NRB Client'
      }\n📱 Phone/WhatsApp: ${clientPhone}\n🌍 Time Zone: ${countryZone}\n📅 Requested Date: ${date}\n⏰ Requested Time: ${timeSlot}\n🏡 Property of Interest: ${propertyTitle}\n📝 Notes: ${notes}\n\nPlease confirm availability for our live video session. Thank you!`
    );

    const whatsappUrl = `https://wa.me/8801913780386?text=${formattedMessage}`;
    window.open(whatsappUrl, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-xl w-full shadow-2xl overflow-hidden border border-slate-200 my-8">
        {/* Top Header */}
        <div className="bg-emerald-950 text-white p-6 flex items-center justify-between border-b border-emerald-900">
          <div className="flex items-center gap-3">
            <div className="bg-emerald-600 p-2.5 rounded-2xl text-white shadow-lg">
              <Video className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <span className="bg-emerald-900 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-700/60">
                1-on-1 Director Video Call
              </span>
              <h3 className="font-serif text-xl font-bold mt-0.5">WhatsApp Live Video Tour Appointment</h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-emerald-900 transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleScheduleWhatsApp} className="p-6 space-y-4">
          <div className="bg-slate-900 text-slate-200 p-4 rounded-2xl border border-emerald-700/50 text-xs space-y-1">
            <div className="flex items-center gap-2 font-bold text-emerald-400">
              <Phone className="w-4 h-4" /> Director Rayhanul Mobarak Desk (+880 1913-780386)
            </div>
            <p className="text-[11px] text-slate-300">
              For NRB investors in Kuwait, UAE, Saudi Arabia, UK, and USA. Schedule a live virtual walkthrough of plots, duplexes, or legal document inspection.
            </p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Your Full Name</label>
            <input
              type="text"
              required
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              placeholder="e.g. Engr. Tareq Rahman"
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:border-emerald-600"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">WhatsApp Mobile Number</label>
              <input
                type="text"
                required
                value={clientPhone}
                onChange={(e) => setClientPhone(e.target.value)}
                placeholder="+965 9000 0000 / +880 1913-780386"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:border-emerald-600"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Country / Time Zone</label>
              <select
                value={countryZone}
                onChange={(e) => setCountryZone(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:border-emerald-600"
              >
                <option value="Kuwait (KWD / UTC+3)">Kuwait (KWD / UTC+3)</option>
                <option value="Saudi Arabia (SAR / UTC+3)">Saudi Arabia (SAR / UTC+3)</option>
                <option value="UAE Dubai (AED / UTC+4)">UAE Dubai (AED / UTC+4)</option>
                <option value="UK London (GBP / UTC+1)">UK London (GBP / UTC+1)</option>
                <option value="USA New York (USD / UTC-4)">USA New York (USD / UTC-4)</option>
                <option value="Dhaka Bangladesh (BDT / UTC+6)">Dhaka Bangladesh (BDT / UTC+6)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-emerald-600" /> Preferred Call Date
              </label>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:border-emerald-600"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-emerald-600" /> Time Slot
              </label>
              <select
                value={timeSlot}
                onChange={(e) => setTimeSlot(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:border-emerald-600"
              >
                <option value="11:00 AM (Morning Slot)">11:00 AM (Morning Slot)</option>
                <option value="03:00 PM (Afternoon Slot)">03:00 PM (Afternoon Slot)</option>
                <option value="05:00 PM (Gulf Evening)">05:00 PM (Gulf Evening)</option>
                <option value="08:30 PM (Night Slot)">08:30 PM (Night Slot)</option>
                <option value="11:00 PM (Late Night NRB Slot)">11:00 PM (Late Night NRB Slot)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Topics / Special Requests</label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs focus:outline-none focus:border-emerald-600 resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs py-3.5 rounded-xl shadow-lg transition flex items-center justify-center gap-2"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Open WhatsApp & Send Video Call Invitation</span>
          </button>
        </form>
      </div>
    </div>
  );
};
