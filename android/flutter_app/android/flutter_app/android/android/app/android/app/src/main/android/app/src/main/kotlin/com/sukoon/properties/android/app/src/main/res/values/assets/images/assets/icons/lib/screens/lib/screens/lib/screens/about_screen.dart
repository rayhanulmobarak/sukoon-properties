import 'package:flutter/material.dart';


class AboutScreen extends StatelessWidget {

  const AboutScreen({super.key});


  @override
  Widget build(BuildContext context) {

    return Scaffold(

      appBar: AppBar(

        title: const Text(
          "About Sukoon Properties",
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

              "Sukoon Properties Ltd.",

              style: TextStyle(

                fontSize:28,

                fontWeight:
                    FontWeight.bold,

              ),

            ),



            const SizedBox(height:15),



            const Text(

              "Sukoon Properties is a modern real estate company dedicated to providing safe, comfortable and trusted housing solutions for families.",

              style: TextStyle(

                fontSize:16,

                height:1.6,

              ),

            ),



            const SizedBox(height:30),



            Card(

              child: Padding(

                padding:
                    EdgeInsets.all(16),

                child: Column(

                  crossAxisAlignment:
                      CrossAxisAlignment.start,


                  children: const [


                    Text(

                      "Our Mission",

                      style: TextStyle(

                        fontSize:22,

                        fontWeight:
                            FontWeight.bold,

                      ),

                    ),


                    SizedBox(height:10),


                    Text(

                      "To create secure and peaceful communities where families can live with comfort and confidence.",

                    ),

                  ],

                ),

              ),

            ),



            const SizedBox(height:15),



            Card(

              child: Padding(

                padding:
                    EdgeInsets.all(16),

                child: Column(

                  crossAxisAlignment:
                      CrossAxisAlignment.start,


                  children: const [


                    Text(

                      "Our Vision",

                      style: TextStyle(

                        fontSize:22,

                        fontWeight:
                            FontWeight.bold,

                      ),

                    ),


                    SizedBox(height:10),


                    Text(

                      "To become a trusted real estate brand known for quality, honesty and customer satisfaction.",

                    ),

                  ],

                ),

              ),

            ),



            const SizedBox(height:15),



            Card(

              child: Padding(

                padding:
                    EdgeInsets.all(16),

                child: Column(

                  crossAxisAlignment:
                      CrossAxisAlignment.start,


                  children: const [


                    Text(

                      "Why Choose Us?",

                      style: TextStyle(

                        fontSize:22,

                        fontWeight:
                            FontWeight.bold,

                      ),

                    ),


                    SizedBox(height:10),


                    Text(

                      "✓ Trusted Service\n✓ Quality Housing\n✓ Secure Environment\n✓ Modern Design",

                      style:
                          TextStyle(

                        fontSize:16,

                      ),

                    ),

                  ],

                ),

              ),

            ),


          ],

        ),

      ),

    );

  }

}
