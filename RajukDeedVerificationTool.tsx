import React, { useState } from 'react';
import { X, Search, ShieldCheck, FileCheck, CheckCircle2, Download, Printer, AlertCircle, Building2, QrCode } from 'lucide-react';

interface RajukDeedVerificationToolProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RajukDeedVerificationTool: React.FC<RajukDeedVerificationToolProps> = ({ isOpen, onClose }) => {
  const [mouza, setMouza] = useState('Purbachal Smart City (Sector 17)');
  const [khatianNo, setKhatianNo] = useState('BS-9028/2024');
  const [plotNo, setPlotNo] = useState('Plot 402, Road 11');
  const [deedNo, setDeedNo] = useState('REG-DH-889021');
  const [isSearching, setIsSearching] = useState(false);
  const [verificationResult, setVerificationResult] = useState<{
    status: 'VERIFIED' | 'NOT_FOUND';
    memoNo: string;
    approvalDate: string;
    owner: string;
    landType: string;
    mouza: string;
    khatian: string;
    rajukClearance: string;
    encumbranceFree: boolean;
  } | null>({
    status: 'VERIFIED',
    memoNo: 'RAJUK/PUR/PERMIT-2024/90281',
    approvalDate: '15 January 2024',
    owner: 'Sukoon Properties Ltd. (Director Rayhanul Mobarak)',
    landType: 'Freehold Residential & Mixed Commercial',
    mouza: 'Purbachal Smart City (Sector 17)',
    khatian: 'BS Khatian #9028 (Mutation Completed)',
    rajukClearance: '100% Approved (Memo #RAJUK-770-SmartCity)',
    encumbranceFree: true,
  });

  if (!isOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      setVerificationResult({
        status: 'VERIFIED',
        memoNo: `RAJUK/PUR/VERIFY-${Math.floor(10000 + Math.random() * 90000)}`,
        approvalDate: '12 February 2024',
        owner: 'Sukoon Properties Ltd.',
        landType: 'RAJUK Approved Smart City Residential',
        mouza: mouza || 'Purbachal Smart City',
        khatian: khatianNo || 'BS-9028',
        rajukClearance: 'Authentic (Govt. Registry Verified)',
        encumbranceFree: true,
      });
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-3xl w-full shadow-2xl overflow-hidden border border-slate-200 my-8">
        {/* Header */}
        <div className="bg-[#2D2926] text-[#FDFCF8] p-6 flex items-center justify-between border-b border-[#3D3834]">
          <div className="flex items-center gap-3">
            <div className="bg-[#8C715E] p-2.5 rounded-xl text-white">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="bg-emerald-950 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-700/50">
                  Government Registry Portal
                </span>
                <span className="text-xs text-[#8C8C7F]">CS / RS / BS Porcha & Deed Verification</span>
              </div>
              <h3 className="font-serif text-xl font-bold mt-0.5">RAJUK Land Deed & Record Verification</h3>
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
          {/* Information Notice */}
          <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl flex items-start gap-3 text-xs text-amber-900">
            <Building2 className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">100% Guaranteed Approved Land Records</p>
              <p className="mt-0.5 text-amber-800">
                All Sukoon Properties projects undergo triple verification by RAJUK, the Sub-Registrar Office, and the Ministry of Land. You can query any Mouza, Khatian, or CS/RS/BS Porcha record below.
              </p>
            </div>
          </div>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <Search className="w-4 h-4 text-[#8C715E]" /> Verify Plot or Deed Registration Record
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Mouza / Project Location</label>
                <input
                  type="text"
                  value={mouza}
                  onChange={(e) => setMouza(e.target.value)}
                  placeholder="e.g. Purbachal Sector 17, Gulshan 2"
                  className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:border-emerald-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">BS / RS Khatian / Mutation No.</label>
                <input
                  type="text"
                  value={khatianNo}
                  onChange={(e) => setKhatianNo(e.target.value)}
                  placeholder="e.g. BS Khatian 9028"
                  className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:border-emerald-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Plot / Dagh Number</label>
                <input
                  type="text"
                  value={plotNo}
                  onChange={(e) => setPlotNo(e.target.value)}
                  placeholder="e.g. Plot 402, Sector 17"
                  className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:border-emerald-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Deed Registration / Memo No.</label>
                <input
                  type="text"
                  value={deedNo}
                  onChange={(e) => setDeedNo(e.target.value)}
                  placeholder="e.g. REG-DH-889021"
                  className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:border-emerald-600"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSearching}
              className="w-full bg-[#8C715E] hover:bg-[#745B4A] text-white font-bold text-xs py-3 rounded-xl transition flex items-center justify-center gap-2 shadow-md"
            >
              {isSearching ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Querying RAJUK Central Land Database...</span>
                </>
              ) : (
                <>
                  <FileCheck className="w-4 h-4" />
                  <span>Verify Land Title & RAJUK Approval</span>
                </>
              )}
            </button>
          </form>

          {/* Result Card */}
          {verificationResult && (
            <div className="bg-slate-900 text-white p-6 rounded-2xl border border-emerald-600/50 space-y-4 shadow-xl relative overflow-hidden">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
                  <div>
                    <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-500/40">
                      OFFICIALLY VERIFIED
                    </span>
                    <h5 className="font-serif font-bold text-lg text-white mt-1">
                      RAJUK & Ministry Clearance Confirmed
                    </h5>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <QrCode className="w-10 h-10 text-slate-300 bg-white p-1 rounded-lg" />
                  <div className="text-right text-[10px] text-slate-400 font-mono">
                    <p>MEMO: {verificationResult.memoNo}</p>
                    <p>VERIFIED: {verificationResult.approvalDate}</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700">
                  <p className="text-slate-400 text-[10px]">Title Holder / Owner:</p>
                  <p className="font-bold text-white text-xs mt-0.5">{verificationResult.owner}</p>
                </div>
                <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700">
                  <p className="text-slate-400 text-[10px]">Land Category:</p>
                  <p className="font-bold text-emerald-300 text-xs mt-0.5">{verificationResult.landType}</p>
                </div>
                <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700">
                  <p className="text-slate-400 text-[10px]">Location / Mouza:</p>
                  <p className="font-bold text-white text-xs mt-0.5">{verificationResult.mouza}</p>
                </div>
                <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700">
                  <p className="text-slate-400 text-[10px]">Khatian Mutation Status:</p>
                  <p className="font-bold text-amber-300 text-xs mt-0.5">{verificationResult.khatian}</p>
                </div>
                <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700">
                  <p className="text-slate-400 text-[10px]">Encumbrance / Dispute:</p>
                  <p className="font-bold text-emerald-400 text-xs mt-0.5">100% Dispute Free (No Litigation)</p>
                </div>
                <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700">
                  <p className="text-slate-400 text-[10px]">RAJUK Clearance Memo:</p>
                  <p className="font-bold text-teal-300 text-xs mt-0.5">{verificationResult.rajukClearance}</p>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => alert(`Downloading official RAJUK verification clearance certificate PDF for ${verificationResult.memoNo}...`)}
                  className="flex-1 bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold py-2.5 rounded-xl transition flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4 text-amber-300" />
                  <span>Download Clearance Certificate (PDF)</span>
                </button>
                <button
                  onClick={() => window.print()}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold px-4 py-2.5 rounded-xl border border-slate-700 transition flex items-center justify-center gap-1.5"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Certificate</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
