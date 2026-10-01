import 'package:flutter/material.dart';
import 'package:raraapp/components/app/welcome_page.dart';
import 'package:raraapp/components/auth/forgot_password_page.dart';
import 'package:raraapp/components/shared/effects/animated_background.dart';
import 'package:raraapp/components/shared/effects/floating.dart';
import 'package:raraapp/components/shared/effects/gradient_text.dart';
import 'package:raraapp/components/shared/rara_logo.dart';
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
          return Scaffold(
            body: AnimatedBackground(
              child: Center(
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    Floating(child: const RaraLogo(height: 88)),
                    const SizedBox(height: 20),
                    GradientText(
                      'Rara App',
                      style: Theme.of(context).textTheme.headlineMedium
                          ?.copyWith(fontWeight: FontWeight.w800),
                    ),
                    const SizedBox(height: 24),
                    const SizedBox.square(
                      dimension: 28,
                      child: CircularProgressIndicator(strokeWidth: 2.5),
                    ),
                  ],
                ),
              ),
            ),
          );
        }
        return snapshot.data == true
            ? homeAfterLogin(useAuth(context, listen: false))
            : const WelcomePage();
      },
    );
  }
}
