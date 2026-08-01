import React, { useState } from 'react';
import { Property } from '../../types';
import { VirtualTourViewer } from '../common/VirtualTourViewer';
import { FloorPlanViewer } from '../common/FloorPlanViewer';
import { RealtimeCurrencyConverterTool } from '../common/RealtimeCurrencyConverterTool';
import {
  MapPin,
  Building2,
  Share2,
  Heart,
  CheckCircle2,
  Compass,
  FileText,
  Calendar,
  CreditCard,
  ShieldCheck,
  Eye,
  ExternalLink,
  Phone,
  ArrowLeft,
  ChevronRight,
  Sparkles,
  Award,
  Calculator,
  TrendingUp,
  Percent,
  Coins,
  PieChart,
} from 'lucide-react';

interface PropertyDetailsPageProps {
  property: Property;
  onBack: () => void;
  onOpenBookingModal: (type?: string, property?: Property) => void;
  onOpenBrochureModal: (project?: any) => void;
}

export const PropertyDetailsPage: React.FC<PropertyDetailsPageProps> = ({
  property,
  onBack,
  onOpenBookingModal,
  onOpenBrochureModal,
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isVirtualTourOpen, setIsVirtualTourOpen] = useState(false);
  const [isFloorPlanOpen, setIsFloorPlanOpen] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);

  // ROI & Investment Calculator State
  const [roiDownPaymentPercent, setRoiDownPaymentPercent] = useState(25);
  const [mortgageTermYears, setMortgageTermYears] = useState(15);
  const [interestRatePercent, setInterestRatePercent] = useState(8.5);
  const [rentalYieldPercent, setRentalYieldPercent] = useState(6.0);
  const [capitalAppreciationPercent, setCapitalAppreciationPercent] = useState(8.0);

  // Financial calculations for Easy Installment
  const priceBDT = property.priceBDT;
  const downPaymentBDT = (priceBDT * downPaymentPercent) / 100;
  const remainingBDT = priceBDT - downPaymentBDT;
  const monthlyInstallmentBDT = Math.round(remainingBDT / 48); // 4 years plan

  // Financial calculations for ROI & Investment Calculator
  const kwdRate = 386; // 1 KWD ≈ 386 BDT
  const roiDownPaymentBDT = (priceBDT * roiDownPaymentPercent) / 100;
  const loanPrincipalBDT = priceBDT - roiDownPaymentBDT;
  
  const monthlyRate = (interestRatePercent / 100) / 12;
  const totalMonths = mortgageTermYears * 12;
  
  const monthlyMortgageBDT =
    monthlyRate > 0
      ? (loanPrincipalBDT * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
        (Math.pow(1 + monthlyRate, totalMonths) - 1)
      : loanPrincipalBDT / totalMonths;

  const monthlyRentalIncomeBDT = (priceBDT * (rentalYieldPercent / 100)) / 12;
  const netMonthlyCashflowBDT = monthlyRentalIncomeBDT - monthlyMortgageBDT;
  
  // 5-Year Wealth Projections
  const fiveYearCapitalGrowth = priceBDT * Math.pow(1 + capitalAppreciationPercent / 100, 5) - priceBDT;
  const fiveYearNetRentalCashflow = netMonthlyCashflowBDT * 60;
  const totalFiveYearReturn = fiveYearCapitalGrowth + fiveYearNetRentalCashflow;
  const fiveYearRoiPercent = roiDownPaymentBDT > 0 ? (totalFiveYearReturn / roiDownPaymentBDT) * 100 : 0;

  return (
    <div className="bg-[#FDFCF8] min-h-screen pb-20 space-y-10">
      {/* Top Breadcrumb Header */}
      <div className="bg-[#F5F5F0] border-b border-[#E5E5DF] py-4 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-xs font-semibold text-[#5A5A40] hover:text-[#2D2926] transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Property Listings</span>
          </button>
          <div className="flex items-center gap-3 text-xs text-[#8C8C7F]">
            <span>Properties</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span>{property.location}</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-[#2D2926] font-semibold truncate max-w-[200px]">{property.title}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-10">
        {/* Title & Key Badge Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#E5E5DF] pb-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-[#5A5A40] text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                {property.category}
              </span>
              <span className="bg-[#8C715E] text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                {property.status}
              </span>
              {property.isPremium && (
                <span className="bg-amber-100 text-amber-900 border border-amber-300 text-[10px] font-extrabold px-3 py-1 rounded-full flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-600" /> Executive Class
                </span>
              )}
            </div>

            <h1 className="text-3xl sm:text-4xl font-serif text-[#2D2926] leading-tight">
              {property.title}
            </h1>

            <p className="text-xs sm:text-sm text-[#8C8C7F] flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-[#8C715E] shrink-0" />
              <span>{property.address}</span>
            </p>
          </div>

          <div className="text-left md:text-right space-y-2">
            <span className="block text-xs uppercase font-bold text-[#8C8C7F]">Total Investment</span>
            <div className="text-3xl font-extrabold text-[#5A5A40] font-serif">
              {property.priceFormatted}
            </div>
            <p className="text-[11px] text-[#8C8C7F]">
              ৳ {Math.round(priceBDT / (property.areaSqFt || 1)).toLocaleString()} / {property.areaUnit}
            </p>
          </div>
        </div>

        {/* Dynamic Real-Time Currency Conversion Tool */}
        <RealtimeCurrencyConverterTool
          priceBDT={priceBDT}
          areaSqFt={property.areaSqFt}
          areaUnit={property.areaUnit}
        />

        {/* Gallery & 360° Virtual Tour Feature Spotlight Bar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Gallery Viewport */}
          <div className="lg:col-span-8 space-y-4">
            <div className="relative h-[420px] rounded-3xl overflow-hidden border border-[#E5E5DF] shadow-md bg-[#2D2926] group">
              <img
                src={property.images[activeImageIndex] || property.images[0]}
                alt={property.title}
                className="w-full h-full object-cover transition duration-300"
                referrerPolicy="no-referrer"
              />

              {/* 360° Virtual Tour Banner Overlay */}
              <div className="absolute top-4 left-4 bg-[#2D2926]/90 backdrop-blur border border-[#5A5A40] text-white p-3 rounded-2xl shadow-xl flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#5A5A40] text-amber-300 flex items-center justify-center font-bold">
                  <Eye className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#8C715E] tracking-wider block">
                    Interactive 360° Panorama
                  </span>
                  <span className="text-xs font-semibold text-[#FDFCF8]">Explore full 360° interior walkthrough</span>
                </div>
                <button
                  onClick={() => setIsVirtualTourOpen(true)}
                  className="ml-2 px-3 py-1.5 bg-[#8C715E] hover:bg-[#745B4A] text-white text-xs font-bold rounded-lg transition"
                >
                  Launch 360°
                </button>
              </div>

              {/* Action Buttons Overlay */}
              <div className="absolute top-4 right-4 flex gap-2">
                <button
                  onClick={() => setIsSaved(!isSaved)}
                  className={`p-2.5 rounded-full backdrop-blur shadow-md transition ${
                    isSaved ? 'bg-rose-600 text-white' : 'bg-white/90 text-[#2D2926] hover:bg-white'
                  }`}
                >
                  <Heart className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    alert('Property link copied to clipboard!');
                  }}
                  className="p-2.5 rounded-full bg-white/90 text-[#2D2926] hover:bg-white backdrop-blur shadow-md transition"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Thumbnail Navigation & 360 / Floorplan Trigger Cards */}
            <div className="grid grid-cols-4 gap-3">
              {property.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative h-20 rounded-xl overflow-hidden border-2 transition ${
                    activeImageIndex === idx ? 'border-[#5A5A40] ring-2 ring-[#5A5A40]/30' : 'border-[#E5E5DF] opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </button>
              ))}
            </div>
          </div>

          {/* Quick Booking & Direct Action Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-[#FDFCF8] p-6 rounded-3xl border border-[#E5E5DF] shadow-md space-y-6">
              <div className="border-b border-[#E5E5DF] pb-4">
                <h3 className="font-serif text-lg text-[#2D2926]">Schedule Site Visit & Inquiry</h3>
                <p className="text-xs text-[#8C8C7F] mt-1">
                  Complimentary chauffeur pickup available from Sukoon Corporate Tower, Gulshan 2.
                </p>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => onOpenBookingModal('Site Visit Appointment', property)}
                  className="w-full py-3.5 bg-[#5A5A40] hover:bg-[#484833] text-white font-medium text-xs rounded-xl shadow-md transition flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4 text-[#FDFCF8]" />
                  <span>Book Free VIP Site Visit</span>
                </button>

                <button
                  onClick={() => onOpenBookingModal('Plot Reservation', property)}
                  className="w-full py-3.5 bg-[#8C715E] hover:bg-[#745B4A] text-white font-medium text-xs rounded-xl shadow-md transition flex items-center justify-center gap-2"
                >
                  <CreditCard className="w-4 h-4 text-white" />
                  <span>Reserve Unit (bKash Deposit)</span>
                </button>

                <button
                  onClick={() => setIsVirtualTourOpen(true)}
                  className="w-full py-3 bg-[#F5F5F0] hover:bg-[#E5E5DF] text-[#2D2926] font-semibold text-xs rounded-xl border border-[#E5E5DF] transition flex items-center justify-center gap-2"
                >
                  <Eye className="w-4 h-4 text-[#5A5A40]" />
                  <span>Interactive 360° Virtual Tour</span>
                </button>
              </div>

              {/* External Provider Link Box */}
              <div className="bg-[#F5F5F0] p-4 rounded-2xl border border-[#E5E5DF] text-xs space-y-2">
                <div className="flex items-center justify-between text-[#2D2926] font-bold">
                  <span>Matterport 360° Provider</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#8C715E]" />
                </div>
                <p className="text-[#8C8C7F] text-[11px]">
                  View HD 3D Dollhouse Model hosted on Matterport Cloud for Sukoon Properties Ltd.
                </p>
                <a
                  href="https://matterport.com"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block text-[11px] font-bold text-[#5A5A40] hover:underline"
                >
                  Open External Matterport 360° Link &rarr;
                </a>
              </div>

              {/* Direct Director Contact Desk */}
              <div className="pt-2 border-t border-[#E5E5DF] flex items-center gap-3 text-xs">
                <div className="w-10 h-10 rounded-full bg-[#5A5A40] text-white flex items-center justify-center font-bold text-sm">
                  RM
                </div>
                <div>
                  <p className="font-bold text-[#2D2926]">Rayhanul Mobarak</p>
                  <p className="text-[11px] text-[#8C8C7F]">Managing Director, Sukoon Properties</p>
                  <a href="tel:+8801913780386" className="text-[11px] text-[#8C715E] font-bold flex items-center gap-1 mt-0.5">
                    <Phone className="w-3 h-3" /> +880 1913-780386
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Property Specs & Highlights */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-[#F5F5F0] p-6 rounded-3xl border border-[#E5E5DF]">
          <div className="space-y-1">
            <span className="text-[10px] uppercase font-bold text-[#8C8C7F]">Total Area</span>
            <p className="font-serif text-xl font-bold text-[#2D2926]">
              {property.areaSqFt} {property.areaUnit}
            </p>
          </div>
          <div className="space-y-1">
            <span className="text-[10px] uppercase font-bold text-[#8C8C7F]">Bedrooms / Layout</span>
            <p className="font-serif text-xl font-bold text-[#2D2926]">
              {property.bedrooms ? `${property.bedrooms} Beds` : property.type}
            </p>
          </div>
          <div className="space-y-1">
            <span className="text-[10px] uppercase font-bold text-[#8C8C7F]">Facing Direction</span>
            <p className="font-serif text-xl font-bold text-[#2D2926]">
              {property.facing || 'South Facing'}
            </p>
          </div>
          <div className="space-y-1">
            <span className="text-[10px] uppercase font-bold text-[#8C8C7F]">RAJA Legal Status</span>
            <p className="font-serif text-xl font-bold text-[#5A5A40]">
              {property.approvalStatus || '100% Mutated'}
            </p>
          </div>
        </div>

        {/* 360° Virtual Tour Full Interactive Feature Section */}
        <section className="bg-[#2D2926] text-white p-8 sm:p-12 rounded-3xl shadow-xl space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#5A5A40]/50 pb-6">
            <div>
              <span className="text-xs font-bold text-[#8C715E] uppercase tracking-widest">
                Immersive Experience
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif text-[#FDFCF8] mt-1">
                360° Virtual Panorama Walkthrough
              </h2>
              <p className="text-xs sm:text-sm text-[#E5E5DF]/80 mt-1 max-w-xl">
                Experience this unit from the comfort of your screen. Pan across every corner, check sunlight orientations, and view layout perspectives.
              </p>
            </div>
            <button
              onClick={() => setIsVirtualTourOpen(true)}
              className="px-6 py-3 bg-[#8C715E] hover:bg-[#745B4A] text-white font-medium text-xs rounded-full shadow transition flex items-center gap-2 shrink-0"
            >
              <Compass className="w-4 h-4 text-amber-300" />
              <span>Full Screen 360° Tour</span>
            </button>
          </div>

          <div className="relative h-80 rounded-2xl overflow-hidden border border-[#5A5A40] bg-black">
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80"
              alt="360 Tour Preview"
              className="w-full h-full object-cover opacity-80"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40 flex items-center justify-center">
              <button
                onClick={() => setIsVirtualTourOpen(true)}
                className="w-16 h-16 rounded-full bg-[#5A5A40] text-white flex items-center justify-center shadow-2xl hover:scale-110 transition border-2 border-[#8C715E]"
              >
                <Eye className="w-8 h-8" />
              </button>
            </div>
            <div className="absolute bottom-4 left-4 bg-[#2D2926]/80 text-xs text-[#E5E5DF] px-3 py-1.5 rounded-full border border-[#5A5A40]">
              Click center icon or button above to start 360° navigation
            </div>
          </div>
        </section>

        {/* bKash & Bank Installment Calculator */}
        <section className="bg-[#FDFCF8] p-8 rounded-3xl border border-[#E5E5DF] shadow-sm space-y-6">
          <div className="border-b border-[#E5E5DF] pb-4">
            <h3 className="font-serif text-xl text-[#2D2926]">Sukoon Easy Installment Calculator</h3>
            <p className="text-xs text-[#8C8C7F] mt-1">
              Calculate down payment and monthly installment breakdown (0% interest options available).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#2D2926] mb-1">
                  Down Payment Percentage ({downPaymentPercent}%)
                </label>
                <input
                  type="range"
                  min="10"
                  max="50"
                  step="5"
                  value={downPaymentPercent}
                  onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                  className="w-full accent-[#5A5A40]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs">
                <div className="bg-[#F5F5F0] p-3 rounded-xl border border-[#E5E5DF]">
                  <span className="text-[#8C8C7F] text-[10px] uppercase font-bold block">Down Payment</span>
                  <span className="font-serif text-lg font-bold text-[#5A5A40]">
                    ৳ {(downPaymentBDT / 100000).toFixed(2)} Lakh
                  </span>
                </div>
                <div className="bg-[#F5F5F0] p-3 rounded-xl border border-[#E5E5DF]">
                  <span className="text-[#8C8C7F] text-[10px] uppercase font-bold block">Est. Monthly (48 mos)</span>
                  <span className="font-serif text-lg font-bold text-[#8C715E]">
                    ৳ {monthlyInstallmentBDT.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-[#5A5A40] text-white p-6 rounded-2xl space-y-3">
              <div className="flex items-center gap-2 text-[#E5E5DF] font-bold text-xs">
                <ShieldCheck className="w-5 h-5 text-amber-300" />
                <span>bKash & SSLCommerz Digital Booking</span>
              </div>
              <p className="text-xs text-[#E5E5DF]/90">
                Pay token booking of ৳ 50,000 to ৳ 500,000 instantly to lock this property deed under your name.
              </p>
              <button
                onClick={() => onOpenBookingModal('Plot Reservation', property)}
                className="w-full py-2.5 bg-[#8C715E] hover:bg-[#745B4A] text-white font-bold text-xs rounded-xl shadow transition"
              >
                Proceed to Online Token Payment
              </button>
            </div>
          </div>
        </section>

        {/* ROI & Investment Yield Calculator Widget */}
        <section className="bg-gradient-to-br from-slate-900 via-slate-850 to-[#2D2926] text-white p-6 sm:p-8 rounded-3xl border border-amber-900/30 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-700/80 pb-5">
            <div>
              <div className="flex items-center gap-2">
                <span className="bg-amber-500/20 text-amber-300 text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-amber-500/30 flex items-center gap-1">
                  <Calculator className="w-3.5 h-3.5 text-amber-400" /> Executive Financial Suite
                </span>
                <span className="bg-emerald-950 text-emerald-300 text-[10px] font-mono px-2 py-0.5 rounded border border-emerald-700/50">
                  1 KWD ≈ 386 BDT
                </span>
              </div>
              <h3 className="font-serif text-2xl font-bold text-white mt-2">
                ROI & Rental Yield Investment Estimator
              </h3>
              <p className="text-xs text-slate-300 mt-1">
                Customize down payment, bank interest, rental yield, and growth rate to forecast monthly cashflow and 5-year wealth accumulation.
              </p>
            </div>
            <div className="text-left sm:text-right bg-slate-800/80 p-3 rounded-2xl border border-slate-700 min-w-[200px]">
              <span className="text-[10px] uppercase font-bold text-amber-300 block">Property Valuation</span>
              <span className="font-serif text-2xl font-bold text-white">
                ৳ {(priceBDT / 100000).toFixed(2)} Lakh
              </span>
              <span className="text-xs text-emerald-400 block font-mono font-medium">
                ≈ {(priceBDT / kwdRate).toLocaleString(undefined, { maximumFractionDigits: 0 })} KWD
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Input Controls Column */}
            <div className="lg:col-span-7 space-y-5 bg-slate-800/50 p-5 rounded-2xl border border-slate-700/60">
              {/* 1. Down Payment */}
              <div>
                <div className="flex justify-between items-center text-xs mb-1.5 font-bold">
                  <span className="text-slate-200">Initial Down Payment ({roiDownPaymentPercent}%)</span>
                  <span className="text-amber-400 font-mono">
                    ৳ {(roiDownPaymentBDT / 100000).toFixed(2)} Lakh ({(roiDownPaymentBDT / kwdRate).toFixed(0)} KWD)
                  </span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="50"
                  step="5"
                  value={roiDownPaymentPercent}
                  onChange={(e) => setRoiDownPaymentPercent(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer h-2 bg-slate-700 rounded-lg"
                />
              </div>

              {/* 2. Mortgage Term */}
              <div>
                <label className="block text-xs font-bold text-slate-200 mb-1.5">
                  Loan / Bank Financing Term (Years)
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {[5, 10, 15, 20, 25].map((yrs) => (
                    <button
                      key={yrs}
                      type="button"
                      onClick={() => setMortgageTermYears(yrs)}
                      className={`py-2 text-xs font-bold rounded-xl border transition ${
                        mortgageTermYears === yrs
                          ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md'
                          : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-750'
                      }`}
                    >
                      {yrs} Yrs
                    </button>
                  ))}
                </div>
              </div>

              {/* 3. Interest Rate & Rental Yield Sliders */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-700">
                  <div className="flex justify-between text-xs font-bold text-slate-300 mb-1">
                    <span>Bank Interest Rate</span>
                    <span className="text-emerald-400">{interestRatePercent}% / yr</span>
                  </div>
                  <input
                    type="range"
                    min="5.0"
                    max="14.0"
                    step="0.5"
                    value={interestRatePercent}
                    onChange={(e) => setInterestRatePercent(Number(e.target.value))}
                    className="w-full accent-emerald-500 cursor-pointer h-1.5 bg-slate-700 rounded-lg"
                  />
                  <p className="text-[10px] text-slate-400 mt-1">Standard bank mortgage rate</p>
                </div>

                <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-700">
                  <div className="flex justify-between text-xs font-bold text-slate-300 mb-1">
                    <span>Expected Rental Yield</span>
                    <span className="text-amber-400">{rentalYieldPercent}% / yr</span>
                  </div>
                  <input
                    type="range"
                    min="3.0"
                    max="10.0"
                    step="0.5"
                    value={rentalYieldPercent}
                    onChange={(e) => setRentalYieldPercent(Number(e.target.value))}
                    className="w-full accent-amber-500 cursor-pointer h-1.5 bg-slate-700 rounded-lg"
                  />
                  <p className="text-[10px] text-slate-400 mt-1">Annual rent relative to property value</p>
                </div>
              </div>

              {/* 4. Capital Appreciation */}
              <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-700">
                <div className="flex justify-between text-xs font-bold text-slate-300 mb-1">
                  <span>Annual Land & Property Appreciation Rate</span>
                  <span className="text-teal-300">{capitalAppreciationPercent}% / yr</span>
                </div>
                <input
                  type="range"
                  min="4.0"
                  max="15.0"
                  step="0.5"
                  value={capitalAppreciationPercent}
                  onChange={(e) => setCapitalAppreciationPercent(Number(e.target.value))}
                  className="w-full accent-teal-400 cursor-pointer h-1.5 bg-slate-700 rounded-lg"
                />
                <p className="text-[10px] text-slate-400 mt-1">Average growth for Purbachal & Gulshan zones is 8-12% per year</p>
              </div>
            </div>

            {/* Calculations & Output Column */}
            <div className="lg:col-span-5 space-y-4 flex flex-col justify-between">
              {/* Output Metric Cards */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-800/90 p-4 rounded-2xl border border-slate-700">
                  <span className="text-[10px] font-bold uppercase text-slate-400 block mb-1">Est. Monthly Rent</span>
                  <span className="text-lg font-bold text-emerald-400 font-mono">
                    ৳ {Math.round(monthlyRentalIncomeBDT).toLocaleString()}
                  </span>
                  <span className="text-[11px] text-slate-400 block mt-0.5">
                    ≈ {(monthlyRentalIncomeBDT / kwdRate).toFixed(0)} KWD / mo
                  </span>
                </div>

                <div className="bg-slate-800/90 p-4 rounded-2xl border border-slate-700">
                  <span className="text-[10px] font-bold uppercase text-slate-400 block mb-1">Est. Monthly Mortgage</span>
                  <span className="text-lg font-bold text-amber-300 font-mono">
                    ৳ {Math.round(monthlyMortgageBDT).toLocaleString()}
                  </span>
                  <span className="text-[11px] text-slate-400 block mt-0.5">
                    ({mortgageTermYears} yrs @ {interestRatePercent}%)
                  </span>
                </div>
              </div>

              {/* Net Cash Flow Banner */}
              <div
                className={`p-4 rounded-2xl border flex items-center justify-between ${
                  netMonthlyCashflowBDT >= 0
                    ? 'bg-emerald-950/70 border-emerald-600/50 text-emerald-100'
                    : 'bg-slate-800 border-slate-700 text-slate-200'
                }`}
              >
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-slate-300 block">
                    Net Monthly Cash Flow
                  </span>
                  <span className="text-xl font-extrabold font-mono">
                    {netMonthlyCashflowBDT >= 0 ? '+' : ''}৳ {Math.round(netMonthlyCashflowBDT).toLocaleString()} / mo
                  </span>
                  <span className="text-[11px] text-slate-300 block">
                    {netMonthlyCashflowBDT >= 0
                      ? `🟢 Positive monthly passive income`
                      : `🔵 Monthly self-funding equity contribution`}
                  </span>
                </div>
                <TrendingUp
                  className={`w-8 h-8 ${netMonthlyCashflowBDT >= 0 ? 'text-emerald-400' : 'text-blue-400'}`}
                />
              </div>

              {/* 5-Year Net ROI Highlight */}
              <div className="bg-gradient-to-r from-amber-600 to-amber-700 text-slate-950 p-5 rounded-2xl shadow-xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-amber-950">
                    5-Year Estimated Capital ROI
                  </span>
                  <span className="bg-slate-950 text-amber-300 px-2.5 py-0.5 rounded-full text-xs font-mono font-bold">
                    +{fiveYearRoiPercent.toFixed(1)}% ROI
                  </span>
                </div>
                <div className="flex items-baseline justify-between pt-1">
                  <div>
                    <span className="text-[10px] text-slate-900 font-bold block">Total 5-Year Return Growth</span>
                    <span className="text-2xl font-black font-serif text-slate-950">
                      ৳ {(totalFiveYearReturn / 100000).toFixed(2)} Lakh
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-900 font-bold block">In KWD</span>
                    <span className="text-sm font-mono font-bold text-slate-950">
                      ≈ {(totalFiveYearReturn / kwdRate).toLocaleString(undefined, { maximumFractionDigits: 0 })} KWD
                    </span>
                  </div>
                </div>
                <p className="text-[10px] text-slate-900/90 pt-1 border-t border-slate-950/20 font-medium">
                  Includes estimated land appreciation of ৳ {(fiveYearCapitalGrowth / 100000).toFixed(2)} Lakh over 5 years.
                </p>
              </div>

              <button
                onClick={() => onOpenBookingModal('ROI Consultation', property)}
                className="w-full py-3 bg-[#8C715E] hover:bg-[#745B4A] text-white font-bold text-xs rounded-xl shadow-lg transition flex items-center justify-center gap-2"
              >
                <Coins className="w-4 h-4 text-amber-300" />
                <span>Book Free Financial Consultation with Director Desk</span>
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* Virtual Tour Modal */}
      <VirtualTourViewer
        isOpen={isVirtualTourOpen}
        onClose={() => setIsVirtualTourOpen(false)}
        propertyTitle={property.title}
      />

      {/* Floor Plan Modal */}
      <FloorPlanViewer
        isOpen={isFloorPlanOpen}
        onClose={() => setIsFloorPlanOpen(false)}
        propertyTitle={property.title}
      />
    </div>
  );
};
