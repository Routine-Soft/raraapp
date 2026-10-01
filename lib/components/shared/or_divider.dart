import 'package:flutter/material.dart';

/// Linha "—— ou ——".
class OrDivider extends StatelessWidget {
  const OrDivider({super.key});

  @override
  Widget build(BuildContext context) {
    final color = Theme.of(
      context,
    ).colorScheme.onSurface.withValues(alpha: 0.5);
    return Row(
      children: [
        Expanded(child: Divider(color: color)),
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: 12),
          child: Text('ou', style: TextStyle(color: color)),
        ),
        Expanded(child: Divider(color: color)),
      ],
    );
  }
}
