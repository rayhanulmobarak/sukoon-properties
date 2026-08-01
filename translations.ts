import { Language } from '../types';

export interface TranslationDictionary {
  companyName: string;
  tagline: string;
  directorName: string;
  directorTitle: string;
  corporateOffice: string;
  nav: {
    home: string;
    about: string;
    chairmanMessage: string;
    directorMessage: string;
    missionVision: string;
    projects: string;
    housingProjects: string;
    residentialProjects: string;
    commercialProjects: string;
    apartmentProjects: string;
    landProjects: string;
    properties: string;
    gallery: string;
    videoGallery: string;
    blog: string;
    careers: string;
    contact: string;
    faq: string;
    privacyPolicy: string;
    termsConditions: string;
  };
  productModes: {
    website: string;
    mobileApp: string;
    pwa: string;
    userDashboard: string;
    adminPanel: string;
    superAdmin: string;
    crm: string;
    apiDocs: string;
  };
  search: {
    title: string;
    subtitle: string;
    projectPlaceholder: string;
    location: string;
    propertyType: string;
    budgetRange: string;
    status: string;
    searchBtn: string;
    allDistricts: string;
    allTypes: string;
    minPrice: string;
    maxPrice: string;
    bedrooms: string;
    bathrooms: string;
    minArea: string;
    filterBtn: string;
    resetFilters: string;
    sortBy: string;
    priceLowHigh: string;
    priceHighLow: string;
    newest: string;
  };
  sections: {
    heroTitle: string;
    heroSubtitle: string;
    featuredProjects: string;
    latestProperties: string;
    premiumProperties: string;
    whyChooseUs: string;
    directorMessage: string;
    statistics: string;
    testimonials: string;
    partners: string;
    news: string;
    googleMap: string;
    newsletter: string;
    subscribeBtn: string;
    companyOverview: string;
    projectTypes: string;
    quickLinks: string;
  };
  actions: {
    bookSiteVisit: string;
    reservePlot: string;
    bookProperty: string;
    downloadBrochure: string;
    viewDetails: string;
    contactUs: string;
    liveChat: string;
    whatsApp: string;
    callNow: string;
    login: string;
    register: string;
    logout: string;
    editProfile: string;
    applyNow: string;
    search: string;
    filter: string;
    clear: string;
    submit: string;
    cancel: string;
    confirm: string;
    close: string;
    viewAll: string;
    share: string;
    directions: string;
    calculateEmi: string;
  };
  roles: {
    customer: string;
    buyer: string;
    investor: string;
    salesExec: string;
    admin: string;
    superAdmin: string;
  };
  propertyCategory: {
    housing: string;
    residential: string;
    commercial: string;
    apartment: string;
    land: string;
  };
  propertyStatus: {
    ongoing: string;
    readyToMove: string;
    upcoming: string;
    soldOut: string;
  };
  districts: {
    dhaka: string;
    purbachal: string;
    chattogram: string;
    sylhet: string;
    rajshahi: string;
    coxsBazar: string;
    gazipur: string;
    narayanganj: string;
  };
  badges: {
    rajukApproved: string;
    rajukDesc: string;
    smartCity: string;
    smartCityDesc: string;
    handoverGuarantee: string;
    handoverDesc: string;
    flexibleInstallments: string;
    installmentDesc: string;
  };
  common: {
    loading: string;
    error: string;
    success: string;
    noDataFound: string;
    currencySymbol: string;
    sqft: string;
    bdt: string;
    total: string;
    yes: string;
    no: string;
    price: string;
    area: string;
    bedrooms: string;
    bathrooms: string;
    location: string;
    district: string;
    category: string;
    status: string;
    saved: string;
    wishlist: string;
    bookings: string;
    notifications: string;
    allRightsReserved: string;
  };
  dashboard: {
    myPortal: string;
    savedProperties: string;
    bookingHistory: string;
    paymentHistory: string;
    downloadDocs: string;
    profileSettings: string;
    welcomeUser: string;
    totalSpent: string;
    pendingPayments: string;
    activeBookings: string;
  };
  crm: {
    leadManagement: string;
    customerManagement: string;
    salesPipeline: string;
    taskManagement: string;
    notes: string;
    emailCampaign: string;
    smsCampaign: string;
    totalLeads: string;
    conversionRate: string;
    monthlyRevenue: string;
  };
  admin: {
    manageUsers: string;
    manageProperties: string;
    manageProjects: string;
    manageBookings: string;
    managePayments: string;
    manageBlogs: string;
    manageGallery: string;
    manageVideos: string;
    manageReviews: string;
    reports: string;
    analytics: string;
  };
  superAdmin: {
    roleManagement: string;
    branchManagement: string;
    employeeManagement: string;
    systemSettings: string;
    securitySettings: string;
    backupRestore: string;
    auditLogs: string;
  };
}

export const translations: Record<Language, TranslationDictionary> = {
  en: {
    companyName: 'Sukoon Properties Ltd.',
    tagline: 'Crafting Trust, Building Futures in Bangladesh Real Estate',
    directorName: 'Rayhanul Mobarak',
    directorTitle: 'Managing Director & Founder',
    corporateOffice: 'Sukoon Corporate Tower, Level 14, Gulshan Avenue 2, Dhaka 1212, Bangladesh',
    nav: {
      home: 'Home',
      about: 'About Us',
      chairmanMessage: "Chairman's Message",
      directorMessage: "Director's Message",
      missionVision: 'Mission & Vision',
      projects: 'Housing Projects',
      housingProjects: 'Housing Schemes',
      residentialProjects: 'Residential Townships',
      commercialProjects: 'Commercial Hubs',
      apartmentProjects: 'Luxury Apartments',
      landProjects: 'Prime Plot Lands',
      properties: 'Property Listings',
      gallery: 'Media Gallery',
      videoGallery: 'Video Gallery',
      blog: 'News & Blog',
      careers: 'Careers',
      contact: 'Contact Us',
      faq: 'FAQ',
      privacyPolicy: 'Privacy Policy',
      termsConditions: 'Terms & Conditions',
    },
    productModes: {
      website: '🌐 Web Platform',
      mobileApp: '📱 Android & iOS App',
      pwa: '⚡ PWA App',
      userDashboard: '👤 My Portal',
      adminPanel: '📊 Admin Panel',
      superAdmin: '👑 Super Admin',
      crm: '📈 CRM System',
      apiDocs: '⚡ API & DB Docs',
    },
    search: {
      title: 'Find Your Dream Property in Bangladesh',
      subtitle: 'Explore luxury apartments, housing plots, and commercial projects across Dhaka, Purbachal & major cities.',
      projectPlaceholder: 'Search by Project Name or Location...',
      location: 'District / Location',
      propertyType: 'Property Category',
      budgetRange: 'Budget (BDT ৳)',
      status: 'Construction Status',
      searchBtn: 'Search Properties',
      allDistricts: 'All Districts',
      allTypes: 'All Categories',
      minPrice: 'Min Price',
      maxPrice: 'Max Price',
      bedrooms: 'Bedrooms',
      bathrooms: 'Bathrooms',
      minArea: 'Min Area (Sq Ft)',
      filterBtn: 'Filter Results',
      resetFilters: 'Reset Filters',
      sortBy: 'Sort By',
      priceLowHigh: 'Price: Low to High',
      priceHighLow: 'Price: High to Low',
      newest: 'Newest First',
    },
    sections: {
      heroTitle: 'Build Your Legacy with Sukoon Properties',
      heroSubtitle: 'Premier housing schemes, eco-smart townships & prime commercial spaces designed for multi-generational security.',
      featuredProjects: 'Mega Housing Projects',
      latestProperties: 'Latest Property Listings',
      premiumProperties: 'Exclusive Premium Collection',
      whyChooseUs: 'Why Sukoon Properties?',
      directorMessage: "Director's Message",
      statistics: 'Our Impact in Numbers',
      testimonials: 'Client Testimonials',
      partners: 'Corporate Partners',
      news: 'Real Estate News & Articles',
      googleMap: 'Our Office & Project Locations',
      newsletter: 'Subscribe for Exclusive Project Launches',
      subscribeBtn: 'Subscribe Now',
      companyOverview: 'Company Overview',
      projectTypes: 'Project Types',
      quickLinks: 'Quick Links',
    },
    actions: {
      bookSiteVisit: 'Book Site Visit',
      reservePlot: 'Reserve Plot',
      bookProperty: 'Book Property',
      downloadBrochure: 'Download PDF Brochure',
      viewDetails: 'View Details',
      contactUs: 'Get in Touch',
      liveChat: 'Live Chat',
      whatsApp: 'WhatsApp Support',
      callNow: 'Call +880 1913-780386',
      login: 'Log In',
      register: 'Register',
      logout: 'Sign Out',
      editProfile: 'Edit Profile',
      applyNow: 'Apply Now',
      search: 'Search',
      filter: 'Filter',
      clear: 'Clear',
      submit: 'Submit',
      cancel: 'Cancel',
      confirm: 'Confirm',
      close: 'Close',
      viewAll: 'View All',
      share: 'Share',
      directions: 'Get Directions',
      calculateEmi: 'Calculate Installment',
    },
    roles: {
      customer: 'Customer Visitor',
      buyer: 'Property Buyer',
      investor: 'Property Investor',
      salesExec: 'Sales Executive',
      admin: 'Company Administrator',
      superAdmin: 'Super Administrator',
    },
    propertyCategory: {
      housing: 'Housing Scheme',
      residential: 'Residential Township',
      commercial: 'Commercial Hub',
      apartment: 'Luxury Apartment',
      land: 'Plot / Land',
    },
    propertyStatus: {
      ongoing: 'Ongoing Construction',
      readyToMove: 'Ready to Move',
      upcoming: 'Upcoming Launch',
      soldOut: 'Sold Out',
    },
    districts: {
      dhaka: 'Dhaka',
      purbachal: 'Purbachal',
      chattogram: 'Chattogram',
      sylhet: 'Sylhet',
      rajshahi: 'Rajshahi',
      coxsBazar: "Cox's Bazar",
      gazipur: 'Gazipur',
      narayanganj: 'Narayanganj',
    },
    badges: {
      rajukApproved: '100% RAJUK Approved',
      rajukDesc: 'Clear title, mutated land deeds & transparent legal verification.',
      smartCity: 'Smart City Urban Planner',
      smartCityDesc: 'Eco-townships with underground utilities in Purbachal & Uttara.',
      handoverGuarantee: 'On-Time Handover Guarantee',
      handoverDesc: 'Strict adherence to structural deadlines with monthly updates.',
      flexibleInstallments: 'Flexible Installments',
      installmentDesc: 'Easy bKash / Nagad / SSLCommerz payment plans up to 60 months.',
    },
    common: {
      loading: 'Loading content...',
      error: 'An error occurred. Please try again.',
      success: 'Operation completed successfully!',
      noDataFound: 'No properties match your criteria.',
      currencySymbol: '৳',
      sqft: 'Sq Ft',
      bdt: 'BDT',
      total: 'Total',
      yes: 'Yes',
      no: 'No',
      price: 'Price',
      area: 'Area',
      bedrooms: 'Beds',
      bathrooms: 'Baths',
      location: 'Location',
      district: 'District',
      category: 'Category',
      status: 'Status',
      saved: 'Saved',
      wishlist: 'Wishlist',
      bookings: 'Bookings',
      notifications: 'Notifications',
      allRightsReserved: 'All rights reserved.',
    },
    dashboard: {
      myPortal: 'My Customer Portal',
      savedProperties: 'Saved Properties',
      bookingHistory: 'Booking History',
      paymentHistory: 'Payment History',
      downloadDocs: 'Download Documents',
      profileSettings: 'Profile Settings',
      welcomeUser: 'Welcome back,',
      totalSpent: 'Total Investments',
      pendingPayments: 'Pending Installments',
      activeBookings: 'Active Bookings',
    },
    crm: {
      leadManagement: 'Lead Management',
      customerManagement: 'Customer Management',
      salesPipeline: 'Sales Pipeline',
      taskManagement: 'Task Management',
      notes: 'Notes & Follow-ups',
      emailCampaign: 'Email Campaigns',
      smsCampaign: 'SMS Marketing',
      totalLeads: 'Total Active Leads',
      conversionRate: 'Conversion Rate',
      monthlyRevenue: 'Monthly Revenue',
    },
    admin: {
      manageUsers: 'User Management',
      manageProperties: 'Manage Listings',
      manageProjects: 'Manage Projects',
      manageBookings: 'Manage Bookings',
      managePayments: 'Manage Payments',
      manageBlogs: 'Manage Articles',
      manageGallery: 'Manage Media',
      manageVideos: 'Manage Videos',
      manageReviews: 'Manage Reviews',
      reports: 'System Reports',
      analytics: 'Analytics Overview',
    },
    superAdmin: {
      roleManagement: 'Role Permissions',
      branchManagement: 'Branch Offices',
      employeeManagement: 'Employee Directory',
      systemSettings: 'Global Settings',
      securitySettings: 'Security & Auth Rules',
      backupRestore: 'Database Backup & Restore',
      auditLogs: 'Audit Log Tracing',
    },
  },

  bn: {
    companyName: 'সুকুন প্রপার্টিজ লিমিটেড',
    tagline: 'বিশ্বস্ততা ও টেকসই আবাসন গড়ার অঙ্গীকার',
    directorName: 'রায়হানুল মোবারক',
    directorTitle: 'ব্যবস্থাপনা পরিচালক ও প্রতিষ্ঠাতা',
    corporateOffice: 'সুকুন কর্পোরেট টাওয়ার, লেভেল ১৪, গুলশান এভিনিউ ২, ঢাকা ১২১২, বাংলাদেশ',
    nav: {
      home: 'হোম',
      about: 'আমাদের সম্পর্কে',
      chairmanMessage: 'চেয়ারম্যানের বার্তা',
      directorMessage: 'পরিচালকের বার্তা',
      missionVision: 'লক্ষ্য ও উদ্দেশ্য',
      projects: 'হাউজিং প্রজেক্ট',
      housingProjects: 'হাউজিং স্কিম',
      residentialProjects: 'আবাসিক টাউনশিপ',
      commercialProjects: 'বাণিজ্যিক হাব',
      apartmentProjects: 'অভিজাত অ্যাপার্টমেন্ট',
      landProjects: 'প্রিমিয়াম প্লট ও জমি',
      properties: 'প্রপার্টিসমূহ',
      gallery: 'মিডিয়া গ্যালারি',
      videoGallery: 'ভিডিও গ্যালারি',
      blog: 'সংবাদ ও ব্লগ',
      careers: 'ক্যারিয়ার',
      contact: 'যোগাযোগ',
      faq: 'প্রশ্নোত্তর (FAQ)',
      privacyPolicy: 'গোপনীয়তা নীতি',
      termsConditions: 'ব্যবহারের শর্তাবলী',
    },
    productModes: {
      website: '🌐 ওয়েব প্ল্যাটফর্ম',
      mobileApp: '📱 অ্যান্ড্রয়েড ও আইওএস অ্যাপ',
      pwa: '⚡ পিডব্লিউএ অ্যাপ',
      userDashboard: '👤 গ্রাহক পোর্টাল',
      adminPanel: '📊 অ্যাডমিন প্যানেল',
      superAdmin: '👑 সুপার অ্যাডমিন',
      crm: '📈 সিআরএম সিস্টেম',
      apiDocs: '⚡ এপিআই ও ডিবি ডকস',
    },
    search: {
      title: 'বাংলাদেশে আপনার স্বপ্নের আবাসন খুঁজুন',
      subtitle: 'ঢাকা, পূর্বাচল ও প্রধান শহরের সেরা অ্যাপার্টমেন্ট, প্লট ও বাণিজ্যিক স্পেস অনুসন্ধান করুন।',
      projectPlaceholder: 'প্রজেক্টের নাম বা স্থান দিয়ে খুঁজুন...',
      location: 'জেলা / স্থান',
      propertyType: 'প্রপার্টির ধরন',
      budgetRange: 'বাজেট (টাকা ৳)',
      status: 'প্রজেক্টের অবস্থা',
      searchBtn: 'প্রপার্টি খুঁজুন',
      allDistricts: 'সকল জেলা',
      allTypes: 'সকল ক্যাটাগরি',
      minPrice: 'সর্বনিম্ন মূল্য',
      maxPrice: 'সর্বোচ্চ মূল্য',
      bedrooms: 'বেডরুম',
      bathrooms: 'বাথরুম',
      minArea: 'সর্বনিম্ন আয়তন (বর্গফুট)',
      filterBtn: 'ফিল্টার করুন',
      resetFilters: 'ফিল্টার রিসেট',
      sortBy: 'ক্রমানুসারে সাজান',
      priceLowHigh: 'মূল্য: কম থেকে বেশি',
      priceHighLow: 'মূল্য: বেশি থেকে কম',
      newest: 'সর্বশেষ যুক্ত',
    },
    sections: {
      heroTitle: 'সুকুন প্রপার্টিজের সাথে গড়ে তুলুন ভবিষ্যৎ',
      heroSubtitle: 'প্রিমিয়াম আবাসন প্রকল্প, পরিবেশবান্ধব স্মার্ট টাউনশিপ ও আধুনিক কমার্শিয়াল টাওয়ার।',
      featuredProjects: 'মেগা হাউজিং প্রজেক্টস',
      latestProperties: 'সর্বশেষ প্রপার্টিসমূহ',
      premiumProperties: 'প্রিমিয়াম কালেকশন',
      whyChooseUs: 'কেন সুকুন প্রপার্টিজ বেছে নেবেন?',
      directorMessage: 'পরিচালকের বার্তা',
      statistics: 'আমাদের অর্জনের পরিসংখ্যান',
      testimonials: 'গ্রাহকদের মতামত',
      partners: 'আমাদের পার্টনারসমূহ',
      news: 'রিয়েল এস্টেট সংবাদ ও টিপস',
      googleMap: 'অফিস ও প্রজেক্ট লোকেশন',
      newsletter: 'নতুন প্রজেক্টের আপডেটের জন্য সাবস্ক্রাইব করুন',
      subscribeBtn: 'সাবস্ক্রাইব করুন',
      companyOverview: 'কোম্পানি পরিচিতি',
      projectTypes: 'প্রজেক্টের ধরন',
      quickLinks: 'গুরুত্বপূর্ণ লিংক',
    },
    actions: {
      bookSiteVisit: 'সাইট ভিজিট বুক করুন',
      reservePlot: 'প্লট বুকিং দিন',
      bookProperty: 'প্রপার্টি বুক করুন',
      downloadBrochure: 'ব্রোশার ডাউনলোড (PDF)',
      viewDetails: 'বিস্তারিত দেখুন',
      contactUs: 'যোগাযোগ করুন',
      liveChat: 'লাইভ চ্যাট',
      whatsApp: 'হোয়াটসঅ্যাপ সাপোর্ট',
      callNow: 'কল করুন +880 1913-780386',
      login: 'লগইন করুন',
      register: 'রেজিস্ট্রেশন করুন',
      logout: 'সাইন আউট',
      editProfile: 'প্রোফাইল সম্পাদন',
      applyNow: 'আবেদন করুন',
      search: 'অনুসন্ধান',
      filter: 'ফিল্টার',
      clear: 'মুছে ফেলুন',
      submit: 'জমা দিন',
      cancel: 'বাতিল',
      confirm: 'নিশ্চিত করুন',
      close: 'বন্ধ করুন',
      viewAll: 'সব দেখুন',
      share: 'শেয়ার করুন',
      directions: 'ম্যাপের দিকনির্দেশ',
      calculateEmi: 'কিস্তি হিসাব করুন',
    },
    roles: {
      customer: 'গ্রাহক দর্শনার্থী',
      buyer: 'প্রপার্টি ক্রেতা',
      investor: 'প্রপার্টি বিনিয়োগকারী',
      salesExec: 'সেলস এক্সিকিউটিভ',
      admin: 'কোম্পানি অ্যাডমিনিস্ট্রেটর',
      superAdmin: 'সুপার অ্যাডমিনিস্ট্রেটর',
    },
    propertyCategory: {
      housing: 'হাউজিং স্কিম',
      residential: 'আবাসিক টাউনশিপ',
      commercial: 'বাণিজ্যিক হাব',
      apartment: 'অভিজাত অ্যাপার্টমেন্ট',
      land: 'প্লট / জমি',
    },
    propertyStatus: {
      ongoing: 'চলমান নির্মাণ কাজ',
      readyToMove: 'রেডি অ্যাপার্টমেন্ট/প্লট',
      upcoming: 'আসন্ন প্রজেক্ট',
      soldOut: 'বিক্রি হয়ে গেছে',
    },
    districts: {
      dhaka: 'ঢাকা',
      purbachal: 'পূর্বাচল',
      chattogram: 'চট্টগ্রাম',
      sylhet: 'সিলেট',
      rajshahi: 'রাজশাহী',
      coxsBazar: 'কক্সবাজার',
      gazipur: 'গাজীপুর',
      narayanganj: 'নারায়ণগঞ্জ',
    },
    badges: {
      rajukApproved: '১০০% রাজউক অনুমোদিত',
      rajukDesc: 'নির্দায় ও নির্ভেজাল জমি, খতিয়ান ও রাজউক অনুমোদিত নকশা।',
      smartCity: 'স্মার্ট সিটি আরবান প্ল্যানার',
      smartCityDesc: 'পূর্বাচল ও উত্তরায় ভূগর্ভস্থ ইউটিলিটিসহ পরিবেশবান্ধব টাউনশিপ।',
      handoverGuarantee: 'সময়মতো হস্তান্তরের নিশ্চয়তা',
      handoverDesc: 'নির্ধারিত মেয়াদের মধ্যে প্রজেক্ট হস্তান্তরের প্রতিশ্রুতি।',
      flexibleInstallments: 'সহজ কিস্তি সুবিধা',
      installmentDesc: 'বিকাশ/নগদ/এসএসএলকমার্সে ৬০ মাস পর্যন্ত সহজ কিস্তি।',
    },
    common: {
      loading: 'তথ্য লোড হচ্ছে...',
      error: 'একটি ত্রুটি ঘটেছে। আবার চেষ্টা করুন।',
      success: 'কাজটি সফলভাবে সম্পন্ন হয়েছে!',
      noDataFound: 'আপনার পছন্দের সাথে মিলে এমন কোনো প্রপার্টি পাওয়া যায়নি।',
      currencySymbol: '৳',
      sqft: 'বর্গফুট',
      bdt: 'টাকা',
      total: 'মোট',
      yes: 'হ্যাঁ',
      no: 'না',
      price: 'মূল্য',
      area: 'আয়তন',
      bedrooms: 'বেড',
      bathrooms: 'বাথ',
      location: 'অবস্থান',
      district: 'জেলা',
      category: 'ক্যাটাগরি',
      status: 'অবস্থা',
      saved: 'সংরক্ষিত',
      wishlist: 'উইশলিস্ট',
      bookings: 'বুকিংসমূহ',
      notifications: 'নোটিফিকেশন',
      allRightsReserved: 'সর্বস্বত্ব সংরক্ষিত।',
    },
    dashboard: {
      myPortal: 'আমার গ্রাহক পোর্টাল',
      savedProperties: 'সংরক্ষিত প্রপার্টি',
      bookingHistory: 'বুকিং হিস্ট্রি',
      paymentHistory: 'পেমেন্ট হিস্ট্রি',
      downloadDocs: 'ডকুমেন্ট ডাউনলোড',
      profileSettings: 'প্রোফাইল সেটিংস',
      welcomeUser: 'স্বাগতম,',
      totalSpent: 'মোট বিনিয়োগ',
      pendingPayments: 'বকেয়া কিস্তি',
      activeBookings: 'সক্রিয় বুকিং',
    },
    crm: {
      leadManagement: 'লিড ম্যানেজমেন্ট',
      customerManagement: 'গ্রাহক ম্যানেজমেন্ট',
      salesPipeline: 'সেলস পাইপলাইন',
      taskManagement: 'টাস্ক ম্যানেজমেন্ট',
      notes: 'নোটস ও ফলোআপ',
      emailCampaign: 'ইমেইল ক্যাম্পেইন',
      smsCampaign: 'এসএমএস মার্কেটিং',
      totalLeads: 'মোট সক্রিয় লিড',
      conversionRate: 'কনভার্সন রেট',
      monthlyRevenue: 'মাসিক আয়',
    },
    admin: {
      manageUsers: 'ব্যবহারকারী পরিচালনা',
      manageProperties: 'প্রপার্টি লিস্টিং',
      manageProjects: 'প্রজেক্ট পরিচালনা',
      manageBookings: 'বুকিং পরিচালনা',
      managePayments: 'পেমেন্ট পরিচালনা',
      manageBlogs: 'ব্লগ পরিচালনা',
      manageGallery: 'গ্যালারি মিডিয়া',
      manageVideos: 'ভিডিও গ্যালারি',
      manageReviews: 'রিভিউ পরিচালনা',
      reports: 'রিপোর্টস',
      analytics: 'অ্যানালিটিক্স ওভারভিউ',
    },
    superAdmin: {
      roleManagement: 'রোল ও পারমিশন',
      branchManagement: 'শাখা অফিসসমূহ',
      employeeManagement: 'কর্মকর্তা তালিকা',
      systemSettings: 'সিস্টেম সেটিংস',
      securitySettings: 'সিকিউরিটি রুলস',
      backupRestore: 'ডাটাবেস ব্যাকআপ ও রিস্টোর',
      auditLogs: 'অডিট লগ ট্রেসিং',
    },
  },

  ar: {
    companyName: 'شركة سكون العقارية المحدودة',
    tagline: 'بناء الثقة ومستقبل الإقامة في بنغلاديش',
    directorName: 'ريحان المبارك',
    directorTitle: 'المدير التنفيذي والمؤسس',
    corporateOffice: 'برج سكون للشركات، المستوى 14، شارع جولشان 2، دكا 1212، بنغلاديش',
    nav: {
      home: 'الرئيسية',
      about: 'من نحن',
      chairmanMessage: 'رسالة رئيس مجلس الإدارة',
      directorMessage: 'رسالة المدير التنفيذي',
      missionVision: 'الرؤية والرسالة',
      projects: 'المشاريع السكنية',
      housingProjects: 'مخططات الإسكان',
      residentialProjects: 'المدن السكنية',
      commercialProjects: 'المراكز التجارية',
      apartmentProjects: 'الشقق الفاخرة',
      landProjects: 'قطع الأراضي',
      properties: 'قائمة العقارات',
      gallery: 'معرض الصور',
      videoGallery: 'معرض الفيديو',
      blog: 'الأخبار والمقالات',
      careers: 'الوظائف',
      contact: 'اتصل بنا',
      faq: 'الأسئلة الشائعة',
      privacyPolicy: 'سياسة الخصوصية',
      termsConditions: 'الشروط والأحكام',
    },
    productModes: {
      website: '🌐 المنصة الإلكترونية',
      mobileApp: '📱 تطبيق الهاتف',
      pwa: '⚡ تطبيق PWA',
      userDashboard: '👤 بوابة العميل',
      adminPanel: '📊 لوحة الإدارة',
      superAdmin: '👑 المشرف العام',
      crm: '📈 إدارة العملاء CRM',
      apiDocs: '⚡ توثيق API',
    },
    search: {
      title: 'ابحث عن عقار أحلامك في بنغلاديش',
      subtitle: 'استكشف الشقق الفاخرة والأراضي السكنية والمشاريع التجارية في دكا وبورباتشال.',
      projectPlaceholder: 'ابحث عن اسم المشروع أو الموقع...',
      location: 'المنطقة / المدينة',
      propertyType: 'نوع العقار',
      budgetRange: 'الميزانية (تاكا ৳)',
      status: 'حالة المشروع',
      searchBtn: 'بحث عن العقارات',
      allDistricts: 'جميع المناطق',
      allTypes: 'جميع الفئات',
      minPrice: 'الحد الأدنى للسعر',
      maxPrice: 'الحد الأقصى للسعر',
      bedrooms: 'غرف النوم',
      bathrooms: 'حمامات',
      minArea: 'المساحة (قدم مربع)',
      filterBtn: 'تصفية النتائج',
      resetFilters: 'إعادة ضبط',
      sortBy: 'ترتيب حسب',
      priceLowHigh: 'السعر: من الأقل إلى الأعلى',
      priceHighLow: 'السعر: من الأعلى إلى الأقل',
      newest: 'الأحدث أولاً',
    },
    sections: {
      heroTitle: 'ابنِ مستقبلك مع شركة سكون العقارية',
      heroSubtitle: 'مشاريع سكنية راقية ومدن ذكية ومساحات تجارية متميزة.',
      featuredProjects: 'المشاريع السكنية الكبرى',
      latestProperties: 'أحدث العقارات المعروضة',
      premiumProperties: 'المجموعة الفاخرة',
      whyChooseUs: 'لماذا تختار سكون العقارية؟',
      directorMessage: 'رسالة المدير التنفيذي',
      statistics: 'إنجازاتنا بالأرقام',
      testimonials: 'آراء العملاء',
      partners: 'شركاؤنا',
      news: 'أخبار وسوق العقارات',
      googleMap: 'مواقع مكاتبنا ومشاريعنا',
      newsletter: 'اشترك للحصول على أحدث المشاريع',
      subscribeBtn: 'اشترك الآن',
      companyOverview: 'نظرة عامة على الشركة',
      projectTypes: 'أنواع المشاريع',
      quickLinks: 'روابط سريعة',
    },
    actions: {
      bookSiteVisit: 'حجز زيارة موقع',
      reservePlot: 'حجز قطعة أرض',
      bookProperty: 'حجز العقار',
      downloadBrochure: 'تحميل الكتيب PDF',
      viewDetails: 'عرض التفاصيل',
      contactUs: 'تواصل معنا',
      liveChat: 'المحادثة المباشرة',
      whatsApp: 'واتساب الدعم',
      callNow: 'اتصل +880 1913-780386',
      login: 'تسجيل الدخول',
      register: 'إنشاء حساب',
      logout: 'تسجيل الخروج',
      editProfile: 'تعديل الملف',
      applyNow: 'قدم الآن',
      search: 'بحث',
      filter: 'تصفية',
      clear: 'مسح',
      submit: 'إرسال',
      cancel: 'إلغاء',
      confirm: 'تأكيد',
      close: 'إغلاق',
      viewAll: 'عرض الكل',
      share: 'مشاركة',
      directions: 'الاتجاهات',
      calculateEmi: 'حساب الأقساط',
    },
    roles: {
      customer: 'زائر',
      buyer: 'مشتري عقار',
      investor: 'مستثمر عقاري',
      salesExec: 'مسؤول مبيعات',
      admin: 'مدير النظام',
      superAdmin: 'المشرف العام الأعلى',
    },
    propertyCategory: {
      housing: 'مخطط سكني',
      residential: 'مدينة سكنية',
      commercial: 'مركز تجاري',
      apartment: 'شقة فاخرة',
      land: 'أرض / أرض سكنية',
    },
    propertyStatus: {
      ongoing: 'قيد الإنشاء',
      readyToMove: 'جاهز للاستلام',
      upcoming: 'مشروع قادم',
      soldOut: 'تم البيع بالكامل',
    },
    districts: {
      dhaka: 'دكا',
      purbachal: 'بورباتشال',
      chattogram: 'تشيتاجونج',
      sylhet: 'سيلهيت',
      rajshahi: 'راجشاهي',
      coxsBazar: 'كوكس بازار',
      gazipur: 'جازيبور',
      narayanganj: 'نارايانجانج',
    },
    badges: {
      rajukApproved: 'معتمد 100% من RAJUK',
      rajukDesc: 'ملكية واضحة وعقود أرض موثقة وتراخيص قانونية.',
      smartCity: 'تخطيط مدن ذكي',
      smartCityDesc: 'مدن صديقة للبيئة مع مرافق تحت الأرض في بورباتشال وأوتارا.',
      handoverGuarantee: 'ضمان التسليم في الوقت المحدد',
      handoverDesc: 'التزام صارم بالجداول الزمنية مع تحديثات شهرية.',
      flexibleInstallments: 'أقساط ميسرة',
      installmentDesc: 'خطة أقساط تصل إلى 60 شهراً عبر وسائل الدفع المعتمدة.',
    },
    common: {
      loading: 'جاري التحميل...',
      error: 'حدث خطأ. يرجى المحاولة مرة أخرى.',
      success: 'تمت العملية بنجاح!',
      noDataFound: 'لم يتم العثور على عقارات تطابق بحثك.',
      currencySymbol: '৳',
      sqft: 'قدم مربع',
      bdt: 'تاكا',
      total: 'المجموع',
      yes: 'نعم',
      no: 'لا',
      price: 'السعر',
      area: 'المساحة',
      bedrooms: 'الغرف',
      bathrooms: 'الحمامات',
      location: 'الموقع',
      district: 'المنطقة',
      category: 'الفئة',
      status: 'الحالة',
      saved: 'محفوظ',
      wishlist: 'المفضلة',
      bookings: 'الحجوزات',
      notifications: 'الإشعارات',
      allRightsReserved: 'جميع الحقوق محفوظة.',
    },
    dashboard: {
      myPortal: 'بوابة العميل الخاصة بي',
      savedProperties: 'العقارات المحفوظة',
      bookingHistory: 'سجل الحجوزات',
      paymentHistory: 'سجل المدفوعات',
      downloadDocs: 'تحميل المستندات',
      profileSettings: 'إعدادات الحساب',
      welcomeUser: 'مرحباً بعودتك،',
      totalSpent: 'إجمالي الاستثمارات',
      pendingPayments: 'الأقساط المتبقية',
      activeBookings: 'الحجوزات النشطة',
    },
    crm: {
      leadManagement: 'إدارة العملاء المحتملين',
      customerManagement: 'إدارة العملاء',
      salesPipeline: 'مسار المبيعات',
      taskManagement: 'إدارة المهام',
      notes: 'الملاحظات والمتابعة',
      emailCampaign: 'حملات البريد الإلكتروني',
      smsCampaign: 'التسويق عبر الرسائل',
      totalLeads: 'إجمالي العملاء المهتمين',
      conversionRate: 'معدل التحويل',
      monthlyRevenue: 'الإيرادات الشهرية',
    },
    admin: {
      manageUsers: 'إدارة المستخدمين',
      manageProperties: 'إدارة العقارات',
      manageProjects: 'إدارة المشاريع',
      manageBookings: 'إدارة الحجوزات',
      managePayments: 'إدارة المدفوعات',
      manageBlogs: 'إدارة المقالات',
      manageGallery: 'إدارة الوسائط',
      manageVideos: 'إدارة الفيديو',
      manageReviews: 'إدارة التقييمات',
      reports: 'التقارير',
      analytics: 'تحليلات الأداء',
    },
    superAdmin: {
      roleManagement: 'الأدوار والصلاحيات',
      branchManagement: 'الفروع',
      employeeManagement: 'دليل الموظفين',
      systemSettings: 'إعدادات النظام',
      securitySettings: 'قواعد الأمان',
      backupRestore: 'نسخ احتياطي واستعادة',
      auditLogs: 'سجلات التدقيق',
    },
  },
};
