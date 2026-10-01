import 'dart:math' as math;

import 'package:flutter/material.dart';
import 'package:raraapp/components/shared/effects/motion.dart';
import 'package:raraapp/components/theme/app_effects.dart';

/// Fundo com degradê em movimento + duas "manchas de luz" desfocadas
/// (CSS: animated linear-gradient + radial-gradient + filter: blur).
class AnimatedBackground extends StatefulWidget {
  final Widget child;

  const AnimatedBackground({super.key, required this.child});

  @override
  State<AnimatedBackground> createState() => _AnimatedBackgroundState();
}

class _AnimatedBackgroundState extends State<AnimatedBackground>
    with SingleTickerProviderStateMixin {
  late final _controller = AnimationController(
    vsync: this,
    duration: const Duration(seconds: 18),
  )..repeat();

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final effects = AppEffects.of(context);
    final still = reduceMotion(context);

    return AnimatedBuilder(
      animation: _controller,
      child: widget.child,
      builder: (context, child) {
        final t = still ? 0.0 : _controller.value * 2 * math.pi;
        return Container(
          decoration: BoxDecoration(
            gradient: LinearGradient(
              begin: Alignment(math.cos(t), math.sin(t)),
              end: Alignment(-math.cos(t), -math.sin(t)),
              colors: effects.backgroundGradient,
            ),
          ),
          child: Stack(
            children: [
              _Orb(
                color: effects.orbA,
                alignment: Alignment(-0.9 + 0.3 * math.sin(t), -0.8),
              ),
              _Orb(
                color: effects.orbB,
                alignment: Alignment(0.9, 0.9 - 0.3 * math.cos(t)),
              ),
              Positioned.fill(child: child!),
            ],
          ),
        );
      },
    );
  }
}

/// Mancha de luz: círculo com degradê radial que some nas bordas.
class _Orb extends StatelessWidget {
  final Color color;
  final Alignment alignment;

  const _Orb({required this.color, required this.alignment});

  @override
  Widget build(BuildContext context) {
    return Align(
      alignment: alignment,
      child: IgnorePointer(
        child: Container(
          width: 380,
          height: 380,
          decoration: BoxDecoration(
            shape: BoxShape.circle,
            gradient: RadialGradient(
              colors: [color, color.withValues(alpha: 0)],
            ),
          ),
        ),
      ),
    );
  }
}
