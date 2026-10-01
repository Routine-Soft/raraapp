import 'package:flutter/material.dart';

/// Título de seção: ícone opcional + texto + linha até o fim.
class SectionTitle extends StatelessWidget {
  final String text;
  final IconData? icon;
  final Widget? trailing;

  const SectionTitle(this.text, {super.key, this.icon, this.trailing});

  @override
  Widget build(BuildContext context) {
    final scheme = Theme.of(context).colorScheme;

    return Row(
      children: [
        if (icon != null) ...[
          Container(
            padding: const EdgeInsets.all(8),
            decoration: BoxDecoration(
              color: scheme.primary.withValues(alpha: 0.14),
              borderRadius: BorderRadius.circular(10),
            ),
            child: Icon(icon, size: 20, color: scheme.primary),
          ),
          const SizedBox(width: 12),
        ],
        Text(
          text,
          style: Theme.of(
            context,
          ).textTheme.titleMedium?.copyWith(fontWeight: FontWeight.w700),
        ),
        const SizedBox(width: 12),
        Expanded(child: Divider(color: scheme.outlineVariant)),
        if (trailing != null) ...[const SizedBox(width: 8), trailing!],
      ],
    );
  }
}

/// Bloco de formulário: [SectionTitle] + campos espaçados.
class FormSection extends StatelessWidget {
  final String title;
  final IconData? icon;
  final List<Widget> children;

  const FormSection({
    super.key,
    required this.title,
    required this.children,
    this.icon,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      spacing: 16,
      children: [
        SectionTitle(title, icon: icon),
        ...children,
      ],
    );
  }
}
