import React from 'react';
import { Shield, Key, Database, Activity, UserCheck, Lock } from 'lucide-react';

export const SuperAdminPage: React.FC = () => {
  return (
    <div className="bg-[#FDFCF8] min-h-screen py-10 px-4 sm:px-8 space-y-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="bg-[#5A5A40] text-white p-6 rounded-3xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="w-8 h-8 text-amber-300" />
            <div>
              <span className="text-[10px] uppercase font-bold text-amber-300 tracking-wider">
                System Governance & Security
              </span>
              <h1 className="text-2xl font-serif font-bold text-[#FDFCF8]">Super Admin Control Desk</h1>
            </div>
          </div>
          <span className="text-xs bg-[#8C715E] text-white px-3 py-1 rounded-full font-bold">
            System Director Mode
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-[#E5E5DF] shadow-xs space-y-2">
            <Key className="w-6 h-6 text-[#5A5A40]" />
            <h3 className="font-serif font-bold text-base text-[#2D2926]">RBAC Access Controls</h3>
            <p className="text-xs text-[#8C8C7F]">Manage sales executive, buyer, investor, and director roles securely.</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#E5E5DF] shadow-xs space-y-2">
            <Database className="w-6 h-6 text-[#8C715E]" />
            <h3 className="font-serif font-bold text-base text-[#2D2926]">Database Schema DDL</h3>
            <p className="text-xs text-[#8C8C7F]">Inspect Supabase PostgreSQL schema DDL and Cloud Firestore security rules.</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#E5E5DF] shadow-xs space-y-2">
            <Activity className="w-6 h-6 text-[#5A5A40]" />
            <h3 className="font-serif font-bold text-base text-[#2D2926]">System Audit Logs</h3>
            <p className="text-xs text-[#8C8C7F]">Track all bKash transactions, deed mutations, and user session activity.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
