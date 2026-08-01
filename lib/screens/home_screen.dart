import 'package:flutter/material.dart';
import '../data/property_data.dart';
import '../models/property.dart';


class HomeScreen extends StatelessWidget {

  const HomeScreen({super.key});


  @override
  Widget build(BuildContext context) {

    List<Property> properties =
        PropertyData.properties;


    return Scaffold(

      appBar: AppBar(

        title: const Text(
          "Sukoon Properties",
        ),

      ),


      body: SingleChildScrollView(

        padding:
            const EdgeInsets.all(16),


        child: Column(

          crossAxisAlignment:
              CrossAxisAlignment.start,


          children: [


            const Text(

              "Find Your Dream Home",

              style: TextStyle(

                fontSize: 28,

                fontWeight:
                    FontWeight.bold,

              ),

            ),


            const SizedBox(height: 10),


            const Text(

              "Safe, trusted and modern housing solutions",

              style: TextStyle(

                fontSize: 16,

              ),

            ),



            const SizedBox(height: 25),



            const Text(

              "Featured Properties",

              style: TextStyle(

                fontSize: 22,

                fontWeight:
                    FontWeight.bold,

              ),

            ),



            const SizedBox(height: 15),



            ListView.builder(

              shrinkWrap: true,

              physics:
                  const NeverScrollableScrollPhysics(),


              itemCount:
                  properties.length,


              itemBuilder:
                  (context, index) {


                Property property =
                    properties[index];


                return Card(

                  margin:
                      const EdgeInsets.only(
                        bottom: 15,
                      ),


                  child: ListTile(


                    leading:
                        const Icon(

                      Icons.home,

                      color:
                          Colors.green,

                    ),



                    title:
                        Text(

                      property.name,

                      style:
                          const TextStyle(

                        fontWeight:
                            FontWeight.bold,

                      ),

                    ),



                    subtitle:
                        Text(

                      "${property.location}\n${property.price}",

                    ),



                    trailing:
                        const Icon(

                      Icons.arrow_forward_ios,

                    ),


                  ),

                );


              },

            ),


          ],

        ),

      ),

    );

  }

}
