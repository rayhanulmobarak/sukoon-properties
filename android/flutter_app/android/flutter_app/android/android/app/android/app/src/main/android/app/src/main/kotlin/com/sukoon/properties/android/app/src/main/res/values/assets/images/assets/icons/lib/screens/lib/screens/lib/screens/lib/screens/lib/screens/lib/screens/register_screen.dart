import 'package:flutter/material.dart';


class RegisterScreen extends StatefulWidget {

  const RegisterScreen({super.key});


  @override
  State<RegisterScreen> createState() =>
      _RegisterScreenState();

}



class _RegisterScreenState
    extends State<RegisterScreen> {


  final nameController =
      TextEditingController();


  final emailController =
      TextEditingController();


  final phoneController =
      TextEditingController();


  final passwordController =
      TextEditingController();



  void register() {


    ScaffoldMessenger.of(context)
        .showSnackBar(

      const SnackBar(

        content:
            Text(
              "Account Created Successfully",
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
              "Create Account",
            ),

      ),


      body: SingleChildScrollView(

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
                    "Full Name",

                border:
                    OutlineInputBorder(),

              ),

            ),



            const SizedBox(height:15),



            TextField(

              controller:
                  emailController,


              keyboardType:
                  TextInputType.emailAddress,


              decoration:
                  const InputDecoration(

                labelText:
                    "Email",

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
                    register,


                child:
                    const Text(
                      "Register",
                    ),

              ),

            ),


          ],

        ),

      ),

    );

  }

}
