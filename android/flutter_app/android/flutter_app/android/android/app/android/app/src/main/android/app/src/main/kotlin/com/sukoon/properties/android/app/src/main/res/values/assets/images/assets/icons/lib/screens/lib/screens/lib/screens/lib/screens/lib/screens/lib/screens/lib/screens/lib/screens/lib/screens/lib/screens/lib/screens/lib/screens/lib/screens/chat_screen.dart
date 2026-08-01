import 'package:flutter/material.dart';


class ChatScreen extends StatefulWidget {

  const ChatScreen({super.key});


  @override
  State<ChatScreen> createState() =>
      _ChatScreenState();

}



class _ChatScreenState
    extends State<ChatScreen> {


  final messageController =
      TextEditingController();


  final List<String> messages = [];



  void sendMessage() {


    if(messageController.text.isNotEmpty) {


      setState(() {

        messages.add(
          messageController.text,
        );


      });


      messageController.clear();


    }


  }



  @override
  Widget build(BuildContext context) {


    return Scaffold(

      appBar: AppBar(

        title:
            const Text(
              "Live Chat",
            ),

      ),



      body: Column(

        children: [


          Expanded(

            child: ListView.builder(

              itemCount:
                  messages.length,


              itemBuilder:
                  (context,index) {


                return Align(

                  alignment:
                      Alignment.centerRight,


                  child: Container(

                    margin:
                        const EdgeInsets.all(8),


                    padding:
                        const EdgeInsets.all(12),


                    decoration:
                        BoxDecoration(

                      color:
                          Colors.green.shade100,


                      borderRadius:
                          BorderRadius.circular(12),

                    ),


                    child:
                        Text(
                          messages[index],
                        ),

                  ),

                );


              },

            ),

          ),



          Padding(

            padding:
                const EdgeInsets.all(10),


            child: Row(

              children: [


                Expanded(

                  child: TextField(

                    controller:
                        messageController,


                    decoration:
                        const InputDecoration(

                      hintText:
                          "Write message...",


                      border:
                          OutlineInputBorder(),

                    ),

                  ),

                ),



                IconButton(

                  onPressed:
                      sendMessage,


                  icon:
                      const Icon(

                    Icons.send,

                    color:
                        Colors.green,

                  ),

                )


              ],

            ),

          )


        ],

      ),

    );

  }

}
