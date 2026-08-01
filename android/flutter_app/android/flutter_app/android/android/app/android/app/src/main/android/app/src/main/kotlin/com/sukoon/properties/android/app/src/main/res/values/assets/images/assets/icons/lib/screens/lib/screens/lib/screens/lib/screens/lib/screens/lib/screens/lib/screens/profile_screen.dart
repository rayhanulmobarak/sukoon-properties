import 'package:flutter/material.dart';


class ProfileScreen extends StatelessWidget {

  const ProfileScreen({super.key});


  @override
  Widget build(BuildContext context) {


    return Scaffold(

      appBar: AppBar(

        title:
            const Text(
              "My Profile",
            ),

      ),



      body: Padding(

        padding:
            const EdgeInsets.all(20),


        child: Column(

          crossAxisAlignment:
              CrossAxisAlignment.center,


          children: [


            const CircleAvatar(

              radius: 50,

              backgroundColor:
                  Colors.green,

              child:
                  Icon(

                Icons.person,

                size:60,

                color:
                    Colors.white,

              ),

            ),



            const SizedBox(height:20),



            const Text(

              "User Name",

              style:
                  TextStyle(

                fontSize:24,

                fontWeight:
                    FontWeight.bold,

              ),

            ),



            const SizedBox(height:10),



            const Text(

              "user@email.com",

              style:
                  TextStyle(

                fontSize:16,

              ),

            ),



            const SizedBox(height:30),



            Card(

              child:
                  ListTile(

                leading:
                    const Icon(
                      Icons.favorite,
                      color: Colors.red,
                    ),

                title:
                    const Text(
                      "Saved Properties",
                    ),

                trailing:
                    const Icon(
                      Icons.arrow_forward_ios,
                    ),

              ),

            ),



            Card(

              child:
                  ListTile(

                leading:
                    const Icon(
                      Icons.history,
                      color: Colors.green,
                    ),

                title:
                    const Text(
                      "Booking History",
                    ),

                trailing:
                    const Icon(
                      Icons.arrow_forward_ios,
                    ),

              ),

            ),



            Card(

              child:
                  ListTile(

                leading:
                    const Icon(
                      Icons.settings,
                    ),

                title:
                    const Text(
                      "Account Settings",
                    ),

                trailing:
                    const Icon(
                      Icons.arrow_forward_ios,
                    ),

              ),

            ),


          ],

        ),

      ),

    );

  }

}
