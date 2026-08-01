export type Language = 'en' | 'bn' | 'ar';

export type ProductMode = 
  | 'website' 
  | 'mobile_app' 
  | 'pwa' 
  | 'user_dashboard' 
  | 'admin_panel' 
  | 'super_admin' 
  | 'crm' 
  | 'api_docs';

export type UserRole = 
  | 'customer' 
  | 'buyer' 
  | 'investor' 
  | 'sales_exec' 
  | 'admin' 
  | 'super_admin';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  avatar?: string;
  branchId?: string;
  verifiedEmail: boolean;
  verifiedPhone: boolean;
  wishlist: string[]; // Property IDs
  savedProperties: string[];
}

export type PropertyCategory = 'Housing' | 'Residential' | 'Commercial' | 'Apartment' | 'Land';
export type PropertyStatus = 'Ongoing' | 'Ready to Move' | 'Upcoming' | 'Sold Out';

export interface NearbyPlace {
  name: string;
  category: 'School' | 'Hospital' | 'Mosque' | 'Shopping' | 'Transport' | 'Bank';
  distance: string;
}

export interface FloorPlan {
  id: string;
  title: string;
  size: string;
  rooms: string;
  image: string;
}

export interface Property {
  id: string;
  title: string;
  titleBn?: string;
  titleAr?: string;
  projectSlug: string;
  category: PropertyCategory;
  type: string; // e.g., '3 BHK Apartment', 'Plot 5 Katha', 'Office Space'
  status: PropertyStatus;
  location: string;
  district: 'Dhaka' | 'Purbachal' | 'Uttara' | 'Gulshan' | 'Chattogram' | 'Sylhet' | 'Cox\'s Bazar' | 'Rajshahi' | 'Khulna';
  address: string;
  priceBDT: number; // in BDT
  priceFormatted: string; // e.g. "৳ 1.45 Crore" or "৳ 65 Lakh"
  areaSqFt: number; // or katha for land
  areaUnit: 'sq ft' | 'Katha' | 'Bigha';
  bed?: number;
  bedrooms?: number;
  bath?: number;
  parking?: number;
  facing?: string;
  yearBuilt?: number;
  views?: number;
  approvalStatus?: string;
  images: string[];
  videoUrl?: string;
  virtualTour360?: string;
  floorPlans: FloorPlan[];
  nearby: NearbyPlace[];
  description: string;
  descriptionBn?: string;
  descriptionAr?: string;
  features: string[];
  mapCoords: { lat: number; lng: number };
  isFeatured: boolean;
  isPremium: boolean;
  dateAdded: string;
}

export interface Project {
  id: string;
  title: string;
  titleBn?: string;
  titleAr?: string;
  slug: string;
  category: PropertyCategory;
  location: string;
  district: string;
  totalUnits: number;
  availableUnits: number;
  startPriceBDT: number;
  completionDate: string;
  coverImage: string;
  status: 'Under Construction' | 'Ready' | 'Planning Phase';
  description: string;
  brochureUrl?: string;
  highlights: string[];
}

export interface Booking {
  id: string;
  bookingCode: string;
  propertyId: string;
  propertyTitle: string;
  propertyLocation: string;
  userId: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  bookingType: 'Property Purchase' | 'Plot Reservation' | 'Site Visit Appointment';
  visitDate?: string;
  timeSlot?: string;
  vehiclePickupRequested?: boolean;
  paymentStatus: 'Pending' | 'Deposit Paid' | 'Completed' | 'Cancelled';
  amountPaidBDT: number;
  totalPriceBDT: number;
  paymentMethod?: string;
  transactionId?: string;
  createdAt: string;
}

export interface PaymentInvoice {
  id: string;
  invoiceNumber: string;
  bookingId: string;
  userEmail: string;
  userName: string;
  amountBDT: number;
  paymentMethod: 'bKash' | 'Nagad' | 'Rocket' | 'SSLCommerz' | 'Stripe' | 'Visa/Mastercard';
  transactionId: string;
  status: 'Successful' | 'Pending' | 'Refunded';
  date: string;
  purpose: string;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  propertyInterest: string;
  budgetBDT: number;
  districtInterest: string;
  status: 'New' | 'Contacted' | 'Site Visit Scheduled' | 'Negotiation' | 'Closed (Won)' | 'Closed (Lost)';
  assignedTo: string;
  notes: string[];
  source: 'Website Form' | 'WhatsApp' | 'Facebook' | 'Phone Call';
  createdAt: string;
}

export interface SupportTicket {
  id: string;
  ticketCode: string;
  userEmail: string;
  userName: string;
  subject: string;
  category: 'Booking' | 'Payment' | 'Property Inquiry' | 'General';
  priority: 'Low' | 'Medium' | 'High';
  status: 'Open' | 'In Progress' | 'Resolved';
  messages: { sender: string; text: string; timestamp: string }[];
  createdAt: string;
}

export interface Branch {
  id: string;
  name: string;
  city: string;
  address: string;
  phone: string;
  email: string;
  manager: string;
}

export interface Employee {
  id: string;
  name: string;
  role: string;
  branch: string;
  email: string;
  phone: string;
  status: 'Active' | 'On Leave';
}

export interface AuditLog {
  id: string;
  user: string;
  action: string;
  module: string;
  ipAddress: string;
  timestamp: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  titleBn?: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
}
