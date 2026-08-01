import 'package:flutter/material.dart';


class FaqScreen extends StatelessWidget {

  const FaqScreen({super.key});


  @override
  Widget build(BuildContext context) {


    final faqList = [

      {
        "question":
            "How can I book a property?",

        "answer":
            "You can select your preferred property and submit a booking request."
      },


      {
        "question":
            "Do you provide site visits?",

        "answer":
            "Yes, customers can schedule a site visit through the app."
      },


      {
        "question":
            "What payment options are available?",

        "answer":
            "Bank transfer, mobile banking and card payment options will be available."
      },


      {
        "question":
            "How can I contact Sukoon Properties?",

        "answer":
            "You can contact us through phone, email or WhatsApp."
      },


    ];



    return Scaffold(

      appBar: AppBar(

        title:
            const Text(
              "Frequently Asked Questions",
            ),

      ),



      body: ListView.builder(

        padding:
            const EdgeInsets.all(15),


        itemCount:
            faqList.length,


        itemBuilder:
            (context,index) {


          return Card(

            child:
                ExpansionTile(

              title:
                  Text(

                faqList[index]["question"]!,

                style:
                    const TextStyle(

                  fontWeight:
                      FontWeight.bold,

                ),

              ),


              children: [


                Padding(

                  padding:
                      const EdgeInsets.all(15),


                  child:
                      Text(

                    faqList[index]["answer"]!,

                  ),

                )


              ],

            ),

          );


        },

      ),

    );

  }

}
