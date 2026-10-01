import 'package:flutter/material.dart';
import 'package:raraapp/api/church_api.dart';
import 'package:raraapp/components/shared/address_fields.dart';
import 'package:raraapp/components/shared/custom_text_field.dart';
import 'package:raraapp/components/shared/feedback.dart';
import 'package:raraapp/components/shared/form_dialog.dart';
import 'package:raraapp/components/shared/section.dart';
import 'package:raraapp/hooks/use_churches.dart';

/// Dialog para criar ([church] nulo) ou editar uma igreja.
class ChurchFormDialog extends StatefulWidget {
  final Church? church;

  const ChurchFormDialog({super.key, this.church});

  static Future<void> show(BuildContext context, {Church? church}) =>
      showDialog(
        context: context,
        builder: (_) => ChurchFormDialog(church: church),
      );

  @override
  State<ChurchFormDialog> createState() => _ChurchFormDialogState();
}

class _ChurchFormDialogState extends State<ChurchFormDialog> {
  final _formKey = GlobalKey<FormState>();

  late final _name = TextEditingController(text: widget.church?.name);
  late final _pastor1 = TextEditingController(text: widget.church?.pastor1);
  late final _pastor2 = TextEditingController(text: widget.church?.pastor2);
  late final _cnpj = TextEditingController(text: widget.church?.cnpj);
  late final _address = AddressForm(widget.church?.address);

  bool get _isEditing => widget.church != null;

  @override
  void dispose() {
    for (final c in [_name, _pastor1, _pastor2, _cnpj]) {
      c.dispose();
    }
    _address.dispose();
    super.dispose();
  }

  String? _text(TextEditingController c) =>
      c.text.trim().isEmpty ? null : c.text.trim();

  Future<void> _submit() async {
    if (!_formKey.currentState!.validate()) return;

    final church = Church(
      id: widget.church?.id ?? '',
      name: _name.text.trim(),
      pastor1: _text(_pastor1),
      pastor2: _text(_pastor2),
      cnpj: _text(_cnpj),
      logoUrl: widget.church?.logoUrl,
      address: _address.toAddress(),
    );

    final churches = useChurches(context, listen: false);
    final ok = await churches.save(church);

    if (!mounted) return;
    showResult(
      context,
      ok: ok,
      success: _isEditing
          ? 'Igreja atualizada com sucesso'
          : 'Igreja criada com sucesso',
      error: churches.error,
    );
    if (ok) Navigator.pop(context);
  }

  @override
  Widget build(BuildContext context) {
    return FormDialog(
      title: _isEditing ? 'Editar Igreja' : 'Nova Igreja',
      formKey: _formKey,
      submitLabel: _isEditing ? 'Atualizar' : 'Criar',
      isSaving: useChurches(context).isLoading,
      onSubmit: _submit,
      children: [
        FormSection(
          title: 'Dados',
          icon: Icons.church_outlined,
          children: [
            CustomTextField(
              label: 'Nome da Igreja',
              controller: _name,
              validator: (v) =>
                  (v ?? '').trim().isEmpty ? 'Nome é obrigatório' : null,
            ),
            CustomTextField(label: 'Pastor 1', controller: _pastor1),
            CustomTextField(label: 'Pastor 2', controller: _pastor2),
            CustomTextField(
              label: 'CNPJ',
              controller: _cnpj,
              hintText: '00.000.000/0000-00',
            ),
          ],
        ),
        const SizedBox(height: 8),
        FormSection(
          title: 'Endereço',
          icon: Icons.place_outlined,
          children: [AddressFields(form: _address, showTitle: false)],
        ),
      ],
    );
  }
}
