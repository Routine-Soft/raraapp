import 'package:flutter/material.dart';

/// Logo de um ministério com fundo transparente. Existe em duas versões
/// (`<nome>_dark.png` com letras claras, `<nome>_light.png` com letras
/// escuras) e usa a que contrasta com o modo atual.
class BrandLogo extends StatelessWidget {
  /// Nome do arquivo em assets/images, sem o sufixo (ex.: 'avancai').
  final String name;
  final double height;
  final String semanticLabel;

  const BrandLogo(
    this.name, {
    super.key,
    required this.semanticLabel,
    this.height = 96,
  });

  @override
  Widget build(BuildContext context) {
    final dark = Theme.of(context).colorScheme.brightness == Brightness.dark;
    return Center(
      child: Image.asset(
        'assets/images/${name}_${dark ? 'dark' : 'light'}.png',
        height: height,
        fit: BoxFit.contain,
        semanticLabel: semanticLabel,
      ),
    );
  }
}
