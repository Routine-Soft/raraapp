import 'package:flutter/material.dart';
import 'package:raraapp/api/cura_api.dart';
import 'package:raraapp/components/cura/cura_labels.dart';
import 'package:raraapp/components/shared/custom_dropdown.dart';
import 'package:raraapp/components/shared/custom_text_field.dart';
import 'package:raraapp/components/shared/feedback.dart';
import 'package:raraapp/components/shared/form_dialog.dart';
import 'package:raraapp/hooks/use_curas.dart';

/// Gestor edita o tipo e as anotações do pedido.
class CuraEditDialog extends StatefulWidget {
  final Cura cura;

  const CuraEditDialog({super.key, required this.cura});

  static Future<void> show(BuildContext context, Cura cura) => showDialog(
    context: context,
    builder: (_) => CuraEditDialog(cura: cura),
  );

  @override
  State<CuraEditDialog> createState() => _CuraEditDialogState();
}

class _CuraEditDialogState extends State<CuraEditDialog> {
  final _formKey = GlobalKey<FormState>();
  late String _type = widget.cura.type;
  late final _notes = TextEditingController(text: widget.cura.notes);

  @override
  void dispose() {
    _notes.dispose();
    super.dispose();
  }

  Future<void> _submit() async {
    final curas = useCuras(context, listen: false);
    final notes = _notes.text.trim();
    final ok = await curas.update(
      widget.cura,
      type: _type,
      notes: notes.isEmpty ? null : notes,
    );
    if (!mounted) return;
    showResult(
      context,
      ok: ok,
      success: 'Pedido atualizado com sucesso!',
      error: curas.error,
    );
    if (ok) Navigator.pop(context);
  }

  @override
  Widget build(BuildContext context) {
    return FormDialog(
      title: 'Editar Pedido',
      formKey: _formKey,
      submitLabel: 'Salvar',
      isSaving: useCuras(context).isLoading,
      onSubmit: _submit,
      children: [
        CustomDropdown<String>(
          label: 'Tipo',
          value: _type,
          items: curaTypes,
          itemLabel: (t) => curaTypeLabels[t] ?? t,
          onChanged: (t) => setState(() => _type = t ?? _type),
        ),
        CustomTextField(
          label: 'Anotações',
          controller: _notes,
          hintText: 'Adicione notas...',
          maxLines: 4,
        ),
      ],
    );
  }
}
