import 'package:flutter/material.dart';
import 'package:raraapp/api/church_api.dart';
import 'package:raraapp/components/church/church_card.dart';
import 'package:raraapp/components/church/church_form_dialog.dart';
import 'package:raraapp/components/shared/empty_state.dart';
import 'package:raraapp/components/shared/feedback.dart';
import 'package:raraapp/hooks/use_churches.dart';

/// Tela de administração de igrejas (super_admin).
class ChurchAdminPage extends StatefulWidget {
  const ChurchAdminPage({super.key});

  @override
  State<ChurchAdminPage> createState() => _ChurchAdminPageState();
}

class _ChurchAdminPageState extends State<ChurchAdminPage> {
  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback(
      (_) => useChurches(context, listen: false).ensureLoaded(),
    );
  }

  Future<void> _delete(Church church) async {
    if (!await confirmDelete(
      context,
      title: 'Deletar Igreja',
      itemName: church.name,
    )) {
      return;
    }
    if (!mounted) return;
    final churches = useChurches(context, listen: false);
    final ok = await churches.remove(church.id);
    if (!mounted) return;
    showResult(
      context,
      ok: ok,
      success: 'Igreja deletada com sucesso',
      error: churches.error,
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      floatingActionButton: FloatingActionButton(
        onPressed: () => ChurchFormDialog.show(context),
        child: const Icon(Icons.add),
      ),
      body: _buildBody(useChurches(context)),
    );
  }

  Widget _buildBody(ChurchesHook churches) {
    final list = churches.churches;

    if (churches.isLoading && list.isEmpty) {
      return const Center(child: CircularProgressIndicator());
    }

    if (list.isEmpty) {
      return EmptyState(
        icon: Icons.church,
        message: churches.error ?? 'Nenhuma igreja encontrada',
        actionLabel: 'Criar Igreja',
        onAction: () => ChurchFormDialog.show(context),
      );
    }

    return RefreshIndicator(
      onRefresh: churches.load,
      child: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          Text(
            'Igrejas (${list.length})',
            style: Theme.of(
              context,
            ).textTheme.headlineSmall?.copyWith(fontWeight: FontWeight.bold),
          ),
          const SizedBox(height: 16),
          for (final church in list)
            ChurchCard(
              church: church,
              onEdit: () => ChurchFormDialog.show(context, church: church),
              onDelete: () => _delete(church),
            ),
        ],
      ),
    );
  }
}
