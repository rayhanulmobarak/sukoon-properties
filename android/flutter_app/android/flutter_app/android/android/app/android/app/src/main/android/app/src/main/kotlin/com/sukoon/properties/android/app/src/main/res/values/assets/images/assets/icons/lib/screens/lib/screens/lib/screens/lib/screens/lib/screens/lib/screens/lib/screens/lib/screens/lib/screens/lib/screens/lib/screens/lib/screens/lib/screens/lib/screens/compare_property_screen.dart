import 'package:flutter/material.dart';


class ComparePropertyScreen extends StatelessWidget {

  const ComparePropertyScreen({super.key});


  @override
  Widget build(BuildContext context) {


    return Scaffold(

      appBar: AppBar(

        title:
            const Text(
              "Compare Properties",
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

              "Property Comparison",

              style:
                  TextStyle(

                fontSize:24,

                fontWeight:
                    FontWeight.bold,

              ),

            ),



            const SizedBox(height:20),



            comparisonCard(

              "Sukoon Green Residence",

              "৳ 50,00,000",

              "1200 sq ft",

              "3 Bedroom",

            ),



            comparisonCard(

              "Sukoon Hill View",

              "৳ 65,00,000",

              "1500 sq ft",

              "4 Bedroom",

            ),



            comparisonCard(

              "Sukoon Premium Villa",

              "৳ 90,00,000",

              "2200 sq ft",

              "5 Bedroom",

            ),


          ],

        ),

      ),

    );

  }



  Widget comparisonCard(

      String name,

      String price,

      String area,

      String room,

      ) {


    return Card(

      elevation:4,


      margin:
          const EdgeInsets.only(
            bottom:15,
          ),


      child: Padding(

        padding:
            const EdgeInsets.all(15),


        child: Column(

          crossAxisAlignment:
              CrossAxisAlignment.start,


          children: [


            Text(

              name,

              style:
                  const TextStyle(

                fontSize:20,

                fontWeight:
                    FontWeight.bold,

              ),

            ),


            const SizedBox(height:8),


            Text("Price: $price"),

            Text("Area: $area"),

            Text("Rooms: $room"),


          ],

        ),

      ),

    );

  }

}
