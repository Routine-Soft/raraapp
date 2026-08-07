import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:raraapp/controllers/lesson_controller.dart';
import 'package:raraapp/controllers/user_controller.dart';
import 'package:raraapp/models/lesson.dart';

class LessonSupremoView extends StatefulWidget {
  const LessonSupremoView({super.key});

  @override
  State<LessonSupremoView> createState() => _LessonSupremoViewState();
}

class _LessonSupremoViewState extends State<LessonSupremoView> {
  @override
  void initState() {
    super.initState();
    Future.microtask(() {
      final userController = context.read<UserController>();
      final token = userController.currentUser?.accessToken ?? '';
      context.read<LessonController>().loadAllLessons(token: token);
    });
  }

  @override
  Widget build(BuildContext context) {
    return Consumer2<LessonController, UserController>(
      builder: (context, lessonController, userController, _) {
        if (lessonController.isLoading && lessonController.lessons.isEmpty) {
          return const Center(child: CircularProgressIndicator());
        }

        final token = userController.currentUser?.accessToken ?? '';

        return Scaffold(
          body: Padding(
            padding: const EdgeInsets.all(16),
            child: lessonController.lessons.isEmpty
                ? const Center(child: Text('Nenhuma lição encontrada'))
                : ListView.builder(
                    itemCount: lessonController.lessons.length,
                    itemBuilder: (context, index) {
                      final lesson = lessonController.lessons[index];
                      return Card(
                        margin: const EdgeInsets.only(bottom: 12),
                        elevation: 2,
                        child: ListTile(
                          title: Text(
                            lesson.title ?? 'Sem título',
                            style: const TextStyle(fontWeight: FontWeight.bold),
                          ),
                          subtitle: Text(
                            '${lesson.module ?? 'Módulo?'} - Aula ${lesson.number ?? '?'}',
                          ),
                          trailing: PopupMenuButton(
                            itemBuilder: (context) => [
                              PopupMenuItem(
                                child: const Text('Editar'),
                                onTap: () {
                                  Future.delayed(
                                    const Duration(milliseconds: 300),
                                    () {
                                      if (mounted) {
                                        _showFormDialog(context, token, lesson);
                                      }
                                    },
                                  );
                                },
                              ),
                              PopupMenuItem(
                                child: const Text('Deletar'),
                                onTap: () {
                                  Future.delayed(
                                    const Duration(milliseconds: 300),
                                    () {
                                      if (mounted) {
                                        _deleteLesson(
                                          context,
                                          lesson.id ?? '',
                                          token,
                                        );
                                      }
                                    },
                                  );
                                },
                              ),
                            ],
                          ),
                          onTap: () {
                            lessonController.selectLesson(lesson);
                            _showDetailDialog(context, lesson);
                          },
                        ),
                      );
                    },
                  ),
          ),
          floatingActionButton: FloatingActionButton(
            onPressed: () => _showFormDialog(context, token, null),
            child: const Icon(Icons.add),
          ),
        );
      },
    );
  }

  void _showFormDialog(BuildContext context, String token, LessonDTO? lesson) {
    showDialog(
      context: context,
      builder: (context) => LessonFormDialog(token: token, lesson: lesson),
    );
  }

  void _deleteLesson(BuildContext context, String lessonId, String token) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Deletar Lição?'),
        content: const Text('Esta ação não pode ser desfeita.'),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('Cancelar'),
          ),
          TextButton(
            onPressed: () {
              context.read<LessonController>().deleteLesson(
                lessonId: lessonId,
                token: token,
              );
              Navigator.pop(context);
            },
            child: const Text('Deletar', style: TextStyle(color: Colors.red)),
          ),
        ],
      ),
    );
  }

  void _showDetailDialog(BuildContext context, LessonDTO lesson) {
    showDialog(
      context: context,
      builder: (context) => LessonDetailDialog(lesson: lesson),
    );
  }
}

// Dialog para criar/editar lição
class LessonFormDialog extends StatefulWidget {
  final String token;
  final LessonDTO? lesson;

  const LessonFormDialog({required this.token, this.lesson});

  @override
  State<LessonFormDialog> createState() => _LessonFormDialogState();
}

class _LessonFormDialogState extends State<LessonFormDialog> {
  late TextEditingController _numberController;
  late TextEditingController _titleController;
  late TextEditingController _videoUrlController;
  late TextEditingController _contentController;
  late TextEditingController _imageController;
  late String _selectedModule;
  late List<Map<String, dynamic>> _questions;

  static const List<String> _validModules = ['reset', 'start', 'cdv'];

  @override
  void initState() {
    super.initState();
    _selectedModule = widget.lesson?.module ?? 'reset';
    _numberController = TextEditingController(
      text: widget.lesson?.number?.toString() ?? '',
    );
    _titleController = TextEditingController(text: widget.lesson?.title ?? '');
    _videoUrlController = TextEditingController(
      text: widget.lesson?.videoUrl ?? '',
    );
    _contentController = TextEditingController(
      text: widget.lesson?.content ?? '',
    );
    _imageController = TextEditingController(text: widget.lesson?.image ?? '');

    // Inicializar questions
    _questions =
        widget.lesson?.questions
            ?.map(
              (q) => <String, dynamic>{
                'statement': q.statement ?? '',
                'options': List<String>.from(q.options ?? []),
                'correctOptionIndex': q.correctOptionIndex ?? 0,
              },
            )
            .toList() ??
        [];
  }

  @override
  void dispose() {
    _numberController.dispose();
    _titleController.dispose();
    _videoUrlController.dispose();
    _contentController.dispose();
    _imageController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final screenWidth = MediaQuery.of(context).size.width;
    final isMobile = screenWidth < 600;

    return Dialog(
      child: SingleChildScrollView(
        child: ConstrainedBox(
          constraints: BoxConstraints(
            maxWidth: isMobile ? screenWidth - 32 : 500,
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
                    Text(
                      widget.lesson == null ? 'Criar Lição' : 'Editar Lição',
                      style: const TextStyle(
                        fontSize: 18,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    IconButton(
                      icon: const Icon(Icons.close),
                      onPressed: () => Navigator.pop(context),
                    ),
                  ],
                ),
                const SizedBox(height: 20),

                // Formulário
                // Dropdown para Módulo
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Text(
                      'Módulo *',
                      style: TextStyle(fontWeight: FontWeight.w500),
                    ),
                    const SizedBox(height: 6),
                    DropdownButtonFormField<String>(
                      value: _selectedModule,
                      items: _validModules
                          .map(
                            (module) => DropdownMenuItem(
                              value: module,
                              child: Text(module),
                            ),
                          )
                          .toList(),
                      onChanged: (value) {
                        if (value != null) {
                          setState(() => _selectedModule = value);
                        }
                      },
                      decoration: InputDecoration(
                        border: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(4),
                        ),
                        contentPadding: const EdgeInsets.symmetric(
                          horizontal: 12,
                          vertical: 12,
                        ),
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 12),

                _buildFormField(
                  controller: _numberController,
                  label: 'Número da Aula',
                  hint: '1, 2, 3...',
                  keyboardType: TextInputType.number,
                  required: true,
                ),
                const SizedBox(height: 12),

                _buildFormField(
                  controller: _titleController,
                  label: 'Título',
                  hint: 'Título da lição',
                  required: true,
                ),
                const SizedBox(height: 12),

                _buildFormField(
                  controller: _videoUrlController,
                  label: 'URL do Vídeo',
                  hint: 'https://youtube.com/...',
                  required: true,
                ),
                const SizedBox(height: 12),

                _buildFormField(
                  controller: _contentController,
                  label: 'Conteúdo',
                  hint: 'Texto da lição',
                  maxLines: 4,
                  required: true,
                ),
                const SizedBox(height: 12),

                _buildFormField(
                  controller: _imageController,
                  label: 'URL da Imagem',
                  hint: 'https://...',
                ),
                const SizedBox(height: 24),

                // Seção de Perguntas
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    const Text(
                      'Perguntas',
                      style: TextStyle(
                        fontSize: 14,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    ElevatedButton.icon(
                      onPressed: () => _showAddQuestionDialog(),
                      icon: const Icon(Icons.add, size: 18),
                      label: const Text('Adicionar'),
                      style: ElevatedButton.styleFrom(
                        padding: const EdgeInsets.symmetric(
                          horizontal: 12,
                          vertical: 8,
                        ),
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 12),

                // Lista de perguntas
                if (_questions.isEmpty)
                  Container(
                    padding: const EdgeInsets.all(12),
                    decoration: BoxDecoration(
                      color: Colors.grey[100],
                      borderRadius: BorderRadius.circular(4),
                    ),
                    child: Text(
                      'Nenhuma pergunta adicionada',
                      style: TextStyle(color: Colors.grey[600], fontSize: 12),
                    ),
                  )
                else
                  ListView.builder(
                    shrinkWrap: true,
                    physics: const NeverScrollableScrollPhysics(),
                    itemCount: _questions.length,
                    itemBuilder: (context, index) {
                      final question = _questions[index];
                      return Card(
                        margin: const EdgeInsets.only(bottom: 12),
                        child: Padding(
                          padding: const EdgeInsets.all(12),
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Row(
                                mainAxisAlignment:
                                    MainAxisAlignment.spaceBetween,
                                children: [
                                  Expanded(
                                    child: Text(
                                      '${index + 1}. ${question['statement'] ?? ""}',
                                      style: const TextStyle(
                                        fontWeight: FontWeight.w500,
                                        fontSize: 12,
                                      ),
                                      maxLines: 2,
                                      overflow: TextOverflow.ellipsis,
                                    ),
                                  ),
                                  PopupMenuButton(
                                    itemBuilder: (context) => [
                                      PopupMenuItem(
                                        child: const Text('Editar'),
                                        onTap: () {
                                          Future.delayed(
                                            const Duration(milliseconds: 300),
                                            () {
                                              if (mounted) {
                                                _showEditQuestionDialog(index);
                                              }
                                            },
                                          );
                                        },
                                      ),
                                      PopupMenuItem(
                                        child: const Text('Remover'),
                                        onTap: () {
                                          setState(() {
                                            _questions.removeAt(index);
                                          });
                                        },
                                      ),
                                    ],
                                  ),
                                ],
                              ),
                              if ((question['options'] as List?)?.isNotEmpty ??
                                  false) ...[
                                const SizedBox(height: 8),
                                Wrap(
                                  spacing: 4,
                                  children:
                                      (question['options'] as List<String>)
                                          .asMap()
                                          .entries
                                          .map((entry) {
                                            final optIndex = entry.key;
                                            final option = entry.value;
                                            final isCorrect =
                                                optIndex ==
                                                question['correctOptionIndex'];
                                            return Chip(
                                              label: Text(option),
                                              backgroundColor: isCorrect
                                                  ? Colors.green[200]
                                                  : Colors.grey[200],
                                              labelStyle: TextStyle(
                                                fontSize: 11,
                                                color: isCorrect
                                                    ? Colors.green[900]
                                                    : Colors.black,
                                              ),
                                            );
                                          })
                                          .toList(),
                                ),
                              ],
                            ],
                          ),
                        ),
                      );
                    },
                  ),
                const SizedBox(height: 24),

                // Botões
                Row(
                  mainAxisAlignment: MainAxisAlignment.end,
                  children: [
                    TextButton(
                      onPressed: () => Navigator.pop(context),
                      child: const Text('Cancelar'),
                    ),
                    const SizedBox(width: 8),
                    ElevatedButton(
                      onPressed: () => _submitForm(context),
                      child: Text(
                        widget.lesson == null ? 'Criar' : 'Atualizar',
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildFormField({
    required TextEditingController controller,
    required String label,
    String? hint,
    TextInputType keyboardType = TextInputType.text,
    int maxLines = 1,
    bool required = false,
  }) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          required ? '$label *' : label,
          style: const TextStyle(fontWeight: FontWeight.w500),
        ),
        const SizedBox(height: 6),
        TextField(
          controller: controller,
          keyboardType: keyboardType,
          maxLines: maxLines,
          minLines: maxLines == 1 ? 1 : maxLines,
          decoration: InputDecoration(
            hintText: hint,
            border: OutlineInputBorder(borderRadius: BorderRadius.circular(4)),
            contentPadding: const EdgeInsets.symmetric(
              horizontal: 12,
              vertical: 12,
            ),
          ),
        ),
      ],
    );
  }

  void _submitForm(BuildContext context) {
    if (_numberController.text.isEmpty ||
        _titleController.text.isEmpty ||
        _videoUrlController.text.isEmpty ||
        _contentController.text.isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Preencha todos os campos obrigatórios')),
      );
      return;
    }

    if (widget.lesson == null) {
      // Criar
      context.read<LessonController>().createLesson(
        module: _selectedModule,
        number: int.parse(_numberController.text),
        title: _titleController.text,
        videoUrl: _videoUrlController.text,
        content: _contentController.text,
        image: _imageController.text.isEmpty ? null : _imageController.text,
        questions: _questions.isNotEmpty ? _questions : null,
        token: widget.token,
      );
    } else {
      // Atualizar
      context.read<LessonController>().updateLesson(
        lessonId: widget.lesson!.id ?? '',
        data: {
          'module': _selectedModule,
          'number': int.parse(_numberController.text),
          'title': _titleController.text,
          'videoUrl': _videoUrlController.text,
          'content': _contentController.text,
          if (_imageController.text.isNotEmpty) 'image': _imageController.text,
          if (_questions.isNotEmpty) 'questions': _questions,
        },
        token: widget.token,
      );
    }

    Navigator.pop(context);
  }

  void _showAddQuestionDialog() {
    showDialog(
      context: context,
      builder: (context) => QuestionEditorDialog(
        onSave: (question) {
          setState(() {
            _questions.add(<String, dynamic>{
              'statement': question['statement'],
              'options': List<String>.from(question['options'] as List),
              'correctOptionIndex': question['correctOptionIndex'],
            });
          });
          Navigator.pop(context);
        },
      ),
    );
  }

  void _showEditQuestionDialog(int index) {
    showDialog(
      context: context,
      builder: (context) => QuestionEditorDialog(
        initialQuestion: _questions[index],
        onSave: (question) {
          setState(() {
            _questions[index] = <String, dynamic>{
              'statement': question['statement'],
              'options': List<String>.from(question['options'] as List),
              'correctOptionIndex': question['correctOptionIndex'],
            };
          });
          Navigator.pop(context);
        },
      ),
    );
  }
}

// Dialog para editar pergunta
class QuestionEditorDialog extends StatefulWidget {
  final Map<String, dynamic>? initialQuestion;
  final Function(Map<String, dynamic>) onSave;

  const QuestionEditorDialog({this.initialQuestion, required this.onSave});

  @override
  State<QuestionEditorDialog> createState() => _QuestionEditorDialogState();
}

class _QuestionEditorDialogState extends State<QuestionEditorDialog> {
  late TextEditingController _statementController;
  late List<String> _options;
  late int _correctOptionIndex;

  @override
  void initState() {
    super.initState();
    _statementController = TextEditingController(
      text: widget.initialQuestion?['statement'] ?? '',
    );
    _options = List<String>.from(widget.initialQuestion?['options'] ?? []);
    _correctOptionIndex = widget.initialQuestion?['correctOptionIndex'] ?? 0;
  }

  @override
  void dispose() {
    _statementController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final screenWidth = MediaQuery.of(context).size.width;
    final isMobile = screenWidth < 600;

    return Dialog(
      child: SingleChildScrollView(
        child: ConstrainedBox(
          constraints: BoxConstraints(
            maxWidth: isMobile ? screenWidth - 32 : 450,
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
                    const Text(
                      'Editar Pergunta',
                      style: TextStyle(
                        fontSize: 18,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    IconButton(
                      icon: const Icon(Icons.close),
                      onPressed: () => Navigator.pop(context),
                    ),
                  ],
                ),
                const SizedBox(height: 20),

                // Enunciado
                const Text(
                  'Enunciado *',
                  style: TextStyle(fontWeight: FontWeight.w500),
                ),
                const SizedBox(height: 6),
                TextField(
                  controller: _statementController,
                  maxLines: 2,
                  decoration: InputDecoration(
                    hintText: 'Qual é a pergunta?',
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(4),
                    ),
                    contentPadding: const EdgeInsets.symmetric(
                      horizontal: 12,
                      vertical: 12,
                    ),
                  ),
                ),
                const SizedBox(height: 16),

                // Opções
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    const Text(
                      'Opções *',
                      style: TextStyle(fontWeight: FontWeight.w500),
                    ),
                    ElevatedButton.icon(
                      onPressed: () {
                        setState(() {
                          _options.add('');
                        });
                      },
                      icon: const Icon(Icons.add, size: 16),
                      label: const Text('Adicionar'),
                      style: ElevatedButton.styleFrom(
                        padding: const EdgeInsets.symmetric(
                          horizontal: 12,
                          vertical: 8,
                        ),
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 8),

                // Lista de opções
                if (_options.isEmpty)
                  Container(
                    padding: const EdgeInsets.all(12),
                    decoration: BoxDecoration(
                      color: Colors.grey[100],
                      borderRadius: BorderRadius.circular(4),
                    ),
                    child: Text(
                      'Nenhuma opção adicionada',
                      style: TextStyle(color: Colors.grey[600], fontSize: 12),
                    ),
                  )
                else
                  ListView.builder(
                    shrinkWrap: true,
                    physics: const NeverScrollableScrollPhysics(),
                    itemCount: _options.length,
                    itemBuilder: (context, index) {
                      return Padding(
                        padding: const EdgeInsets.only(bottom: 8),
                        child: Row(
                          children: [
                            Expanded(
                              child: TextField(
                                controller: TextEditingController(
                                  text: _options[index],
                                ),
                                onChanged: (value) {
                                  _options[index] = value;
                                },
                                decoration: InputDecoration(
                                  hintText:
                                      '${String.fromCharCode(65 + index)}) Opção',
                                  border: OutlineInputBorder(
                                    borderRadius: BorderRadius.circular(4),
                                  ),
                                  contentPadding: const EdgeInsets.symmetric(
                                    horizontal: 12,
                                    vertical: 8,
                                  ),
                                ),
                              ),
                            ),
                            const SizedBox(width: 8),
                            // Radio para resposta correta
                            Tooltip(
                              message: 'Marcar como correta',
                              child: Radio<int>(
                                value: index,
                                groupValue: _correctOptionIndex,
                                onChanged: (value) {
                                  if (value != null) {
                                    setState(() {
                                      _correctOptionIndex = value;
                                    });
                                  }
                                },
                              ),
                            ),
                            // Botão remover
                            IconButton(
                              icon: const Icon(Icons.delete_outline, size: 20),
                              onPressed: () {
                                setState(() {
                                  _options.removeAt(index);
                                  if (_correctOptionIndex >= _options.length) {
                                    _correctOptionIndex = _options.length - 1;
                                  }
                                });
                              },
                            ),
                          ],
                        ),
                      );
                    },
                  ),
                const SizedBox(height: 24),

                // Botões
                Row(
                  mainAxisAlignment: MainAxisAlignment.end,
                  children: [
                    TextButton(
                      onPressed: () => Navigator.pop(context),
                      child: const Text('Cancelar'),
                    ),
                    const SizedBox(width: 8),
                    ElevatedButton(
                      onPressed: () {
                        if (_statementController.text.isEmpty) {
                          ScaffoldMessenger.of(context).showSnackBar(
                            const SnackBar(
                              content: Text('Preencha o enunciado da pergunta'),
                            ),
                          );
                          return;
                        }

                        if (_options.isEmpty ||
                            _options.any((opt) => opt.isEmpty)) {
                          ScaffoldMessenger.of(context).showSnackBar(
                            const SnackBar(
                              content: Text('Preencha todas as opções'),
                            ),
                          );
                          return;
                        }

                        widget.onSave(<String, dynamic>{
                          'statement': _statementController.text,
                          'options': _options,
                          'correctOptionIndex': _correctOptionIndex,
                        });
                      },
                      child: const Text('Salvar'),
                    ),
                  ],
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

// Dialog para visualizar detalhes da lição
class LessonDetailDialog extends StatelessWidget {
  final LessonDTO lesson;

  const LessonDetailDialog({required this.lesson});

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
                // Header com botão de fechar
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Expanded(
                      child: Text(
                        lesson.title ?? 'Sem título',
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
                  'Módulo: ${lesson.module ?? '?'} • Aula ${lesson.number ?? '?'}',
                  style: TextStyle(
                    fontSize: 12,
                    color: Colors.grey[600],
                    fontWeight: FontWeight.w500,
                  ),
                ),
                const SizedBox(height: 16),

                // Imagem (se tiver)
                if (lesson.image != null && lesson.image!.isNotEmpty) ...[
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
                        lesson.image!,
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
                if (lesson.videoUrl != null && lesson.videoUrl!.isNotEmpty) ...[
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
                                'Vídeo da lição',
                                style: TextStyle(fontWeight: FontWeight.w500),
                              ),
                              const SizedBox(height: 4),
                              Text(
                                lesson.videoUrl!,
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
                if (lesson.content != null && lesson.content!.isNotEmpty) ...[
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
                      lesson.content!,
                      style: const TextStyle(fontSize: 13, height: 1.6),
                    ),
                  ),
                  const SizedBox(height: 16),
                ],

                // Perguntas
                if (lesson.questions != null &&
                    lesson.questions!.isNotEmpty) ...[
                  const Text(
                    'Perguntas',
                    style: TextStyle(fontSize: 14, fontWeight: FontWeight.bold),
                  ),
                  const SizedBox(height: 8),
                  ListView.builder(
                    shrinkWrap: true,
                    physics: const NeverScrollableScrollPhysics(),
                    itemCount: lesson.questions!.length,
                    itemBuilder: (context, index) {
                      final question = lesson.questions![index];
                      return Padding(
                        padding: const EdgeInsets.only(bottom: 12),
                        child: Container(
                          padding: const EdgeInsets.all(12),
                          decoration: BoxDecoration(
                            border: Border.all(color: Colors.grey[300]!),
                            borderRadius: BorderRadius.circular(8),
                          ),
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(
                                '${index + 1}. ${question.statement ?? "Pergunta sem texto"}',
                                style: const TextStyle(
                                  fontWeight: FontWeight.w500,
                                  fontSize: 12,
                                ),
                              ),
                              if (question.options != null &&
                                  question.options!.isNotEmpty) ...[
                                const SizedBox(height: 8),
                                ...question.options!.asMap().entries.map((
                                  entry,
                                ) {
                                  final optionIndex = entry.key;
                                  final option = entry.value;
                                  final isCorrect =
                                      optionIndex ==
                                      question.correctOptionIndex;
                                  return Padding(
                                    padding: const EdgeInsets.only(top: 4),
                                    child: Text(
                                      '${String.fromCharCode(65 + optionIndex)}) $option${isCorrect ? " ✓" : ""}',
                                      style: TextStyle(
                                        fontSize: 11,
                                        color: isCorrect
                                            ? Colors.green
                                            : Colors.grey[700],
                                        fontWeight: isCorrect
                                            ? FontWeight.bold
                                            : FontWeight.normal,
                                      ),
                                    ),
                                  );
                                }),
                              ],
                            ],
                          ),
                        ),
                      );
                    },
                  ),
                ],
              ],
            ),
          ),
        ),
      ),
    );
  }
}
