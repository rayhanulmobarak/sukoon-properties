import 'package:flutter/material.dart';


class SettingsScreen extends StatelessWidget {

  const SettingsScreen({super.key});


  @override
  Widget build(BuildContext context) {


    return Scaffold(

      appBar: AppBar(

        title:
            const Text(
              "Settings",
            ),

      ),



      body: ListView(

        padding:
            const EdgeInsets.all(15),


        children: [


          Card(

            child: ListTile(

              leading:
                  const Icon(
                    Icons.language,
                  ),

              title:
                  const Text(
                    "Language",
                  ),

              subtitle:
                  const Text(
                    "English / বাংলা",
                  ),

            ),

          ),



          Card(

            child: ListTile(

              leading:
                  const Icon(
                    Icons.privacy_tip,
                  ),

              title:
                  const Text(
                    "Privacy Policy",
                  ),

              onTap: () {},

            ),

          ),



          Card(

            child: ListTile(

              leading:
                  const Icon(
                    Icons.description,
                  ),

              title:
                  const Text(
                    "Terms & Conditions",
                  ),

              onTap: () {},

            ),

          ),



          Card(

            child: ListTile(

              leading:
                  const Icon(
                    Icons.info,
                  ),

              title:
                  const Text(
                    "About App",
                  ),

              subtitle:
                  const Text(
                    "Sukoon Properties App Version 1.0",
                  ),

            ),

          ),


        ],

      ),

    );

  }

}
