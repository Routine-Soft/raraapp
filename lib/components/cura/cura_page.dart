import 'package:flutter/material.dart';
import 'package:raraapp/api/cura_api.dart';
import 'package:raraapp/components/cura/cura_labels.dart';
import 'package:raraapp/components/shared/entity_card.dart';
import 'package:raraapp/components/shared/feedback.dart';
import 'package:raraapp/components/shared/format.dart';
import 'package:raraapp/components/shared/info_line.dart';
import 'package:raraapp/components/shared/list_page.dart';
import 'package:raraapp/hooks/use_curas.dart';

/// Pedidos de cura do membro logado.
class CuraPage extends StatefulWidget {
  const CuraPage({super.key});

  @override
  State<CuraPage> createState() => _CuraPageState();
}

class _CuraPageState extends State<CuraPage> {
  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback(
      (_) => useCuras(context, listen: false).loadMine(),
    );
  }

  Future<void> _request() async {
    final type = await showModalBottomSheet<String>(
      context: context,
      builder: (sheetContext) => SafeArea(
        child: Padding(
          padding: const EdgeInsets.fromLTRB(16, 0, 16, 16),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.stretch,
            spacing: 8,
            children: [
              Text(
                'Novo pedido',
                style: Theme.of(
                  sheetContext,
                ).textTheme.titleLarge?.copyWith(fontWeight: FontWeight.w800),
              ),
              const Text('Escolha o tipo de atendimento'),
              const SizedBox(height: 8),
              for (final type in curaTypes)
                Card(
                  clipBehavior: Clip.antiAlias,
                  child: ListTile(
                    leading: Icon(curaTypeIcons[type]),
                    title: Text(
                      curaTypeLabels[type]!,
                      style: const TextStyle(fontWeight: FontWeight.w600),
                    ),
                    trailing: const Icon(Icons.chevron_right),
                    onTap: () => Navigator.pop(sheetContext, type),
                  ),
                ),
            ],
          ),
        ),
      ),
    );
    if (type == null || !mounted) return;

    final curas = useCuras(context, listen: false);
    final ok = await curas.create(type);
    if (!mounted) return;
    showResult(
      context,
      ok: ok,
      success: 'Pedido de cura criado com sucesso!',
      error: curas.error,
    );
  }

  Future<void> _cancel(Cura cura) async {
    final confirmed = await showDialog<bool>(
      context: context,
      builder: (dialogContext) {
        final scheme = Theme.of(dialogContext).colorScheme;
        return AlertDialog(
          icon: Icon(Icons.event_busy, color: scheme.error, size: 36),
          title: const Text('Cancelar pedido?'),
          content: Text(
            'Seu pedido de ${curaTypeLabels[cura.type] ?? cura.type} será '
            'cancelado. Se precisar, você pode fazer um novo pedido depois.',
            textAlign: TextAlign.center,
          ),
          actionsPadding: const EdgeInsets.fromLTRB(24, 0, 24, 24),
          actions: [
            Row(
              spacing: 12,
              children: [
                Expanded(
                  child: OutlinedButton(
                    onPressed: () => Navigator.pop(dialogContext, false),
                    child: const Text('Voltar'),
                  ),
                ),
                Expanded(
                  child: ElevatedButton(
                    style: ElevatedButton.styleFrom(
                      backgroundColor: scheme.error,
                      foregroundColor: scheme.onError,
                    ),
                    onPressed: () => Navigator.pop(dialogContext, true),
                    child: const Text('Cancelar pedido'),
                  ),
                ),
              ],
            ),
          ],
        );
      },
    );
    if (confirmed != true || !mounted) return;

    final curas = useCuras(context, listen: false);
    final ok = await curas.cancel(cura);
    if (!mounted) return;
    showResult(
      context,
      ok: ok,
      success: 'Pedido cancelado',
      error: curas.error,
    );
  }

  @override
  Widget build(BuildContext context) {
    final curas = useCuras(context);

    return ListPage(
      icon: Icons.favorite_outline,
      title: 'Cura da Alma',
      subtitle: 'Acompanhe seus pedidos de cura',
      loading: curas.isLoading,
      onRefresh: curas.loadMine,
      emptyIcon: Icons.healing_outlined,
      emptyMessage: 'Nenhum pedido de cura criado',
      onAdd: _request,
      addLabel: 'Novo pedido',
      children: [
        for (final cura in curas.mine)
          _CuraCard(
            cura: cura,
            onCancel: cura.isOpen && !curas.isLoading
                ? () => _cancel(cura)
                : null,
          ),
      ],
    );
  }
}

class _CuraCard extends StatelessWidget {
  final Cura cura;
  final VoidCallback? onCancel;

  const _CuraCard({required this.cura, this.onCancel});

  @override
  Widget build(BuildContext context) {
    return EntityCard(
      title: curaTypeLabels[cura.type] ?? cura.type,
      icon: curaTypeIcons[cura.type],
      children: [
        CuraStatusBadge(cura.status),
        const SizedBox(height: 4),
        InfoLine(
          'Criado em',
          formatDate(cura.createdAt),
          icon: Icons.event_outlined,
        ),
        if (cura.status == 'concluido')
          InfoLine(
            'Concluído em',
            formatDate(cura.completedAt),
            icon: Icons.event_available_outlined,
          ),
        if (cura.status == curaCancelled)
          InfoLine(
            'Cancelado em',
            formatDate(cura.cancelledAt),
            icon: Icons.event_busy_outlined,
          ),
        if ((cura.notes ?? '').isNotEmpty) ...[
          const SizedBox(height: 4),
          CuraNotes(cura.notes!),
        ],
        if (onCancel != null) ...[
          const SizedBox(height: 8),
          Align(
            alignment: Alignment.centerLeft,
            child: OutlinedButton.icon(
              style: OutlinedButton.styleFrom(
                foregroundColor: Theme.of(context).colorScheme.error,
                side: BorderSide(color: Theme.of(context).colorScheme.error),
              ),
              onPressed: onCancel,
              icon: const Icon(Icons.event_busy_outlined),
              label: const Text('Cancelar pedido'),
            ),
          ),
        ],
      ],
    );
  }
}
