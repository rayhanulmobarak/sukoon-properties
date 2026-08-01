import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:url_launcher/url_launcher.dart';

class DirectorProfileScreen extends StatelessWidget {
  const DirectorProfileScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('ব্যবস্থাপনা পরিচালক (Director)'),
        backgroundColor: const Color(0xFF064E3B),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(20),
        child: Column(
          children: [
            Container(
              padding: const EdgeInsets.all(20),
              decoration: BoxDecoration(
                color: const Color(0xFF022C22),
                borderRadius: BorderRadius.circular(20),
                boxShadow: [
                  BoxShadow(
                    color: Colors.black.withOpacity(0.1),
                    blurRadius: 10,
                  ),
                ],
              ),
              child: Column(
                children: [
                  const CircleAvatar(
                    radius: 50,
                    backgroundColor: Color(0xFFF59E0B),
                    child: CircleAvatar(
                      radius: 46,
                      backgroundImage: NetworkImage(
                        'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400',
                      ),
                    ),
                  ),
                  const SizedBox(height: 16),
                  Text(
                    'রায়হানুল মোবারক',
                    style: GoogleFonts.hindSiliguri(
                      fontSize: 22,
                      fontWeight: FontWeight.bold,
                      color: Colors.white,
                    ),
                  ),
                  Text(
                    'Rayhanul Mobarak',
                    style: GoogleFonts.serif(
                      fontSize: 14,
                      color: const Color(0xFFF59E0B),
                    ),
                  ),
                  const SizedBox(height: 6),
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 4),
                    decoration: BoxDecoration(
                      color: const Color(0xFF064E3B),
                      borderRadius: BorderRadius.circular(12),
                    ),
                    child: const Text(
                      'Director & Founder, Sukoon Properties',
                      style: TextStyle(color: Colors.white70, fontSize: 12),
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 24),
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(16),
                border: Border.all(color: Colors.grey.shade200),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'পরিচালকের বার্তা',
                    style: GoogleFonts.hindSiliguri(
                      fontSize: 18,
                      fontWeight: FontWeight.bold,
                      color: const Color(0xFF064E3B),
                    ),
                  ),
                  const SizedBox(height: 10),
                  Text(
                    'সুকুন প্রপার্টিজে আমাদের লক্ষ্য শুধু জমি বা ফ্ল্যাট বিক্রি নয়, বরং প্রতিটি পরিবারের জন্য নিরাপদ, সুপরিকল্পিত এবং শান্তিময় আবাসনের নিশ্চয়তা দেওয়া। সৎ পরামর্শ এবং দীর্ঘমেয়াদী সম্পর্কের মাধ্যমে আমরা সততার সাথে সেবা প্রদানে প্রতিশ্রুতিবদ্ধ।',
                    style: GoogleFonts.hindSiliguri(
                      fontSize: 14,
                      height: 1.6,
                      color: Colors.grey.shade800,
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 24),
            SizedBox(
              width: double.infinity,
              height: 48,
              child: ElevatedButton.icon(
                style: ElevatedButton.styleFrom(
                  backgroundColor: const Color(0xFF064E3B),
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                ),
                icon: const Icon(Icons.phone, color: Colors.white),
                label: const Text('সরাসরি অফিস নাম্বারে কল করুন', style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold)),
                onPressed: () => launchUrl(Uri.parse('tel:+8801700000000')),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
