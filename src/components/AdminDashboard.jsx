import React, { useState, useEffect } from 'react';
import { supabase } from '../config/supabase';
import { Users, CheckCircle, XCircle, Lock, Database } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  
  const [rsvps, setRsvps] = useState([]);
  const [loading, setLoading] = useState(true);

  // In a real production app, use an environment variable (e.g. import.meta.env.VITE_ADMIN_PIN)
  // For this template, you can change this PIN here:
  const ADMIN_PIN = 'Jishnu2005';

  const handleLogin = (e) => {
    e.preventDefault();
    if (pin === ADMIN_PIN) {
      setIsAuthenticated(true);
      fetchData();
    } else {
      setError('Incorrect PIN');
      setPin('');
    }
  };

  const fetchData = async () => {
    setLoading(true);
    if (!supabase) {
      // Demo mode fallback if Supabase isn't connected
      setRsvps([
        { id: 1, name: "John Doe", attending: true, people_count: 2, created_at: new Date().toISOString() },
        { id: 2, name: "Jane Smith", attending: false, people_count: 0, created_at: new Date().toISOString() }
      ]);
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('rsvps')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setRsvps(data || []);
    } catch (err) {
      console.error('Error fetching RSVPs:', err);
      alert('Failed to connect to Supabase database. Are your credentials correct?');
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#F8F7F4] flex items-center justify-center px-4 font-inter">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full border border-[rgba(107,142,107,0.2)]"
        >
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-[#F8F7F4] rounded-full flex items-center justify-center text-[#B8913A]">
              <Lock size={28} />
            </div>
          </div>
          <h1 className="text-2xl font-cormorant font-bold text-center text-[#2C2C2C] mb-2">Admin Dashboard</h1>
          <p className="text-sm text-center text-[#7A7060] mb-8">Enter the security PIN to view RSVP responses.</p>
          
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <div>
              <input
                type="password"
                value={pin}
                onChange={(e) => { setPin(e.target.value); setError(''); }}
                placeholder="Enter Password"
                className="w-full px-4 py-3 rounded-xl border border-[rgba(107,142,107,0.2)] bg-[#FAF8F2] text-center tracking-widest outline-none focus:border-[#6B8E6B] transition-colors"
                autoFocus
              />
              {error && <p className="text-red-500 text-xs text-center mt-2">{error}</p>}
            </div>
            
            <button
              type="submit"
              className="w-full bg-[#6B8E6B] text-white py-3 rounded-xl font-medium tracking-wide hover:bg-[#5A7A5A] transition shadow-md"
            >
              Unlock Dashboard
            </button>
            <a href="/" className="text-center text-xs text-[#7A7060] hover:text-[#B8913A] mt-2 underline">Return to Wedding Card</a>
          </form>
        </motion.div>
      </div>
    );
  }

  // Calculate stats
  const totalResponses = rsvps.length;
  const totalAttending = rsvps.filter(r => r.attending).length;
  const totalDeclined = rsvps.filter(r => !r.attending).length;
  const totalHeadcount = rsvps.reduce((sum, r) => sum + (r.people_count || 0), 0);

  return (
    <div className="min-h-screen bg-[#F8F7F4] font-inter pb-12">
      {/* Header */}
      <header className="bg-white border-b border-[rgba(107,142,107,0.15)] sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3 text-[#2C2C2C]">
            <Database className="text-[#B8913A]" size={20} />
            <h1 className="font-cormorant font-bold text-xl">RSVP Engine</h1>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={fetchData} className="text-sm font-medium text-[#6B8E6B] hover:opacity-80">Refresh Data</button>
            <a href="/" className="text-sm border border-[#7A7060] text-[#7A7060] px-4 py-1.5 rounded-full hover:bg-[rgba(122,112,96,0.05)] transition">Exit</a>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 mt-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-[rgba(107,142,107,0.1)]">
            <p className="text-xs font-semibold text-[#7A7060] uppercase tracking-wider mb-2">Submissions</p>
            <div className="flex items-end gap-3">
              <span className="text-3xl font-cormorant font-bold text-[#2C2C2C]">{totalResponses}</span>
            </div>
          </div>
          
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-[rgba(107,142,107,0.1)]">
            <p className="text-xs font-semibold text-[#7A7060] uppercase tracking-wider mb-2">Attending</p>
            <div className="flex items-end gap-3">
              <span className="text-3xl font-cormorant font-bold text-[#6B8E6B]">{totalAttending}</span>
              <CheckCircle className="text-[#6B8E6B] mb-1" size={18} />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow-sm border border-[rgba(107,142,107,0.1)]">
            <p className="text-xs font-semibold text-[#7A7060] uppercase tracking-wider mb-2">Declined</p>
            <div className="flex items-end gap-3">
              <span className="text-3xl font-cormorant font-bold text-[#C17A7A]">{totalDeclined}</span>
              <XCircle className="text-[#C17A7A] mb-1" size={18} />
            </div>
          </div>

          <div className="bg-[#6B8E6B] p-5 rounded-2xl shadow-md border border-[rgba(107,142,107,0.2)]">
            <p className="text-xs font-semibold text-white/80 uppercase tracking-wider mb-2">Total Headcount</p>
            <div className="flex items-end gap-3">
              <span className="text-3xl font-cormorant font-bold text-white">{totalHeadcount}</span>
              <Users className="text-white mb-1 opacity-90" size={18} />
            </div>
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-[rgba(107,142,107,0.15)] overflow-hidden">
          <div className="p-6 border-b border-[rgba(107,142,107,0.1)] bg-[#FAF8F2]">
            <h2 className="font-cormorant text-2xl font-bold text-[#2C2C2C]">Guest List</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white border-b border-[rgba(107,142,107,0.1)]">
                  <th className="px-6 py-4 text-xs font-semibold text-[#7A7060] uppercase tracking-wider">Date</th>
                  <th className="px-6 py-4 text-xs font-semibold text-[#7A7060] uppercase tracking-wider">Guest Name</th>
                  <th className="px-6 py-4 text-xs font-semibold text-[#7A7060] uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-xs font-semibold text-[#7A7060] uppercase tracking-wider text-right">Headcount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[rgba(107,142,107,0.08)]">
                {loading ? (
                  <tr>
                    <td colSpan="4" className="px-6 py-12 text-center text-[#7A7060]">Loading records...</td>
                  </tr>
                ) : rsvps.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="px-6 py-12 text-center text-[#7A7060]">No responses yet.</td>
                  </tr>
                ) : (
                  rsvps.map((rsvp) => (
                    <tr key={rsvp.id} className="hover:bg-[#F8F7F4] transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-xs text-[#7A7060]">
                        {new Date(rsvp.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                        <span className="block opacity-60 mt-0.5">{new Date(rsvp.created_at).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}</span>
                      </td>
                      <td className="px-6 py-4 font-medium text-[#2C2C2C]">
                        {rsvp.name}
                      </td>
                      <td className="px-6 py-4">
                        {rsvp.attending ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-[#e6f0e6] text-[#4A6A4A] border border-[rgba(107,142,107,0.2)]">
                            <CheckCircle size={12} /> Accepted
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-[#fcf0f0] text-[#a45a5a] border border-[rgba(193,122,122,0.2)]">
                            <XCircle size={12} /> Declined
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right font-semibold text-[#2C2C2C]">
                        {rsvp.attending ? rsvp.people_count : '-'}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
        
        {!supabase && (
          <div className="mt-8 p-4 bg-[#FFF8E7] border border-[#E5CA92] rounded-xl text-center text-sm text-[#7A6943]">
            <strong>Demo Mode:</strong> You are seeing placeholder data. Connect your .env variables to fetch live Supabase data.
          </div>
        )}
      </main>
    </div>
  );
}
