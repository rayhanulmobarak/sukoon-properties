import React from 'react';
import { FileCode, Terminal, Database, Shield } from 'lucide-react';

export const ApiDocsPage: React.FC = () => {
  return (
    <div className="bg-[#FDFCF8] min-h-screen py-10 px-4 sm:px-8 space-y-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="border-b border-[#E5E5DF] pb-4">
          <span className="text-xs font-bold uppercase tracking-widest text-[#5A5A40]">
            Developer Resources & REST Endpoints
          </span>
          <h1 className="text-3xl font-serif text-[#2D2926] mt-1">Sukoon Properties API Documentation</h1>
        </div>

        <div className="bg-[#2D2926] text-white p-6 rounded-2xl font-mono text-xs space-y-4 shadow-lg">
          <div className="flex items-center justify-between border-b border-[#5A5A40]/40 pb-2">
            <span className="text-emerald-400 font-bold">GET /api/properties</span>
            <span className="text-[#8C8C7F]">Returns all public properties & plots</span>
          </div>
          <div className="flex items-center justify-between border-b border-[#5A5A40]/40 pb-2">
            <span className="text-emerald-400 font-bold">POST /api/ai/recommendation</span>
            <span className="text-[#8C8C7F]">Gemini AI Property Matchmaker</span>
          </div>
          <div className="flex items-center justify-between border-b border-[#5A5A40]/40 pb-2">
            <span className="text-emerald-400 font-bold">POST /api/payments/bkash/initiate</span>
            <span className="text-[#8C8C7F]">Initiate bKash Token Payment</span>
          </div>
        </div>
      </div>
    </div>
  );
};
