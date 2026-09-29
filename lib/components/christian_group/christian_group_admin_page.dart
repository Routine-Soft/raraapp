import 'package:flutter/material.dart';
import 'package:raraapp/api/christian_group_api.dart';
import 'package:raraapp/components/christian_group/christian_group_card.dart';
import 'package:raraapp/components/christian_group/christian_group_form_dialog.dart';
import 'package:raraapp/components/shared/empty_state.dart';
import 'package:raraapp/components/shared/feedback.dart';
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
    return Scaffold(
      floatingActionButton: FloatingActionButton(
        onPressed: () => ChristianGroupFormDialog.show(context),
        child: const Icon(Icons.add),
      ),
      body: _buildBody(useChristianGroups(context)),
    );
  }

  Widget _buildBody(ChristianGroupsHook groups) {
    final list = groups.groups;

    if (groups.isLoading && list.isEmpty) {
      return const Center(child: CircularProgressIndicator());
    }

    if (list.isEmpty) {
      return EmptyState(
        icon: Icons.groups,
        message: groups.error ?? 'Nenhum grupo encontrado',
        actionLabel: 'Criar Grupo',
        onAction: () => ChristianGroupFormDialog.show(context),
      );
    }

    return RefreshIndicator(
      onRefresh: groups.load,
      child: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          Text(
            'Grupos Cristãos (${list.length})',
            style: Theme.of(
              context,
            ).textTheme.headlineSmall?.copyWith(fontWeight: FontWeight.bold),
          ),
          const SizedBox(height: 16),
          for (final group in list)
            ChristianGroupCard(
              group: group,
              onEdit: () =>
                  ChristianGroupFormDialog.show(context, group: group),
              onDelete: () => _delete(group),
            ),
        ],
      ),
    );
  }
}
