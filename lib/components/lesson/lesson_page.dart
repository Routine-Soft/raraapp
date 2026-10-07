import 'package:flutter/material.dart';
import 'package:raraapp/api/lesson_api.dart';
import 'package:raraapp/components/gift_test/gift_tests_card.dart';
import 'package:raraapp/components/lesson/journey_map.dart';
import 'package:raraapp/components/lesson/lesson_study_dialog.dart';
import 'package:raraapp/components/lesson/module_progress.dart';
import 'package:raraapp/components/shared/effects/fade_slide_in.dart';
import 'package:raraapp/components/shared/empty_state.dart';
import 'package:raraapp/components/shared/list_page.dart';
import 'package:raraapp/components/shared/brand_logo.dart';
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
    WidgetsBinding.instance.addPostFrameCallback((_) => _load());
  }

  Future<void> _load() async {
    await Future.wait([
      useLessons(context, listen: false).load(),
      useLessonProgress(context, listen: false).loadMine(),
    ]);
  }

  @override
  Widget build(BuildContext context) {
    final lessons = useLessons(context);
    final modules = lessons.byModule.entries
        .where((e) => e.value.isNotEmpty)
        .toList();

    return RefreshIndicator(
      onRefresh: _load,
      child: ListView(
        physics: const AlwaysScrollableScrollPhysics(),
        padding: const EdgeInsets.fromLTRB(16, 16, 16, 32),
        children: [
          const FadeSlideIn(
            child: BrandLogo('avancai', height: 110, semanticLabel: 'Avançai'),
          ),
          const SizedBox(height: 12),
          FadeSlideIn(
            delay: stagger(1),
            child: Text(
              'Ao terminar todas as aulas, você se tornará membro no culto '
              'da família. 1º domingo de cada mês.',
              textAlign: TextAlign.center,
              style: Theme.of(
                context,
              ).textTheme.bodyMedium?.copyWith(fontWeight: FontWeight.w600),
            ),
          ),
          const SizedBox(height: 20),
          if (!(lessons.isLoading && lessons.lessons.isEmpty)) ...[
            FadeSlideIn(delay: stagger(2), child: const JourneyMap()),
            const SizedBox(height: 20),
          ],
          if (lessons.isLoading && lessons.lessons.isEmpty)
            for (var i = 0; i < 3; i++) ...[
              const CardSkeleton(),
              const SizedBox(height: 12),
            ]
          else if (modules.isEmpty)
            EmptyState(
              icon: Icons.menu_book_outlined,
              message: lessons.error ?? 'Nenhuma lição disponível',
            )
          else
            for (final (i, module) in modules.indexed) ...[
              FadeSlideIn(
                delay: stagger(i + 1),
                child: _ModuleCard(name: module.key, lessons: module.value),
              ),
              const SizedBox(height: 12),
            ],
          // Depois de todos os módulos
          FadeSlideIn(
            delay: stagger(modules.length + 1),
            child: const GiftTestsCard(),
          ),
        ],
      ),
    );
  }
}

/// Módulo: cabeçalho com a barra de progresso; abre a lista de aulas.
class _ModuleCard extends StatelessWidget {
  final String name;
  final List<Lesson> lessons;

  const _ModuleCard({required this.name, required this.lessons});

  @override
  Widget build(BuildContext context) {
    final progress = useLessonProgress(context);
    final done = lessons
        .where((l) => progress.mineForLesson(l.id) != null)
        .length;

    return Card(
      clipBehavior: Clip.antiAlias,
      child: ExpansionTile(
        tilePadding: const EdgeInsets.fromLTRB(20, 12, 16, 12),
        childrenPadding: const EdgeInsets.fromLTRB(8, 0, 8, 12),
        title: ProgressBar(
          label: moduleLabel(name),
          completed: done,
          total: lessons.length,
        ),
        children: [for (final lesson in lessons) _LessonTile(lesson: lesson)],
      ),
    );
  }
}

class _LessonTile extends StatelessWidget {
  final Lesson lesson;

  const _LessonTile({required this.lesson});

  @override
  Widget build(BuildContext context) {
    final scheme = Theme.of(context).colorScheme;
    final progress = useLessonProgress(context).mineForLesson(lesson.id);
    final done = progress != null;

    return ListTile(
      leading: AnimatedContainer(
        duration: const Duration(milliseconds: 250),
        width: 40,
        height: 40,
        alignment: Alignment.center,
        decoration: BoxDecoration(
          shape: BoxShape.circle,
          color: done ? scheme.primary : Colors.transparent,
          border: Border.all(color: done ? scheme.primary : scheme.outline),
        ),
        child: done
            ? Icon(Icons.check, color: scheme.onPrimary, size: 20)
            : Text(
                '${lesson.number}',
                style: const TextStyle(fontWeight: FontWeight.w700),
              ),
      ),
      title: Text(
        lesson.title,
        style: const TextStyle(fontWeight: FontWeight.w600),
      ),
      subtitle: Text(
        done
            ? 'Acertos: ${progress.score}/${progress.totalQuestions}'
            : 'Aula ${lesson.number} • não iniciada',
      ),
      trailing: const Icon(Icons.chevron_right),
      onTap: () => LessonStudyDialog.show(context, lesson),
    );
  }
}
