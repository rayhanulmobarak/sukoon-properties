import 'package:flutter/material.dart';

class AppTheme {

  static ThemeData lightTheme = ThemeData(

    useMaterial3: true,

    colorScheme: ColorScheme.fromSeed(
      seedColor: Colors.green,
    ),

    scaffoldBackgroundColor:
        const Color(0xffF8F9F7),

    appBarTheme: const AppBarTheme(

      backgroundColor:
          Color(0xff0B6B3A),

      foregroundColor:
          Colors.white,

      elevation: 0,

      centerTitle: true,
    ),


    elevatedButtonTheme:
        ElevatedButtonThemeData(

      style: ElevatedButton.styleFrom(

        backgroundColor:
            const Color(0xffC9A227),

        foregroundColor:
            Colors.white,

        padding:
            const EdgeInsets.symmetric(
              horizontal: 30,
              vertical: 15,
            ),

        shape:
            RoundedRectangleBorder(

          borderRadius:
              BorderRadius.circular(12),

        ),

      ),

    ),


    cardTheme:
        CardThemeData(

      elevation: 3,

      shape:
          RoundedRectangleBorder(

        borderRadius:
            BorderRadius.circular(15),

      ),

    ),


    textTheme:
        const TextTheme(

      headlineLarge:
          TextStyle(

        fontSize: 28,

        fontWeight:
            FontWeight.bold,

        color:
            Color(0xff0B6B3A),

      ),


      bodyLarge:
          TextStyle(

        fontSize: 16,

      ),

    ),

  );

}
