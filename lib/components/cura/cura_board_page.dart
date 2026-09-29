import 'package:flutter/material.dart';
import 'package:raraapp/api/cura_api.dart';
import 'package:raraapp/components/cura/cura_detail_dialog.dart';
import 'package:raraapp/components/cura/cura_edit_dialog.dart';
import 'package:raraapp/components/cura/cura_labels.dart';
import 'package:raraapp/components/shared/feedback.dart';
import 'package:raraapp/components/shared/format.dart';
import 'package:raraapp/components/shared/whatsapp.dart';
import 'package:raraapp/hooks/use_curas.dart';

/// Kanban de pedidos de cura (arrastar o card muda o status).
class CuraBoardPage extends StatefulWidget {
  const CuraBoardPage({super.key});

  @override
  State<CuraBoardPage> createState() => _CuraBoardPageState();
}

class _CuraBoardPageState extends State<CuraBoardPage> {
  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback(
      (_) => useCuras(context, listen: false).loadAll(),
    );
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

    return Scaffold(
      appBar: AppBar(
        title: const Text('Gerenciamento de Cura'),
        centerTitle: true,
      ),
      body: curas.isLoading && curas.all.isEmpty
          ? const Center(child: CircularProgressIndicator())
          : SingleChildScrollView(
              scrollDirection: Axis.horizontal,
              child: Row(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  for (final status in curaStatuses)
                    _Column(
                      status: status,
                      curas: curas.byStatus(status),
                      onDrop: (cura) => _move(cura, status),
                      onDelete: _delete,
                    ),
                ],
              ),
            ),
    );
  }
}

class _Column extends StatelessWidget {
  final String status;
  final List<Cura> curas;
  final ValueChanged<Cura> onDrop;
  final ValueChanged<Cura> onDelete;

  const _Column({
    required this.status,
    required this.curas,
    required this.onDrop,
    required this.onDelete,
  });

  @override
  Widget build(BuildContext context) {
    final color = curaStatusColors[status] ?? Colors.grey;

    return Container(
      width: 320,
      margin: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: Colors.grey[100],
        borderRadius: BorderRadius.circular(8),
      ),
      child: Column(
        children: [
          Container(
            padding: const EdgeInsets.all(12),
            decoration: BoxDecoration(
              color: color,
              borderRadius: const BorderRadius.vertical(
                top: Radius.circular(8),
              ),
            ),
            child: Row(
              children: [
                Expanded(
                  child: Text(
                    curaStatusLabels[status]!,
                    style: const TextStyle(
                      color: Colors.white,
                      fontSize: 16,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ),
                CircleAvatar(
                  radius: 12,
                  backgroundColor: Colors.white,
                  child: Text(
                    '${curas.length}',
                    style: TextStyle(
                      color: color,
                      fontSize: 12,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ),
              ],
            ),
          ),
          SizedBox(
            height: MediaQuery.of(context).size.height - 200,
            child: DragTarget<Cura>(
              onWillAcceptWithDetails: (details) =>
                  details.data.status != status,
              onAcceptWithDetails: (details) => onDrop(details.data),
              builder: (context, candidates, _) => Container(
                color: candidates.isEmpty ? null : color.withValues(alpha: 0.1),
                child: ListView(
                  padding: const EdgeInsets.all(12),
                  children: [
                    for (final cura in curas)
                      Draggable<Cura>(
                        key: ValueKey(cura.id),
                        data: cura,
                        feedback: SizedBox(
                          width: 290,
                          child: Material(
                            elevation: 8,
                            child: _Card(cura: cura),
                          ),
                        ),
                        childWhenDragging: Opacity(
                          opacity: 0.4,
                          child: _Card(cura: cura),
                        ),
                        child: _Card(
                          cura: cura,
                          onDelete: () => onDelete(cura),
                        ),
                      ),
                  ],
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}

class _Card extends StatelessWidget {
  final Cura cura;
  final VoidCallback? onDelete;

  const _Card({required this.cura, this.onDelete});

  @override
  Widget build(BuildContext context) {
    final phone = cura.user?.phone ?? '';

    return Card(
      margin: const EdgeInsets.only(bottom: 12),
      child: Padding(
        padding: const EdgeInsets.all(12),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                Expanded(
                  child: Text(
                    cura.user?.name ?? 'Sem nome',
                    style: const TextStyle(fontWeight: FontWeight.bold),
                    overflow: TextOverflow.ellipsis,
                  ),
                ),
                if (onDelete != null)
                  PopupMenuButton(
                    itemBuilder: (_) => [
                      PopupMenuItem(
                        onTap: () => CuraDetailDialog.show(context, cura),
                        child: const Text('Abrir Informações'),
                      ),
                      PopupMenuItem(
                        onTap: () => CuraEditDialog.show(context, cura),
                        child: const Text('Editar'),
                      ),
                      PopupMenuItem(
                        onTap: onDelete,
                        child: const Text(
                          'Deletar',
                          style: TextStyle(color: Colors.red),
                        ),
                      ),
                    ],
                  ),
              ],
            ),
            if (phone.isNotEmpty) WhatsAppLink(phone),
            const SizedBox(height: 8),
            Text(
              curaTypeLabels[cura.type] ?? cura.type,
              style: const TextStyle(
                fontSize: 12,
                color: Colors.blue,
                fontWeight: FontWeight.w500,
              ),
            ),
            if ((cura.notes ?? '').isNotEmpty) ...[
              const SizedBox(height: 8),
              CuraNotes(cura.notes!, maxLines: 2),
            ],
            const SizedBox(height: 8),
            Text(
              formatDate(cura.createdAt),
              style: const TextStyle(
                fontSize: 10,
                color: Colors.grey,
                fontStyle: FontStyle.italic,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
