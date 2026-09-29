import 'package:flutter/material.dart';
import 'package:raraapp/api/christian_group_api.dart';
import 'package:raraapp/components/shared/address_fields.dart';
import 'package:raraapp/components/shared/custom_text_field.dart';
import 'package:raraapp/components/shared/feedback.dart';
import 'package:raraapp/components/shared/form_dialog.dart';
import 'package:raraapp/hooks/use_auth.dart';
import 'package:raraapp/hooks/use_christian_groups.dart';

/// Dialog para criar ([group] nulo) ou editar um grupo cristão.
class ChristianGroupFormDialog extends StatefulWidget {
  final ChristianGroup? group;

  const ChristianGroupFormDialog({super.key, this.group});

  static Future<void> show(BuildContext context, {ChristianGroup? group}) =>
      showDialog(
        context: context,
        builder: (_) => ChristianGroupFormDialog(group: group),
      );

  @override
  State<ChristianGroupFormDialog> createState() =>
      _ChristianGroupFormDialogState();
}

class _ChristianGroupFormDialogState extends State<ChristianGroupFormDialog> {
  final _formKey = GlobalKey<FormState>();
  late final _name = TextEditingController(text: widget.group?.name);
  late final _leader = TextEditingController(text: widget.group?.leader);
  late final _coleader = TextEditingController(text: widget.group?.coleader);
  late final _host = TextEditingController(text: widget.group?.host);
  late final _address = AddressForm(widget.group?.address);
  final _newContact = TextEditingController();
  late final List<String> _contacts = [...?widget.group?.contact];

  bool get _isEditing => widget.group != null;

  @override
  void dispose() {
    for (final c in [_name, _leader, _coleader, _host, _newContact]) {
      c.dispose();
    }
    _address.dispose();
    super.dispose();
  }

  String? _text(TextEditingController c) =>
      c.text.trim().isEmpty ? null : c.text.trim();

  void _addContact() {
    final phone = _newContact.text.trim();
    if (phone.isEmpty || _contacts.contains(phone)) return;
    setState(() {
      _contacts.add(phone);
      _newContact.clear();
    });
  }

  Future<void> _submit() async {
    if (!_formKey.currentState!.validate()) return;

    final group = ChristianGroup(
      id: widget.group?.id ?? '',
      name: _name.text.trim(),
      leader: _text(_leader),
      coleader: _text(_coleader),
      host: _text(_host),
      contact: _contacts,
      address: _address.toAddress(),
      churchId:
          widget.group?.churchId ??
          useAuth(context, listen: false).user?.churchId,
    );

    final groups = useChristianGroups(context, listen: false);
    final ok = await groups.save(group);

    if (!mounted) return;
    showResult(
      context,
      ok: ok,
      success: _isEditing
          ? 'Grupo atualizado com sucesso'
          : 'Grupo criado com sucesso',
      error: groups.error,
    );
    if (ok) Navigator.pop(context);
  }

  @override
  Widget build(BuildContext context) {
    const gap = SizedBox(height: 12, width: 12);

    return FormDialog(
      title: _isEditing ? 'Editar Grupo Cristão' : 'Novo Grupo Cristão',
      formKey: _formKey,
      submitLabel: _isEditing ? 'Atualizar' : 'Criar',
      isSaving: useChristianGroups(context).isLoading,
      onSubmit: _submit,
      children: [
        CustomTextField(
          label: 'Nome do Grupo',
          controller: _name,
          validator: (v) =>
              (v ?? '').trim().isEmpty ? 'Nome é obrigatório' : null,
        ),
        gap,
        CustomTextField(label: 'Líder', controller: _leader),
        gap,
        CustomTextField(label: 'Co-líder', controller: _coleader),
        gap,
        CustomTextField(label: 'Anfitrião', controller: _host),
        const SizedBox(height: 24),
        AddressFields(form: _address),
        const SizedBox(height: 24),
        Text(
          'Contatos',
          style: Theme.of(
            context,
          ).textTheme.titleSmall?.copyWith(fontWeight: FontWeight.bold),
        ),
        gap,
        Row(
          children: [
            Expanded(
              child: CustomTextField(
                label: 'Telefone',
                controller: _newContact,
                hintText: '+5521987654321',
                keyboardType: TextInputType.phone,
              ),
            ),
            gap,
            ElevatedButton(
              onPressed: _addContact,
              child: const Text('Adicionar'),
            ),
          ],
        ),
        for (final phone in _contacts)
          ListTile(
            dense: true,
            contentPadding: EdgeInsets.zero,
            title: Text(phone),
            trailing: IconButton(
              icon: const Icon(Icons.close, size: 20),
              onPressed: () => setState(() => _contacts.remove(phone)),
            ),
          ),
      ],
    );
  }
}
