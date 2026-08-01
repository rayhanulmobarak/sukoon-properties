import React, { useState } from 'react';
import { Star, Quote, CheckCircle2, MapPin, Building2, ChevronLeft, ChevronRight, Sparkles, Filter } from 'lucide-react';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  location: string;
  propertyOwned: string;
  avatar: string;
  rating: number;
  date: string;
  story: string;
  verified: boolean;
  category: 'all' | 'nrb' | 'plot' | 'apartment';
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Engr. Mahfuzur Rahman & Family',
    role: 'Senior Civil Engineer',
    location: 'Dhaka, Bangladesh',
    propertyOwned: 'Purbachal Sector 22 - 5 Katha Plot',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
    rating: 5,
    date: 'March 2025',
    story: 'Buying a plot in Purbachal was my lifelong dream. Director Rayhanul Mobarak personally guided us through RAJUK deed verification and land mutation within just 14 days. 100% legal clarity with zero hassle!',
    verified: true,
    category: 'plot',
  },
  {
    id: 't2',
    name: 'Dr. Shahriar Ahmed & Sultana Parvin',
    role: 'NRB Consultant (London, UK)',
    location: 'London / Sylhet',
    propertyOwned: 'Sukoon Sky Heights - 2,800 Sq.Ft Duplex',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
    rating: 5,
    date: 'January 2025',
    story: 'As an expatriate living in the UK, I was worried about remote investment in Dhaka. Sukoon Properties provided 360° virtual site inspections and weekly drone updates. The build quality in Gulshan is world-class.',
    verified: true,
    category: 'nrb',
  },
  {
    id: 't3',
    name: 'Nusrat Jahan & Tanvir Hossain',
    role: 'Tech Lead & Entrepreneur',
    location: 'Uttara, Dhaka',
    propertyOwned: 'Purbachal Lakeview - 3 Katha Corner Plot',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
    rating: 5,
    date: 'February 2025',
    story: 'The installment plan was unbelievably flexible. We booked our plot with just 20% down payment and got physical handover certificate. Purbachal Expressway connectivity makes commuting super easy.',
    verified: true,
    category: 'apartment',
  },
  {
    id: 't4',
    name: 'Kazi Mohammad Zafar',
    role: 'Businessman & NRB Investor',
    location: 'Dubai, UAE',
    propertyOwned: 'Sukoon Commercial Tower - 2 Floor Suite',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400',
    rating: 5,
    date: 'November 2024',
    story: 'My investment yield in Purbachal Smart City has exceeded 28% ROI in under 2 years. Transparent deed transfer, international currency wire support, and direct contact with Director Mobarak made all the difference.',
    verified: true,
    category: 'nrb',
  },
  {
    id: 't5',
    name: 'Tariqul Islam & Mrs. Islam',
    role: 'Retrieved Govt. Director',
    location: 'Gulshan, Dhaka',
    propertyOwned: 'Gulshan Residence - 3,400 Sq.Ft Luxury Flat',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400',
    rating: 5,
    date: 'December 2024',
    story: 'The architectural design and earthquake resistance structure gave us complete peace of mind. Sukoon Properties delivered the flat 3 months before the promised deadline!',
    verified: true,
    category: 'apartment',
  },
  {
    id: 't6',
    name: 'Syed Al-Amin Kazi',
    role: 'Bank Manager (Kuwait City)',
    location: 'Kuwait City / Chittagong',
    propertyOwned: 'Purbachal Smart City - Block C Plot',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400',
    rating: 5,
    date: 'February 2025',
    story: 'The real-time currency converter tool on Sukoon’s app made transferring KWD to BDT seamless. Excellent customer support and complete transparency from registration to plot mutation.',
    verified: true,
    category: 'nrb',
  },
];

export const ClientTestimonialsSection: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'nrb' | 'plot' | 'apartment'>('all');
  const [activeIndex, setActiveIndex] = useState(0);

  const filteredTestimonials = TESTIMONIALS.filter(
    (item) => filter === 'all' || item.category === filter
  );

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? filteredTestimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === filteredTestimonials.length - 1 ? 0 : prev + 1));
  };

  const currentFeatured = filteredTestimonials[activeIndex] || TESTIMONIALS[0];

  return (
    <section className="bg-gradient-to-b from-[#F5F5F0] via-[#FDFCF8] to-[#F5F5F0] py-16 border-y border-[#E5E5DF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-[#5A5A40]/10 border border-[#5A5A40]/20 text-[#5A5A40] text-xs font-bold px-3 py-1 rounded-full">
              <Sparkles className="w-3.5 h-3.5 text-[#8C715E]" />
              <span>Real Customer Stories & Feedback</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif text-[#2D2926]">
              Client Testimonials & Success Stories
            </h2>
            <p className="text-xs sm:text-sm text-[#8C8C7F] italic font-light">
              Hear directly from happy property owners, NRB investors, and families who trusted Sukoon Properties Ltd. for their dream homes and land plots.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 bg-white p-1.5 rounded-2xl border border-[#E5E5DF] shadow-xs">
            <button
              onClick={() => {
                setFilter('all');
                setActiveIndex(0);
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
                filter === 'all'
                  ? 'bg-[#5A5A40] text-white shadow-xs'
                  : 'text-[#2D2926] hover:bg-[#F5F5F0]'
              }`}
            >
              All Reviews ({TESTIMONIALS.length})
            </button>
            <button
              onClick={() => {
                setFilter('nrb');
                setActiveIndex(0);
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
                filter === 'nrb'
                  ? 'bg-[#5A5A40] text-white shadow-xs'
                  : 'text-[#2D2926] hover:bg-[#F5F5F0]'
              }`}
            >
              NRB Expatriates
            </button>
            <button
              onClick={() => {
                setFilter('plot');
                setActiveIndex(0);
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
                filter === 'plot'
                  ? 'bg-[#5A5A40] text-white shadow-xs'
                  : 'text-[#2D2926] hover:bg-[#F5F5F0]'
              }`}
            >
              Plot Buyers
            </button>
            <button
              onClick={() => {
                setFilter('apartment');
                setActiveIndex(0);
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
                filter === 'apartment'
                  ? 'bg-[#5A5A40] text-white shadow-xs'
                  : 'text-[#2D2926] hover:bg-[#F5F5F0]'
              }`}
            >
              Apartment Owners
            </button>
          </div>
        </div>

        {/* Featured Testimonial Highlight Card */}
        {currentFeatured && (
          <div className="bg-[#2D2926] text-white rounded-3xl p-8 sm:p-12 shadow-2xl border border-[#5A5A40]/40 relative overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Background Decorative Accent */}
            <Quote className="absolute -top-6 -right-6 w-48 h-48 text-[#5A5A40]/15 pointer-events-none" />

            {/* Left: Owner Profile Photo & Details */}
            <div className="lg:col-span-5 flex flex-col items-center sm:items-start gap-4">
              <div className="relative">
                <img
                  src={currentFeatured.avatar}
                  alt={currentFeatured.name}
                  className="w-32 h-32 sm:w-40 sm:h-40 rounded-3xl object-cover border-4 border-[#5A5A40] shadow-xl"
                  referrerPolicy="no-referrer"
                />
                {currentFeatured.verified && (
                  <span className="absolute -bottom-2 -right-2 bg-emerald-700 text-white p-1.5 rounded-full shadow border-2 border-[#2D2926] flex items-center gap-1 text-[10px] font-bold px-2.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-300" />
                    <span>Verified Owner</span>
                  </span>
                )}
              </div>

              <div className="text-center sm:text-left space-y-1">
                <h3 className="font-serif text-xl sm:text-2xl text-[#FDFCF8] font-bold">
                  {currentFeatured.name}
                </h3>
                <p className="text-xs text-[#C2B299] font-medium">{currentFeatured.role}</p>
                <div className="flex items-center justify-center sm:justify-start gap-1 text-xs text-slate-400 pt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-[#8C715E]" />
                  <span>{currentFeatured.location}</span>
                </div>
                <div className="bg-[#5A5A40]/40 border border-[#5A5A40]/60 p-2 rounded-xl text-[11px] text-amber-200 font-mono mt-2 inline-block">
                  <Building2 className="w-3.5 h-3.5 text-amber-300 inline mr-1" />
                  {currentFeatured.propertyOwned}
                </div>
              </div>
            </div>

            {/* Right: Testimonial Quote & Star Rating */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  {[...Array(currentFeatured.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                  ))}
                  <span className="text-xs font-bold text-amber-300 ml-2 font-mono">
                    5.0 / 5.0 Rating
                  </span>
                </div>
                <span className="text-xs text-slate-400">{currentFeatured.date}</span>
              </div>

              <blockquote className="text-base sm:text-xl font-serif text-[#FDFCF8] leading-relaxed italic border-l-4 border-[#8C715E] pl-4 sm:pl-6">
                "{currentFeatured.story}"
              </blockquote>

              <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                <span className="text-xs text-slate-400">
                  Showing story {activeIndex + 1} of {filteredTestimonials.length}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrev}
                    className="p-3 bg-[#5A5A40] hover:bg-[#484833] text-white rounded-2xl transition shadow-sm"
                    title="Previous Story"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handleNext}
                    className="p-3 bg-[#5A5A40] hover:bg-[#484833] text-white rounded-2xl transition shadow-sm"
                    title="Next Story"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Grid of All Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
          {filteredTestimonials.map((item, index) => (
            <div
              key={item.id}
              onClick={() => setActiveIndex(index)}
              className={`bg-white rounded-3xl p-6 border transition cursor-pointer flex flex-col justify-between space-y-4 hover:shadow-xl ${
                index === activeIndex
                  ? 'border-[#5A5A40] ring-2 ring-[#5A5A40]/30 shadow-md'
                  : 'border-[#E5E5DF] hover:border-[#5A5A40]/50'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex gap-0.5">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] text-[#8C8C7F]">{item.date}</span>
                </div>

                <p className="text-xs text-[#2D2926] italic line-clamp-3 leading-relaxed">
                  "{item.story}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-3 border-t border-[#F5F5F0]">
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="w-12 h-12 rounded-2xl object-cover border border-[#E5E5DF]"
                  referrerPolicy="no-referrer"
                />
                <div className="space-y-0.5 overflow-hidden">
                  <h4 className="font-serif font-bold text-xs text-[#2D2926] truncate">
                    {item.name}
                  </h4>
                  <p className="text-[10px] text-[#8C715E] font-medium truncate">
                    {item.propertyOwned}
                  </p>
                  <p className="text-[10px] text-[#8C8C7F] truncate">{item.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
