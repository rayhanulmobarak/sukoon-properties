import 'package:flutter/material.dart';


class BlogScreen extends StatelessWidget {

  const BlogScreen({super.key});


  @override
  Widget build(BuildContext context) {


    final articles = [

      {
        "title":
            "How to Choose Your Dream Home",

        "description":
            "Important tips before buying a property."

      },


      {
        "title":
            "Benefits of Modern Housing",

        "description":
            "Why planned communities are better."

      },


      {
        "title":
            "Real Estate Investment Guide",

        "description":
            "Things to know before investing."

      },

    ];



    return Scaffold(

      appBar: AppBar(

        title:
            const Text(
              "Blog & News",
            ),

      ),



      body: ListView.builder(

        padding:
            const EdgeInsets.all(15),


        itemCount:
            articles.length,


        itemBuilder:
            (context,index) {


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

                    articles[index]["title"]!,

                    style:
                        const TextStyle(

                      fontSize:20,

                      fontWeight:
                          FontWeight.bold,

                    ),

                  ),



                  const SizedBox(height:10),



                  Text(

                    articles[index]["description"]!,

                    style:
                        const TextStyle(

                      fontSize:16,

                    ),

                  ),


                ],

              ),

            ),

          );


        },

      ),

    );

  }

}
