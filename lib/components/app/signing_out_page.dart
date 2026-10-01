import 'package:flutter/material.dart';
import 'package:raraapp/components/app/welcome_page.dart';
import 'package:raraapp/components/shared/effects/animated_background.dart';
import 'package:raraapp/components/shared/effects/fade_route.dart';
import 'package:raraapp/components/shared/effects/floating.dart';
import 'package:raraapp/components/shared/rara_logo.dart';
import 'package:raraapp/hooks/providers.dart';

/// "Saindo...": aparece na hora em que a pessoa toca em Sair, enquanto o
/// logout termina (avisar o backend e desconectar o Google demora um pouco).
class SigningOutPage extends StatefulWidget {
  const SigningOutPage({super.key});

  /// Troca a tela atual (e tudo embaixo dela) pela de "Saindo...".
  static void open(BuildContext context) => Navigator.of(
    context,
  ).pushAndRemoveUntil(fadeRoute(const SigningOutPage()), (_) => false);

  @override
  State<SigningOutPage> createState() => _SigningOutPageState();
}

class _SigningOutPageState extends State<SigningOutPage> {
  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) => _signOut());
  }

  Future<void> _signOut() async {
    await logoutAndClear(context);
    if (!mounted) return;
    Navigator.of(
      context,
    ).pushAndRemoveUntil(fadeRoute(const WelcomePage()), (_) => false);
  }

  @override
  Widget build(BuildContext context) {
    final text = Theme.of(context).textTheme;
    return Scaffold(
      body: AnimatedBackground(
        child: Center(
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              Floating(child: const RaraLogo(height: 72)),
              const SizedBox(height: 28),
              const SizedBox.square(
                dimension: 28,
                child: CircularProgressIndicator(strokeWidth: 2.5),
              ),
              const SizedBox(height: 16),
              Text(
                'Saindo...',
                style: text.titleMedium?.copyWith(fontWeight: FontWeight.w700),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
