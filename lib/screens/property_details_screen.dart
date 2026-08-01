import 'package:flutter/material.dart';
import '../models/property.dart';


class PropertyDetailsScreen extends StatelessWidget {

  final Property property;


  const PropertyDetailsScreen({

    super.key,

    required this.property,

  });



  @override
  Widget build(BuildContext context) {

    return Scaffold(

      appBar: AppBar(

        title: Text(
          property.name,
        ),

      ),


      body: SingleChildScrollView(

        padding:
            const EdgeInsets.all(16),


        child: Column(

          crossAxisAlignment:
              CrossAxisAlignment.start,


          children: [


            Container(

              height: 220,

              width: double.infinity,

              decoration:
                  BoxDecoration(

                color:
                    Colors.green.shade100,

                borderRadius:
                    BorderRadius.circular(15),

              ),


              child: const Icon(

                Icons.home_work,

                size: 100,

                color:
                    Colors.green,

              ),

            ),



            const SizedBox(height: 20),



            Text(

              property.name,

              style:
                  const TextStyle(

                fontSize: 26,

                fontWeight:
                    FontWeight.bold,

              ),

            ),



            const SizedBox(height: 10),



            Text(

              "Location: ${property.location}",

              style:
                  const TextStyle(

                fontSize: 16,

              ),

            ),



            const SizedBox(height: 8),



            Text(

              "Price: ${property.price}",

              style:
                  const TextStyle(

                fontSize: 18,

                color:
                    Colors.green,

                fontWeight:
                    FontWeight.bold,

              ),

            ),



            const SizedBox(height: 8),



            Text(

              "Area: ${property.area}",

            ),



            const SizedBox(height: 8),



            Text(

              "Type: ${property.type}",

            ),



            const SizedBox(height: 20),



            const Text(

              "Description",

              style:
                  TextStyle(

                fontSize: 22,

                fontWeight:
                    FontWeight.bold,

              ),

            ),



            const SizedBox(height: 8),



            Text(

              property.description,

              style:
                  const TextStyle(

                fontSize: 16,

              ),

            ),



            const SizedBox(height: 20),



            const Text(

              "Facilities",

              style:
                  TextStyle(

                fontSize: 22,

                fontWeight:
                    FontWeight.bold,

              ),

            ),



            const SizedBox(height: 10),



            ...property.facilities.map(

              (item) => ListTile(

                leading:
                    const Icon(

                  Icons.check_circle,

                  color:
                      Colors.green,

                ),

                title:
                    Text(item),

              ),

            ),


          ],

        ),

      ),

    );

  }

}
