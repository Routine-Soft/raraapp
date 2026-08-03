import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:raraapp/constants/register_constants.dart';
import 'package:raraapp/controllers/church_controller.dart';
import 'package:raraapp/controllers/user_controller.dart';
import 'package:raraapp/models/church.dart';
import 'package:raraapp/models/user.dart';
import 'package:raraapp/utils/validators.dart';
import 'package:raraapp/widgets/custom_checkbox.dart';
import 'package:raraapp/widgets/custom_dropdown.dart';
import 'package:raraapp/widgets/custom_text_field.dart';

class RegisterScreen extends StatefulWidget {
  const RegisterScreen({super.key});

  @override
  State<RegisterScreen> createState() => _RegisterScreenState();
}

class _RegisterScreenState extends State<RegisterScreen> {
  late TextEditingController _nameController;
  late TextEditingController _emailController;
  late TextEditingController _passwordController;
  late TextEditingController _passwordConfirmController;
  late TextEditingController _phoneController;
  late TextEditingController _birthdateController;
  late TextEditingController _addressController;
  late TextEditingController _cepController;
  late TextEditingController _neighborhoodController;
  late TextEditingController _cityController;
  late TextEditingController _stateController;
  late TextEditingController _countryController;

  final _formKey = GlobalKey<FormState>();

  String? _selectedGender;
  String? _selectedStatus;
  String? _selectedInvitation;
  ChurchDTO? _selectedChurch;
  bool _baptized = false;
  bool _member = false;

  @override
  void initState() {
    super.initState();
    _nameController = TextEditingController();
    _emailController = TextEditingController();
    _passwordController = TextEditingController();
    _passwordConfirmController = TextEditingController();
    _phoneController = TextEditingController();
    _birthdateController = TextEditingController();
    _addressController = TextEditingController();
    _cepController = TextEditingController();
    _neighborhoodController = TextEditingController();
    _cityController = TextEditingController();
    _stateController = TextEditingController();
    _countryController = TextEditingController();

    // Carregar igrejas quando a tela abre
    WidgetsBinding.instance.addPostFrameCallback((_) {
      context.read<ChurchController>().loadChurches();
    });
  }

  @override
  void dispose() {
    _nameController.dispose();
    _emailController.dispose();
    _passwordController.dispose();
    _passwordConfirmController.dispose();
    _phoneController.dispose();
    _birthdateController.dispose();
    _addressController.dispose();
    _cepController.dispose();
    _neighborhoodController.dispose();
    _cityController.dispose();
    _stateController.dispose();
    _countryController.dispose();
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
        _birthdateController.text = '${picked.day}/${picked.month}/${picked.year}';
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Cadastro'),
        centerTitle: true,
      ),
      body: Consumer<UserController>(
        builder: (context, userController, child) {
          return SingleChildScrollView(
            padding: const EdgeInsets.all(16),
            child: Form(
              key: _formKey,
              child: Column(
                children: [
                  // Nome
                  CustomTextField(
                    label: RegisterConstants.labelName,
                    controller: _nameController,
                    prefixIcon: Icons.person,
                    validator: RegisterValidators.validateName,
                  ),
                  const SizedBox(height: 16),

                  // Email
                  CustomTextField(
                    label: RegisterConstants.labelEmail,
                    controller: _emailController,
                    keyboardType: TextInputType.emailAddress,
                    prefixIcon: Icons.email,
                    validator: RegisterValidators.validateEmail,
                  ),
                  const SizedBox(height: 16),

                  // Telefone
                  CustomTextField(
                    label: RegisterConstants.labelPhone,
                    controller: _phoneController,
                    keyboardType: TextInputType.phone,
                    prefixIcon: Icons.phone,
                    validator: RegisterValidators.validatePhone,
                  ),
                  const SizedBox(height: 16),

                  // Igreja
                  Consumer<ChurchController>(
                    builder: (context, churchController, child) {
                      if (churchController.isLoading) {
                        return const Center(
                          child: CircularProgressIndicator(),
                        );
                      }

                      return CustomDropdown<ChurchDTO>(
                        label: 'Igreja',
                        value: _selectedChurch,
                        items: churchController.churches,
                        onChanged: (value) {
                          setState(() => _selectedChurch = value);
                        },
                        itemLabel: (church) => church.name,
                      );
                    },
                  ),
                  const SizedBox(height: 16),
                  CustomDropdown<String>(
                    label: RegisterConstants.labelGender,
                    value: _selectedGender,
                    items: RegisterConstants.genderOptions,
                    onChanged: (value) {
                      setState(() => _selectedGender = value);
                    },
                  ),
                  const SizedBox(height: 16),

                  // Data de Nascimento
                  GestureDetector(
                    onTap: () => _selectDate(context),
                    child: CustomTextField(
                      label: RegisterConstants.labelBirthdate,
                      controller: _birthdateController,
                      prefixIcon: Icons.calendar_today,
                      keyboardType: TextInputType.none,
                    ),
                  ),
                  const SizedBox(height: 16),

                  // Senha
                  CustomTextField(
                    label: RegisterConstants.labelPassword,
                    controller: _passwordController,
                    obscureText: true,
                    prefixIcon: Icons.lock,
                    validator: RegisterValidators.validatePassword,
                  ),
                  const SizedBox(height: 16),

                  // Confirmação de Senha
                  CustomTextField(
                    label: 'Confirmar Senha',
                    controller: _passwordConfirmController,
                    obscureText: true,
                    prefixIcon: Icons.lock,
                    validator: (value) => RegisterValidators.validatePasswordConfirm(
                      value,
                      _passwordController.text,
                    ),
                  ),
                  const SizedBox(height: 24),

                  // Seção de Endereço
                  const Align(
                    alignment: Alignment.centerLeft,
                    child: Text(
                      'Endereço (Opcional)',
                      style: TextStyle(
                        fontSize: 16,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ),
                  const SizedBox(height: 16),

                  // Endereço
                  CustomTextField(
                    label: RegisterConstants.labelAddress,
                    controller: _addressController,
                    prefixIcon: Icons.location_on,
                  ),
                  const SizedBox(height: 16),

                  // CEP
                  CustomTextField(
                    label: RegisterConstants.labelCep,
                    controller: _cepController,
                    keyboardType: TextInputType.number,
                    prefixIcon: Icons.mail,
                    validator: RegisterValidators.validateCep,
                  ),
                  const SizedBox(height: 16),

                  // Bairro
                  CustomTextField(
                    label: RegisterConstants.labelNeighborhood,
                    controller: _neighborhoodController,
                    prefixIcon: Icons.map,
                  ),
                  const SizedBox(height: 16),

                  // Cidade
                  CustomTextField(
                    label: RegisterConstants.labelCity,
                    controller: _cityController,
                    prefixIcon: Icons.domain,
                  ),
                  const SizedBox(height: 16),

                  // Estado
                  CustomTextField(
                    label: RegisterConstants.labelState,
                    controller: _stateController,
                    prefixIcon: Icons.location_city,
                  ),
                  const SizedBox(height: 16),

                  // País
                  CustomTextField(
                    label: RegisterConstants.labelCountry,
                    controller: _countryController,
                    prefixIcon: Icons.public,
                  ),
                  const SizedBox(height: 24),

                  // Seção Adicional
                  const Align(
                    alignment: Alignment.centerLeft,
                    child: Text(
                      'Informações Adicionais',
                      style: TextStyle(
                        fontSize: 16,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ),
                  const SizedBox(height: 16),

                  // Status
                  CustomDropdown<String>(
                    label: RegisterConstants.labelStatus,
                    value: _selectedStatus,
                    items: RegisterConstants.statusOptions,
                    onChanged: (value) {
                      setState(() => _selectedStatus = value);
                    },
                  ),
                  const SizedBox(height: 16),

                  // Convite da Graça
                  CustomDropdown<String>(
                    label: RegisterConstants.labelInvitation,
                    value: _selectedInvitation,
                    items: RegisterConstants.invitationOptions,
                    onChanged: (value) {
                      setState(() => _selectedInvitation = value);
                    },
                  ),
                  const SizedBox(height: 16),

                  // Batizado
                  CustomCheckbox(
                    label: RegisterConstants.labelBaptized,
                    value: _baptized,
                    onChanged: (value) {
                      setState(() => _baptized = value ?? false);
                    },
                  ),

                  const SizedBox(height: 32),

                  // Botão de Cadastro
                  SizedBox(
                    width: double.infinity,
                    child: ElevatedButton(
                      onPressed: userController.isLoading
                          ? null
                          : () async {
                              if (_formKey.currentState!.validate()) {
                                final address = AddressDTO(
                                  address: _addressController.text.isEmpty
                                      ? null
                                      : _addressController.text,
                                  cep: _cepController.text.isEmpty
                                      ? null
                                      : _cepController.text,
                                  neighborhood:
                                      _neighborhoodController.text.isEmpty
                                          ? null
                                          : _neighborhoodController.text,
                                  city: _cityController.text.isEmpty
                                      ? null
                                      : _cityController.text,
                                  state: _stateController.text.isEmpty
                                      ? null
                                      : _stateController.text,
                                  country: _countryController.text.isEmpty
                                      ? null
                                      : _countryController.text,
                                );

                                final success = await userController.register(
                                  name: _nameController.text,
                                  email: _emailController.text,
                                  password: _passwordController.text,
                                  phone: _phoneController.text.isEmpty
                                      ? null
                                      : _phoneController.text,
                                  gender: _selectedGender,
                                  birthdate: _birthdateController.text.isEmpty
                                      ? null
                                      : _parseBirthdate(
                                          _birthdateController.text),
                                  churchId: _selectedChurch?.id,
                                  address: address,
                                  status: _selectedStatus,
                                  invitationofgrace: _selectedInvitation,
                                  baptized: _baptized,
                                  member: _member,
                                );

                                if (success) {
                                  if (context.mounted) {
                                    ScaffoldMessenger.of(context)
                                        .showSnackBar(
                                      const SnackBar(
                                        content: Text(
                                          'Cadastro realizado com sucesso!',
                                        ),
                                      ),
                                    );
                                    // Navegar para tela de login ou home
                                    // Navigator.of(context).pushReplacementNamed('/login');
                                  }
                                } else {
                                  if (context.mounted) {
                                    ScaffoldMessenger.of(context)
                                        .showSnackBar(
                                      SnackBar(
                                        content: Text(
                                          userController.error ??
                                              'Falha ao registrar',
                                        ),
                                      ),
                                    );
                                  }
                                }
                              }
                            },
                      child: userController.isLoading
                          ? const SizedBox(
                              height: 20,
                              width: 20,
                              child: CircularProgressIndicator(
                                strokeWidth: 2,
                              ),
                            )
                          : const Text('Cadastrar'),
                    ),
                  ),

                  const SizedBox(height: 16),

                  // Link para login
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      const Text('Já tem uma conta? '),
                      GestureDetector(
                        onTap: () {
                          // Navigator.pop(context);
                        },
                        child: const Text(
                          'Faça login',
                          style: TextStyle(
                            color: Colors.blue,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                      ),
                    ],
                  ),

                  const SizedBox(height: 16),
                ],
              ),
            ),
          );
        },
      ),
    );
  }

  DateTime? _parseBirthdate(String dateString) {
    try {
      final parts = dateString.split('/');
      return DateTime(int.parse(parts[2]), int.parse(parts[1]),
          int.parse(parts[0]));
    } catch (e) {
      return null;
    }
  }
}
