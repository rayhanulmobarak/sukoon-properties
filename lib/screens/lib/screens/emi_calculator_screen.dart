import 'package:flutter/material.dart';


class EmiCalculatorScreen extends StatefulWidget {

  const EmiCalculatorScreen({super.key});


  @override
  State<EmiCalculatorScreen> createState() =>
      _EmiCalculatorScreenState();

}



class _EmiCalculatorScreenState
    extends State<EmiCalculatorScreen> {


  final loanController =
      TextEditingController();


  final rateController =
      TextEditingController();


  final yearController =
      TextEditingController();


  double emi = 0;



  void calculateEMI() {


    double principal =
        double.tryParse(
          loanController.text,
        ) ??
        0;


    double annualRate =
        double.tryParse(
          rateController.text,
        ) ??
        0;


    double years =
        double.tryParse(
          yearController.text,
        ) ??
        0;



    double monthlyRate =
        annualRate / 12 / 100;


    double months =
        years * 12;



    if (principal > 0 &&
        monthlyRate > 0 &&
        months > 0) {


      emi =
          (principal *
              monthlyRate *
              (1 + monthlyRate) ^
              months) /
          (((1 + monthlyRate) ^
              months) -
              1);


    } else {

      emi = 0;

    }


    setState(() {});


  }



  @override
  Widget build(BuildContext context) {


    return Scaffold(


      appBar: AppBar(

        title:
            const Text(
              "EMI Calculator",
            ),

      ),


      body: Padding(

        padding:
            const EdgeInsets.all(20),


        child: Column(

          children: [


            TextField(

              controller:
                  loanController,

              keyboardType:
                  TextInputType.number,

              decoration:
                  const InputDecoration(

                labelText:
                    "Loan Amount",

                border:
                    OutlineInputBorder(),

              ),

            ),



            const SizedBox(height:15),



            TextField(

              controller:
                  rateController,

              keyboardType:
                  TextInputType.number,

              decoration:
                  const InputDecoration(

                labelText:
                    "Interest Rate (%)",

                border:
                    OutlineInputBorder(),

              ),

            ),



            const SizedBox(height:15),



            TextField(

              controller:
                  yearController,

              keyboardType:
                  TextInputType.number,

              decoration:
                  const InputDecoration(

                labelText:
                    "Years",

                border:
                    OutlineInputBorder(),

              ),

            ),



            const SizedBox(height:25),



            ElevatedButton(

              onPressed:
                  calculateEMI,

              child:
                  const Text(
                    "Calculate",
                  ),

            ),



            const SizedBox(height:25),



            Text(

              "Monthly EMI: ${emi.toStringAsFixed(2)} BDT",

              style:
                  const TextStyle(

                fontSize:20,

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
