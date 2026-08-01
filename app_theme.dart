import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class AppTheme {
  static const Color primaryEmerald = Color(0xFF064E3B);
  static const Color deepForest = Color(0xFF022C22);
  static const Color accentGold = Color(0xFFF59E0B);
  static const Color lightBackground = Color(0xFFF8FAFC);
  static const Color darkSlate = Color(0xFF0F172A);

  static ThemeData get lightTheme {
    return ThemeData(
      primaryColor: primaryEmerald,
      scaffoldBackgroundColor: lightBackground,
      colorScheme: ColorScheme.fromSeed(
        seedColor: primaryEmerald,
        primary: primaryEmerald,
        secondary: accentGold,
      ),
      textTheme: GoogleFonts.hindSiliguriTextTheme(),
      appBarTheme: const AppBarTheme(
        backgroundColor: primaryEmerald,
        foregroundColor: Colors.white,
        elevation: 0,
      ),
      useMaterial3: true,
    );
  }
}
