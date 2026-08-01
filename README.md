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
├── android/            # plugins {
    id "com.android.application"
    id "kotlin-android"
    id "dev.flutter.flutter-gradle-plugin"
}


android {

    namespace "com.sukoon.properties"

    compileSdk flutter.compileSdkVersion


    defaultConfig {

        applicationId "com.sukoon.properties"

        minSdk flutter.minSdkVersion

        targetSdk flutter.targetSdkVersion

        versionCode flutterVersionCode.toInteger()

        versionName flutterVersionName

    }

}



flutter {

    source "../.."

}Native Android Gradle configuration & AndroidManifest.xml
├── ios/                # Native iOS Runner configuration & Info.plist
├── assets/             # Brand icons & logo assets
├── lib/
│   ├── main.dart       # import 'package:flutter/material.dart';

import 'screens/splash_screen.dart';
import 'theme/app_theme.dart';



void main() {

  runApp(
    const SukoonPropertiesApp(),
  );

}



class SukoonPropertiesApp extends StatelessWidget {

  const SukoonPropertiesApp({super.key});


  @override
  Widget build(BuildContext context) {


    return MaterialApp(

      debugShowCheckedModeBanner: false,


      title:
          "Sukoon Properties",


      theme:
          AppTheme.lightTheme,


      home:
          const SplashScreen(),


    );

  }

}Main Flutter entry point
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

}Splash, Home,import 'package:flutter/material.dart';

import 'property_details_screen.dart';
import 'contact_screen.dart';
import 'booking_screen.dart';
import 'profile_screen.dart';
import 'favorites_screen.dart';
import 'chat_screen.dart';
import 'blog_screen.dart';
import 'faq_screen.dart';



class HomeScreen extends StatelessWidget {

  const HomeScreen({super.key});


  @override
  Widget build(BuildContext context) {


    return Scaffold(

      appBar: AppBar(

        title:
            const Text(
              "Sukoon Properties",
            ),

      ),



      drawer: Drawer(

        child: ListView(

          children: [


            const DrawerHeader(

              decoration:
                  BoxDecoration(

                color:
                    Colors.green,

              ),

              child:
                  Center(

                child:
                    Text(

                  "Sukoon Properties",

                  style:
                      TextStyle(

                    color:
                        Colors.white,

                    fontSize:
                        22,

                    fontWeight:
                        FontWeight.bold,

                  ),

                ),

              ),

            ),



            menuItem(
              context,
              Icons.person,
              "Profile",
              const ProfileScreen(),
            ),


            menuItem(
              context,
              Icons.favorite,
              "Favorites",
              const FavoritesScreen(),
            ),


            menuItem(
              context,
              Icons.calendar_month,
              "Book Site Visit",
              const BookingScreen(),
            ),


            menuItem(
              context,
              Icons.chat,
              "Live Chat",
              const ChatScreen(),
            ),


            menuItem(
              context,
              Icons.article,
              "Blog",
              const BlogScreen(),
            ),


            menuItem(
              context,
              Icons.help,
              "FAQ",
              const FaqScreen(),
            ),


            menuItem(
              context,
              Icons.contact_phone,
              "Contact",
              const ContactScreen(),
            ),


          ],

        ),

      ),



      body:
          Center(

        child:
            Column(

          mainAxisAlignment:
              MainAxisAlignment.center,


          children: [


            const Icon(

              Icons.home_work,

              size:90,

              color:
                  Colors.green,

            ),



            const SizedBox(height:20),



            const Text(

              "Welcome to Sukoon Properties",

              style:
                  TextStyle(

                fontSize:22,

                fontWeight:
                    FontWeight.bold,

              ),

            ),



            const SizedBox(height:20),



            ElevatedButton(

              onPressed: () {


                Navigator.push(

                  context,

                  MaterialPageRoute(

                    builder:
                    (context)=>
                    const PropertyDetailsScreen(),

                  ),

                );


              },

              child:
                  const Text(
                    "Explore Properties",
                  ),

            ),


          ],

        ),

      ),

    );

  }




  static Widget menuItem(

      BuildContext context,

      IconData icon,

      String title,

      Widget page,

      ) {


    return ListTile(

      leading:
          Icon(icon),


      title:
          Text(title),


      onTap: () {


        Navigator.push(

          context,

          MaterialPageRoute(

            builder:
                (context)=>
                page,

          ),

        );


      },

    );


  }


} Details, Director, EMI Calculator)
│   ├── theme/          # Custom Emerald & Gold App Theme
│   └── widgets/        # Reusable Flutter components (PropertyCard, Filters, etc.)
└── pubspec.yaml        #name: sukoon_properties

description: Sukoon Properties real estate mobile application.

publish_to: "none"


version: 1.0.0+1


environment:

  sdk: ">=3.0.0 <4.0.0"



dependencies:

  flutter:

    sdk: flutter


  cupertino_icons: ^1.0.6


  url_launcher: ^6.3.0



dev_dependencies:

  flutter_test:

    sdk: flutter


  flutter_lints: ^3.0.0



flutter:

  uses-material-design: true


  assets:

    - assets/
    - assets/images/
    - assets/icons/ Flutter dependencies & assets manifest
```
