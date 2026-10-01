import 'package:flutter/material.dart';

/// "Rótulo: valor" pequeno para cards. Some quando o valor é vazio.
class InfoLine extends StatelessWidget {
  final String? label;
  final String? value;
  final IconData? icon;

  const InfoLine(this.label, this.value, {super.key, this.icon});

  @override
  Widget build(BuildContext context) {
    if (value == null || value!.trim().isEmpty) return const SizedBox.shrink();
    final muted = Theme.of(
      context,
    ).colorScheme.onSurface.withValues(alpha: 0.7);

    return Row(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        if (icon != null) ...[
          Icon(icon, size: 16, color: muted),
          const SizedBox(width: 8),
        ],
        Expanded(
          child: Text.rich(
            TextSpan(
              children: [
                if (label != null)
                  TextSpan(
                    text: '$label: ',
                    style: TextStyle(color: muted),
                  ),
                TextSpan(
                  text: value,
                  style: const TextStyle(fontWeight: FontWeight.w600),
                ),
              ],
            ),
            style: Theme.of(context).textTheme.bodyMedium,
          ),
        ),
      ],
    );
  }
}
