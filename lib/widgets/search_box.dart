import 'package:flutter/material.dart';


class SearchBox extends StatelessWidget {

  final TextEditingController controller;

  final Function(String) onChanged;


  const SearchBox({

    super.key,

    required this.controller,

    required this.onChanged,

  });



  @override
  Widget build(BuildContext context) {


    return TextField(

      controller: controller,

      onChanged: onChanged,


      decoration:
          InputDecoration(

        hintText:
            "Search properties...",


        prefixIcon:
            const Icon(

          Icons.search,

        ),


        filled:
            true,


        fillColor:
            Colors.grey.shade100,


        border:
            OutlineInputBorder(

          borderRadius:
              BorderRadius.circular(15),


          borderSide:
              BorderSide.none,

        ),

      ),

    );


  }

}
