import 'package:flutter/material.dart';
import 'package:raraapp/components/app/appearance_controls.dart';
import 'package:raraapp/components/shared/effects/animated_background.dart';
import 'package:raraapp/components/shared/effects/fade_slide_in.dart';
import 'package:raraapp/components/shared/effects/glass_card.dart';

/// Moldura das telas "de vitrine" (boas-vindas, login, cadastro):
/// fundo animado + cartão de vidro centralizado + botão de aparência no topo.
class ShowcasePage extends StatelessWidget {
  final Widget child;
  final double maxWidth;

  const ShowcasePage({super.key, required this.child, this.maxWidth = 420});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      extendBodyBehindAppBar: true,
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        actions: const [AppearanceButton(), SizedBox(width: 8)],
      ),
      body: AnimatedBackground(
        child: SafeArea(
          child: Center(
            child: SingleChildScrollView(
              padding: const EdgeInsets.all(20),
              child: ConstrainedBox(
                constraints: BoxConstraints(maxWidth: maxWidth),
                child: FadeSlideIn(
                  offsetY: 0.05,
                  child: GlassCard(child: child),
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }
}
