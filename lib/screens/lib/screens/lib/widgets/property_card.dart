import 'package:flutter/material.dart';
import '../models/property.dart';


class PropertyCard extends StatelessWidget {

  final Property property;


  const PropertyCard({

    super.key,

    required this.property,

  });



  @override
  Widget build(BuildContext context) {


    return Card(

      elevation: 4,

      margin:
          const EdgeInsets.only(
            bottom: 15,
          ),


      shape:
          RoundedRectangleBorder(

        borderRadius:
            BorderRadius.circular(15),

      ),


      child: Padding(

        padding:
            const EdgeInsets.all(15),


        child: Column(

          crossAxisAlignment:
              CrossAxisAlignment.start,


          children: [


            Container(

              height: 160,

              width: double.infinity,


              decoration:
                  BoxDecoration(

                color:
                    Colors.green.shade100,

                borderRadius:
                    BorderRadius.circular(12),

              ),


              child: const Icon(

                Icons.home,

                size:70,

                color:
                    Colors.green,

              ),

            ),



            const SizedBox(height:15),



            Text(

              property.name,

              style:
                  const TextStyle(

                fontSize:20,

                fontWeight:
                    FontWeight.bold,

              ),

            ),



            const SizedBox(height:8),



            Text(

              property.location,

            ),



            const SizedBox(height:8),



            Text(

              property.price,

              style:
                  const TextStyle(

                color:
                    Colors.green,

                fontWeight:
                    FontWeight.bold,

                fontSize:18,

              ),

            ),



            const SizedBox(height:8),



            Text(

              property.area,

            ),


          ],

        ),

      ),

    );


  }

}
