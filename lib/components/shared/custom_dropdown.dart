import 'package:flutter/material.dart';

class CustomDropdown<T> extends StatelessWidget {
  final String label;
  final T? value;
  final List<T> items;
  final void Function(T?)? onChanged;
  final String Function(T)? itemLabel;

  const CustomDropdown({
    super.key,
    required this.label,
    required this.items,
    this.value,
    this.onChanged,
    this.itemLabel,
  });

  @override
  Widget build(BuildContext context) {
    return DropdownButtonFormField<T>(
      // A key força reconstruir quando o valor muda de fora (ex.: reset do form)
      key: ValueKey(value),
      initialValue: value,
      decoration: InputDecoration(
        labelText: label,
        border: OutlineInputBorder(borderRadius: BorderRadius.circular(8)),
      ),
      items: items.map((item) {
        final label = itemLabel?.call(item) ?? item.toString();
        return DropdownMenuItem<T>(value: item, child: Text(label));
      }).toList(),
      onChanged: onChanged,
      isExpanded: true,
    );
  }
}
