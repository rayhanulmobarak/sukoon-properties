import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class MortgageCalculatorScreen extends StatefulWidget {
  const MortgageCalculatorScreen({super.key});

  @override
  State<MortgageCalculatorScreen> createState() => _MortgageCalculatorScreenState();
}

class _MortgageCalculatorScreenState extends State<MortgageCalculatorScreen> {
  double _propertyValue = 10000000; // 1 Crore BDT
  double _downPaymentPercent = 30; // 30%
  double _interestRate = 9.0; // 9%
  double _tenureYears = 15; // 15 Years

  double get loanAmount => _propertyValue * (1 - (_downPaymentPercent / 100));

  double get monthlyEmi {
    double p = loanAmount;
    double r = (_interestRate / 12) / 100;
    double n = _tenureYears * 12;
    if (r == 0) return p / n;
    return (p * r * (1 + r) * (1 + r)) / (((1 + r) * (1 + r)) - 1);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('হোম লোন ও ইএমআই ক্যালকুলেটর'),
        backgroundColor: const Color(0xFF064E3B),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Container(
              padding: const EdgeInsets.all(20),
              decoration: BoxDecoration(
                color: const Color(0xFF022C22),
                borderRadius: BorderRadius.circular(20),
              ),
              child: Column(
                children: [
                  Text(
                    'আনুমানিক মাসিক ইএমআই (Monthly EMI)',
                    style: GoogleFonts.hindSiliguri(color: const Color(0xFFA7F3D0), fontSize: 13),
                  ),
                  const SizedBox(height: 8),
                  Text(
                    '৳ ${(loanAmount * 0.0095).toStringAsFixed(0)} / মাস',
                    style: GoogleFonts.sansSerif(
                      color: const Color(0xFFF59E0B),
                      fontSize: 26,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  const SizedBox(height: 8),
                  Text(
                    'লোন পরিমাণ: ৳ ${(loanAmount / 100000).toStringAsFixed(1)} লাখ টাকা',
                    style: const TextStyle(color: Colors.white70, fontSize: 13),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 24),
            Text('প্রপার্টির মোট মূল্য: ৳ ${(_propertyValue / 100000).toStringAsFixed(0)} লাখ টাকা', style: const TextStyle(fontWeight: FontWeight.bold)),
            Slider(
              value: _propertyValue,
              min: 2000000,
              max: 50000000,
              divisions: 48,
              activeColor: const Color(0xFF064E3B),
              onChanged: (val) => setState(() => _propertyValue = val),
            ),
            const SizedBox(height: 16),
            Text('ডাউনপেমেন্ট: ${_downPaymentPercent.toStringAsFixed(0)}%', style: const TextStyle(fontWeight: FontWeight.bold)),
            Slider(
              value: _downPaymentPercent,
              min: 10,
              max: 60,
              divisions: 10,
              activeColor: const Color(0xFF064E3B),
              onChanged: (val) => setState(() => _downPaymentPercent = val),
            ),
            const SizedBox(height: 16),
            Text('লোনের মেয়াদ: ${_tenureYears.toStringAsFixed(0)} বছর', style: const TextStyle(fontWeight: FontWeight.bold)),
            Slider(
              value: _tenureYears,
              min: 5,
              max: 25,
              divisions: 20,
              activeColor: const Color(0xFF064E3B),
              onChanged: (val) => setState(() => _tenureYears = val),
            ),
          ],
        ),
      ),
    );
  }
}
