import 'package:flutter/material.dart';

/// Linha "rótulo ........ valor" das fichas de detalhe.
/// Com [hideEmpty], some quando o valor está vazio; senão mostra "—".
class DetailRow extends StatelessWidget {
  final String label;
  final String? value;
  final IconData? icon;
  final bool hideEmpty;

  const DetailRow(
    this.label,
    this.value, {
    super.key,
    this.icon,
    this.hideEmpty = false,
  });

  @override
  Widget build(BuildContext context) {
    final empty = (value ?? '').trim().isEmpty;
    if (empty && hideEmpty) return const SizedBox.shrink();
    final muted = Theme.of(
      context,
    ).colorScheme.onSurface.withValues(alpha: 0.7);

    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 6),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          if (icon != null) ...[
            Icon(icon, size: 18, color: muted),
            const SizedBox(width: 10),
          ],
          Text(label, style: TextStyle(color: muted)),
          const SizedBox(width: 16),
          Expanded(
            child: Text(
              empty ? '—' : value!,
              textAlign: TextAlign.end,
              style: const TextStyle(fontWeight: FontWeight.w600),
            ),
          ),
        ],
      ),
    );
  }
}
