import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:raraapp/api/christian_group_api.dart';
import 'package:raraapp/components/shared/address_fields.dart';
import 'package:raraapp/components/shared/custom_text_field.dart';
import 'package:raraapp/components/shared/feedback.dart';
import 'package:raraapp/components/shared/form_dialog.dart';
import 'package:raraapp/components/shared/section.dart';
import 'package:raraapp/constants/register_constants.dart';
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

  /// DDI de quem está cadastrando (o da conta), colocado sozinho no número.
  late final String _ddi = RegisterConstants.ddiFromPhone(
    useAuth(context, listen: false).user?.phone,
  );
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
    final typed = _newContact.text.trim();
    final digits = typed.replaceAll(RegExp(r'[^0-9]'), '');
    if (digits.isEmpty) return;
    // Digitou com "+": já veio com DDI; senão, usa o da conta
    final phone = typed.startsWith('+') ? '+$digits' : '$_ddi$digits';
    if (_contacts.contains(phone)) {
      _newContact.clear();
      return;
    }
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
    return FormDialog(
      title: _isEditing ? 'Editar Grupo Cristão' : 'Novo Grupo Cristão',
      formKey: _formKey,
      submitLabel: _isEditing ? 'Atualizar' : 'Criar',
      isSaving: useChristianGroups(context).isLoading,
      onSubmit: _submit,
      children: [
        FormSection(
          title: 'Grupo',
          icon: Icons.groups_outlined,
          children: [
            CustomTextField(
              label: 'Nome do Grupo',
              controller: _name,
              validator: (v) =>
                  (v ?? '').trim().isEmpty ? 'Nome é obrigatório' : null,
            ),
            CustomTextField(label: 'Líder', controller: _leader),
            CustomTextField(label: 'Co-líder', controller: _coleader),
            CustomTextField(label: 'Anfitrião', controller: _host),
          ],
        ),
        const SizedBox(height: 8),
        FormSection(
          title: 'Endereço',
          icon: Icons.place_outlined,
          children: [AddressFields(form: _address, showTitle: false)],
        ),
        const SizedBox(height: 8),
        FormSection(
          title: 'Contatos',
          icon: Icons.chat_outlined,
          children: [
            Row(
              spacing: 8,
              children: [
                Expanded(
                  child: TextField(
                    controller: _newContact,
                    keyboardType: TextInputType.phone,
                    onSubmitted: (_) => _addContact(),
                    decoration: InputDecoration(
                      labelText: 'Telefone',
                      hintText: 'DDD + número',
                      prefixIcon: const Icon(Icons.phone),
                      prefixText: '$_ddi ',
                    ),
                  ),
                ),
                FilledButton.tonal(
                  onPressed: _addContact,
                  child: const Text('Adicionar'),
                ),
              ],
            ),
            if (_contacts.isNotEmpty)
              Wrap(
                spacing: 8,
                runSpacing: 8,
                children: [
                  for (final phone in _contacts)
                    InputChip(
                      label: Text(phone),
                      avatar: const FaIcon(
                        FontAwesomeIcons.whatsapp,
                        size: 16,
                        color: Color(0xFF25D366),
                      ),
                      deleteButtonTooltipMessage: 'Remover',
                      onDeleted: () => setState(() => _contacts.remove(phone)),
                    ),
                ],
              ),
          ],
        ),
      ],
    );
  }
}
