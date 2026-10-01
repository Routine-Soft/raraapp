import 'package:flutter/material.dart';
import 'package:raraapp/api/lesson_api.dart';
import 'package:raraapp/api/lesson_progress_api.dart';

/// Barras "X de Y aulas" por módulo para um aluno.
class ModuleProgress extends StatelessWidget {
  final Map<String, List<Lesson>> lessonsByModule;
  final List<LessonProgress> progresses;

  const ModuleProgress({
    super.key,
    required this.lessonsByModule,
    required this.progresses,
  });

  @override
  Widget build(BuildContext context) {
    final doneIds = {for (final p in progresses) p.lessonId};

    return Column(
      spacing: 16,
      children: [
        for (final module in lessonModules)
          ProgressBar(
            label: moduleLabel(module),
            completed: (lessonsByModule[module] ?? const [])
                .where((l) => doneIds.contains(l.id))
                .length,
            total: (lessonsByModule[module] ?? const []).length,
          ),
      ],
    );
  }
}

/// Barra de progresso arredondada que "enche" ao aparecer
/// (CSS: transition de width).
class ProgressBar extends StatelessWidget {
  final String label;
  final int completed;
  final int total;

  const ProgressBar({
    super.key,
    required this.label,
    required this.completed,
    required this.total,
  });

  @override
  Widget build(BuildContext context) {
    final ratio = total == 0 ? 0.0 : completed / total;
    final text = Theme.of(context).textTheme;
    final muted = Theme.of(
      context,
    ).colorScheme.onSurface.withValues(alpha: 0.7);

    return Semantics(
      label: '$label: $completed de $total aulas',
      excludeSemantics: true,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        spacing: 6,
        children: [
          Row(
            children: [
              Expanded(
                child: Text(
                  label,
                  style: text.labelLarge?.copyWith(fontWeight: FontWeight.w700),
                ),
              ),
              Text(
                '$completed de $total',
                style: text.bodySmall?.copyWith(color: muted),
              ),
            ],
          ),
          TweenAnimationBuilder<double>(
            tween: Tween(begin: 0, end: ratio),
            duration: MediaQuery.of(context).disableAnimations
                ? Duration.zero
                : const Duration(milliseconds: 900),
            curve: Curves.easeOutCubic,
            builder: (context, value, _) => LinearProgressIndicator(
              value: value,
              minHeight: 10,
              borderRadius: BorderRadius.circular(999),
            ),
          ),
        ],
      ),
    );
  }
}
