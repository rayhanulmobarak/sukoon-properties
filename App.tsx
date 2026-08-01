import React, { useState } from 'react';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { initialProperties, initialProjects, initialBlogs } from './data/propertiesData';
import { Property, Project, PaymentInvoice } from './types';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { HomePage } from './components/pages/HomePage';
import { PropertiesPage } from './components/pages/PropertiesPage';
import { PropertyDetailsPage } from './components/pages/PropertyDetailsPage';
import { ProjectsPage } from './components/pages/ProjectsPage';
import { AboutPage } from './components/pages/AboutPage';
import { UserDashboardPage } from './components/pages/UserDashboardPage';
import { AdminPanelPage } from './components/pages/AdminPanelPage';
import InternationalHub from './components/international/InternationalHub';
import { BookingModal } from './components/common/BookingModal';
import { BrochureModal } from './components/common/BrochureModal';
import { InvoiceModal } from './components/common/InvoiceModal';
import { AppDownloadModal } from './components/common/AppDownloadModal';
import { AuthModal } from './components/common/AuthModal';
import { LiveChatWidget } from './components/common/LiveChatWidget';
import { MobileSimulator } from './components/common/MobileSimulator';
import {
  MapPin,
  Phone,
  Mail,
  Building2,
  Calendar,
  Send,
  CheckCircle2,
  FileCode,
  ShieldCheck,
  Award,
  BookOpen,
  Image as ImageIcon,
  Code,
  Layers,
  Sparkles,
  ExternalLink,
} from 'lucide-react';

const GalleryView: React.FC<{ onSelectProperty: (p: Property) => void }> = ({ onSelectProperty }) => {
  const photos = [
    { title: 'Sukoon Royal Heights Sky Duplex - Gulshan 2', img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1000&q=80', cat: 'Apartment' },
    { title: 'Sukoon Smart City Sector 22 Masterplan', img: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1000&q=80', cat: 'Housing Plots' },
    { title: 'Sukoon Green Valley Rooftop Park - Uttara', img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80', cat: 'Residential' },
    { title: 'Grand Foyer & Marble Reception', img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=80', cat: 'Interior' },
    { title: 'Infinity Swimming Pool View', img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=80', cat: 'Amenities' },
    { title: 'Plot Avenue 60ft Wide Road Infrastructure', img: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1000&q=80', cat: 'Infrastructure' },
  ];

  return (
    <div className="bg-[#FDFCF8] min-h-screen py-10 px-4 sm:px-8 space-y-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="border-b border-[#E5E5DF] pb-4">
          <span className="text-xs font-bold uppercase tracking-widest text-[#8C715E]">Architectural Gallery</span>
          <h1 className="text-3xl font-serif text-[#2D2926] mt-1">Sukoon Estates & Interiors</h1>
          <p className="text-xs text-[#8C8C7F] mt-1">High-definition architectural captures of ready residences and township progress.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {photos.map((photo, i) => (
            <div key={i} className="group relative rounded-2xl overflow-hidden bg-[#2D2926] border border-[#E5E5DF] shadow-sm hover:shadow-xl transition">
              <img src={photo.img} alt={photo.title} className="w-full h-64 object-cover group-hover:scale-105 transition duration-500" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-5 flex flex-col justify-end text-white">
                <span className="text-[10px] bg-[#8C715E] text-white px-2.5 py-0.5 rounded-full uppercase tracking-wider font-semibold w-fit mb-1">{photo.cat}</span>
                <h3 className="font-serif text-sm font-semibold text-[#FDFCF8]">{photo.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const BlogView: React.FC = () => {
  return (
    <div className="bg-[#FDFCF8] min-h-screen py-10 px-4 sm:px-8 space-y-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="border-b border-[#E5E5DF] pb-4">
          <span className="text-xs font-bold uppercase tracking-widest text-[#8C715E]">Real Estate Intelligence</span>
          <h1 className="text-3xl font-serif text-[#2D2926] mt-1">Sukoon Market Insights & Legal Guides</h1>
          <p className="text-xs text-[#8C8C7F] mt-1">Expert analysis on RAJA approvals, land registration taxes in Bangladesh, and ROI projection.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {initialBlogs.map((post) => (
            <div key={post.id} className="bg-white rounded-3xl border border-[#E5E5DF] overflow-hidden shadow-sm hover:shadow-md transition">
              <div className="h-48 overflow-hidden bg-[#2D2926]">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
              <div className="p-6 space-y-3">
                <div className="flex items-center justify-between text-[10px] font-bold uppercase text-[#8C715E]">
                  <span>{post.category}</span>
                  <span className="text-[#8C8C7F]">{post.date} • {post.readTime}</span>
                </div>
                <h2 className="font-serif font-bold text-lg text-[#2D2926]">{post.title}</h2>
                <p className="text-xs text-[#8C8C7F] leading-relaxed">{post.excerpt}</p>
                <div className="pt-2 flex items-center justify-between text-xs text-[#5A5A40] font-semibold border-t border-[#E5E5DF]">
                  <span>By Director {post.author}</span>
                  <button className="text-[#8C715E] hover:underline flex items-center gap-1">Read Full Article →</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ContactView: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="bg-[#FDFCF8] min-h-screen py-10 px-4 sm:px-8 space-y-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="border-b border-[#E5E5DF] pb-4">
          <span className="text-xs font-bold uppercase tracking-widest text-[#8C715E]">Official Corporate Contact</span>
          <h1 className="text-3xl font-serif text-[#2D2926] mt-1">Get in Touch with Sukoon Properties Ltd.</h1>
          <p className="text-xs text-[#8C8C7F] mt-1">Visit our Dhaka head office or schedule a private consultation with Director Rayhanul Mobarak.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#5A5A40] text-white p-6 rounded-3xl space-y-4 shadow-md">
              <h2 className="font-serif text-xl font-semibold text-[#FDFCF8]">Headquarters & Corporate Office</h2>
              <div className="space-y-3 text-xs text-[#E5E5DF]">
                <p className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-[#8C715E] shrink-0 mt-0.5" />
                  <span>Sukoon Tower, Level 14, Gulshan Avenue, Road 68, Gulshan 2, Dhaka 1212, Bangladesh</span>
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#8C715E] shrink-0" />
                  <span>+880 1913-780386 / +880 9612-000111</span>
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#8C715E] shrink-0" />
                  <span>sukoonpropertiesltd@gmail.com</span>
                </p>
              </div>
              <div className="border-t border-[#484833] pt-3 text-[11px] text-[#E5E5DF]">
                <p className="font-semibold text-white">Director:</p>
                <p>Rayhanul Mobarak</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-[#E5E5DF] space-y-3">
              <h3 className="font-serif font-bold text-sm text-[#2D2926]">Branch Offices Across Bangladesh</h3>
              <ul className="text-xs space-y-2 text-[#8C8C7F]">
                <li className="flex justify-between border-b border-[#F5F5F0] pb-1"><span>Uttara Sector 11 Office</span> <span className="text-[#2D2926] font-semibold">+880 1800-112233</span></li>
                <li className="flex justify-between border-b border-[#F5F5F0] pb-1"><span>Chattogram Commercial Area</span> <span className="text-[#2D2926] font-semibold">+880 1900-554433</span></li>
                <li className="flex justify-between border-b border-[#F5F5F0] pb-1"><span>Sylhet Regional Branch</span> <span className="text-[#2D2926] font-semibold">+880 1600-112233</span></li>
              </ul>
            </div>
          </div>

          <div className="lg:col-span-7 bg-white p-8 rounded-3xl border border-[#E5E5DF] shadow-xs">
            {submitted ? (
              <div className="text-center py-12 space-y-3">
                <CheckCircle2 className="w-12 h-12 text-[#5A5A40] mx-auto" />
                <h3 className="text-xl font-serif text-[#2D2926]">Message Received!</h3>
                <p className="text-xs text-[#8C8C7F]">Our Senior Sales Executive will reach out via Phone/WhatsApp within 2 hours.</p>
                <button onClick={() => setSubmitted(false)} className="px-4 py-2 bg-[#5A5A40] text-white text-xs font-bold rounded-full">Send Another Inquiry</button>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-4">
                <h2 className="font-serif font-bold text-lg text-[#2D2926]">Direct Property & Investment Inquiry</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-[#8C8C7F] font-medium block mb-1">Full Name *</label>
                    <input required type="text" placeholder="e.g. Dr. Ayman Rahman" className="w-full text-xs p-3 rounded-xl border border-[#E5E5DF] bg-[#FDFCF8]" />
                  </div>
                  <div>
                    <label className="text-xs text-[#8C8C7F] font-medium block mb-1">Phone Number (with WhatsApp) *</label>
                    <input required type="tel" placeholder="+880 1700-000000" className="w-full text-xs p-3 rounded-xl border border-[#E5E5DF] bg-[#FDFCF8]" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-[#8C8C7F] font-medium block mb-1">Email Address</label>
                    <input type="email" placeholder="client@domain.com" className="w-full text-xs p-3 rounded-xl border border-[#E5E5DF] bg-[#FDFCF8]" />
                  </div>
                  <div>
                    <label className="text-xs text-[#8C8C7F] font-medium block mb-1">Property Interest</label>
                    <select className="w-full text-xs p-3 rounded-xl border border-[#E5E5DF] bg-[#FDFCF8]">
                      <option>Purbachal Plot (3 / 5 / 10 Katha)</option>
                      <option>Gulshan Lakeview Duplex</option>
                      <option>Uttara Metro Apartment</option>
                      <option>Commercial Space</option>
                      <option>General Corporate Partnership</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs text-[#8C8C7F] font-medium block mb-1">Your Message / Specific Requirements</label>
                  <textarea rows={4} required placeholder="Describe your preferred location, budget in BDT, or expected completion timeframe..." className="w-full text-xs p-3 rounded-xl border border-[#E5E5DF] bg-[#FDFCF8]"></textarea>
                </div>

                <button type="submit" className="w-full py-3 bg-[#5A5A40] hover:bg-[#484833] text-white font-bold text-xs rounded-xl shadow transition flex items-center justify-center gap-2">
                  <Send className="w-4 h-4 text-[#FDFCF8]" /> Submit Inquiry to Director Desk
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const ApiDocsView: React.FC = () => {
  return (
    <div className="bg-[#FDFCF8] min-h-screen py-10 px-4 sm:px-8 space-y-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="border-b border-[#E5E5DF] pb-4 flex justify-between items-center">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#8C715E]">Developer REST & Real-time Integration</span>
            <h1 className="text-3xl font-serif text-[#2D2926] mt-1">Sukoon Unified Platform API (v1.0)</h1>
            <p className="text-xs text-[#8C8C7F] mt-1">API endpoints for Mobile apps, iOS, Android, PWA, and Partner CRM brokers.</p>
          </div>
          <span className="text-xs bg-[#5A5A40] text-white px-3 py-1 rounded-full font-mono font-bold">Base: /api</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-4 bg-white p-5 rounded-2xl border border-[#E5E5DF] space-y-4">
            <h3 className="font-serif font-bold text-sm text-[#2D2926]">Available Service Endpoints</h3>
            <div className="space-y-2 text-xs font-mono">
              <div className="p-2 bg-[#F5F5F0] rounded-lg border border-[#E5E5DF] flex items-center justify-between"><span className="text-emerald-700 font-bold">GET</span> <span>/api/properties</span></div>
              <div className="p-2 bg-[#F5F5F0] rounded-lg border border-[#E5E5DF] flex items-center justify-between"><span className="text-blue-700 font-bold">POST</span> <span>/api/bookings</span></div>
              <div className="p-2 bg-[#F5F5F0] rounded-lg border border-[#E5E5DF] flex items-center justify-between"><span className="text-purple-700 font-bold">POST</span> <span>/api/payments/process</span></div>
              <div className="p-2 bg-[#F5F5F0] rounded-lg border border-[#E5E5DF] flex items-center justify-between"><span className="text-amber-700 font-bold">POST</span> <span>/api/ai/recommendation</span></div>
              <div className="p-2 bg-[#F5F5F0] rounded-lg border border-[#E5E5DF] flex items-center justify-between"><span className="text-rose-700 font-bold">POST</span> <span>/api/leads</span></div>
            </div>
          </div>

          <div className="lg:col-span-8 bg-[#2D2926] text-[#E5E5DF] p-6 rounded-2xl space-y-4 font-mono text-xs overflow-x-auto shadow-xl">
            <div className="flex items-center justify-between border-b border-[#5A5A40] pb-2 text-[11px] text-[#8C8C7F]">
              <span>cURL Example - AI Recommendation Request</span>
              <span>JSON Response</span>
            </div>
            <pre className="text-emerald-400">
{`curl -X POST http://localhost:3000/api/ai/recommendation \\
  -H "Content-Type: application/json" \\
  -d '{
    "budget": 35000000,
    "location": "Gulshan 2",
    "propertyType": "Duplex Apartment"
  }'`}
            </pre>
            <div className="border-t border-[#5A5A40] pt-4 text-amber-300">
              Response (200 OK):
            </div>
            <pre className="text-slate-200">
{`{
  "success": true,
  "aiResponse": "Director Rayhanul Mobarak recommends Sukoon Royal Heights in Gulshan 2. 4 BHK 3,800 sq ft duplex with lake view priced at ৳ 4.20 Crore.",
  "recommendedPropertyId": "prop_001"
}`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

const MainAppContent: React.FC = () => {
  const { productMode, setProductMode } = useAuth();
  const [activeTab, setActiveTab] = useState('home');
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

  // Modal states
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [bookingType, setBookingType] = useState('Site Visit Appointment');
  const [bookingProperty, setBookingProperty] = useState<Property | undefined>(undefined);

  const [brochureModalOpen, setBrochureModalOpen] = useState(false);
  const [brochureProject, setBrochureProject] = useState<Project | undefined>(undefined);

  const [invoiceModalOpen, setInvoiceModalOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<PaymentInvoice | null>(null);

  const [appDownloadModalOpen, setAppDownloadModalOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);

  const handleOpenBookingModal = (type = 'Site Visit Appointment', property?: Property) => {
    setBookingType(type);
    setBookingProperty(property);
    setBookingModalOpen(true);
  };

  const handleOpenBrochureModal = (project?: Project) => {
    setBrochureProject(project);
    setBrochureModalOpen(true);
  };

  const handleOpenInvoiceModal = (invoice: PaymentInvoice) => {
    setSelectedInvoice(invoice);
    setInvoiceModalOpen(true);
  };

  const handleSelectProperty = (property: Property) => {
    setSelectedProperty(property);
    setActiveTab('property_details');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <HomePage
            properties={initialProperties}
            projects={initialProjects}
            onSelectProperty={handleSelectProperty}
            onOpenBookingModal={handleOpenBookingModal}
            onOpenBrochureModal={handleOpenBrochureModal}
            setActiveTab={setActiveTab}
          />
        );

      case 'projects':
        return (
          <ProjectsPage
            projects={initialProjects}
            onOpenBookingModal={handleOpenBookingModal}
            onOpenBrochureModal={handleOpenBrochureModal}
          />
        );

      case 'properties':
        return (
          <PropertiesPage
            properties={initialProperties}
            onSelectProperty={handleSelectProperty}
            onOpenBookingModal={handleOpenBookingModal}
          />
        );

      case 'property_details':
        return (
          <PropertyDetailsPage
            property={selectedProperty || initialProperties[0]}
            onBack={() => setActiveTab('properties')}
            onOpenBookingModal={handleOpenBookingModal}
            onOpenBrochureModal={handleOpenBrochureModal}
          />
        );

      case 'about':
        return <AboutPage />;

      case 'dashboard':
        return (
          <UserDashboardPage
            properties={initialProperties}
            onSelectProperty={handleSelectProperty}
            onOpenInvoiceModal={handleOpenInvoiceModal}
          />
        );

      case 'admin':
      case 'super_admin':
      case 'crm':
        return (
          <AdminPanelPage
            properties={initialProperties}
            projects={initialProjects}
          />
        );

      case 'gallery':
        return <GalleryView onSelectProperty={handleSelectProperty} />;

      case 'international':
        return (
          <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10">
            <InternationalHub
              onBookPlot={(plot) => {
                handleOpenBookingModal('Plot Reservation');
              }}
            />
          </div>
        );

      case 'blog':
        return <BlogView />;

      case 'contact':
        return <ContactView />;

      case 'api_docs':
        return <ApiDocsView />;

      default:
        return (
          <HomePage
            properties={initialProperties}
            projects={initialProjects}
            onSelectProperty={handleSelectProperty}
            onOpenBookingModal={handleOpenBookingModal}
            onOpenBrochureModal={handleOpenBrochureModal}
            setActiveTab={setActiveTab}
          />
        );
    }
  };

  const appView = (
    <div className="flex flex-col min-h-screen bg-[#FDFCF8] text-[#2D2926] font-sans">
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenBookingModal={handleOpenBookingModal}
        onOpenAppDownloadModal={() => setAppDownloadModalOpen(true)}
        onOpenAuthModal={() => setAuthModalOpen(true)}
      />

      <main className="flex-1">{renderContent()}</main>

      <Footer
        setActiveTab={setActiveTab}
        onOpenAppDownloadModal={() => setAppDownloadModalOpen(true)}
      />

      <LiveChatWidget onOpenBookingModal={handleOpenBookingModal} />

      {/* Booking Modal */}
      {bookingModalOpen && (
        <BookingModal
          isOpen={bookingModalOpen}
          onClose={() => setBookingModalOpen(false)}
          defaultBookingType={bookingType}
          property={bookingProperty}
          properties={initialProperties}
        />
      )}

      {/* Brochure Modal */}
      {brochureModalOpen && (
        <BrochureModal
          isOpen={brochureModalOpen}
          onClose={() => setBrochureModalOpen(false)}
          project={brochureProject}
        />
      )}

      {/* Invoice Modal */}
      {invoiceModalOpen && selectedInvoice && (
        <InvoiceModal
          isOpen={invoiceModalOpen}
          onClose={() => setInvoiceModalOpen(false)}
          invoice={selectedInvoice}
        />
      )}

      {/* App Download Modal */}
      {appDownloadModalOpen && (
        <AppDownloadModal
          isOpen={appDownloadModalOpen}
          onClose={() => setAppDownloadModalOpen(false)}
          onSwitchToMobileView={() => setProductMode('mobile_app')}
          onOpenAuthModal={() => setAuthModalOpen(true)}
        />
      )}

      {/* Auth Modal (Name Registration & Login) */}
      {authModalOpen && (
        <AuthModal
          isOpen={authModalOpen}
          onClose={() => setAuthModalOpen(false)}
          onOpenAppDownload={() => {
            setAuthModalOpen(false);
            setAppDownloadModalOpen(true);
          }}
        />
      )}
    </div>
  );

  if (productMode === 'mobile_app' || productMode === 'pwa') {
    return (
      <div className="min-h-screen bg-slate-950 py-8 px-2 flex justify-center items-center">
        <MobileSimulator
          mode={productMode}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onSwitchToWeb={() => setProductMode('web')}
        >
          {appView}
        </MobileSimulator>
      </div>
    );
  }

  return appView;
};

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <MainAppContent />
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
