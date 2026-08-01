import 'package:flutter/material.dart';


class BookingScreen extends StatefulWidget {

  const BookingScreen({super.key});


  @override
  State<BookingScreen> createState() =>
      _BookingScreenState();

}



class _BookingScreenState extends State<BookingScreen> {


  final nameController =
      TextEditingController();


  final phoneController =
      TextEditingController();


  String selectedProperty =
      "Sukoon Green Residence";


  final List<String> properties = [

    "Sukoon Green Residence",

    "Sukoon Hill View Resort",

    "Sukoon Coastal Living",

  ];



  void submitBooking() {


    ScaffoldMessenger.of(context)
        .showSnackBar(

      const SnackBar(

        content:
            Text(
              "Site Visit Request Submitted",
            ),

      ),

    );


  }



  @override
  Widget build(BuildContext context) {


    return Scaffold(

      appBar: AppBar(

        title:
            const Text(
              "Book Site Visit",
            ),

      ),


      body: Padding(

        padding:
            const EdgeInsets.all(20),


        child: Column(

          children: [


            TextField(

              controller:
                  nameController,

              decoration:
                  const InputDecoration(

                labelText:
                    "Your Name",

                border:
                    OutlineInputBorder(),

              ),

            ),



            const SizedBox(height:15),



            TextField(

              controller:
                  phoneController,

              keyboardType:
                  TextInputType.phone,


              decoration:
                  const InputDecoration(

                labelText:
                    "Phone Number",

                border:
                    OutlineInputBorder(),

              ),

            ),



            const SizedBox(height:15),



            DropdownButtonFormField<String>(

              value:
                  selectedProperty,


              decoration:
                  const InputDecoration(

                labelText:
                    "Select Property",

                border:
                    OutlineInputBorder(),

              ),


              items:
                  properties.map(

                    (item) => DropdownMenuItem(

                      value:
                          item,

                      child:
                          Text(item),

                    ),

                  ).toList(),


              onChanged:
                  (value) {


                setState(() {

                  selectedProperty =
                      value!;

                });


              },

            ),



            const SizedBox(height:30),



            ElevatedButton(

              onPressed:
                  submitBooking,


              child:
                  const Text(
                    "Submit Request",
                  ),

            ),


          ],

        ),

      ),

    );

  }

}
