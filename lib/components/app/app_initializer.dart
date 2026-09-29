import 'package:flutter/material.dart';
import 'package:raraapp/components/app/authenticated_app.dart';
import 'package:raraapp/components/app/welcome_page.dart';
import 'package:raraapp/hooks/use_auth.dart';

/// Splash: recupera a sessão salva e decide a primeira tela.
class AppInitializer extends StatefulWidget {
  const AppInitializer({super.key});

  @override
  State<AppInitializer> createState() => _AppInitializerState();
}

class _AppInitializerState extends State<AppInitializer> {
  late final Future<bool> _restore = useAuth(context, listen: false).restore();

  @override
  Widget build(BuildContext context) {
    return FutureBuilder<bool>(
      future: _restore,
      builder: (context, snapshot) {
        if (snapshot.connectionState != ConnectionState.done) {
          return const Scaffold(
            body: Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Icon(Icons.church, size: 64, color: Colors.blue),
                  SizedBox(height: 16),
                  Text(
                    'Rara App',
                    style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
                  ),
                  SizedBox(height: 32),
                  CircularProgressIndicator(),
                ],
              ),
            ),
          );
        }
        return snapshot.data == true
            ? const AuthenticatedApp()
            : const WelcomePage();
      },
    );
  }
}
