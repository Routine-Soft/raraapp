import 'package:flutter/material.dart';
import 'package:raraapp/api/midia_local_api.dart';
import 'package:raraapp/components/shared/custom_text_field.dart';
import 'package:raraapp/components/shared/feedback.dart';
import 'package:raraapp/components/shared/form_dialog.dart';
import 'package:raraapp/components/shared/format.dart';
import 'package:raraapp/hooks/use_auth.dart';
import 'package:raraapp/hooks/use_midia_locals.dart';

/// Dialog para criar ([midia] nula) ou editar uma mídia local.
class MidiaLocalFormDialog extends StatefulWidget {
  final MidiaLocal? midia;

  const MidiaLocalFormDialog({super.key, this.midia});

  static Future<void> show(BuildContext context, {MidiaLocal? midia}) =>
      showDialog(
        context: context,
        builder: (_) => MidiaLocalFormDialog(midia: midia),
      );

  @override
  State<MidiaLocalFormDialog> createState() => _MidiaLocalFormDialogState();
}

class _MidiaLocalFormDialogState extends State<MidiaLocalFormDialog> {
  final _formKey = GlobalKey<FormState>();
  late final _title = TextEditingController(text: widget.midia?.title);
  late final _text = TextEditingController(text: widget.midia?.text);
  late final _time = TextEditingController(text: widget.midia?.time);
  late DateTime? _date = widget.midia?.date;

  bool get _isEditing => widget.midia != null;

  @override
  void dispose() {
    _title.dispose();
    _text.dispose();
    _time.dispose();
    super.dispose();
  }

  Future<void> _pickDate() async {
    final picked = await showDatePicker(
      context: context,
      initialDate: _date ?? DateTime.now(),
      firstDate: DateTime(2000),
      lastDate: DateTime(2100),
    );
    if (picked != null) setState(() => _date = picked);
  }

  Future<void> _submit() async {
    if (!_formKey.currentState!.validate()) return;

    final midia = MidiaLocal(
      id: widget.midia?.id ?? '',
      title: _title.text.trim(),
      text: _text.text.trim().isEmpty ? null : _text.text.trim(),
      time: _time.text.trim().isEmpty ? null : _time.text.trim(),
      date: _date,
      image: widget.midia?.image,
      churchId:
          widget.midia?.churchId ??
          useAuth(context, listen: false).user?.churchId,
    );

    final midias = useMidiaLocals(context, listen: false);
    final ok = await midias.save(midia);

    if (!mounted) return;
    showResult(
      context,
      ok: ok,
      success: _isEditing
          ? 'Mídia atualizada com sucesso'
          : 'Mídia criada com sucesso',
      error: midias.error,
    );
    if (ok) Navigator.pop(context);
  }

  @override
  Widget build(BuildContext context) {
    return FormDialog(
      title: _isEditing ? 'Editar Mídia Local' : 'Nova Mídia Local',
      formKey: _formKey,
      submitLabel: _isEditing ? 'Atualizar' : 'Criar',
      isSaving: useMidiaLocals(context).isLoading,
      onSubmit: _submit,
      children: [
        InputDecorator(
          decoration: InputDecoration(
            labelText: 'Data (opcional)',
            border: OutlineInputBorder(borderRadius: BorderRadius.circular(8)),
          ),
          child: Row(
            children: [
              Expanded(
                child: Text(_date == null ? 'Nenhuma data' : formatDate(_date)),
              ),
              if (_date != null)
                IconButton(
                  tooltip: 'Remover data',
                  icon: const Icon(Icons.close),
                  onPressed: () => setState(() => _date = null),
                ),
              IconButton(
                icon: const Icon(Icons.calendar_today),
                onPressed: _pickDate,
              ),
            ],
          ),
        ),
        const SizedBox(height: 16),
        CustomTextField(label: 'Hora', controller: _time, hintText: '14:30'),
        const SizedBox(height: 16),
        CustomTextField(
          label: 'Título',
          controller: _title,
          validator: (v) =>
              (v ?? '').trim().isEmpty ? 'Título é obrigatório' : null,
        ),
        const SizedBox(height: 16),
        CustomTextField(label: 'Descrição', controller: _text, maxLines: 4),
      ],
    );
  }
}
