import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Property, Project } from '../../types';
import InternationalComplianceSection from '../common/InternationalComplianceSection';
import InternationalHub from '../international/InternationalHub';
import { ClientTestimonialsSection } from '../common/ClientTestimonialsSection';
import {
  Search,
  MapPin,
  Building2,
  Calendar,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Award,
  Users,
  TrendingUp,
  FileText,
  Heart,
  Eye,
  ArrowRight,
  Quote,
  Layers,
  Sparkles,
  Phone,
} from 'lucide-react';

interface HomePageProps {
  properties: Property[];
  projects: Project[];
  onSelectProperty: (property: Property) => void;
  onOpenBookingModal: (type?: string, property?: Property) => void;
  onOpenBrochureModal: (project: Project) => void;
  setActiveTab: (tab: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  properties,
  projects,
  onSelectProperty,
  onOpenBookingModal,
  onOpenBrochureModal,
  setActiveTab,
}) => {
  const { t } = useLanguage();

  // Search filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [district, setDistrict] = useState('All');
  const [category, setCategory] = useState('All');
  const [budget, setBudget] = useState('All');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setActiveTab('properties');
  };

  return (
    <div className="space-y-16 pb-16">
      {/* 1. Hero Banner Slider / Section */}
      <section className="relative bg-[#5A5A40] text-white min-h-[460px] flex items-center overflow-hidden">
        {/* Background Overlay */}
        <div
          className="absolute inset-0 z-0 opacity-80 bg-cover bg-center bg-blend-overlay bg-[#5A5A40]"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1400')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#2D2926]/90 via-[#2D2926]/70 to-transparent z-0" />

        <div className="max-w-7xl mx-auto px-6 sm:px-10 py-16 relative z-10 w-full text-center sm:text-left">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 bg-[#FDFCF8]/10 border border-[#FDFCF8]/30 text-[#FDFCF8] text-xs font-semibold px-4 py-1.5 rounded-full backdrop-blur">
              <Sparkles className="w-3.5 h-3.5 text-[#8C715E]" />
              <span className="tracking-wide">Purbachal Smart City & Gulshan Luxury Residences</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-serif text-[#FDFCF8] tracking-tight leading-tight">
              Find Your Serene Home <br />
              <span className="italic font-light text-[#E5E5DF]">in the Heart of Bangladesh</span>
            </h1>

            <p className="text-sm sm:text-base text-[#E5E5DF]/90 max-w-2xl font-light italic leading-relaxed">
              Sukoon Properties brings you luxury living with a touch of tranquility, managed by Director Rayhanul Mobarak. Guaranteed RAJA clearance, transparent land mutation deeds, and flexible payment plans.
            </p>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 pt-2">
              <button
                onClick={() => onOpenBookingModal('Site Visit Appointment')}
                className="px-8 py-3.5 bg-[#8C715E] hover:bg-[#745B4A] text-white rounded-full font-medium text-xs sm:text-sm shadow-lg transition flex items-center gap-2"
              >
                <Calendar className="w-4 h-4 text-[#FDFCF8]" />
                <span>Book VIP Site Visit</span>
              </button>

              <button
                onClick={() => setActiveTab('projects')}
                className="px-8 py-3.5 bg-[#5A5A40] hover:bg-[#484833] text-[#FDFCF8] rounded-full font-medium text-xs sm:text-sm transition flex items-center gap-2"
              >
                <span>Explore Housing Projects</span>
                <ArrowRight className="w-4 h-4 text-[#E5E5DF]" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Natural Tones Search & Filter Widget */}
      <div className="max-w-6xl mx-auto px-4 sm:px-8 -mt-10 relative z-20">
        <form
          onSubmit={handleSearchSubmit}
          className="bg-[#FDFCF8]/95 backdrop-blur-sm p-4 sm:p-6 rounded-2xl shadow-2xl border border-[#E5E5DF] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-center"
        >
          <div className="flex flex-col border-b sm:border-b-0 sm:border-r border-[#E5E5DF] pr-2 pb-2 sm:pb-0">
            <label className="text-[10px] uppercase font-bold tracking-widest text-[#8C8C7F] mb-1">
              Search Keyword
            </label>
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Purbachal, Gulshan..."
                className="w-full bg-transparent border-none p-0 text-xs text-[#2D2926] focus:ring-0 font-medium"
              />
            </div>
          </div>

          <div className="flex flex-col border-b sm:border-b-0 sm:border-r border-[#E5E5DF] pr-2 pb-2 sm:pb-0">
            <label className="text-[10px] uppercase font-bold tracking-widest text-[#8C8C7F] mb-1">
              {t.search.location}
            </label>
            <select
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              className="bg-transparent border-none p-0 text-xs text-[#2D2926] focus:ring-0 cursor-pointer font-medium"
            >
              <option value="All">{t.search.allDistricts}</option>
              <option value="Dhaka">Dhaka City</option>
              <option value="Purbachal">Purbachal Smart City</option>
              <option value="Uttara">Uttara Model Town</option>
              <option value="Gulshan">Gulshan Avenue</option>
              <option value="Chattogram">Chattogram Commercial</option>
              <option value="Sylhet">Sylhet Estate</option>
            </select>
          </div>

          <div className="flex flex-col border-b sm:border-b-0 sm:border-r border-[#E5E5DF] pr-2 pb-2 sm:pb-0">
            <label className="text-[10px] uppercase font-bold tracking-widest text-[#8C8C7F] mb-1">
              {t.search.propertyType}
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="bg-transparent border-none p-0 text-xs text-[#2D2926] focus:ring-0 cursor-pointer font-medium"
            >
              <option value="All">{t.search.allTypes}</option>
              <option value="Housing">Housing Plots</option>
              <option value="Apartment">Residential Apartments</option>
              <option value="Commercial">Commercial Space</option>
              <option value="Land">Land Projects</option>
            </select>
          </div>

          <div className="flex flex-col border-b sm:border-b-0 sm:border-r border-[#E5E5DF] pr-2 pb-2 sm:pb-0">
            <label className="text-[10px] uppercase font-bold tracking-widest text-[#8C8C7F] mb-1">
              Budget
            </label>
            <select
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="bg-transparent border-none p-0 text-xs text-[#2D2926] focus:ring-0 cursor-pointer font-medium"
            >
              <option value="All">Any Budget</option>
              <option value="30_50">৳ 30L - ৳ 50L</option>
              <option value="50_100">৳ 50L - ৳ 1.5Cr</option>
              <option value="100_300">৳ 1.5Cr - ৳ 3.0Cr</option>
            </select>
          </div>

          <div>
            <button
              type="submit"
              className="w-full px-6 py-3 bg-[#8C715E] text-white rounded-xl font-medium text-xs hover:bg-[#745B4A] transition shadow flex items-center justify-center gap-1.5"
            >
              <Search className="w-4 h-4 text-[#FDFCF8]" />
              <span>Search Now</span>
            </button>
          </div>
        </form>
      </div>

      {/* 3. Featured Mega Housing Projects */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-serif text-[#2D2926]">
              {t.sections.featuredProjects}
            </h2>
            <div className="h-1 w-20 bg-[#5A5A40] mt-2"></div>
          </div>
          <button
            onClick={() => setActiveTab('projects')}
            className="text-sm font-semibold text-[#5A5A40] hover:text-[#2D2926] border-b border-[#5A5A40] pb-1 flex items-center gap-1 transition"
          >
            <span>View All Properties ({projects.length})</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {projects.map((proj) => (
            <div
              key={proj.id}
              className="bg-[#F5F5F0] rounded-3xl border border-[#E5E5DF] overflow-hidden shadow-xs hover:border-[#5A5A40]/40 hover:shadow-lg transition duration-300 group flex flex-col cursor-pointer"
            >
              <div className="relative h-48 overflow-hidden bg-[#E5E5DF]">
                <img
                  src={proj.coverImage}
                  alt={proj.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-[#5A5A40]">
                  {proj.category}
                </span>
                <span className="absolute top-4 left-4 bg-[#5A5A40] text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                  {proj.status}
                </span>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-serif text-lg text-[#2D2926] group-hover:text-[#5A5A40] transition leading-tight mb-1">
                    {proj.title}
                  </h3>
                  <p className="text-xs text-[#8C8C7F] flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#8C715E] shrink-0" />
                    <span>{proj.location}</span>
                  </p>
                  <p className="text-xs text-[#2D2926]/80 mt-2 line-clamp-2">{proj.description}</p>
                </div>

                <div className="pt-3 border-t border-[#E5E5DF] space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#8C8C7F]">Starting Price:</span>
                    <span className="font-bold text-[#5A5A40] text-sm">
                      ৳ {(proj.startPriceBDT / 100000).toFixed(2)} Lakh
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => onOpenBrochureModal(proj)}
                      className="w-1/2 bg-[#E5E5DF] hover:bg-[#D5D5CF] text-[#2D2926] text-xs font-semibold py-2 rounded-full flex items-center justify-center gap-1 transition"
                    >
                      <FileText className="w-3.5 h-3.5 text-[#5A5A40]" /> Brochure
                    </button>
                    <button
                      onClick={() => onOpenBookingModal('Plot Reservation')}
                      className="w-1/2 bg-[#5A5A40] hover:bg-[#484833] text-white text-xs font-semibold py-2 rounded-full transition"
                    >
                      Book Plot
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Latest Properties Showcase */}
      <section className="bg-[#F5F5F0] py-16 border-y border-[#E5E5DF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl font-serif text-[#2D2926]">
                {t.sections.latestProperties}
              </h2>
              <div className="h-1 w-20 bg-[#8C715E] mt-2"></div>
            </div>
            <button
              onClick={() => setActiveTab('properties')}
              className="text-sm font-semibold text-[#5A5A40] hover:text-[#2D2926] border-b border-[#5A5A40] pb-1 flex items-center gap-1 transition"
            >
              <span>Explore All Listings ({properties.length})</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((prop) => (
              <div
                key={prop.id}
                className="bg-[#FDFCF8] rounded-3xl border border-[#E5E5DF] overflow-hidden shadow-xs hover:shadow-lg transition duration-300 group cursor-pointer"
              >
                <div className="relative h-56 overflow-hidden bg-[#E5E5DF]">
                  <img
                    src={prop.images[0]}
                    alt={prop.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="bg-[#5A5A40] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                      {prop.category}
                    </span>
                    {prop.isPremium && (
                      <span className="bg-[#8C715E] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                        PREMIUM
                      </span>
                    )}
                  </div>
                  <span className="absolute bottom-4 right-4 bg-[#2D2926]/90 text-white text-xs font-bold px-3 py-1.5 rounded-full border border-[#5A5A40]/40 shadow-xs">
                    {prop.priceFormatted}
                  </span>
                </div>

                <div className="p-6 space-y-4">
                  <h3
                    onClick={() => onSelectProperty(prop)}
                    className="font-serif text-xl text-[#2D2926] hover:text-[#5A5A40] transition line-clamp-1"
                  >
                    {prop.title}
                  </h3>
                  <p className="text-xs text-[#8C8C7F] flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#8C715E] shrink-0" />
                    <span className="truncate">{prop.address}</span>
                  </p>

                  <div className="grid grid-cols-3 gap-2 bg-[#F5F5F0] p-3 rounded-2xl border border-[#E5E5DF] text-[11px] text-[#2D2926] font-medium text-center">
                    <div>
                      <span className="block text-[#8C8C7F] text-[9px] uppercase font-bold">Area</span>
                      <span className="font-bold text-[#2D2926]">{prop.areaSqFt} {prop.areaUnit}</span>
                    </div>
                    <div>
                      <span className="block text-[#8C8C7F] text-[9px] uppercase font-bold">Type</span>
                      <span className="font-bold text-[#2D2926]">{prop.type}</span>
                    </div>
                    <div>
                      <span className="block text-[#8C8C7F] text-[9px] uppercase font-bold">Facing</span>
                      <span className="font-bold text-[#2D2926]">{prop.facing || 'South'}</span>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <button
                      onClick={() => onSelectProperty(prop)}
                      className="w-1/2 bg-[#E5E5DF] hover:bg-[#D5D5CF] text-[#2D2926] text-xs font-semibold py-2.5 rounded-full transition"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => onOpenBookingModal('Site Visit Appointment', prop)}
                      className="w-1/2 bg-[#8C715E] hover:bg-[#745B4A] text-white text-xs font-semibold py-2.5 rounded-full transition shadow-xs"
                    >
                      Book Visit
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Director's Corporate Message */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="bg-[#2D2926] text-[#FDFCF8] rounded-3xl p-8 sm:p-12 shadow-xl relative overflow-hidden border border-[#5A5A40]/40 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-3xl overflow-hidden border-4 border-[#5A5A40] shadow-2xl">
              <img
                src="/src/assets/images/sukoon_director_portrait_1785534211944.jpg"
                alt="Rayhanul Mobarak - Director Sukoon Properties Ltd."
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          <div className="lg:col-span-7 space-y-5">
            <Quote className="w-10 h-10 text-[#8C715E]/60" />
            <span className="text-xs font-bold text-[#C2B299] uppercase tracking-widest">
              Director's Vision
            </span>
            <h3 className="text-3xl font-serif text-[#FDFCF8] leading-tight">
              "Building Sustainable Townships with Serenity & Absolute Legal Integrity"
            </h3>
            <p className="text-xs sm:text-sm text-[#E5E5DF]/90 font-light leading-relaxed">
              At Sukoon Properties Ltd., our goal is not merely selling land or concrete structures. We are building secure, multi-generational wealth for Bangladeshi families and diaspora investors worldwide. Every project we undertake in Purbachal Smart City, Gulshan, and Uttara is engineered with 100% RAJA masterplan compliance, 0% legal encumbrances, and eco-friendly infrastructure.
            </p>
            <div>
              <h4 className="font-serif text-lg font-bold text-[#C2B299]">Rayhanul Mobarak</h4>
              <p className="text-xs text-[#8C8C7F]">Managing Director, Sukoon Properties Ltd.</p>
              <p className="text-xs text-[#8C8C7F]">Email: sukoonpropertiesltd@gmail.com</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Why Choose Sukoon & Impact Statistics */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-3xl font-serif text-[#2D2926]">
            Why Choose Sukoon Properties?
          </h2>
          <div className="h-1 w-20 bg-[#5A5A40] mx-auto"></div>
          <p className="text-xs sm:text-sm text-[#8C8C7F] italic font-light">
            We redefine real estate standards in Bangladesh through transparent deeds, smart infrastructure, and digital booking convenience.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-[#F5F5F0] p-6 rounded-3xl border border-[#E5E5DF] text-center space-y-3 hover:border-[#5A5A40]/40 transition">
            <div className="w-12 h-12 rounded-full bg-[#5A5A40] text-white mx-auto flex items-center justify-center font-bold">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg text-[#2D2926]">100% RAJA Approved</h3>
            <p className="text-xs text-[#8C8C7F]">All housing plots and apartments possess clean mutated deeds ready for registration.</p>
          </div>

          <div className="bg-[#F5F5F0] p-6 rounded-3xl border border-[#E5E5DF] text-center space-y-3 hover:border-[#5A5A40]/40 transition">
            <div className="w-12 h-12 rounded-full bg-[#8C715E] text-white mx-auto flex items-center justify-center font-bold">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg text-[#2D2926]">Smart City Planners</h3>
            <p className="text-xs text-[#8C8C7F]">Underground power lines, solar streetlights, lakeside parks, and wide avenues.</p>
          </div>

          <div className="bg-[#F5F5F0] p-6 rounded-3xl border border-[#E5E5DF] text-center space-y-3 hover:border-[#5A5A40]/40 transition">
            <div className="w-12 h-12 rounded-full bg-[#5A5A40] text-white mx-auto flex items-center justify-center font-bold">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg text-[#2D2926]">1,200+ Happy Families</h3>
            <p className="text-xs text-[#8C8C7F]">Trusted by buyers across Bangladesh, UK, USA, Canada, UAE, and Saudi Arabia.</p>
          </div>

          <div className="bg-[#F5F5F0] p-6 rounded-3xl border border-[#E5E5DF] text-center space-y-3 hover:border-[#5A5A40]/40 transition">
            <div className="w-12 h-12 rounded-full bg-[#8C715E] text-white mx-auto flex items-center justify-center font-bold">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg text-[#2D2926]">High Rental Yield</h3>
            <p className="text-xs text-[#8C8C7F]">Average 25% annual property value growth in Purbachal & Metro Rail zones.</p>
          </div>
        </div>

        {/* Stats Grid matching Design HTML Bottom Bar style */}
        <div className="bg-[#F5F5F0] rounded-3xl px-10 py-6 border border-[#E5E5DF] flex flex-wrap items-center justify-between gap-6">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase text-[#8C8C7F] font-bold tracking-wider">Completed Projects</span>
            <span className="font-serif text-3xl text-[#2D2926]">150+</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] uppercase text-[#8C8C7F] font-bold tracking-wider">Happy Families</span>
            <span className="font-serif text-3xl text-[#2D2926]">2,400+</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] uppercase text-[#8C8C7F] font-bold tracking-wider">Director Direct</span>
            <span className="font-serif text-3xl text-[#2D2926]">Mobarak R.</span>
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => onOpenBookingModal('Site Visit Appointment')}
              className="flex items-center gap-2 px-8 py-3.5 bg-[#5A5A40] text-white rounded-full font-medium shadow-md hover:bg-[#484833] transition"
            >
              <span>Book Site Visit</span>
              <ArrowRight className="w-4 h-4 text-[#FDFCF8]" />
            </button>
          </div>
        </div>
      </section>

      {/* 6.4 Client Testimonials & Success Stories */}
      <ClientTestimonialsSection />

      {/* 6.5 International Standards & Compliance Section */}
      <InternationalComplianceSection />

      {/* 6.6 International Investor Hub (NRB Desk, Masterplan 3D Selector, ROI Calculator, ESG Index, VIP Video Call) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <InternationalHub
          onBookPlot={(plot) => {
            onOpenBookingModal('Plot Reservation');
          }}
        />
      </section>

      {/* 7. Google Maps Interactive Location Simulator */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-3xl font-serif text-[#2D2926]">
              Sukoon Project Map Locations
            </h2>
            <div className="h-1 w-20 bg-[#5A5A40] mt-1"></div>
          </div>
          <span className="text-xs text-[#8C8C7F] font-medium">
            Interactive GPS Coordinates & Route Guidance
          </span>
        </div>

        <div className="bg-[#2D2926] text-white rounded-3xl h-80 relative overflow-hidden flex items-center justify-center border border-[#5A5A40]/40 shadow-inner">
          <div className="absolute inset-0 opacity-30">
            <img
              src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1200&q=80"
              alt="Bangladesh Map"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="relative z-10 text-center space-y-3 p-6 max-w-lg bg-[#2D2926]/90 backdrop-blur rounded-3xl border border-[#5A5A40]/40">
            <MapPin className="w-8 h-8 text-[#8C715E] mx-auto animate-bounce" />
            <h3 className="font-serif text-xl text-[#FDFCF8]">Sukoon Projects Across Bangladesh</h3>
            <p className="text-xs text-[#E5E5DF]">
              Purbachal Sector 22 | Gulshan Avenue 2 | Uttara Sector 18 | Agrabad Chattogram | Sylhet Zindabazar | Cox’s Bazar Marine Drive
            </p>
            <button
              onClick={() => setActiveTab('contact')}
              className="bg-[#5A5A40] hover:bg-[#484833] text-white font-medium text-xs px-6 py-2.5 rounded-full transition"
            >
              Get Directions to Gulshan HQ
            </button>
          </div>
        </div>
      </section>

      {/* 8. Call to Action Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="bg-[#5A5A40] text-white rounded-3xl p-8 sm:p-12 text-center space-y-6 relative overflow-hidden shadow-xl">
          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <h2 className="text-3xl sm:text-4xl font-serif text-[#FDFCF8] leading-tight">
              Ready to Reserve Your Housing Plot or Sky Apartment?
            </h2>
            <p className="text-xs sm:text-sm text-[#E5E5DF] font-light">
              Contact Director Rayhanul Mobarak's executive team today for a free site visit with complimentary chauffeur pickup from Gulshan HQ.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <button
                onClick={() => onOpenBookingModal('Site Visit Appointment')}
                className="bg-[#8C715E] hover:bg-[#745B4A] text-white font-medium text-xs sm:text-sm px-8 py-3.5 rounded-full shadow transition"
              >
                Book Free Site Visit
              </button>
              <a
                href="tel:+8801913780386"
                className="bg-[#2D2926] hover:bg-black text-[#FDFCF8] font-medium text-xs sm:text-sm px-8 py-3.5 rounded-full transition flex items-center gap-2"
              >
                <Phone className="w-4 h-4 text-[#8C715E]" />
                <span>Call Hotline +880 1913-780386</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
