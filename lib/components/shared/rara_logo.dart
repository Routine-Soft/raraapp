import 'package:flutter/material.dart';

/// Símbolo da Rara pintado com a cor do texto do modo atual
/// (branco no escuro/vermelho, preto no claro/verde).
class RaraLogo extends StatelessWidget {
  final double height;

  const RaraLogo({super.key, this.height = 80});

  @override
  Widget build(BuildContext context) {
    return Image.asset(
      'assets/images/logorara_mark.png',
      height: height,
      color: Theme.of(context).colorScheme.onSurface,
      colorBlendMode: BlendMode.srcIn,
      semanticLabel: 'Logo Rara',
    );
  }
}
