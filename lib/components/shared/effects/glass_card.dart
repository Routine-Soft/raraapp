import 'dart:ui';

import 'package:flutter/material.dart';
import 'package:raraapp/components/theme/app_effects.dart';

/// Vidro fosco / glassmorphism (CSS: backdrop-filter: blur + fundo translúcido
/// + borda clara + box-shadow).
class GlassCard extends StatelessWidget {
  final Widget child;
  final EdgeInsetsGeometry padding;

  const GlassCard({
    super.key,
    required this.child,
    this.padding = const EdgeInsets.all(28),
  });

  @override
  Widget build(BuildContext context) {
    final effects = AppEffects.of(context);
    final radius = BorderRadius.circular(28);

    return DecoratedBox(
      decoration: BoxDecoration(
        borderRadius: radius,
        boxShadow: [
          BoxShadow(
            color: Colors.black.withValues(alpha: 0.25),
            blurRadius: 40,
            offset: const Offset(0, 20),
          ),
        ],
      ),
      child: ClipRRect(
        borderRadius: radius,
        child: BackdropFilter(
          filter: ImageFilter.blur(sigmaX: 18, sigmaY: 18),
          child: AnimatedContainer(
            duration: const Duration(milliseconds: 300),
            padding: padding,
            decoration: BoxDecoration(
              color: effects.glassFill,
              borderRadius: radius,
              border: Border.all(color: effects.glassBorder),
            ),
            child: child,
          ),
        ),
      ),
    );
  }
}
