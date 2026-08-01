import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';


class ContactScreen extends StatelessWidget {

  const ContactScreen({super.key});


  Future<void> openUrl(String url) async {

    final Uri uri = Uri.parse(url);

    if (await canLaunchUrl(uri)) {

      await launchUrl(uri);

    }

  }


  @override
  Widget build(BuildContext context) {


    return Scaffold(

      appBar: AppBar(

        title: const Text(
          "Contact Us",
        ),

      ),


      body: Padding(

        padding:
            const EdgeInsets.all(20),


        child: Column(

          crossAxisAlignment:
              CrossAxisAlignment.start,


          children: [


            const Text(

              "Sukoon Properties Ltd.",

              style: TextStyle(

                fontSize: 26,

                fontWeight:
                    FontWeight.bold,

              ),

            ),



            const SizedBox(height:20),



            const Text(

              "Safe • Trusted • Modern Housing",

              style: TextStyle(

                fontSize:16,

              ),

            ),



            const SizedBox(height:30),



            ListTile(

              leading:
                  const Icon(
                    Icons.phone,
                    color: Colors.green,
                  ),

              title:
                  const Text(
                    "Call Us",
                  ),

              onTap: () {

                openUrl(
                  "tel:+8801000000000",
                );

              },

            ),



            ListTile(

              leading:
                  const Icon(
                    Icons.email,
                    color: Colors.green,
                  ),

              title:
                  const Text(
                    "Email",
                  ),

              onTap: () {

                openUrl(
                  "mailto:sukoonpropertiesltd@gmail.com",
                );

              },

            ),



            ListTile(

              leading:
                  const Icon(
                    Icons.chat,
                    color: Colors.green,
                  ),

              title:
                  const Text(
                    "WhatsApp",
                  ),

              onTap: () {

                openUrl(
                  "https://wa.me/8801000000000",
                );

              },

            ),


          ],

        ),

      ),

    );

  }

}
