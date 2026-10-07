import 'package:flutter/material.dart';
import 'package:raraapp/api/user_api.dart';
import 'package:raraapp/components/lesson/student_detail_dialog.dart';
import 'package:raraapp/components/user/status_tag.dart';
import 'package:raraapp/components/shared/effects/fade_slide_in.dart';
import 'package:raraapp/components/shared/empty_state.dart';
import 'package:raraapp/components/shared/list_page.dart';
import 'package:raraapp/components/shared/tabbed_page.dart';
import 'package:raraapp/components/shared/tag.dart';
import 'package:raraapp/components/user/user_chips.dart';
import 'package:raraapp/hooks/use_lesson_progress.dart';
import 'package:raraapp/hooks/use_lessons.dart';
import 'package:raraapp/hooks/use_users.dart';

/// Painel do professor: alunos e membros com o progresso nas aulas.
class LessonTeacherPage extends StatefulWidget {
  const LessonTeacherPage({super.key});

  @override
  State<LessonTeacherPage> createState() => _LessonTeacherPageState();
}

class _LessonTeacherPageState extends State<LessonTeacherPage> {
  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      useUsers(context, listen: false).load();
      useLessonProgress(context, listen: false).loadAll();
      useLessons(context, listen: false).ensureLoaded();
    });
  }

  @override
  Widget build(BuildContext context) {
    final users = useUsers(context);
    final loading = users.isLoading && users.users.isEmpty;

    return TabbedPage(
      tabs: [
        (
          icon: Icons.school_outlined,
          label: 'Alunos',
          child: _UserList(
            users: users.nonMembers,
            loading: loading,
            onRefresh: users.load,
            emptyMessage: 'Nenhum aluno encontrado',
          ),
        ),
        (
          icon: Icons.verified_user_outlined,
          label: 'Membros',
          child: _UserList(
            users: users.members,
            loading: loading,
            onRefresh: users.load,
            emptyMessage: 'Nenhum membro encontrado',
          ),
        ),
      ],
    );
  }
}

class _UserList extends StatelessWidget {
  final List<User> users;
  final bool loading;
  final Future<void> Function() onRefresh;
  final String emptyMessage;

  const _UserList({
    required this.users,
    required this.loading,
    required this.onRefresh,
    required this.emptyMessage,
  });

  @override
  Widget build(BuildContext context) {
    final progress = useLessonProgress(context);

    return RefreshIndicator(
      onRefresh: onRefresh,
      child: ListView(
        physics: const AlwaysScrollableScrollPhysics(),
        padding: const EdgeInsets.fromLTRB(16, 12, 16, 32),
        children: [
          if (loading)
            for (var i = 0; i < 4; i++) ...[
              const CardSkeleton(),
              const SizedBox(height: 12),
            ]
          else if (users.isEmpty)
            EmptyState(icon: Icons.person_search, message: emptyMessage)
          else
            for (final (i, user) in users.indexed) ...[
              FadeSlideIn(
                delay: stagger(i.clamp(0, 8), stepMs: 50),
                child: UserTile(
                  user: user,
                  subtitle: Wrap(
                    spacing: 8,
                    runSpacing: 8,
                    children: [
                      UserChips(user: user),
                      if (user.status != null) StatusTag(user.status!),
                      Tag(
                        user.facilitator ?? 'Sem facilitador',
                        icon: Icons.support_agent,
                      ),
                      Tag(
                        '${progress.forUser(user.id).length} '
                        '${progress.forUser(user.id).length == 1 ? 'aula' : 'aulas'}',
                        icon: Icons.menu_book_outlined,
                      ),
                    ],
                  ),
                  onTap: () => StudentDetailDialog.show(context, user),
                ),
              ),
              const SizedBox(height: 12),
            ],
        ],
      ),
    );
  }
}
