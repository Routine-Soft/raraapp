import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:raraapp/controllers/lesson_controller.dart';
import 'package:raraapp/controllers/lesson_progress_controller.dart';
import 'package:raraapp/controllers/user_controller.dart';
import 'package:raraapp/models/lesson.dart';

class LessonView extends StatefulWidget {
  const LessonView({super.key});

  @override
  State<LessonView> createState() => _LessonViewState();
}

class _LessonViewState extends State<LessonView> {
  final Map<String, bool> _expandedModules = {};

  @override
  void initState() {
    super.initState();
    Future.microtask(() {
      final userController = context.read<UserController>();
      final token = userController.currentUser?.accessToken ?? '';

      context.read<LessonController>().loadAllLessons(token: token);
      context.read<LessonProgressController>().loadMyProgress(token: token);
    });
  }

  @override
  Widget build(BuildContext context) {
    return Consumer3<
      LessonController,
      LessonProgressController,
      UserController
    >(
      builder: (context, lessonController, progressController, userController, _) {
        if (lessonController.isLoading && lessonController.lessons.isEmpty) {
          return const Center(child: CircularProgressIndicator());
        }

        final token = userController.currentUser?.accessToken ?? '';

        // Agrupar lições por módulo
        final Map<String, List<LessonDTO>> lessonsByModule = {};
        for (var lesson in lessonController.lessons) {
          final module = lesson.module ?? 'Sem módulo';
          if (!lessonsByModule.containsKey(module)) {
            lessonsByModule[module] = [];
          }
          lessonsByModule[module]!.add(lesson);
        }

        // Ordenar módulos e lições
        final sortedModules = lessonsByModule.keys.toList()..sort();
        for (var module in sortedModules) {
          lessonsByModule[module]!.sort(
            (a, b) => (a.number ?? 0).compareTo(b.number ?? 0),
          );
        }

        return Scaffold(
          body: lessonController.lessons.isEmpty
              ? const Center(child: Text('Nenhuma lição disponível'))
              : ListView.builder(
                  padding: const EdgeInsets.all(16),
                  itemCount: sortedModules.length,
                  itemBuilder: (context, moduleIndex) {
                    final module = sortedModules[moduleIndex];
                    final lessons = lessonsByModule[module] ?? [];
                    final isExpanded = _expandedModules[module] ?? false;

                    return Card(
                      margin: const EdgeInsets.only(bottom: 12),
                      child: Column(
                        children: [
                          // Header do módulo
                          ListTile(
                            title: Text(
                              module,
                              style: const TextStyle(
                                fontWeight: FontWeight.bold,
                                fontSize: 16,
                              ),
                            ),
                            subtitle: Text(
                              '${lessons.length} aula${lessons.length > 1 ? 's' : ''}',
                            ),
                            trailing: Icon(
                              isExpanded
                                  ? Icons.expand_less
                                  : Icons.expand_more,
                            ),
                            onTap: () {
                              setState(() {
                                _expandedModules[module] = !isExpanded;
                              });
                            },
                          ),

                          // Aulas (se expandido)
                          if (isExpanded)
                            Padding(
                              padding: const EdgeInsets.symmetric(
                                horizontal: 12,
                              ),
                              child: Column(
                                children: [
                                  const Divider(height: 1),
                                  ...lessons.map((lesson) {
                                    final progress = progressController
                                        .findProgressByLessonId(
                                          lesson.id ?? '',
                                        );
                                    final hasCompleted = progress != null;

                                    return ListTile(
                                      contentPadding:
                                          const EdgeInsets.symmetric(
                                            horizontal: 16,
                                            vertical: 8,
                                          ),
                                      leading: Container(
                                        width: 40,
                                        height: 40,
                                        decoration: BoxDecoration(
                                          shape: BoxShape.circle,
                                          color: hasCompleted
                                              ? Colors.green[100]
                                              : Colors.grey[200],
                                        ),
                                        child: Center(
                                          child: Text(
                                            '${lesson.number}',
                                            style: TextStyle(
                                              fontWeight: FontWeight.bold,
                                              color: hasCompleted
                                                  ? Colors.green[900]
                                                  : Colors.grey[700],
                                            ),
                                          ),
                                        ),
                                      ),
                                      title: Text(lesson.title ?? 'Sem título'),
                                      subtitle: hasCompleted
                                          ? Text(
                                              'Acertos: ${progress.score ?? 0}/${progress.totalQuestions ?? 0}',
                                              style: const TextStyle(
                                                color: Colors.green,
                                              ),
                                            )
                                          : null,
                                      onTap: () {
                                        _showLessonDialog(
                                          context,
                                          lesson,
                                          token,
                                        );
                                      },
                                    );
                                  }).toList(),
                                ],
                              ),
                            ),
                        ],
                      ),
                    );
                  },
                ),
        );
      },
    );
  }

  void _showLessonDialog(BuildContext context, LessonDTO lesson, String token) {
    showDialog(
      context: context,
      builder: (context) => LessonStudentDialog(lesson: lesson, token: token),
    );
  }
}

// Dialog para estudar lição e responder questões
class LessonStudentDialog extends StatefulWidget {
  final LessonDTO lesson;
  final String token;

  const LessonStudentDialog({required this.lesson, required this.token});

  @override
  State<LessonStudentDialog> createState() => _LessonStudentDialogState();
}

class _LessonStudentDialogState extends State<LessonStudentDialog> {
  late Map<int, int?> _selectedAnswers;
  bool _submitted = false;
  Map<int, bool>? _correctAnswers;

  @override
  void initState() {
    super.initState();
    _selectedAnswers = {};
    for (int i = 0; i < (widget.lesson.questions?.length ?? 0); i++) {
      _selectedAnswers[i] = null;
    }
  }

  @override
  Widget build(BuildContext context) {
    final screenWidth = MediaQuery.of(context).size.width;
    final isMobile = screenWidth < 600;

    return Dialog(
      insetPadding: EdgeInsets.all(isMobile ? 16 : 32),
      child: SingleChildScrollView(
        child: ConstrainedBox(
          constraints: BoxConstraints(
            maxWidth: isMobile ? screenWidth - 32 : 700,
          ),
          child: Padding(
            padding: const EdgeInsets.all(20),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                // Header
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Expanded(
                      child: Text(
                        widget.lesson.title ?? 'Sem título',
                        style: const TextStyle(
                          fontSize: 20,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                    ),
                    IconButton(
                      icon: const Icon(Icons.close),
                      onPressed: () => Navigator.pop(context),
                    ),
                  ],
                ),
                const SizedBox(height: 8),

                // Módulo e número
                Text(
                  'Módulo: ${widget.lesson.module ?? '?'} • Aula ${widget.lesson.number ?? '?'}',
                  style: TextStyle(
                    fontSize: 12,
                    color: Colors.grey[600],
                    fontWeight: FontWeight.w500,
                  ),
                ),
                const SizedBox(height: 16),

                // Imagem
                if (widget.lesson.image != null &&
                    widget.lesson.image!.isNotEmpty) ...[
                  Container(
                    width: double.infinity,
                    height: 200,
                    decoration: BoxDecoration(
                      borderRadius: BorderRadius.circular(8),
                      color: Colors.grey[300],
                    ),
                    child: ClipRRect(
                      borderRadius: BorderRadius.circular(8),
                      child: Image.network(
                        widget.lesson.image!,
                        fit: BoxFit.cover,
                        errorBuilder: (context, error, stackTrace) => Center(
                          child: Text(
                            'Erro ao carregar imagem',
                            style: TextStyle(color: Colors.grey[600]),
                          ),
                        ),
                      ),
                    ),
                  ),
                  const SizedBox(height: 16),
                ],

                // Vídeo
                if (widget.lesson.videoUrl != null &&
                    widget.lesson.videoUrl!.isNotEmpty) ...[
                  Container(
                    padding: const EdgeInsets.all(12),
                    decoration: BoxDecoration(
                      border: Border.all(color: Colors.grey[400]!),
                      borderRadius: BorderRadius.circular(8),
                    ),
                    child: Row(
                      children: [
                        const Icon(Icons.play_circle_outline, size: 24),
                        const SizedBox(width: 12),
                        Expanded(
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              const Text(
                                'Vídeo da aula',
                                style: TextStyle(fontWeight: FontWeight.w500),
                              ),
                              const SizedBox(height: 4),
                              Text(
                                widget.lesson.videoUrl!,
                                maxLines: 1,
                                overflow: TextOverflow.ellipsis,
                                style: TextStyle(
                                  fontSize: 12,
                                  color: Colors.blue[600],
                                ),
                              ),
                            ],
                          ),
                        ),
                      ],
                    ),
                  ),
                  const SizedBox(height: 16),
                ],

                // Conteúdo
                if (widget.lesson.content != null &&
                    widget.lesson.content!.isNotEmpty) ...[
                  const Text(
                    'Conteúdo',
                    style: TextStyle(fontSize: 14, fontWeight: FontWeight.bold),
                  ),
                  const SizedBox(height: 8),
                  Container(
                    width: double.infinity,
                    padding: const EdgeInsets.all(12),
                    decoration: BoxDecoration(
                      color: Colors.grey[100],
                      borderRadius: BorderRadius.circular(8),
                    ),
                    child: Text(
                      widget.lesson.content!,
                      style: const TextStyle(fontSize: 13, height: 1.6),
                    ),
                  ),
                  const SizedBox(height: 16),
                ],

                // Questões
                if (widget.lesson.questions != null &&
                    widget.lesson.questions!.isNotEmpty) ...[
                  const Text(
                    'Questões',
                    style: TextStyle(fontSize: 14, fontWeight: FontWeight.bold),
                  ),
                  const SizedBox(height: 8),
                  ListView.builder(
                    shrinkWrap: true,
                    physics: const NeverScrollableScrollPhysics(),
                    itemCount: widget.lesson.questions!.length,
                    itemBuilder: (context, qIndex) {
                      final question = widget.lesson.questions![qIndex];
                      final isCorrect =
                          _submitted && (_correctAnswers?[qIndex] ?? false);

                      return Card(
                        margin: const EdgeInsets.only(bottom: 12),
                        color: _submitted
                            ? isCorrect
                                  ? Colors.green[50]
                                  : Colors.red[50]
                            : null,
                        child: Padding(
                          padding: const EdgeInsets.all(12),
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              // Pergunta
                              Row(
                                children: [
                                  Expanded(
                                    child: Text(
                                      '${qIndex + 1}. ${question.statement ?? ""}',
                                      style: const TextStyle(
                                        fontWeight: FontWeight.w500,
                                        fontSize: 13,
                                      ),
                                    ),
                                  ),
                                  if (_submitted)
                                    Icon(
                                      isCorrect
                                          ? Icons.check_circle
                                          : Icons.cancel,
                                      color: isCorrect
                                          ? Colors.green
                                          : Colors.red,
                                    ),
                                ],
                              ),
                              const SizedBox(height: 12),

                              // Opções de resposta
                              if (question.options != null &&
                                  question.options!.isNotEmpty) ...[
                                ListView.builder(
                                  shrinkWrap: true,
                                  physics: const NeverScrollableScrollPhysics(),
                                  itemCount: question.options!.length,
                                  itemBuilder: (context, optIndex) {
                                    final option = question.options![optIndex];
                                    final isSelected =
                                        _selectedAnswers[qIndex] == optIndex;
                                    final isCorrectOption =
                                        optIndex == question.correctOptionIndex;

                                    Color? bgColor;
                                    if (_submitted) {
                                      if (isCorrectOption) {
                                        bgColor = Colors.green[200];
                                      } else if (isSelected &&
                                          !isCorrectOption) {
                                        bgColor = Colors.red[200];
                                      }
                                    }

                                    return GestureDetector(
                                      onTap: _submitted
                                          ? null
                                          : () {
                                              setState(() {
                                                _selectedAnswers[qIndex] =
                                                    optIndex;
                                              });
                                            },
                                      child: Container(
                                        margin: const EdgeInsets.only(
                                          bottom: 8,
                                        ),
                                        padding: const EdgeInsets.all(12),
                                        decoration: BoxDecoration(
                                          border: Border.all(
                                            color: isSelected
                                                ? Colors.blue
                                                : Colors.grey[300]!,
                                            width: isSelected ? 2 : 1,
                                          ),
                                          borderRadius: BorderRadius.circular(
                                            4,
                                          ),
                                          color: bgColor,
                                        ),
                                        child: Row(
                                          children: [
                                            Radio<int>(
                                              value: optIndex,
                                              groupValue:
                                                  _selectedAnswers[qIndex],
                                              onChanged: _submitted
                                                  ? null
                                                  : (value) {
                                                      if (value != null) {
                                                        setState(() {
                                                          _selectedAnswers[qIndex] =
                                                              value;
                                                        });
                                                      }
                                                    },
                                            ),
                                            const SizedBox(width: 8),
                                            Expanded(
                                              child: Text(
                                                '${String.fromCharCode(65 + optIndex)}) $option',
                                                style: TextStyle(
                                                  color:
                                                      _submitted &&
                                                          isCorrectOption
                                                      ? Colors.green[900]
                                                      : null,
                                                  fontWeight:
                                                      _submitted &&
                                                          isCorrectOption
                                                      ? FontWeight.bold
                                                      : FontWeight.normal,
                                                ),
                                              ),
                                            ),
                                          ],
                                        ),
                                      ),
                                    );
                                  },
                                ),
                              ],

                              // Indicador de resultado
                              if (_submitted) ...[
                                const SizedBox(height: 8),
                                Text(
                                  isCorrect
                                      ? 'Resposta correta!'
                                      : 'Resposta incorreta',
                                  style: TextStyle(
                                    fontSize: 12,
                                    color: isCorrect
                                        ? Colors.green[700]
                                        : Colors.red[700],
                                    fontWeight: FontWeight.bold,
                                  ),
                                ),
                              ],
                            ],
                          ),
                        ),
                      );
                    },
                  ),
                  const SizedBox(height: 16),
                ],

                // Resultado final
                if (_submitted && _correctAnswers != null) ...[
                  Container(
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
                          style: TextStyle(
                            fontSize: 14,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        const SizedBox(height: 8),
                        Text(
                          '${_correctAnswers!.values.where((v) => v).length}/${_correctAnswers!.length} acertos',
                          style: const TextStyle(
                            fontSize: 18,
                            fontWeight: FontWeight.bold,
                            color: Colors.blue,
                          ),
                        ),
                        const SizedBox(height: 4),
                        Text(
                          '${((_correctAnswers!.values.where((v) => v).length / _correctAnswers!.length) * 100).toStringAsFixed(1)}%',
                          style: TextStyle(
                            fontSize: 16,
                            color: Colors.blue[700],
                          ),
                        ),
                      ],
                    ),
                  ),
                  const SizedBox(height: 16),
                ],

                // Botões
                Row(
                  mainAxisAlignment: MainAxisAlignment.end,
                  children: [
                    if (_submitted)
                      TextButton(
                        onPressed: () {
                          setState(() {
                            _submitted = false;
                            _correctAnswers = null;
                            for (
                              int i = 0;
                              i < (widget.lesson.questions?.length ?? 0);
                              i++
                            ) {
                              _selectedAnswers[i] = null;
                            }
                          });
                        },
                        child: const Text('Tentar Novamente'),
                      ),
                    const SizedBox(width: 8),
                    TextButton(
                      onPressed: () => Navigator.pop(context),
                      child: const Text('Fechar'),
                    ),
                    if (!_submitted &&
                        widget.lesson.questions != null &&
                        widget.lesson.questions!.isNotEmpty) ...[
                      const SizedBox(width: 8),
                      ElevatedButton(
                        onPressed:
                            _selectedAnswers.values.any(
                              (answer) => answer == null,
                            )
                            ? null
                            : () => _submitAnswers(context),
                        child: const Text('Submeter'),
                      ),
                    ],
                  ],
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  void _submitAnswers(BuildContext context) {
    // Apenas coletar respostas - NÃO calcular isCorrect
    // Backend vai fazer o cálculo baseado na lição
    final answers = <Map<String, dynamic>>[];

    for (int i = 0; i < widget.lesson.questions!.length; i++) {
      final selectedOptionIndex = _selectedAnswers[i];

      answers.add({
        'questionIndex': i,
        'selectedOptionIndex': selectedOptionIndex,
        // isCorrect será calculado pelo backend!
      });
    }

    final userController = context.read<UserController>();
    final progressController = context.read<LessonProgressController>();

    // Verificar se já existe progress anterior para essa lição
    final existingProgress = progressController.findProgressByLessonId(
      widget.lesson.id ?? '',
    );

    if (existingProgress != null) {
      // Atualizar progresso existente
      progressController
          .updateProgress(
            progressId: existingProgress.id ?? '',
            data: {
              'answers': answers,
              'completedAt': DateTime.now().toIso8601String(),
              // score será recalculado pelo backend
            },
            token: widget.token,
          )
          .then((_) {
            // Após atualização bem-sucedida, construir resultado com dados do backend
            setState(() {
              _submitted = true;
              _correctAnswers = _buildCorrectAnswersFromBackend(
                progressController,
              );
            });
          });
    } else {
      // Criar novo progresso - deixar backend calcular score
      progressController
          .createProgress(
            userId: userController.currentUser?.id ?? '',
            lessonId: widget.lesson.id ?? '',
            score: 0, // será recalculado pelo backend
            totalQuestions: widget.lesson.questions?.length ?? 0,
            answers: answers,
            completedAt: DateTime.now(),
            token: widget.token,
          )
          .then((_) {
            // Após criação bem-sucedida, construir resultado com dados do backend
            setState(() {
              _submitted = true;
              _correctAnswers = _buildCorrectAnswersFromBackend(
                progressController,
              );
            });
          });
    }
  }

  Map<int, bool> _buildCorrectAnswersFromBackend(
    LessonProgressController controller,
  ) {
    final result = <int, bool>{};
    final progress = controller.findProgressByLessonId(widget.lesson.id ?? '');

    if (progress != null && progress.answers != null) {
      for (var answer in progress.answers!) {
        if (answer.questionIndex != null && answer.isCorrect != null) {
          result[answer.questionIndex!] = answer.isCorrect!;
        }
      }
    }

    return result;
  }
}
