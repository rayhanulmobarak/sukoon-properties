import React, { useState } from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import { MapPin, Grid, CheckCircle2, ShieldAlert, Sparkles, Filter, Layers, Eye, Check, X, ArrowUpRight } from 'lucide-react';

export interface MasterplotItem {
  id: string;
  plotNumber: string;
  sector: string;
  sizeKatha: number;
  facing: 'South' | 'North' | 'Lake View' | 'Corner Plot' | 'East';
  priceBDT: number;
  status: 'Available' | 'Reserved' | 'Sold Out';
  dimensions: string;
  roadWidth: string;
  highlights: string[];
}

export const MASTER_PLOTS: MasterplotItem[] = [
  { id: 'p-101', plotNumber: 'A-101', sector: 'Sector 1 (Eco Smart)', sizeKatha: 5, facing: 'Lake View', priceBDT: 32500000, status: 'Available', dimensions: "60' x 45'", roadWidth: '60 Feet Wide Road', highlights: ['Front Lake View', 'Underground Electric Line', 'LEED Eco Certified'] },
  { id: 'p-102', plotNumber: 'A-102', sector: 'Sector 1 (Eco Smart)', sizeKatha: 5, facing: 'South', priceBDT: 29500000, status: 'Available', dimensions: "60' x 45'", roadWidth: '40 Feet Wide Road', highlights: ['100% South Facing', 'Beside Central Mosque', 'Ready Mutation'] },
  { id: 'p-103', plotNumber: 'A-103', sector: 'Sector 1 (Eco Smart)', sizeKatha: 10, facing: 'Corner Plot', priceBDT: 68000000, status: 'Reserved', dimensions: "80' x 67.5'", roadWidth: '80 Feet Avenue Road', highlights: ['Double Road Corner', 'Ideal for Duplex Villa', 'Prime Location'] },
  { id: 'p-104', plotNumber: 'A-104', sector: 'Sector 1 (Eco Smart)', sizeKatha: 3, facing: 'North', priceBDT: 18500000, status: 'Sold Out', dimensions: "50' x 32.4'", roadWidth: '30 Feet Road', highlights: ['Park Facing', 'Ready Handover'] },
  { id: 'p-201', plotNumber: 'B-201', sector: 'Sector 2 (Executive Block)', sizeKatha: 5, facing: 'South', priceBDT: 31000000, status: 'Available', dimensions: "60' x 45'", roadWidth: '50 Feet Road', highlights: ['Executive Block', 'Near Sports Club', 'Green Belt Attached'] },
  { id: 'p-202', plotNumber: 'B-202', sector: 'Sector 2 (Executive Block)', sizeKatha: 5, facing: 'Lake View', priceBDT: 34000000, status: 'Available', dimensions: "60' x 45'", roadWidth: '60 Feet Lake Road', highlights: ['Unobstructed Lake View', 'Solar Microgrid Ready', 'VIP Gate Entry'] },
  { id: 'p-203', plotNumber: 'B-203', sector: 'Sector 2 (Executive Block)', sizeKatha: 3, facing: 'East', priceBDT: 19500000, status: 'Reserved', dimensions: "50' x 32.4'", roadWidth: '40 Feet Road', highlights: ['Morning Sunlight', 'High Elevation'] },
  { id: 'p-204', plotNumber: 'B-204', sector: 'Sector 2 (Executive Block)', sizeKatha: 10, facing: 'South', priceBDT: 65000000, status: 'Sold Out', dimensions: "80' x 67.5'", roadWidth: '60 Feet Road', highlights: ['Palatial Estate Plot', 'Private Security Post'] },
  { id: 'p-301', plotNumber: 'C-301', sector: 'Sector 3 (Commercial Zone)', sizeKatha: 10, facing: 'Corner Plot', priceBDT: 85000000, status: 'Available', dimensions: "80' x 67.5'", roadWidth: '100 Feet Boulevard', highlights: ['Commercial High-Rise Permitted', 'Main 300ft Highway Access', 'High Footfall'] },
  { id: 'p-302', plotNumber: 'C-302', sector: 'Sector 3 (Commercial Zone)', sizeKatha: 5, facing: 'South', priceBDT: 42000000, status: 'Available', dimensions: "60' x 45'", roadWidth: '60 Feet Road', highlights: ['Corporate Office Zone', 'Underground Fiber Optic'] },
  { id: 'p-303', plotNumber: 'C-303', sector: 'Sector 3 (Commercial Zone)', sizeKatha: 3, facing: 'North', priceBDT: 24000000, status: 'Sold Out', dimensions: "50' x 32.4'", roadWidth: '40 Feet Road', highlights: ['Retail Showroom Ready'] },
  { id: 'p-304', plotNumber: 'C-304', sector: 'Sector 3 (Commercial Zone)', sizeKatha: 5, facing: 'Lake View', priceBDT: 45000000, status: 'Available', dimensions: "60' x 45'", roadWidth: '60 Feet Road', highlights: ['Commercial Resort Zone', 'Waterfront Plaza'] },
];

export const InteractiveMasterplanSelector: React.FC<{
  onBookPlot?: (plot: MasterplotItem) => void;
}> = ({ onBookPlot }) => {
  const { language, translate, formatCurrency } = useTranslation();
  const [selectedSector, setSelectedSector] = useState<string>('All');
  const [selectedSize, setSelectedSize] = useState<number | 'All'>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [activePlot, setActivePlot] = useState<MasterplotItem | null>(null);

  // Filtered plots
  const filteredPlots = MASTER_PLOTS.filter((plot) => {
    if (selectedSector !== 'All' && plot.sector !== selectedSector) return false;
    if (selectedSize !== 'All' && plot.sizeKatha !== selectedSize) return false;
    if (selectedStatus !== 'All' && plot.status !== selectedStatus) return false;
    return true;
  });

  const availableCount = MASTER_PLOTS.filter((p) => p.status === 'Available').length;
  const reservedCount = MASTER_PLOTS.filter((p) => p.status === 'Reserved').length;
  const soldCount = MASTER_PLOTS.filter((p) => p.status === 'Sold Out').length;

  return (
    <div className="bg-[#FDFCF8] border border-[#5A5A40]/30 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#5A5A40]/20 pb-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 bg-[#5A5A40]/10 border border-[#5A5A40]/30 text-[#5A5A40] text-xs font-semibold px-3 py-1 rounded-full">
            <Layers className="w-3.5 h-3.5 text-[#8C715E]" />
            <span>
              {language === 'bn'
                ? 'ইন্টারেক্টিভ ৩ডি মাস্টারপ্ল্যান ও প্লট সিলেকশন'
                : language === 'ar'
                ? 'مخطط القطع التفاعلي ثلاثي الأبعاد'
                : '3D Interactive Masterplan & Plot Selector'}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif text-[#2D2926]">
            {language === 'bn'
              ? 'পূর্বাচল ইকো-স্মার্ট সিটি মাস্টারপ্ল্যান প্লট ম্যাপিং'
              : language === 'ar'
              ? 'تصفح المخطط التفاعلي للأراضي المتاحة'
              : 'Purbachal Eco-Smart City Live Layout'}
          </h2>
          <p className="text-xs sm:text-sm text-[#8C8C7F] font-light">
            {language === 'bn'
              ? 'প্রকল্পের বাস্তব প্লটের অবস্থা, সাইজ (৩/৫/১০ কাঠা) এবং অবস্থান রিয়েল-টাইমে সিলেক্ট ও বুকিং করুন।'
              : language === 'ar'
              ? 'اختر قطع الأراضي المتاحة بالتفصيل واطلع على المساحات والأسعار وحالة الحجز فورًا.'
              : 'Explore plot positions, road widths, lake views, and live availability (Available, Reserved, Sold Out).'}
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-3 bg-[#F5F5F0] p-2.5 rounded-2xl border border-[#5A5A40]/30 text-xs shrink-0">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-emerald-600"></span>
            <span className="font-medium text-[#2D2926]">Available ({availableCount})</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-amber-500"></span>
            <span className="font-medium text-[#2D2926]">Reserved ({reservedCount})</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-rose-600"></span>
            <span className="font-medium text-[#2D2926]">Sold Out ({soldCount})</span>
          </div>
        </div>
      </div>

      {/* Filter Controls */}
      <div className="bg-[#F5F5F0] p-4 rounded-2xl border border-[#5A5A40]/20 flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-[#8C715E]" />
          <span className="font-bold text-[#2D2926]">Filter Masterplan:</span>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Sector Selector */}
          <select
            value={selectedSector}
            onChange={(e) => setSelectedSector(e.target.value)}
            className="bg-white border border-[#5A5A40]/30 rounded-xl px-3 py-1.5 text-xs text-[#2D2926] focus:outline-none focus:border-[#8C715E]"
          >
            <option value="All">All Sectors & Zones</option>
            <option value="Sector 1 (Eco Smart)">Sector 1 (Eco Smart)</option>
            <option value="Sector 2 (Executive Block)">Sector 2 (Executive Block)</option>
            <option value="Sector 3 (Commercial Zone)">Sector 3 (Commercial Zone)</option>
          </select>

          {/* Katha Size Selector */}
          <select
            value={selectedSize}
            onChange={(e) => setSelectedSize(e.target.value === 'All' ? 'All' : Number(e.target.value))}
            className="bg-white border border-[#5A5A40]/30 rounded-xl px-3 py-1.5 text-xs text-[#2D2926] focus:outline-none focus:border-[#8C715E]"
          >
            <option value="All">All Plot Sizes</option>
            <option value="3">3 Katha Plots</option>
            <option value="5">5 Katha Plots</option>
            <option value="10">10 Katha Estate Plots</option>
          </select>

          {/* Status Selector */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="bg-white border border-[#5A5A40]/30 rounded-xl px-3 py-1.5 text-xs text-[#2D2926] focus:outline-none focus:border-[#8C715E]"
          >
            <option value="All">All Statuses</option>
            <option value="Available">Available Only</option>
            <option value="Reserved">Reserved</option>
            <option value="Sold Out">Sold Out</option>
          </select>
        </div>
      </div>

      {/* Grid Canvas Map of Masterplan */}
      <div className="relative bg-[#23201D] p-6 rounded-3xl border border-[#5A5A40]/40 overflow-hidden shadow-inner">
        {/* Background Blueprint Grid Lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#5a5a4015_1px,transparent_1px),linear-gradient(to_bottom,#5a5a4015_1px,transparent_1px)] bg-[size:3rem_3rem]"></div>

        <div className="relative z-10 space-y-4">
          <div className="flex items-center justify-between text-xs text-[#8C8C7F]">
            <span className="font-mono text-[11px]">📍 Purbachal Eco-Township Grid View</span>
            <span className="font-mono text-[11px]">Click plot tile for full specification</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredPlots.map((plot) => {
              const isAvailable = plot.status === 'Available';
              const isReserved = plot.status === 'Reserved';
              const isSold = plot.status === 'Sold Out';

              let borderColor = 'border-emerald-500/50 hover:border-emerald-400 bg-emerald-950/30';
              let badgeColor = 'bg-emerald-500/20 text-emerald-300';
              if (isReserved) {
                borderColor = 'border-amber-500/50 hover:border-amber-400 bg-amber-950/30';
                badgeColor = 'bg-amber-500/20 text-amber-300';
              } else if (isSold) {
                borderColor = 'border-rose-500/30 bg-rose-950/20 opacity-60 cursor-not-allowed';
                badgeColor = 'bg-rose-500/20 text-rose-300';
              }

              return (
                <div
                  key={plot.id}
                  onClick={() => setActivePlot(plot)}
                  className={`p-4 rounded-2xl border ${borderColor} backdrop-blur-md transition-all duration-200 cursor-pointer flex flex-col justify-between space-y-3 group hover:scale-[1.02]`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-white text-base group-hover:text-[#8C715E] transition">
                      {plot.plotNumber}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${badgeColor}`}>
                      {plot.status}
                    </span>
                  </div>

                  <div className="space-y-1 text-xs">
                    <div className="text-[#E5E5DF] font-medium flex items-center justify-between">
                      <span>{plot.sizeKatha} Katha</span>
                      <span className="text-[#8C8C7F] font-mono">{plot.facing}</span>
                    </div>
                    <div className="text-[11px] text-[#8C8C7F] truncate">{plot.sector}</div>
                  </div>

                  <div className="pt-2 border-t border-[#5A5A40]/30 flex items-center justify-between text-xs font-serif font-bold text-[#FDFCF8]">
                    <span>{formatCurrency(plot.priceBDT)}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#8C715E] opacity-80 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>

          {filteredPlots.length === 0 && (
            <div className="py-12 text-center text-[#8C8C7F] text-xs space-y-2">
              <Grid className="w-8 h-8 mx-auto text-[#5A5A40]" />
              <p>No plots matched your exact filter criteria. Try expanding plot sizes or status filter.</p>
            </div>
          )}
        </div>
      </div>

      {/* Selected Plot Detail Dialog / Modal */}
      {activePlot && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-[#FDFCF8] border border-[#5A5A40] rounded-3xl max-w-lg w-full p-6 space-y-5 shadow-2xl relative">
            <div className="flex items-start justify-between border-b border-[#5A5A40]/20 pb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C715E] bg-[#8C715E]/10 px-2.5 py-0.5 rounded-full">
                  {activePlot.sector}
                </span>
                <h3 className="font-serif text-2xl text-[#2D2926] mt-1">
                  Plot {activePlot.plotNumber} ({activePlot.sizeKatha} Katha)
                </h3>
              </div>
              <button
                onClick={() => setActivePlot(null)}
                className="text-[#8C8C7F] hover:text-[#2D2926] p-1 rounded-full hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="bg-[#F5F5F0] p-4 rounded-2xl grid grid-cols-2 gap-3 border border-[#5A5A40]/20">
                <div>
                  <span className="text-[#8C8C7F] block">Total Plot Price:</span>
                  <span className="font-serif font-bold text-lg text-[#2D2926]">
                    {formatCurrency(activePlot.priceBDT)}
                  </span>
                </div>
                <div>
                  <span className="text-[#8C8C7F] block">Plot Status:</span>
                  <span className={`font-bold ${activePlot.status === 'Available' ? 'text-emerald-700' : 'text-amber-700'}`}>
                    {activePlot.status}
                  </span>
                </div>
                <div>
                  <span className="text-[#8C8C7F] block">Facing Direction:</span>
                  <span className="font-semibold text-[#2D2926]">{activePlot.facing}</span>
                </div>
                <div>
                  <span className="text-[#8C8C7F] block">Dimensions & Access:</span>
                  <span className="font-semibold text-[#2D2926]">{activePlot.dimensions} ({activePlot.roadWidth})</span>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-[#2D2926] mb-2">Plot Highlights & Eco Features:</h4>
                <div className="grid grid-cols-1 gap-1.5">
                  {activePlot.highlights.map((h, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-[#5A5A40]">
                      <CheckCircle2 className="w-4 h-4 text-[#8C715E] shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#5A5A40]/20">
              <button
                onClick={() => setActivePlot(null)}
                className="px-4 py-2 bg-[#F5F5F0] text-[#2D2926] rounded-full text-xs font-semibold hover:bg-slate-200"
              >
                Close
              </button>
              {activePlot.status === 'Available' && (
                <button
                  onClick={() => {
                    if (onBookPlot) onBookPlot(activePlot);
                    setActivePlot(null);
                  }}
                  className="px-6 py-2.5 bg-[#8C715E] text-white rounded-full text-xs font-bold hover:bg-[#5A5A40] transition shadow-md flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Reserve Plot {activePlot.plotNumber}</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InteractiveMasterplanSelector;
