import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:raraapp/constants/register_constants.dart';
import 'package:raraapp/controllers/church_controller.dart';
import 'package:raraapp/controllers/user_controller.dart';
import 'package:raraapp/models/user.dart';
import 'package:raraapp/models/church.dart';

class MyAccountView extends StatefulWidget {
  const MyAccountView({super.key});

  @override
  State<MyAccountView> createState() => _MyAccountViewState();
}

class _MyAccountViewState extends State<MyAccountView>
    with SingleTickerProviderStateMixin {
  late TabController _tabController;

  // Controllers para edição de perfil
  late TextEditingController _nameController;
  late TextEditingController _emailController;
  late TextEditingController _phoneController;
  late TextEditingController _birthdateController;
  late TextEditingController _addressController;
  late TextEditingController _cepController;
  late TextEditingController _neighborhoodController;
  late TextEditingController _cityController;
  late TextEditingController _stateController;
  late TextEditingController _countryController;

  // State para perfil
  String? _selectedGender;
  ChurchDTO? _selectedChurch;
  bool _baptized = false;

  // Controllers para alterar senha
  late TextEditingController _currentPasswordController;
  late TextEditingController _newPasswordController;
  late TextEditingController _confirmPasswordController;
  bool _obscureCurrentPassword = true;
  bool _obscureNewPassword = true;
  bool _obscureConfirmPassword = true;

  bool _isEditingProfile = false;

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 2, vsync: this);

    // Inicializar controllers
    _nameController = TextEditingController();
    _emailController = TextEditingController();
    _phoneController = TextEditingController();
    _birthdateController = TextEditingController();
    _addressController = TextEditingController();
    _cepController = TextEditingController();
    _neighborhoodController = TextEditingController();
    _cityController = TextEditingController();
    _stateController = TextEditingController();
    _countryController = TextEditingController();

    _currentPasswordController = TextEditingController();
    _newPasswordController = TextEditingController();
    _confirmPasswordController = TextEditingController();

    // Carregar dados
    Future.microtask(() {
      if (mounted) {
        final userController = context.read<UserController>();
        final churchController = context.read<ChurchController>();

        churchController.loadAllChurches();
        _loadCurrentUserData(userController);
      }
    });
  }

  void _loadCurrentUserData(UserController userController) {
    final user = userController.currentUser;
    if (user != null) {
      _nameController.text = user.name;
      _emailController.text = user.email;
      _phoneController.text = user.phone ?? '';
      _selectedGender = user.gender;
      if (user.birthdate != null) {
        _birthdateController.text =
            '${user.birthdate!.day}/${user.birthdate!.month}/${user.birthdate!.year}';
      }
      _addressController.text = user.address?.address ?? '';
      _cepController.text = user.address?.cep ?? '';
      _neighborhoodController.text = user.address?.neighborhood ?? '';
      _cityController.text = user.address?.city ?? '';
      _stateController.text = user.address?.state ?? '';
      _countryController.text = user.address?.country ?? '';
      _baptized = user.baptized ?? false;
    }
  }

  @override
  void dispose() {
    _tabController.dispose();
    _nameController.dispose();
    _emailController.dispose();
    _phoneController.dispose();
    _birthdateController.dispose();
    _addressController.dispose();
    _cepController.dispose();
    _neighborhoodController.dispose();
    _cityController.dispose();
    _stateController.dispose();
    _countryController.dispose();
    _currentPasswordController.dispose();
    _newPasswordController.dispose();
    _confirmPasswordController.dispose();
    super.dispose();
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

  DateTime? _parseBirthdate(String dateString) {
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

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Minha Conta'),
        bottom: TabBar(
          controller: _tabController,
          tabs: const [
            Tab(icon: Icon(Icons.person), text: 'Perfil'),
            Tab(icon: Icon(Icons.lock), text: 'Senha'),
          ],
        ),
      ),
      body: TabBarView(
        controller: _tabController,
        children: [_buildProfileTab(context), _buildPasswordTab(context)],
      ),
    );
  }

  Widget _buildProfileTab(BuildContext context) {
    return Consumer2<UserController, ChurchController>(
      builder: (context, userController, churchController, _) {
        if (userController.isLoading) {
          return const Center(child: CircularProgressIndicator());
        }

        return SingleChildScrollView(
          padding: const EdgeInsets.all(16),
          child: Column(
            children: [
              // Seção de Informações Básicas
              const Text(
                'Informações Básicas',
                style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
              ),
              const SizedBox(height: 16),
              TextField(
                controller: _nameController,
                enabled: _isEditingProfile,
                decoration: InputDecoration(
                  labelText: 'Nome',
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(8),
                  ),
                  prefixIcon: const Icon(Icons.person),
                ),
              ),
              const SizedBox(height: 12),
              Padding(
                padding: const EdgeInsets.symmetric(vertical: 8.0),
                child: Row(
                  children: [
                    const Icon(Icons.email, size: 24),
                    const SizedBox(width: 16),
                    Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const Text(
                          'Email',
                          style: TextStyle(fontSize: 12, color: Colors.grey),
                        ),
                        Text(
                          _emailController.text,
                          style: const TextStyle(fontSize: 16),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 12),
              TextField(
                controller: _phoneController,
                enabled: _isEditingProfile,
                decoration: InputDecoration(
                  labelText: 'Telefone',
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(8),
                  ),
                  prefixIcon: const Icon(Icons.phone),
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
                onChanged: _isEditingProfile
                    ? (String? value) {
                        setState(() {
                          _selectedGender = value;
                        });
                      }
                    : null,
              ),
              const SizedBox(height: 12),
              GestureDetector(
                onTap: _isEditingProfile ? () => _selectDate(context) : null,
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

              // Seção de Igreja
              const Text(
                'Igreja',
                style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
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
                onChanged: _isEditingProfile
                    ? (ChurchDTO? value) {
                        setState(() {
                          _selectedChurch = value;
                        });
                      }
                    : null,
              ),
              const SizedBox(height: 20),

              // Seção de Endereço
              const Text(
                'Endereço',
                style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
              ),
              const SizedBox(height: 12),
              TextField(
                controller: _addressController,
                enabled: _isEditingProfile,
                decoration: InputDecoration(
                  labelText: 'Rua/Endereço',
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(8),
                  ),
                  prefixIcon: const Icon(Icons.location_on),
                ),
              ),
              const SizedBox(height: 12),
              TextField(
                controller: _neighborhoodController,
                enabled: _isEditingProfile,
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
                enabled: _isEditingProfile,
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
                enabled: _isEditingProfile,
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
                enabled: _isEditingProfile,
                decoration: InputDecoration(
                  labelText: 'CEP',
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(8),
                  ),
                ),
              ),
              const SizedBox(height: 12),
              TextField(
                controller: _countryController,
                enabled: _isEditingProfile,
                decoration: InputDecoration(
                  labelText: 'País',
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(8),
                  ),
                ),
              ),
              const SizedBox(height: 12),
              CheckboxListTile(
                title: const Text('Batizado'),
                value: _baptized,
                onChanged: _isEditingProfile
                    ? (value) {
                        setState(() {
                          _baptized = value ?? false;
                        });
                      }
                    : null,
              ),
              const SizedBox(height: 24),

              // Botões
              if (!_isEditingProfile)
                SizedBox(
                  width: double.infinity,
                  child: ElevatedButton.icon(
                    icon: const Icon(Icons.edit),
                    label: const Text('Editar Perfil'),
                    onPressed: () {
                      setState(() {
                        _isEditingProfile = true;
                      });
                    },
                  ),
                )
              else
                Row(
                  children: [
                    Expanded(
                      child: ElevatedButton.icon(
                        icon: const Icon(Icons.save),
                        label: const Text('Salvar'),
                        onPressed: userController.isLoading
                            ? null
                            : () async {
                                final data = {
                                  'name': _nameController.text,
                                  'phone': _phoneController.text.isEmpty
                                      ? null
                                      : _phoneController.text,
                                  'gender': _selectedGender,
                                  'birthdate': _birthdateController.text.isEmpty
                                      ? null
                                      : _birthdateController.text,
                                  'address': _addressController.text.isEmpty
                                      ? null
                                      : {
                                          'address': _addressController.text,
                                          'neighborhood':
                                              _neighborhoodController.text,
                                          'city': _cityController.text,
                                          'state': _stateController.text,
                                          'cep': _cepController.text,
                                          'country': _countryController.text,
                                        },
                                  'baptized': _baptized,
                                  'churchId': _selectedChurch?.id,
                                };

                                final success = await userController.updateUser(
                                  userId: userController.currentUser!.id!,
                                  data: data,
                                  token:
                                      userController.currentUser!.accessToken!,
                                );

                                if (success) {
                                  if (context.mounted) {
                                    ScaffoldMessenger.of(context).showSnackBar(
                                      const SnackBar(
                                        content: Text(
                                          'Perfil atualizado com sucesso!',
                                        ),
                                        backgroundColor: Colors.green,
                                      ),
                                    );
                                    setState(() {
                                      _isEditingProfile = false;
                                    });
                                  }
                                } else {
                                  if (context.mounted) {
                                    ScaffoldMessenger.of(context).showSnackBar(
                                      SnackBar(
                                        content: Text(
                                          userController.error ??
                                              'Erro ao salvar',
                                        ),
                                        backgroundColor: Colors.red,
                                      ),
                                    );
                                  }
                                }
                              },
                        style: ElevatedButton.styleFrom(
                          backgroundColor: Colors.green,
                        ),
                      ),
                    ),
                    const SizedBox(width: 12),
                    Expanded(
                      child: ElevatedButton.icon(
                        icon: const Icon(Icons.close),
                        label: const Text('Cancelar'),
                        onPressed: () {
                          _loadCurrentUserData(userController);
                          setState(() {
                            _isEditingProfile = false;
                          });
                        },
                        style: ElevatedButton.styleFrom(
                          backgroundColor: Colors.red,
                        ),
                      ),
                    ),
                  ],
                ),
              const SizedBox(height: 24),
            ],
          ),
        );
      },
    );
  }

  Widget _buildPasswordTab(BuildContext context) {
    return Consumer<UserController>(
      builder: (context, userController, _) {
        return SingleChildScrollView(
          padding: const EdgeInsets.all(16),
          child: Column(
            children: [
              const Text(
                'Alterar Senha',
                style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
              ),
              const SizedBox(height: 24),
              TextFormField(
                controller: _currentPasswordController,
                decoration: InputDecoration(
                  labelText: 'Senha Atual',
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(8),
                  ),
                  prefixIcon: const Icon(Icons.lock),
                  suffixIcon: IconButton(
                    icon: Icon(
                      _obscureCurrentPassword
                          ? Icons.visibility_off
                          : Icons.visibility,
                    ),
                    onPressed: () {
                      setState(() {
                        _obscureCurrentPassword = !_obscureCurrentPassword;
                      });
                    },
                  ),
                ),
                obscureText: _obscureCurrentPassword,
              ),
              const SizedBox(height: 16),
              TextFormField(
                controller: _newPasswordController,
                decoration: InputDecoration(
                  labelText: 'Nova Senha',
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(8),
                  ),
                  prefixIcon: const Icon(Icons.lock),
                  suffixIcon: IconButton(
                    icon: Icon(
                      _obscureNewPassword
                          ? Icons.visibility_off
                          : Icons.visibility,
                    ),
                    onPressed: () {
                      setState(() {
                        _obscureNewPassword = !_obscureNewPassword;
                      });
                    },
                  ),
                ),
                obscureText: _obscureNewPassword,
              ),
              const SizedBox(height: 16),
              TextFormField(
                controller: _confirmPasswordController,
                decoration: InputDecoration(
                  labelText: 'Confirmar Nova Senha',
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(8),
                  ),
                  prefixIcon: const Icon(Icons.lock),
                  suffixIcon: IconButton(
                    icon: Icon(
                      _obscureConfirmPassword
                          ? Icons.visibility_off
                          : Icons.visibility,
                    ),
                    onPressed: () {
                      setState(() {
                        _obscureConfirmPassword = !_obscureConfirmPassword;
                      });
                    },
                  ),
                ),
                obscureText: _obscureConfirmPassword,
              ),
              const SizedBox(height: 24),
              SizedBox(
                width: double.infinity,
                child: ElevatedButton.icon(
                  icon: const Icon(Icons.save),
                  label: const Text('Alterar Senha'),
                  onPressed: userController.isLoading
                      ? null
                      : () async {
                          if (_currentPasswordController.text.isEmpty ||
                              _newPasswordController.text.isEmpty ||
                              _confirmPasswordController.text.isEmpty) {
                            ScaffoldMessenger.of(context).showSnackBar(
                              const SnackBar(
                                content: Text('Preencha todos os campos'),
                              ),
                            );
                            return;
                          }

                          if (_newPasswordController.text !=
                              _confirmPasswordController.text) {
                            ScaffoldMessenger.of(context).showSnackBar(
                              const SnackBar(
                                content: Text('Senhas não conferem'),
                              ),
                            );
                            return;
                          }

                          final success = await userController.updatePassword(
                            userId: userController.currentUser!.id!,
                            currentPassword: _currentPasswordController.text,
                            newPassword: _newPasswordController.text,
                            token: userController.currentUser!.accessToken!,
                          );

                          if (success) {
                            if (context.mounted) {
                              ScaffoldMessenger.of(context).showSnackBar(
                                const SnackBar(
                                  content: Text('Senha alterada com sucesso!'),
                                  backgroundColor: Colors.green,
                                ),
                              );
                              _currentPasswordController.clear();
                              _newPasswordController.clear();
                              _confirmPasswordController.clear();
                            }
                          } else {
                            if (context.mounted) {
                              ScaffoldMessenger.of(context).showSnackBar(
                                SnackBar(
                                  content: Text(
                                    userController.error ??
                                        'Erro ao alterar senha',
                                  ),
                                  backgroundColor: Colors.red,
                                ),
                              );
                            }
                          }
                        },
                  style: ElevatedButton.styleFrom(
                    padding: const EdgeInsets.symmetric(vertical: 12),
                  ),
                ),
              ),
              const SizedBox(height: 24),
            ],
          ),
        );
      },
    );
  }
}
