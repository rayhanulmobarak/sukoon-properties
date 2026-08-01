import 'package:flutter/material.dart';


class DirectorScreen extends StatelessWidget {

  const DirectorScreen({super.key});


  @override
  Widget build(BuildContext context) {

    return Scaffold(

      appBar: AppBar(

        title: const Text(
          "Director Profile",
        ),

      ),


      body: SingleChildScrollView(

        padding:
            const EdgeInsets.all(20),


        child: Column(

          crossAxisAlignment:
              CrossAxisAlignment.center,


          children: [


            const CircleAvatar(

              radius: 60,

              backgroundColor:
                  Colors.green,

              child: Icon(

                Icons.person,

                size: 70,

                color:
                    Colors.white,

              ),

            ),



            const SizedBox(height: 20),



            const Text(

              "Rayhanul Mobarak",

              style:
                  TextStyle(

                fontSize: 26,

                fontWeight:
                    FontWeight.bold,

              ),

            ),



            const SizedBox(height: 8),



            const Text(

              "Director - Sukoon Properties Ltd.",

              style:
                  TextStyle(

                fontSize: 16,

                color:
                    Colors.green,

              ),

            ),



            const SizedBox(height: 30),



            Card(

              child: Padding(

                padding:
                    const EdgeInsets.all(16),

                child: Column(

                  crossAxisAlignment:
                      CrossAxisAlignment.start,

                  children: const [


                    Text(

                      "Mission",

                      style:
                          TextStyle(

                        fontSize: 22,

                        fontWeight:
                            FontWeight.bold,

                      ),

                    ),


                    SizedBox(height: 10),


                    Text(

                      "Providing safe, comfortable and trusted housing solutions for families.",

                      style:
                          TextStyle(

                        fontSize: 16,

                      ),

                    ),

                  ],

                ),

              ),

            ),



            const SizedBox(height: 15),



            Card(

              child: Padding(

                padding:
                    const EdgeInsets.all(16),

                child: Column(

                  crossAxisAlignment:
                      CrossAxisAlignment.start,

                  children: const [


                    Text(

                      "Vision",

                      style:
                          TextStyle(

                        fontSize: 22,

                        fontWeight:
                            FontWeight.bold,

                      ),

                    ),


                    SizedBox(height: 10),


                    Text(

                      "To become a trusted real estate brand creating peaceful communities.",

                    ),

                  ],

                ),

              ),

            ),



            const SizedBox(height: 15),



            Card(

              child: Padding(

                padding:
                    const EdgeInsets.all(16),

                child: Column(

                  crossAxisAlignment:
                      CrossAxisAlignment.start,

                  children: const [


                    Text(

                      "Core Values",

                      style:
                          TextStyle(

                        fontSize: 22,

                        fontWeight:
                            FontWeight.bold,

                      ),

                    ),


                    SizedBox(height: 10),


                    Text(

                      "• Trust\n• Quality\n• Security\n• Customer Satisfaction",

                      style:
                          TextStyle(

                        fontSize: 16,

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
