import 'package:flutter/material.dart';
import 'package:raraapp/api/user_api.dart';
import 'package:raraapp/components/church/church_dropdown.dart';
import 'package:raraapp/components/shared/address_fields.dart';
import 'package:raraapp/components/shared/content_dialog.dart';
import 'package:raraapp/components/shared/custom_checkbox.dart';
import 'package:raraapp/components/shared/custom_dropdown.dart';
import 'package:raraapp/components/shared/custom_text_field.dart';
import 'package:raraapp/components/shared/date_field.dart';
import 'package:raraapp/components/shared/feedback.dart';
import 'package:raraapp/components/shared/input_formatters.dart';
import 'package:raraapp/hooks/use_users.dart';
import 'package:raraapp/utils/validators.dart';

/// Formulário em que o facilitador cadastra um visitante.
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
  String? _churchId;
  String? _invitation;
  String? _status;
  DateTime? _birthdate;
  bool _baptized = false;
  bool _member = false;

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
      _gender = _churchId = _invitation = _status = null;
      _birthdate = null;
      _baptized = _member = false;
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
        churchId: _churchId,
        address: _address.toAddress(),
        invitationofgrace: _invitation,
        status: _status,
        facilitator: facilitator.isEmpty ? null : facilitator,
        baptized: _baptized,
        member: _member,
      ),
    );
    if (!mounted) return;
    showResult(
      context,
      ok: ok,
      success: 'Usuário cadastrado com sucesso!',
      error: users.error,
    );
    if (ok) _reset();
  }

  @override
  Widget build(BuildContext context) {
    const gap = SizedBox(height: 12);

    return SingleChildScrollView(
      padding: const EdgeInsets.all(16),
      child: Form(
        key: _formKey,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            const SectionTitle('Informações Básicas'),
            CustomTextField(
              label: 'Nome *',
              controller: _name,
              validator: RegisterValidators.validateName,
            ),
            gap,
            CustomTextField(
              label: 'Email *',
              controller: _email,
              keyboardType: TextInputType.emailAddress,
              validator: RegisterValidators.validateEmail,
              inputFormatters: [LowercaseNoSpaceFormatter()],
            ),
            gap,
            CustomTextField(
              label: 'Telefone *',
              controller: _phone,
              keyboardType: TextInputType.phone,
              validator: (v) =>
                  (v ?? '').trim().isEmpty ? 'Telefone é obrigatório' : null,
            ),
            gap,
            CustomDropdown<String>(
              label: 'Gênero',
              value: _gender,
              items: userGenders,
              onChanged: (v) => setState(() => _gender = v),
            ),
            gap,
            DateField(
              label: 'Data de Nascimento',
              value: _birthdate,
              onChanged: (d) => setState(() => _birthdate = d),
            ),
            const SizedBox(height: 20),
            const SectionTitle('Igreja'),
            ChurchDropdown(
              value: _churchId,
              onChanged: (id) => setState(() => _churchId = id),
            ),
            const SizedBox(height: 20),
            AddressFields(form: _address, showCountry: false),
            const SizedBox(height: 20),
            const SectionTitle('Outros Dados'),
            CustomDropdown<String>(
              label: 'Convite da Graça',
              value: _invitation,
              items: userInvitations,
              onChanged: (v) => setState(() => _invitation = v),
            ),
            gap,
            CustomDropdown<String>(
              label: 'Status',
              value: _status,
              items: userStatuses,
              onChanged: (v) => setState(() => _status = v),
            ),
            gap,
            CustomTextField(
              label: 'Facilitador',
              controller: _facilitator,
              hintText: 'Nome do facilitador',
            ),
            gap,
            CustomCheckbox(
              label: 'Batizado',
              value: _baptized,
              onChanged: (v) => setState(() => _baptized = v ?? false),
            ),
            CustomCheckbox(
              label: 'Membro',
              value: _member,
              onChanged: (v) => setState(() => _member = v ?? false),
            ),
            const SizedBox(height: 20),
            ElevatedButton.icon(
              icon: const Icon(Icons.person_add),
              label: const Text('Cadastrar'),
              onPressed: useUsers(context).isLoading ? null : _submit,
            ),
          ],
        ),
      ),
    );
  }
}
