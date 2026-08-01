import 'package:flutter/material.dart';


class FavoritesScreen extends StatelessWidget {

  const FavoritesScreen({super.key});


  @override
  Widget build(BuildContext context) {


    return Scaffold(

      appBar: AppBar(

        title:
            const Text(
              "Favorite Properties",
            ),

      ),



      body: Padding(

        padding:
            const EdgeInsets.all(20),


        child: Column(

          children: [


            const Icon(

              Icons.favorite,

              size:100,

              color:
                  Colors.red,

            ),



            const SizedBox(height:20),



            const Text(

              "Your Saved Properties",

              style:
                  TextStyle(

                fontSize:24,

                fontWeight:
                    FontWeight.bold,

              ),

            ),



            const SizedBox(height:15),



            const Text(

              "You have not saved any property yet.",

              style:
                  TextStyle(

                fontSize:16,

              ),

            ),


            const SizedBox(height:30),



            ElevatedButton(

              onPressed: () {},

              child:
                  const Text(
                    "Explore Properties",
                  ),

            ),


          ],

        ),

      ),

    );

  }

}
