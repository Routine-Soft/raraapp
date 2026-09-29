import 'package:flutter/material.dart';
import 'package:raraapp/api/user_api.dart';
import 'package:raraapp/components/lesson/module_progress.dart';
import 'package:raraapp/components/shared/content_dialog.dart';
import 'package:raraapp/components/shared/feedback.dart';
import 'package:raraapp/components/shared/format.dart';
import 'package:raraapp/hooks/use_lesson_progress.dart';
import 'package:raraapp/hooks/use_lessons.dart';
import 'package:raraapp/hooks/use_users.dart';

/// Dados do aluno + progresso por módulo + switch de "Membro".
class StudentDetailDialog extends StatefulWidget {
  final User student;

  const StudentDetailDialog({super.key, required this.student});

  static Future<void> show(BuildContext context, User student) => showDialog(
    context: context,
    builder: (_) => StudentDetailDialog(student: student),
  );

  @override
  State<StudentDetailDialog> createState() => _StudentDetailDialogState();
}

class _StudentDetailDialogState extends State<StudentDetailDialog> {
  late bool _isMember = widget.student.member;

  Future<void> _save() async {
    if (_isMember == widget.student.member) {
      Navigator.pop(context);
      return;
    }

    final users = useUsers(context, listen: false);
    final ok = await users.setMember(widget.student.id, _isMember);
    if (!mounted) return;
    showResult(
      context,
      ok: ok,
      success: 'Status do membro atualizado',
      error: users.error,
    );
    if (ok) Navigator.pop(context);
  }

  Widget _row(String label, String? value) => Padding(
    padding: const EdgeInsets.only(bottom: 8),
    child: Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Text(label, style: TextStyle(fontSize: 13, color: Colors.grey[600])),
        Text(
          (value ?? '').isEmpty ? '—' : value!,
          style: const TextStyle(fontSize: 13, fontWeight: FontWeight.w500),
        ),
      ],
    ),
  );

  @override
  Widget build(BuildContext context) {
    final student = widget.student;
    final progresses = useLessonProgress(context).forUser(student.id);
    final isSaving = useUsers(context).isLoading;

    return ContentDialog(
      title: student.name,
      subtitle: student.email,
      actions: [
        TextButton(
          onPressed: isSaving ? null : () => Navigator.pop(context),
          child: const Text('Cancelar'),
        ),
        ElevatedButton(
          onPressed: isSaving ? null : _save,
          child: isSaving
              ? const SizedBox(
                  width: 16,
                  height: 16,
                  child: CircularProgressIndicator(strokeWidth: 2),
                )
              : const Text('Salvar'),
        ),
      ],
      children: [
        const SectionTitle('Dados Pessoais'),
        _row('Telefone', student.phone),
        _row('Gênero', student.gender),
        _row('Nascimento', formatDate(student.birthdate)),
        const SizedBox(height: 12),
        const SectionTitle('Status'),
        _row('Batizado', student.baptized ? 'Sim' : 'Não'),
        _row('Status', student.status),
        SwitchListTile(
          title: const Text('Membro'),
          value: _isMember,
          onChanged: (value) => setState(() => _isMember = value),
        ),
        const SizedBox(height: 12),
        const SectionTitle('Progresso por Módulo'),
        ModuleProgress(
          lessonsByModule: useLessons(context).byModule,
          progresses: progresses,
        ),
      ],
    );
  }
}
