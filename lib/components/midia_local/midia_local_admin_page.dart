import 'package:flutter/material.dart';
import 'package:raraapp/api/midia_local_api.dart';
import 'package:raraapp/components/midia_local/midia_local_card.dart';
import 'package:raraapp/components/midia_local/midia_local_form_dialog.dart';
import 'package:raraapp/components/shared/feedback.dart';
import 'package:raraapp/components/shared/format.dart';
import 'package:raraapp/components/shared/list_page.dart';
import 'package:raraapp/components/shared/page_header.dart';
import 'package:raraapp/hooks/use_midia_locals.dart';

/// Tela de administração de mídias locais.
class MidiaLocalAdminPage extends StatefulWidget {
  const MidiaLocalAdminPage({super.key});

  @override
  State<MidiaLocalAdminPage> createState() => _MidiaLocalAdminPageState();
}

class _MidiaLocalAdminPageState extends State<MidiaLocalAdminPage> {
  /// Modo "Ordenar": arrasta os cards para mudar a ordem da Agenda Semanal.
  bool _reordering = false;

  Future<void> _move(int from, int to) async {
    final ok = await useMidiaLocals(context, listen: false).move(from, to);
    if (!ok && mounted) {
      showResult(
        context,
        ok: false,
        success: '',
        error: 'Não foi possível salvar a ordem',
      );
    }
  }

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
    if (_reordering) return _buildReorder(midias);

    return ListPage(
      icon: Icons.campaign_outlined,
      title: 'Mídia Liderança',
      header: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        spacing: 12,
        children: [
          PageHeader(
            icon: Icons.campaign_outlined,
            title: 'Mídia Liderança',
            subtitle: 'Na Agenda Semanal os cards aparecem nesta ordem',
          ),
          if (midias.midias.length > 1)
            Align(
              alignment: Alignment.centerRight,
              child: OutlinedButton.icon(
                onPressed: () => setState(() => _reordering = true),
                icon: const Icon(Icons.swap_vert),
                label: const Text('Ordenar'),
              ),
            ),
        ],
      ),
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

  Widget _buildReorder(MidiaLocalsHook midias) {
    final scheme = Theme.of(context).colorScheme;
    return Column(
      children: [
        Padding(
          padding: const EdgeInsets.fromLTRB(16, 16, 16, 8),
          child: Row(
            children: [
              const Expanded(
                child: Text(
                  'Segure ⠿ e arraste para mudar a ordem',
                  style: TextStyle(fontWeight: FontWeight.w600),
                ),
              ),
              FilledButton.icon(
                onPressed: () => setState(() => _reordering = false),
                icon: const Icon(Icons.check),
                label: const Text('Concluir'),
              ),
            ],
          ),
        ),
        Expanded(
          child: ReorderableListView.builder(
            padding: const EdgeInsets.fromLTRB(16, 8, 16, 32),
            buildDefaultDragHandles: false,
            itemCount: midias.midias.length,
            onReorderItem: _move,
            itemBuilder: (context, i) {
              final midia = midias.midias[i];
              return Card(
                key: ValueKey(midia.id),
                margin: const EdgeInsets.only(bottom: 10),
                child: ListTile(
                  leading: CircleAvatar(
                    backgroundColor: scheme.primary,
                    foregroundColor: scheme.onPrimary,
                    child: Text('${i + 1}'),
                  ),
                  title: Text(
                    midia.title,
                    style: const TextStyle(fontWeight: FontWeight.w600),
                  ),
                  subtitle: Text(
                    [
                      formatDate(midia.date),
                      ?midia.time,
                    ].where((t) => t.isNotEmpty).join(' • '),
                  ),
                  trailing: ReorderableDragStartListener(
                    index: i,
                    child: const Padding(
                      padding: EdgeInsets.all(8),
                      child: Icon(Icons.drag_indicator),
                    ),
                  ),
                ),
              );
            },
          ),
        ),
      ],
    );
  }
}
