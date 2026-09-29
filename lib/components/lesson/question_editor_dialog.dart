import 'package:flutter/material.dart';
import 'package:raraapp/api/lesson_api.dart';
import 'package:raraapp/components/lesson/lesson_content.dart';
import 'package:raraapp/components/shared/custom_text_field.dart';
import 'package:raraapp/components/shared/form_dialog.dart';

/// Cria/edita uma pergunta. Devolve a [Question] ou null se cancelar.
class QuestionEditorDialog extends StatefulWidget {
  final Question? initial;

  const QuestionEditorDialog({super.key, this.initial});

  static Future<Question?> show(BuildContext context, {Question? initial}) =>
      showDialog<Question>(
        context: context,
        builder: (_) => QuestionEditorDialog(initial: initial),
      );

  @override
  State<QuestionEditorDialog> createState() => _QuestionEditorDialogState();
}

class _QuestionEditorDialogState extends State<QuestionEditorDialog> {
  final _formKey = GlobalKey<FormState>();
  late final _statement = TextEditingController(
    text: widget.initial?.statement,
  );
  late final List<TextEditingController> _options = [
    for (final o in widget.initial?.options ?? const ['', ''])
      TextEditingController(text: o),
  ];
  late int? _correct = widget.initial?.correctOptionIndex;

  @override
  void dispose() {
    _statement.dispose();
    for (final c in _options) {
      c.dispose();
    }
    super.dispose();
  }

  void _removeOption(int index) => setState(() {
    _options.removeAt(index).dispose();
    if (_correct == index) {
      _correct = null;
    } else if (_correct != null && _correct! > index) {
      _correct = _correct! - 1;
    }
  });

  void _submit() {
    if (!_formKey.currentState!.validate()) return;
    if (_options.length < 2 || _correct == null) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('Adicione ao menos 2 opções e marque a correta'),
        ),
      );
      return;
    }
    Navigator.pop(
      context,
      Question(
        statement: _statement.text.trim(),
        options: [for (final c in _options) c.text.trim()],
        correctOptionIndex: _correct,
      ),
    );
  }

  String? _required(String? v) =>
      (v ?? '').trim().isEmpty ? 'Obrigatório' : null;

  @override
  Widget build(BuildContext context) {
    return FormDialog(
      title: widget.initial == null ? 'Nova Pergunta' : 'Editar Pergunta',
      formKey: _formKey,
      submitLabel: 'Salvar',
      onSubmit: _submit,
      maxWidth: 450,
      children: [
        CustomTextField(
          label: 'Enunciado',
          controller: _statement,
          maxLines: 2,
          validator: _required,
        ),
        const SizedBox(height: 16),
        Row(
          children: [
            const Expanded(
              child: Text(
                'Opções (marque a correta)',
                style: TextStyle(fontWeight: FontWeight.w500),
              ),
            ),
            TextButton.icon(
              onPressed: () =>
                  setState(() => _options.add(TextEditingController())),
              icon: const Icon(Icons.add, size: 16),
              label: const Text('Opção'),
            ),
          ],
        ),
        const SizedBox(height: 8),
        for (var i = 0; i < _options.length; i++)
          Padding(
            padding: const EdgeInsets.only(bottom: 8),
            child: Row(
              children: [
                IconButton(
                  tooltip: 'Marcar como correta',
                  onPressed: () => setState(() => _correct = i),
                  icon: Icon(
                    _correct == i
                        ? Icons.check_circle
                        : Icons.radio_button_unchecked,
                    color: _correct == i ? Colors.green : Colors.grey,
                  ),
                ),
                Expanded(
                  child: CustomTextField(
                    label: '${optionLetter(i)})',
                    controller: _options[i],
                    validator: _required,
                  ),
                ),
                IconButton(
                  icon: const Icon(Icons.delete_outline, size: 20),
                  onPressed: () => _removeOption(i),
                ),
              ],
            ),
          ),
      ],
    );
  }
}
