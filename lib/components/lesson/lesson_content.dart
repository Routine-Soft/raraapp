import 'package:flutter/material.dart';
import 'package:raraapp/api/lesson_api.dart';
import 'package:raraapp/components/shared/content_dialog.dart';
import 'package:url_launcher/url_launcher.dart';

String lessonSubtitle(Lesson lesson) =>
    'Módulo: ${lesson.module.toUpperCase()} • Aula ${lesson.number}';

/// Imagem, vídeo e texto da aula (usado pelo aluno e pelo admin).
class LessonContent extends StatelessWidget {
  final Lesson lesson;

  const LessonContent({super.key, required this.lesson});

  @override
  Widget build(BuildContext context) {
    final image = lesson.image ?? '';

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        if (image.isNotEmpty) ...[
          ClipRRect(
            borderRadius: BorderRadius.circular(8),
            child: Image.network(
              image,
              width: double.infinity,
              height: 200,
              fit: BoxFit.cover,
              errorBuilder: (_, _, _) => Container(
                height: 200,
                color: Colors.grey[300],
                alignment: Alignment.center,
                child: Text(
                  'Erro ao carregar imagem',
                  style: TextStyle(color: Colors.grey[600]),
                ),
              ),
            ),
          ),
          const SizedBox(height: 16),
        ],
        if (lesson.videoUrl.isNotEmpty) ...[
          OutlinedButton.icon(
            onPressed: () => launchUrl(
              Uri.parse(lesson.videoUrl),
              mode: LaunchMode.externalApplication,
            ),
            icon: const Icon(Icons.play_circle_outline),
            label: const Text('Assistir vídeo da aula'),
          ),
          const SizedBox(height: 16),
        ],
        if (lesson.content.isNotEmpty) ...[
          const SectionTitle('Conteúdo'),
          Container(
            width: double.infinity,
            padding: const EdgeInsets.all(12),
            decoration: BoxDecoration(
              color: Colors.grey[100],
              borderRadius: BorderRadius.circular(8),
            ),
            child: Text(
              lesson.content,
              style: const TextStyle(fontSize: 13, height: 1.6),
            ),
          ),
          const SizedBox(height: 16),
        ],
      ],
    );
  }
}

/// Letra da alternativa: 0 -> "A", 1 -> "B"...
String optionLetter(int index) => String.fromCharCode(65 + index);
