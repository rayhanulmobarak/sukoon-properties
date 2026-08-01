import React, { useState } from 'react';
import { Property } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import { Search, MapPin, Filter, ArrowUpDown, Building2, Eye, Calendar, Heart, Globe2 } from 'lucide-react';
import { SUPPORTED_CURRENCIES } from '../common/RealtimeCurrencyConverterTool';

interface PropertiesPageProps {
  properties: Property[];
  onSelectProperty: (property: Property) => void;
  onOpenBookingModal: (type?: string, property?: Property) => void;
}

export const PropertiesPage: React.FC<PropertiesPageProps> = ({
  properties,
  onSelectProperty,
  onOpenBookingModal,
}) => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState<'price_asc' | 'price_desc' | 'popular'>('popular');
  const [displayCurrencyCode, setDisplayCurrencyCode] = useState<string>('BDT');

  const selectedCurr = SUPPORTED_CURRENCIES.find((c) => c.code === displayCurrencyCode) || SUPPORTED_CURRENCIES[0];

  const filteredProperties = properties.filter((p) => {
    const matchesQuery =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.address.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDistrict = selectedDistrict === 'All' || p.district === selectedDistrict;
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    return matchesQuery && matchesDistrict && matchesCategory;
  });

  const sortedProperties = [...filteredProperties].sort((a, b) => {
    if (sortBy === 'price_asc') return a.priceBDT - b.priceBDT;
    if (sortBy === 'price_desc') return b.priceBDT - a.priceBDT;
    return b.views - a.views;
  });

  return (
    <div className="bg-[#FDFCF8] min-h-screen py-10 px-4 sm:px-8 space-y-8">
      <div className="max-w-7xl mx-auto space-y-4">
        <div className="border-b border-[#E5E5DF] pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#8C8C7F]">
              Sukoon Portfolio
            </span>
            <h1 className="text-3xl font-serif text-[#2D2926] mt-1">Available Properties & Plots</h1>
          </div>
          <span className="text-xs text-[#8C8C7F] font-medium">
            Showing {sortedProperties.length} verified listings
          </span>
        </div>

        {/* Filter Toolbar */}
        <div className="bg-[#F5F5F0] p-4 rounded-2xl border border-[#E5E5DF] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 items-center">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title, location..."
              className="w-full bg-[#FDFCF8] border border-[#E5E5DF] rounded-xl pl-9 pr-3 py-2 text-xs text-[#2D2926] focus:outline-none"
            />
            <Search className="w-4 h-4 text-[#8C8C7F] absolute left-3 top-2.5" />
          </div>

          <div>
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="w-full bg-[#FDFCF8] border border-[#E5E5DF] rounded-xl px-3 py-2 text-xs text-[#2D2926] focus:outline-none"
            >
              <option value="All">All Districts</option>
              <option value="Dhaka">Dhaka City</option>
              <option value="Purbachal">Purbachal Smart City</option>
              <option value="Uttara">Uttara Model Town</option>
              <option value="Gulshan">Gulshan Avenue</option>
              <option value="Chattogram">Chattogram</option>
              <option value="Sylhet">Sylhet</option>
            </select>
          </div>

          <div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full bg-[#FDFCF8] border border-[#E5E5DF] rounded-xl px-3 py-2 text-xs text-[#2D2926] focus:outline-none"
            >
              <option value="All">All Categories</option>
              <option value="Housing">Housing Plots</option>
              <option value="Apartment">Apartments</option>
              <option value="Commercial">Commercial</option>
              <option value="Land">Land Projects</option>
            </select>
          </div>

          <div>
            <select
              value={sortBy}
              onChange={(e: any) => setSortBy(e.target.value)}
              className="w-full bg-[#FDFCF8] border border-[#E5E5DF] rounded-xl px-3 py-2 text-xs text-[#2D2926] focus:outline-none"
            >
              <option value="popular">Sort by Popularity</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
            </select>
          </div>

          <div>
            <select
              value={displayCurrencyCode}
              onChange={(e) => setDisplayCurrencyCode(e.target.value)}
              className="w-full bg-[#2D2926] text-amber-300 font-bold border border-slate-700 rounded-xl px-3 py-2 text-xs focus:outline-none"
            >
              {SUPPORTED_CURRENCIES.map((curr) => (
                <option key={curr.code} value={curr.code}>
                  {curr.flag} {curr.code} ({curr.symbol})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Listings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
          {sortedProperties.map((prop) => {
            const convertedVal = prop.priceBDT / selectedCurr.rateToBdt;
            const formattedPrice =
              displayCurrencyCode === 'BDT'
                ? prop.priceFormatted
                : `${selectedCurr.symbol} ${convertedVal.toLocaleString(undefined, {
                    maximumFractionDigits: displayCurrencyCode === 'KWD' ? 0 : 0,
                  })} ${selectedCurr.code}`;

            return (
              <div
                key={prop.id}
                className="bg-[#FDFCF8] rounded-2xl border border-[#E5E5DF] overflow-hidden shadow-xs hover:shadow-lg transition group flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-52 overflow-hidden bg-[#2D2926]">
                    <img
                      src={prop.images[0]}
                      alt={prop.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-3 left-3 flex gap-2">
                      <span className="bg-[#2D2926]/80 text-[#FDFCF8] text-[10px] font-bold px-2.5 py-1 rounded-full">
                        {prop.category}
                      </span>
                    </div>
                    <div className="absolute bottom-3 right-3 bg-[#5A5A40] text-[#FDFCF8] text-xs font-serif font-bold px-3 py-1.5 rounded-lg shadow flex flex-col items-end">
                      <span>{formattedPrice}</span>
                      {displayCurrencyCode !== 'BDT' && (
                        <span className="text-[9px] text-amber-300 font-mono">
                          (৳ {(prop.priceBDT / 100000).toFixed(2)} Lakh BDT)
                        </span>
                      )}
                    </div>
                  </div>

                <div className="p-5 space-y-3">
                  <h3
                    onClick={() => onSelectProperty(prop)}
                    className="font-serif font-bold text-lg text-[#2D2926] hover:text-[#5A5A40] transition cursor-pointer line-clamp-1"
                  >
                    {prop.title}
                  </h3>
                  <p className="text-xs text-[#8C8C7F] flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#8C715E] shrink-0" />
                    <span className="truncate">{prop.address}</span>
                  </p>

                  <div className="grid grid-cols-3 gap-2 bg-[#F5F5F0] p-2.5 rounded-xl border border-[#E5E5DF] text-[11px] text-[#2D2926] text-center font-medium">
                    <div>
                      <span className="block text-[#8C8C7F] text-[9px] uppercase font-bold">Area</span>
                      <span>{prop.areaSqFt} {prop.areaUnit}</span>
                    </div>
                    <div>
                      <span className="block text-[#8C8C7F] text-[9px] uppercase font-bold">Status</span>
                      <span>{prop.status}</span>
                    </div>
                    <div>
                      <span className="block text-[#8C8C7F] text-[9px] uppercase font-bold">Facing</span>
                      <span>{prop.facing || 'South'}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0 flex gap-2">
                <button
                  onClick={() => onSelectProperty(prop)}
                  className="w-1/2 bg-[#F5F5F0] hover:bg-[#E5E5DF] text-[#2D2926] text-xs font-semibold py-2.5 rounded-xl transition"
                >
                  View Details
                </button>
                <button
                  onClick={() => onOpenBookingModal('Site Visit Appointment', prop)}
                  className="w-1/2 bg-[#5A5A40] hover:bg-[#484833] text-white text-xs font-medium py-2.5 rounded-xl transition shadow-xs"
                >
                  Book Visit
                </button>
              </div>
            </div>
          );
        })}
        </div>
      </div>
    </div>
  );
};
