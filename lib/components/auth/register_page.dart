import 'package:flutter/material.dart';
import 'package:raraapp/api/user_api.dart';
import 'package:raraapp/components/auth/login_page.dart';
import 'package:raraapp/components/church/church_dropdown.dart';
import 'package:raraapp/components/shared/address_fields.dart';
import 'package:raraapp/components/shared/custom_checkbox.dart';
import 'package:raraapp/components/shared/custom_dropdown.dart';
import 'package:raraapp/components/shared/custom_text_field.dart';
import 'package:raraapp/components/shared/date_field.dart';
import 'package:raraapp/components/shared/feedback.dart';
import 'package:raraapp/components/shared/input_formatters.dart';
import 'package:raraapp/constants/register_constants.dart';
import 'package:raraapp/hooks/use_auth.dart';
import 'package:raraapp/utils/validators.dart';

class RegisterPage extends StatefulWidget {
  const RegisterPage({super.key});

  @override
  State<RegisterPage> createState() => _RegisterPageState();
}

class _RegisterPageState extends State<RegisterPage> {
  final _formKey = GlobalKey<FormState>();
  final _name = TextEditingController();
  final _email = TextEditingController();
  final _password = TextEditingController();
  final _passwordConfirm = TextEditingController();
  final _phone = TextEditingController();
  final _address = AddressForm();

  String? _country;
  String? _gender;
  String? _churchId;
  DateTime? _birthdate;
  bool _baptized = false;

  @override
  void dispose() {
    for (final c in [_name, _email, _password, _passwordConfirm, _phone]) {
      c.dispose();
    }
    _address.dispose();
    super.dispose();
  }

  /// DDI do país + números digitados.
  String? get _fullPhone {
    final ddi = RegisterConstants.countriesWithDDI[_country];
    final digits = _phone.text.replaceAll(RegExp(r'[^0-9]'), '');
    if (digits.isEmpty || ddi == null) return null;
    return '$ddi$digits';
  }

  Future<void> _submit() async {
    if (!_formKey.currentState!.validate()) return;

    final user = User(
      name: _name.text.trim(),
      email: _email.text.trim(),
      phone: _fullPhone,
      gender: _gender,
      birthdate: _birthdate,
      churchId: _churchId,
      address: _address.toAddress(),
      baptized: _baptized,
    );

    final auth = useAuth(context, listen: false);
    final ok = await auth.register(user, _password.text);
    if (!mounted) return;

    showResult(
      context,
      ok: ok,
      success: 'Cadastro realizado com sucesso!',
      error: auth.error,
    );
    if (ok) {
      Navigator.of(
        context,
      ).pushReplacement(MaterialPageRoute(builder: (_) => const LoginPage()));
    }
  }

  @override
  Widget build(BuildContext context) {
    final isLoading = useAuth(context).isLoading;
    const gap = SizedBox(height: 16);

    return Scaffold(
      appBar: AppBar(
        title: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            Image.asset('assets/images/logorara.png', width: 32, height: 32),
            const SizedBox(width: 8),
            const Text('Cadastro'),
          ],
        ),
        centerTitle: true,
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Form(
          key: _formKey,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              CustomTextField(
                label: 'Nome Completo',
                controller: _name,
                prefixIcon: Icons.person,
                validator: RegisterValidators.validateName,
              ),
              gap,
              CustomTextField(
                label: 'Email',
                controller: _email,
                keyboardType: TextInputType.emailAddress,
                prefixIcon: Icons.email,
                validator: RegisterValidators.validateEmail,
                inputFormatters: [LowercaseNoSpaceFormatter()],
              ),
              gap,
              CustomDropdown<String>(
                label: 'País',
                value: _country,
                items: RegisterConstants.countriesWithDDI.keys.toList(),
                onChanged: (value) => setState(() => _country = value),
              ),
              gap,
              CustomTextField(
                label: 'Telefone',
                controller: _phone,
                keyboardType: TextInputType.phone,
                prefixIcon: Icons.phone,
                validator: RegisterValidators.validatePhone,
                hintText: 'DDD + número',
              ),
              gap,
              ChurchDropdown(
                value: _churchId,
                onChanged: (id) => setState(() => _churchId = id),
              ),
              gap,
              CustomDropdown<String>(
                label: 'Gênero',
                value: _gender,
                items: userGenders,
                onChanged: (value) => setState(() => _gender = value),
              ),
              gap,
              DateField(
                label: 'Data de Nascimento',
                value: _birthdate,
                onChanged: (date) => setState(() => _birthdate = date),
              ),
              gap,
              CustomTextField(
                label: 'Senha',
                controller: _password,
                obscureText: true,
                prefixIcon: Icons.lock,
                validator: RegisterValidators.validatePassword,
                inputFormatters: [NoSpaceFormatter()],
              ),
              gap,
              CustomTextField(
                label: 'Confirmar Senha',
                controller: _passwordConfirm,
                obscureText: true,
                prefixIcon: Icons.lock,
                validator: (v) => RegisterValidators.validatePasswordConfirm(
                  v,
                  _password.text,
                ),
                inputFormatters: [NoSpaceFormatter()],
              ),
              const SizedBox(height: 24),
              AddressFields(form: _address),
              gap,
              CustomCheckbox(
                label: 'Batizado',
                value: _baptized,
                onChanged: (value) =>
                    setState(() => _baptized = value ?? false),
              ),
              const SizedBox(height: 24),
              ElevatedButton(
                onPressed: isLoading ? null : _submit,
                child: isLoading
                    ? const SizedBox(
                        height: 20,
                        width: 20,
                        child: CircularProgressIndicator(strokeWidth: 2),
                      )
                    : const Text('Cadastrar'),
              ),
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  const Text('Já tem uma conta? '),
                  TextButton(
                    onPressed: () => Navigator.of(context).pushReplacement(
                      MaterialPageRoute(builder: (_) => const LoginPage()),
                    ),
                    child: const Text(
                      'Faça login',
                      style: TextStyle(fontWeight: FontWeight.bold),
                    ),
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
