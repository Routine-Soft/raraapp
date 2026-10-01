import 'package:flutter/material.dart';
import 'package:raraapp/components/christian_group/christian_group_card.dart';
import 'package:raraapp/components/shared/list_page.dart';
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

    return ListPage(
      icon: Icons.groups_outlined,
      title: 'Christian Group',
      subtitle: 'Encontre um grupo perto de você',
      loading: groups.isLoading,
      onRefresh: groups.load,
      emptyIcon: Icons.groups_outlined,
      emptyMessage: groups.error ?? 'Nenhum grupo encontrado',
      children: [
        for (final group in groups.groups) ChristianGroupCard(group: group),
      ],
    );
  }
}
