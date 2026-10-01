import 'package:flutter/material.dart';
import 'package:raraapp/components/shared/effects/motion.dart';
import 'package:raraapp/components/theme/app_effects.dart';

/// Cartão que "levanta" ao passar o mouse: sobe, ganha sombra/brilho e a borda
/// acende (CSS: :hover + transform: translateY + box-shadow + transition).
class HoverLift extends StatefulWidget {
  final Widget child;
  final double radius;

  const HoverLift({super.key, required this.child, this.radius = 18});

  @override
  State<HoverLift> createState() => _HoverLiftState();
}

class _HoverLiftState extends State<HoverLift> {
  bool _hover = false;

  @override
  Widget build(BuildContext context) {
    final glow = AppEffects.of(context).glow;
    final lifted = _hover && !reduceMotion(context);
    const duration = Duration(milliseconds: 220);

    return MouseRegion(
      onEnter: (_) => setState(() => _hover = true),
      onExit: (_) => setState(() => _hover = false),
      child: AnimatedContainer(
        duration: duration,
        curve: Curves.easeOut,
        transform: Matrix4.translationValues(0, lifted ? -4 : 0, 0),
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(widget.radius),
          boxShadow: [
            BoxShadow(
              color: _hover ? glow : Colors.black.withValues(alpha: 0.08),
              blurRadius: _hover ? 24 : 10,
              offset: Offset(0, _hover ? 10 : 4),
            ),
          ],
        ),
        child: widget.child,
      ),
    );
  }
}
