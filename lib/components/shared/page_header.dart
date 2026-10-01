import 'package:flutter/material.dart';

/// Cabeçalho de página/seção: ícone num quadradinho + título + subtítulo.
class PageHeader extends StatelessWidget {
  final IconData icon;
  final String title;
  final String? subtitle;
  final Widget? trailing;

  const PageHeader({
    super.key,
    required this.icon,
    required this.title,
    this.subtitle,
    this.trailing,
  });

  @override
  Widget build(BuildContext context) {
    final scheme = Theme.of(context).colorScheme;
    final text = Theme.of(context).textTheme;

    return Row(
      children: [
        Container(
          padding: const EdgeInsets.all(10),
          decoration: BoxDecoration(
            color: scheme.primary.withValues(alpha: 0.14),
            borderRadius: BorderRadius.circular(12),
          ),
          child: Icon(icon, color: scheme.primary),
        ),
        const SizedBox(width: 14),
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                title,
                style: text.titleLarge?.copyWith(fontWeight: FontWeight.w700),
              ),
              if (subtitle != null)
                Text(
                  subtitle!,
                  style: text.bodyMedium?.copyWith(
                    color: scheme.onSurface.withValues(alpha: 0.7),
                  ),
                ),
            ],
          ),
        ),
        ?trailing,
      ],
    );
  }
}
