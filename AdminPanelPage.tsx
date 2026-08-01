import React, { useState } from 'react';
import { Property, Project } from '../../types';
import { LayoutDashboard, Plus, Edit, Trash2, Check, X, Building2, Users, DollarSign, FileText } from 'lucide-react';

interface AdminPanelPageProps {
  properties: Property[];
  projects: Project[];
}

export const AdminPanelPage: React.FC<AdminPanelPageProps> = ({ properties, projects }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'properties' | 'projects' | 'bookings'>('overview');

  return (
    <div className="bg-[#FDFCF8] min-h-screen py-10 px-4 sm:px-8 space-y-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="bg-[#2D2926] text-white p-6 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="text-[10px] bg-[#5A5A40] text-white font-bold px-2 py-0.5 rounded uppercase">
              SUKOON MANAGEMENT PORTAL
            </span>
            <h1 className="text-2xl font-serif font-bold text-[#FDFCF8] mt-1">Property & Inventory Admin</h1>
          </div>
          <button
            onClick={() => alert('Add Property Modal opened')}
            className="px-4 py-2 bg-[#8C715E] hover:bg-[#745B4A] text-white text-xs font-bold rounded-full transition flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" /> Add New Listing
          </button>
        </div>

        {/* Admin Navigation */}
        <div className="flex gap-2 border-b border-[#E5E5DF] pb-2 text-xs font-medium text-[#5A5A40]">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-full transition ${activeTab === 'overview' ? 'bg-[#5A5A40] text-white font-bold' : 'hover:bg-[#F5F5F0]'}`}
          >
            Dashboard Analytics
          </button>
          <button
            onClick={() => setActiveTab('properties')}
            className={`px-4 py-2 rounded-full transition ${activeTab === 'properties' ? 'bg-[#5A5A40] text-white font-bold' : 'hover:bg-[#F5F5F0]'}`}
          >
            Manage Listings ({properties.length})
          </button>
          <button
            onClick={() => setActiveTab('projects')}
            className={`px-4 py-2 rounded-full transition ${activeTab === 'projects' ? 'bg-[#5A5A40] text-white font-bold' : 'hover:bg-[#F5F5F0]'}`}
          >
            Mega Projects ({projects.length})
          </button>
        </div>

        {/* Tab 1: Overview */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-[#E5E5DF]">
                <span className="text-[10px] uppercase font-bold text-[#8C8C7F]">Total Active Plots</span>
                <p className="font-serif text-2xl font-bold text-[#5A5A40] mt-1">{properties.length}</p>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-[#E5E5DF]">
                <span className="text-[10px] uppercase font-bold text-[#8C8C7F]">Bookings This Month</span>
                <p className="font-serif text-2xl font-bold text-[#8C715E] mt-1">42 Units</p>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-[#E5E5DF]">
                <span className="text-[10px] uppercase font-bold text-[#8C8C7F]">Gross Revenue (BDT)</span>
                <p className="font-serif text-2xl font-bold text-[#2D2926] mt-1">৳ 18.4 Crore</p>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-[#E5E5DF]">
                <span className="text-[10px] uppercase font-bold text-[#8C8C7F]">Pending Site Visits</span>
                <p className="font-serif text-2xl font-bold text-[#5A5A40] mt-1">19 VIP Requests</p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Properties Table */}
        {activeTab === 'properties' && (
          <div className="bg-white rounded-2xl border border-[#E5E5DF] overflow-hidden text-xs">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#2D2926] text-white font-bold">
                  <th className="p-3">Title</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">District</th>
                  <th className="p-3">Price</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E5DF]">
                {properties.map((p) => (
                  <tr key={p.id} className="hover:bg-[#F5F5F0]">
                    <td className="p-3 font-serif font-bold text-[#2D2926]">{p.title}</td>
                    <td className="p-3 text-[#8C8C7F]">{p.category}</td>
                    <td className="p-3 text-[#8C8C7F]">{p.district}</td>
                    <td className="p-3 font-bold text-[#5A5A40]">{p.priceFormatted}</td>
                    <td className="p-3"><span className="bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">{p.status}</span></td>
                    <td className="p-3 text-right space-x-2">
                      <button className="p-1.5 text-[#5A5A40] hover:bg-[#E5E5DF] rounded"><Edit className="w-4 h-4" /></button>
                      <button className="p-1.5 text-rose-600 hover:bg-rose-50 rounded"><Trash2 className="w-4 h-4" /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
