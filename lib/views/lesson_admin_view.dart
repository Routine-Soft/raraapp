import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:raraapp/controllers/lesson_progress_controller.dart';
import 'package:raraapp/controllers/lesson_controller.dart';
import 'package:raraapp/controllers/user_controller.dart';
import 'package:raraapp/models/lesson_progress.dart';
import 'package:raraapp/models/lesson.dart';
import 'package:raraapp/models/user.dart';

class LessonAdminView extends StatefulWidget {
  const LessonAdminView({super.key});

  @override
  State<LessonAdminView> createState() => _LessonAdminViewState();
}

class _LessonAdminViewState extends State<LessonAdminView>
    with SingleTickerProviderStateMixin {
  late TabController _tabController;

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 2, vsync: this);

    // Carregar dados ao abrir
    Future.microtask(() {
      final userController = context.read<UserController>();
      final progressController = context.read<LessonProgressController>();
      final lessonController = context.read<LessonController>();
      final token = userController.currentUser?.accessToken ?? '';

      userController.loadAllUsers(token: token);
      progressController.loadAllProgress(token: token);
      lessonController.loadAllLessons(token: token);
    });
  }

  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Painel do Professor'),
        bottom: TabBar(
          controller: _tabController,
          tabs: const [
            Tab(icon: Icon(Icons.person), text: 'Alunos'),
            Tab(icon: Icon(Icons.verified_user), text: 'Membros'),
          ],
        ),
      ),
      body: TabBarView(
        controller: _tabController,
        children: [_buildStudentsList(context), _buildMembersList(context)],
      ),
    );
  }

  Widget _buildStudentsList(BuildContext context) {
    return Consumer2<UserController, LessonProgressController>(
      builder: (context, userController, progressController, _) {
        final students = userController.allUsers
            .where((u) => u.member != true)
            .toList();

        if (userController.isLoading) {
          return const Center(child: CircularProgressIndicator());
        }

        if (students.isEmpty) {
          return const Center(child: Text('Nenhum aluno encontrado'));
        }

        return ListView.builder(
          padding: const EdgeInsets.all(12),
          itemCount: students.length,
          itemBuilder: (context, index) {
            final student = students[index];
            final studentProgresses = progressController.progresses
                .where((p) => p.userId == student.id)
                .toList();

            return Card(
              margin: const EdgeInsets.only(bottom: 8),
              child: ListTile(
                leading: CircleAvatar(
                  child: Text(student.name[0].toUpperCase()),
                ),
                title: Text(student.name),
                subtitle: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const SizedBox(height: 6),
                    Chip(
                      label: Text(
                        student.baptized ? 'Batizado' : 'Não Batizado',
                        style: const TextStyle(
                          fontSize: 12,
                          color: Colors.white,
                        ),
                      ),
                      backgroundColor: student.baptized
                          ? Colors.green
                          : Colors.orange,
                      padding: const EdgeInsets.symmetric(
                        horizontal: 8,
                        vertical: 0,
                      ),
                    ),
                    const SizedBox(height: 6),
                    Text(
                      '${studentProgresses.length} aula${studentProgresses.length == 1 ? '' : 's'}',
                      style: const TextStyle(fontSize: 12),
                    ),
                  ],
                ),
                trailing: const Icon(Icons.chevron_right),
                onTap: () {
                  _showStudentDetail(context, student, studentProgresses);
                },
              ),
            );
          },
        );
      },
    );
  }

  Widget _buildMembersList(BuildContext context) {
    return Consumer2<UserController, LessonProgressController>(
      builder: (context, userController, progressController, _) {
        final members = userController.allUsers
            .where((u) => u.member == true)
            .toList();

        if (userController.isLoading) {
          return const Center(child: CircularProgressIndicator());
        }

        if (members.isEmpty) {
          return const Center(child: Text('Nenhum membro encontrado'));
        }

        return ListView.builder(
          padding: const EdgeInsets.all(12),
          itemCount: members.length,
          itemBuilder: (context, index) {
            final member = members[index];
            final memberProgresses = progressController.progresses
                .where((p) => p.userId == member.id)
                .toList();

            return Card(
              margin: const EdgeInsets.only(bottom: 8),
              child: ListTile(
                leading: CircleAvatar(
                  backgroundColor: Colors.green[100],
                  child: Text(
                    member.name[0].toUpperCase(),
                    style: const TextStyle(color: Colors.green),
                  ),
                ),
                title: Text(member.name),
                subtitle: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const SizedBox(height: 6),
                    Chip(
                      label: Text(
                        member.baptized ? 'Batizado' : 'Não Batizado',
                        style: const TextStyle(
                          fontSize: 12,
                          color: Colors.white,
                        ),
                      ),
                      backgroundColor: member.baptized
                          ? Colors.green
                          : Colors.orange,
                      padding: const EdgeInsets.symmetric(
                        horizontal: 8,
                        vertical: 0,
                      ),
                    ),
                    const SizedBox(height: 6),
                    Text(
                      '${memberProgresses.length} aula${memberProgresses.length == 1 ? '' : 's'}',
                      style: const TextStyle(fontSize: 12),
                    ),
                  ],
                ),
                trailing: const Icon(Icons.chevron_right),
                onTap: () {
                  _showStudentDetail(context, member, memberProgresses);
                },
              ),
            );
          },
        );
      },
    );
  }

  void _showStudentDetail(
    BuildContext context,
    UserDTO student,
    List<LessonProgressDTO> progresses,
  ) {
    final lessonController = context.read<LessonController>();
    showDialog(
      context: context,
      builder: (context) => UserDetailDialog(
        student: student,
        progresses: progresses,
        lessons: lessonController.lessons,
      ),
    );
  }
}

// Dialog para detalhe do aluno
class UserDetailDialog extends StatefulWidget {
  final UserDTO student;
  final List<LessonProgressDTO> progresses;
  final List<LessonDTO> lessons;

  const UserDetailDialog({
    required this.student,
    required this.progresses,
    required this.lessons,
  });

  @override
  State<UserDetailDialog> createState() => _UserDetailDialogState();
}

class _UserDetailDialogState extends State<UserDetailDialog> {
  late bool _isMember;
  bool _isSaving = false;

  @override
  void initState() {
    super.initState();
    _isMember = widget.student.member == true;
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
            padding: const EdgeInsets.all(24),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                // Header
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            widget.student.name,
                            style: const TextStyle(
                              fontSize: 20,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                          const SizedBox(height: 4),
                          Text(
                            widget.student.email,
                            style: TextStyle(
                              fontSize: 12,
                              color: Colors.grey[600],
                            ),
                          ),
                        ],
                      ),
                    ),
                    IconButton(
                      icon: const Icon(Icons.close),
                      onPressed: () => Navigator.pop(context),
                    ),
                  ],
                ),
                const SizedBox(height: 20),
                const Divider(),
                const SizedBox(height: 20),

                // Dados pessoais
                const Text(
                  'Dados Pessoais',
                  style: TextStyle(fontSize: 14, fontWeight: FontWeight.bold),
                ),
                const SizedBox(height: 12),
                _buildDataRow('Telefone', widget.student.phone ?? '—'),
                _buildDataRow('Gênero', widget.student.gender ?? '—'),
                if (widget.student.birthdate != null) ...[
                  _buildDataRow(
                    'Nascimento',
                    '${widget.student.birthdate!.day}/${widget.student.birthdate!.month}/${widget.student.birthdate!.year}',
                  ),
                ],
                const SizedBox(height: 20),

                // Status
                const Text(
                  'Status',
                  style: TextStyle(fontSize: 14, fontWeight: FontWeight.bold),
                ),
                const SizedBox(height: 12),
                _buildDataRow(
                  'Batizado',
                  widget.student.baptized ? 'Sim' : 'Não',
                ),
                _buildDataRow('Status', widget.student.status ?? '—'),
                const SizedBox(height: 16),

                // Toggle Member
                Container(
                  padding: const EdgeInsets.symmetric(
                    horizontal: 12,
                    vertical: 12,
                  ),
                  decoration: BoxDecoration(
                    border: Border.all(color: Colors.grey[300]!),
                    borderRadius: BorderRadius.circular(8),
                  ),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      const Text(
                        'Membro',
                        style: TextStyle(fontWeight: FontWeight.w500),
                      ),
                      Switch(
                        value: _isMember,
                        onChanged: (value) {
                          setState(() {
                            _isMember = value;
                          });
                        },
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: 20),

                // Progresso por módulo
                if (widget.progresses.isNotEmpty) ...[
                  const Text(
                    'Progresso por Módulo',
                    style: TextStyle(fontSize: 14, fontWeight: FontWeight.bold),
                  ),
                  const SizedBox(height: 12),
                  ..._buildModuleProgress(),
                  const SizedBox(height: 20),
                ],

                // Botões
                Row(
                  mainAxisAlignment: MainAxisAlignment.end,
                  children: [
                    TextButton(
                      onPressed: _isSaving
                          ? null
                          : () => Navigator.pop(context),
                      child: const Text('Cancelar'),
                    ),
                    const SizedBox(width: 12),
                    ElevatedButton(
                      onPressed: _isSaving ? null : () => _saveMemberStatus(),
                      child: _isSaving
                          ? const SizedBox(
                              width: 16,
                              height: 16,
                              child: CircularProgressIndicator(strokeWidth: 2),
                            )
                          : const Text('Salvar'),
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

  Widget _buildDataRow(String label, String value) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 8),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(label, style: TextStyle(fontSize: 13, color: Colors.grey[600])),
          Text(
            value,
            style: const TextStyle(fontSize: 13, fontWeight: FontWeight.w500),
          ),
        ],
      ),
    );
  }

  List<Widget> _buildModuleProgress() {
    // Mapear módulos com total de aulas
    final moduleStats = <String, Map<String, int>>{};

    // Inicializar sempre os 3 módulos
    moduleStats['reset'] = {'completed': 0, 'total': 0};
    moduleStats['start'] = {'completed': 0, 'total': 0};
    moduleStats['cdv'] = {'completed': 0, 'total': 0};

    // Contar total de aulas por módulo
    for (final lesson in widget.lessons) {
      final module = lesson.module ?? 'reset';
      if (moduleStats.containsKey(module)) {
        moduleStats[module]!['total'] = moduleStats[module]!['total']! + 1;
      }
    }

    // Contar aulas concluídas
    for (final progress in widget.progresses) {
      final lesson = widget.lessons.firstWhere(
        (l) => l.id == progress.lessonId,
        orElse: () => LessonDTO(module: 'reset'),
      );
      final module = lesson.module ?? 'reset';
      if (moduleStats.containsKey(module)) {
        moduleStats[module]!['completed'] =
            moduleStats[module]!['completed']! + 1;
      }
    }

    // Ordenar módulos
    final modules = ['reset', 'start', 'cdv'];
    final sortedModules = modules.where((m) => moduleStats.containsKey(m));

    // Renderizar cards por módulo
    return sortedModules.map((module) {
      final stats = moduleStats[module]!;
      final completed = stats['completed']!;
      final total = stats['total']!;
      final percentage = total > 0
          ? (completed / total * 100).toStringAsFixed(1)
          : '0.0';

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
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Expanded(
                  child: Text(
                    module.toUpperCase(),
                    style: const TextStyle(
                      fontWeight: FontWeight.w600,
                      fontSize: 14,
                    ),
                  ),
                ),
                Text(
                  '$completed de $total',
                  style: const TextStyle(
                    fontWeight: FontWeight.bold,
                    color: Colors.blue,
                    fontSize: 13,
                  ),
                ),
              ],
            ),
            const SizedBox(height: 8),
            ClipRRect(
              borderRadius: BorderRadius.circular(4),
              child: LinearProgressIndicator(
                value: total > 0 ? completed / total : 0,
                minHeight: 8,
                backgroundColor: Colors.grey[300],
                valueColor: AlwaysStoppedAnimation(
                  completed == total && total > 0
                      ? Colors.green
                      : completed > 0
                      ? Colors.blue
                      : Colors.grey[400],
                ),
              ),
            ),
            const SizedBox(height: 6),
            Text(
              '$percentage%',
              style: TextStyle(
                fontSize: 12,
                fontWeight: FontWeight.w500,
                color: Colors.grey[700],
              ),
            ),
          ],
        ),
      );
    }).toList();
  }

  void _saveMemberStatus() async {
    if (_isMember == (widget.student.member == true)) {
      // Sem mudanças
      Navigator.pop(context);
      return;
    }

    final userController = context.read<UserController>();
    final token = userController.currentUser?.accessToken ?? '';

    setState(() => _isSaving = true);

    final success = await userController.updateUser(
      userId: widget.student.id ?? '',
      data: {'member': _isMember},
      token: token,
    );

    setState(() => _isSaving = false);

    if (success) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Status do membro atualizado')),
      );
      Navigator.pop(context);
    } else {
      ScaffoldMessenger.of(
        context,
      ).showSnackBar(SnackBar(content: Text('Erro: ${userController.error}')));
    }
  }
}
