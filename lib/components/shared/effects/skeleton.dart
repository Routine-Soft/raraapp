import 'package:flutter/material.dart';
import 'package:raraapp/components/shared/effects/motion.dart';

/// Bloco "carregando" que pulsa (CSS: skeleton loading com animation de
/// opacity). Mostra o formato do conteúdo antes dele chegar.
class Skeleton extends StatefulWidget {
  final double? width;
  final double height;
  final double radius;

  const Skeleton({super.key, this.width, this.height = 16, this.radius = 8});

  @override
  State<Skeleton> createState() => _SkeletonState();
}

class _SkeletonState extends State<Skeleton>
    with SingleTickerProviderStateMixin {
  late final _controller = AnimationController(
    vsync: this,
    duration: const Duration(milliseconds: 900),
  )..repeat(reverse: true);

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final color = Theme.of(context).colorScheme.onSurface;
    final box = Container(
      width: widget.width,
      height: widget.height,
      decoration: BoxDecoration(
        color: color.withValues(alpha: 0.12),
        borderRadius: BorderRadius.circular(widget.radius),
      ),
    );
    if (reduceMotion(context)) return box;

    return FadeTransition(
      opacity: Tween(begin: 0.45, end: 1.0).animate(_controller),
      child: box,
    );
  }
}
