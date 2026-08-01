import 'package:flutter/material.dart';


class AdminScreen extends StatelessWidget {

  const AdminScreen({super.key});


  @override
  Widget build(BuildContext context) {


    return Scaffold(

      appBar: AppBar(

        title:
            const Text(
              "Admin Panel",
            ),

      ),



      body: GridView.count(

        padding:
            const EdgeInsets.all(20),


        crossAxisCount: 2,


        crossAxisSpacing: 15,


        mainAxisSpacing: 15,


        children: [


          adminCard(

            icon: Icons.home_work,

            title: "Properties",

          ),



          adminCard(

            icon: Icons.add_home,

            title: "Add Property",

          ),



          adminCard(

            icon: Icons.book_online,

            title: "Bookings",

          ),



          adminCard(

            icon: Icons.people,

            title: "Customers",

          ),



          adminCard(

            icon: Icons.message,

            title: "Messages",

          ),



          adminCard(

            icon: Icons.settings,

            title: "Admin Settings",

          ),


        ],

      ),

    );

  }



  Widget adminCard({

    required IconData icon,

    required String title,

  }) {


    return Card(

      elevation: 4,


      child: InkWell(

        onTap: () {},


        child: Column(

          mainAxisAlignment:
              MainAxisAlignment.center,


          children: [


            Icon(

              icon,

              size:50,

              color:
                  Colors.green,

            ),



            const SizedBox(height:15),



            Text(

              title,

              style:
                  const TextStyle(

                fontWeight:
                    FontWeight.bold,

              ),

            ),


          ],

        ),

      ),

    );


  }

}
