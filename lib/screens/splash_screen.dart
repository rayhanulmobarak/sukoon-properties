import 'dart:async';
import 'package:flutter/material.dart';
import 'home_screen.dart';


class SplashScreen extends StatefulWidget {

  const SplashScreen({super.key});

  @override
  State<SplashScreen> createState() =>
      _SplashScreenState();

}



class _SplashScreenState extends State<SplashScreen> {


  @override
  void initState() {

    super.initState();


    Timer(

      const Duration(seconds: 3),

      () {

        Navigator.pushReplacement(

          context,

          MaterialPageRoute(

            builder: (context) =>
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


      body: Center(

        child: Column(

          mainAxisAlignment:
              MainAxisAlignment.center,


          children: [


            Container(

              height: 120,

              width: 120,

              decoration:
                  BoxDecoration(

                color: Colors.white,

                borderRadius:
                    BorderRadius.circular(60),

              ),


              child: const Icon(

                Icons.home_work,

                size: 70,

                color: Color(0xffC9A227),

              ),

            ),



            const SizedBox(height: 30),



            const Text(

              "Sukoon Properties",

              style: TextStyle(

                color: Colors.white,

                fontSize: 28,

                fontWeight:
                    FontWeight.bold,

              ),

            ),



            const SizedBox(height: 10),



            const Text(

              "Safe • Trusted • Modern Housing",

              style: TextStyle(

                color: Colors.white70,

                fontSize: 16,

              ),

            ),



            const SizedBox(height: 40),



            const CircularProgressIndicator(

              color: Colors.white,

            ),


          ],

        ),

      ),

    );

  }

}
