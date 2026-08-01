import 'package:flutter/material.dart';


class PrivacyPolicyScreen extends StatelessWidget {

  const PrivacyPolicyScreen({super.key});


  @override
  Widget build(BuildContext context) {


    return Scaffold(

      appBar: AppBar(

        title:
            const Text(
              "Privacy Policy",
            ),

      ),



      body: SingleChildScrollView(

        padding:
            const EdgeInsets.all(20),


        child: Column(

          crossAxisAlignment:
              CrossAxisAlignment.start,


          children: [


            const Text(

              "Sukoon Properties Privacy Policy",

              style:
                  TextStyle(

                fontSize:24,

                fontWeight:
                    FontWeight.bold,

              ),

            ),



            const SizedBox(height:20),



            const Text(

              """
Sukoon Properties respects your privacy.

We collect only the information required to provide better real estate services.

User information such as name, phone number and email address is used for account management, property services and customer support.

We do not sell or misuse personal information.

We take reasonable security measures to protect user data.

By using this application, you agree to this privacy policy.
""",

              style:
                  TextStyle(

                fontSize:16,

                height:1.6,

              ),

            ),


          ],

        ),

      ),

    );

  }

}
