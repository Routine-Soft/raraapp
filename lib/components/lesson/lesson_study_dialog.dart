import 'package:flutter/material.dart';
import 'package:raraapp/api/lesson_api.dart';
import 'package:raraapp/api/lesson_progress_api.dart';
import 'package:raraapp/components/lesson/lesson_content.dart';
import 'package:raraapp/components/shared/content_dialog.dart';
import 'package:raraapp/components/shared/effects/fade_slide_in.dart';
import 'package:raraapp/components/shared/effects/glow_button.dart';
import 'package:raraapp/components/shared/feedback.dart';
import 'package:raraapp/components/theme/app_effects.dart';
import 'package:raraapp/hooks/use_lesson_progress.dart';

/// Aluno estuda a aula e responde as perguntas.
class LessonStudyDialog extends StatefulWidget {
  final Lesson lesson;

  const LessonStudyDialog({super.key, required this.lesson});

  static Future<void> show(BuildContext context, Lesson lesson) => showDialog(
    context: context,
    builder: (_) => LessonStudyDialog(lesson: lesson),
  );

  @override
  State<LessonStudyDialog> createState() => _LessonStudyDialogState();
}

class _LessonStudyDialogState extends State<LessonStudyDialog> {
  final Map<int, int> _selected = {};
  LessonProgress? _result;

  List<Question> get _questions => widget.lesson.questions;
  bool get _allAnswered => _selected.length == _questions.length;

  bool? _isCorrect(int questionIndex) => _result?.answers
      .where((a) => a.questionIndex == questionIndex)
      .firstOrNull
      ?.isCorrect;

  Future<void> _submit() async {
    final progress = useLessonProgress(context, listen: false);
    final result = await progress.submit(widget.lesson.id, [
      for (final entry in _selected.entries)
        Answer(questionIndex: entry.key, selectedOptionIndex: entry.value),
    ]);
    if (!mounted) return;
    if (result == null) {
      showResult(context, ok: false, success: '', error: progress.error);
    } else {
      setState(() => _result = result);
    }
  }

  void _retry() => setState(() {
    _result = null;
    _selected.clear();
  });

  @override
  Widget build(BuildContext context) {
    final isSending = useLessonProgress(context).isLoading;
    final result = _result;

    return ContentDialog(
      title: widget.lesson.title,
      subtitle: lessonSubtitle(widget.lesson),
      actions: [
        if (result != null)
          OutlinedButton.icon(
            onPressed: _retry,
            icon: const Icon(Icons.refresh),
            label: const Text('Refazer'),
          )
        else
          OutlinedButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('Fechar'),
          ),
        if (result == null && _questions.isNotEmpty)
          GlowButton(
            label: 'Enviar',
            icon: Icons.send,
            loading: isSending,
            onPressed: _allAnswered ? _submit : null,
          )
        else if (result != null)
          GlowButton(
            label: 'Concluir',
            icon: Icons.check,
            onPressed: () => Navigator.pop(context),
          ),
      ],
      children: [
        if (result != null)
          FadeSlideIn(
            child: _ResultBox(
              score: result.score,
              total: result.totalQuestions,
            ),
          ),
        LessonContent(lesson: widget.lesson),
        if (_questions.isNotEmpty) ...[
          const SizedBox(height: 4),
          SectionTitle(
            'Questões',
            icon: Icons.quiz_outlined,
            trailing: result == null
                ? Text('${_selected.length}/${_questions.length}')
                : null,
          ),
          for (var i = 0; i < _questions.length; i++) _buildQuestion(i),
        ],
      ],
    );
  }

  Widget _buildQuestion(int qIndex) {
    final question = _questions[qIndex];
    final isCorrect = _isCorrect(qIndex);
    final scheme = Theme.of(context).colorScheme;

    return Card(
      color: scheme.surfaceContainerHigh,
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          spacing: 8,
          children: [
            Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Expanded(
                  child: Text(
                    '${qIndex + 1}. ${question.statement}',
                    style: const TextStyle(fontWeight: FontWeight.w700),
                  ),
                ),
                if (isCorrect != null)
                  Tooltip(
                    message: isCorrect ? 'Acertou' : 'Errou',
                    child: Icon(
                      isCorrect ? Icons.check_circle : Icons.cancel,
                      color: isCorrect ? scheme.primary : scheme.error,
                    ),
                  ),
              ],
            ),
            for (var o = 0; o < question.options.length; o++)
              _Option(
                letter: optionLetter(o),
                text: question.options[o],
                selected: _selected[qIndex] == o,
                onTap: _result != null
                    ? null
                    : () => setState(() => _selected[qIndex] = o),
              ),
          ],
        ),
      ),
    );
  }
}

/// Alternativa: a escolhida ganha borda e fundo na cor principal.
class _Option extends StatelessWidget {
  final String letter;
  final String text;
  final bool selected;
  final VoidCallback? onTap;

  const _Option({
    required this.letter,
    required this.text,
    required this.selected,
    this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    final scheme = Theme.of(context).colorScheme;
    final radius = BorderRadius.circular(14);

    return Semantics(
      selected: selected,
      button: true,
      child: Material(
        color: Colors.transparent,
        child: InkWell(
          borderRadius: radius,
          onTap: onTap,
          child: AnimatedContainer(
            duration: const Duration(milliseconds: 200),
            padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
            decoration: BoxDecoration(
              borderRadius: radius,
              color: selected
                  ? scheme.primary.withValues(alpha: 0.14)
                  : Colors.transparent,
              border: Border.all(
                color: selected ? scheme.primary : scheme.outlineVariant,
                width: selected ? 2 : 1,
              ),
            ),
            child: Row(
              children: [
                AnimatedContainer(
                  duration: const Duration(milliseconds: 200),
                  width: 30,
                  height: 30,
                  alignment: Alignment.center,
                  decoration: BoxDecoration(
                    shape: BoxShape.circle,
                    color: selected ? scheme.primary : Colors.transparent,
                    border: Border.all(
                      color: selected ? scheme.primary : scheme.outline,
                    ),
                  ),
                  child: Text(
                    letter,
                    style: TextStyle(
                      fontWeight: FontWeight.w700,
                      color: selected ? scheme.onPrimary : scheme.onSurface,
                    ),
                  ),
                ),
                const SizedBox(width: 12),
                Expanded(child: Text(text)),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

/// Resultado: anel de progresso que enche até a porcentagem de acertos.
class _ResultBox extends StatelessWidget {
  final int score;
  final int total;

  const _ResultBox({required this.score, required this.total});

  @override
  Widget build(BuildContext context) {
    final ratio = total == 0 ? 0.0 : score / total;
    final effects = AppEffects.of(context);
    final text = Theme.of(context).textTheme;

    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(22),
        border: Border.all(color: effects.glassBorder),
        gradient: LinearGradient(
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
          colors: effects.backgroundGradient,
        ),
      ),
      child: Row(
        children: [
          TweenAnimationBuilder<double>(
            tween: Tween(begin: 0, end: ratio),
            duration: MediaQuery.of(context).disableAnimations
                ? Duration.zero
                : const Duration(milliseconds: 1000),
            curve: Curves.easeOutCubic,
            builder: (context, value, _) => SizedBox.square(
              dimension: 72,
              child: Stack(
                fit: StackFit.expand,
                children: [
                  CircularProgressIndicator(
                    value: value,
                    strokeWidth: 8,
                    strokeCap: StrokeCap.round,
                  ),
                  Center(
                    child: Text(
                      '${(value * 100).round()}%',
                      style: text.titleMedium?.copyWith(
                        fontWeight: FontWeight.w800,
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ),
          const SizedBox(width: 20),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text('Resultado', style: text.labelLarge),
                Text(
                  '$score de $total acertos',
                  style: text.titleLarge?.copyWith(fontWeight: FontWeight.w800),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
