import 'package:flutter/material.dart';
import 'package:raraapp/components/christian_group/christian_group_card.dart';
import 'package:raraapp/hooks/use_christian_groups.dart';

/// Lista de grupos para o membro (somente leitura).
class ChristianGroupPage extends StatefulWidget {
  const ChristianGroupPage({super.key});

  @override
  State<ChristianGroupPage> createState() => _ChristianGroupPageState();
}

class _ChristianGroupPageState extends State<ChristianGroupPage> {
  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback(
      (_) => useChristianGroups(context, listen: false).load(),
    );
  }

  @override
  Widget build(BuildContext context) {
    final groups = useChristianGroups(context);

    if (groups.isLoading && groups.groups.isEmpty) {
      return const Center(child: CircularProgressIndicator());
    }

    return RefreshIndicator(
      onRefresh: groups.load,
      child: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          Text(
            'Seus Grupos',
            style: Theme.of(
              context,
            ).textTheme.headlineSmall?.copyWith(fontWeight: FontWeight.bold),
          ),
          const SizedBox(height: 16),
          if (groups.groups.isEmpty)
            Center(
              child: Text(
                groups.error ?? 'Nenhum grupo encontrado',
                style: const TextStyle(color: Colors.grey),
              ),
            ),
          for (final group in groups.groups) ChristianGroupCard(group: group),
        ],
      ),
    );
  }
}
