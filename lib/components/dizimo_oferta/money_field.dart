import 'package:flutter/material.dart';
import 'package:raraapp/components/shared/money.dart';

/// Campo "R$ 0,00" com teclado numérico.
class MoneyField extends StatelessWidget {
  final String label;
  final TextEditingController controller;
  final IconData icon;
  final ValueChanged<String>? onChanged;

  const MoneyField({
    super.key,
    required this.label,
    required this.controller,
    this.icon = Icons.attach_money,
    this.onChanged,
  });

  @override
  Widget build(BuildContext context) {
    return TextFormField(
      controller: controller,
      keyboardType: TextInputType.number,
      inputFormatters: [MoneyInputFormatter()],
      onChanged: onChanged,
      style: Theme.of(
        context,
      ).textTheme.titleLarge?.copyWith(fontWeight: FontWeight.w700),
      decoration: InputDecoration(
        labelText: label,
        hintText: '0,00',
        prefixIcon: Icon(icon),
        prefixText: 'R\$ ',
      ),
    );
  }
}
