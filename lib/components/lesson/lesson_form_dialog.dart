import 'package:flutter/material.dart';
import 'package:raraapp/api/lesson_api.dart';
import 'package:raraapp/components/lesson/lesson_content.dart';
import 'package:raraapp/components/lesson/question_editor_dialog.dart';
import 'package:raraapp/components/shared/custom_dropdown.dart';
import 'package:raraapp/components/shared/content_dialog.dart';
import 'package:raraapp/components/shared/custom_text_field.dart';
import 'package:raraapp/components/shared/feedback.dart';
import 'package:raraapp/components/shared/form_dialog.dart';
import 'package:raraapp/components/shared/formatted/formatted_text_field.dart';
import 'package:raraapp/hooks/use_lessons.dart';

/// Dialog para criar ([lesson] nula) ou editar uma aula.
class LessonFormDialog extends StatefulWidget {
  final Lesson? lesson;

  const LessonFormDialog({super.key, this.lesson});

  static Future<void> show(BuildContext context, {Lesson? lesson}) =>
      showDialog(
        context: context,
        builder: (_) => LessonFormDialog(lesson: lesson),
      );

  @override
  State<LessonFormDialog> createState() => _LessonFormDialogState();
}

class _LessonFormDialogState extends State<LessonFormDialog> {
  final _formKey = GlobalKey<FormState>();
  late String _module = widget.lesson?.module ?? lessonModules.first;
  late final _number = TextEditingController(
    text: widget.lesson?.number.toString(),
  );
  late final _title = TextEditingController(text: widget.lesson?.title);
  late final _videoUrl = TextEditingController(text: widget.lesson?.videoUrl);
  late final _content = TextEditingController(text: widget.lesson?.content);
  late final _image = TextEditingController(text: widget.lesson?.image);
  late final List<Question> _questions = [
    ...widget.lesson?.questions ?? const [],
  ];

  bool get _isEditing => widget.lesson != null;

  @override
  void dispose() {
    for (final c in [_number, _title, _videoUrl, _content, _image]) {
      c.dispose();
    }
    super.dispose();
  }

  Future<void> _editQuestion([int? index]) async {
    final question = await QuestionEditorDialog.show(
      context,
      initial: index == null ? null : _questions[index],
    );
    if (question == null) return;
    setState(() {
      index == null ? _questions.add(question) : _questions[index] = question;
    });
  }

  Future<void> _submit() async {
    if (!_formKey.currentState!.validate()) return;

    if (_questions.any((q) => q.correctOptionIndex == null)) {
      showResult(
        context,
        ok: false,
        success: '',
        error: 'Marque a resposta correta de todas as perguntas',
      );
      return;
    }

    final lesson = Lesson(
      id: widget.lesson?.id ?? '',
      module: _module,
      number: int.parse(_number.text.trim()),
      title: _title.text.trim(),
      videoUrl: _videoUrl.text.trim(),
      content: _content.text.trim(),
      image: _image.text.trim().isEmpty ? null : _image.text.trim(),
      questions: _questions,
    );

    final lessons = useLessons(context, listen: false);
    final ok = await lessons.save(lesson);

    if (!mounted) return;
    showResult(
      context,
      ok: ok,
      success: _isEditing
          ? 'Lição atualizada com sucesso'
          : 'Lição criada com sucesso',
      error: lessons.error,
    );
    if (ok) Navigator.pop(context);
  }

  String? _required(String? v) =>
      (v ?? '').trim().isEmpty ? 'Obrigatório' : null;

  @override
  Widget build(BuildContext context) {
    return FormDialog(
      title: _isEditing ? 'Editar Lição' : 'Criar Lição',
      formKey: _formKey,
      submitLabel: _isEditing ? 'Atualizar' : 'Criar',
      isSaving: useLessons(context).isLoading,
      onSubmit: _submit,
      children: [
        CustomDropdown<String>(
          label: 'Módulo',
          value: _module,
          items: lessonModules,
          itemLabel: moduleLabel,
          onChanged: (m) => setState(() => _module = m ?? _module),
        ),
        CustomTextField(
          label: 'Número da Aula',
          controller: _number,
          hintText: '1, 2, 3...',
          keyboardType: TextInputType.number,
          validator: (v) =>
              int.tryParse(v ?? '') == null ? 'Informe um número' : null,
        ),
        CustomTextField(
          label: 'Título',
          prefixIcon: Icons.title,
          controller: _title,
          validator: _required,
        ),
        CustomTextField(
          label: 'URL do Vídeo (opcional)',
          prefixIcon: Icons.play_circle_outline,
          controller: _videoUrl,
          hintText: 'https://youtube.com/...',
        ),
        FormattedTextField(
          label: 'Conteúdo',
          controller: _content,
          validator: _required,
        ),
        CustomTextField(
          label: 'URL da Imagem',
          prefixIcon: Icons.image_outlined,
          controller: _image,
          hintText: 'https://...',
        ),
        const SizedBox(height: 8),
        SectionTitle(
          'Perguntas',
          icon: Icons.quiz_outlined,
          trailing: IconButton.filled(
            tooltip: 'Adicionar pergunta',
            onPressed: _editQuestion,
            icon: const Icon(Icons.add),
          ),
        ),
        if (_questions.isEmpty)
          Text(
            'Nenhuma pergunta adicionada',
            textAlign: TextAlign.center,
            style: TextStyle(
              color: Theme.of(
                context,
              ).colorScheme.onSurface.withValues(alpha: 0.6),
            ),
          ),
        for (var i = 0; i < _questions.length; i++)
          Card(
            color: Theme.of(context).colorScheme.surfaceContainerHigh,
            child: ListTile(
              title: Text('${i + 1}. ${_questions[i].statement}', maxLines: 2),
              subtitle: Text(
                _questions[i].correctOptionIndex == null
                    ? '${_questions[i].options.length} opções'
                    : 'Correta: ${optionLetter(_questions[i].correctOptionIndex!)}) '
                          '${_questions[i].options[_questions[i].correctOptionIndex!]}',
              ),
              onTap: () => _editQuestion(i),
              trailing: IconButton(
                tooltip: 'Remover pergunta',
                icon: const Icon(Icons.delete_outline),
                onPressed: () => setState(() => _questions.removeAt(i)),
              ),
            ),
          ),
      ],
    );
  }
}
