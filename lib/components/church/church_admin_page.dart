import 'package:flutter/material.dart';
import 'package:raraapp/api/church_api.dart';
import 'package:raraapp/components/church/church_card.dart';
import 'package:raraapp/components/church/church_form_dialog.dart';
import 'package:raraapp/components/shared/feedback.dart';
import 'package:raraapp/components/shared/list_page.dart';
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
    final churches = useChurches(context);

    return ListPage(
      icon: Icons.church_outlined,
      title: 'Igreja Super Intendente Geral',
      loading: churches.isLoading,
      onRefresh: churches.load,
      emptyIcon: Icons.church_outlined,
      emptyMessage: churches.error ?? 'Nenhuma igreja encontrada',
      onAdd: () => ChurchFormDialog.show(context),
      addLabel: 'Nova igreja',
      children: [
        for (final church in churches.churches)
          ChurchCard(
            church: church,
            onEdit: () => ChurchFormDialog.show(context, church: church),
            onDelete: () => _delete(church),
          ),
      ],
    );
  }
}
