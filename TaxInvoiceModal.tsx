import React from 'react';
import { X, Printer, Download, CheckCircle2, Building2, ShieldCheck } from 'lucide-react';

interface TaxInvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  invoice: any;
}

export const TaxInvoiceModal: React.FC<TaxInvoiceModalProps> = ({
  isOpen,
  onClose,
  invoice,
}) => {
  if (!isOpen || !invoice) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white max-w-2xl w-full rounded-3xl overflow-hidden shadow-2xl border border-[#E5E5DF] text-[#2D2926] my-8">
        {/* Header Action Bar */}
        <div className="bg-[#2D2926] text-white p-4 px-6 flex items-center justify-between">
          <span className="text-xs font-serif font-bold tracking-wider text-[#FDFCF8] flex items-center gap-2">
            <Building2 className="w-4 h-4 text-[#8C715E]" /> Official Sukoon Properties Tax Invoice & Receipt
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 bg-[#5A5A40] hover:bg-[#484833] text-white text-xs font-bold rounded-lg transition flex items-center gap-1"
            >
              <Printer className="w-3.5 h-3.5" /> Print
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-300 hover:text-white rounded-lg transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Invoice Body */}
        <div className="p-8 space-y-6 text-xs bg-[#FDFCF8]" id="printable-invoice">
          {/* Company Branding */}
          <div className="flex justify-between items-start border-b border-[#E5E5DF] pb-6">
            <div>
              <h2 className="font-serif text-2xl font-bold text-[#2D2926]">Sukoon Properties Ltd.</h2>
              <p className="text-[11px] text-[#8C8C7F]">Director: Rayhanul Mobarak</p>
              <p className="text-[11px] text-[#8C8C7F]">Official Email: sukoonpropertiesltd@gmail.com</p>
              <p className="text-[11px] text-[#8C8C7F]">Gulshan 2, Dhaka-1212, Bangladesh</p>
            </div>
            <div className="text-right">
              <span className="inline-block bg-[#5A5A40] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase">
                {invoice.status || 'PAID & VERIFIED'}
              </span>
              <p className="font-mono text-sm font-bold text-[#5A5A40] mt-2">{invoice.invoiceNumber}</p>
              <p className="text-[11px] text-[#8C8C7F]">Date: {invoice.date}</p>
            </div>
          </div>

          {/* Client Details */}
          <div className="grid grid-cols-2 gap-4 bg-[#F5F5F0] p-4 rounded-2xl border border-[#E5E5DF]">
            <div>
              <span className="text-[10px] uppercase font-bold text-[#8C8C7F] block">Billed To (Client):</span>
              <p className="font-bold text-[#2D2926] text-sm mt-0.5">{invoice.userName}</p>
              <p className="text-[#8C8C7F]">{invoice.userEmail}</p>
            </div>
            <div className="text-right">
              <span className="text-[10px] uppercase font-bold text-[#8C8C7F] block">Payment Gateway:</span>
              <p className="font-bold text-[#5A5A40] mt-0.5">{invoice.paymentMethod}</p>
              <p className="font-mono text-[11px] text-[#8C8C7F]">Trx ID: {invoice.transactionId}</p>
            </div>
          </div>

          {/* Line Items Table */}
          <div className="border border-[#E5E5DF] rounded-2xl overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#2D2926] text-white font-bold text-[11px]">
                  <th className="p-3">Item Description & Purpose</th>
                  <th className="p-3">Reference Code</th>
                  <th className="p-3 text-right">Amount (BDT)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E5DF]">
                <tr>
                  <td className="p-3 font-semibold text-[#2D2926]">{invoice.purpose}</td>
                  <td className="p-3 text-[#8C8C7F] font-mono">{invoice.bookingId}</td>
                  <td className="p-3 text-right font-serif font-bold text-[#2D2926]">
                    ৳ {invoice.amountBDT.toLocaleString()} BDT
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Totals */}
          <div className="flex justify-between items-center bg-[#5A5A40] text-white p-4 rounded-2xl">
            <span className="font-bold text-xs uppercase tracking-wider">Total Amount Received</span>
            <span className="font-serif text-2xl font-bold text-amber-300">
              ৳ {invoice.amountBDT.toLocaleString()} BDT
            </span>
          </div>

          {/* Stamp & Footer */}
          <div className="pt-4 flex items-center justify-between border-t border-[#E5E5DF] text-[10px] text-[#8C8C7F]">
            <div className="flex items-center gap-1.5 text-emerald-700 font-bold">
              <ShieldCheck className="w-4 h-4" />
              <span>Digitally Sealed by Sukoon Properties Ltd. Security Engine</span>
            </div>
            <span>Authorized by Director Rayhanul Mobarak</span>
          </div>
        </div>
      </div>
    </div>
  );
};
