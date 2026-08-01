import 'package:flutter/material.dart';


class ForgotPasswordScreen extends StatefulWidget {

  const ForgotPasswordScreen({super.key});


  @override
  State<ForgotPasswordScreen> createState() =>
      _ForgotPasswordScreenState();

}



class _ForgotPasswordScreenState
    extends State<ForgotPasswordScreen> {


  final emailController =
      TextEditingController();



  void resetPassword() {


    ScaffoldMessenger.of(context)
        .showSnackBar(

      const SnackBar(

        content:
            Text(
              "Password reset link sent",
            ),

      ),

    );


  }



  @override
  Widget build(BuildContext context) {


    return Scaffold(

      appBar:
          AppBar(

        title:
            const Text(
              "Forgot Password",
            ),

      ),



      body:
          Padding(

        padding:
            const EdgeInsets.all(20),


        child:
            Column(

          children: [


            const Icon(

              Icons.lock_reset,

              size:80,

              color:
                  Colors.green,

            ),



            const SizedBox(height:25),



            TextField(

              controller:
                  emailController,


              keyboardType:
                  TextInputType.emailAddress,


              decoration:
                  const InputDecoration(

                labelText:
                    "Enter Email Address",

                border:
                    OutlineInputBorder(),

              ),

            ),



            const SizedBox(height:30),



            SizedBox(

              width:
                  double.infinity,


              child:
                  ElevatedButton(

                onPressed:
                    resetPassword,


                child:
                    const Text(
                      "Reset Password",
                    ),

              ),

            )


          ],

        ),

      ),

    );

  }

}
