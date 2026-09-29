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
      children: [
        for (final module in lessonModules)
          _bar(
            module,
            (lessonsByModule[module] ?? const [])
                .where((l) => doneIds.contains(l.id))
                .length,
            (lessonsByModule[module] ?? const []).length,
          ),
      ],
    );
  }

  Widget _bar(String module, int completed, int total) {
    final ratio = total == 0 ? 0.0 : completed / total;
    final color = total > 0 && completed == total
        ? Colors.green
        : (completed > 0 ? Colors.blue : Colors.grey[400]!);

    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        border: Border.all(color: Colors.grey[300]!),
        borderRadius: BorderRadius.circular(8),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Expanded(
                child: Text(
                  module.toUpperCase(),
                  style: const TextStyle(fontWeight: FontWeight.w600),
                ),
              ),
              Text(
                '$completed de $total',
                style: const TextStyle(
                  fontWeight: FontWeight.bold,
                  color: Colors.blue,
                ),
              ),
            ],
          ),
          const SizedBox(height: 8),
          ClipRRect(
            borderRadius: BorderRadius.circular(4),
            child: LinearProgressIndicator(
              value: ratio,
              minHeight: 8,
              backgroundColor: Colors.grey[300],
              valueColor: AlwaysStoppedAnimation(color),
            ),
          ),
          const SizedBox(height: 6),
          Text(
            '${(ratio * 100).toStringAsFixed(1)}%',
            style: TextStyle(fontSize: 12, color: Colors.grey[700]),
          ),
        ],
      ),
    );
  }
}
