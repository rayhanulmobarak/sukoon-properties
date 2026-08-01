import React, { useState } from 'react';
import { Property } from '../../types';
import {
  X,
  Calendar,
  Clock,
  Car,
  CreditCard,
  ShieldCheck,
  CheckCircle,
  Building2,
  FileText,
  User,
  Phone,
  Mail,
  MapPin,
  Lock,
} from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  property?: Property | null;
  defaultType?: string;
  onBookingSuccess: (bookingData: any) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  property,
  defaultType = 'Site Visit Appointment',
  onBookingSuccess,
}) => {
  const [step, setStep] = useState<'details' | 'payment' | 'confirmation'>('details');
  const [bookingType, setBookingType] = useState<string>(defaultType);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [visitDate, setVisitDate] = useState('2026-08-05');
  const [timeSlot, setTimeSlot] = useState('11:00 AM');
  const [vehiclePickup, setVehiclePickup] = useState(true);
  
  // Payment fields
  const [paymentMethod, setPaymentMethod] = useState<
    'bKash' | 'Nagad' | 'Rocket' | 'EFTN Bank Transfer' | 'NPSB Realtime Bank' | 'SSLCommerz' | 'Stripe' | 'Visa/Mastercard'
  >('bKash');
  const [accountNumber, setAccountNumber] = useState('');
  const [pin, setPin] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<any>(null);

  if (!isOpen) return null;

  const depositAmountBDT = bookingType === 'Plot Reservation' ? 500000 : bookingType === 'Property Purchase' ? 1000000 : 0;

  const handleSubmitDetails = (e: React.FormEvent) => {
    e.preventDefault();
    if (depositAmountBDT > 0) {
      setStep('payment');
    } else {
      processBooking();
    }
  };

  const processBooking = async () => {
    setIsProcessing(true);
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          propertyId: property?.id || 'prop_001',
          propertyTitle: property?.title || 'Sukoon Smart Housing Project',
          propertyLocation: property?.location || 'Purbachal Smart City',
          userName: name || 'Rayhanul Mobarak Client',
          userEmail: email || 'sukoonpropertiesltd@gmail.com',
          userPhone: phone || '+880 1913-780386',
          bookingType,
          visitDate,
          timeSlot,
          vehiclePickupRequested: vehiclePickup,
          amountPaidBDT: depositAmountBDT,
          totalPriceBDT: property?.priceBDT || 4500000,
          paymentMethod,
        }),
      });

      const data = await res.json();
      setIsProcessing(false);
      if (data.success) {
        setConfirmedBooking(data.booking);
        onBookingSuccess(data.booking);
        setStep('confirmation');
      }
    } catch (err) {
      setIsProcessing(false);
      // Fallback local booking
      const fallbackBooking = {
        bookingCode: `SUK-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        propertyTitle: property?.title || 'Sukoon Housing Project',
        userName: name || 'Client',
        visitDate,
        timeSlot,
        amountPaidBDT: depositAmountBDT,
        paymentMethod,
        transactionId: `TXN${Math.floor(10000000 + Math.random() * 90000000)}`,
      };
      setConfirmedBooking(fallbackBooking);
      setStep('confirmation');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-xl w-full shadow-2xl overflow-hidden border border-slate-200 animate-in fade-in duration-200 my-8">
        {/* Modal Header */}
        <div className="bg-slate-900 text-white p-6 flex items-center justify-between relative">
          <div>
            <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider mb-1">
              <Building2 className="w-4 h-4" />
              <span>Sukoon Properties Ltd. Booking Engine</span>
            </div>
            <h3 className="font-extrabold text-xl">{bookingType}</h3>
            {property && <p className="text-xs text-slate-300 mt-0.5 max-w-md truncate">{property.title}</p>}
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {/* Step 1: Details Form */}
          {step === 'details' && (
            <form onSubmit={handleSubmitDetails} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Booking Category
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    'Site Visit Appointment',
                    'Plot Reservation',
                    'Property Purchase',
                  ].map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setBookingType(t)}
                      className={`py-2 px-3 rounded-lg text-xs font-semibold border text-center transition ${
                        bookingType === t
                          ? 'bg-emerald-800 text-white border-emerald-800 shadow'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {t === 'Site Visit Appointment' ? 'Site Visit' : t === 'Plot Reservation' ? 'Reserve Plot' : 'Buy Now'}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-emerald-700" /> Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Dr. Shahriar Rahman"
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-emerald-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-emerald-700" /> Mobile Number (+880) *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+880 1913-780386"
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-emerald-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-emerald-700" /> Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="client@sukoonproperties.com"
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-emerald-600"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-emerald-700" /> Preferred Visit Date
                  </label>
                  <input
                    type="date"
                    value={visitDate}
                    onChange={(e) => setVisitDate(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-emerald-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-emerald-700" /> Time Slot
                  </label>
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-emerald-600"
                  >
                    <option value="10:00 AM">10:00 AM Morning</option>
                    <option value="11:30 AM">11:30 AM Morning</option>
                    <option value="02:30 PM">02:30 PM Afternoon</option>
                    <option value="04:00 PM">04:00 PM Evening</option>
                  </select>
                </div>
              </div>

              {/* Pickup Option */}
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Car className="w-5 h-5 text-emerald-700 shrink-0" />
                  <div>
                    <h5 className="font-semibold text-xs text-emerald-950">Free Chauffeur Pickup from HQ</h5>
                    <p className="text-[11px] text-emerald-800">Sukoon microbus will pick you up from Gulshan HQ.</p>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={vehiclePickup}
                  onChange={(e) => setVehiclePickup(e.target.checked)}
                  className="w-4 h-4 text-emerald-700 accent-emerald-800 rounded"
                />
              </div>

              {depositAmountBDT > 0 && (
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex items-center justify-between text-xs text-amber-900 font-medium">
                  <span>Required Booking Deposit:</span>
                  <span className="font-extrabold text-sm text-amber-950">৳ {depositAmountBDT.toLocaleString()} BDT</span>
                </div>
              )}

              <div className="pt-3">
                <button
                  type="submit"
                  className="w-full bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-sm py-3 rounded-xl shadow-md transition flex items-center justify-center gap-2"
                >
                  <span>{depositAmountBDT > 0 ? 'Proceed to Secure Payment Gateway →' : 'Confirm Free Site Visit Booking'}</span>
                </button>
              </div>
            </form>
          )}

          {/* Step 2: Payment Gateway Simulation */}
          {step === 'payment' && (
            <div className="space-y-4">
              <div className="bg-slate-900 text-white p-4 rounded-xl flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-400">Total Booking Token Deposit</p>
                  <p className="text-xl font-extrabold text-amber-400">৳ {depositAmountBDT.toLocaleString()} BDT</p>
                </div>
                <span className="text-xs bg-emerald-800 text-emerald-200 px-2.5 py-1 rounded font-semibold border border-emerald-600/50">
                  256-Bit SSL Encrypted
                </span>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Select Payment Partner (Bangladesh Interbank / Mobile Banking / Global)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {(
                    [
                      'EFTN Bank Transfer',
                      'NPSB Realtime Bank',
                      'bKash',
                      'Nagad',
                      'Rocket',
                      'SSLCommerz',
                      'Stripe',
                      'Visa/Mastercard',
                    ] as const
                  ).map((method) => (
                    <button
                      key={method}
                      type="button"
                      onClick={() => setPaymentMethod(method)}
                      className={`p-2.5 rounded-xl border text-xs font-bold transition flex flex-col items-center justify-center text-center gap-0.5 ${
                        paymentMethod === method
                          ? 'border-emerald-700 bg-emerald-50 text-emerald-950 shadow-sm ring-1 ring-emerald-600'
                          : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {method === 'EFTN Bank Transfer' && <span className="text-emerald-700 font-extrabold">🏦 EFTN Bank Transfer</span>}
                      {method === 'NPSB Realtime Bank' && <span className="text-teal-700 font-extrabold">⚡ NPSB Instant Bank</span>}
                      {method === 'bKash' && <span className="text-pink-600">bKash (bkash.com)</span>}
                      {method === 'Nagad' && <span className="text-orange-600">Nagad Pay</span>}
                      {method === 'Rocket' && <span className="text-purple-600">DBBL Rocket</span>}
                      {method === 'SSLCommerz' && <span className="text-blue-600">SSLCommerz BD</span>}
                      {method === 'Stripe' && <span className="text-indigo-600">Stripe Global</span>}
                      {method === 'Visa/Mastercard' && <span className="text-slate-800">Debit / Credit Card</span>}
                    </button>
                  ))}
                </div>
              </div>

              {/* EFTN / NPSB Official Bank Account Banner */}
              {(paymentMethod === 'EFTN Bank Transfer' || paymentMethod === 'NPSB Realtime Bank') && (
                <div className="bg-slate-900 text-slate-100 p-4 rounded-xl border border-emerald-700/60 text-xs space-y-3 shadow-inner">
                  <div className="flex items-center justify-between font-bold text-amber-300 border-b border-slate-700 pb-2">
                    <span className="flex items-center gap-1.5">
                      <Building2 className="w-4 h-4 text-emerald-400" />
                      <span>Official Corporate Bank Accounts ({paymentMethod})</span>
                    </span>
                    <span className="bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded text-[10px]">
                      EFTN & NPSB Enabled
                    </span>
                  </div>

                  {/* Account 1: Islami Bank Bangladesh PLC */}
                  <div className="bg-slate-800/80 p-3 rounded-lg border border-slate-700 space-y-1">
                    <div className="flex items-center justify-between text-emerald-400 font-bold text-xs">
                      <span>1. Islami Bank Bangladesh PLC (ইসলামী ব্যাংক)</span>
                      <span className="text-[10px] text-slate-300 bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-700/50">
                        Sonargaon Branch, Narayanganj
                      </span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11px] pt-1">
                      <div>
                        <p className="text-slate-400">Account Name:</p>
                        <p className="font-bold text-white">Sukoon Properties Ltd.</p>
                      </div>
                      <div>
                        <p className="text-slate-400">A/C Number:</p>
                        <p className="font-mono font-bold text-amber-400 text-xs">20500200200220114</p>
                      </div>
                      <div>
                        <p className="text-slate-400">Routing Number:</p>
                        <p className="font-mono text-emerald-300 text-xs">125261803</p>
                      </div>
                    </div>
                  </div>

                  {/* Account 2: Trust Bank PLC */}
                  <div className="bg-slate-800/80 p-3 rounded-lg border border-slate-700 space-y-1">
                    <div className="flex items-center justify-between text-teal-300 font-bold text-xs">
                      <span>2. Trust Bank PLC (ট্রাস্ট ব্যাংক)</span>
                      <span className="text-[10px] text-slate-300 bg-teal-950/60 px-1.5 py-0.5 rounded border border-teal-700/50">
                        Kanchpur Branch, Narayanganj
                      </span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11px] pt-1">
                      <div>
                        <p className="text-slate-400">Account Name:</p>
                        <p className="font-bold text-white">Sukoon Properties Ltd.</p>
                      </div>
                      <div>
                        <p className="text-slate-400">A/C Number:</p>
                        <p className="font-mono font-bold text-amber-400 text-xs">70170311285596</p>
                      </div>
                      <div>
                        <p className="text-slate-400">Routing Number:</p>
                        <p className="font-mono text-teal-300 text-xs">240261140</p>
                      </div>
                    </div>
                  </div>

                  <p className="text-[10px] text-emerald-400 pt-1 border-t border-slate-800">
                    {paymentMethod === 'EFTN Bank Transfer'
                      ? 'ℹ️ EFTN: Transfer funds from any scheduled bank in Bangladesh directly to our Islami Bank (Sonargaon Branch) or Trust Bank (Kanchpur Branch) account.'
                      : '⚡ NPSB: Instant 24/7 interbank transfer using CellFin, Trust Money, Citytouch, EBL Skybanking, Astha apps.'}
                  </p>
                </div>
              )}

              {/* Account Number & PIN Simulation */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {paymentMethod === 'EFTN Bank Transfer' || paymentMethod === 'NPSB Realtime Bank'
                      ? `Remitting Bank Name & Account Number`
                      : paymentMethod === 'bKash' || paymentMethod === 'Nagad' || paymentMethod === 'Rocket'
                      ? `${paymentMethod} Account Mobile Number`
                      : 'Card / Account Holder Name'}
                  </label>
                  <input
                    type="text"
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value)}
                    placeholder={
                      paymentMethod.includes('Bank')
                        ? 'e.g. City Bank A/C 205-119-0386'
                        : paymentMethod === 'bKash'
                        ? '01913780386'
                        : 'Account Details'
                    }
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-emerald-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center justify-between">
                    <span>
                      {paymentMethod.includes('Bank')
                        ? 'Bank Transaction Reference / UTR Number'
                        : paymentMethod.includes('bKash') || paymentMethod.includes('Nagad')
                        ? 'PIN Code (Simulator: 1234)'
                        : 'CVV / Security PIN'}
                    </span>
                    <Lock className="w-3 h-3 text-slate-400" />
                  </label>
                  <input
                    type="text"
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                    placeholder={paymentMethod.includes('Bank') ? 'e.g. EFTN-99812039' : '****'}
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-emerald-600"
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setStep('details')}
                  className="w-1/3 bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold text-xs py-2.5 rounded-xl transition"
                >
                  ← Back
                </button>
                <button
                  type="button"
                  disabled={isProcessing}
                  onClick={processBooking}
                  className="w-2/3 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs py-2.5 rounded-xl shadow-md transition flex items-center justify-center gap-2"
                >
                  {isProcessing ? (
                    <span>Processing Payment via {paymentMethod}...</span>
                  ) : (
                    <>
                      <ShieldCheck className="w-4 h-4 text-amber-300" />
                      <span>Confirm & Pay ৳ {depositAmountBDT.toLocaleString()}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Confirmation */}
          {step === 'confirmation' && confirmedBooking && (
            <div className="text-center space-y-4 py-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle className="w-10 h-10" />
              </div>
              <div>
                <span className="text-xs bg-emerald-100 text-emerald-900 font-bold px-3 py-1 rounded-full border border-emerald-300">
                  BOOKING CONFIRMED
                </span>
                <h4 className="font-extrabold text-xl text-slate-900 mt-2">
                  {confirmedBooking.bookingCode}
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  Thank you for booking with Sukoon Properties Ltd.! Director Rayhanul Mobarak's executive team has received your request.
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-left text-xs space-y-2">
                <div className="flex justify-between border-b border-slate-200 pb-1.5">
                  <span className="text-slate-500">Property:</span>
                  <span className="font-bold text-slate-900 max-w-[200px] truncate">{confirmedBooking.propertyTitle}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-1.5">
                  <span className="text-slate-500">Scheduled Date:</span>
                  <span className="font-semibold text-slate-800">{confirmedBooking.visitDate} ({confirmedBooking.timeSlot})</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-1.5">
                  <span className="text-slate-500">Amount Paid:</span>
                  <span className="font-bold text-emerald-700">৳ {confirmedBooking.amountPaidBDT.toLocaleString()} BDT ({confirmedBooking.paymentMethod || 'Free Site Visit'})</span>
                </div>
                {confirmedBooking.transactionId && (
                  <div className="flex justify-between">
                    <span className="text-slate-500">Transaction ID:</span>
                    <span className="font-mono text-slate-800">{confirmedBooking.transactionId}</span>
                  </div>
                )}
              </div>

              <div className="pt-2">
                <button
                  onClick={onClose}
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs py-3 rounded-xl transition"
                >
                  Close & View Booking in My Portal
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
