import 'package:flutter/material.dart';


class LoginScreen extends StatefulWidget {

  const LoginScreen({super.key});


  @override
  State<LoginScreen> createState() =>
      _LoginScreenState();

}



class _LoginScreenState extends State<LoginScreen> {


  final emailController =
      TextEditingController();


  final passwordController =
      TextEditingController();



  void login() {

    ScaffoldMessenger.of(context)
        .showSnackBar(

      const SnackBar(

        content:
            Text(
              "Login Successful",
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
              "Login",
            ),

      ),



      body: Padding(

        padding:
            const EdgeInsets.all(20),


        child: Column(

          children: [


            TextField(

              controller:
                  emailController,


              keyboardType:
                  TextInputType.emailAddress,


              decoration:
                  const InputDecoration(

                labelText:
                    "Email Address",

                border:
                    OutlineInputBorder(),

              ),

            ),



            const SizedBox(height:15),



            TextField(

              controller:
                  passwordController,


              obscureText:
                  true,


              decoration:
                  const InputDecoration(

                labelText:
                    "Password",

                border:
                    OutlineInputBorder(),

              ),

            ),



            const SizedBox(height:30),



            SizedBox(

              width:
                  double.infinity,


              child: ElevatedButton(

                onPressed:
                    login,


                child:
                    const Text(
                      "Login",
                    ),

              ),

            ),


          ],

        ),

      ),

    );

  }

}
