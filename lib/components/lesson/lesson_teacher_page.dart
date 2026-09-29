import 'package:flutter/material.dart';
import 'package:raraapp/api/user_api.dart';
import 'package:raraapp/components/lesson/student_detail_dialog.dart';
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

    return DefaultTabController(
      length: 2,
      child: Scaffold(
        appBar: AppBar(
          title: const Text('Painel do Professor'),
          bottom: const TabBar(
            tabs: [
              Tab(icon: Icon(Icons.person), text: 'Alunos'),
              Tab(icon: Icon(Icons.verified_user), text: 'Membros'),
            ],
          ),
        ),
        body: users.isLoading && users.users.isEmpty
            ? const Center(child: CircularProgressIndicator())
            : TabBarView(
                children: [
                  _UserList(
                    users: users.nonMembers,
                    emptyMessage: 'Nenhum aluno encontrado',
                  ),
                  _UserList(
                    users: users.members,
                    emptyMessage: 'Nenhum membro encontrado',
                  ),
                ],
              ),
      ),
    );
  }
}

class _UserList extends StatelessWidget {
  final List<User> users;
  final String emptyMessage;

  const _UserList({required this.users, required this.emptyMessage});

  @override
  Widget build(BuildContext context) {
    if (users.isEmpty) return Center(child: Text(emptyMessage));
    final progress = useLessonProgress(context);

    return ListView(
      padding: const EdgeInsets.all(12),
      children: [
        for (final user in users)
          Card(
            margin: const EdgeInsets.only(bottom: 8),
            child: ListTile(
              leading: UserAvatar(user),
              title: Text(user.name),
              subtitle: Wrap(
                spacing: 8,
                crossAxisAlignment: WrapCrossAlignment.center,
                children: [
                  UserChips(user: user, showMember: false),
                  Text('${progress.forUser(user.id).length} aula(s)'),
                ],
              ),
              trailing: const Icon(Icons.chevron_right),
              onTap: () => StudentDetailDialog.show(context, user),
            ),
          ),
      ],
    );
  }
}
