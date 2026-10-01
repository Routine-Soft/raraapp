import 'package:flutter/material.dart';
import 'package:raraapp/api/user_api.dart';
import 'package:raraapp/components/app/authenticated_app.dart';
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
import 'package:raraapp/components/shared/rara_logo.dart';
import 'package:raraapp/components/shared/section.dart';
import 'package:raraapp/components/shared/showcase_page.dart';
import 'package:raraapp/constants/register_constants.dart';
import 'package:raraapp/hooks/use_auth.dart';
import 'package:raraapp/utils/validators.dart';

/// Depois do primeiro login com Google: o Google só entrega nome e email,
/// então a pessoa completa o resto do cadastro (igual ao "Criar conta").
class CompleteProfilePage extends StatefulWidget {
  const CompleteProfilePage({super.key});

  @override
  State<CompleteProfilePage> createState() => _CompleteProfilePageState();
}

class _CompleteProfilePageState extends State<CompleteProfilePage> {
  final _formKey = GlobalKey<FormState>();
  late final _name = TextEditingController(
    text: useAuth(context, listen: false).user?.name,
  );
  final _phone = TextEditingController();
  final _address = AddressForm();

  String? _country;
  String? _gender;
  String? _churchId;
  DateTime? _birthdate;
  bool _baptized = false;

  @override
  void dispose() {
    _name.dispose();
    _phone.dispose();
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

  void _enterApp() => Navigator.of(
    context,
  ).pushAndRemoveUntil(fadeRoute(const AuthenticatedApp()), (_) => false);

  Future<void> _submit() async {
    if (!_formKey.currentState!.validate()) return;
    if (_churchId == null) {
      showResult(
        context,
        ok: false,
        success: '',
        error: 'Escolha a sua igreja',
      );
      return;
    }

    final auth = useAuth(context, listen: false);
    final current = auth.user!;
    final ok = await auth.updateProfile(
      User(
        id: current.id,
        name: _name.text.trim(),
        email: current.email,
        phone: _fullPhone,
        gender: _gender,
        birthdate: _birthdate,
        churchId: _churchId,
        address: _address.toAddress(),
        baptized: _baptized,
        member: current.member,
        roles: current.roles,
      ),
    );
    if (!mounted) return;

    showResult(
      context,
      ok: ok,
      success: 'Cadastro concluído!',
      error: auth.error,
    );
    if (ok) _enterApp();
  }

  @override
  Widget build(BuildContext context) {
    final auth = useAuth(context);
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
                'Complete seu cadastro',
                style: text.headlineMedium?.copyWith(
                  fontWeight: FontWeight.w800,
                ),
              ),
            ),
            reveal(
              3,
              Text(
                'Falta pouco: conte um pouco mais sobre você\n'
                '(${auth.user?.email})',
                textAlign: TextAlign.center,
                style: text.bodyMedium?.copyWith(color: muted),
              ),
            ),
            const SizedBox(height: 32),
            reveal(
              4,
              FormSection(
                icon: Icons.church_outlined,
                title: 'Igreja',
                children: [
                  ChurchDropdown(
                    value: _churchId,
                    onChanged: (id) => setState(() => _churchId = id),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 32),
            reveal(
              5,
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
              6,
              FormSection(
                icon: Icons.contact_mail_outlined,
                title: 'Contato',
                children: [
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
              GlowButton(
                label: 'Concluir cadastro',
                icon: Icons.check_circle_outline,
                loading: auth.isLoading,
                onPressed: _submit,
              ),
            ),
            const SizedBox(height: 12),
            TextButton(
              onPressed: auth.isLoading ? null : _enterApp,
              child: const Text('Completar depois'),
            ),
          ],
        ),
      ),
    );
  }
}
