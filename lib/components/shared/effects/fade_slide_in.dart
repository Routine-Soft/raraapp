import 'package:flutter/material.dart';
import 'package:raraapp/components/shared/effects/motion.dart';

/// Entrada "fade in + slide up" (CSS: @keyframes com opacity + translateY).
/// Use [delay] para escalonar vários elementos (efeito cascata).
class FadeSlideIn extends StatefulWidget {
  final Widget child;
  final Duration delay;
  final Duration duration;

  /// Deslocamento inicial em fração do tamanho do widget (0.15 = 15% abaixo).
  final double offsetY;

  const FadeSlideIn({
    super.key,
    required this.child,
    this.delay = Duration.zero,
    this.duration = const Duration(milliseconds: 550),
    this.offsetY = 0.15,
  });

  @override
  State<FadeSlideIn> createState() => _FadeSlideInState();
}

class _FadeSlideInState extends State<FadeSlideIn>
    with SingleTickerProviderStateMixin {
  late final _controller = AnimationController(
    vsync: this,
    duration: widget.duration,
  );
  late final _curve = CurvedAnimation(
    parent: _controller,
    curve: Curves.easeOutCubic,
  );

  @override
  void initState() {
    super.initState();
    Future.delayed(widget.delay, () {
      if (mounted) _controller.forward();
    });
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    if (reduceMotion(context)) return widget.child;

    return FadeTransition(
      opacity: _curve,
      child: SlideTransition(
        position: Tween(
          begin: Offset(0, widget.offsetY),
          end: Offset.zero,
        ).animate(_curve),
        child: widget.child,
      ),
    );
  }
}

/// Atraso do item [order] numa entrada em cascata.
Duration stagger(int order, {int stepMs = 90}) =>
    Duration(milliseconds: stepMs * order);
