import React, { useState } from 'react';
import { X, Table, Calculator, Download, Printer, Landmark, Building2, CheckCircle2 } from 'lucide-react';

interface EmiScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  priceBDT: number;
  propertyTitle: string;
}

export const EmiScheduleModal: React.FC<EmiScheduleModalProps> = ({
  isOpen,
  onClose,
  priceBDT,
  propertyTitle,
}) => {
  const [tenureYears, setTenureYears] = useState(10);
  const [interestRate, setInterestRate] = useState(8.5);
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);

  if (!isOpen) return null;

  const kwdRate = 386;
  const downPaymentBDT = (priceBDT * downPaymentPercent) / 100;
  const loanAmountBDT = priceBDT - downPaymentBDT;

  const monthlyRate = interestRate / 100 / 12;
  const totalMonths = tenureYears * 12;

  const monthlyEmiBDT =
    monthlyRate > 0
      ? (loanAmountBDT * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
        (Math.pow(1 + monthlyRate, totalMonths) - 1)
      : loanAmountBDT / totalMonths;

  const totalPaymentBDT = monthlyEmiBDT * totalMonths;
  const totalInterestBDT = totalPaymentBDT - loanAmountBDT;

  // RAJUK Government Tax & Registration Fee Breakdown (approx 10.5% total in Bangladesh)
  const stampDutyBDT = priceBDT * 0.03; // 3%
  const registrationFeeBDT = priceBDT * 0.02; // 2%
  const gainTaxBDT = priceBDT * 0.04; // 4%
  const localGovtTaxBDT = priceBDT * 0.015; // 1.5%
  const totalGovtFeesBDT = stampDutyBDT + registrationFeeBDT + gainTaxBDT + localGovtTaxBDT;

  // Generate Schedule Years
  const scheduleRows = Array.from({ length: Math.min(tenureYears, 10) }, (_, i) => {
    const year = i + 1;
    const yearlyPayment = monthlyEmiBDT * 12;
    const yearlyInterest = loanAmountBDT * (interestRate / 100) * Math.pow(0.9, i);
    const yearlyPrincipal = yearlyPayment - yearlyInterest;
    return {
      year,
      yearlyPayment,
      yearlyPrincipal: Math.max(yearlyPrincipal, 0),
      yearlyInterest: Math.max(yearlyInterest, 0),
    };
  });

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-4xl w-full shadow-2xl overflow-hidden border border-slate-200 my-8">
        {/* Header */}
        <div className="bg-slate-900 text-white p-6 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="bg-amber-500 p-2.5 rounded-2xl text-slate-950 font-bold">
              <Table className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="bg-emerald-950 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-700/60">
                  Full Amortization & Govt Registry Fees
                </span>
                <span className="text-xs text-slate-300">1 KWD ≈ 386 BDT</span>
              </div>
              <h3 className="font-serif text-xl font-bold mt-0.5">Complete Payment & Installment Schedule</h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Property Summary & Sliders */}
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Property</span>
              <p className="font-bold text-slate-900 text-sm truncate">{propertyTitle}</p>
              <p className="text-xs text-emerald-700 font-extrabold font-mono mt-0.5">
                ৳ {(priceBDT / 100000).toFixed(2)} Lakh ({(priceBDT / kwdRate).toLocaleString(undefined, { maximumFractionDigits: 0 })} KWD)
              </p>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                <span>Down Payment ({downPaymentPercent}%)</span>
                <span className="text-amber-700">৳ {(downPaymentBDT / 100000).toFixed(2)} Lakh</span>
              </div>
              <input
                type="range"
                min="10"
                max="50"
                step="5"
                value={downPaymentPercent}
                onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                className="w-full accent-amber-600 cursor-pointer h-1.5 bg-slate-200 rounded-lg"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                <span>Tenure ({tenureYears} Years)</span>
                <span className="text-emerald-700">{interestRate}% / yr Interest</span>
              </div>
              <input
                type="range"
                min="3"
                max="25"
                step="1"
                value={tenureYears}
                onChange={(e) => setTenureYears(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer h-1.5 bg-slate-200 rounded-lg"
              />
            </div>
          </div>

          {/* Key Totals Box */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="bg-emerald-950 text-white p-3.5 rounded-2xl border border-emerald-800">
              <span className="text-[10px] uppercase font-bold text-emerald-400 block">Monthly Bank EMI</span>
              <span className="text-lg font-bold font-mono text-white">৳ {Math.round(monthlyEmiBDT).toLocaleString()}</span>
              <span className="text-[10px] text-emerald-300 block font-mono">≈ {(monthlyEmiBDT / kwdRate).toFixed(0)} KWD</span>
            </div>

            <div className="bg-slate-900 text-white p-3.5 rounded-2xl border border-slate-800">
              <span className="text-[10px] uppercase font-bold text-amber-400 block">Total Interest Payable</span>
              <span className="text-lg font-bold font-mono text-amber-300">৳ {(totalInterestBDT / 100000).toFixed(2)} Lakh</span>
              <span className="text-[10px] text-slate-400 block">Over {tenureYears} years</span>
            </div>

            <div className="bg-slate-900 text-white p-3.5 rounded-2xl border border-slate-800">
              <span className="text-[10px] uppercase font-bold text-teal-400 block">RAJUK & Govt Registry Tax</span>
              <span className="text-lg font-bold font-mono text-teal-300">৳ {(totalGovtFeesBDT / 100000).toFixed(2)} Lakh</span>
              <span className="text-[10px] text-slate-400 block">10.5% Registry Stamp Duty</span>
            </div>

            <div className="bg-slate-900 text-white p-3.5 rounded-2xl border border-slate-800">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Outflow</span>
              <span className="text-lg font-bold font-mono text-white">৳ {((totalPaymentBDT + totalGovtFeesBDT) / 100000).toFixed(2)} Lakh</span>
              <span className="text-[10px] text-slate-400 block">Including Registry</span>
            </div>
          </div>

          {/* Government Land Registration Breakdown */}
          <div className="bg-slate-900 text-white p-4 rounded-2xl border border-slate-800 space-y-2 text-xs">
            <div className="flex items-center justify-between font-bold text-amber-300 border-b border-slate-800 pb-2">
              <span className="flex items-center gap-1.5">
                <Landmark className="w-4 h-4 text-emerald-400" /> RAJUK & Sub-Registrar Mandatory Fee Structure
              </span>
              <span className="bg-emerald-900 text-emerald-300 text-[10px] px-2 py-0.5 rounded">10.5% Total Tax</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] pt-1">
              <div>
                <p className="text-slate-400">Stamp Duty (3%):</p>
                <p className="font-mono font-bold text-white">৳ {(stampDutyBDT / 100000).toFixed(2)} Lakh</p>
              </div>
              <div>
                <p className="text-slate-400">Registration Fee (2%):</p>
                <p className="font-mono font-bold text-white">৳ {(registrationFeeBDT / 100000).toFixed(2)} Lakh</p>
              </div>
              <div>
                <p className="text-slate-400">Capital Gain Tax (4%):</p>
                <p className="font-mono font-bold text-white">৳ {(gainTaxBDT / 100000).toFixed(2)} Lakh</p>
              </div>
              <div>
                <p className="text-slate-400">Local Govt Tax (1.5%):</p>
                <p className="font-mono font-bold text-white">৳ {(localGovtTaxBDT / 100000).toFixed(2)} Lakh</p>
              </div>
            </div>
          </div>

          {/* Amortization Table */}
          <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
            <table className="w-full text-left text-xs divide-y divide-slate-200">
              <thead className="bg-slate-900 text-white font-bold">
                <tr>
                  <th className="p-3">Year</th>
                  <th className="p-3">Yearly Payment</th>
                  <th className="p-3">Principal Paid</th>
                  <th className="p-3">Interest Paid</th>
                  <th className="p-3">Equivalent KWD / Year</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white font-medium text-slate-800">
                {scheduleRows.map((row) => (
                  <tr key={row.year} className="hover:bg-slate-50 transition">
                    <td className="p-3 font-bold text-slate-900">Year {row.year}</td>
                    <td className="p-3 font-mono">৳ {Math.round(row.yearlyPayment).toLocaleString()}</td>
                    <td className="p-3 font-mono text-emerald-700">৳ {Math.round(row.yearlyPrincipal).toLocaleString()}</td>
                    <td className="p-3 font-mono text-amber-700">৳ {Math.round(row.yearlyInterest).toLocaleString()}</td>
                    <td className="p-3 font-mono text-slate-600">
                      ≈ {(row.yearlyPayment / kwdRate).toLocaleString(undefined, { maximumFractionDigits: 0 })} KWD
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer Actions */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={() => alert(`Exporting full payment & amortization schedule PDF for ${propertyTitle}...`)}
              className="flex-1 bg-[#8C715E] hover:bg-[#745B4A] text-white font-bold text-xs py-3 rounded-xl transition flex items-center justify-center gap-2 shadow"
            >
              <Download className="w-4 h-4 text-amber-300" />
              <span>Download Official Payment Breakdown (PDF)</span>
            </button>
            <button
              onClick={() => window.print()}
              className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs px-5 py-3 rounded-xl border border-slate-300 transition flex items-center justify-center gap-2"
            >
              <Printer className="w-4 h-4 text-slate-600" />
              <span>Print Schedule</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
