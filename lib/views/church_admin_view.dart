import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:raraapp/controllers/user_controller.dart';
import 'package:raraapp/controllers/church_controller.dart';
import 'package:raraapp/models/church.dart';
import 'package:raraapp/models/user.dart';

class ChurchAdminView extends StatefulWidget {
  const ChurchAdminView({super.key});

  @override
  State<ChurchAdminView> createState() => _ChurchAdminViewState();
}

class _ChurchAdminViewState extends State<ChurchAdminView> {
  @override
  void initState() {
    super.initState();
    _loadChurches();
  }

  void _loadChurches() {
    WidgetsBinding.instance.addPostFrameCallback((_) {
      final churchController = context.read<ChurchController>();
      if (churchController.churches.isEmpty) {
        churchController.loadAllChurches();
      }
    });
  }

  void _showFormDialog({ChurchDTO? church}) {
    showDialog(
      context: context,
      builder: (context) => ChurchFormDialog(
        church: church,
        onSave: (formData) {
          final userController = context.read<UserController>();
          final churchController = context.read<ChurchController>();
          final token = userController.currentUser?.accessToken;

          if (token == null) return;

          if (church == null) {
            // Criar novo
            final addressData = formData['address'] as Map<String, dynamic>;
            final addressDTO = AddressDTO(
              address: addressData['address'],
              cep: addressData['cep'],
              neighborhood: addressData['neighborhood'],
              city: addressData['city'],
              state: addressData['state'],
              country: addressData['country'],
            );

            churchController.createChurch(
              name: formData['name'],
              pastor1: formData['pastor1'],
              pastor2: formData['pastor2'],
              address: addressDTO,
              cnpj: formData['cnpj'],
              totalMembers: formData['totalMembers'],
              token: token,
            );
          } else {
            // Editar existente
            churchController.updateChurch(
              church.id,
              data: formData,
              token: token,
            );
          }
        },
      ),
    );
  }

  void _deleteChurch(ChurchDTO church) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Deletar Igreja'),
        content: Text('Tem certeza que deseja deletar "${church.name}"?'),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('Cancelar'),
          ),
          TextButton(
            onPressed: () {
              final userController = context.read<UserController>();
              final churchController = context.read<ChurchController>();
              final token = userController.currentUser?.accessToken;

              if (token != null) {
                churchController.deleteChurch(church.id, token: token);
                Navigator.pop(context);
                ScaffoldMessenger.of(context).showSnackBar(
                  const SnackBar(content: Text('Igreja deletada com sucesso')),
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
    return Consumer<ChurchController>(
      builder: (context, churchController, _) {
        return Scaffold(
          floatingActionButton: FloatingActionButton(
            onPressed: () => _showFormDialog(),
            child: const Icon(Icons.add),
          ),
          body: churchController.isLoading
              ? const Center(child: CircularProgressIndicator())
              : churchController.churches.isEmpty
              ? Center(
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      const Icon(Icons.church, size: 64, color: Colors.grey),
                      const SizedBox(height: 16),
                      const Text('Nenhuma igreja encontrada'),
                      const SizedBox(height: 16),
                      ElevatedButton.icon(
                        onPressed: () => _showFormDialog(),
                        icon: const Icon(Icons.add),
                        label: const Text('Criar Igreja'),
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
                        'Igrejas (${churchController.churches.length})',
                        style: Theme.of(context).textTheme.headlineSmall
                            ?.copyWith(fontWeight: FontWeight.bold),
                      ),
                      const SizedBox(height: 16),
                      ListView.builder(
                        shrinkWrap: true,
                        physics: const NeverScrollableScrollPhysics(),
                        itemCount: churchController.churches.length,
                        itemBuilder: (context, index) {
                          final church = churchController.churches[index];
                          return Card(
                            margin: const EdgeInsets.only(bottom: 12),
                            child: Padding(
                              padding: const EdgeInsets.all(16),
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Row(
                                    mainAxisAlignment:
                                        MainAxisAlignment.spaceBetween,
                                    children: [
                                      Expanded(
                                        child: Text(
                                          church.name,
                                          style: Theme.of(context)
                                              .textTheme
                                              .titleMedium
                                              ?.copyWith(
                                                fontWeight: FontWeight.bold,
                                              ),
                                        ),
                                      ),
                                      PopupMenuButton(
                                        itemBuilder: (context) => [
                                          PopupMenuItem(
                                            child: const Text('Editar'),
                                            onTap: () =>
                                                _showFormDialog(church: church),
                                          ),
                                          PopupMenuItem(
                                            child: const Text('Deletar'),
                                            onTap: () => _deleteChurch(church),
                                          ),
                                        ],
                                      ),
                                    ],
                                  ),
                                  const SizedBox(height: 12),
                                  if (church.pastor1 != null &&
                                      church.pastor1!.isNotEmpty)
                                    Padding(
                                      padding: const EdgeInsets.only(bottom: 8),
                                      child: Text(
                                        'Pastor 1: ${church.pastor1}',
                                        style: Theme.of(
                                          context,
                                        ).textTheme.bodySmall,
                                      ),
                                    ),
                                  if (church.pastor2 != null &&
                                      church.pastor2!.isNotEmpty)
                                    Padding(
                                      padding: const EdgeInsets.only(bottom: 8),
                                      child: Text(
                                        'Pastor 2: ${church.pastor2}',
                                        style: Theme.of(
                                          context,
                                        ).textTheme.bodySmall,
                                      ),
                                    ),
                                  if (church.cnpj != null &&
                                      church.cnpj!.isNotEmpty)
                                    Padding(
                                      padding: const EdgeInsets.only(bottom: 8),
                                      child: Text(
                                        'CNPJ: ${church.cnpj}',
                                        style: Theme.of(
                                          context,
                                        ).textTheme.bodySmall,
                                      ),
                                    ),
                                  if (church.totalMembers != null)
                                    Padding(
                                      padding: const EdgeInsets.only(bottom: 8),
                                      child: Text(
                                        'Total de Membros: ${church.totalMembers}',
                                        style: Theme.of(
                                          context,
                                        ).textTheme.bodySmall,
                                      ),
                                    ),
                                  if (church.address != null)
                                    Padding(
                                      padding: const EdgeInsets.only(bottom: 8),
                                      child: Column(
                                        crossAxisAlignment:
                                            CrossAxisAlignment.start,
                                        children: [
                                          Text(
                                            'Endereço:',
                                            style: Theme.of(context)
                                                .textTheme
                                                .bodySmall
                                                ?.copyWith(
                                                  fontWeight: FontWeight.bold,
                                                ),
                                          ),
                                          if (church.address!.address != null)
                                            Text(
                                              '  ${church.address!.address}',
                                              style: Theme.of(
                                                context,
                                              ).textTheme.bodySmall,
                                            ),
                                          if (church.address!.city != null)
                                            Text(
                                              '  ${church.address!.city}, ${church.address!.state ?? ''}',
                                              style: Theme.of(
                                                context,
                                              ).textTheme.bodySmall,
                                            ),
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

/// Dialog para criar/editar igrejas
class ChurchFormDialog extends StatefulWidget {
  final ChurchDTO? church;
  final Function(Map<String, dynamic>) onSave;

  const ChurchFormDialog({this.church, required this.onSave});

  @override
  State<ChurchFormDialog> createState() => _ChurchFormDialogState();
}

class _ChurchFormDialogState extends State<ChurchFormDialog> {
  late TextEditingController _nameController;
  late TextEditingController _pastor1Controller;
  late TextEditingController _pastor2Controller;
  late TextEditingController _addressController;
  late TextEditingController _cepController;
  late TextEditingController _neighborhoodController;
  late TextEditingController _cityController;
  late TextEditingController _stateController;
  late TextEditingController _countryController;
  late TextEditingController _cnpjController;
  late TextEditingController _totalMembersController;
  final _formKey = GlobalKey<FormState>();

  @override
  void initState() {
    super.initState();
    _initializeControllers();
  }

  void _initializeControllers() {
    final church = widget.church;
    _nameController = TextEditingController(text: church?.name ?? '');
    _pastor1Controller = TextEditingController(text: church?.pastor1 ?? '');
    _pastor2Controller = TextEditingController(text: church?.pastor2 ?? '');
    _addressController = TextEditingController(
      text: church?.address?.address ?? '',
    );
    _cepController = TextEditingController(text: church?.address?.cep ?? '');
    _neighborhoodController = TextEditingController(
      text: church?.address?.neighborhood ?? '',
    );
    _cityController = TextEditingController(text: church?.address?.city ?? '');
    _stateController = TextEditingController(
      text: church?.address?.state ?? '',
    );
    _countryController = TextEditingController(
      text: church?.address?.country ?? '',
    );
    _cnpjController = TextEditingController(text: church?.cnpj ?? '');
    _totalMembersController = TextEditingController(
      text: church?.totalMembers?.toString() ?? '',
    );
  }

  @override
  void dispose() {
    _nameController.dispose();
    _pastor1Controller.dispose();
    _pastor2Controller.dispose();
    _addressController.dispose();
    _cepController.dispose();
    _neighborhoodController.dispose();
    _cityController.dispose();
    _stateController.dispose();
    _countryController.dispose();
    _cnpjController.dispose();
    _totalMembersController.dispose();
    super.dispose();
  }

  void _saveForm() {
    if (!_formKey.currentState!.validate()) return;

    final formData = {
      'name': _nameController.text,
      'pastor1': _pastor1Controller.text.isEmpty
          ? null
          : _pastor1Controller.text,
      'pastor2': _pastor2Controller.text.isEmpty
          ? null
          : _pastor2Controller.text,
      'address': {
        'address': _addressController.text.isEmpty
            ? null
            : _addressController.text,
        'cep': _cepController.text.isEmpty ? null : _cepController.text,
        'neighborhood': _neighborhoodController.text.isEmpty
            ? null
            : _neighborhoodController.text,
        'city': _cityController.text.isEmpty ? null : _cityController.text,
        'state': _stateController.text.isEmpty ? null : _stateController.text,
        'country': _countryController.text.isEmpty
            ? null
            : _countryController.text,
      },
      'cnpj': _cnpjController.text.isEmpty ? null : _cnpjController.text,
      // Logo URL (suspensa temporariamente)
      'totalMembers': _totalMembersController.text.isEmpty
          ? null
          : int.tryParse(_totalMembersController.text),
    };

    widget.onSave(formData);
    Navigator.pop(context);

    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(
          widget.church == null
              ? 'Igreja criada com sucesso'
              : 'Igreja atualizada com sucesso',
        ),
        backgroundColor: Colors.green,
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final screenWidth = MediaQuery.of(context).size.width;
    final maxWidth = screenWidth < 600 ? screenWidth - 32 : 500.0;

    return Dialog(
      insetPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 24),
      child: SingleChildScrollView(
        child: ConstrainedBox(
          constraints: BoxConstraints(maxWidth: maxWidth),
          child: Padding(
            padding: const EdgeInsets.all(24),
            child: Form(
              key: _formKey,
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  Text(
                    widget.church == null ? 'Nova Igreja' : 'Editar Igreja',
                    style: Theme.of(context).textTheme.titleLarge?.copyWith(
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  const SizedBox(height: 24),

                  // Nome
                  TextFormField(
                    controller: _nameController,
                    decoration: InputDecoration(
                      labelText: 'Nome da Igreja',
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(8),
                      ),
                    ),
                    validator: (value) =>
                        value?.isEmpty ?? true ? 'Nome é obrigatório' : null,
                  ),
                  const SizedBox(height: 16),

                  // Pastor 1
                  TextFormField(
                    controller: _pastor1Controller,
                    decoration: InputDecoration(
                      labelText: 'Pastor 1',
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(8),
                      ),
                    ),
                  ),
                  const SizedBox(height: 16),

                  // Pastor 2
                  TextFormField(
                    controller: _pastor2Controller,
                    decoration: InputDecoration(
                      labelText: 'Pastor 2',
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(8),
                      ),
                    ),
                  ),
                  const SizedBox(height: 16),

                  // CNPJ
                  TextFormField(
                    controller: _cnpjController,
                    decoration: InputDecoration(
                      labelText: 'CNPJ',
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(8),
                      ),
                      hintText: '00.000.000/0000-00',
                    ),
                  ),
                  const SizedBox(height: 16),

                  // Total de Membros
                  TextFormField(
                    controller: _totalMembersController,
                    decoration: InputDecoration(
                      labelText: 'Total de Membros',
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(8),
                      ),
                    ),
                    keyboardType: TextInputType.number,
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
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(8),
                      ),
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
                            border: OutlineInputBorder(
                              borderRadius: BorderRadius.circular(8),
                            ),
                          ),
                        ),
                      ),
                      const SizedBox(width: 12),
                      Expanded(
                        child: TextFormField(
                          controller: _neighborhoodController,
                          decoration: InputDecoration(
                            labelText: 'Bairro',
                            border: OutlineInputBorder(
                              borderRadius: BorderRadius.circular(8),
                            ),
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
                            border: OutlineInputBorder(
                              borderRadius: BorderRadius.circular(8),
                            ),
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
                            border: OutlineInputBorder(
                              borderRadius: BorderRadius.circular(8),
                            ),
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
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(8),
                      ),
                    ),
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
                        child: Text(
                          widget.church == null ? 'Criar' : 'Atualizar',
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}
