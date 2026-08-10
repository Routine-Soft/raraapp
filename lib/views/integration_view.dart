import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:raraapp/constants/register_constants.dart';
import 'package:raraapp/controllers/church_controller.dart';
import 'package:raraapp/controllers/user_controller.dart';
import 'package:raraapp/models/user.dart';
import 'package:raraapp/models/church.dart';
import 'package:url_launcher/url_launcher.dart';

class IntegrationView extends StatefulWidget {
  const IntegrationView({super.key});

  @override
  State<IntegrationView> createState() => _IntegrationViewState();
}

class _IntegrationViewState extends State<IntegrationView>
    with SingleTickerProviderStateMixin {
  late TabController _tabController;
  final TextEditingController _searchController = TextEditingController();
  String _searchQuery = '';

  // Controllers do formulário de facilitador
  late TextEditingController _nameController;
  late TextEditingController _emailController;
  late TextEditingController _phoneController;
  late TextEditingController _birthdateController;
  late TextEditingController _addressController;
  late TextEditingController _cepController;
  late TextEditingController _neighborhoodController;
  late TextEditingController _cityController;
  late TextEditingController _stateController;

  // Variáveis de estado do formulário de facilitador
  String? _selectedGender;
  String? _selectedStatus;
  String? _selectedInvitation;
  String? _selectedFacilitador;
  ChurchDTO? _selectedChurch;
  bool _baptized = false;
  bool _member = false;

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 3, vsync: this);

    // Inicializar controllers do formulário
    _nameController = TextEditingController();
    _emailController = TextEditingController();
    _phoneController = TextEditingController();
    _birthdateController = TextEditingController();
    _addressController = TextEditingController();
    _cepController = TextEditingController();
    _neighborhoodController = TextEditingController();
    _cityController = TextEditingController();
    _stateController = TextEditingController();

    // Carregar dados ao abrir
    Future.microtask(() {
      final userController = context.read<UserController>();
      final churchController = context.read<ChurchController>();
      final token = userController.currentUser?.accessToken ?? '';
      userController.loadAllUsers(token: token);
      churchController.loadAllChurches();
    });

    _searchController.addListener(() {
      setState(() {
        _searchQuery = _searchController.text.toLowerCase();
      });
    });
  }

  @override
  void dispose() {
    _tabController.dispose();
    _searchController.dispose();
    _nameController.dispose();
    _emailController.dispose();
    _phoneController.dispose();
    _birthdateController.dispose();
    _addressController.dispose();
    _cepController.dispose();
    _neighborhoodController.dispose();
    _cityController.dispose();
    _stateController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Integração'),
        bottom: TabBar(
          controller: _tabController,
          tabs: const [
            Tab(icon: Icon(Icons.dashboard), text: 'Dashboard'),
            Tab(icon: Icon(Icons.person_add), text: 'Facilitador'),
            Tab(icon: Icon(Icons.person_search), text: 'Integração'),
          ],
        ),
      ),
      body: TabBarView(
        controller: _tabController,
        children: [
          _buildDashboard(context),
          _buildFacilitadorForm(context),
          _buildIntegration(context),
        ],
      ),
    );
  }

  Widget _buildDashboard(BuildContext context) {
    return Consumer<UserController>(
      builder: (context, userController, _) {
        final users = userController.allUsers;

        // Calcular estatísticas
        final totalNonMembers = users.where((u) => u.member != true).length;
        final totalMembers = users.where((u) => u.member == true).length;
        final totalBaptized = users.where((u) => u.baptized == true).length;
        final totalNonBaptized = users.where((u) => u.baptized != true).length;

        return SingleChildScrollView(
          padding: const EdgeInsets.all(16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Card não membros
              Card(
                child: Padding(
                  padding: const EdgeInsets.all(20),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          const Text(
                            'Não Membros',
                            style: TextStyle(fontSize: 14, color: Colors.grey),
                          ),
                          const SizedBox(height: 8),
                          Text(
                            '$totalNonMembers',
                            style: const TextStyle(
                              fontSize: 32,
                              fontWeight: FontWeight.bold,
                              color: Colors.orange,
                            ),
                          ),
                        ],
                      ),
                      const Icon(
                        Icons.person_outline,
                        size: 48,
                        color: Colors.orange,
                      ),
                    ],
                  ),
                ),
              ),
              const SizedBox(height: 12),

              // Card membros
              Card(
                child: Padding(
                  padding: const EdgeInsets.all(20),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          const Text(
                            'Membros',
                            style: TextStyle(fontSize: 14, color: Colors.grey),
                          ),
                          const SizedBox(height: 8),
                          Text(
                            '$totalMembers',
                            style: const TextStyle(
                              fontSize: 32,
                              fontWeight: FontWeight.bold,
                              color: Colors.green,
                            ),
                          ),
                        ],
                      ),
                      const Icon(
                        Icons.verified_user,
                        size: 48,
                        color: Colors.green,
                      ),
                    ],
                  ),
                ),
              ),
              const SizedBox(height: 12),

              // Card batizados
              Card(
                child: Padding(
                  padding: const EdgeInsets.all(20),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          const Text(
                            'Batizados',
                            style: TextStyle(fontSize: 14, color: Colors.grey),
                          ),
                          const SizedBox(height: 8),
                          Text(
                            '$totalBaptized',
                            style: const TextStyle(
                              fontSize: 32,
                              fontWeight: FontWeight.bold,
                              color: Colors.blue,
                            ),
                          ),
                        ],
                      ),
                      const Icon(Icons.favorite, size: 48, color: Colors.blue),
                    ],
                  ),
                ),
              ),
              const SizedBox(height: 12),

              // Card não batizados
              Card(
                child: Padding(
                  padding: const EdgeInsets.all(20),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          const Text(
                            'Não Batizados',
                            style: TextStyle(fontSize: 14, color: Colors.grey),
                          ),
                          const SizedBox(height: 8),
                          Text(
                            '$totalNonBaptized',
                            style: const TextStyle(
                              fontSize: 32,
                              fontWeight: FontWeight.bold,
                              color: Colors.red,
                            ),
                          ),
                        ],
                      ),
                      const Icon(
                        Icons.remove_circle_outline,
                        size: 48,
                        color: Colors.red,
                      ),
                    ],
                  ),
                ),
              ),
            ],
          ),
        );
      },
    );
  }

  Widget _buildFacilitadorForm(BuildContext context) {
    return Consumer2<UserController, ChurchController>(
      builder: (context, userController, churchController, _) {
        return SingleChildScrollView(
          padding: const EdgeInsets.all(16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const Text(
                'Cadastro de Facilitador',
                style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
              ),
              const SizedBox(height: 20),

              // Informações Básicas
              const Text(
                'Informações Básicas',
                style: TextStyle(fontSize: 14, fontWeight: FontWeight.bold),
              ),
              const SizedBox(height: 12),
              TextField(
                controller: _nameController,
                decoration: InputDecoration(
                  labelText: 'Nome *',
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(8),
                  ),
                ),
              ),
              const SizedBox(height: 12),
              TextField(
                controller: _emailController,
                decoration: InputDecoration(
                  labelText: 'Email *',
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(8),
                  ),
                ),
              ),
              const SizedBox(height: 12),
              TextField(
                controller: _phoneController,
                decoration: InputDecoration(
                  labelText: 'Telefone *',
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(8),
                  ),
                ),
              ),
              const SizedBox(height: 12),
              DropdownButtonFormField<String>(
                value: _selectedGender,
                decoration: InputDecoration(
                  labelText: 'Gênero',
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(8),
                  ),
                ),
                items: RegisterConstants.genderOptions
                    .map(
                      (option) => DropdownMenuItem<String>(
                        value: option,
                        child: Text(option),
                      ),
                    )
                    .toList(),
                onChanged: (String? value) {
                  setState(() {
                    _selectedGender = value;
                  });
                },
              ),
              const SizedBox(height: 12),
              GestureDetector(
                onTap: () => _selectDate(context),
                child: TextField(
                  controller: _birthdateController,
                  enabled: false,
                  decoration: InputDecoration(
                    labelText: 'Data de Nascimento',
                    hintText: 'Dia/Mês/Ano',
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(8),
                    ),
                    prefixIcon: const Icon(Icons.calendar_today),
                  ),
                ),
              ),
              const SizedBox(height: 20),

              // Informações da Igreja
              const Text(
                'Igreja',
                style: TextStyle(fontSize: 14, fontWeight: FontWeight.bold),
              ),
              const SizedBox(height: 12),
              DropdownButtonFormField<ChurchDTO>(
                value: _selectedChurch,
                decoration: InputDecoration(
                  labelText: 'Selecionar Igreja',
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(8),
                  ),
                ),
                items: churchController.churches
                    .map(
                      (church) => DropdownMenuItem<ChurchDTO>(
                        value: church,
                        child: Text(church.name),
                      ),
                    )
                    .toList(),
                onChanged: (ChurchDTO? value) {
                  setState(() {
                    _selectedChurch = value;
                  });
                },
              ),
              const SizedBox(height: 20),

              // Endereço
              const Text(
                'Endereço',
                style: TextStyle(fontSize: 14, fontWeight: FontWeight.bold),
              ),
              const SizedBox(height: 12),
              TextField(
                controller: _addressController,
                decoration: InputDecoration(
                  labelText: 'Rua/Endereço',
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(8),
                  ),
                ),
              ),
              const SizedBox(height: 12),
              TextField(
                controller: _neighborhoodController,
                decoration: InputDecoration(
                  labelText: 'Bairro',
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(8),
                  ),
                ),
              ),
              const SizedBox(height: 12),
              TextField(
                controller: _cityController,
                decoration: InputDecoration(
                  labelText: 'Cidade',
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(8),
                  ),
                ),
              ),
              const SizedBox(height: 12),
              TextField(
                controller: _stateController,
                decoration: InputDecoration(
                  labelText: 'Estado',
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(8),
                  ),
                ),
              ),
              const SizedBox(height: 12),
              TextField(
                controller: _cepController,
                decoration: InputDecoration(
                  labelText: 'CEP',
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(8),
                  ),
                ),
              ),
              const SizedBox(height: 20),

              // Outros Dados
              const Text(
                'Outros Dados',
                style: TextStyle(fontSize: 14, fontWeight: FontWeight.bold),
              ),
              const SizedBox(height: 12),
              DropdownButtonFormField<String>(
                value: _selectedInvitation,
                decoration: InputDecoration(
                  labelText: 'Convite de Graça',
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(8),
                  ),
                ),
                items: RegisterConstants.invitationOptions
                    .map(
                      (option) => DropdownMenuItem<String>(
                        value: option,
                        child: Text(option),
                      ),
                    )
                    .toList(),
                onChanged: (String? value) {
                  setState(() {
                    _selectedInvitation = value;
                  });
                },
              ),
              const SizedBox(height: 12),
              DropdownButtonFormField<String>(
                value: _selectedStatus,
                decoration: InputDecoration(
                  labelText: 'Status',
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(8),
                  ),
                ),
                items: RegisterConstants.statusOptions
                    .map(
                      (option) => DropdownMenuItem<String>(
                        value: option,
                        child: Text(option),
                      ),
                    )
                    .toList(),
                onChanged: (String? value) {
                  setState(() {
                    _selectedStatus = value;
                  });
                },
              ),
              const SizedBox(height: 20),

              // Facilitador
              const Text(
                'Dados do Facilitador',
                style: TextStyle(fontSize: 14, fontWeight: FontWeight.bold),
              ),
              const SizedBox(height: 12),
              TextField(
                onChanged: (value) {
                  setState(() {
                    _selectedFacilitador = value;
                  });
                },
                decoration: InputDecoration(
                  labelText: 'Facilitador',
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(8),
                  ),
                  hintText: 'Nome do facilitador',
                ),
              ),
              const SizedBox(height: 20),

              // Status Checkboxes
              const Text(
                'Status do Membro',
                style: TextStyle(fontSize: 14, fontWeight: FontWeight.bold),
              ),
              const SizedBox(height: 12),
              CheckboxListTile(
                title: const Text('Batizado'),
                value: _baptized,
                onChanged: (value) {
                  setState(() {
                    _baptized = value ?? false;
                  });
                },
              ),
              CheckboxListTile(
                title: const Text('Membro'),
                value: _member,
                onChanged: (value) {
                  setState(() {
                    _member = value ?? false;
                  });
                },
              ),
              const SizedBox(height: 20),

              // Botão de Cadastro
              SizedBox(
                width: double.infinity,
                child: ElevatedButton.icon(
                  icon: const Icon(Icons.person_add),
                  label: const Text('Cadastrar Facilitador'),
                  onPressed: () async {
                    if (_nameController.text.isEmpty ||
                        _emailController.text.isEmpty ||
                        _phoneController.text.isEmpty) {
                      ScaffoldMessenger.of(context).showSnackBar(
                        const SnackBar(
                          content: Text(
                            'Preencha os campos obrigatórios (Nome, Email, Telefone)',
                          ),
                        ),
                      );
                      return;
                    }

                    DateTime? birthdate;
                    if (_birthdateController.text.isNotEmpty) {
                      birthdate = _parseBirthdateFacilitador(
                        _birthdateController.text,
                      );
                      if (birthdate == null) {
                        ScaffoldMessenger.of(context).showSnackBar(
                          const SnackBar(content: Text('Data inválida')),
                        );
                        return;
                      }
                    }

                    final address = _addressController.text.isNotEmpty
                        ? AddressDTO(
                            address: _addressController.text,
                            neighborhood: _neighborhoodController.text,
                            city: _cityController.text,
                            state: _stateController.text,
                            cep: _cepController.text,
                          )
                        : null;

                    final token = userController.currentUser?.accessToken ?? '';

                    final success = await userController.createFacilitator(
                      name: _nameController.text,
                      email: _emailController.text,
                      phone: _phoneController.text,
                      gender: _selectedGender,
                      birthdate: birthdate,
                      churchId: _selectedChurch?.id,
                      address: address,
                      invitationofgrace: _selectedInvitation,
                      status: _selectedStatus,
                      facilitador: _selectedFacilitador,
                      baptized: _baptized,
                      member: _member,
                      token: token,
                    );

                    if (success) {
                      _nameController.clear();
                      _emailController.clear();
                      _phoneController.clear();
                      _birthdateController.clear();
                      _addressController.clear();
                      _neighborhoodController.clear();
                      _cityController.clear();
                      _stateController.clear();
                      _cepController.clear();
                      setState(() {
                        _selectedGender = null;
                        _selectedChurch = null;
                        _selectedInvitation = null;
                        _selectedStatus = null;
                        _selectedFacilitador = null;
                        _baptized = false;
                        _member = false;
                      });

                      ScaffoldMessenger.of(context).showSnackBar(
                        const SnackBar(
                          content: Text('Facilitador cadastrado com sucesso!'),
                          backgroundColor: Colors.green,
                        ),
                      );
                    } else {
                      ScaffoldMessenger.of(context).showSnackBar(
                        SnackBar(
                          content: Text(
                            'Erro ao cadastrar: ${userController.error}',
                          ),
                          backgroundColor: Colors.red,
                        ),
                      );
                    }
                  },
                ),
              ),
              const SizedBox(height: 20),
            ],
          ),
        );
      },
    );
  }

  Widget _buildIntegration(BuildContext context) {
    return Consumer<UserController>(
      builder: (context, userController, _) {
        final allUsers = userController.allUsers;

        // Filtrar pela busca
        final filteredUsers = allUsers.where((user) {
          final searchLower = _searchQuery.toLowerCase();
          final nameLower = user.name.toLowerCase();
          final phoneLower = (user.phone ?? '').toLowerCase();
          return nameLower.contains(searchLower) ||
              phoneLower.contains(searchLower);
        }).toList();

        return Column(
          children: [
            // Search bar
            Padding(
              padding: const EdgeInsets.all(12),
              child: TextField(
                controller: _searchController,
                decoration: InputDecoration(
                  hintText: 'Pesquisar por nome ou telefone...',
                  prefixIcon: const Icon(Icons.search),
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(8),
                  ),
                  contentPadding: const EdgeInsets.symmetric(vertical: 12),
                ),
              ),
            ),

            // Lista
            Expanded(
              child: filteredUsers.isEmpty
                  ? const Center(child: Text('Nenhum usuário encontrado'))
                  : ListView.builder(
                      padding: const EdgeInsets.all(12),
                      itemCount: filteredUsers.length,
                      itemBuilder: (context, index) {
                        final user = filteredUsers[index];
                        return Card(
                          margin: const EdgeInsets.only(bottom: 8),
                          child: ListTile(
                            leading: CircleAvatar(
                              child: Text(user.name[0].toUpperCase()),
                            ),
                            title: Text(user.name),
                            subtitle: Row(
                              children: [
                                Chip(
                                  label: Text(
                                    user.baptized ? 'Batizado' : 'Não Batizado',
                                    style: const TextStyle(
                                      fontSize: 11,
                                      color: Colors.white,
                                    ),
                                  ),
                                  backgroundColor: user.baptized
                                      ? Colors.green
                                      : Colors.orange,
                                  padding: const EdgeInsets.symmetric(
                                    horizontal: 8,
                                    vertical: 0,
                                  ),
                                ),
                                const SizedBox(width: 6),
                                Chip(
                                  label: Text(
                                    user.member == true
                                        ? 'Membro'
                                        : 'Não Membro',
                                    style: const TextStyle(
                                      fontSize: 11,
                                      color: Colors.white,
                                    ),
                                  ),
                                  backgroundColor: user.member == true
                                      ? Colors.blue
                                      : Colors.grey,
                                  padding: const EdgeInsets.symmetric(
                                    horizontal: 8,
                                    vertical: 0,
                                  ),
                                ),
                              ],
                            ),
                            onTap: () => _showUserDetail(context, user),
                          ),
                        );
                      },
                    ),
            ),
          ],
        );
      },
    );
  }

  void _showUserDetail(BuildContext context, dynamic user) {
    final screenWidth = MediaQuery.of(context).size.width;
    final isMobile = screenWidth < 600;

    showDialog(
      context: context,
      builder: (context) => Dialog(
        insetPadding: EdgeInsets.all(isMobile ? 16 : 32),
        child: SingleChildScrollView(
          child: ConstrainedBox(
            constraints: BoxConstraints(
              maxWidth: isMobile ? screenWidth - 32 : 700,
            ),
            child: Padding(
              padding: const EdgeInsets.all(24),
              child: Column(
                mainAxisSize: MainAxisSize.min,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  // Header
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              user.name,
                              style: const TextStyle(
                                fontSize: 20,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                            const SizedBox(height: 4),
                            Text(
                              user.email ?? '',
                              style: TextStyle(
                                fontSize: 12,
                                color: Colors.grey[600],
                              ),
                            ),
                          ],
                        ),
                      ),
                      IconButton(
                        icon: const Icon(Icons.close),
                        onPressed: () => Navigator.pop(context),
                      ),
                    ],
                  ),
                  const SizedBox(height: 20),
                  const Divider(),
                  const SizedBox(height: 20),

                  // Status
                  const Text(
                    'Status',
                    style: TextStyle(fontSize: 14, fontWeight: FontWeight.bold),
                  ),
                  const SizedBox(height: 12),
                  Wrap(
                    spacing: 8,
                    runSpacing: 8,
                    children: [
                      Chip(
                        label: Text(
                          user.baptized ? 'Batizado' : 'Não Batizado',
                          style: const TextStyle(
                            fontSize: 12,
                            color: Colors.white,
                          ),
                        ),
                        backgroundColor: user.baptized
                            ? Colors.green
                            : Colors.orange,
                      ),
                      Chip(
                        label: Text(
                          user.member == true ? 'Membro' : 'Não Membro',
                          style: const TextStyle(
                            fontSize: 12,
                            color: Colors.white,
                          ),
                        ),
                        backgroundColor: user.member == true
                            ? Colors.blue
                            : Colors.grey,
                      ),
                    ],
                  ),
                  const SizedBox(height: 20),
                  const Divider(),
                  const SizedBox(height: 20),

                  // Informações pessoais
                  const Text(
                    'Informações Pessoais',
                    style: TextStyle(fontSize: 14, fontWeight: FontWeight.bold),
                  ),
                  const SizedBox(height: 12),
                  _buildInfoRow('Email', user.email ?? '—'),
                  _buildInfoRow(
                    'Telefone',
                    user.phone ?? '—',
                    isPhone: true,
                    phone: user.phone,
                  ),
                  if (user.gender != null)
                    _buildInfoRow('Gênero', user.gender ?? '—'),
                  if (user.birthdate != null)
                    _buildInfoRow(
                      'Nascimento',
                      '${user.birthdate!.day}/${user.birthdate!.month}/${user.birthdate!.year}',
                    ),
                  if (user.status != null)
                    _buildInfoRow('Status', user.status ?? '—'),
                  if (user.invitationofgrace != null)
                    _buildInfoRow(
                      'Convite de Graça',
                      user.invitationofgrace ?? '—',
                    ),
                  if (user.facilitator != null)
                    _buildInfoRow('Facilitador', user.facilitator ?? '—'),
                  if (user.address != null)
                    _buildInfoRow('Endereço', _formatAddress(user.address)),
                  const SizedBox(height: 20),

                  // Fechar
                  Row(
                    mainAxisAlignment: MainAxisAlignment.end,
                    children: [
                      ElevatedButton(
                        onPressed: () => Navigator.pop(context),
                        child: const Text('Fechar'),
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

  Widget _buildInfoRow(
    String label,
    String value, {
    bool isPhone = false,
    String? phone,
  }) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 12),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(label, style: TextStyle(fontSize: 13, color: Colors.grey[600])),
          Expanded(
            child: (isPhone && phone != null)
                ? GestureDetector(
                    onTap: () => _openWhatsApp(phone),
                    child: Text(
                      value,
                      textAlign: TextAlign.end,
                      softWrap: true,
                      style: const TextStyle(
                        fontSize: 13,
                        fontWeight: FontWeight.w500,
                        color: Colors.green,
                        decoration: TextDecoration.underline,
                      ),
                    ),
                  )
                : Text(
                    value,
                    textAlign: TextAlign.end,
                    softWrap: true,
                    style: const TextStyle(
                      fontSize: 13,
                      fontWeight: FontWeight.w500,
                    ),
                  ),
          ),
        ],
      ),
    );
  }

  String _formatAddress(dynamic address) {
    if (address == null) return '—';
    if (address is String) return address;

    // Se for um objeto AddressDTO, formata os campos
    try {
      final parts = <String>[];

      if (address.address != null && address.address.toString().isNotEmpty) {
        parts.add(address.address);
      }
      if (address.neighborhood != null &&
          address.neighborhood.toString().isNotEmpty) {
        parts.add(address.neighborhood);
      }
      if (address.city != null && address.city.toString().isNotEmpty) {
        parts.add(address.city);
      }
      if (address.state != null && address.state.toString().isNotEmpty) {
        parts.add(address.state);
      }
      if (address.cep != null && address.cep.toString().isNotEmpty) {
        parts.add(address.cep);
      }

      return parts.isNotEmpty ? parts.join(', ') : '—';
    } catch (e) {
      return '—';
    }
  }

  void _openWhatsApp(String phone) async {
    // Remove caracteres especiais do telefone
    final cleanPhone = phone.replaceAll(RegExp(r'[^0-9]'), '');
    final url = 'https://wa.me/$cleanPhone';

    try {
      if (await canLaunchUrl(Uri.parse(url))) {
        await launchUrl(Uri.parse(url), mode: LaunchMode.externalApplication);
      }
    } catch (e) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Não foi possível abrir WhatsApp')),
      );
    }
  }

  Future<void> _selectDate(BuildContext context) async {
    final picked = await showDatePicker(
      context: context,
      initialDate: DateTime.now(),
      firstDate: DateTime(1900),
      lastDate: DateTime.now(),
    );

    if (picked != null) {
      setState(() {
        _birthdateController.text =
            '${picked.day}/${picked.month}/${picked.year}';
      });
    }
  }

  DateTime? _parseBirthdateFacilitador(String dateString) {
    try {
      final parts = dateString.split('/');
      return DateTime(
        int.parse(parts[2]),
        int.parse(parts[1]),
        int.parse(parts[0]),
      );
    } catch (e) {
      return null;
    }
  }
}
