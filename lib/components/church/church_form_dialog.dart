import 'package:flutter/material.dart';
import 'package:raraapp/api/church_api.dart';
import 'package:raraapp/components/shared/address_fields.dart';
import 'package:raraapp/components/shared/custom_text_field.dart';
import 'package:raraapp/components/shared/feedback.dart';
import 'package:raraapp/components/shared/form_dialog.dart';
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
  late final _totalMembers = TextEditingController(
    text: widget.church?.totalMembers.toString(),
  );
  late final _address = AddressForm(widget.church?.address);

  bool get _isEditing => widget.church != null;

  @override
  void dispose() {
    for (final c in [_name, _pastor1, _pastor2, _cnpj, _totalMembers]) {
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
      totalMembers: int.tryParse(_totalMembers.text) ?? 0,
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
    const gap = SizedBox(height: 12, width: 12);

    return FormDialog(
      title: _isEditing ? 'Editar Igreja' : 'Nova Igreja',
      formKey: _formKey,
      submitLabel: _isEditing ? 'Atualizar' : 'Criar',
      isSaving: useChurches(context).isLoading,
      onSubmit: _submit,
      children: [
        CustomTextField(
          label: 'Nome da Igreja',
          controller: _name,
          validator: (v) =>
              (v ?? '').trim().isEmpty ? 'Nome é obrigatório' : null,
        ),
        gap,
        CustomTextField(label: 'Pastor 1', controller: _pastor1),
        gap,
        CustomTextField(label: 'Pastor 2', controller: _pastor2),
        gap,
        CustomTextField(
          label: 'CNPJ',
          controller: _cnpj,
          hintText: '00.000.000/0000-00',
        ),
        gap,
        CustomTextField(
          label: 'Total de Membros',
          controller: _totalMembers,
          keyboardType: TextInputType.number,
        ),
        const SizedBox(height: 24),
        AddressFields(form: _address),
      ],
    );
  }
}
