import 'package:flutter/material.dart';

void main() {
  runApp(const SukoonPropertiesApp());
}

class SukoonPropertiesApp extends StatelessWidget {
  const SukoonPropertiesApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Sukoon Properties',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        primarySwatch: Colors.green,
        useMaterial3: true,
      ),
      home: const HomePage(),
    );
  }
}

class HomePage extends StatelessWidget {
  const HomePage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text(
          'Sukoon Properties',
        ),
        backgroundColor: Colors.green,
        foregroundColor: Colors.white,
      ),

      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [

            const Icon(
              Icons.home_work,
              size: 90,
              color: Colors.green,
            ),

            const SizedBox(height: 20),

            const Text(
              'Welcome to Sukoon Properties',
              style: TextStyle(
                fontSize: 24,
                fontWeight: FontWeight.bold,
              ),
            ),

            const SizedBox(height: 10),

            const Text(
              'Safe • Trusted • Modern Housing',
              style: TextStyle(
                fontSize: 16,
              ),
            ),

            const SizedBox(height: 30),

            ElevatedButton(
              onPressed: () {},
              child: const Text(
                'View Properties',
              ),
            ),
          ],
        ),
      ),
    );
  }
}
