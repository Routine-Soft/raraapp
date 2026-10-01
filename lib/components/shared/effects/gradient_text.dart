import 'package:flutter/material.dart';
import 'package:raraapp/components/theme/app_effects.dart';

/// Texto com degradê (CSS: background-clip: text).
class GradientText extends StatelessWidget {
  final String text;
  final TextStyle? style;
  final TextAlign textAlign;

  const GradientText(
    this.text, {
    super.key,
    this.style,
    this.textAlign = TextAlign.center,
  });

  @override
  Widget build(BuildContext context) {
    final colors = AppEffects.of(context).titleGradient;
    return ShaderMask(
      blendMode: BlendMode.srcIn,
      shaderCallback: (bounds) =>
          LinearGradient(colors: colors).createShader(bounds),
      child: Text(text, style: style, textAlign: textAlign),
    );
  }
}
