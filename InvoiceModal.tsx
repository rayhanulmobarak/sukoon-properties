import React from 'react';
import { X, Printer, Download, Building2, CheckCircle, ShieldCheck } from 'lucide-react';

interface InvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  invoice: any;
}

export const InvoiceModal: React.FC<InvoiceModalProps> = ({ isOpen, onClose, invoice }) => {
  if (!isOpen || !invoice) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl overflow-hidden border border-slate-200 my-8">
        {/* Header Action Bar */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between print:hidden">
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-amber-400" />
            <h3 className="font-extrabold text-base">Payment Receipt & Tax Invoice</h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1 transition"
            >
              <Printer className="w-3.5 h-3.5 text-emerald-400" /> Print
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Invoice Body */}
        <div className="p-8 space-y-6">
          {/* Corporate Header */}
          <div className="flex items-start justify-between border-b border-slate-200 pb-6">
            <div>
              <div className="flex items-center gap-2 text-emerald-900 font-extrabold text-xl">
                <Building2 className="w-6 h-6 text-emerald-700" />
                <span>SUKOON PROPERTIES LTD.</span>
              </div>
              <p className="text-xs text-slate-500 mt-1 max-w-xs">
                Sukoon Corporate Tower, Level 14, Gulshan Avenue 2, Dhaka 1212, Bangladesh
              </p>
              <p className="text-xs text-slate-500">Email: sukoonpropertiesltd@gmail.com | Hotline: +880 1913-780386</p>
              <p className="text-xs text-slate-500 font-medium">Director: Rayhanul Mobarak</p>
            </div>
            <div className="text-right">
              <span className="bg-emerald-100 text-emerald-800 font-extrabold text-xs px-3 py-1 rounded-full border border-emerald-300">
                OFFICIAL RECEIPT
              </span>
              <h4 className="font-extrabold text-lg text-slate-900 mt-2">{invoice.invoiceNumber || 'INV-SUK-2026-001'}</h4>
              <p className="text-xs text-slate-500">Date: {invoice.date || '2026-07-28'}</p>
            </div>
          </div>

          {/* Billed To & Payment Details */}
          <div className="grid grid-cols-2 gap-6 bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs">
            <div>
              <h5 className="font-bold text-slate-400 uppercase tracking-wider mb-1">Received From Client</h5>
              <p className="font-extrabold text-slate-900 text-sm">{invoice.userName || 'Rayhanul Mobarak'}</p>
              <p className="text-slate-600">{invoice.userEmail || 'client@sukoonproperties.com'}</p>
              <p className="text-slate-600">+880 1913-780386</p>
            </div>
            <div>
              <h5 className="font-bold text-slate-400 uppercase tracking-wider mb-1">Transaction Details</h5>
              <p className="text-slate-700"><span className="font-semibold">Gateway:</span> {invoice.paymentMethod || 'bKash Merchant'}</p>
              <p className="text-slate-700"><span className="font-semibold">Txn ID:</span> {invoice.transactionId || 'BK88291039'}</p>
              <p className="text-slate-700"><span className="font-semibold">Status:</span> <span className="text-emerald-700 font-bold">{invoice.status || 'Successful'}</span></p>
            </div>
          </div>

          {/* Table */}
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="bg-slate-900 text-white font-bold">
                <th className="p-3 rounded-l-lg">Description / Purpose</th>
                <th className="p-3">Booking Code</th>
                <th className="p-3 text-right rounded-r-lg">Amount (BDT ৳)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              <tr>
                <td className="p-3 font-medium text-slate-900">
                  {invoice.purpose || 'Booking Token Deposit - Purbachal Smart City Plot'}
                </td>
                <td className="p-3 font-mono text-slate-600">{invoice.bookingId || 'SUK-2026-9901'}</td>
                <td className="p-3 text-right font-bold text-slate-900">৳ {Number(invoice.amountBDT || 500000).toLocaleString()}</td>
              </tr>
            </tbody>
          </table>

          {/* Total */}
          <div className="flex justify-end pt-2">
            <div className="w-64 bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-xs space-y-1">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal:</span>
                <span>৳ {Number(invoice.amountBDT || 500000).toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Vat / Tax (0% Exempt):</span>
                <span>৳ 0</span>
              </div>
              <div className="flex justify-between font-extrabold text-sm text-emerald-950 pt-2 border-t border-emerald-300">
                <span>Total Paid:</span>
                <span>৳ {Number(invoice.amountBDT || 500000).toLocaleString()} BDT</span>
              </div>
            </div>
          </div>

          {/* Verification Stamp */}
          <div className="pt-6 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
            <div className="flex items-center gap-2 text-emerald-800 font-bold">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <span>Digitally Signed by Sukoon Finance Department</span>
            </div>
            <div className="text-right">
              <p className="font-bold text-slate-800">Rayhanul Mobarak</p>
              <p className="text-[10px] text-slate-500">Director, Sukoon Properties Ltd.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
