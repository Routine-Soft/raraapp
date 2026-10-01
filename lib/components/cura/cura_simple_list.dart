import 'package:flutter/material.dart';
import 'package:raraapp/api/cura_api.dart';
import 'package:raraapp/components/cura/cura_detail_dialog.dart';
import 'package:raraapp/components/cura/cura_edit_dialog.dart';
import 'package:raraapp/components/cura/cura_labels.dart';
import 'package:raraapp/components/shared/effects/fade_slide_in.dart';
import 'package:raraapp/components/shared/empty_state.dart';
import 'package:raraapp/components/shared/entity_card.dart';
import 'package:raraapp/components/shared/format.dart';
import 'package:raraapp/components/shared/initials_avatar.dart';
import 'package:raraapp/components/shared/list_page.dart';
import 'package:raraapp/components/shared/whatsapp.dart';

/// Filtros da lista simples.
enum _Filter { pending, done, interrupted, cancelled }

/// Visão simples dos pedidos, pensada para quem tem dificuldade com o
/// quadro: letra grande, um pedido por card e caixinhas para marcar
/// "Atendimento iniciado" e "Atendimento concluído". Nada de arrastar.
class CuraSimpleList extends StatefulWidget {
  final List<Cura> curas;
  final bool loading;
  final Future<void> Function() onRefresh;
  final void Function(Cura, String) onMove;
  final ValueChanged<Cura> onDelete;

  const CuraSimpleList({
    super.key,
    required this.curas,
    required this.loading,
    required this.onRefresh,
    required this.onMove,
    required this.onDelete,
  });

  @override
  State<CuraSimpleList> createState() => _CuraSimpleListState();
}

class _CuraSimpleListState extends State<CuraSimpleList> {
  _Filter _filter = _Filter.pending;

  bool _matches(Cura cura, _Filter filter) => switch (filter) {
    _Filter.pending => cura.isOpen,
    _Filter.done => cura.status == 'concluido',
    _Filter.interrupted => cura.status == 'interrompido',
    _Filter.cancelled => cura.status == curaCancelled,
  };

  @override
  Widget build(BuildContext context) {
    final list = widget.curas.where((c) => _matches(c, _filter)).toList();
    int count(_Filter f) => widget.curas.where((c) => _matches(c, f)).length;

    final filters = [
      (_Filter.pending, 'Pendentes', Icons.pending_actions),
      (_Filter.done, 'Concluídos', Icons.task_alt),
      (_Filter.interrupted, 'Interrompidos', Icons.pause_circle_outline),
      (_Filter.cancelled, 'Cancelados', Icons.event_busy_outlined),
    ];

    return RefreshIndicator(
      onRefresh: widget.onRefresh,
      child: ListView(
        physics: const AlwaysScrollableScrollPhysics(),
        padding: const EdgeInsets.fromLTRB(16, 4, 16, 32),
        children: [
          Wrap(
            spacing: 8,
            runSpacing: 8,
            children: [
              for (final (filter, label, icon) in filters)
                _FilterPill(
                  icon: icon,
                  label: '$label (${count(filter)})',
                  selected: _filter == filter,
                  onTap: () => setState(() => _filter = filter),
                ),
            ],
          ),
          const SizedBox(height: 16),
          if (widget.loading)
            for (var i = 0; i < 3; i++) ...[
              const CardSkeleton(),
              const SizedBox(height: 12),
            ]
          else if (list.isEmpty)
            EmptyState(
              icon: filters.firstWhere((f) => f.$1 == _filter).$3,
              message: switch (_filter) {
                _Filter.pending => 'Nenhum pedido pendente',
                _Filter.done => 'Nenhum pedido concluído',
                _Filter.interrupted => 'Nenhum pedido interrompido',
                _Filter.cancelled => 'Nenhum pedido cancelado',
              },
            )
          else
            for (final (i, cura) in list.indexed) ...[
              FadeSlideIn(
                key: ValueKey(cura.id),
                delay: stagger(i.clamp(0, 8), stepMs: 50),
                child: _SimpleCard(
                  cura: cura,
                  onMove: (status) => widget.onMove(cura, status),
                  onDelete: () => widget.onDelete(cura),
                ),
              ),
              const SizedBox(height: 12),
            ],
        ],
      ),
    );
  }
}

class _SimpleCard extends StatelessWidget {
  final Cura cura;
  final ValueChanged<String> onMove;
  final VoidCallback onDelete;

  const _SimpleCard({
    required this.cura,
    required this.onMove,
    required this.onDelete,
  });

  @override
  Widget build(BuildContext context) {
    final text = Theme.of(context).textTheme;
    final scheme = Theme.of(context).colorScheme;
    final phone = cura.user?.phone ?? '';
    final started = const [
      'andamento',
      'concluido',
      'interrompido',
    ].contains(cura.status);
    final done = cura.status == 'concluido';
    final interrupted = cura.status == 'interrompido';
    final cancelled = cura.status == curaCancelled;

    return Card(
      child: Padding(
        padding: const EdgeInsets.fromLTRB(20, 12, 8, 16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          spacing: 10,
          children: [
            Row(
              children: [
                InitialsAvatar(cura.user?.name ?? '?', size: 48),
                const SizedBox(width: 14),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        cura.user?.name ?? 'Sem nome',
                        style: text.titleLarge?.copyWith(
                          fontWeight: FontWeight.w800,
                        ),
                      ),
                      Text(
                        '${curaTypeLabels[cura.type] ?? cura.type} • '
                        'pedido em ${formatDate(cura.createdAt)}',
                        style: text.bodyLarge?.copyWith(
                          color: scheme.onSurface.withValues(alpha: 0.75),
                        ),
                      ),
                    ],
                  ),
                ),
                ItemMenu(
                  onEdit: () => CuraEditDialog.show(context, cura),
                  onDelete: onDelete,
                ),
              ],
            ),
            Padding(
              padding: const EdgeInsets.only(right: 12),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                spacing: 10,
                children: [
                  if (cancelled)
                    _CancelledNotice(cura: cura, onReopen: onMove)
                  else ...[
                    _Step(
                      label: 'Atendimento iniciado',
                      checked: started,
                      // Desmarcar volta para a fila (e desfaz o concluído)
                      onChanged: (v) => onMove(v ? 'andamento' : 'fila_espera'),
                    ),
                    _Step(
                      label: 'Atendimento concluído',
                      checked: done,
                      onChanged: (v) => onMove(v ? 'concluido' : 'andamento'),
                    ),
                    _Step(
                      label: 'Atendimento interrompido',
                      checked: interrupted,
                      onChanged: (v) =>
                          onMove(v ? 'interrompido' : 'andamento'),
                    ),
                  ],
                  if ((cura.notes ?? '').isNotEmpty) CuraNotes(cura.notes!),
                  Wrap(
                    spacing: 8,
                    runSpacing: 8,
                    crossAxisAlignment: WrapCrossAlignment.center,
                    children: [
                      if (phone.isNotEmpty) WhatsAppLink(phone),
                      TextButton.icon(
                        onPressed: () => CuraDetailDialog.show(context, cura),
                        icon: const Icon(Icons.person_search),
                        label: const Text('Ver dados'),
                      ),
                    ],
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}

/// Caixinha grande de marcar, com o texto do passo.
class _Step extends StatelessWidget {
  final String label;
  final bool checked;
  final ValueChanged<bool> onChanged;

  const _Step({
    required this.label,
    required this.checked,
    required this.onChanged,
  });

  @override
  Widget build(BuildContext context) {
    final scheme = Theme.of(context).colorScheme;
    final radius = BorderRadius.circular(14);

    return Material(
      color: Colors.transparent,
      child: InkWell(
        borderRadius: radius,
        onTap: () => onChanged(!checked),
        child: AnimatedContainer(
          duration: const Duration(milliseconds: 200),
          padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 6),
          decoration: BoxDecoration(
            borderRadius: radius,
            color: checked
                ? scheme.primary.withValues(alpha: 0.14)
                : Colors.transparent,
            border: Border.all(
              color: checked ? scheme.primary : scheme.outlineVariant,
              width: checked ? 2 : 1,
            ),
          ),
          child: Row(
            children: [
              Transform.scale(
                scale: 1.3,
                child: Checkbox(
                  value: checked,
                  onChanged: (v) => onChanged(v ?? false),
                ),
              ),
              const SizedBox(width: 4),
              Expanded(
                child: Text(
                  label,
                  style: Theme.of(context).textTheme.titleMedium?.copyWith(
                    fontWeight: checked ? FontWeight.w800 : FontWeight.w500,
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

/// Aviso de pedido cancelado pelo membro, com opção de reabrir.
class _CancelledNotice extends StatelessWidget {
  final Cura cura;
  final ValueChanged<String> onReopen;

  const _CancelledNotice({required this.cura, required this.onReopen});

  @override
  Widget build(BuildContext context) {
    final scheme = Theme.of(context).colorScheme;
    return Container(
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: scheme.error.withValues(alpha: 0.12),
        borderRadius: BorderRadius.circular(14),
        border: Border.all(color: scheme.error),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        spacing: 8,
        children: [
          Row(
            children: [
              Icon(Icons.event_busy, color: scheme.error),
              const SizedBox(width: 8),
              Expanded(
                child: Text(
                  'Cancelado pelo membro em ${formatDate(cura.cancelledAt)}',
                  style: const TextStyle(fontWeight: FontWeight.w700),
                ),
              ),
            ],
          ),
          OutlinedButton.icon(
            onPressed: () => onReopen('fila_espera'),
            icon: const Icon(Icons.undo),
            label: const Text('Reabrir pedido'),
          ),
        ],
      ),
    );
  }
}

/// Filtro em pílula: o selecionado fica preenchido com a cor principal.
class _FilterPill extends StatelessWidget {
  final IconData icon;
  final String label;
  final bool selected;
  final VoidCallback onTap;

  const _FilterPill({
    required this.icon,
    required this.label,
    required this.selected,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    final scheme = Theme.of(context).colorScheme;
    final color = selected ? scheme.onPrimary : scheme.onSurface;
    final radius = BorderRadius.circular(999);

    return Semantics(
      button: true,
      selected: selected,
      child: Material(
        color: Colors.transparent,
        child: InkWell(
          borderRadius: radius,
          onTap: onTap,
          child: AnimatedContainer(
            duration: const Duration(milliseconds: 200),
            padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
            decoration: BoxDecoration(
              color: selected ? scheme.primary : Colors.transparent,
              borderRadius: radius,
              border: Border.all(
                color: selected ? scheme.primary : scheme.outline,
              ),
            ),
            child: Row(
              mainAxisSize: MainAxisSize.min,
              children: [
                Icon(icon, size: 20, color: color),
                const SizedBox(width: 8),
                Text(
                  label,
                  style: TextStyle(color: color, fontWeight: FontWeight.w700),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
