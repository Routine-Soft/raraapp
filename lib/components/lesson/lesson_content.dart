import 'package:flutter/material.dart';
import 'package:raraapp/api/lesson_api.dart';
import 'package:raraapp/components/lesson/lesson_video.dart';
import 'package:raraapp/components/shared/content_dialog.dart';
import 'package:raraapp/components/shared/formatted/formatted_text.dart';

String lessonSubtitle(Lesson lesson) =>
    'Módulo: ${moduleLabel(lesson.module)} • Aula ${lesson.number}';

/// Imagem, vídeo e texto da aula (usado pelo aluno e pelo admin).
class LessonContent extends StatelessWidget {
  final Lesson lesson;

  const LessonContent({super.key, required this.lesson});

  @override
  Widget build(BuildContext context) {
    final image = lesson.image ?? '';

    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      spacing: 12,
      children: [
        if (image.isNotEmpty)
          ClipRRect(
            borderRadius: BorderRadius.circular(18),
            child: Image.network(
              image,
              fit: BoxFit.cover,
              errorBuilder: (_, _, _) => const Padding(
                padding: EdgeInsets.all(16),
                child: Text('Erro ao carregar imagem'),
              ),
            ),
          ),
        if (lesson.videoUrl.isNotEmpty) LessonVideo(lesson.videoUrl),
        if (lesson.content.isNotEmpty) ...[
          const SizedBox(height: 4),
          const SectionTitle('Conteúdo', icon: Icons.article_outlined),
          FormattedText(lesson.content),
        ],
      ],
    );
  }
}

/// Letra da alternativa: 0 -> "A", 1 -> "B"...
String optionLetter(int index) => String.fromCharCode(65 + index);
