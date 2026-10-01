import 'package:flutter/material.dart';
import 'package:raraapp/hooks/use_churches.dart';

/// Filtro de igreja das páginas do Super Intendente Geral.
/// `null` = todas as igrejas. Carrega a lista de igrejas sozinho.
class ChurchFilter extends StatefulWidget {
  final String? value;
  final ValueChanged<String?> onChanged;

  const ChurchFilter({super.key, required this.value, required this.onChanged});

  @override
  State<ChurchFilter> createState() => _ChurchFilterState();
}

class _ChurchFilterState extends State<ChurchFilter> {
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
    // Evita o assert do Dropdown quando o id ainda não está na lista
    final value = churches.findById(widget.value)?.id;

    return DropdownButtonFormField<String?>(
      key: ValueKey(value),
      initialValue: value,
      isExpanded: true,
      decoration: const InputDecoration(
        labelText: 'Igreja',
        prefixIcon: Icon(Icons.church_outlined),
      ),
      items: [
        const DropdownMenuItem(value: null, child: Text('Todas as igrejas')),
        for (final c in churches.churches)
          DropdownMenuItem(value: c.id, child: Text(c.name)),
      ],
      onChanged: widget.onChanged,
    );
  }
}
