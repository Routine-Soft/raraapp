import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:raraapp/controllers/cura_controller.dart';
import 'package:raraapp/controllers/user_controller.dart';

class CuraView extends StatefulWidget {
  const CuraView({Key? key}) : super(key: key);

  @override
  State<CuraView> createState() => _CuraViewState();
}

class _CuraViewState extends State<CuraView> {
  final Map<String, String> typeLabels = {
    'cura_alma': 'Cura da Alma',
    'reciclagem': 'Reciclagem',
    'gabinete_pastoral': 'Gabinete Pastoral',
  };

  final Map<String, Color> statusColors = {
    'fila_espera': Colors.orange,
    'andamento': Colors.blue,
    'concluido': Colors.green,
  };

  final Map<String, String> statusLabels = {
    'fila_espera': 'Fila de Espera',
    'andamento': 'Em Andamento',
    'concluido': 'Concluído',
  };

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      final userController = context.read<UserController>();
      final curaController = context.read<CuraController>();
      if (userController.currentUser?.accessToken != null) {
        curaController.loadMyCura(
          token: userController.currentUser!.accessToken!,
        );
      }
    });
  }

  void _showCreateDialog() {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Novo Pedido de Cura'),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            const Text(
              'Selecione o tipo de pedido:',
              style: TextStyle(fontSize: 14),
            ),
            const SizedBox(height: 16),
            ...typeLabels.entries.map((entry) {
              return Padding(
                padding: const EdgeInsets.symmetric(vertical: 8.0),
                child: SizedBox(
                  width: double.infinity,
                  child: ElevatedButton(
                    onPressed: () {
                      _createCura(entry.key);
                      Navigator.pop(context);
                    },
                    style: ElevatedButton.styleFrom(
                      backgroundColor: Colors.blue,
                      padding: const EdgeInsets.symmetric(vertical: 12),
                    ),
                    child: Text(
                      entry.value,
                      style: const TextStyle(color: Colors.white, fontSize: 16),
                    ),
                  ),
                ),
              );
            }).toList(),
          ],
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('Cancelar'),
          ),
        ],
      ),
    );
  }

  Future<void> _createCura(String type) async {
    final userController = context.read<UserController>();
    final curaController = context.read<CuraController>();

    if (userController.currentUser?.accessToken == null) {
      ScaffoldMessenger.of(
        context,
      ).showSnackBar(const SnackBar(content: Text('Token não encontrado')));
      return;
    }

    final success = await curaController.createCura(
      type: type,
      churchId: userController.currentUser?.churchId,
      token: userController.currentUser!.accessToken!,
    );

    if (mounted) {
      if (success) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text('Pedido de cura criado com sucesso!'),
            backgroundColor: Colors.green,
          ),
        );
      } else {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text(curaController.error ?? 'Erro ao criar pedido'),
            backgroundColor: Colors.red,
          ),
        );
      }
    }
  }

  String _formatDate(DateTime? date) {
    if (date == null) return '-';
    return '${date.day.toString().padLeft(2, '0')}/${date.month.toString().padLeft(2, '0')}/${date.year}';
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Minha Cura'),
        backgroundColor: Colors.blue,
        centerTitle: true,
      ),
      body: Consumer<CuraController>(
        builder: (context, curaController, _) {
          if (curaController.isLoading) {
            return const Center(child: CircularProgressIndicator());
          }

          if (curaController.myCuras.isEmpty) {
            return Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Icon(Icons.healing, size: 80, color: Colors.grey[400]),
                  const SizedBox(height: 16),
                  Text(
                    'Nenhum pedido de cura criado',
                    style: TextStyle(fontSize: 16, color: Colors.grey[600]),
                  ),
                  const SizedBox(height: 24),
                  ElevatedButton.icon(
                    onPressed: _showCreateDialog,
                    icon: const Icon(Icons.add),
                    label: const Text('Criar Novo Pedido'),
                    style: ElevatedButton.styleFrom(
                      backgroundColor: Colors.blue,
                      padding: const EdgeInsets.symmetric(
                        horizontal: 24,
                        vertical: 12,
                      ),
                    ),
                  ),
                ],
              ),
            );
          }

          return ListView.builder(
            padding: const EdgeInsets.all(16),
            itemCount: curaController.myCuras.length,
            itemBuilder: (context, index) {
              final cura = curaController.myCuras[index];
              final statusColor = statusColors[cura.status] ?? Colors.grey;
              final statusLabel =
                  statusLabels[cura.status] ?? cura.status ?? '-';
              final typeLabel = typeLabels[cura.type] ?? cura.type ?? '-';

              return Card(
                margin: const EdgeInsets.only(bottom: 12),
                elevation: 2,
                child: Padding(
                  padding: const EdgeInsets.all(16),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      // Tipo e Status
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Expanded(
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text(
                                  typeLabel,
                                  style: const TextStyle(
                                    fontSize: 16,
                                    fontWeight: FontWeight.bold,
                                  ),
                                ),
                                const SizedBox(height: 4),
                                Container(
                                  padding: const EdgeInsets.symmetric(
                                    horizontal: 8,
                                    vertical: 4,
                                  ),
                                  decoration: BoxDecoration(
                                    color: statusColor,
                                    borderRadius: BorderRadius.circular(4),
                                  ),
                                  child: Text(
                                    statusLabel,
                                    style: const TextStyle(
                                      color: Colors.white,
                                      fontSize: 12,
                                      fontWeight: FontWeight.bold,
                                    ),
                                  ),
                                ),
                              ],
                            ),
                          ),
                        ],
                      ),
                      const SizedBox(height: 12),

                      // Datas
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              const Text(
                                'Data de Criação',
                                style: TextStyle(
                                  fontSize: 12,
                                  color: Colors.grey,
                                ),
                              ),
                              Text(
                                _formatDate(cura.createdAt),
                                style: const TextStyle(
                                  fontSize: 14,
                                  fontWeight: FontWeight.w500,
                                ),
                              ),
                            ],
                          ),
                          if (cura.status == 'concluido')
                            Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                const Text(
                                  'Data de Conclusão',
                                  style: TextStyle(
                                    fontSize: 12,
                                    color: Colors.grey,
                                  ),
                                ),
                                Text(
                                  _formatDate(cura.completedAt),
                                  style: const TextStyle(
                                    fontSize: 14,
                                    fontWeight: FontWeight.w500,
                                  ),
                                ),
                              ],
                            ),
                        ],
                      ),

                      // Notas (se existirem)
                      if (cura.notes != null && cura.notes!.isNotEmpty) ...[
                        const SizedBox(height: 12),
                        Container(
                          width: double.infinity,
                          padding: const EdgeInsets.all(8),
                          decoration: BoxDecoration(
                            color: Colors.grey[100],
                            borderRadius: BorderRadius.circular(4),
                          ),
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              const Text(
                                'Anotações',
                                style: TextStyle(
                                  fontSize: 12,
                                  fontWeight: FontWeight.bold,
                                  color: Colors.grey,
                                ),
                              ),
                              const SizedBox(height: 4),
                              Text(
                                cura.notes!,
                                style: const TextStyle(fontSize: 14),
                              ),
                            ],
                          ),
                        ),
                      ],
                    ],
                  ),
                ),
              );
            },
          );
        },
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: _showCreateDialog,
        backgroundColor: Colors.blue,
        child: const Icon(Icons.add),
      ),
    );
  }
}
