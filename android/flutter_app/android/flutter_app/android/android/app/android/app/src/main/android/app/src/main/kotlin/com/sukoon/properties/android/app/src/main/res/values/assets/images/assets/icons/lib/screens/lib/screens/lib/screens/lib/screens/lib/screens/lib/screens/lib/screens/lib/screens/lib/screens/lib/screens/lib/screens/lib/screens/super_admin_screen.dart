import 'package:flutter/material.dart';


class SuperAdminScreen extends StatelessWidget {

  const SuperAdminScreen({super.key});


  @override
  Widget build(BuildContext context) {


    return Scaffold(

      appBar: AppBar(

        title:
            const Text(
              "Super Admin Panel",
            ),

      ),



      body: ListView(

        padding:
            const EdgeInsets.all(20),


        children: [


          superAdminItem(

            Icons.admin_panel_settings,

            "Manage Admins",

          ),



          superAdminItem(

            Icons.people_alt,

            "Manage Users",

          ),



          superAdminItem(

            Icons.analytics,

            "Reports & Analytics",

          ),



          superAdminItem(

            Icons.storage,

            "Database Management",

          ),



          superAdminItem(

            Icons.security,

            "Security Settings",

          ),



          superAdminItem(

            Icons.settings,

            "System Settings",

          ),


        ],

      ),

    );

  }



  Widget superAdminItem(

      IconData icon,

      String title,

      ) {


    return Card(

      margin:
          const EdgeInsets.only(
            bottom:15,
          ),


      child: ListTile(

        leading:
            Icon(

          icon,

          color:
              Colors.green,

        ),


        title:
            Text(

          title,

          style:
              const TextStyle(

            fontSize:17,

            fontWeight:
                FontWeight.bold,

          ),

        ),


        trailing:
            const Icon(
              Icons.arrow_forward_ios,
            ),


        onTap: () {},

      ),

    );


  }

}
