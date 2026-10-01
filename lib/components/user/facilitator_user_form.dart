import 'package:flutter/material.dart';
import 'package:raraapp/api/user_api.dart';
import 'package:raraapp/components/shared/address_fields.dart';
import 'package:raraapp/components/shared/custom_checkbox.dart';
import 'package:raraapp/components/shared/custom_dropdown.dart';
import 'package:raraapp/components/shared/custom_text_field.dart';
import 'package:raraapp/components/shared/date_field.dart';
import 'package:raraapp/components/shared/effects/glow_button.dart';
import 'package:raraapp/components/shared/feedback.dart';
import 'package:raraapp/components/shared/input_formatters.dart';
import 'package:raraapp/components/shared/section.dart';
import 'package:raraapp/hooks/use_auth.dart';
import 'package:raraapp/hooks/use_churches.dart';
import 'package:raraapp/hooks/use_users.dart';
import 'package:raraapp/utils/validators.dart';

/// Formulário em que o facilitador cadastra um visitante. A pessoa entra
/// sempre na igreja do facilitador (o backend também garante isso).
class FacilitatorUserForm extends StatefulWidget {
  const FacilitatorUserForm({super.key});

  @override
  State<FacilitatorUserForm> createState() => _FacilitatorUserFormState();
}

class _FacilitatorUserFormState extends State<FacilitatorUserForm> {
  final _formKey = GlobalKey<FormState>();
  final _name = TextEditingController();
  final _email = TextEditingController();
  final _phone = TextEditingController();
  final _facilitator = TextEditingController();
  final _address = AddressForm();
  String? _gender;
  String? _invitation;
  String? _status;
  DateTime? _birthdate;
  bool _baptized = false;

  @override
  void dispose() {
    for (final c in [_name, _email, _phone, _facilitator]) {
      c.dispose();
    }
    _address.dispose();
    super.dispose();
  }

  void _reset() {
    for (final c in [_name, _email, _phone, _facilitator]) {
      c.clear();
    }
    _address.clear();
    setState(() {
      _gender = _invitation = _status = null;
      _birthdate = null;
      _baptized = false;
    });
  }

  Future<void> _submit() async {
    if (!_formKey.currentState!.validate()) return;

    final facilitator = _facilitator.text.trim();
    final users = useUsers(context, listen: false);
    final ok = await users.createByFacilitator(
      User(
        name: _name.text.trim(),
        email: _email.text.trim(),
        phone: _phone.text.trim(),
        gender: _gender,
        birthdate: _birthdate,
        address: _address.toAddress(),
        invitationofgrace: _invitation,
        status: _status,
        facilitator: facilitator.isEmpty ? null : facilitator,
        baptized: _baptized,
      ),
    );
    if (!mounted) return;
    showResult(
      context,
      ok: ok,
      success: 'Usuário cadastrado! Senha provisória: 123',
      error: users.error,
    );
    if (ok) _reset();
  }

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      padding: const EdgeInsets.fromLTRB(16, 16, 16, 32),
      child: Form(
        key: _formKey,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          spacing: 28,
          children: [
            FormSection(
              title: 'Informações Básicas',
              icon: Icons.person_outline,
              children: [
                CustomTextField(
                  label: 'Nome *',
                  controller: _name,
                  prefixIcon: Icons.person,
                  validator: RegisterValidators.validateName,
                ),
                CustomTextField(
                  label: 'Email *',
                  controller: _email,
                  prefixIcon: Icons.email,
                  keyboardType: TextInputType.emailAddress,
                  validator: RegisterValidators.validateEmail,
                  inputFormatters: [LowercaseNoSpaceFormatter()],
                ),
                CustomTextField(
                  label: 'Telefone *',
                  controller: _phone,
                  prefixIcon: Icons.phone,
                  keyboardType: TextInputType.phone,
                  validator: (v) => (v ?? '').trim().isEmpty
                      ? 'Telefone é obrigatório'
                      : null,
                ),
                CustomDropdown<String>(
                  label: 'Gênero',
                  value: _gender,
                  items: userGenders,
                  onChanged: (v) => setState(() => _gender = v),
                ),
                DateField(
                  label: 'Data de Nascimento',
                  value: _birthdate,
                  onChanged: (d) => setState(() => _birthdate = d),
                ),
              ],
            ),
            FormSection(
              title: 'Igreja',
              icon: Icons.church_outlined,
              children: [
                const _OwnChurch(),
                AddressFields(
                  form: _address,
                  showCountry: false,
                  showTitle: false,
                ),
              ],
            ),
            FormSection(
              title: 'Outros Dados',
              icon: Icons.tune,
              children: [
                CustomDropdown<String>(
                  label: 'Convite da Graça',
                  value: _invitation,
                  items: userInvitations,
                  onChanged: (v) => setState(() => _invitation = v),
                ),
                CustomDropdown<String>(
                  label: 'Status',
                  value: _status,
                  items: userStatuses,
                  onChanged: (v) => setState(() => _status = v),
                ),
                CustomTextField(
                  label: 'Facilitador',
                  controller: _facilitator,
                  prefixIcon: Icons.support_agent,
                  hintText: 'Nome do facilitador',
                ),
                CustomCheckbox(
                  label: 'Batizado',
                  value: _baptized,
                  onChanged: (v) => setState(() => _baptized = v ?? false),
                ),
              ],
            ),
            GlowButton(
              label: 'Cadastrar',
              icon: Icons.person_add,
              loading: useUsers(context).isLoading,
              onPressed: _submit,
            ),
          ],
        ),
      ),
    );
  }
}

/// Igreja do cadastro: a do facilitador, só para mostrar (não dá para trocar).
class _OwnChurch extends StatefulWidget {
  const _OwnChurch();

  @override
  State<_OwnChurch> createState() => _OwnChurchState();
}

class _OwnChurchState extends State<_OwnChurch> {
  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback(
      (_) => useChurches(context, listen: false).ensureLoaded(),
    );
  }

  @override
  Widget build(BuildContext context) {
    final churchId = useAuth(context).user?.churchId;
    final name = useChurches(context).findById(churchId)?.name;

    return InputDecorator(
      decoration: const InputDecoration(
        labelText: 'Igreja',
        prefixIcon: Icon(Icons.church_outlined),
        suffixIcon: Icon(Icons.lock_outline),
        helperText: 'A pessoa será cadastrada na sua igreja',
        enabled: false,
      ),
      child: Text(name ?? '…'),
    );
  }
}
