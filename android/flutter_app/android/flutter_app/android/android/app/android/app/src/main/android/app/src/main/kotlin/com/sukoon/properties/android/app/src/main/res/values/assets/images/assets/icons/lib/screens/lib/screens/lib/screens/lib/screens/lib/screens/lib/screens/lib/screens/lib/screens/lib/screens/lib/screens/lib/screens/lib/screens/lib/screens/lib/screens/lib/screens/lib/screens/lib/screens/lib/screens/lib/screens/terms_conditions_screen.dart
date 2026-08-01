import 'package:flutter/material.dart';


class TermsConditionsScreen extends StatelessWidget {

  const TermsConditionsScreen({super.key});


  @override
  Widget build(BuildContext context) {


    return Scaffold(

      appBar: AppBar(

        title:
            const Text(
              "Terms & Conditions",
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

              "Sukoon Properties Terms & Conditions",

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
Welcome to Sukoon Properties.

By using this application, you agree to follow these terms and conditions.

1. Property information is provided for customer guidance.

2. Customers should verify all property details before final purchase.

3. Booking requests are subject to company approval.

4. Payment transactions must follow official payment procedures.

5. Users must provide accurate personal information.

6. Sukoon Properties reserves the right to update services and policies.

Thank you for choosing Sukoon Properties.
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
