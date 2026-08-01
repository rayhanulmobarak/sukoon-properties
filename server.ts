import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import { initialProperties, initialProjects, initialLeads, initialTickets, initialBranches } from './src/data/propertiesData';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // In-memory persistent data store
  let properties = [...initialProperties];
  let projects = [...initialProjects];
  let leads = [...initialLeads];
  let tickets = [...initialTickets];
  let bookings: any[] = [
    {
      id: 'bk_001',
      bookingCode: 'SUK-2026-9901',
      propertyId: 'prop_001',
      propertyTitle: '5 Katha South-Facing Plot in Purbachal Sector 22',
      propertyLocation: 'Purbachal Smart City',
      userId: 'usr_001',
      userName: 'Rayhanul Mobarak',
      userEmail: 'sukoonpropertiesltd@gmail.com',
      userPhone: '+880 1711-000000',
      bookingType: 'Plot Reservation',
      visitDate: '2026-08-05',
      timeSlot: '11:00 AM',
      vehiclePickupRequested: true,
      paymentStatus: 'Deposit Paid',
      amountPaidBDT: 500000,
      totalPriceBDT: 4500000,
      paymentMethod: 'bKash',
      transactionId: 'BK88291039',
      createdAt: '2026-07-28',
    },
  ];
  let payments: any[] = [
    {
      id: 'inv_1001',
      invoiceNumber: 'INV-SUK-2026-001',
      bookingId: 'bk_001',
      userEmail: 'sukoonpropertiesltd@gmail.com',
      userName: 'Rayhanul Mobarak',
      amountBDT: 500000,
      paymentMethod: 'bKash',
      transactionId: 'BK88291039',
      status: 'Successful',
      date: '2026-07-28',
      purpose: 'Plot Booking Deposit - Purbachal Sector 22',
    },
  ];

  // API Routes
  app.get('/download/SukoonProperties_SourceCode.zip', (req, res) => {
    const zipPath = path.join(process.cwd(), 'public', 'download', 'SukoonProperties_SourceCode.zip');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/zip');
    res.setHeader('Content-Disposition', 'attachment; filename="SukoonProperties_SourceCode.zip"');
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.sendFile(zipPath);
  });

  app.get('/*.zip', (req, res) => {
    const zipPath = path.join(process.cwd(), 'public', 'download', 'SukoonProperties_SourceCode.zip');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/zip');
    res.setHeader('Content-Disposition', 'attachment; filename="SukoonProperties_SourceCode.zip"');
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.sendFile(zipPath);
  });

  app.get('/download/SukoonProperties.apk', (req, res) => {
    const apkPath = path.join(process.cwd(), 'public', 'download', 'SukoonProperties.apk');
    res.setHeader('Content-Type', 'application/vnd.android.package-archive');
    res.setHeader('Content-Disposition', 'attachment; filename="SukoonProperties.apk"');
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.sendFile(apkPath);
  });

  app.get('/*.apk', (req, res) => {
    const apkPath = path.join(process.cwd(), 'public', 'download', 'SukoonProperties.apk');
    res.setHeader('Content-Type', 'application/vnd.android.package-archive');
    res.setHeader('Content-Disposition', 'attachment; filename="SukoonProperties.apk"');
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.sendFile(apkPath);
  });

  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      company: 'Sukoon Properties Ltd.',
      director: 'Rayhanul Mobarak',
      officialEmail: 'sukoonpropertiesltd@gmail.com',
      targetCountry: 'Bangladesh',
      timestamp: new Date().toISOString(),
    });
  });

  // Properties API
  app.get('/api/properties', (req, res) => {
    const { district, category, minPrice, maxPrice, search, status } = req.query;
    let filtered = [...properties];

    if (district && district !== 'All') {
      filtered = filtered.filter((p) => p.district.toLowerCase() === (district as string).toLowerCase());
    }
    if (category && category !== 'All') {
      filtered = filtered.filter((p) => p.category.toLowerCase() === (category as string).toLowerCase());
    }
    if (status && status !== 'All') {
      filtered = filtered.filter((p) => p.status.toLowerCase() === (status as string).toLowerCase());
    }
    if (search) {
      const q = (search as string).toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.location.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }
    if (minPrice) {
      filtered = filtered.filter((p) => p.priceBDT >= Number(minPrice));
    }
    if (maxPrice) {
      filtered = filtered.filter((p) => p.priceBDT <= Number(maxPrice));
    }

    res.json({ success: true, count: filtered.length, properties: filtered });
  });

  app.get('/api/properties/:id', (req, res) => {
    const prop = properties.find((p) => p.id === req.params.id);
    if (!prop) {
      return res.status(404).json({ success: false, message: 'Property not found' });
    }
    res.json({ success: true, property: prop });
  });

  app.post('/api/properties', (req, res) => {
    const newProp = {
      id: `prop_${Date.now()}`,
      dateAdded: new Date().toISOString().split('T')[0],
      isFeatured: req.body.isFeatured || false,
      isPremium: req.body.isPremium || false,
      floorPlans: req.body.floorPlans || [],
      nearby: req.body.nearby || [],
      features: req.body.features || [],
      images: req.body.images || ['https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1000&q=80'],
      mapCoords: req.body.mapCoords || { lat: 23.8103, lng: 90.4125 },
      ...req.body,
    };
    properties.unshift(newProp);
    res.status(201).json({ success: true, property: newProp });
  });

  // Projects API
  app.get('/api/projects', (req, res) => {
    res.json({ success: true, count: projects.length, projects });
  });

  // Bookings API
  app.get('/api/bookings', (req, res) => {
    const { email } = req.query;
    let list = [...bookings];
    if (email) {
      list = list.filter((b) => b.userEmail.toLowerCase() === (email as string).toLowerCase());
    }
    res.json({ success: true, count: list.length, bookings: list });
  });

  app.post('/api/bookings', (req, res) => {
    const { propertyId, propertyTitle, propertyLocation, userName, userEmail, userPhone, bookingType, visitDate, timeSlot, vehiclePickupRequested, amountPaidBDT, totalPriceBDT, paymentMethod } = req.body;
    
    const newBooking = {
      id: `bk_${Date.now()}`,
      bookingCode: `SUK-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      propertyId: propertyId || 'prop_001',
      propertyTitle: propertyTitle || 'Sukoon Smart Housing Project',
      propertyLocation: propertyLocation || 'Purbachal Smart City',
      userId: `usr_${Date.now()}`,
      userName: userName || 'Valued Client',
      userEmail: userEmail || 'client@example.com',
      userPhone: userPhone || '+880 1700-000000',
      bookingType: bookingType || 'Site Visit Appointment',
      visitDate: visitDate || new Date().toISOString().split('T')[0],
      timeSlot: timeSlot || '10:00 AM',
      vehiclePickupRequested: !!vehiclePickupRequested,
      paymentStatus: amountPaidBDT > 0 ? 'Deposit Paid' : 'Pending',
      amountPaidBDT: amountPaidBDT || 0,
      totalPriceBDT: totalPriceBDT || 0,
      paymentMethod: paymentMethod || 'bKash',
      transactionId: `TXN${Math.floor(10000000 + Math.random() * 90000000)}`,
      createdAt: new Date().toISOString().split('T')[0],
    };

    bookings.unshift(newBooking);

    // Also auto-create a lead in CRM
    const newLead = {
      id: `ld_${Date.now()}`,
      name: newBooking.userName,
      email: newBooking.userEmail,
      phone: newBooking.userPhone,
      propertyInterest: newBooking.propertyTitle,
      budgetBDT: newBooking.totalPriceBDT,
      districtInterest: newBooking.propertyLocation,
      status: 'Site Visit Scheduled' as const,
      assignedTo: 'Rayhanul Mobarak (Director)',
      notes: [`Booked ${newBooking.bookingType} on ${newBooking.visitDate}`],
      source: 'Website Form' as const,
      createdAt: newBooking.createdAt,
    };
    leads.unshift(newLead);

    res.status(201).json({ success: true, booking: newBooking });
  });

  // Payments API
  app.post('/api/payments/process', (req, res) => {
    const { bookingId, userEmail, userName, amountBDT, paymentMethod, purpose } = req.body;

    const txnId = `${paymentMethod.slice(0, 2).toUpperCase()}${Math.floor(10000000 + Math.random() * 90000000)}`;
    const newInvoice = {
      id: `inv_${Date.now()}`,
      invoiceNumber: `INV-SUK-2026-${Math.floor(100 + Math.random() * 900)}`,
      bookingId: bookingId || 'bk_gen',
      userEmail: userEmail || 'client@example.com',
      userName: userName || 'Valued Customer',
      amountBDT: amountBDT || 100000,
      paymentMethod: paymentMethod || 'bKash',
      transactionId: txnId,
      status: 'Successful',
      date: new Date().toISOString().split('T')[0],
      purpose: purpose || 'Property Down Payment',
    };

    payments.unshift(newInvoice);

    // Update booking if exists
    const b = bookings.find((bk) => bk.id === bookingId);
    if (b) {
      b.paymentStatus = 'Completed';
      b.amountPaidBDT += newInvoice.amountBDT;
      b.transactionId = txnId;
      b.paymentMethod = paymentMethod;
    }

    res.json({ success: true, message: 'Payment successfully processed!', invoice: newInvoice });
  });

  app.get('/api/payments/invoices', (req, res) => {
    res.json({ success: true, invoices: payments });
  });

  // CRM Leads API
  app.get('/api/leads', (req, res) => {
    res.json({ success: true, leads });
  });

  app.post('/api/leads', (req, res) => {
    const lead = {
      id: `ld_${Date.now()}`,
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      propertyInterest: req.body.propertyInterest || 'General Inquiry',
      budgetBDT: req.body.budgetBDT || 5000000,
      districtInterest: req.body.districtInterest || 'Dhaka',
      status: 'New' as const,
      assignedTo: 'Sales Team',
      notes: [req.body.message || 'Submitted contact form on website'],
      source: (req.body.source || 'Website Form') as any,
      createdAt: new Date().toISOString().split('T')[0],
    };
    leads.unshift(lead);
    res.status(201).json({ success: true, lead });
  });

  app.put('/api/leads/:id', (req, res) => {
    const lead = leads.find((l) => l.id === req.params.id);
    if (!lead) return res.status(404).json({ success: false, message: 'Lead not found' });
    if (req.body.status) lead.status = req.body.status;
    if (req.body.assignedTo) lead.assignedTo = req.body.assignedTo;
    if (req.body.note) lead.notes.push(req.body.note);
    res.json({ success: true, lead });
  });

  // Support Tickets API
  app.get('/api/tickets', (req, res) => {
    res.json({ success: true, tickets });
  });

  app.post('/api/tickets', (req, res) => {
    const newTkt = {
      id: `tkt_${Date.now()}`,
      ticketCode: `TKT-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      userEmail: req.body.userEmail || 'client@example.com',
      userName: req.body.userName || 'Client',
      subject: req.body.subject || 'Inquiry',
      category: req.body.category || 'General',
      priority: req.body.priority || 'Medium',
      status: 'Open' as const,
      messages: [
        {
          sender: req.body.userName || 'Client',
          text: req.body.message || 'Help needed',
          timestamp: new Date().toLocaleString(),
        },
      ],
      createdAt: new Date().toISOString().split('T')[0],
    };
    tickets.unshift(newTkt);
    res.status(201).json({ success: true, ticket: newTkt });
  });

  // Server-side Gemini AI Recommendation Endpoint
  app.post('/api/ai/recommendation', async (req, res) => {
    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.json({
          success: true,
          aiResponse: "Welcome to Sukoon Properties Ltd.! Director Rayhanul Mobarak recommends exploring our flagship 5-Katha plots in Purbachal Sector 22 or luxury 4-BHK lakeview duplexes in Gulshan 2 based on current market trends.",
        });
      }

      const { budget, location, propertyType } = req.body;
      const ai = new GoogleGenAI({ apiKey });
      const prompt = `You are the AI Real Estate Advisor for Sukoon Properties Ltd., Bangladesh (Director: Rayhanul Mobarak, Email: sukoonpropertiesltd@gmail.com).
The user is looking for real estate in Bangladesh with:
- Budget: BDT ৳ ${budget || 'Flexible'}
- Desired Location: ${location || 'Dhaka / Purbachal'}
- Property Category: ${propertyType || 'Residential / Plots'}

Provide a polite, authoritative 3-paragraph recommendation highlighting why Sukoon Properties is the premier choice, mentioning specific areas like Purbachal Smart City, Gulshan Avenue, Uttara Metro Zone, or Cox's Bazar Marine Drive. Emphasize RAJA clearance, transparent deeds, and bKash/SSLCommerz easy installment options.`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      res.json({
        success: true,
        aiResponse: response.text || 'Recommendation generated successfully.',
      });
    } catch (err: any) {
      console.error('Gemini API Error:', err);
      res.json({
        success: true,
        aiResponse: "Sukoon Properties Ltd. offers prime housing plots in Purbachal Smart City and ready-to-move apartments in Gulshan & Uttara. Contact our Director Rayhanul Mobarak's team at sukoonpropertiesltd@gmail.com for custom site visits.",
      });
    }
  });

  // Supabase PostgreSQL Schema Generator endpoint for Developer/Super Admin
  app.get('/api/db/schema', (req, res) => {
    const ddl = `-- PostgreSQL Schema for Sukoon Properties Ltd.
-- Provisioned on Supabase PostgreSQL

CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(50),
    role VARCHAR(50) DEFAULT 'customer',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    category VARCHAR(100) NOT NULL,
    location VARCHAR(255) NOT NULL,
    district VARCHAR(100) NOT NULL,
    total_units INT DEFAULT 0,
    available_units INT DEFAULT 0,
    start_price_bdt NUMERIC(15,2) NOT NULL,
    status VARCHAR(50) DEFAULT 'Under Construction',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS properties (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID REFERENCES projects(id) ON DELETE SET NULL,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    type VARCHAR(100) NOT NULL,
    status VARCHAR(50) NOT NULL,
    district VARCHAR(100) NOT NULL,
    address TEXT NOT NULL,
    price_bdt NUMERIC(15,2) NOT NULL,
    area_sqft NUMERIC(10,2) NOT NULL,
    bedrooms INT DEFAULT 0,
    bathrooms INT DEFAULT 0,
    is_featured BOOLEAN DEFAULT FALSE,
    is_premium BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    booking_code VARCHAR(50) UNIQUE NOT NULL,
    property_id UUID REFERENCES properties(id),
    user_id UUID REFERENCES users(id),
    booking_type VARCHAR(100) NOT NULL,
    visit_date DATE,
    time_slot VARCHAR(50),
    payment_status VARCHAR(50) DEFAULT 'Pending',
    amount_paid_bdt NUMERIC(15,2) DEFAULT 0,
    total_price_bdt NUMERIC(15,2) DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS crm_leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    property_interest VARCHAR(255),
    budget_bdt NUMERIC(15,2),
    status VARCHAR(50) DEFAULT 'New',
    assigned_to VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
`;
    res.setHeader('Content-Type', 'text/plain');
    res.send(ddl);
  });

  // Vite middleware setup
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Sukoon Properties Ltd. Server running on http://localhost:${PORT}`);
  });
}

startServer();
