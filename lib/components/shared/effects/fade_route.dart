import 'package:flutter/material.dart';

/// Transição entre telas com fade + leve subida
/// (CSS: transition de opacity + transform numa troca de página).
Route<T> fadeRoute<T>(Widget page) => PageRouteBuilder<T>(
  transitionDuration: const Duration(milliseconds: 450),
  reverseTransitionDuration: const Duration(milliseconds: 300),
  pageBuilder: (_, _, _) => page,
  transitionsBuilder: (context, animation, _, child) {
    // "Reduzir movimento": troca direto, sem animar
    if (MediaQuery.of(context).disableAnimations) return child;
    final curve = CurvedAnimation(
      parent: animation,
      curve: Curves.easeOutCubic,
    );
    return FadeTransition(
      opacity: curve,
      child: SlideTransition(
        position: Tween(
          begin: const Offset(0, 0.03),
          end: Offset.zero,
        ).animate(curve),
        child: child,
      ),
    );
  },
);
