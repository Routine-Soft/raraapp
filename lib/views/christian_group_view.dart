import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:url_launcher/url_launcher.dart';
import 'package:raraapp/controllers/user_controller.dart';
import 'package:raraapp/controllers/christian_group_controller.dart';

class ChristianGroupView extends StatefulWidget {
  const ChristianGroupView({super.key});

  @override
  State<ChristianGroupView> createState() => _ChristianGroupViewState();
}

class _ChristianGroupViewState extends State<ChristianGroupView> {
  @override
  void initState() {
    super.initState();
    _loadGroups();
  }

  void _loadGroups() {
    WidgetsBinding.instance.addPostFrameCallback((_) {
      final userController = context.read<UserController>();
      final groupController = context.read<ChristianGroupController>();

      if (userController.currentUser?.accessToken != null) {
        groupController.loadAllChristianGroups(
          token: userController.currentUser!.accessToken!,
        );
      }
    });
  }

  Future<void> _openWhatsApp(String? phoneNumber) async {
    if (phoneNumber == null || phoneNumber.isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Telefone não disponível')),
      );
      return;
    }

    // Remove caracteres não numéricos
    final cleanPhone = phoneNumber.replaceAll(RegExp(r'[^0-9]'), '');

    // Formata para WhatsApp: https://wa.me/DDI+DDD+NUMERO
    final whatsappUrl = Uri.parse('https://wa.me/$cleanPhone');

    try {
      if (await canLaunchUrl(whatsappUrl)) {
        await launchUrl(whatsappUrl, mode: LaunchMode.externalApplication);
      } else {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Não foi possível abrir WhatsApp')),
        );
      }
    } catch (e) {
      print('Erro ao abrir WhatsApp: $e');
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Erro: $e')),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Consumer<ChristianGroupController>(
      builder: (context, groupController, _) {
        if (groupController.isLoading) {
          return const Center(child: CircularProgressIndicator());
        }

        if (groupController.groups.isEmpty) {
          return SingleChildScrollView(
            padding: const EdgeInsets.all(24),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'Seus Grupos',
                  style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                    fontWeight: FontWeight.bold,
                  ),
                ),
                const SizedBox(height: 24),
                Center(
                  child: Text(
                    'Nenhum grupo encontrado',
                    style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                      color: Colors.grey,
                    ),
                  ),
                ),
              ],
            ),
          );
        }

        return SingleChildScrollView(
          padding: const EdgeInsets.all(16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                'Seus Grupos',
                style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                  fontWeight: FontWeight.bold,
                ),
              ),
              const SizedBox(height: 16),
              ListView.builder(
                shrinkWrap: true,
                physics: const NeverScrollableScrollPhysics(),
                itemCount: groupController.groups.length,
                itemBuilder: (context, index) {
                  final group = groupController.groups[index];
                  return Card(
                    margin: const EdgeInsets.only(bottom: 12),
                    child: Padding(
                      padding: const EdgeInsets.all(16),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          // Nome do grupo
                          Text(
                            group.name ?? 'Sem nome',
                            style: Theme.of(context).textTheme.titleMedium?.copyWith(
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                          const SizedBox(height: 12),

                          // Líder
                          if (group.leader != null && group.leader!.isNotEmpty)
                            Padding(
                              padding: const EdgeInsets.only(bottom: 8),
                              child: Text(
                                'Líder: ${group.leader}',
                                style: Theme.of(context).textTheme.bodySmall,
                              ),
                            ),

                          // Co-líder
                          if (group.coleader != null && group.coleader!.isNotEmpty)
                            Padding(
                              padding: const EdgeInsets.only(bottom: 8),
                              child: Text(
                                'Co-líder: ${group.coleader}',
                                style: Theme.of(context).textTheme.bodySmall,
                              ),
                            ),

                          // Host/Anfitrião
                          if (group.host != null && group.host!.isNotEmpty)
                            Padding(
                              padding: const EdgeInsets.only(bottom: 8),
                              child: Text(
                                'Anfitrião: ${group.host}',
                                style: Theme.of(context).textTheme.bodySmall,
                              ),
                            ),

                          // Endereço
                          if (group.address != null)
                            Padding(
                              padding: const EdgeInsets.only(bottom: 8),
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Text(
                                    'Endereço:',
                                    style: Theme.of(context).textTheme.bodySmall?.copyWith(
                                      fontWeight: FontWeight.bold,
                                    ),
                                  ),
                                  if (group.address!['address'] != null && (group.address!['address'] as String).isNotEmpty)
                                    Text(
                                      '  ${group.address!['address']}',
                                      style: Theme.of(context).textTheme.bodySmall,
                                    ),
                                  if (group.address!['neighborhood'] != null && (group.address!['neighborhood'] as String).isNotEmpty)
                                    Text(
                                      '  ${group.address!['neighborhood']}',
                                      style: Theme.of(context).textTheme.bodySmall,
                                    ),
                                  if (group.address!['city'] != null && (group.address!['city'] as String).isNotEmpty)
                                    Text(
                                      '  ${group.address!['city']}, ${group.address!['state'] ?? ''}',
                                      style: Theme.of(context).textTheme.bodySmall,
                                    ),
                                  if (group.address!['cep'] != null && (group.address!['cep'] as String).isNotEmpty)
                                    Text(
                                      '  CEP: ${group.address!['cep']}',
                                      style: Theme.of(context).textTheme.bodySmall,
                                    ),
                                  if (group.address!['country'] != null && (group.address!['country'] as String).isNotEmpty)
                                    Text(
                                      '  ${group.address!['country']}',
                                      style: Theme.of(context).textTheme.bodySmall,
                                    ),
                                ],
                              ),
                            ),

                          // Telefones clicáveis
                          if (group.contact != null && group.contact!.isNotEmpty)
                            Padding(
                              padding: const EdgeInsets.only(top: 8),
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Text(
                                    'Contatos:',
                                    style: Theme.of(context).textTheme.bodySmall?.copyWith(
                                      fontWeight: FontWeight.bold,
                                    ),
                                  ),
                                  ...group.contact!.map((phone) {
                                    return Padding(
                                      padding: const EdgeInsets.only(top: 4),
                                      child: GestureDetector(
                                        onTap: () => _openWhatsApp(phone),
                                        child: Text(
                                          '  📱 $phone',
                                          style: TextStyle(
                                            color: Colors.blue,
                                            decoration: TextDecoration.underline,
                                            fontSize: Theme.of(context).textTheme.bodySmall?.fontSize,
                                          ),
                                        ),
                                      ),
                                    );
                                  }).toList(),
                                ],
                              ),
                            ),
                        ],
                      ),
                    ),
                  );
                },
              ),
            ],
          ),
        );
      },
    );
  }
}
