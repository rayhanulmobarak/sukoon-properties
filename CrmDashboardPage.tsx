import React from 'react';
import { Briefcase, Users, PhoneCall, Mail, CheckSquare, MessageSquare } from 'lucide-react';

export const CrmDashboardPage: React.FC = () => {
  const leads = [
    { name: 'Dr. Shahabuddin Ahmed', interest: 'Purbachal 5 Katha Plot', budget: '85 Lakhs', status: 'Site Visit Scheduled', priority: 'High' },
    { name: 'Tariq Mahmud (NRB UK)', interest: 'Gulshan Luxury Duplex', budget: '2.85 Crore', status: 'Deed Review', priority: 'High' },
    { name: 'Nusrat Jahan', interest: 'Uttara 4 Bed Apartment', budget: '1.9 Crore', status: 'Initial Contact', priority: 'Medium' },
  ];

  return (
    <div className="bg-[#FDFCF8] min-h-screen py-10 px-4 sm:px-8 space-y-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="border-b border-[#E5E5DF] pb-4">
          <span className="text-xs font-bold uppercase tracking-widest text-[#8C715E]">
            Sales Pipeline & Lead CRM
          </span>
          <h1 className="text-3xl font-serif text-[#2D2926] mt-1">Sukoon Executive CRM Desk</h1>
        </div>

        <div className="bg-white rounded-2xl border border-[#E5E5DF] overflow-hidden text-xs">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#2D2926] text-white font-bold">
                <th className="p-3">Client Name</th>
                <th className="p-3">Interested Unit</th>
                <th className="p-3">Budget</th>
                <th className="p-3">Pipeline Status</th>
                <th className="p-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E5DF]">
              {leads.map((lead, idx) => (
                <tr key={idx} className="hover:bg-[#F5F5F0]">
                  <td className="p-3 font-serif font-bold text-[#2D2926]">{lead.name}</td>
                  <td className="p-3 text-[#5A5A40] font-semibold">{lead.interest}</td>
                  <td className="p-3 text-[#8C715E] font-bold">৳ {lead.budget}</td>
                  <td className="p-3"><span className="bg-[#5A5A40]/10 text-[#5A5A40] font-bold px-2 py-0.5 rounded-full">{lead.status}</span></td>
                  <td className="p-3 text-right">
                    <button className="px-3 py-1 bg-[#8C715E] text-white font-bold rounded hover:bg-[#745B4A]">
                      Log Contact
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
