# Sukoon Properties - Official Native Flutter Application

This is the complete, standalone, production-ready Flutter mobile application for **Sukoon Properties**.

---

## 📱 Features Included
1. **Splash Screen**: Animated branded entry screen with company slogan & logo.
2. **Featured Property Listings**: Interactive card feeds with location, pricing, size badge, and prime tags.
3. **Advanced Search & Filter**: Instant live search by location or title and filter by property category (Apartments / Plots).
4. **Property Details Screen**: Full property breakdown, high-res image gallery, features, pricing, and 1-tap WhatsApp booking button.
5. **Director Profile Screen**: Dedicated Director profile for Rayhanul Mobarak with company vision statement and direct call launcher.
6. **Mortgage & Home Loan EMI Calculator**: Real-time slider-based EMI calculator for property value, down payment %, interest rate, and tenure.
7. **Direct Calling & WhatsApp Integration**: Native deep-links for `tel:` and `https://wa.me/` protocol handling.

---

## 🚀 How to Run & Build APK

### Prerequisites
- Flutter SDK (`>= 3.0.0`)
- Android Studio / Xcode
- Java Development Kit (JDK 17)

### Step 1: Install Dependencies
```bash
cd flutter_app
flutter pub get
```

### Step 2: Run in Development Mode
```bash
flutter run
```

### Step 3: Build Android Release APK
```bash
flutter build apk --release
```

The compiled Android APK file will be located at:
`build/app/outputs/flutter-apk/app-release.apk`

---

## 📁 Project Directory Structure
```
flutter_app/
├── android/            # Native Android Gradle configuration & AndroidManifest.xml
├── ios/                # Native iOS Runner configuration & Info.plist
├── assets/             # Brand icons & logo assets
├── lib/
│   ├── main.dart       # Main Flutter entry point
│   ├── models/         # Data models (Property model with sample data)
│   ├── screens/        # Flutter Screens (import 'dart:async';

import 'package:flutter/material.dart';

import 'home_screen.dart';



class SplashScreen extends StatefulWidget {

  const SplashScreen({super.key});


  @override
  State<SplashScreen> createState() =>
      _SplashScreenState();

}



class _SplashScreenState
    extends State<SplashScreen> {


  @override
  void initState() {

    super.initState();


    Timer(

      const Duration(seconds:3),

      () {

        Navigator.pushReplacement(

          context,

          MaterialPageRoute(

            builder:
                (context) =>
                    const HomeScreen(),

          ),

        );

      },

    );

  }



  @override
  Widget build(BuildContext context) {


    return Scaffold(

      backgroundColor:
          const Color(0xff0B6B3A),



      body:
          Center(

        child:
            Column(

          mainAxisAlignment:
              MainAxisAlignment.center,


          children: [


            const Icon(

              Icons.home,

              size:100,

              color:
                  Color(0xffC9A227),

            ),



            const SizedBox(height:20),



            const Text(

              "Sukoon Properties",

              style:
                  TextStyle(

                color:
                    Colors.white,

                fontSize:28,

                fontWeight:
                    FontWeight.bold,

              ),

            ),



            const SizedBox(height:10),



            const Text(

              "Safe • Trusted • Modern Housing",

              style:
                  TextStyle(

                color:
                    Colors.white70,

                fontSize:15,

              ),

            ),


          ],

        ),

      ),

    );

  }

}Splash, Home, Details, Director, EMI Calculator)
│   ├── theme/          # Custom Emerald & Gold App Theme
│   └── widgets/        # Reusable Flutter components (PropertyCard, Filters, etc.)
└── pubspec.yaml        # Flutter dependencies & assets manifest
```
