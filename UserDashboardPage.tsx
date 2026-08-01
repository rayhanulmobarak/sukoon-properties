import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Property } from '../../types';
import {
  User,
  Heart,
  FileText,
  CreditCard,
  Download,
  Building2,
  Calendar,
  CheckCircle2,
  Phone,
  Mail,
  Printer,
  ShieldCheck,
  Bell,
  Sliders,
  Sparkles,
  MapPin,
  Check,
  Send,
  Trash2,
  AlertCircle,
  ExternalLink,
} from 'lucide-react';

interface UserDashboardPageProps {
  properties: Property[];
  onSelectProperty: (property: Property) => void;
  onOpenInvoiceModal: (invoice: any) => void;
}

interface NotificationAlert {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  propertyId?: string;
  matchedCriteria: {
    location: string;
    priceBDT: number;
    category: string;
  };
}

export const UserDashboardPage: React.FC<UserDashboardPageProps> = ({
  properties,
  onSelectProperty,
  onOpenInvoiceModal,
}) => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<'alerts' | 'wishlist' | 'bookings' | 'invoices' | 'documents' | 'profile'>('alerts');

  // Investment Criteria State
  const [targetLocation, setTargetLocation] = useState<string>('Purbachal');
  const [targetCategory, setTargetCategory] = useState<string>('All');
  const [maxBudgetBDT, setMaxBudgetBDT] = useState<number>(35000000); // 3.5 Crore default
  const [minBedrooms, setMinBedrooms] = useState<number>(3);
  const [notificationsEnabled, setNotificationsEnabled] = useState<boolean>(true);
  const [whatsappAlerts, setWhatsappAlerts] = useState<boolean>(true);
  const [emailAlerts, setEmailAlerts] = useState<boolean>(true);

  // Notifications State
  const [notifications, setNotifications] = useState<NotificationAlert[]>([
    {
      id: 'notif-1',
      title: '🎯 Prime Match: Purbachal Sector 17 Plot',
      message: 'A 5 Katha Sector 17 South-facing corner plot matching your ৳3.5 Cr Purbachal budget was listed 15 mins ago!',
      timestamp: 'Just Now',
      read: false,
      propertyId: properties[0]?.id || 'prop-1',
      matchedCriteria: {
        location: 'Purbachal',
        priceBDT: 32000000,
        category: 'Plot',
      },
    },
    {
      id: 'notif-2',
      title: '🏢 Luxury Apartment: Gulshan Avenue Duplex',
      message: 'Special NRB price drop: 4500 Sqft 4-Bed Duplex matching your luxury criteria now has a 5% instant discount.',
      timestamp: '2 hours ago',
      read: false,
      propertyId: properties[1]?.id || 'prop-2',
      matchedCriteria: {
        location: 'Gulshan',
        priceBDT: 45000000,
        category: 'Apartment',
      },
    },
    {
      id: 'notif-3',
      title: '📈 RAJUK Masterplan Expansion Announcement',
      message: 'Purbachal 300 Feet Smart Highway extension approved. Expected +12% annual capital growth for your criteria area.',
      timestamp: '1 day ago',
      read: true,
      matchedCriteria: {
        location: 'Purbachal',
        priceBDT: 0,
        category: 'Market News',
      },
    },
  ]);

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Trigger simulated real-time match notification
  const handleSimulateNewMatch = () => {
    const randomProp = properties[Math.floor(Math.random() * properties.length)];
    const newNotif: NotificationAlert = {
      id: `notif-${Date.now()}`,
      title: `⚡ Instant Match: ${randomProp?.title || 'New Luxury Listing'}`,
      message: `New property matching your criteria in ${randomProp?.address || 'Dhaka'} listed for ৳${((randomProp?.priceBDT || 25000000) / 100000).toFixed(0)} Lakh!`,
      timestamp: 'Just Now',
      read: false,
      propertyId: randomProp?.id,
      matchedCriteria: {
        location: randomProp?.address || 'Purbachal',
        priceBDT: randomProp?.priceBDT || 25000000,
        category: randomProp?.category || 'Apartment',
      },
    };

    setNotifications((prev) => [newNotif, ...prev]);
    setToastMessage(`🔔 New alert: ${newNotif.title}`);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  // Matching properties dynamically based on active filter criteria
  const matchingProperties = properties.filter((p) => {
    const matchesLocation =
      targetLocation === 'All' || p.address.toLowerCase().includes(targetLocation.toLowerCase());
    const matchesCategory = targetCategory === 'All' || p.category === targetCategory;
    const matchesBudget = p.priceBDT <= maxBudgetBDT;
    const matchesBeds = !p.bedrooms || p.bedrooms >= minBedrooms;
    return matchesLocation && matchesCategory && matchesBudget && matchesBeds;
  });

  // Sample invoices for the user
  const invoices = [
    {
      invoiceNumber: 'INV-SUK-2026-8801',
      date: '2026-07-28',
      userName: user?.name || 'Rayhanul Mobarak',
      userEmail: user?.email || 'mrayhanul@gmail.com',
      paymentMethod: 'bKash Merchant',
      transactionId: 'BK88291039',
      purpose: 'Booking Token Deposit - Purbachal Smart City 5 Katha Plot',
      bookingId: 'SUK-2026-9901',
      amountBDT: 500000,
      status: 'Successful',
    },
    {
      invoiceNumber: 'INV-SUK-2026-8802',
      date: '2026-06-15',
      userName: user?.name || 'Rayhanul Mobarak',
      userEmail: user?.email || 'mrayhanul@gmail.com',
      paymentMethod: 'SSLCommerz (Visa)',
      transactionId: 'SSL994821',
      purpose: 'Monthly Installment #3 - Gulshan Executive Duplex',
      bookingId: 'SUK-2026-9902',
      amountBDT: 150000,
      status: 'Successful',
    },
  ];

  return (
    <div className="bg-[#FDFCF8] min-h-screen py-10 px-4 sm:px-8 space-y-8">
      {/* Toast Alert Popup */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl border border-emerald-500/50 flex items-center gap-3 animate-bounce">
          <Bell className="w-5 h-5 text-amber-400" />
          <span className="text-xs font-bold">{toastMessage}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto space-y-6">
        {/* User Profile Header */}
        <div className="bg-[#5A5A40] text-white p-6 sm:p-8 rounded-3xl shadow-lg flex flex-col sm:flex-row items-center justify-between gap-6 border border-[#484833]">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-[#8C715E] text-white flex items-center justify-center font-serif text-2xl font-bold border-2 border-[#FDFCF8]">
              {user?.name.charAt(0) || 'U'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-bold tracking-widest text-amber-300">
                  Verified Client Account
                </span>
                {unreadCount > 0 && (
                  <span className="bg-amber-500 text-slate-950 font-extrabold text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1">
                    <Bell className="w-3 h-3" /> {unreadCount} New Match Alerts
                  </span>
                )}
              </div>
              <h1 className="text-2xl font-serif font-bold text-[#FDFCF8]">{user?.name || 'Valued Client'}</h1>
              <p className="text-xs text-[#E5E5DF]">{user?.email} | {user?.phone || '+880 1913-780386'}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleSimulateNewMatch}
              className="px-3.5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-extrabold rounded-full transition shadow flex items-center gap-1.5"
            >
              <Sparkles className="w-4 h-4" /> Simulate Match Alert
            </button>
            <button
              onClick={logout}
              className="px-4 py-2 bg-[#8C715E] hover:bg-[#745B4A] text-white text-xs font-semibold rounded-full transition shadow"
            >
              Sign Out Account
            </button>
          </div>
        </div>

        {/* Dashboard Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-[#E5E5DF] overflow-x-auto pb-2 text-xs font-medium text-[#5A5A40]">
          <button
            onClick={() => setActiveTab('alerts')}
            className={`px-4 py-2 rounded-full transition flex items-center gap-1.5 ${
              activeTab === 'alerts' ? 'bg-[#5A5A40] text-white font-bold' : 'hover:bg-[#F5F5F0]'
            }`}
          >
            <Bell className="w-4 h-4 text-amber-400" />
            <span>Investment Alerts & Real-Time Matches</span>
            {unreadCount > 0 && (
              <span className="bg-amber-400 text-slate-950 font-bold px-1.5 py-0.2 rounded-full text-[10px]">
                {unreadCount}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('bookings')}
            className={`px-4 py-2 rounded-full transition ${
              activeTab === 'bookings' ? 'bg-[#5A5A40] text-white font-bold' : 'hover:bg-[#F5F5F0]'
            }`}
          >
            My Bookings & Reservations
          </button>
          <button
            onClick={() => setActiveTab('invoices')}
            className={`px-4 py-2 rounded-full transition ${
              activeTab === 'invoices' ? 'bg-[#5A5A40] text-white font-bold' : 'hover:bg-[#F5F5F0]'
            }`}
          >
            Payment Invoices & Receipts
          </button>
          <button
            onClick={() => setActiveTab('wishlist')}
            className={`px-4 py-2 rounded-full transition ${
              activeTab === 'wishlist' ? 'bg-[#5A5A40] text-white font-bold' : 'hover:bg-[#F5F5F0]'
            }`}
          >
            Saved Wishlist ({properties.slice(0, 2).length})
          </button>
          <button
            onClick={() => setActiveTab('documents')}
            className={`px-4 py-2 rounded-full transition ${
              activeTab === 'documents' ? 'bg-[#5A5A40] text-white font-bold' : 'hover:bg-[#F5F5F0]'
            }`}
          >
            Legal Mutation & RAJUK Deeds
          </button>
        </div>

        {/* Tab 0: Investment Alerts & Real-Time Matches */}
        {activeTab === 'alerts' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Column 1: Investment Criteria Configuration */}
            <div className="lg:col-span-5 space-y-5 bg-white p-6 rounded-3xl border border-[#E5E5DF] shadow-xs">
              <div className="flex items-center justify-between border-b border-[#E5E5DF] pb-4">
                <div>
                  <span className="bg-[#5A5A40] text-white text-[10px] font-bold px-2 py-0.5 rounded">
                    REAL-TIME MATCH ENGINE
                  </span>
                  <h3 className="font-serif text-lg font-bold text-[#2D2926] mt-1">
                    Your Investment Criteria
                  </h3>
                </div>
                <Sliders className="w-5 h-5 text-[#8C715E]" />
              </div>

              <div className="space-y-4 text-xs">
                {/* Location Selection */}
                <div>
                  <label className="block font-bold text-slate-800 mb-1 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-emerald-600" /> Preferred Location
                  </label>
                  <select
                    value={targetLocation}
                    onChange={(e) => setTargetLocation(e.target.value)}
                    className="w-full bg-[#F5F5F0] border border-slate-300 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#5A5A40] font-medium text-slate-900"
                  >
                    <option value="All">All Dhaka & Chattogram Locations</option>
                    <option value="Purbachal">Purbachal Smart City (Sector 17, 22, 300 Ft)</option>
                    <option value="Gulshan">Gulshan 1 & 2 (Avenue / Residential)</option>
                    <option value="Banani">Banani & DOHS Mohakhali</option>
                    <option value="Uttara">Uttara Model Town & Sector 13</option>
                    <option value="Chattogram">Chattogram Financial District</option>
                    <option value="Cox's Bazar">Cox's Bazar Sea View Beach Resort</option>
                  </select>
                </div>

                {/* Property Type */}
                <div>
                  <label className="block font-bold text-slate-800 mb-1">Property Category</label>
                  <div className="grid grid-cols-3 gap-2">
                    {['All', 'Plot', 'Apartment', 'Commercial', 'Duplex'].map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setTargetCategory(cat)}
                        className={`py-2 text-xs font-bold rounded-xl border transition ${
                          targetCategory === cat
                            ? 'bg-[#5A5A40] text-white border-[#484833] shadow-xs'
                            : 'bg-[#F5F5F0] text-slate-700 border-slate-200 hover:bg-slate-200'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Max Budget Slider */}
                <div>
                  <div className="flex justify-between items-center font-bold mb-1">
                    <span className="text-slate-800">Maximum Budget Limit</span>
                    <span className="text-[#8C715E] font-mono">
                      ৳ {(maxBudgetBDT / 100000).toFixed(0)} Lakh ({(maxBudgetBDT / 386).toLocaleString(undefined, { maximumFractionDigits: 0 })} KWD)
                    </span>
                  </div>
                  <input
                    type="range"
                    min="5000000"
                    max="100000000"
                    step="2500000"
                    value={maxBudgetBDT}
                    onChange={(e) => setMaxBudgetBDT(Number(e.target.value))}
                    className="w-full accent-[#8C715E] cursor-pointer h-2 bg-slate-200 rounded-lg"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 mt-0.5 font-mono">
                    <span>৳ 50 Lakh</span>
                    <span>৳ 10 Crore</span>
                  </div>
                </div>

                {/* Bedrooms Filter */}
                <div>
                  <label className="block font-bold text-slate-800 mb-1">Minimum Bedrooms (For Apartments)</label>
                  <div className="flex gap-2">
                    {[2, 3, 4, 5].map((beds) => (
                      <button
                        key={beds}
                        type="button"
                        onClick={() => setMinBedrooms(beds)}
                        className={`flex-1 py-1.5 text-xs font-bold rounded-xl border transition ${
                          minBedrooms === beds
                            ? 'bg-[#8C715E] text-white border-[#745B4A]'
                            : 'bg-[#F5F5F0] text-slate-700 border-slate-200'
                        }`}
                      >
                        {beds}+ Beds
                      </button>
                    ))}
                  </div>
                </div>

                {/* Real-time Notification Channels */}
                <div className="bg-[#F5F5F0] p-3.5 rounded-2xl space-y-2 border border-slate-200">
                  <span className="text-[10px] font-bold uppercase text-slate-500 block">Instant Alert Delivery Channels</span>
                  
                  <label className="flex items-center justify-between text-xs cursor-pointer">
                    <span className="text-slate-800 font-medium">In-App Live Push Alerts</span>
                    <input
                      type="checkbox"
                      checked={notificationsEnabled}
                      onChange={(e) => setNotificationsEnabled(e.target.checked)}
                      className="accent-emerald-600 rounded w-4 h-4 cursor-pointer"
                    />
                  </label>

                  <label className="flex items-center justify-between text-xs cursor-pointer">
                    <span className="text-slate-800 font-medium">WhatsApp Instant Alerts (+880 1913-780386)</span>
                    <input
                      type="checkbox"
                      checked={whatsappAlerts}
                      onChange={(e) => setWhatsappAlerts(e.target.checked)}
                      className="accent-emerald-600 rounded w-4 h-4 cursor-pointer"
                    />
                  </label>

                  <label className="flex items-center justify-between text-xs cursor-pointer">
                    <span className="text-slate-800 font-medium">Email Property Digest</span>
                    <input
                      type="checkbox"
                      checked={emailAlerts}
                      onChange={(e) => setEmailAlerts(e.target.checked)}
                      className="accent-emerald-600 rounded w-4 h-4 cursor-pointer"
                    />
                  </label>
                </div>
              </div>
            </div>

            {/* Column 2: Notification Feed & Live Matching Properties */}
            <div className="lg:col-span-7 space-y-6">
              {/* Notification Feed Header */}
              <div className="bg-white p-6 rounded-3xl border border-[#E5E5DF] shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Bell className="w-5 h-5 text-amber-500" />
                    <h3 className="font-serif text-lg font-bold text-[#2D2926]">Live Alert Feed</h3>
                    {unreadCount > 0 && (
                      <span className="bg-amber-500 text-slate-950 font-bold text-[10px] px-2 py-0.5 rounded-full">
                        {unreadCount} Unread
                      </span>
                    )}
                  </div>
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllAsRead}
                      className="text-xs font-bold text-[#8C715E] hover:underline flex items-center gap-1"
                    >
                      <Check className="w-3.5 h-3.5" /> Mark all as read
                    </button>
                  )}
                </div>

                <div className="space-y-3 max-h-[340px] overflow-y-auto pr-1">
                  {notifications.length === 0 ? (
                    <div className="p-8 text-center text-xs text-slate-400">
                      No notifications right now. Click "Simulate Match Alert" to test real-time alerts.
                    </div>
                  ) : (
                    notifications.map((notif) => (
                      <div
                        key={notif.id}
                        className={`p-4 rounded-2xl border transition relative ${
                          notif.read
                            ? 'bg-[#F5F5F0] border-slate-200 text-slate-700'
                            : 'bg-emerald-950 text-white border-emerald-600/60 shadow-md'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span
                                className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                                  notif.read ? 'bg-slate-200 text-slate-700' : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                                }`}
                              >
                                MATCH ALERT
                              </span>
                              <span className="text-[10px] opacity-75">{notif.timestamp}</span>
                            </div>
                            <h4 className="font-serif font-bold text-xs">{notif.title}</h4>
                            <p className="text-[11px] opacity-90 leading-relaxed">{notif.message}</p>
                          </div>

                          <button
                            onClick={() => deleteNotification(notif.id)}
                            className="p-1 opacity-50 hover:opacity-100 transition rounded"
                            title="Dismiss"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {notif.propertyId && (
                          <div className="mt-2.5 pt-2 border-t border-slate-700/50 flex items-center justify-between text-xs">
                            <span className="text-[10px] opacity-80">
                              Criteria: {notif.matchedCriteria.location} • Max ৳{(notif.matchedCriteria.priceBDT / 100000).toFixed(0)}L
                            </span>
                            <button
                              onClick={() => {
                                const matchedProp = properties.find((p) => p.id === notif.propertyId);
                                if (matchedProp) onSelectProperty(matchedProp);
                              }}
                              className="font-bold text-amber-300 hover:underline text-[11px] flex items-center gap-1"
                            >
                              <span>Inspect Property</span>
                              <ExternalLink className="w-3 h-3" />
                            </button>
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Real-time Filtered Matching Properties */}
              <div className="bg-white p-6 rounded-3xl border border-[#E5E5DF] shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase text-[#8C715E]">Auto-Matched Portfolio</span>
                    <h3 className="font-serif text-lg font-bold text-[#2D2926]">
                      {matchingProperties.length} Properties Matching Your Target Criteria
                    </h3>
                  </div>
                  <span className="bg-[#5A5A40] text-white text-[10px] font-mono px-2.5 py-1 rounded-full">
                    {targetLocation} | Max ৳{(maxBudgetBDT / 100000).toFixed(0)}L
                  </span>
                </div>

                {matchingProperties.length === 0 ? (
                  <div className="p-8 text-center text-xs text-slate-500 bg-[#F5F5F0] rounded-2xl border border-slate-200">
                    <AlertCircle className="w-6 h-6 text-amber-600 mx-auto mb-2" />
                    No properties currently match this exact criteria. Try increasing your max budget slider or changing location filter.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {matchingProperties.map((prop) => (
                      <div
                        key={prop.id}
                        onClick={() => onSelectProperty(prop)}
                        className="bg-[#F5F5F0] hover:bg-white p-3 rounded-2xl border border-slate-200 hover:border-[#5A5A40] transition cursor-pointer space-y-2 group shadow-xs"
                      >
                        <div className="relative">
                          <img
                            src={prop.images[0]}
                            alt={prop.title}
                            className="w-full h-32 object-cover rounded-xl group-hover:scale-[1.02] transition"
                          />
                          <span className="absolute top-2 left-2 bg-emerald-950 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded">
                            {prop.category}
                          </span>
                        </div>
                        <div>
                          <h4 className="font-serif font-bold text-xs text-slate-900 truncate group-hover:text-emerald-700">
                            {prop.title}
                          </h4>
                          <p className="text-[10px] text-slate-500 truncate">{prop.address}</p>
                          <div className="flex items-center justify-between mt-1 pt-1 border-t border-slate-200">
                            <span className="font-serif font-bold text-xs text-[#5A5A40]">
                              ৳ {(prop.priceBDT / 100000).toFixed(2)} Lakh
                            </span>
                            <span className="text-[10px] font-mono text-emerald-700 font-bold">
                              ≈ {(prop.priceBDT / 386).toFixed(0)} KWD
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Tab 1: Bookings */}
        {activeTab === 'bookings' && (
          <div className="space-y-4">
            <h3 className="font-serif text-lg text-[#2D2926]">Active Plot & Apartment Reservations</h3>
            <div className="bg-white p-6 rounded-2xl border border-[#E5E5DF] shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E5E5DF] pb-4 text-xs">
                <div>
                  <span className="text-[10px] bg-[#5A5A40] text-white font-bold px-2 py-0.5 rounded">
                    RESERVATION CONFIRMED
                  </span>
                  <h4 className="font-serif font-bold text-base text-[#2D2926] mt-1">
                    Purbachal Smart City Sector 22 - 5 Katha Plot
                  </h4>
                  <p className="text-[#8C8C7F]">Booking Code: SUK-2026-9901 | Date: 2026-07-28</p>
                </div>
                <div className="text-left sm:text-right">
                  <span className="text-[#8C8C7F] block text-[10px] font-bold uppercase">Token Deposit Paid</span>
                  <span className="font-serif font-bold text-lg text-[#5A5A40]">৳ 5,00,000 BDT</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#8C8C7F]">
                <span>Status: <strong className="text-emerald-700">Registration Deed Under Process</strong></span>
                <button
                  onClick={() => onOpenInvoiceModal(invoices[0])}
                  className="px-3 py-1.5 bg-[#8C715E] text-white rounded-lg font-bold flex items-center gap-1 hover:bg-[#745B4A] transition"
                >
                  <Printer className="w-3.5 h-3.5" /> View Official Receipt
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Invoices */}
        {activeTab === 'invoices' && (
          <div className="space-y-4">
            <h3 className="font-serif text-lg text-[#2D2926]">Payment History & Tax Receipts</h3>
            <div className="bg-white rounded-2xl border border-[#E5E5DF] shadow-xs overflow-hidden text-xs">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#2D2926] text-white font-bold">
                    <th className="p-3">Invoice #</th>
                    <th className="p-3">Date</th>
                    <th className="p-3">Purpose</th>
                    <th className="p-3">Gateway</th>
                    <th className="p-3 text-right">Amount BDT</th>
                    <th className="p-3 text-center">Receipt</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5E5DF]">
                  {invoices.map((inv, idx) => (
                    <tr key={idx} className="hover:bg-[#F5F5F0]">
                      <td className="p-3 font-mono font-bold text-[#5A5A40]">{inv.invoiceNumber}</td>
                      <td className="p-3 text-[#8C8C7F]">{inv.date}</td>
                      <td className="p-3 text-[#2D2926]">{inv.purpose}</td>
                      <td className="p-3 text-[#8C8C7F]">{inv.paymentMethod}</td>
                      <td className="p-3 text-right font-serif font-bold text-[#2D2926]">
                        ৳ {inv.amountBDT.toLocaleString()}
                      </td>
                      <td className="p-3 text-center">
                        <button
                          onClick={() => onOpenInvoiceModal(inv)}
                          className="px-2.5 py-1 bg-[#5A5A40] text-white rounded font-bold hover:bg-[#484833] transition"
                        >
                          Invoice PDF
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: Wishlist */}
        {activeTab === 'wishlist' && (
          <div className="space-y-4">
            <h3 className="font-serif text-lg text-[#2D2926]">Saved Favorites</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {properties.slice(0, 2).map((prop) => (
                <div key={prop.id} className="bg-white p-4 rounded-2xl border border-[#E5E5DF] flex gap-4">
                  <img src={prop.images[0]} alt="" className="w-24 h-24 object-cover rounded-xl" />
                  <div className="flex-1 space-y-1 text-xs">
                    <h4 className="font-serif font-bold text-[#2D2926] text-sm">{prop.title}</h4>
                    <p className="text-[#8C8C7F]">{prop.address}</p>
                    <p className="font-serif font-bold text-[#5A5A40]">{prop.priceFormatted}</p>
                    <button
                      onClick={() => onSelectProperty(prop)}
                      className="mt-2 text-[11px] font-bold text-[#8C715E] hover:underline"
                    >
                      View Property &rarr;
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Documents */}
        {activeTab === 'documents' && (
          <div className="space-y-4">
            <h3 className="font-serif text-lg text-[#2D2926]">Official RAJUK & Land Mutation Documents</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="bg-white p-4 rounded-2xl border border-[#E5E5DF] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FileText className="w-6 h-6 text-[#5A5A40]" />
                  <div>
                    <p className="font-bold text-[#2D2926]">RAJUK Approved Masterplan Map.pdf</p>
                    <p className="text-[10px] text-[#8C8C7F]">Official Sector 22 Map (12 MB)</p>
                  </div>
                </div>
                <button
                  onClick={() => alert('Downloading official RAJUK Map PDF...')}
                  className="p-2 bg-[#F5F5F0] rounded-lg hover:bg-[#E5E5DF]"
                >
                  <Download className="w-4 h-4 text-[#5A5A40]" />
                </button>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-[#E5E5DF] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-6 h-6 text-[#8C715E]" />
                  <div>
                    <p className="font-bold text-[#2D2926]">Land Mutation Deed Verification.pdf</p>
                    <p className="text-[10px] text-[#8C8C7F]">Sukoon Director Legal Seal (4 MB)</p>
                  </div>
                </div>
                <button
                  onClick={() => alert('Downloading Mutation Deed Verification...')}
                  className="p-2 bg-[#F5F5F0] rounded-lg hover:bg-[#E5E5DF]"
                >
                  <Download className="w-4 h-4 text-[#5A5A40]" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

