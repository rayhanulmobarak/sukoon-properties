import React, { useState } from 'react';
import { FloorPlan } from '../../types';
import { X, ZoomIn, ZoomOut, Download, Layout, Layers } from 'lucide-react';

interface FloorPlanViewerProps {
  isOpen: boolean;
  onClose: () => void;
  floorPlans: FloorPlan[];
  propertyTitle: string;
}

export const FloorPlanViewer: React.FC<FloorPlanViewerProps> = ({ isOpen, onClose, floorPlans, propertyTitle }) => {
  const [activePlan, setActivePlan] = useState<FloorPlan>(floorPlans[0] || {
    id: 'fp_default',
    title: 'Standard Architectural Unit Floor Plan',
    size: '2400 Sq Ft',
    rooms: '3 Bed, 4 Bath, 3 Balconies',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
  });
  const [zoom, setZoom] = useState(1);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full shadow-2xl overflow-hidden border border-slate-200 flex flex-col h-[80vh]">
        {/* Header */}
        <div className="bg-slate-900 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layout className="w-5 h-5 text-amber-400" />
            <div>
              <h3 className="font-extrabold text-base">Architectural Floor Plan & Blueprint</h3>
              <p className="text-xs text-slate-300 truncate max-w-md">{propertyTitle}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Plan Switcher Bar */}
        {floorPlans.length > 1 && (
          <div className="bg-slate-100 p-3 border-b border-slate-200 flex items-center gap-2 overflow-x-auto">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider shrink-0">Layouts:</span>
            {floorPlans.map((plan) => (
              <button
                key={plan.id}
                onClick={() => setActivePlan(plan)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                  activePlan.id === plan.id
                    ? 'bg-emerald-800 text-white shadow'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                {plan.title}
              </button>
            ))}
          </div>
        )}

        {/* Viewport */}
        <div className="flex-1 bg-slate-950 p-6 relative flex items-center justify-center overflow-auto">
          <div
            className="transition-transform duration-200 max-w-full max-h-full"
            style={{ transform: `scale(${zoom})` }}
          >
            <img
              src={activePlan.image}
              alt={activePlan.title}
              className="max-h-[60vh] object-contain rounded-lg shadow-2xl border border-slate-800"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Controls Overlay */}
          <div className="absolute bottom-4 right-4 bg-slate-900/90 backdrop-blur border border-slate-700 rounded-xl p-1.5 flex items-center gap-2 text-white">
            <button
              onClick={() => setZoom((z) => Math.max(0.8, z - 0.2))}
              className="p-1.5 hover:bg-slate-800 rounded text-slate-300"
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="text-xs font-mono font-bold w-12 text-center">{Math.round(zoom * 100)}%</span>
            <button
              onClick={() => setZoom((z) => Math.min(2.5, z + 0.2))}
              className="p-1.5 hover:bg-slate-800 rounded text-slate-300"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Details Footer */}
        <div className="bg-white p-4 border-t border-slate-200 flex items-center justify-between">
          <div>
            <h5 className="font-bold text-slate-900 text-sm">{activePlan.title}</h5>
            <p className="text-xs text-slate-500 mt-0.5">
              Dimensions: <span className="font-semibold text-emerald-800">{activePlan.size}</span> | Configuration:{' '}
              <span className="font-semibold text-slate-800">{activePlan.rooms}</span>
            </p>
          </div>
          <button
            onClick={() => alert(`Downloading high resolution architectural CAD/PDF floor plan for ${activePlan.title}...`)}
            className="bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold px-4 py-2 rounded-lg flex items-center gap-1.5 shadow transition"
          >
            <Download className="w-3.5 h-3.5 text-amber-300" />
            <span>Download CAD / PDF</span>
          </button>
        </div>
      </div>
    </div>
  );
};
