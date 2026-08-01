import React from 'react';
import { X, Download, FileText, CheckCircle, Shield, Building2 } from 'lucide-react';
import { Project } from '../../types';

interface BrochureModalProps {
  isOpen: boolean;
  onClose: () => void;
  project?: Project | null;
}

export const BrochureModal: React.FC<BrochureModalProps> = ({ isOpen, onClose, project }) => {
  if (!isOpen || !project) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl overflow-hidden border border-slate-200">
        <div className="bg-slate-900 text-white p-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-6 h-6 text-amber-400" />
            <div>
              <span className="text-xs bg-emerald-900 text-emerald-300 font-bold px-2 py-0.5 rounded">
                PDF BROCHURE DOWNLOAD
              </span>
              <h3 className="font-extrabold text-lg mt-0.5">{project.title}</h3>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-white rounded-lg">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="flex gap-4 items-center bg-slate-50 p-4 rounded-xl border border-slate-200">
            <img
              src={project.coverImage}
              alt={project.title}
              className="w-24 h-24 object-cover rounded-lg shadow shrink-0"
              referrerPolicy="no-referrer"
            />
            <div>
              <h4 className="font-bold text-slate-900 text-sm">{project.title}</h4>
              <p className="text-xs text-slate-600 mt-1">{project.location}</p>
              <p className="text-xs font-semibold text-emerald-800 mt-1">
                Category: {project.category} | Starting Price: ৳ {(project.startPriceBDT / 100000).toFixed(2)} Lakh
              </p>
            </div>
          </div>

          <div>
            <h5 className="font-bold text-xs uppercase text-slate-400 tracking-wider mb-2">
              Brochure Highlights & Masterplan Contents:
            </h5>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
              {project.highlights.map((h, idx) => (
                <div key={idx} className="flex items-center gap-2 bg-emerald-50/60 p-2 rounded-lg border border-emerald-100">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{h}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-center justify-between text-xs text-amber-950">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-amber-600 shrink-0" />
              <span>Includes full RAJA approval letter, soil test report, and layout map.</span>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              onClick={onClose}
              className="w-1/3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs py-3 rounded-xl transition"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                alert(`Downloading complete PDF brochure for ${project.title} (Sukoon Properties Ltd.)...`);
                onClose();
              }}
              className="w-2/3 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs py-3 rounded-xl shadow-md transition flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4 text-amber-300" />
              <span>Download Full Brochure (PDF 12 MB)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
