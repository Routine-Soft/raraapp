import 'package:flutter/material.dart';
import 'package:raraapp/hooks/use_churches.dart';

/// Select de igreja. Carrega a lista sozinho e trabalha com o `id`.
class ChurchDropdown extends StatefulWidget {
  final String? value;
  final ValueChanged<String?> onChanged;
  final bool enabled;
  final String label;

  const ChurchDropdown({
    super.key,
    required this.value,
    required this.onChanged,
    this.enabled = true,
    this.label = 'Igreja',
  });

  @override
  State<ChurchDropdown> createState() => _ChurchDropdownState();
}

class _ChurchDropdownState extends State<ChurchDropdown> {
  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback(
      (_) => useChurches(context, listen: false).ensureLoaded(),
    );
  }

  @override
  Widget build(BuildContext context) {
    final churches = useChurches(context);

    if (churches.isLoading && churches.churches.isEmpty) {
      return const Center(child: CircularProgressIndicator());
    }

    // Evita o assert do Dropdown quando o id ainda não está na lista
    final value = churches.findById(widget.value)?.id;

    return DropdownButtonFormField<String>(
      // A key força reconstruir quando o valor muda de fora (ex.: reset do form)
      key: ValueKey(value),
      initialValue: value,
      isExpanded: true,
      decoration: InputDecoration(labelText: widget.label),
      items: [
        for (final church in churches.churches)
          DropdownMenuItem(value: church.id, child: Text(church.name)),
      ],
      onChanged: widget.enabled ? widget.onChanged : null,
    );
  }
}
