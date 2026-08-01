import React, { useState } from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import { TrendingUp, PieChart, DollarSign, Calendar, BarChart3, ArrowUpRight, Award, ShieldCheck, Sparkles } from 'lucide-react';

export const InvestmentRoiEngine: React.FC = () => {
  const { language, translate, formatCurrency } = useTranslation();

  // Investment Simulator State
  const [initialInvestment, setInitialInvestment] = useState<number>(20000000); // 2 Crore BDT
  const [holdingYears, setHoldingYears] = useState<number>(5);
  const [appreciationRate, setAppreciationRate] = useState<number>(14); // 14% annual real estate growth in Purbachal
  const [rentalYield, setRentalYield] = useState<number>(7); // 7% rental yield

  // Calculations
  // Total Value = Principal * (1 + appreciationRate/100)^years
  const compoundedValue = initialInvestment * Math.pow(1 + appreciationRate / 100, holdingYears);
  const totalAppreciationProfit = compoundedValue - initialInvestment;

  // Cumulative Rental Yield = Initial Investment * (rentalYield/100) * years (with 5% annual rent hike)
  let cumulativeRent = 0;
  let currentRentAnnual = initialInvestment * (rentalYield / 100);
  for (let i = 0; i < holdingYears; i++) {
    cumulativeRent += currentRentAnnual;
    currentRentAnnual *= 1.05; // 5% yearly rent escalation
  }

  const totalReturn = compoundedValue + cumulativeRent;
  const netProfit = totalReturn - initialInvestment;
  const roiPercentage = ((netProfit / initialInvestment) * 100).toFixed(1);

  // Bank FD comparison (at 7% simple interest per year)
  const bankFdValue = initialInvestment * Math.pow(1.07, holdingYears);
  const bankFdProfit = bankFdValue - initialInvestment;

  // Year by year progression data points for graph
  const yearlyData = [];
  let val = initialInvestment;
  let rentSum = 0;
  let rentYear = initialInvestment * (rentalYield / 100);

  for (let y = 0; y <= holdingYears; y++) {
    if (y === 0) {
      yearlyData.push({ year: `Year 0`, value: val, total: val });
    } else {
      val = val * (1 + appreciationRate / 100);
      rentSum += rentYear;
      rentYear *= 1.05;
      yearlyData.push({ year: `Year ${y}`, value: Math.round(val), total: Math.round(val + rentSum) });
    }
  }

  const maxVal = yearlyData[yearlyData.length - 1].total;

  return (
    <div className="bg-[#FDFCF8] border border-[#5A5A40]/30 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#5A5A40]/20 pb-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 bg-[#8C715E]/10 border border-[#8C715E]/30 text-[#8C715E] text-xs font-semibold px-3 py-1 rounded-full">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>
              {language === 'bn'
                ? 'বিনিয়োগ রিটার্ন ও প্রপার্টি অ্যাপ দৃশ্যমান অ্যানালিটিক্স'
                : language === 'ar'
                ? 'حاسبة عائد الاستثمار وتنامي قيمة العقار'
                : 'Investment ROI & Capital Appreciation Engine'}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif text-[#2D2926]">
            {language === 'bn'
              ? '৫ ও ১০ বছরের ক্যাপিটাল গ্রোথ ও রেন্টাল ইল্ড সিমুলেটর'
              : language === 'ar'
              ? 'مُحاكي نمو رأس المال والعائد الإيجاري المستقبلي'
              : 'Purbachal Real Estate ROI Forecast'}
          </h2>
          <p className="text-xs sm:text-sm text-[#8C8C7F] font-light">
            {language === 'bn'
              ? 'পূর্বাচল এক্সপ্রেসওয়ে ও মেগা ইনফ্রাস্ট্রাকচার হাব সংলগ্ন প্রপার্টির চক্রবৃদ্ধি প্রবৃদ্ধি এবং বার্ষিক ভাড়া গণনা করুন।'
              : language === 'ar'
              ? 'احسب العوائد المركبة والإيجارات السنوية المتوقعة في أسرع المناطق نموًا بالعاصمة.'
              : 'Simulate compounding land appreciation, rental yields, and compare performance against bank fixed deposits.'}
          </p>
        </div>

        <div className="bg-[#2D2926] text-white p-3.5 rounded-2xl border border-[#5A5A40]/30 flex items-center gap-4 shrink-0 shadow-md">
          <div>
            <span className="text-[10px] text-[#8C8C7F] font-mono uppercase block">Total Forecast ROI</span>
            <span className="font-serif text-2xl text-emerald-400 font-bold">+{roiPercentage}%</span>
          </div>
          <div className="p-2 bg-[#8C715E] text-white rounded-xl">
            <Sparkles className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Simulator Body */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Controls Column */}
        <div className="lg:col-span-5 bg-[#F5F5F0] border border-[#5A5A40]/30 rounded-2xl p-6 space-y-5">
          <h3 className="font-serif text-base font-bold text-[#2D2926] flex items-center gap-2">
            <PieChart className="w-4 h-4 text-[#8C715E]" />
            <span>Investment Parameters</span>
          </h3>

          {/* 1. Initial Capital Slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-[#8C8C7F] font-medium">Initial Capital (BDT):</span>
              <span className="font-serif font-bold text-[#2D2926]">{formatCurrency(initialInvestment)}</span>
            </div>
            <input
              type="range"
              min={5000000}
              max={100000000}
              step={1000000}
              value={initialInvestment}
              onChange={(e) => setInitialInvestment(Number(e.target.value))}
              className="w-full accent-[#8C715E] cursor-pointer"
            />
          </div>

          {/* 2. Holding Period Buttons */}
          <div className="space-y-2">
            <label className="text-xs text-[#8C8C7F] font-medium block">Holding Period (Years):</label>
            <div className="grid grid-cols-3 gap-2">
              {[3, 5, 10].map((y) => (
                <button
                  key={y}
                  onClick={() => setHoldingYears(y)}
                  className={`py-2 rounded-xl text-xs font-bold border transition ${
                    holdingYears === y
                      ? 'bg-[#8C715E] text-white border-[#8C715E] shadow-sm'
                      : 'bg-white text-[#2D2926] border-[#5A5A40]/30 hover:bg-[#8C715E]/10'
                  }`}
                >
                  {y} Years
                </button>
              ))}
            </div>
          </div>

          {/* 3. Expected Annual Appreciation */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-[#8C8C7F] font-medium">Annual Property Appreciation:</span>
              <span className="font-bold text-[#8C715E]">{appreciationRate}% / year</span>
            </div>
            <input
              type="range"
              min={6}
              max={22}
              step={1}
              value={appreciationRate}
              onChange={(e) => setAppreciationRate(Number(e.target.value))}
              className="w-full accent-[#8C715E] cursor-pointer"
            />
          </div>

          {/* 4. Expected Rental Yield */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-[#8C8C7F] font-medium">Estimated Rental Yield:</span>
              <span className="font-bold text-[#5A5A40]">{rentalYield}% / year</span>
            </div>
            <input
              type="range"
              min={3}
              max={12}
              step={0.5}
              value={rentalYield}
              onChange={(e) => setRentalYield(Number(e.target.value))}
              className="w-full accent-[#8C715E] cursor-pointer"
            />
          </div>

          {/* Forecasted Summary Cards */}
          <div className="bg-[#2D2926] text-white p-4 rounded-2xl space-y-2.5 border border-[#5A5A40]/40 text-xs">
            <div className="flex justify-between">
              <span className="text-[#8C8C7F]">Initial Capital:</span>
              <span className="font-mono font-bold text-[#FDFCF8]">{formatCurrency(initialInvestment)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#8C8C7F]">Property Appreciation:</span>
              <span className="font-mono font-bold text-emerald-400">+{formatCurrency(totalAppreciationProfit)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#8C8C7F]">Cumulative Rent Income:</span>
              <span className="font-mono font-bold text-[#8C715E]">+{formatCurrency(cumulativeRent)}</span>
            </div>
            <div className="pt-2 border-t border-[#5A5A40]/40 flex justify-between items-center text-sm font-serif font-bold">
              <span>Total Projected Return:</span>
              <span className="text-emerald-400 font-mono text-base">{formatCurrency(totalReturn)}</span>
            </div>
          </div>
        </div>

        {/* Graph & Comparison Column */}
        <div className="lg:col-span-7 space-y-6 flex flex-col justify-between">
          {/* Visual SVG Compounding Curve */}
          <div className="bg-[#23201D] border border-[#5A5A40]/40 p-6 rounded-2xl text-white space-y-4 shadow-lg">
            <div className="flex items-center justify-between text-xs">
              <span className="font-serif font-bold text-[#FDFCF8] flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-[#8C715E]" />
                <span>Value Compounding Growth Curve</span>
              </span>
              <span className="text-[10px] font-mono text-[#8C8C7F]">{holdingYears} Year Projection</span>
            </div>

            {/* SVG Visual Bar Chart */}
            <div className="h-44 flex items-end justify-between gap-2 pt-6 border-b border-[#5A5A40]/30 px-2">
              {yearlyData.map((d, i) => {
                const heightPercent = Math.max(15, Math.round((d.total / maxVal) * 100));
                return (
                  <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group relative">
                    {/* Tooltip */}
                    <div className="opacity-0 group-hover:opacity-100 absolute -top-10 bg-[#8C715E] text-white text-[9px] font-mono px-2 py-1 rounded shadow-lg pointer-events-none transition-opacity whitespace-nowrap z-20">
                      {formatCurrency(d.total)}
                    </div>

                    <div
                      style={{ height: `${heightPercent}%` }}
                      className="w-full bg-gradient-to-t from-[#8C715E] to-emerald-500 rounded-t-md transition-all duration-500 group-hover:brightness-125"
                    ></div>
                    <span className="text-[10px] text-[#8C8C7F] font-mono">{d.year}</span>
                  </div>
                );
              })}
            </div>

            <div className="flex justify-between items-center text-[11px] text-[#8C8C7F]">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                <span>Land Appreciation + Rent</span>
              </span>
              <span className="font-mono text-[#FDFCF8]">{appreciationRate}% Annual Pace</span>
            </div>
          </div>

          {/* Comparison Matrix: Real Estate vs Bank FD */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="bg-[#8C715E]/10 border border-[#8C715E]/40 p-4 rounded-2xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#8C715E]">Sukoon Real Estate</span>
                <Award className="w-4 h-4 text-[#8C715E]" />
              </div>
              <div className="font-serif text-xl font-bold text-[#2D2926]">{formatCurrency(totalReturn)}</div>
              <p className="text-[11px] text-[#5A5A40]">
                Net Profit: <strong className="text-emerald-700">+{formatCurrency(netProfit)}</strong> ({roiPercentage}% return)
              </p>
            </div>

            <div className="bg-[#F5F5F0] border border-[#5A5A40]/30 p-4 rounded-2xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#8C8C7F]">Bank Fixed Deposit (7%)</span>
                <ShieldCheck className="w-4 h-4 text-[#8C8C7F]" />
              </div>
              <div className="font-serif text-xl font-bold text-[#2D2926]">{formatCurrency(bankFdValue)}</div>
              <p className="text-[11px] text-[#8C8C7F]">
                Net Profit: +{formatCurrency(bankFdProfit)} (Inflation vulnerable)
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestmentRoiEngine;
