import 'package:flutter/material.dart';
import 'package:raraapp/api/user_api.dart';
import 'package:raraapp/components/gift_test/gift_tests_summary.dart';
import 'package:raraapp/components/lesson/member_date_dialog.dart';
import 'package:raraapp/components/lesson/module_progress.dart';
import 'package:raraapp/components/shared/content_dialog.dart';
import 'package:raraapp/components/shared/detail_row.dart';
import 'package:raraapp/components/shared/effects/glow_button.dart';
import 'package:raraapp/components/shared/feedback.dart';
import 'package:raraapp/components/shared/format.dart';
import 'package:raraapp/hooks/use_lesson_progress.dart';
import 'package:raraapp/hooks/use_lessons.dart';
import 'package:raraapp/hooks/use_users.dart';

/// Dados do aluno + progresso por módulo + situação de membro.
class StudentDetailDialog extends StatelessWidget {
  final User student;

  const StudentDetailDialog({super.key, required this.student});

  static Future<void> show(BuildContext context, User student) => showDialog(
    context: context,
    builder: (_) => StudentDetailDialog(student: student),
  );

  @override
  Widget build(BuildContext context) {
    // Versão mais nova da lista (muda ao tornar/remover membro)
    final users = useUsers(context).users;
    final current = users.firstWhere(
      (u) => u.id == student.id,
      orElse: () => student,
    );
    final progresses = useLessonProgress(context).forUser(current.id);

    return ContentDialog(
      title: current.name,
      subtitle: current.email,
      actions: [
        OutlinedButton(
          onPressed: () => Navigator.pop(context),
          child: const Text('Fechar'),
        ),
      ],
      children: [
        const SectionTitle('Dados Pessoais', icon: Icons.person_outline),
        Column(
          children: [
            DetailRow('Telefone', current.phone, icon: Icons.phone),
            DetailRow('Gênero', current.gender, icon: Icons.wc),
            DetailRow(
              'Nascimento',
              formatDate(current.birthdate),
              icon: Icons.cake_outlined,
            ),
          ],
        ),
        const SectionTitle('Status', icon: Icons.verified_outlined),
        Column(
          children: [
            DetailRow(
              'Batizado',
              current.baptized ? 'Sim' : 'Não',
              icon: Icons.water_drop_outlined,
            ),
            DetailRow('Status', current.status, icon: Icons.flag_outlined),
          ],
        ),
        _MembershipCard(user: current),
        const SectionTitle('Progresso por Módulo', icon: Icons.insights),
        ModuleProgress(
          lessonsByModule: useLessons(context).byModule,
          progresses: progresses,
        ),
        const SectionTitle('Testes de Dons', icon: Icons.auto_awesome_outlined),
        GiftTestsSummary(user: current),
      ],
    );
  }
}

/// Membro ou não: "Tornar membro" abre o modal com a data; sendo membro,
/// dá para corrigir a data ou remover.
class _MembershipCard extends StatelessWidget {
  final User user;

  const _MembershipCard({required this.user});

  Future<void> _remove(BuildContext context) async {
    if (!await confirmAction(
      context,
      title: 'Remover de membro',
      message:
          '${user.name} deixará de ser membro e a data de entrada será '
          'apagada.',
      confirmLabel: 'Remover',
      icon: Icons.person_remove_outlined,
    )) {
      return;
    }
    if (!context.mounted) return;
    final users = useUsers(context, listen: false);
    final ok = await users.setMember(user.id, false);
    if (!context.mounted) return;
    showResult(
      context,
      ok: ok,
      success: '${user.name} não é mais membro',
      error: users.error,
    );
  }

  @override
  Widget build(BuildContext context) {
    final scheme = Theme.of(context).colorScheme;
    final text = Theme.of(context).textTheme;
    final busy = useUsers(context).isLoading;

    return Card(
      color: scheme.surfaceContainerHigh,
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          spacing: 12,
          children: [
            Row(
              children: [
                Icon(
                  user.member
                      ? Icons.verified_user
                      : Icons.verified_user_outlined,
                  color: user.member ? scheme.primary : null,
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        user.member ? 'Membro' : 'Ainda não é membro',
                        style: text.titleSmall?.copyWith(
                          fontWeight: FontWeight.w700,
                        ),
                      ),
                      Text(
                        !user.member
                            ? 'Torne membro quando concluir a integração'
                            : user.memberSince == null
                            ? 'Sem data de entrada'
                            : 'Desde ${formatDate(user.memberSince)}',
                      ),
                    ],
                  ),
                ),
              ],
            ),
            if (!user.member)
              GlowButton(
                label: 'Tornar membro',
                icon: Icons.how_to_reg,
                onPressed: () => MemberDateDialog.show(context, user),
              )
            else
              Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                spacing: 8,
                children: [
                  OutlinedButton.icon(
                    onPressed: busy
                        ? null
                        : () => MemberDateDialog.show(context, user),
                    icon: const Icon(Icons.edit_calendar_outlined),
                    label: const Text('Alterar data de membro'),
                  ),
                  OutlinedButton.icon(
                    style: OutlinedButton.styleFrom(
                      foregroundColor: scheme.error,
                    ),
                    onPressed: busy ? null : () => _remove(context),
                    icon: const Icon(Icons.person_remove_outlined),
                    label: const Text('Remover de membro'),
                  ),
                ],
              ),
          ],
        ),
      ),
    );
  }
}
