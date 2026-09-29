import 'package:flutter/material.dart';
import 'package:raraapp/api/lesson_api.dart';
import 'package:raraapp/components/lesson/lesson_content.dart';
import 'package:raraapp/components/lesson/lesson_form_dialog.dart';
import 'package:raraapp/components/shared/content_dialog.dart';
import 'package:raraapp/components/shared/empty_state.dart';
import 'package:raraapp/components/shared/feedback.dart';
import 'package:raraapp/hooks/use_lessons.dart';

/// CRUD de aulas (super_admin).
class LessonAdminPage extends StatefulWidget {
  const LessonAdminPage({super.key});

  @override
  State<LessonAdminPage> createState() => _LessonAdminPageState();
}

class _LessonAdminPageState extends State<LessonAdminPage> {
  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback(
      (_) => useLessons(context, listen: false).load(),
    );
  }

  Future<void> _delete(Lesson lesson) async {
    if (!await confirmDelete(
      context,
      title: 'Deletar Lição',
      itemName: lesson.title,
    )) {
      return;
    }
    if (!mounted) return;
    final lessons = useLessons(context, listen: false);
    final ok = await lessons.remove(lesson.id);
    if (!mounted) return;
    showResult(
      context,
      ok: ok,
      success: 'Lição deletada com sucesso',
      error: lessons.error,
    );
  }

  void _showDetail(Lesson lesson) => showDialog(
    context: context,
    builder: (_) => ContentDialog(
      title: lesson.title,
      subtitle: lessonSubtitle(lesson),
      children: [
        LessonContent(lesson: lesson),
        if (lesson.questions.isNotEmpty) ...[
          const SectionTitle('Perguntas'),
          for (final (i, q) in lesson.questions.indexed)
            Padding(
              padding: const EdgeInsets.only(bottom: 12),
              child: Text(
                '${i + 1}. ${q.statement}\n'
                '${[for (final (o, opt) in q.options.indexed) '   ${optionLetter(o)}) $opt'].join('\n')}',
                style: const TextStyle(fontSize: 12),
              ),
            ),
        ],
      ],
    ),
  );

  @override
  Widget build(BuildContext context) {
    final lessons = useLessons(context);
    final list = lessons.lessons;

    Widget body;
    if (lessons.isLoading && list.isEmpty) {
      body = const Center(child: CircularProgressIndicator());
    } else if (list.isEmpty) {
      body = EmptyState(
        icon: Icons.menu_book,
        message: lessons.error ?? 'Nenhuma lição encontrada',
        actionLabel: 'Criar Lição',
        onAction: () => LessonFormDialog.show(context),
      );
    } else {
      body = RefreshIndicator(
        onRefresh: lessons.load,
        child: ListView(
          padding: const EdgeInsets.all(16),
          children: [
            for (final lesson in list)
              Card(
                margin: const EdgeInsets.only(bottom: 12),
                child: ListTile(
                  title: Text(
                    lesson.title,
                    style: const TextStyle(fontWeight: FontWeight.bold),
                  ),
                  subtitle: Text(
                    '${lesson.module.toUpperCase()} - Aula ${lesson.number}',
                  ),
                  onTap: () => _showDetail(lesson),
                  trailing: PopupMenuButton(
                    itemBuilder: (_) => [
                      PopupMenuItem(
                        onTap: () =>
                            LessonFormDialog.show(context, lesson: lesson),
                        child: const Text('Editar'),
                      ),
                      PopupMenuItem(
                        onTap: () => _delete(lesson),
                        child: const Text('Deletar'),
                      ),
                    ],
                  ),
                ),
              ),
          ],
        ),
      );
    }

    return Scaffold(
      floatingActionButton: FloatingActionButton(
        onPressed: () => LessonFormDialog.show(context),
        child: const Icon(Icons.add),
      ),
      body: body,
    );
  }
}
