import 'package:flutter/material.dart';
import 'package:raraapp/api/lesson_api.dart';
import 'package:raraapp/components/lesson/lesson_study_dialog.dart';
import 'package:raraapp/hooks/use_lesson_progress.dart';
import 'package:raraapp/hooks/use_lessons.dart';

/// Aulas do aluno, agrupadas por módulo, com os acertos de cada uma.
class LessonPage extends StatefulWidget {
  const LessonPage({super.key});

  @override
  State<LessonPage> createState() => _LessonPageState();
}

class _LessonPageState extends State<LessonPage> {
  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      useLessons(context, listen: false).load();
      useLessonProgress(context, listen: false).loadMine();
    });
  }

  @override
  Widget build(BuildContext context) {
    final lessons = useLessons(context);

    if (lessons.isLoading && lessons.lessons.isEmpty) {
      return const Center(child: CircularProgressIndicator());
    }
    if (lessons.lessons.isEmpty) {
      return Center(child: Text(lessons.error ?? 'Nenhuma lição disponível'));
    }

    final modules = lessons.byModule.entries.where((e) => e.value.isNotEmpty);

    return ListView(
      padding: const EdgeInsets.all(16),
      children: [
        for (final module in modules)
          Card(
            margin: const EdgeInsets.only(bottom: 12),
            clipBehavior: Clip.antiAlias,
            child: ExpansionTile(
              title: Text(
                module.key.toUpperCase(),
                style: const TextStyle(
                  fontWeight: FontWeight.bold,
                  fontSize: 16,
                ),
              ),
              subtitle: Text(
                '${module.value.length} aula${module.value.length > 1 ? 's' : ''}',
              ),
              children: [
                for (final lesson in module.value) _LessonTile(lesson: lesson),
              ],
            ),
          ),
      ],
    );
  }
}

class _LessonTile extends StatelessWidget {
  final Lesson lesson;

  const _LessonTile({required this.lesson});

  @override
  Widget build(BuildContext context) {
    final progress = useLessonProgress(context).mineForLesson(lesson.id);
    final done = progress != null;

    return ListTile(
      leading: CircleAvatar(
        backgroundColor: done ? Colors.green[100] : Colors.grey[200],
        child: Text(
          '${lesson.number}',
          style: TextStyle(
            fontWeight: FontWeight.bold,
            color: done ? Colors.green[900] : Colors.grey[700],
          ),
        ),
      ),
      title: Text(lesson.title),
      subtitle: done
          ? Text(
              'Acertos: ${progress.score}/${progress.totalQuestions}',
              style: const TextStyle(color: Colors.green),
            )
          : null,
      onTap: () => LessonStudyDialog.show(context, lesson),
    );
  }
}
