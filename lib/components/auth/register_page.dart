import 'package:flutter/material.dart';
import 'package:raraapp/api/user_api.dart';
import 'package:raraapp/components/auth/login_page.dart';
import 'package:raraapp/components/church/church_dropdown.dart';
import 'package:raraapp/components/shared/address_fields.dart';
import 'package:raraapp/components/shared/custom_checkbox.dart';
import 'package:raraapp/components/shared/custom_dropdown.dart';
import 'package:raraapp/components/shared/custom_text_field.dart';
import 'package:raraapp/components/shared/date_field.dart';
import 'package:raraapp/components/shared/effects/fade_route.dart';
import 'package:raraapp/components/shared/effects/fade_slide_in.dart';
import 'package:raraapp/components/shared/effects/floating.dart';
import 'package:raraapp/components/shared/effects/glow_button.dart';
import 'package:raraapp/components/shared/effects/gradient_text.dart';
import 'package:raraapp/components/shared/feedback.dart';
import 'package:raraapp/components/shared/input_formatters.dart';
import 'package:raraapp/components/shared/rara_logo.dart';
import 'package:raraapp/components/shared/section.dart';
import 'package:raraapp/components/shared/showcase_page.dart';
import 'package:raraapp/components/user/ecclesiastical_roles_field.dart';
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
  List<String> _ecclesiastical = [];

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
      ecclesiasticalRoles: _ecclesiastical,
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
      Navigator.of(context).pushReplacement(fadeRoute(const LoginPage()));
    }
  }

  @override
  Widget build(BuildContext context) {
    final isLoading = useAuth(context).isLoading;
    final text = Theme.of(context).textTheme;
    final muted = Theme.of(
      context,
    ).colorScheme.onSurface.withValues(alpha: 0.75);

    Widget reveal(int order, Widget child) =>
        FadeSlideIn(delay: stagger(order), child: child);

    return ShowcasePage(
      maxWidth: 640,
      child: Form(
        key: _formKey,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            reveal(1, Floating(child: const RaraLogo(height: 56))),
            const SizedBox(height: 12),
            reveal(
              2,
              GradientText(
                'Criar conta',
                style: text.headlineMedium?.copyWith(
                  fontWeight: FontWeight.w800,
                ),
              ),
            ),
            reveal(
              3,
              Text(
                'Preencha seus dados para entrar na comunidade',
                textAlign: TextAlign.center,
                style: text.bodyMedium?.copyWith(color: muted),
              ),
            ),
            const SizedBox(height: 32),
            reveal(
              4,
              FormSection(
                icon: Icons.person_outline,
                title: 'Sobre você',
                children: [
                  CustomTextField(
                    label: 'Nome Completo',
                    controller: _name,
                    prefixIcon: Icons.person,
                    validator: RegisterValidators.validateName,
                  ),

                  CustomDropdown<String>(
                    label: 'Gênero',
                    value: _gender,
                    items: userGenders,
                    onChanged: (value) => setState(() => _gender = value),
                  ),
                  DateField(
                    label: 'Data de Nascimento',
                    value: _birthdate,
                    onChanged: (date) => setState(() => _birthdate = date),
                  ),
                  CustomCheckbox(
                    label: 'Batizado',
                    value: _baptized,
                    onChanged: (value) =>
                        setState(() => _baptized = value ?? false),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 32),
            reveal(
              5,
              FormSection(
                icon: Icons.contact_mail_outlined,
                title: 'Contato',
                children: [
                  CustomTextField(
                    label: 'Email',
                    controller: _email,
                    keyboardType: TextInputType.emailAddress,
                    prefixIcon: Icons.email,
                    validator: RegisterValidators.validateEmail,
                    inputFormatters: [LowercaseNoSpaceFormatter()],
                  ),

                  CustomDropdown<String>(
                    label: 'País',
                    value: _country,
                    items: RegisterConstants.countriesWithDDI.keys.toList(),
                    onChanged: (value) => setState(() => _country = value),
                  ),
                  CustomTextField(
                    label: 'Telefone',
                    controller: _phone,
                    keyboardType: TextInputType.phone,
                    prefixIcon: Icons.phone,
                    validator: RegisterValidators.validatePhone,
                    hintText: 'DDD + número',
                  ),
                ],
              ),
            ),
            const SizedBox(height: 32),
            reveal(
              6,
              FormSection(
                icon: Icons.church_outlined,
                title: 'Igreja',
                children: [
                  ChurchDropdown(
                    value: _churchId,
                    onChanged: (id) => setState(() => _churchId = id),
                  ),
                  EcclesiasticalRolesField(
                    value: _ecclesiastical,
                    onChanged: (v) => setState(() => _ecclesiastical = v),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 32),
            reveal(
              7,
              FormSection(
                icon: Icons.home_outlined,
                title: 'Endereço',
                children: [AddressFields(form: _address, showTitle: false)],
              ),
            ),
            const SizedBox(height: 32),
            reveal(
              8,
              FormSection(
                icon: Icons.lock_outline,
                title: 'Acesso',
                children: [
                  CustomTextField(
                    label: 'Senha',
                    controller: _password,
                    obscureText: true,
                    prefixIcon: Icons.lock,
                    validator: RegisterValidators.validatePassword,
                    inputFormatters: [NoSpaceFormatter()],
                  ),
                  CustomTextField(
                    label: 'Confirmar Senha',
                    controller: _passwordConfirm,
                    obscureText: true,
                    prefixIcon: Icons.lock,
                    validator: (v) =>
                        RegisterValidators.validatePasswordConfirm(
                          v,
                          _password.text,
                        ),
                    inputFormatters: [NoSpaceFormatter()],
                  ),
                ],
              ),
            ),
            const SizedBox(height: 32),
            reveal(
              9,
              GlowButton(
                label: 'Cadastrar',
                icon: Icons.check_circle_outline,
                loading: isLoading,
                onPressed: _submit,
              ),
            ),
            const SizedBox(height: 12),
            Wrap(
              alignment: WrapAlignment.center,
              crossAxisAlignment: WrapCrossAlignment.center,
              children: [
                Text('Já tem uma conta?', style: TextStyle(color: muted)),
                TextButton(
                  onPressed: () => Navigator.of(
                    context,
                  ).pushReplacement(fadeRoute(const LoginPage())),
                  child: const Text(
                    'Faça login',
                    style: TextStyle(fontWeight: FontWeight.w700),
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
