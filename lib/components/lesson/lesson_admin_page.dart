import 'package:flutter/material.dart';
import 'package:raraapp/api/lesson_api.dart';
import 'package:raraapp/components/lesson/lesson_content.dart';
import 'package:raraapp/components/lesson/lesson_form_dialog.dart';
import 'package:raraapp/components/shared/content_dialog.dart';
import 'package:raraapp/components/shared/entity_card.dart';
import 'package:raraapp/components/shared/feedback.dart';
import 'package:raraapp/components/shared/list_page.dart';
import 'package:raraapp/components/shared/tag.dart';
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
          const SectionTitle('Perguntas', icon: Icons.quiz_outlined),
          for (final (i, q) in lesson.questions.indexed)
            _QuestionPreview(index: i, question: q),
        ],
      ],
    ),
  );

  @override
  Widget build(BuildContext context) {
    final lessons = useLessons(context);

    return ListPage(
      icon: Icons.menu_book_outlined,
      title: 'Avançai Super Intendente Geral',
      loading: lessons.isLoading,
      onRefresh: lessons.load,
      emptyIcon: Icons.menu_book_outlined,
      emptyMessage: lessons.error ?? 'Nenhuma lição encontrada',
      onAdd: () => LessonFormDialog.show(context),
      addLabel: 'Nova lição',
      children: [
        for (final lesson in lessons.lessons)
          Card(
            clipBehavior: Clip.antiAlias,
            child: InkWell(
              onTap: () => _showDetail(lesson),
              child: Padding(
                padding: const EdgeInsets.fromLTRB(16, 12, 4, 12),
                child: Row(
                  children: [
                    _NumberBadge(lesson.number),
                    const SizedBox(width: 14),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        spacing: 8,
                        children: [
                          Text(
                            lesson.title,
                            style: Theme.of(context).textTheme.titleMedium
                                ?.copyWith(fontWeight: FontWeight.w700),
                          ),
                          Wrap(
                            spacing: 8,
                            runSpacing: 8,
                            children: [
                              Tag(
                                moduleLabel(lesson.module),
                                icon: Icons.layers_outlined,
                              ),
                              Tag(
                                '${lesson.questions.length} pergunta(s)',
                                icon: Icons.quiz_outlined,
                              ),
                            ],
                          ),
                        ],
                      ),
                    ),
                    ItemMenu(
                      onEdit: () =>
                          LessonFormDialog.show(context, lesson: lesson),
                      onDelete: () => _delete(lesson),
                    ),
                  ],
                ),
              ),
            ),
          ),
      ],
    );
  }
}

/// Número da aula num quadrado com a cor principal.
class _NumberBadge extends StatelessWidget {
  final int number;

  const _NumberBadge(this.number);

  @override
  Widget build(BuildContext context) {
    final scheme = Theme.of(context).colorScheme;
    return Container(
      width: 44,
      height: 44,
      alignment: Alignment.center,
      decoration: BoxDecoration(
        color: scheme.primary,
        borderRadius: BorderRadius.circular(12),
      ),
      child: Text(
        '$number',
        style: Theme.of(context).textTheme.titleMedium?.copyWith(
          color: scheme.onPrimary,
          fontWeight: FontWeight.w800,
        ),
      ),
    );
  }
}

/// Pergunta com as alternativas; a correta fica marcada.
class _QuestionPreview extends StatelessWidget {
  final int index;
  final Question question;

  const _QuestionPreview({required this.index, required this.question});

  @override
  Widget build(BuildContext context) {
    final scheme = Theme.of(context).colorScheme;
    return Card(
      color: scheme.surfaceContainerHigh,
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          spacing: 6,
          children: [
            Text(
              '${index + 1}. ${question.statement}',
              style: const TextStyle(fontWeight: FontWeight.w700),
            ),
            for (final (o, option) in question.options.indexed)
              Row(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Icon(
                    question.correctOptionIndex == o
                        ? Icons.check_circle
                        : Icons.circle_outlined,
                    size: 18,
                    color: question.correctOptionIndex == o
                        ? scheme.primary
                        : scheme.outline,
                  ),
                  const SizedBox(width: 8),
                  Expanded(child: Text('${optionLetter(o)}) $option')),
                ],
              ),
          ],
        ),
      ),
    );
  }
}
