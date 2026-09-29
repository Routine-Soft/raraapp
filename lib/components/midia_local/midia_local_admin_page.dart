import 'package:flutter/material.dart';
import 'package:raraapp/api/midia_local_api.dart';
import 'package:raraapp/components/midia_local/midia_local_card.dart';
import 'package:raraapp/components/midia_local/midia_local_form_dialog.dart';
import 'package:raraapp/components/shared/empty_state.dart';
import 'package:raraapp/components/shared/feedback.dart';
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
    return Scaffold(
      floatingActionButton: FloatingActionButton(
        onPressed: () => MidiaLocalFormDialog.show(context),
        child: const Icon(Icons.add),
      ),
      body: _buildBody(useMidiaLocals(context)),
    );
  }

  Widget _buildBody(MidiaLocalsHook midias) {
    final list = midias.midias;

    if (midias.isLoading && list.isEmpty) {
      return const Center(child: CircularProgressIndicator());
    }

    if (list.isEmpty) {
      return EmptyState(
        icon: Icons.image,
        message: midias.error ?? 'Nenhuma mídia encontrada',
        actionLabel: 'Criar Mídia',
        onAction: () => MidiaLocalFormDialog.show(context),
      );
    }

    return RefreshIndicator(
      onRefresh: midias.load,
      child: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          Text(
            'Mídias Locais (${list.length})',
            style: Theme.of(
              context,
            ).textTheme.headlineSmall?.copyWith(fontWeight: FontWeight.bold),
          ),
          const SizedBox(height: 16),
          for (final midia in list)
            MidiaLocalCard(
              midia: midia,
              onEdit: () => MidiaLocalFormDialog.show(context, midia: midia),
              onDelete: () => _delete(midia),
            ),
        ],
      ),
    );
  }
}
