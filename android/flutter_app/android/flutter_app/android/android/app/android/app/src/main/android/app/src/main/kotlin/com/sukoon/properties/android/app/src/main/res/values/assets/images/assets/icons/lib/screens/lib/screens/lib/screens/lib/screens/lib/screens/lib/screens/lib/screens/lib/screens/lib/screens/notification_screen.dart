import 'package:flutter/material.dart';


class NotificationScreen extends StatelessWidget {

  const NotificationScreen({super.key});


  @override
  Widget build(BuildContext context) {


    return Scaffold(

      appBar: AppBar(

        title:
            const Text(
              "Notifications",
            ),

      ),


      body: ListView(

        padding:
            const EdgeInsets.all(15),


        children: [


          Card(

            child: ListTile(

              leading:
                  const Icon(

                Icons.home,

                color:
                    Colors.green,

              ),


              title:
                  const Text(
                    "New Property Added",
                  ),


              subtitle:
                  const Text(
                    "A new housing project is available.",
                  ),


            ),

          ),



          Card(

            child: ListTile(

              leading:
                  const Icon(

                Icons.event_available,

                color:
                    Colors.blue,

              ),


              title:
                  const Text(
                    "Site Visit Update",
                  ),


              subtitle:
                  const Text(
                    "Your booking request is being processed.",
                  ),

            ),

          ),



          Card(

            child: ListTile(

              leading:
                  const Icon(

                Icons.campaign,

                color:
                    Colors.orange,

              ),


              title:
                  const Text(
                    "Sukoon Properties Announcement",
                  ),


              subtitle:
                  const Text(
                    "Latest company news and offers.",
                  ),

            ),

          ),


        ],

      ),

    );

  }

}
