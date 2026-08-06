import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:raraapp/controllers/church_controller.dart';
import 'package:raraapp/controllers/user_controller.dart';
import 'package:raraapp/controllers/midialocal_controller.dart';
import 'package:raraapp/controllers/lesson_controller.dart';
import 'package:raraapp/controllers/lesson_progress_controller.dart';
import 'package:raraapp/controllers/cura_controller.dart';
import 'package:raraapp/controllers/christian_group_controller.dart';
import 'package:raraapp/screens/welcome_screen.dart';
import 'package:raraapp/screens/authenticated_app.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [
        // User Controller - Gerencia autenticação e dados do usuário
        ChangeNotifierProvider(create: (_) => UserController()),
        
        // Church Controller - Gerencia dados de igrejas
        ChangeNotifierProvider(create: (_) => ChurchController()),
        
        // Midia Local Controller - Gerencia Midias das igrejas
        ChangeNotifierProvider(create: (_) => MidiaLocalController()),

        // Lesson Controller - Gerencia lições
        ChangeNotifierProvider(create: (_) => LessonController()),

        // Lesson Progress Controller - Gerencia progresso de lições
        ChangeNotifierProvider(create: (_) => LessonProgressController()),

        // Cura Controller - Gerencia pedidos de cura pastoral
        ChangeNotifierProvider(create: (_) => CuraController()),

        // Christian Group Controller - Gerencia grupos cristãos
        ChangeNotifierProvider(create: (_) => ChristianGroupController()),

        // ChangeNotifierProvider(create: (_) => LessonController()),
        // ChangeNotifierProvider(create: (_) => CuraController()),
      ],
      child: MaterialApp(
        title: 'Rara App',
        theme: ThemeData(
          colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
          useMaterial3: true,
        ),
        // TELA DE ENTRADA: Verifica auto-login
        home: const AppInitializer(),
      ),
    );
  }
}

/// Widget que verifica se há dados salvos e faz auto-login
class AppInitializer extends StatefulWidget {
  const AppInitializer({super.key});

  @override
  State<AppInitializer> createState() => _AppInitializerState();
}

class _AppInitializerState extends State<AppInitializer> {
  late Future<bool> _checkLoginFuture;

  @override
  void initState() {
    super.initState();
    _checkLoginFuture = _checkSavedLogin();
  }

  Future<bool> _checkSavedLogin() async {
    try {
      final userController = context.read<UserController>();
      // Tenta carregar dados salvos
      final isLoaded = await userController.loadUserFromStorage();
      return isLoaded;
    } catch (e) {
      print('Erro ao verificar login salvo: $e');
      return false;
    }
  }

  @override
  Widget build(BuildContext context) {
    return FutureBuilder<bool>(
      future: _checkLoginFuture,
      builder: (context, snapshot) {
        if (snapshot.connectionState == ConnectionState.waiting) {
          // Mostra splash screen enquanto verifica
          return Scaffold(
            body: Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  const Icon(Icons.church, size: 64, color: Colors.blue),
                  const SizedBox(height: 16),
                  const Text(
                    'Rara App',
                    style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
                  ),
                  const SizedBox(height: 32),
                  CircularProgressIndicator(),
                ],
              ),
            ),
          );
        }

        if (snapshot.hasError) {
          // Se houver erro, vai para Welcome
          return const WelcomeScreen();
        }

        // Se tem dados salvos e carregou, vai para AuthenticatedApp
        if (snapshot.data == true) {
          return const AuthenticatedApp();
        }

        // Caso contrário, vai para Welcome
        return const WelcomeScreen();
      },
    );
  }
}

class MyHomePage extends StatefulWidget {
  const MyHomePage({super.key, required this.title});

  // This widget is the home page of your application. It is stateful, meaning
  // that it has a State object (defined below) that contains fields that affect
  // how it looks.

  // This class is the configuration for the state. It holds the values (in this
  // case the title) provided by the parent (in this case the App widget) and
  // used by the build method of the State. Fields in a Widget subclass are
  // always marked "final".

  final String title;

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  int _counter = 0;

  void _incrementCounter() {
    setState(() {
      // This call to setState tells the Flutter framework that something has
      // changed in this State, which causes it to rerun the build method below
      // so that the display can reflect the updated values. If we changed
      // _counter without calling setState(), then the build method would not be
      // called again, and so nothing would appear to happen.
      _counter++;
    });
  }

  @override
  Widget build(BuildContext context) {
    // This method is rerun every time setState is called, for instance as done
    // by the _incrementCounter method above.
    //
    // The Flutter framework has been optimized to make rerunning build methods
    // fast, so that you can just rebuild anything that needs updating rather
    // than having to individually change instances of widgets.
    return Scaffold(
      appBar: AppBar(
        // TRY THIS: Try changing the color here to a specific color (to
        // Colors.amber, perhaps?) and trigger a hot reload to see the AppBar
        // change color while the other colors stay the same.
        backgroundColor: Theme.of(context).colorScheme.inversePrimary,
        // Here we take the value from the MyHomePage object that was created by
        // the App.build method, and use it to set our appbar title.
        title: Text(widget.title),
      ),
      body: Center(
        // Center is a layout widget. It takes a single child and positions it
        // in the middle of the parent.
        child: Column(
          // Column is also a layout widget. It takes a list of children and
          // arranges them vertically. By default, it sizes itself to fit its
          // children horizontally, and tries to be as tall as its parent.
          //
          // Column has various properties to control how it sizes itself and
          // how it positions its children. Here we use mainAxisAlignment to
          // center the children vertically; the main axis here is the vertical
          // axis because Columns are vertical (the cross axis would be
          // horizontal).
          //
          // TRY THIS: Invoke "debug painting" (choose the "Toggle Debug Paint"
          // action in the IDE, or press "p" in the console), to see the
          // wireframe for each widget.
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const Text('You have pushed the button this many times:'),
            Text(
              '$_counter',
              style: Theme.of(context).textTheme.headlineMedium,
            ),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: _incrementCounter,
        tooltip: 'Increment',
        child: const Icon(Icons.add),
      ),
    );
  }
}
