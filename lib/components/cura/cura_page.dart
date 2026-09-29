import 'package:flutter/material.dart';
import 'package:raraapp/api/cura_api.dart';
import 'package:raraapp/components/cura/cura_labels.dart';
import 'package:raraapp/components/shared/empty_state.dart';
import 'package:raraapp/components/shared/feedback.dart';
import 'package:raraapp/components/shared/format.dart';
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
    final type = await showDialog<String>(
      context: context,
      builder: (dialogContext) => SimpleDialog(
        title: const Text('Novo Pedido de Cura'),
        children: [
          for (final type in curaTypes)
            SimpleDialogOption(
              onPressed: () => Navigator.pop(dialogContext, type),
              child: Text(
                curaTypeLabels[type]!,
                style: const TextStyle(fontSize: 16),
              ),
            ),
        ],
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

  @override
  Widget build(BuildContext context) {
    final curas = useCuras(context);

    Widget body;
    if (curas.isLoading && curas.mine.isEmpty) {
      body = const Center(child: CircularProgressIndicator());
    } else if (curas.mine.isEmpty) {
      body = EmptyState(
        icon: Icons.healing,
        message: 'Nenhum pedido de cura criado',
        actionLabel: 'Criar Novo Pedido',
        onAction: _request,
      );
    } else {
      body = RefreshIndicator(
        onRefresh: curas.loadMine,
        child: ListView(
          padding: const EdgeInsets.all(16),
          children: [for (final cura in curas.mine) _CuraCard(cura: cura)],
        ),
      );
    }

    return Scaffold(
      appBar: AppBar(title: const Text('Minha Cura'), centerTitle: true),
      floatingActionButton: FloatingActionButton(
        onPressed: _request,
        child: const Icon(Icons.add),
      ),
      body: body,
    );
  }
}

class _CuraCard extends StatelessWidget {
  final Cura cura;

  const _CuraCard({required this.cura});

  Widget _date(String label, DateTime? date) => Column(
    crossAxisAlignment: CrossAxisAlignment.start,
    children: [
      Text(label, style: const TextStyle(fontSize: 12, color: Colors.grey)),
      Text(
        formatDate(date),
        style: const TextStyle(fontWeight: FontWeight.w500),
      ),
    ],
  );

  @override
  Widget build(BuildContext context) {
    return Card(
      margin: const EdgeInsets.only(bottom: 12),
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              curaTypeLabels[cura.type] ?? cura.type,
              style: const TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 4),
            CuraStatusBadge(cura.status),
            const SizedBox(height: 12),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                _date('Data de Criação', cura.createdAt),
                if (cura.status == 'concluido')
                  _date('Data de Conclusão', cura.completedAt),
              ],
            ),
            if ((cura.notes ?? '').isNotEmpty) ...[
              const SizedBox(height: 12),
              CuraNotes(cura.notes!),
            ],
          ],
        ),
      ),
    );
  }
}
