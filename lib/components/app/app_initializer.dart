import 'package:flutter/material.dart';
import 'package:raraapp/components/app/intro_splash.dart';
import 'package:raraapp/components/app/welcome_page.dart';
import 'package:raraapp/components/auth/forgot_password_page.dart';
import 'package:raraapp/components/shared/effects/fade_route.dart';
import 'package:raraapp/hooks/use_auth.dart';

/// Abertura: mostra a animação enquanto recupera a sessão salva e, quando
/// os dois terminam, abre a primeira tela.
class AppInitializer extends StatefulWidget {
  const AppInitializer({super.key});

  @override
  State<AppInitializer> createState() => _AppInitializerState();
}

class _AppInitializerState extends State<AppInitializer> {
  late final Future<bool> _restore = useAuth(context, listen: false).restore();
  bool _introDone = false;

  Future<void> _onIntroFinished() async {
    if (_introDone) return;
    _introDone = true;
    final loggedIn = await _restore;
    if (!mounted) return;
    Navigator.of(context).pushReplacement(
      fadeRoute(
        loggedIn
            ? homeAfterLogin(useAuth(context, listen: false))
            : const WelcomePage(),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    _restore; // começa a carregar já, junto com a animação
    return IntroSplash(onFinished: _onIntroFinished);
  }
}
