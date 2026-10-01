import 'dart:math' as math;

import 'package:flutter/material.dart';
import 'package:raraapp/components/shared/effects/motion.dart';

/// Flutuar + respirar em loop (CSS: animation infinite com translateY + scale).
class Floating extends StatefulWidget {
  final Widget child;
  final double distance;
  final Duration period;

  const Floating({
    super.key,
    required this.child,
    this.distance = 6,
    this.period = const Duration(seconds: 4),
  });

  @override
  State<Floating> createState() => _FloatingState();
}

class _FloatingState extends State<Floating>
    with SingleTickerProviderStateMixin {
  late final _controller = AnimationController(
    vsync: this,
    duration: widget.period,
  )..repeat();

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    if (reduceMotion(context)) return widget.child;

    return AnimatedBuilder(
      animation: _controller,
      child: widget.child,
      builder: (context, child) {
        final wave = math.sin(_controller.value * 2 * math.pi);
        return Transform.translate(
          offset: Offset(0, wave * widget.distance),
          child: Transform.scale(scale: 1 + wave * 0.015, child: child),
        );
      },
    );
  }
}
