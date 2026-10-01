import 'package:flutter/material.dart';

/// Etiqueta em pílula. [dot] mostra uma bolinha colorida antes do texto
/// (a cor fica só na bolinha, o texto mantém o contraste do modo).
class Tag extends StatelessWidget {
  final String label;
  final IconData? icon;
  final Color? dot;

  const Tag(this.label, {super.key, this.icon, this.dot});

  @override
  Widget build(BuildContext context) {
    final scheme = Theme.of(context).colorScheme;
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 5),
      decoration: BoxDecoration(
        color: scheme.onSurface.withValues(alpha: 0.08),
        borderRadius: BorderRadius.circular(999),
        border: Border.all(color: scheme.outlineVariant),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          if (dot != null) ...[
            Container(
              width: 8,
              height: 8,
              decoration: BoxDecoration(
                color: dot,
                shape: BoxShape.circle,
                border: Border.all(color: scheme.onSurface, width: 0.5),
              ),
            ),
            const SizedBox(width: 6),
          ],
          if (icon != null) ...[Icon(icon, size: 14), const SizedBox(width: 6)],
          Flexible(
            child: Text(
              label,
              overflow: TextOverflow.ellipsis,
              style: Theme.of(
                context,
              ).textTheme.labelMedium?.copyWith(fontWeight: FontWeight.w600),
            ),
          ),
        ],
      ),
    );
  }
}
