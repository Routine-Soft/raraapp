import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:url_launcher/url_launcher.dart';
import 'package:raraapp/controllers/user_controller.dart';
import 'package:raraapp/controllers/christian_group_controller.dart';
import 'package:raraapp/models/christian_group.dart';

class ChristianGroupAdminView extends StatefulWidget {
  const ChristianGroupAdminView({super.key});

  @override
  State<ChristianGroupAdminView> createState() => _ChristianGroupAdminViewState();
}

class _ChristianGroupAdminViewState extends State<ChristianGroupAdminView> {
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

  void _showFormDialog({ChristianGroupDTO? group}) {
    showDialog(
      context: context,
      builder: (context) => ChristianGroupFormDialog(
        group: group,
        onSave: (formData) {
          final userController = context.read<UserController>();
          final groupController = context.read<ChristianGroupController>();
          final token = userController.currentUser?.accessToken;

          if (token == null) return;

          if (group == null) {
            // Criar novo
            groupController.createChristianGroup(
              name: formData['name'],
              address: formData['address'],
              leader: formData['leader'],
              coleader: formData['coleader'],
              host: formData['host'],
              contact: formData['contact'],
              churchId: userController.currentUser?.churchId,
              token: token,
            );
          } else {
            // Editar existente
            groupController.updateChristianGroup(
              groupId: group.id!,
              data: formData,
              token: token,
            );
          }
        },
      ),
    );
  }

  Future<void> _openWhatsApp(String? phoneNumber) async {
    if (phoneNumber == null || phoneNumber.isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Telefone não disponível')),
      );
      return;
    }

    final cleanPhone = phoneNumber.replaceAll(RegExp(r'[^0-9]'), '');
    final whatsappUrl = Uri.parse('https://wa.me/$cleanPhone');

    try {
      if (await canLaunchUrl(whatsappUrl)) {
        await launchUrl(whatsappUrl, mode: LaunchMode.externalApplication);
      }
    } catch (e) {
      print('Erro ao abrir WhatsApp: $e');
    }
  }

  void _deleteGroup(ChristianGroupDTO group) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Deletar Grupo'),
        content: Text('Tem certeza que deseja deletar "${group.name}"?'),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('Cancelar'),
          ),
          TextButton(
            onPressed: () {
              final userController = context.read<UserController>();
              final groupController = context.read<ChristianGroupController>();
              final token = userController.currentUser?.accessToken;

              if (token != null) {
                groupController.deleteChristianGroup(
                  groupId: group.id!,
                  token: token,
                );
                Navigator.pop(context);
                ScaffoldMessenger.of(context).showSnackBar(
                  const SnackBar(content: Text('Grupo deletado com sucesso')),
                );
              }
            },
            child: const Text('Deletar', style: TextStyle(color: Colors.red)),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Consumer<ChristianGroupController>(
      builder: (context, groupController, _) {
        return Scaffold(
          floatingActionButton: FloatingActionButton(
            onPressed: () => _showFormDialog(),
            child: const Icon(Icons.add),
          ),
          body: groupController.isLoading
              ? const Center(child: CircularProgressIndicator())
              : groupController.groups.isEmpty
                  ? Center(
                      child: Column(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          const Icon(Icons.groups, size: 64, color: Colors.grey),
                          const SizedBox(height: 16),
                          const Text('Nenhum grupo encontrado'),
                          const SizedBox(height: 16),
                          ElevatedButton.icon(
                            onPressed: () => _showFormDialog(),
                            icon: const Icon(Icons.add),
                            label: const Text('Criar Grupo'),
                          ),
                        ],
                      ),
                    )
                  : SingleChildScrollView(
                      padding: const EdgeInsets.all(16),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            'Grupos Cristãos (${groupController.groups.length})',
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
                                      Row(
                                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                        children: [
                                          Expanded(
                                            child: Text(
                                              group.name ?? 'Sem nome',
                                              style: Theme.of(context).textTheme.titleMedium?.copyWith(
                                                fontWeight: FontWeight.bold,
                                              ),
                                            ),
                                          ),
                                          PopupMenuButton(
                                            itemBuilder: (context) => [
                                              PopupMenuItem(
                                                child: const Text('Editar'),
                                                onTap: () => _showFormDialog(group: group),
                                              ),
                                              PopupMenuItem(
                                                child: const Text('Deletar'),
                                                onTap: () => _deleteGroup(group),
                                              ),
                                            ],
                                          ),
                                        ],
                                      ),
                                      const SizedBox(height: 12),
                                      if (group.leader != null && group.leader!.isNotEmpty)
                                        Padding(
                                          padding: const EdgeInsets.only(bottom: 8),
                                          child: Text(
                                            'Líder: ${group.leader}',
                                            style: Theme.of(context).textTheme.bodySmall,
                                          ),
                                        ),
                                      if (group.coleader != null && group.coleader!.isNotEmpty)
                                        Padding(
                                          padding: const EdgeInsets.only(bottom: 8),
                                          child: Text(
                                            'Co-líder: ${group.coleader}',
                                            style: Theme.of(context).textTheme.bodySmall,
                                          ),
                                        ),
                                      if (group.host != null && group.host!.isNotEmpty)
                                        Padding(
                                          padding: const EdgeInsets.only(bottom: 8),
                                          child: Text(
                                            'Anfitrião: ${group.host}',
                                            style: Theme.of(context).textTheme.bodySmall,
                                          ),
                                        ),
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
                                              if (group.address!['address'] != null)
                                                Text(
                                                  '  ${group.address!['address']}',
                                                  style: Theme.of(context).textTheme.bodySmall,
                                                ),
                                              if (group.address!['city'] != null)
                                                Text(
                                                  '  ${group.address!['city']}, ${group.address!['state'] ?? ''}',
                                                  style: Theme.of(context).textTheme.bodySmall,
                                                ),
                                            ],
                                          ),
                                        ),
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
                    ),
        );
      },
    );
  }
}

/// Dialog para criar/editar grupos cristãos
class ChristianGroupFormDialog extends StatefulWidget {
  final ChristianGroupDTO? group;
  final Function(Map<String, dynamic>) onSave;

  const ChristianGroupFormDialog({
    this.group,
    required this.onSave,
  });

  @override
  State<ChristianGroupFormDialog> createState() => _ChristianGroupFormDialogState();
}

class _ChristianGroupFormDialogState extends State<ChristianGroupFormDialog> {
  late TextEditingController _nameController;
  late TextEditingController _leaderController;
  late TextEditingController _coleaderController;
  late TextEditingController _hostController;
  late TextEditingController _addressController;
  late TextEditingController _cepController;
  late TextEditingController _neighborhoodController;
  late TextEditingController _cityController;
  late TextEditingController _stateController;
  late TextEditingController _countryController;
  late TextEditingController _contactController;

  List<String> _contacts = [];
  final _formKey = GlobalKey<FormState>();

  @override
  void initState() {
    super.initState();
    _initializeControllers();
  }

  void _initializeControllers() {
    final group = widget.group;
    _nameController = TextEditingController(text: group?.name ?? '');
    _leaderController = TextEditingController(text: group?.leader ?? '');
    _coleaderController = TextEditingController(text: group?.coleader ?? '');
    _hostController = TextEditingController(text: group?.host ?? '');
    _addressController = TextEditingController(text: group?.address?['address'] ?? '');
    _cepController = TextEditingController(text: group?.address?['cep'] ?? '');
    _neighborhoodController = TextEditingController(text: group?.address?['neighborhood'] ?? '');
    _cityController = TextEditingController(text: group?.address?['city'] ?? '');
    _stateController = TextEditingController(text: group?.address?['state'] ?? '');
    _countryController = TextEditingController(text: group?.address?['country'] ?? '');
    _contactController = TextEditingController();
    _contacts = group?.contact?.toList() ?? [];
  }

  @override
  void dispose() {
    _nameController.dispose();
    _leaderController.dispose();
    _coleaderController.dispose();
    _hostController.dispose();
    _addressController.dispose();
    _cepController.dispose();
    _neighborhoodController.dispose();
    _cityController.dispose();
    _stateController.dispose();
    _countryController.dispose();
    _contactController.dispose();
    super.dispose();
  }

  void _addContact() {
    final phone = _contactController.text.trim();
    if (phone.isNotEmpty && !_contacts.contains(phone)) {
      setState(() {
        _contacts.add(phone);
        _contactController.clear();
      });
    }
  }

  void _removeContact(String phone) {
    setState(() {
      _contacts.remove(phone);
    });
  }

  void _saveForm() {
    if (!_formKey.currentState!.validate()) return;

    final formData = {
      'name': _nameController.text,
      'leader': _leaderController.text.isEmpty ? null : _leaderController.text,
      'coleader': _coleaderController.text.isEmpty ? null : _coleaderController.text,
      'host': _hostController.text.isEmpty ? null : _hostController.text,
      'contact': _contacts.isEmpty ? null : _contacts,
      'address': {
        'address': _addressController.text.isEmpty ? null : _addressController.text,
        'cep': _cepController.text.isEmpty ? null : _cepController.text,
        'neighborhood': _neighborhoodController.text.isEmpty ? null : _neighborhoodController.text,
        'city': _cityController.text.isEmpty ? null : _cityController.text,
        'state': _stateController.text.isEmpty ? null : _stateController.text,
        'country': _countryController.text.isEmpty ? null : _countryController.text,
      },
    };

    widget.onSave(formData);
    Navigator.pop(context);

    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(
          widget.group == null ? 'Grupo criado com sucesso' : 'Grupo atualizado com sucesso',
        ),
        backgroundColor: Colors.green,
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Dialog(
      child: SingleChildScrollView(
        padding: const EdgeInsets.all(24),
        child: Form(
          key: _formKey,
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              Text(
                widget.group == null ? 'Novo Grupo Cristão' : 'Editar Grupo Cristão',
                style: Theme.of(context).textTheme.titleLarge?.copyWith(
                  fontWeight: FontWeight.bold,
                ),
              ),
              const SizedBox(height: 24),

              // Nome
              TextFormField(
                controller: _nameController,
                decoration: InputDecoration(
                  labelText: 'Nome do Grupo',
                  border: OutlineInputBorder(borderRadius: BorderRadius.circular(8)),
                ),
                validator: (value) => value?.isEmpty ?? true ? 'Nome é obrigatório' : null,
              ),
              const SizedBox(height: 16),

              // Líder
              TextFormField(
                controller: _leaderController,
                decoration: InputDecoration(
                  labelText: 'Líder',
                  border: OutlineInputBorder(borderRadius: BorderRadius.circular(8)),
                ),
              ),
              const SizedBox(height: 16),

              // Co-líder
              TextFormField(
                controller: _coleaderController,
                decoration: InputDecoration(
                  labelText: 'Co-líder',
                  border: OutlineInputBorder(borderRadius: BorderRadius.circular(8)),
                ),
              ),
              const SizedBox(height: 16),

              // Anfitrião
              TextFormField(
                controller: _hostController,
                decoration: InputDecoration(
                  labelText: 'Anfitrião',
                  border: OutlineInputBorder(borderRadius: BorderRadius.circular(8)),
                ),
              ),
              const SizedBox(height: 24),

              // Endereço
              Text(
                'Endereço',
                style: Theme.of(context).textTheme.titleSmall?.copyWith(
                  fontWeight: FontWeight.bold,
                ),
              ),
              const SizedBox(height: 12),

              TextFormField(
                controller: _addressController,
                decoration: InputDecoration(
                  labelText: 'Rua',
                  border: OutlineInputBorder(borderRadius: BorderRadius.circular(8)),
                ),
              ),
              const SizedBox(height: 12),

              Row(
                children: [
                  Expanded(
                    child: TextFormField(
                      controller: _cepController,
                      decoration: InputDecoration(
                        labelText: 'CEP',
                        border: OutlineInputBorder(borderRadius: BorderRadius.circular(8)),
                      ),
                    ),
                  ),
                  const SizedBox(width: 12),
                  Expanded(
                    child: TextFormField(
                      controller: _neighborhoodController,
                      decoration: InputDecoration(
                        labelText: 'Bairro',
                        border: OutlineInputBorder(borderRadius: BorderRadius.circular(8)),
                      ),
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 12),

              Row(
                children: [
                  Expanded(
                    child: TextFormField(
                      controller: _cityController,
                      decoration: InputDecoration(
                        labelText: 'Cidade',
                        border: OutlineInputBorder(borderRadius: BorderRadius.circular(8)),
                      ),
                    ),
                  ),
                  const SizedBox(width: 12),
                  SizedBox(
                    width: 100,
                    child: TextFormField(
                      controller: _stateController,
                      decoration: InputDecoration(
                        labelText: 'Estado',
                        border: OutlineInputBorder(borderRadius: BorderRadius.circular(8)),
                      ),
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 12),

              TextFormField(
                controller: _countryController,
                decoration: InputDecoration(
                  labelText: 'País',
                  border: OutlineInputBorder(borderRadius: BorderRadius.circular(8)),
                ),
              ),
              const SizedBox(height: 24),

              // Contatos
              Text(
                'Contatos',
                style: Theme.of(context).textTheme.titleSmall?.copyWith(
                  fontWeight: FontWeight.bold,
                ),
              ),
              const SizedBox(height: 12),

              Row(
                children: [
                  Expanded(
                    child: TextFormField(
                      controller: _contactController,
                      decoration: InputDecoration(
                        labelText: 'Telefone',
                        border: OutlineInputBorder(borderRadius: BorderRadius.circular(8)),
                        hintText: '+5521987654321',
                      ),
                    ),
                  ),
                  const SizedBox(width: 12),
                  ElevatedButton(
                    onPressed: _addContact,
                    child: const Text('Adicionar'),
                  ),
                ],
              ),
              const SizedBox(height: 12),

              if (_contacts.isNotEmpty)
                Column(
                  children: _contacts.map((phone) {
                    return Padding(
                      padding: const EdgeInsets.only(bottom: 8),
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Text(phone),
                          IconButton(
                            icon: const Icon(Icons.close, size: 20),
                            onPressed: () => _removeContact(phone),
                          ),
                        ],
                      ),
                    );
                  }).toList(),
                ),

              const SizedBox(height: 24),

              // Botões
              Row(
                mainAxisAlignment: MainAxisAlignment.end,
                children: [
                  TextButton(
                    onPressed: () => Navigator.pop(context),
                    child: const Text('Cancelar'),
                  ),
                  const SizedBox(width: 12),
                  ElevatedButton(
                    onPressed: _saveForm,
                    child: Text(widget.group == null ? 'Criar' : 'Atualizar'),
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }
}
