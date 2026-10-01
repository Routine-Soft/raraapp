import 'package:flutter/material.dart';
import 'package:raraapp/components/theme/app_effects.dart';

/// Círculo com as iniciais do nome ("Maria Oliveira" -> "MO") e brilho.
class InitialsAvatar extends StatelessWidget {
  final String name;
  final double size;

  const InitialsAvatar(this.name, {super.key, this.size = 44});

  String get _initials {
    final parts = name.trim().split(RegExp(r'\s+'));
    final first = parts.first.isEmpty ? '?' : parts.first[0];
    final last = parts.length > 1 ? parts.last[0] : '';
    return (first + last).toUpperCase();
  }

  @override
  Widget build(BuildContext context) {
    final scheme = Theme.of(context).colorScheme;
    return ExcludeSemantics(
      child: Container(
        width: size,
        height: size,
        alignment: Alignment.center,
        decoration: BoxDecoration(
          color: scheme.primary,
          shape: BoxShape.circle,
          boxShadow: [
            BoxShadow(color: AppEffects.of(context).glow, blurRadius: 12),
          ],
        ),
        child: FittedBox(
          child: Padding(
            padding: const EdgeInsets.all(6),
            child: Text(
              _initials,
              style: Theme.of(context).textTheme.titleSmall?.copyWith(
                color: scheme.onPrimary,
                fontWeight: FontWeight.w700,
              ),
            ),
          ),
        ),
      ),
    );
  }
}
