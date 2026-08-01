import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { ProductMode, UserRole } from '../../types';
import LanguageSwitcher from './LanguageSwitcher';
import { initialProperties, initialProjects } from '../../data/propertiesData';
import {
  Building2,
  Phone,
  Mail,
  Heart,
  User as UserIcon,
  Globe,
  Smartphone,
  Shield,
  Briefcase,
  FileCode,
  LayoutDashboard,
  Search,
  Menu,
  X,
  ChevronDown,
  Sparkles,
  MapPin,
  Calendar,
  ExternalLink,
  Sun,
  Moon,
} from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenBookingModal: (type?: string) => void;
  onOpenAppDownloadModal?: () => void;
  onOpenAuthModal?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenBookingModal,
  onOpenAppDownloadModal,
  onOpenAuthModal,
}) => {
  const { t, language, setLanguage, isRtl } = useLanguage();
  const { user, role, setRole, productMode, setProductMode, logout, login } = useAuth();
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [modeDropdownOpen, setModeDropdownOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const sitePages = [
    { id: 'home', title: language === 'bn' ? 'হোম পেজ' : language === 'ar' ? 'الرئيسية' : 'Home Page', desc: 'Main landing, featured properties & executive vision' },
    { id: 'projects', title: language === 'bn' ? 'হাউজিং ও স্মার্ট সিটি প্রজেক্ট' : language === 'ar' ? 'مشاريع الإسكان والمدينة الذكية' : 'Housing & Smart City Projects', desc: 'Purbachal Township, Eco-plots & Gulshan Duplex' },
    { id: 'properties', title: language === 'bn' ? 'সকল প্রপার্টি লিস্টিং' : language === 'ar' ? 'جميع قائمة العقارات' : 'All Property Listings', desc: 'Filter duplexes, apartments & RAJUK plots by price' },
    { id: 'international', title: language === 'bn' ? 'আন্তর্জাতিক ও NRB ইনভেস্টর হাব (KWD)' : language === 'ar' ? 'المكتب الدولي والمستثمر الخارجي' : 'Global & NRB Investor Hub (KWD Rate)', desc: 'Live KWD/USD Currency Converter, Remittance guide & PoA' },
    { id: 'about', title: language === 'bn' ? 'আমাদের কথা ও ব্যবস্থাপনা নির্দেশিকা' : language === 'ar' ? 'عن الشركة ورسالة المدير' : 'About Us & Leadership', desc: 'Director Rayhanul Mobarak & company mission' },
    { id: 'gallery', title: language === 'bn' ? 'ভিডিও ও ফটোগ্যালারি' : language === 'ar' ? 'معرض الصور والفيديو' : 'Media & Video Gallery', desc: 'Project walkthroughs, drone footage & 3D renders' },
    { id: 'blog', title: language === 'bn' ? 'রিয়েল এস্টেট নিউজ ও আইন' : language === 'ar' ? 'أخبار العقارات والأدلة' : 'Real Estate News & Legal Guide', desc: 'Land buying tips, RAJUK rules & market trends' },
    { id: 'contact', title: language === 'bn' ? 'যোগাযোগ ও ব্রাঞ্চ অফিস' : language === 'ar' ? 'اتصل بنا والمكاتب' : 'Contact & Branch Offices', desc: 'Gulshan Corporate HQ hotline +880 1913-780386' },
    { id: 'dashboard', title: language === 'bn' ? 'কাস্টমার পোর্টাল ও উইশলিস্ট' : language === 'ar' ? 'بوابة العميل' : 'Customer Portal & Saved Properties', desc: 'View bookings, receipt invoices & wishlist' },
    { id: 'crm', title: language === 'bn' ? 'সেলস সিআরএম পোর্টাল' : language === 'ar' ? 'نظام CRM المبيعات' : 'Sales CRM Portal', desc: 'Lead management & sales pipeline tracking' },
    { id: 'admin', title: language === 'bn' ? 'কোম্পানি অ্যাডমিন প্যানেল' : language === 'ar' ? 'لوحة الإدارة' : 'Corporate Admin Panel', desc: 'Manage listings, clients & financial records' },
    { id: 'api_docs', title: language === 'bn' ? 'ডেভেলপার API ডকুমেন্টেশন' : language === 'ar' ? 'وثائق API Developer' : 'Developer API Documentation', desc: 'Integration endpoints & SDK' },
  ];

  const filteredProperties = searchQuery.trim()
    ? initialProperties.filter(
        (p) =>
          p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.district.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const filteredProjects = searchQuery.trim()
    ? initialProjects.filter(
        (p) =>
          p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const filteredPages = searchQuery.trim()
    ? sitePages.filter(
        (p) =>
          p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.id.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const hasSearchMatches = filteredProperties.length > 0 || filteredProjects.length > 0 || filteredPages.length > 0;

  const productModesList: { id: ProductMode; label: string; icon: React.ReactNode }[] = [
    { id: 'website', label: t.productModes.website, icon: <Globe className="w-4 h-4 text-emerald-600" /> },
    { id: 'mobile_app', label: t.productModes.mobileApp, icon: <Smartphone className="w-4 h-4 text-blue-600" /> },
    { id: 'pwa', label: t.productModes.pwa, icon: <Sparkles className="w-4 h-4 text-amber-500" /> },
    { id: 'user_dashboard', label: t.productModes.userDashboard, icon: <UserIcon className="w-4 h-4 text-purple-600" /> },
    { id: 'admin_panel', label: t.productModes.adminPanel, icon: <LayoutDashboard className="w-4 h-4 text-indigo-600" /> },
    { id: 'super_admin', label: t.productModes.superAdmin, icon: <Shield className="w-4 h-4 text-rose-600" /> },
    { id: 'crm', label: t.productModes.crm, icon: <Briefcase className="w-4 h-4 text-amber-600" /> },
    { id: 'api_docs', label: t.productModes.apiDocs, icon: <FileCode className="w-4 h-4 text-teal-600" /> },
  ];

  const rolesList: { id: UserRole; label: string }[] = [
    { id: 'customer', label: t.roles.customer },
    { id: 'buyer', label: t.roles.buyer },
    { id: 'investor', label: t.roles.investor },
    { id: 'sales_exec', label: t.roles.salesExec },
    { id: 'admin', label: t.roles.admin },
    { id: 'super_admin', label: t.roles.superAdmin },
  ];

  const handleNavClick = (tabId: string) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FDFCF8] border-b border-[#E5E5DF] shadow-xs">
      {/* Top Bar - Contact & Global Switchers */}
      <div className="bg-[#2D2926] text-[#E5E5DF] text-xs py-2 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
          {/* Left: Contact Info */}
          <div className="flex flex-wrap items-center gap-4 text-[#8C8C7F]">
            <span className="flex items-center gap-1.5 text-[#FDFCF8] font-semibold">
              <Building2 className="w-3.5 h-3.5 text-[#8C715E]" />
              <span className="font-serif">SUKOON PROPERTIES LTD.</span>
            </span>
            <a href="tel:+8801913780386" className="flex items-center gap-1 hover:text-white transition">
              <Phone className="w-3.5 h-3.5 text-[#8C715E]" />
              <span>+880 1913-780386</span>
            </a>
            <a href="mailto:sukoonpropertiesltd@gmail.com" className="flex items-center gap-1 hover:text-white transition hidden sm:flex">
              <Mail className="w-3.5 h-3.5 text-[#8C715E]" />
              <span>sukoonpropertiesltd@gmail.com</span>
            </a>
            <span className="text-[#8C8C7F] hidden lg:inline">| Director: Rayhanul Mobarak</span>
          </div>

          {/* Right: Switchers (Product Mode, Role, Language) */}
          <div className="flex items-center gap-3">
            {/* Product Mode Dropdown */}
            <div className="relative">
              <button
                onClick={() => setModeDropdownOpen(!modeDropdownOpen)}
                className="flex items-center gap-1.5 bg-[#5A5A40] hover:bg-[#484833] text-white px-2.5 py-1 rounded-full text-xs font-medium transition"
              >
                <span>{productModesList.find((m) => m.id === productMode)?.label}</span>
                <ChevronDown className="w-3 h-3 text-[#E5E5DF]" />
              </button>

              {modeDropdownOpen && (
                <div className="absolute right-0 mt-1 w-56 bg-[#2D2926] border border-[#5A5A40] rounded-xl shadow-xl py-1 z-50">
                  <div className="px-3 py-1.5 text-[10px] font-bold text-[#8C8C7F] uppercase tracking-wider border-b border-[#5A5A40]/40">
                    Switch Product View
                  </div>
                  {productModesList.map((m) => (
                    <button
                      key={m.id}
                      onClick={() => {
                        setProductMode(m.id);
                        setModeDropdownOpen(false);
                        if (m.id === 'user_dashboard') setActiveTab('dashboard');
                        if (m.id === 'admin_panel') setActiveTab('admin');
                        if (m.id === 'super_admin') setActiveTab('super_admin');
                        if (m.id === 'crm') setActiveTab('crm');
                        if (m.id === 'api_docs') setActiveTab('api_docs');
                      }}
                      className={`w-full text-left px-3 py-2 text-xs flex items-center gap-2 hover:bg-[#5A5A40] transition ${
                        productMode === m.id ? 'bg-[#5A5A40] text-white font-semibold' : 'text-[#E5E5DF]'
                      }`}
                    >
                      {m.icon}
                      <span>{m.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* User Role Switcher */}
            <div className="relative">
              <button
                onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                className="flex items-center gap-1 bg-[#8C715E] hover:bg-[#745B4A] text-white px-2.5 py-1 rounded-full text-xs font-medium transition"
              >
                <Shield className="w-3 h-3 text-[#FDFCF8]" />
                <span>{rolesList.find((r) => r.id === role)?.label}</span>
                <ChevronDown className="w-3 h-3 text-[#E5E5DF]" />
              </button>

              {roleDropdownOpen && (
                <div className="absolute right-0 mt-1 w-48 bg-[#2D2926] border border-[#5A5A40] rounded-xl shadow-xl py-1 z-50">
                  <div className="px-3 py-1.5 text-[10px] font-bold text-[#8C8C7F] uppercase tracking-wider border-b border-[#5A5A40]/40">
                    Switch Active Role
                  </div>
                  {rolesList.map((r) => (
                    <button
                      key={r.id}
                      onClick={() => {
                        setRole(r.id);
                        setRoleDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs hover:bg-[#5A5A40] transition ${
                        role === r.id ? 'bg-[#5A5A40] text-white font-semibold' : 'text-[#E5E5DF]'
                      }`}
                    >
                      {r.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Play Store / Mobile App Badge Button */}
            {onOpenAppDownloadModal && (
              <button
                onClick={onOpenAppDownloadModal}
                className="bg-emerald-700 hover:bg-emerald-600 text-white font-extrabold px-2.5 py-1 rounded-full text-[11px] transition flex items-center gap-1 shadow-xs border border-emerald-500/50"
                title="Download Google Play Store Mobile App"
              >
                <Smartphone className="w-3.5 h-3.5 text-amber-300" />
                <span className="hidden sm:inline">Google Play App</span>
              </button>
            )}

            {/* Dark Mode / Light Mode Pill Toggle in Top Bar */}
            <button
              onClick={toggleDarkMode}
              className="flex items-center gap-1.5 bg-[#5A5A40] hover:bg-[#484833] text-amber-200 hover:text-white px-2.5 py-1 rounded-full text-xs font-medium transition border border-[#5A5A40]/60 shadow-xs cursor-pointer"
              title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              aria-label="Toggle Theme"
            >
              {isDarkMode ? (
                <>
                  <Sun className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
                  <span className="hidden sm:inline text-[11px] font-mono font-semibold text-amber-200">Light</span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5 text-slate-200" />
                  <span className="hidden sm:inline text-[11px] font-mono font-semibold text-slate-200">Dark</span>
                </>
              )}
            </button>

            {/* Language Switcher */}
            <LanguageSwitcher variant="dropdown" />
          </div>
        </div>
      </div>

      {/* Main Corporate Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-4 flex items-center justify-between">
        {/* Brand Logo */}
        <button onClick={() => handleNavClick('home')} className="flex items-center gap-3 text-left group">
          <div className="w-10 h-10 rounded-full bg-[#5A5A40] text-[#FDFCF8] flex items-center justify-center font-serif text-xl font-bold shadow-sm group-hover:bg-[#484833] transition">
            S
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-serif text-xl font-bold tracking-tight leading-none uppercase text-[#2D2926] group-hover:text-[#5A5A40] transition">
                SUKOON PROPERTIES
              </span>
            </div>
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#8C8C7F] font-semibold mt-0.5">
              Serenity in Living
            </span>
          </div>
        </button>

        {/* Desktop Links */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-medium text-[#5A5A40]">
          <button
            onClick={() => handleNavClick('home')}
            className={`hover:text-[#2D2926] transition ${activeTab === 'home' ? 'text-[#2D2926] font-bold border-b-2 border-[#5A5A40] pb-1' : ''}`}
          >
            {t.nav.home}
          </button>
          <button
            onClick={() => handleNavClick('projects')}
            className={`hover:text-[#2D2926] transition ${activeTab === 'projects' ? 'text-[#2D2926] font-bold border-b-2 border-[#5A5A40] pb-1' : ''}`}
          >
            {t.nav.projects}
          </button>
          <button
            onClick={() => handleNavClick('properties')}
            className={`hover:text-[#2D2926] transition ${activeTab === 'properties' ? 'text-[#2D2926] font-bold border-b-2 border-[#5A5A40] pb-1' : ''}`}
          >
            {t.nav.properties}
          </button>
          <button
            onClick={() => handleNavClick('international')}
            className={`flex items-center gap-1.5 transition ${
              activeTab === 'international'
                ? 'text-[#8C715E] font-bold border-b-2 border-[#8C715E] pb-1'
                : 'text-[#8C715E] hover:text-[#5A5A40] font-semibold'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>{language === 'bn' ? 'আন্তর্জাতিক ডেস্ক' : language === 'ar' ? 'المكتب الدولي' : 'Global Desk'}</span>
          </button>
          <button
            onClick={() => handleNavClick('about')}
            className={`hover:text-[#2D2926] transition ${activeTab === 'about' ? 'text-[#2D2926] font-bold border-b-2 border-[#5A5A40] pb-1' : ''}`}
          >
            {t.nav.about}
          </button>
          <button
            onClick={() => handleNavClick('gallery')}
            className={`hover:text-[#2D2926] transition ${activeTab === 'gallery' ? 'text-[#2D2926] font-bold border-b-2 border-[#5A5A40] pb-1' : ''}`}
          >
            {t.nav.gallery}
          </button>
          <button
            onClick={() => handleNavClick('blog')}
            className={`hover:text-[#2D2926] transition ${activeTab === 'blog' ? 'text-[#2D2926] font-bold border-b-2 border-[#5A5A40] pb-1' : ''}`}
          >
            {t.nav.blog}
          </button>
          <button
            onClick={() => handleNavClick('contact')}
            className={`hover:text-[#2D2926] transition ${activeTab === 'contact' ? 'text-[#2D2926] font-bold border-b-2 border-[#5A5A40] pb-1' : ''}`}
          >
            {t.nav.contact}
          </button>
        </nav>

        {/* Header Search Option */}
        <div className="relative hidden md:block w-48 lg:w-60">
          <div className="relative flex items-center">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
              placeholder={
                language === 'bn'
                  ? 'প্রপার্টি বা পেজ খুঁজুন...'
                  : language === 'ar'
                  ? 'ابحث هنا...'
                  : 'Search properties & pages...'
              }
              className="w-full bg-[#F5F5F0] focus:bg-white text-xs pl-8 pr-7 py-2 rounded-full border border-slate-200 focus:border-[#5A5A40] focus:outline-none transition shadow-xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 p-0.5 text-slate-400 hover:text-slate-600 rounded-full"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>

          {/* Search Results Dropdown */}
          {searchQuery.trim().length > 0 && isSearchFocused && (
            <div
              className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl shadow-2xl border border-slate-200 py-2 z-50 max-h-96 overflow-y-auto divide-y divide-slate-100"
              onMouseDown={(e) => e.preventDefault()}
            >
              {!hasSearchMatches ? (
                <div className="p-4 text-center text-xs text-slate-500">
                  {language === 'bn' ? 'কোনো ফলাফল পাওয়া যায়নি' : `No matches for "${searchQuery}"`}
                </div>
              ) : (
                <>
                  {/* Matching Pages */}
                  {filteredPages.length > 0 && (
                    <div className="p-2">
                      <div className="px-2 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        {language === 'bn' ? 'পেজসমূহ' : 'Pages & Features'}
                      </div>
                      {filteredPages.slice(0, 4).map((p) => (
                        <button
                          key={p.id}
                          onClick={() => {
                            handleNavClick(p.id);
                            setSearchQuery('');
                          }}
                          className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-slate-50 transition flex items-center justify-between group"
                        >
                          <div className="min-w-0 flex-1">
                            <p className="font-semibold text-xs text-slate-900 group-hover:text-emerald-700 truncate">{p.title}</p>
                            <p className="text-[10px] text-slate-500 truncate">{p.desc}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Matching Properties */}
                  {filteredProperties.length > 0 && (
                    <div className="p-2">
                      <div className="px-2 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        {language === 'bn' ? 'প্রপার্টি' : 'Properties'}
                      </div>
                      {filteredProperties.slice(0, 3).map((p) => (
                        <button
                          key={p.id}
                          onClick={() => {
                            handleNavClick('properties');
                            setSearchQuery('');
                          }}
                          className="w-full text-left px-2 py-1.5 rounded-lg hover:bg-slate-50 transition flex items-center gap-2 group"
                        >
                          <img src={p.images[0]} alt={p.title} className="w-8 h-8 rounded object-cover" />
                          <div className="flex-1 min-w-0">
                            <p className="font-bold text-xs text-slate-900 truncate group-hover:text-emerald-700">{p.title}</p>
                            <p className="text-[10px] text-slate-500">৳{(p.priceBDT / 100000).toFixed(0)} Lakh</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Matching Projects */}
                  {filteredProjects.length > 0 && (
                    <div className="p-2">
                      <div className="px-2 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        {language === 'bn' ? 'প্রজেক্ট' : 'Housing Projects'}
                      </div>
                      {filteredProjects.slice(0, 3).map((proj) => (
                        <button
                          key={proj.id}
                          onClick={() => {
                            handleNavClick('projects');
                            setSearchQuery('');
                          }}
                          className="w-full text-left px-2 py-1.5 rounded-lg hover:bg-slate-50 transition flex items-center gap-2 group"
                        >
                          <img src={proj.coverImage} alt={proj.title} className="w-8 h-8 rounded object-cover" />
                          <div className="flex-1 min-w-0">
                            <p className="font-bold text-xs text-slate-900 truncate group-hover:text-emerald-700">{proj.title}</p>
                            <p className="text-[10px] text-slate-500">{proj.location}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </div>

        {/* Actions (Book Site Visit CTA, Wishlist, User Menu) */}
        <div className="hidden sm:flex items-center gap-4">
          <button
            onClick={() => onOpenBookingModal('Site Visit Appointment')}
            className="px-6 py-2.5 bg-[#5A5A40] text-[#FDFCF8] rounded-full hover:bg-[#484833] transition-colors font-medium text-xs flex items-center gap-2 shadow-sm"
          >
            <Calendar className="w-3.5 h-3.5 text-[#FDFCF8]" />
            <span>{t.actions.bookSiteVisit}</span>
          </button>

          {/* Dark Mode Toggle Button (Desktop Action Bar) */}
          <button
            onClick={toggleDarkMode}
            className="p-2 text-[#5A5A40] hover:text-[#2D2926] bg-transparent hover:bg-[#F5F5F0] rounded-full transition cursor-pointer flex items-center justify-center border border-transparent hover:border-[#E5E5DF]"
            title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle Dark Mode"
          >
            {isDarkMode ? (
              <Sun className="w-5 h-5 text-amber-400" />
            ) : (
              <Moon className="w-5 h-5 text-[#5A5A40]" />
            )}
          </button>

          <button
            onClick={() => handleNavClick('dashboard')}
            className="relative p-2 text-[#5A5A40] hover:text-[#2D2926] hover:bg-[#F5F5F0] rounded-full transition"
            title="Wishlist & Saved Properties"
          >
            <Heart className="w-5 h-5 text-[#5A5A40]" />
            {user && user.wishlist.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#8C715E] text-white font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center shadow">
                {user.wishlist.length}
              </span>
            )}
          </button>

          {user ? (
            <button
              onClick={() => handleNavClick('dashboard')}
              className="flex items-center gap-2 bg-[#F5F5F0] hover:bg-[#E5E5DF] text-[#2D2926] text-xs font-semibold px-3 py-2 rounded-full border border-[#E5E5DF] transition"
            >
              <div className="w-5 h-5 rounded-full bg-[#5A5A40] text-white font-bold flex items-center justify-center text-[10px]">
                {user.name.charAt(0)}
              </div>
              <span className="max-w-[100px] truncate">{user.name}</span>
            </button>
          ) : (
            <button
              onClick={() => {
                if (onOpenAuthModal) {
                  onOpenAuthModal();
                } else {
                  login('client@sukoon.com', '+8801700000000', 'customer');
                }
              }}
              className="text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 px-3.5 py-1.5 rounded-full shadow-xs transition"
            >
              রেজিস্ট্রেশন / লগইন
            </button>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-lg"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-6 py-4 space-y-3">
          {/* Mobile Search Bar */}
          <div className="relative mb-3">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={language === 'bn' ? 'অনুসন্ধান করুন...' : 'Search website...'}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-8 py-2 text-xs focus:outline-none focus:border-emerald-600"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="absolute right-3 top-2.5 text-slate-400">
                <X className="w-3.5 h-3.5" />
              </button>
            )}
            {searchQuery.trim().length > 0 && (
              <div className="mt-2 bg-slate-50 rounded-xl p-2 border border-slate-200 max-h-48 overflow-y-auto space-y-1">
                {filteredPages.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => {
                      handleNavClick(p.id);
                      setSearchQuery('');
                    }}
                    className="w-full text-left p-1.5 hover:bg-white rounded text-xs font-semibold text-slate-800 flex justify-between"
                  >
                    <span>{p.title}</span>
                    <ExternalLink className="w-3 h-3 text-slate-400" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={() => handleNavClick('home')}
            className="block w-full text-left py-2 font-medium text-slate-800 border-b border-slate-100"
          >
            {t.nav.home}
          </button>
          <button
            onClick={() => handleNavClick('projects')}
            className="block w-full text-left py-2 font-medium text-slate-800 border-b border-slate-100"
          >
            {t.nav.projects}
          </button>
          <button
            onClick={() => handleNavClick('properties')}
            className="block w-full text-left py-2 font-medium text-slate-800 border-b border-slate-100"
          >
            {t.nav.properties}
          </button>
          <button
            onClick={() => handleNavClick('about')}
            className="block w-full text-left py-2 font-medium text-slate-800 border-b border-slate-100"
          >
            {t.nav.about}
          </button>
          <button
            onClick={() => handleNavClick('gallery')}
            className="block w-full text-left py-2 font-medium text-slate-800 border-b border-slate-100"
          >
            {t.nav.gallery}
          </button>
          <button
            onClick={() => handleNavClick('blog')}
            className="block w-full text-left py-2 font-medium text-slate-800 border-b border-slate-100"
          >
            {t.nav.blog}
          </button>
          <button
            onClick={() => handleNavClick('contact')}
            className="block w-full text-left py-2 font-medium text-slate-800 border-b border-slate-100"
          >
            {t.nav.contact}
          </button>
          <div className="pt-2 pb-1 border-b border-slate-100 flex items-center justify-between">
            <span className="text-xs text-slate-500 font-medium">Language:</span>
            <LanguageSwitcher variant="buttons" />
          </div>
          <div className="py-2 border-b border-slate-100 flex items-center justify-between">
            <span className="text-xs text-slate-500 font-medium">Theme Mode:</span>
            <button
              onClick={toggleDarkMode}
              className="px-3 py-1.5 bg-[#5A5A40] hover:bg-[#484833] text-amber-200 text-xs font-semibold rounded-full flex items-center gap-2 transition cursor-pointer"
            >
              {isDarkMode ? (
                <>
                  <Sun className="w-4 h-4 text-amber-300" />
                  <span>Light Mode</span>
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 text-slate-200" />
                  <span>Dark Mode</span>
                </>
              )}
            </button>
          </div>
          <button
            onClick={() => {
              onOpenBookingModal('Site Visit Appointment');
              setMobileMenuOpen(false);
            }}
            className="w-full bg-emerald-800 text-white font-medium py-2.5 rounded-lg flex items-center justify-center gap-2 mt-2"
          >
            <Calendar className="w-4 h-4 text-amber-300" />
            <span>{t.actions.bookSiteVisit}</span>
          </button>
        </div>
      )}
    </header>
  );
};
