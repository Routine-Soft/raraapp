import 'package:flutter/material.dart';

/// "Rótulo: valor" pequeno para cards. Some quando o valor é vazio.
class InfoLine extends StatelessWidget {
  final String? label;
  final String? value;

  const InfoLine(this.label, this.value, {super.key});

  @override
  Widget build(BuildContext context) {
    if (value == null || value!.trim().isEmpty) return const SizedBox.shrink();
    return Padding(
      padding: const EdgeInsets.only(bottom: 8),
      child: Text(
        label == null ? value! : '$label: $value',
        style: Theme.of(context).textTheme.bodySmall,
      ),
    );
  }
}
