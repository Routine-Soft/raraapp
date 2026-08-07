import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:url_launcher/url_launcher.dart';
import 'package:raraapp/controllers/cura_controller.dart';
import 'package:raraapp/controllers/user_controller.dart';
import 'package:raraapp/models/cura.dart';

class CuraAdminView extends StatefulWidget {
  const CuraAdminView({Key? key}) : super(key: key);

  @override
  State<CuraAdminView> createState() => _CuraAdminViewState();
}

class _CuraAdminViewState extends State<CuraAdminView> {
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
        curaController.loadAllCura(
          token: userController.currentUser!.accessToken!,
        );
      }
    });
  }

  Future<void> _updateStatus(CuraDTO cura, String newStatus) async {
    final userController = context.read<UserController>();
    final curaController = context.read<CuraController>();

    if (userController.currentUser?.accessToken == null) {
      return;
    }

    final success = await curaController.updateStatus(
      curaId: cura.id!,
      status: newStatus,
      token: userController.currentUser!.accessToken!,
    );

    if (mounted) {
      if (success) {
        // Recarrega a lista após atualizar status
        await curaController.loadAllCura(
          token: userController.currentUser!.accessToken!,
        );
      } else {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text(curaController.error ?? 'Erro ao atualizar status'),
            backgroundColor: Colors.red,
          ),
        );
      }
    }
  }

  Future<void> _deleteCura(CuraDTO cura) async {
    final userController = context.read<UserController>();
    final curaController = context.read<CuraController>();

    if (userController.currentUser?.accessToken == null) {
      return;
    }

    final confirmed = await showDialog<bool>(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Confirmar Exclusão'),
        content: const Text(
          'Tem certeza que deseja deletar este pedido de cura?',
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context, false),
            child: const Text('Cancelar'),
          ),
          TextButton(
            onPressed: () => Navigator.pop(context, true),
            child: const Text('Deletar', style: TextStyle(color: Colors.red)),
          ),
        ],
      ),
    );

    if (confirmed == true && mounted) {
      final success = await curaController.deleteCura(
        curaId: cura.id!,
        token: userController.currentUser!.accessToken!,
      );

      if (mounted) {
        if (success) {
          ScaffoldMessenger.of(context).showSnackBar(
            const SnackBar(
              content: Text('Pedido deletado com sucesso!'),
              backgroundColor: Colors.green,
            ),
          );
        } else {
          ScaffoldMessenger.of(context).showSnackBar(
            SnackBar(
              content: Text(curaController.error ?? 'Erro ao deletar'),
              backgroundColor: Colors.red,
            ),
          );
        }
      }
    }
  }

  Future<void> _openWhatsApp(String phone) async {
    // Remove caracteres não numéricos
    final cleanPhone = phone.replaceAll(RegExp(r'[^0-9]'), '');
    final whatsappUrl = 'https://wa.me/$cleanPhone';

    if (await canLaunchUrl(Uri.parse(whatsappUrl))) {
      await launchUrl(
        Uri.parse(whatsappUrl),
        mode: LaunchMode.externalApplication,
      );
    }
  }

  void _showCuraDetails(CuraDTO cura) {
    final userName = cura.userDetails?['name'] ?? 'N/A';
    final userPhone = cura.userDetails?['phone'] ?? 'N/A';
    final userGender = cura.userDetails?['gender'] ?? 'N/A';
    final userBirthdate = _formatBirthdate(cura.userDetails?['birthdate']);
    final userBaptized = cura.userDetails?['baptized'] ?? false;
    final userMember = cura.userDetails?['member'] ?? false;
    final userStatus = cura.userDetails?['status'] ?? 'N/A';
    final userRoles = cura.userDetails?['roles'] is List
        ? (cura.userDetails!['roles'] as List).join(', ')
        : 'N/A';
    final userFacilitator = cura.userDetails?['facilitador'] ?? 'N/A';

    final userAddress =
        cura.userDetails?['address'] as Map<String, dynamic>? ?? {};
    final addressStr = [
      userAddress['address'],
      userAddress['neighborhood'],
      userAddress['city'],
      userAddress['state'],
      userAddress['cep'],
    ].where((e) => e != null && (e as String).isNotEmpty).join(', ');

    final userInvitation = cura.userDetails?['invitationofgrace'] ?? 'N/A';

    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: Text(userName),
        content: SingleChildScrollView(
          child: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Telefone clicável
              Row(
                children: [
                  const Text(
                    'Telefone: ',
                    style: TextStyle(fontWeight: FontWeight.bold),
                  ),
                  Expanded(
                    child: GestureDetector(
                      onTap: () => _openWhatsApp(userPhone),
                      child: Text(
                        userPhone,
                        style: const TextStyle(
                          color: Colors.green,
                          decoration: TextDecoration.underline,
                        ),
                      ),
                    ),
                  ),
                  const SizedBox(width: 8),
                  GestureDetector(
                    onTap: () => _openWhatsApp(userPhone),
                    child: const Icon(
                      Icons.chat,
                      color: Colors.green,
                      size: 20,
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 12),
              Text('Gênero: $userGender'),
              const SizedBox(height: 8),
              Text('Data de Nascimento: $userBirthdate'),
              const SizedBox(height: 8),
              Text(
                'Endereço: ${addressStr.isEmpty ? "N/A" : addressStr}',
                style: const TextStyle(fontSize: 12),
              ),
              const SizedBox(height: 8),
              Text('Convite de Graça: $userInvitation'),
              const SizedBox(height: 8),
              Text('Status: $userStatus'),
              const SizedBox(height: 8),
              Text('Batizado: ${userBaptized ? "Sim" : "Não"}'),
              const SizedBox(height: 8),
              Text('Membro: ${userMember ? "Sim" : "Não"}'),
              const SizedBox(height: 8),
              Text('Roles: $userRoles'),
              const SizedBox(height: 8),
              Text('Facilitador: $userFacilitator'),
              const SizedBox(height: 16),
              const Divider(),
              const SizedBox(height: 8),
              Text(
                'Tipo: ${typeLabels[cura.type] ?? cura.type}',
                style: const TextStyle(fontWeight: FontWeight.bold),
              ),
              const SizedBox(height: 8),
              Text(
                'Status do Pedido: ${statusLabels[cura.status] ?? cura.status}',
                style: const TextStyle(fontWeight: FontWeight.bold),
              ),
              if (cura.notes != null && cura.notes!.isNotEmpty) ...[
                const SizedBox(height: 8),
                Container(
                  width: double.infinity,
                  padding: const EdgeInsets.all(8),
                  decoration: BoxDecoration(
                    color: Colors.grey[200],
                    borderRadius: BorderRadius.circular(4),
                  ),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const Text(
                        'Notas:',
                        style: TextStyle(
                          fontWeight: FontWeight.bold,
                          fontSize: 12,
                        ),
                      ),
                      Text(cura.notes!, style: const TextStyle(fontSize: 12)),
                    ],
                  ),
                ),
              ],
            ],
          ),
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('Fechar'),
          ),
        ],
      ),
    );
  }

  void _showEditDialog(CuraDTO cura) {
    String selectedType = cura.type ?? 'cura_alma';
    late TextEditingController notesController;

    notesController = TextEditingController(text: cura.notes ?? '');

    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Editar Pedido'),
        content: SingleChildScrollView(
          child: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const Text(
                'Tipo:',
                style: TextStyle(fontWeight: FontWeight.bold),
              ),
              const SizedBox(height: 8),
              StatefulBuilder(
                builder: (context, setState) => Column(
                  children: typeLabels.entries.map((entry) {
                    return RadioListTile<String>(
                      title: Text(entry.value),
                      value: entry.key,
                      groupValue: selectedType,
                      onChanged: (value) {
                        setState(() {
                          selectedType = value!;
                        });
                      },
                    );
                  }).toList(),
                ),
              ),
              const SizedBox(height: 16),
              const Text(
                'Notas:',
                style: TextStyle(fontWeight: FontWeight.bold),
              ),
              const SizedBox(height: 8),
              TextField(
                controller: notesController,
                decoration: InputDecoration(
                  hintText: 'Adicione notas...',
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(8),
                  ),
                ),
                maxLines: 4,
              ),
            ],
          ),
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('Cancelar'),
          ),
          TextButton(
            onPressed: () async {
              final userController = context.read<UserController>();
              final curaController = context.read<CuraController>();

              if (userController.currentUser?.accessToken == null) {
                return;
              }

              final data = {
                'type': selectedType,
                'notes': notesController.text.isEmpty
                    ? null
                    : notesController.text,
              };

              final success = await curaController.updateCura(
                curaId: cura.id!,
                data: data,
                token: userController.currentUser!.accessToken!,
              );

              if (mounted) {
                Navigator.pop(context);
                if (success) {
                  // Recarrega a lista após atualizar
                  await curaController.loadAllCura(
                    token: userController.currentUser!.accessToken!,
                  );
                  ScaffoldMessenger.of(context).showSnackBar(
                    const SnackBar(
                      content: Text('Pedido atualizado com sucesso!'),
                      backgroundColor: Colors.green,
                    ),
                  );
                } else {
                  ScaffoldMessenger.of(context).showSnackBar(
                    SnackBar(
                      content: Text(
                        curaController.error ?? 'Erro ao atualizar',
                      ),
                      backgroundColor: Colors.red,
                    ),
                  );
                }
              }
            },
            child: const Text('Salvar'),
          ),
        ],
      ),
    );
  }

  String _formatBirthdate(dynamic birthdate) {
    if (birthdate == null) return 'N/A';
    try {
      if (birthdate is String) {
        final date = DateTime.parse(birthdate);
        return '${date.day.toString().padLeft(2, '0')}/${date.month.toString().padLeft(2, '0')}/${date.year}';
      }
      return 'N/A';
    } catch (e) {
      return 'N/A';
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
        title: const Text('Gerenciamento de Cura'),
        backgroundColor: Colors.blue,
        centerTitle: true,
      ),
      body: Consumer<CuraController>(
        builder: (context, curaController, _) {
          if (curaController.isLoading) {
            return const Center(child: CircularProgressIndicator());
          }

          // Separa os pedidos por status
          final filaEsperaList = curaController.curas
              .where((c) => c.status == 'fila_espera')
              .toList();
          final andamentoList = curaController.curas
              .where((c) => c.status == 'andamento')
              .toList();
          final concluidoList = curaController.curas
              .where((c) => c.status == 'concluido')
              .toList();

          return SingleChildScrollView(
            scrollDirection: Axis.horizontal,
            physics: const AlwaysScrollableScrollPhysics(),
            child: SizedBox(
              height: MediaQuery.of(context).size.height,
              child: Row(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  // Coluna: Fila de Espera
                  _buildKanbanColumn(
                    title: 'Fila de Espera',
                    status: 'fila_espera',
                    curas: filaEsperaList,
                    curaController: curaController,
                  ),

                  // Coluna: Em Andamento
                  _buildKanbanColumn(
                    title: 'Em Andamento',
                    status: 'andamento',
                    curas: andamentoList,
                    curaController: curaController,
                  ),

                  // Coluna: Concluído
                  _buildKanbanColumn(
                    title: 'Concluído',
                    status: 'concluido',
                    curas: concluidoList,
                    curaController: curaController,
                  ),
                ],
              ),
            ),
          );
        },
      ),
    );
  }

  Widget _buildKanbanColumn({
    required String title,
    required String status,
    required List<CuraDTO> curas,
    required CuraController curaController,
  }) {
    final statusColor = statusColors[status] ?? Colors.grey;

    return Container(
      width: 350,
      margin: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.grey[100],
        borderRadius: BorderRadius.circular(8),
      ),
      child: Column(
        children: [
          // Header
          Container(
            padding: const EdgeInsets.all(12),
            decoration: BoxDecoration(
              color: statusColor,
              borderRadius: const BorderRadius.only(
                topLeft: Radius.circular(8),
                topRight: Radius.circular(8),
              ),
            ),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  title,
                  style: const TextStyle(
                    color: Colors.white,
                    fontSize: 16,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                Container(
                  padding: const EdgeInsets.symmetric(
                    horizontal: 8,
                    vertical: 4,
                  ),
                  decoration: BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: Text(
                    curas.length.toString(),
                    style: TextStyle(
                      color: statusColor,
                      fontWeight: FontWeight.bold,
                      fontSize: 12,
                    ),
                  ),
                ),
              ],
            ),
          ),

          // Lista de Curas
          Expanded(
            child: DragTarget<CuraDTO>(
              onAcceptWithDetails: (details) {
                if (details.data.status != status) {
                  _updateStatus(details.data, status);
                }
              },
              builder: (context, candidateData, rejectedData) {
                return ListView.builder(
                  padding: const EdgeInsets.all(12),
                  itemCount: curas.length,
                  itemBuilder: (context, index) {
                    final cura = curas[index];
                    return _buildCuraCard(
                      cura: cura,
                      typeLabels: typeLabels,
                      onTap: () => _showCuraDetails(cura),
                      onEdit: () => _showEditDialog(cura),
                      onDelete: () => _deleteCura(cura),
                    );
                  },
                );
              },
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildCuraCard({
    required CuraDTO cura,
    required Map<String, String> typeLabels,
    required VoidCallback onTap,
    required VoidCallback onEdit,
    required VoidCallback onDelete,
  }) {
    final typeLabel = typeLabels[cura.type] ?? cura.type ?? '-';
    final userName = cura.userDetails?['name'] ?? 'Sem nome';
    final userPhone = cura.userDetails?['phone'] ?? '';

    return Draggable<CuraDTO>(
      data: cura,
      key: ValueKey(cura.id),
      feedback: Material(
        elevation: 8,
        borderRadius: BorderRadius.circular(8),
        child: Container(
          width: 300,
          padding: const EdgeInsets.all(12),
          decoration: BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.circular(8),
            border: Border.all(color: Colors.blue, width: 2),
            boxShadow: [
              BoxShadow(
                color: Colors.grey.withOpacity(0.5),
                blurRadius: 8,
                offset: const Offset(0, 4),
              ),
            ],
          ),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                userName,
                style: const TextStyle(
                  fontSize: 14,
                  fontWeight: FontWeight.bold,
                ),
              ),
              const SizedBox(height: 4),
              Text(
                typeLabel,
                style: const TextStyle(fontSize: 12, color: Colors.grey),
              ),
            ],
          ),
        ),
      ),
      child: Container(
        margin: const EdgeInsets.only(bottom: 12),
        padding: const EdgeInsets.all(12),
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(8),
          border: Border.all(color: Colors.grey[300]!),
          boxShadow: [
            BoxShadow(
              color: Colors.grey.withOpacity(0.2),
              blurRadius: 4,
              offset: const Offset(0, 2),
            ),
          ],
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        userName,
                        style: const TextStyle(
                          fontSize: 14,
                          fontWeight: FontWeight.bold,
                        ),
                        overflow: TextOverflow.ellipsis,
                      ),
                      if (userPhone.isNotEmpty)
                        GestureDetector(
                          onTap: () => _openWhatsApp(userPhone),
                          child: Text(
                            userPhone,
                            style: const TextStyle(
                              fontSize: 12,
                              color: Colors.green,
                              decoration: TextDecoration.underline,
                            ),
                            overflow: TextOverflow.ellipsis,
                          ),
                        ),
                    ],
                  ),
                ),
                PopupMenuButton<String>(
                  onSelected: (value) {
                    if (value == 'info') {
                      onTap();
                    } else if (value == 'edit') {
                      onEdit();
                    } else if (value == 'delete') {
                      onDelete();
                    }
                  },
                  itemBuilder: (BuildContext context) => [
                    const PopupMenuItem(
                      value: 'info',
                      child: Row(
                        children: [
                          Icon(Icons.info, size: 18, color: Colors.blue),
                          SizedBox(width: 8),
                          Text('Abrir Informações'),
                        ],
                      ),
                    ),
                    const PopupMenuItem(
                      value: 'edit',
                      child: Row(
                        children: [
                          Icon(Icons.edit, size: 18),
                          SizedBox(width: 8),
                          Text('Editar'),
                        ],
                      ),
                    ),
                    const PopupMenuItem(
                      value: 'delete',
                      child: Row(
                        children: [
                          Icon(Icons.delete, size: 18, color: Colors.red),
                          SizedBox(width: 8),
                          Text('Deletar', style: TextStyle(color: Colors.red)),
                        ],
                      ),
                    ),
                  ],
                ),
              ],
            ),
            const SizedBox(height: 8),
            Text(
              typeLabel,
              style: const TextStyle(
                fontSize: 12,
                color: Colors.blue,
                fontWeight: FontWeight.w500,
              ),
            ),
            if (cura.notes != null && cura.notes!.isNotEmpty) ...[
              const SizedBox(height: 8),
              Container(
                padding: const EdgeInsets.all(6),
                decoration: BoxDecoration(
                  color: Colors.grey[200],
                  borderRadius: BorderRadius.circular(4),
                ),
                child: Text(
                  cura.notes!,
                  style: const TextStyle(fontSize: 11),
                  maxLines: 2,
                  overflow: TextOverflow.ellipsis,
                ),
              ),
            ],
            const SizedBox(height: 8),
            Text(
              _formatDate(cura.createdAt),
              style: const TextStyle(
                fontSize: 10,
                color: Colors.blue,
                fontStyle: FontStyle.italic,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
