import 'package:flutter/material.dart';


class PaymentScreen extends StatefulWidget {

  const PaymentScreen({super.key});


  @override
  State<PaymentScreen> createState() =>
      _PaymentScreenState();

}



class _PaymentScreenState
    extends State<PaymentScreen> {


  String selectedMethod =
      "Bank Transfer";


  final methods = [

    "Bank Transfer",

    "Mobile Banking",

    "Card Payment",

  ];



  void makePayment() {


    ScaffoldMessenger.of(context)
        .showSnackBar(

      const SnackBar(

        content:
            Text(
              "Payment Request Submitted",
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
              "Payment",
            ),

      ),


      body: Padding(

        padding:
            const EdgeInsets.all(20),


        child: Column(

          crossAxisAlignment:
              CrossAxisAlignment.start,


          children: [


            const Text(

              "Select Payment Method",

              style:
                  TextStyle(

                fontSize:22,

                fontWeight:
                    FontWeight.bold,

              ),

            ),



            const SizedBox(height:20),



            DropdownButtonFormField<String>(

              value:
                  selectedMethod,


              decoration:
                  const InputDecoration(

                border:
                    OutlineInputBorder(),

              ),


              items:
                  methods.map(

                    (method) => DropdownMenuItem(

                      value:
                          method,

                      child:
                          Text(method),

                    ),

                  ).toList(),


              onChanged:
                  (value) {


                setState(() {

                  selectedMethod =
                      value!;

                });


              },

            ),



            const SizedBox(height:30),



            const Card(

              child:
                  Padding(

                padding:
                    EdgeInsets.all(15),

                child:
                    Text(

                  "Booking Amount: ৳ 50,000",

                  style:
                      TextStyle(

                    fontSize:18,

                    fontWeight:
                        FontWeight.bold,

                  ),

                ),

              ),

            ),



            const SizedBox(height:30),



            SizedBox(

              width:
                  double.infinity,


              child: ElevatedButton(

                onPressed:
