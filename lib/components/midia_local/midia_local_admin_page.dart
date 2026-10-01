import 'package:flutter/material.dart';
import 'package:raraapp/api/midia_local_api.dart';
import 'package:raraapp/components/midia_local/midia_local_card.dart';
import 'package:raraapp/components/midia_local/midia_local_form_dialog.dart';
import 'package:raraapp/components/shared/feedback.dart';
import 'package:raraapp/components/shared/list_page.dart';
import 'package:raraapp/hooks/use_midia_locals.dart';

/// Tela de administração de mídias locais.
class MidiaLocalAdminPage extends StatefulWidget {
  const MidiaLocalAdminPage({super.key});

  @override
  State<MidiaLocalAdminPage> createState() => _MidiaLocalAdminPageState();
}

class _MidiaLocalAdminPageState extends State<MidiaLocalAdminPage> {
  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback(
      (_) => useMidiaLocals(context, listen: false).load(),
    );
  }

  Future<void> _delete(MidiaLocal midia) async {
    if (!await confirmDelete(
      context,
      title: 'Deletar Mídia',
      itemName: midia.title,
    )) {
      return;
    }
    if (!mounted) return;
    final midias = useMidiaLocals(context, listen: false);
    final ok = await midias.remove(midia.id);
    if (!mounted) return;
    showResult(
      context,
      ok: ok,
      success: 'Mídia deletada com sucesso',
      error: midias.error,
    );
  }

  @override
  Widget build(BuildContext context) {
    final midias = useMidiaLocals(context);

    return ListPage(
      icon: Icons.campaign_outlined,
      title: 'Mídia Liderança',
      loading: midias.isLoading,
      onRefresh: midias.load,
      emptyIcon: Icons.campaign_outlined,
      emptyMessage: midias.error ?? 'Nenhuma mídia encontrada',
      onAdd: () => MidiaLocalFormDialog.show(context),
      addLabel: 'Nova mídia',
      children: [
        for (final midia in midias.midias)
          MidiaLocalCard(
            midia: midia,
            onEdit: () => MidiaLocalFormDialog.show(context, midia: midia),
            onDelete: () => _delete(midia),
          ),
      ],
    );
  }
}
