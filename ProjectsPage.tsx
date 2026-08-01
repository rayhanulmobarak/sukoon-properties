import React from 'react';
import { Project } from '../../types';
import { MapPin, FileText, Calendar, Building2, CheckCircle2 } from 'lucide-react';

interface ProjectsPageProps {
  projects: Project[];
  onOpenBookingModal: (type?: string) => void;
  onOpenBrochureModal: (project: Project) => void;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({
  projects,
  onOpenBookingModal,
  onOpenBrochureModal,
}) => {
  return (
    <div className="bg-[#FDFCF8] min-h-screen py-10 px-4 sm:px-8 space-y-10">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="border-b border-[#E5E5DF] pb-4">
          <span className="text-xs font-bold uppercase tracking-widest text-[#8C8C7F]">
            Sukoon Housing Projects
          </span>
          <h1 className="text-3xl font-serif text-[#2D2926] mt-1">Flagship Townships & Developments</h1>
          <p className="text-xs text-[#8C8C7F] mt-1">
            Explore RAJA-approved masterplan townships in Purbachal Smart City, Gulshan luxury towers, and Uttara model estates.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((proj) => (
            <div
              key={proj.id}
              className="bg-white rounded-3xl border border-[#E5E5DF] overflow-hidden shadow-sm hover:shadow-xl transition flex flex-col justify-between"
            >
              <div>
                <div className="relative h-64 overflow-hidden bg-[#2D2926]">
                  <img
                    src={proj.coverImage}
                    alt={proj.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute top-4 left-4 bg-[#2D2926]/90 text-[#FDFCF8] text-[10px] font-bold px-3 py-1 rounded-full uppercase">
                    {proj.category}
                  </span>
                  <span className="absolute top-4 right-4 bg-[#5A5A40] text-white text-[10px] font-bold px-3 py-1 rounded-full">
                    {proj.status}
                  </span>
                </div>

                <div className="p-6 space-y-4">
                  <div>
                    <h2 className="font-serif font-bold text-xl text-[#2D2926]">{proj.title}</h2>
                    <p className="text-xs text-[#8C8C7F] flex items-center gap-1 mt-1">
                      <MapPin className="w-3.5 h-3.5 text-[#8C715E]" /> {proj.location}
                    </p>
                  </div>

                  <p className="text-xs text-[#2D2926]/80 leading-relaxed">{proj.description}</p>

                  <div className="space-y-1.5 pt-2">
                    <span className="text-[10px] uppercase font-bold text-[#8C8C7F] block">Project Highlights</span>
                    <div className="grid grid-cols-2 gap-2 text-xs text-[#2D2926]">
                      {proj.highlights.map((h, idx) => (
                        <div key={idx} className="flex items-center gap-1.5 bg-[#F5F5F0] p-2 rounded-xl">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#5A5A40] shrink-0" />
                          <span className="truncate">{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0 space-y-3">
                <div className="flex items-center justify-between text-xs border-t border-[#E5E5DF] pt-4">
                  <span className="text-[#8C8C7F]">Starting Price:</span>
                  <span className="font-serif font-bold text-lg text-[#5A5A40]">
                    ৳ {(proj.startPriceBDT / 100000).toFixed(2)} Lakh
                  </span>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => onOpenBrochureModal(proj)}
                    className="w-1/2 bg-[#F5F5F0] hover:bg-[#E5E5DF] text-[#2D2926] text-xs font-bold py-2.5 rounded-xl transition flex items-center justify-center gap-1"
                  >
                    <FileText className="w-3.5 h-3.5 text-[#5A5A40]" /> Download Brochure
                  </button>
                  <button
                    onClick={() => onOpenBookingModal('Plot Reservation')}
                    className="w-1/2 bg-[#5A5A40] hover:bg-[#484833] text-white text-xs font-bold py-2.5 rounded-xl transition shadow"
                  >
                    Book Plot / Unit
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
