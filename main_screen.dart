import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:url_launcher/url_launcher.dart';
import '../models/property.dart';
import '../widgets/property_card.dart';
import 'director_profile_screen.dart';
import 'mortgage_calculator_screen.dart';

class MainScreen extends StatefulWidget {
  const MainScreen({super.key});

  @override
  State<MainScreen> createState() => _MainScreenState();
}

class _MainScreenState extends State<MainScreen> {
  int _currentIndex = 0;

  final List<Widget> _pages = [
    const HomeScreenTab(),
    const SearchFilterTab(),
    const DirectorProfileScreen(),
    const MortgageCalculatorScreen(),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: const Color(0xFF064E3B),
        title: Row(
          children: [
            Container(
              padding: const EdgeInsets.all(6),
              decoration: const BoxDecoration(
                color: Color(0xFFF59E0B),
                shape: BoxShape.circle,
              ),
              child: const Icon(Icons.apartment, color: Color(0xFF0F172A), size: 20),
            ),
            const SizedBox(width: 10),
            Text(
              'Sukoon Properties',
              style: GoogleFonts.serif(
                fontWeight: FontWeight.bold,
                fontSize: 18,
                color: Colors.white,
              ),
            ),
          ],
        ),
        actions: [
          IconButton(
            icon: const Icon(Icons.phone, color: Colors.white),
            onPressed: () => launchUrl(Uri.parse('tel:+8801700000000')),
          ),
          IconButton(
            icon: const Icon(Icons.chat_bubble_outline, color: Color(0xFFF59E0B)),
            onPressed: () => launchUrl(Uri.parse('https://wa.me/8801700000000')),
          ),
        ],
      ),
      body: IndexedStack(
        index: _currentIndex,
        children: _pages,
      ),
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: _currentIndex,
        selectedItemColor: const Color(0xFF064E3B),
        unselectedItemColor: Colors.grey[600],
        type: BottomNavigationBarType.fixed,
        onTap: (index) => setState(() => _currentIndex = index),
        items: const [
          BottomNavigationBarItem(
            icon: Icon(Icons.home_rounded),
            label: 'হোম',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.search_rounded),
            label: 'খুঁজুন',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.person_rounded),
            label: 'পরিচালক',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.calculate_rounded),
            label: 'ক্যালকুলেটর',
          ),
        ],
      ),
    );
  }
}

class HomeScreenTab extends StatelessWidget {
  const HomeScreenTab({super.key});

  @override
  Widget build(BuildContext context) {
    return ListView(
      padding: const EdgeInsets.all(16),
      children: [
        Container(
          padding: const EdgeInsets.all(18),
          decoration: BoxDecoration(
            color: const Color(0xFF022C22),
            borderRadius: BorderRadius.circular(20),
            boxShadow: [
              BoxShadow(
                color: const Color(0xFF022C22).withOpacity(0.3),
                blurRadius: 10,
                offset: const Offset(0, 4),
              ),
            ],
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                children: [
                  const Icon(Icons.stars, color: Color(0xFFF59E0B), size: 20),
                  const SizedBox(width: 8),
                  Text(
                    'সুকুন প্রপার্টিজ মোবাইল অ্যাপ',
                    style: GoogleFonts.hindSiliguri(
                      fontSize: 18,
                      fontWeight: FontWeight.bold,
                      color: const Color(0xFFF59E0B),
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 8),
              Text(
                'বসুন্ধরা, মিরপুর ও ধানমন্ডির বিশ্বস্ত প্রপার্টি ও প্রাইম লোকেশন ফ্ল্যাট সরাসরি অ্যাপে ব্রাউজ করুন।',
                style: GoogleFonts.hindSiliguri(
                  color: Colors.white70,
                  fontSize: 13,
                  height: 1.5,
                ),
              ),
            ],
          ),
        ),
        const SizedBox(height: 20),
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Text(
              'প্রাইম প্রপার্টিসমূহ (Featured Listings)',
              style: GoogleFonts.hindSiliguri(
                fontSize: 16,
                fontWeight: FontWeight.bold,
                color: const Color(0xFF064E3B),
              ),
            ),
            const Icon(Icons.arrow_forward_ios, size: 14, color: Color(0xFF064E3B)),
          ],
        ),
        const SizedBox(height: 12),
        ...Property.sampleProperties.map((p) => PropertyCard(property: p)),
      ],
    );
  }
}

class SearchFilterTab extends StatefulWidget {
  const SearchFilterTab({super.key});

  @override
  State<SearchFilterTab> createState() => _SearchFilterTabState();
}

class _SearchFilterTabState extends State<SearchFilterTab> {
  String _searchQuery = '';
  String _selectedCategory = 'All';

  @override
  Widget build(BuildContext context) {
    final filtered = Property.sampleProperties.where((p) {
      final matchesQuery = p.title.toLowerCase().contains(_searchQuery.toLowerCase()) ||
          p.location.toLowerCase().contains(_searchQuery.toLowerCase());
      final matchesCat = _selectedCategory == 'All' || p.type == _selectedCategory;
      return matchesQuery && matchesCat;
    }).toList();

    return Padding(
      padding: const EdgeInsets.all(16),
      child: Column(
        children: [
          TextField(
            decoration: InputDecoration(
              hintText: 'লোকেশান বা প্রপার্টি সার্চ করুন...',
              prefixIcon: const Icon(Icons.search, color: Color(0xFF064E3B)),
              filled: true,
              fillColor: Colors.white,
              border: OutlineInputBorder(
                borderRadius: BorderRadius.circular(16),
                borderSide: BorderSide.none,
              ),
            ),
            onChanged: (val) => setState(() => _searchQuery = val),
          ),
          const SizedBox(height: 12),
          SingleChildScrollView(
            scrollDirection: Axis.horizontal,
            child: Row(
              children: ['All', 'Apartment', 'Plot'].map((cat) {
                final isSelected = _selectedCategory == cat;
                return Padding(
                  padding: const EdgeInsets.only(right: 8),
                  child: ChoiceChip(
                    label: Text(cat == 'All' ? 'সবগুলো' : (cat == 'Apartment' ? 'ফ্ল্যাট' : 'প্লট')),
                    selected: isSelected,
                    selectedColor: const Color(0xFF064E3B),
                    labelStyle: TextStyle(
                      color: isSelected ? Colors.white : const Color(0xFF0F172A),
                      fontWeight: FontWeight.bold,
                    ),
                    onSelected: (sel) {
                      if (sel) setState(() => _selectedCategory = cat);
                    },
                  ),
                );
              }).toList(),
            ),
          ),
          const SizedBox(height: 16),
          Expanded(
            child: filtered.isEmpty
                ? const Center(child: Text('কোনো প্রপার্টি পাওয়া যায়নি'))
                : ListView.builder(
                    itemCount: filtered.length,
                    itemBuilder: (_, i) => PropertyCard(property: filtered[i]),
                  ),
          ),
        ],
      ),
    );
  }
}
