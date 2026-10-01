import 'package:flutter/material.dart';
import 'package:raraapp/api/cura_api.dart';
import 'package:raraapp/components/cura/cura_detail_dialog.dart';
import 'package:raraapp/components/cura/cura_edit_dialog.dart';
import 'package:raraapp/components/cura/cura_labels.dart';
import 'package:raraapp/components/cura/cura_simple_list.dart';
import 'package:raraapp/components/shared/effects/fade_slide_in.dart';
import 'package:raraapp/components/shared/entity_card.dart';
import 'package:raraapp/components/shared/feedback.dart';
import 'package:raraapp/components/shared/format.dart';
import 'package:raraapp/components/shared/initials_avatar.dart';
import 'package:raraapp/components/shared/list_page.dart';
import 'package:raraapp/components/shared/page_header.dart';
import 'package:raraapp/components/shared/tag.dart';
import 'package:raraapp/components/shared/whatsapp.dart';
import 'package:raraapp/hooks/use_curas.dart';

/// Pedidos de cura do gestor, em duas visões à escolha:
/// quadro (arrastar o card muda o status) ou lista simples (caixinhas).
class CuraBoardPage extends StatefulWidget {
  const CuraBoardPage({super.key});

  @override
  State<CuraBoardPage> createState() => _CuraBoardPageState();
}

class _CuraBoardPageState extends State<CuraBoardPage> {
  String _query = '';

  /// Busca da lista simples: nome, telefone ou email de quem pediu.
  List<Cura> _search(List<Cura> curas) {
    final q = _query.trim().toLowerCase();
    if (q.isEmpty) return curas;
    final digits = q.replaceAll(RegExp(r'[^0-9]'), '');
    return curas.where((c) {
      final u = c.user;
      if (u == null) return false;
      return u.name.toLowerCase().contains(q) ||
          u.email.toLowerCase().contains(q) ||
          (digits.isNotEmpty &&
              (u.phone ?? '')
                  .replaceAll(RegExp(r'[^0-9]'), '')
                  .contains(digits));
    }).toList();
  }

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      final curas = useCuras(context, listen: false);
      curas.loadView();
      curas.loadAll();
    });
  }

  Future<void> _move(Cura cura, String status) async {
    final curas = useCuras(context, listen: false);
    final ok = await curas.moveTo(cura, status);
    if (!ok && mounted) {
      showResult(context, ok: false, success: '', error: curas.error);
    }
  }

  Future<void> _delete(Cura cura) async {
    final name = cura.user?.name ?? 'este pedido';
    if (!await confirmDelete(
      context,
      title: 'Deletar Pedido',
      itemName: name,
    )) {
      return;
    }
    if (!mounted) return;
    final curas = useCuras(context, listen: false);
    final ok = await curas.remove(cura.id);
    if (!mounted) return;
    showResult(
      context,
      ok: ok,
      success: 'Pedido deletado com sucesso!',
      error: curas.error,
    );
  }

  @override
  Widget build(BuildContext context) {
    final curas = useCuras(context);
    final loading = curas.isLoading && curas.all.isEmpty;
    final simple = curas.view == CuraView.simple;

    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        Padding(
          padding: const EdgeInsets.fromLTRB(16, 16, 16, 12),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            spacing: 12,
            children: [
              PageHeader(
                icon: Icons.healing_outlined,
                title: 'Cura da Alma Liderança',
                subtitle: simple
                    ? 'Marque as caixinhas conforme o atendimento'
                    : 'Segure e arraste o card para mudar o status',
                trailing: IconButton(
                  tooltip: 'Atualizar',
                  onPressed: curas.loadAll,
                  icon: const Icon(Icons.refresh),
                ),
              ),
              // Escolha da visão (fica salva no aparelho)
              SegmentedButton<CuraView>(
                showSelectedIcon: false,
                segments: const [
                  ButtonSegment(
                    value: CuraView.simple,
                    icon: Icon(Icons.checklist),
                    label: Text('Lista simples'),
                  ),
                  ButtonSegment(
                    value: CuraView.board,
                    icon: Icon(Icons.view_kanban_outlined),
                    label: Text('Quadro'),
                  ),
                ],
                selected: {curas.view},
                onSelectionChanged: (v) => curas.setView(v.first),
              ),
              if (simple)
                TextField(
                  onChanged: (value) => setState(() => _query = value),
                  decoration: const InputDecoration(
                    hintText: 'Buscar por nome, telefone ou email...',
                    prefixIcon: Icon(Icons.search),
                  ),
                ),
            ],
          ),
        ),
        Expanded(
          child: AnimatedSwitcher(
            duration: const Duration(milliseconds: 300),
            child: simple
                ? CuraSimpleList(
                    key: const ValueKey('simple'),
                    curas: _search(curas.all),
                    loading: loading,
                    onRefresh: curas.loadAll,
                    onMove: _move,
                    onDelete: _delete,
                  )
                : _Board(
                    key: const ValueKey('board'),
                    loading: loading,
                    onMove: _move,
                    onDelete: _delete,
                  ),
          ),
        ),
      ],
    );
  }
}

/// Quadro: uma coluna por status, rolando para o lado.
class _Board extends StatelessWidget {
  final bool loading;
  final void Function(Cura, String) onMove;
  final ValueChanged<Cura> onDelete;

  const _Board({
    super.key,
    required this.loading,
    required this.onMove,
    required this.onDelete,
  });

  @override
  Widget build(BuildContext context) {
    final curas = useCuras(context);
    // Cancelados aparecem numa coluna só de consulta (não recebe cards)
    const columns = [...curaStatuses, curaCancelled];

    return LayoutBuilder(
      builder: (context, constraints) {
        // Cada coluna ocupa quase a tela toda; a próxima "espia" do lado
        // Colunas estreitas (51% da tela) para ver mais de uma por vez
        final width = constraints.maxWidth * 0.51;
        return ListView(
          scrollDirection: Axis.horizontal,
          padding: const EdgeInsets.fromLTRB(16, 0, 16, 16),
          children: [
            for (final (i, status) in columns.indexed) ...[
              if (i > 0) const SizedBox(width: 12),
              FadeSlideIn(
                delay: stagger(i),
                child: SizedBox(
                  width: width,
                  child: _Column(
                    status: status,
                    curas: curas.byStatus(status),
                    loading: loading,
                    cardWidth: width - 24,
                    readOnly: status == curaCancelled,
                    onDrop: (cura) => onMove(cura, status),
                    onMove: onMove,
                    onDelete: onDelete,
                  ),
                ),
              ),
            ],
          ],
        );
      },
    );
  }
}

class _Column extends StatelessWidget {
  final String status;
  final List<Cura> curas;
  final bool loading;
  final double cardWidth;
  final bool readOnly;
  final ValueChanged<Cura> onDrop;
  final void Function(Cura, String) onMove;
  final ValueChanged<Cura> onDelete;

  const _Column({
    required this.status,
    required this.curas,
    required this.loading,
    required this.cardWidth,
    this.readOnly = false,
    required this.onDrop,
    required this.onMove,
    required this.onDelete,
  });

  @override
  Widget build(BuildContext context) {
    final scheme = Theme.of(context).colorScheme;
    final text = Theme.of(context).textTheme;

    return DragTarget<Cura>(
      onWillAcceptWithDetails: (details) =>
          !readOnly && details.data.status != status,
      onAcceptWithDetails: (details) => onDrop(details.data),
      builder: (context, candidates, _) {
        final hovering = candidates.isNotEmpty;
        return AnimatedContainer(
          duration: const Duration(milliseconds: 200),
          decoration: BoxDecoration(
            color: hovering
                ? scheme.primary.withValues(alpha: 0.10)
                : scheme.surfaceContainerLow,
            borderRadius: BorderRadius.circular(22),
            border: Border.all(
              color: hovering ? scheme.primary : scheme.outlineVariant,
              width: hovering ? 2 : 1,
            ),
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              Padding(
                padding: const EdgeInsets.fromLTRB(16, 14, 12, 10),
                child: Row(
                  children: [
                    Container(
                      width: 10,
                      height: 10,
                      decoration: BoxDecoration(
                        color: curaStatusColor(context, status),
                        shape: BoxShape.circle,
                        border: Border.all(color: scheme.onSurface),
                      ),
                    ),
                    const SizedBox(width: 10),
                    Expanded(
                      child: Text(
                        curaStatusLabels[status]!,
                        style: text.titleMedium?.copyWith(
                          fontWeight: FontWeight.w700,
                        ),
                      ),
                    ),
                    Container(
                      padding: const EdgeInsets.symmetric(
                        horizontal: 10,
                        vertical: 2,
                      ),
                      decoration: BoxDecoration(
                        color: scheme.primary,
                        borderRadius: BorderRadius.circular(999),
                      ),
                      child: Text(
                        '${curas.length}',
                        style: text.labelLarge?.copyWith(
                          color: scheme.onPrimary,
                          fontWeight: FontWeight.w700,
                        ),
                      ),
                    ),
                  ],
                ),
              ),
              Expanded(
                child: ListView(
                  padding: const EdgeInsets.fromLTRB(12, 0, 12, 12),
                  children: [
                    if (loading)
                      for (var i = 0; i < 2; i++) ...[
                        const CardSkeleton(),
                        const SizedBox(height: 10),
                      ]
                    else if (curas.isEmpty)
                      Padding(
                        padding: const EdgeInsets.symmetric(vertical: 32),
                        child: Text(
                          readOnly ? 'Nenhum pedido' : 'Solte um card aqui',
                          textAlign: TextAlign.center,
                          style: TextStyle(
                            color: scheme.onSurface.withValues(alpha: 0.5),
                          ),
                        ),
                      ),
                    for (final cura in curas) ...[
                      if (readOnly)
                        _Card(cura: cura, onDelete: () => onDelete(cura))
                      else
                        LongPressDraggable<Cura>(
                          key: ValueKey(cura.id),
                          data: cura,
                          feedback: SizedBox(
                            width: cardWidth,
                            child: Transform.rotate(
                              angle: 0.03,
                              child: Material(
                                color: Colors.transparent,
                                elevation: 12,
                                borderRadius: BorderRadius.circular(18),
                                child: _Card(cura: cura),
                              ),
                            ),
                          ),
                          childWhenDragging: Opacity(
                            opacity: 0.3,
                            child: _Card(cura: cura),
                          ),
                          child: _Card(
                            cura: cura,
                            onMove: (to) => onMove(cura, to),
                            onDelete: () => onDelete(cura),
                          ),
                        ),
                      const SizedBox(height: 10),
                    ],
                  ],
                ),
              ),
            ],
          ),
        );
      },
    );
  }
}

class _Card extends StatelessWidget {
  final Cura cura;
  final ValueChanged<String>? onMove;
  final VoidCallback? onDelete;

  const _Card({required this.cura, this.onMove, this.onDelete});

  @override
  Widget build(BuildContext context) {
    final phone = cura.user?.phone ?? '';

    return Card(
      clipBehavior: Clip.antiAlias,
      child: InkWell(
        onTap: () => CuraDetailDialog.show(context, cura),
        child: Padding(
          padding: const EdgeInsets.fromLTRB(16, 8, 4, 16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            spacing: 8,
            children: [
              Row(
                children: [
                  InitialsAvatar(cura.user?.name ?? '?', size: 36),
                  const SizedBox(width: 10),
                  Expanded(
                    child: Text(
                      cura.user?.name ?? 'Sem nome',
                      overflow: TextOverflow.ellipsis,
                      style: Theme.of(context).textTheme.titleSmall?.copyWith(
                        fontWeight: FontWeight.w700,
                      ),
                    ),
                  ),
                  if (onDelete != null)
                    ItemMenu(
                      onEdit: () => CuraEditDialog.show(context, cura),
                      onDelete: onDelete,
                      extra: [
                        for (final status in curaStatuses)
                          if (status != cura.status)
                            PopupMenuItem(
                              onTap: () => onMove?.call(status),
                              child: ListTile(
                                contentPadding: EdgeInsets.zero,
                                leading: const Icon(Icons.arrow_forward),
                                title: Text(
                                  'Mover para ${curaStatusLabels[status]}',
                                ),
                              ),
                            ),
                      ],
                    )
                  else
                    const SizedBox(height: 48),
                ],
              ),
              Padding(
                padding: const EdgeInsets.only(right: 12),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  spacing: 8,
                  children: [
                    Wrap(
                      spacing: 8,
                      runSpacing: 8,
                      children: [
                        Tag(
                          curaTypeLabels[cura.type] ?? cura.type,
                          icon: curaTypeIcons[cura.type],
                        ),
                        Tag(
                          formatDate(cura.createdAt),
                          icon: Icons.event_outlined,
                        ),
                      ],
                    ),
                    if (phone.isNotEmpty) WhatsAppLink(phone),
                    if ((cura.notes ?? '').isNotEmpty)
                      CuraNotes(cura.notes!, maxLines: 2),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
