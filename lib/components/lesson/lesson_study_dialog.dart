import 'package:flutter/material.dart';
import 'package:raraapp/api/lesson_api.dart';
import 'package:raraapp/api/lesson_progress_api.dart';
import 'package:raraapp/components/lesson/lesson_content.dart';
import 'package:raraapp/components/shared/content_dialog.dart';
import 'package:raraapp/components/shared/feedback.dart';
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
          TextButton(onPressed: _retry, child: const Text('Tentar Novamente')),
        TextButton(
          onPressed: () => Navigator.pop(context),
          child: const Text('Fechar'),
        ),
        if (result == null && _questions.isNotEmpty)
          ElevatedButton(
            onPressed: _allAnswered && !isSending ? _submit : null,
            child: const Text('Enviar respostas'),
          ),
      ],
      children: [
        LessonContent(lesson: widget.lesson),
        if (_questions.isNotEmpty) ...[
          const SectionTitle('Questões'),
          for (var i = 0; i < _questions.length; i++) _buildQuestion(i),
        ],
        if (result != null)
          _ResultBox(score: result.score, total: result.totalQuestions),
        const SizedBox(height: 16),
      ],
    );
  }

  Widget _buildQuestion(int qIndex) {
    final question = _questions[qIndex];
    final isCorrect = _isCorrect(qIndex);
    final answered = isCorrect != null;

    return Card(
      margin: const EdgeInsets.only(bottom: 12),
      color: !answered ? null : (isCorrect ? Colors.green[50] : Colors.red[50]),
      child: Padding(
        padding: const EdgeInsets.all(12),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                Expanded(
                  child: Text(
                    '${qIndex + 1}. ${question.statement}',
                    style: const TextStyle(
                      fontWeight: FontWeight.w500,
                      fontSize: 13,
                    ),
                  ),
                ),
                if (answered)
                  Icon(
                    isCorrect ? Icons.check_circle : Icons.cancel,
                    color: isCorrect ? Colors.green : Colors.red,
                  ),
              ],
            ),
            const SizedBox(height: 12),
            for (var o = 0; o < question.options.length; o++)
              _buildOption(qIndex, o, question.options[o], isCorrect),
          ],
        ),
      ),
    );
  }

  Widget _buildOption(int qIndex, int oIndex, String option, bool? isCorrect) {
    final isSelected = _selected[qIndex] == oIndex;
    final locked = _result != null;

    Color? background;
    if (locked && isSelected) {
      background = isCorrect! ? Colors.green[200] : Colors.red[200];
    }

    return InkWell(
      onTap: locked ? null : () => setState(() => _selected[qIndex] = oIndex),
      child: Container(
        margin: const EdgeInsets.only(bottom: 8),
        padding: const EdgeInsets.all(12),
        decoration: BoxDecoration(
          color: background,
          borderRadius: BorderRadius.circular(4),
          border: Border.all(
            color: isSelected ? Colors.blue : Colors.grey[300]!,
            width: isSelected ? 2 : 1,
          ),
        ),
        child: Row(
          children: [
            Icon(
              isSelected
                  ? Icons.radio_button_checked
                  : Icons.radio_button_unchecked,
              color: isSelected ? Colors.blue : Colors.grey,
              size: 20,
            ),
            const SizedBox(width: 8),
            Expanded(child: Text('${optionLetter(oIndex)}) $option')),
          ],
        ),
      ),
    );
  }
}

class _ResultBox extends StatelessWidget {
  final int score;
  final int total;

  const _ResultBox({required this.score, required this.total});

  @override
  Widget build(BuildContext context) {
    final percent = total == 0 ? 0 : score / total * 100;
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.blue[50],
        borderRadius: BorderRadius.circular(8),
        border: Border.all(color: Colors.blue[200]!),
      ),
      child: Column(
        children: [
          const Text(
            'Resultado Final',
            style: TextStyle(fontWeight: FontWeight.bold),
          ),
          const SizedBox(height: 8),
          Text(
            '$score/$total acertos',
            style: const TextStyle(
              fontSize: 18,
              fontWeight: FontWeight.bold,
              color: Colors.blue,
            ),
          ),
          Text(
            '${percent.toStringAsFixed(1)}%',
            style: TextStyle(color: Colors.blue[700]),
          ),
        ],
      ),
    );
  }
}
