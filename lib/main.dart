import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:raraapp/components/app/app_initializer.dart';
import 'package:raraapp/hooks/providers.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: hookProviders(),
      child: MaterialApp(
        title: 'Rara App',
        debugShowCheckedModeBanner: false,
        theme: ThemeData(
          colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
          useMaterial3: true,
        ),
        home: const AppInitializer(),
      ),
    );
  }
}
