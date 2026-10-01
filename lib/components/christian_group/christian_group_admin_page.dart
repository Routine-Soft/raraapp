import 'package:flutter/material.dart';
import 'package:raraapp/api/christian_group_api.dart';
import 'package:raraapp/components/christian_group/christian_group_card.dart';
import 'package:raraapp/components/christian_group/christian_group_form_dialog.dart';
import 'package:raraapp/components/shared/feedback.dart';
import 'package:raraapp/components/shared/list_page.dart';
import 'package:raraapp/hooks/use_christian_groups.dart';

/// Tela de administração de grupos cristãos.
class ChristianGroupAdminPage extends StatefulWidget {
  const ChristianGroupAdminPage({super.key});

  @override
  State<ChristianGroupAdminPage> createState() =>
      _ChristianGroupAdminPageState();
}

class _ChristianGroupAdminPageState extends State<ChristianGroupAdminPage> {
  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback(
      (_) => useChristianGroups(context, listen: false).load(),
    );
  }

  Future<void> _delete(ChristianGroup group) async {
    if (!await confirmDelete(
      context,
      title: 'Deletar Grupo',
      itemName: group.name,
    )) {
      return;
    }
    if (!mounted) return;
    final groups = useChristianGroups(context, listen: false);
    final ok = await groups.remove(group.id);
    if (!mounted) return;
    showResult(
      context,
      ok: ok,
      success: 'Grupo deletado com sucesso',
      error: groups.error,
    );
  }

  @override
  Widget build(BuildContext context) {
    final groups = useChristianGroups(context);

    return ListPage(
      icon: Icons.groups_outlined,
      title: 'Christian Group Liderança',
      loading: groups.isLoading,
      onRefresh: groups.load,
      emptyIcon: Icons.groups_outlined,
      emptyMessage: groups.error ?? 'Nenhum grupo encontrado',
      onAdd: () => ChristianGroupFormDialog.show(context),
      addLabel: 'Novo grupo',
      children: [
        for (final group in groups.groups)
          ChristianGroupCard(
            group: group,
            onEdit: () => ChristianGroupFormDialog.show(context, group: group),
            onDelete: () => _delete(group),
          ),
      ],
    );
  }
}
