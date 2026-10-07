import 'package:flutter/material.dart';
import 'package:raraapp/api/user_api.dart';
import 'package:raraapp/components/shared/empty_state.dart';
import 'package:raraapp/components/shared/feedback.dart';
import 'package:raraapp/components/shared/section.dart';
import 'package:raraapp/components/shared/tabbed_page.dart';
import 'package:raraapp/components/user/user_chips.dart';
import 'package:raraapp/components/user/user_detail_dialog.dart';
import 'package:raraapp/hooks/use_auth.dart';
import 'package:raraapp/hooks/use_users.dart';

/// Página de um departamento com a aba "Minha Equipe" para quem monta a
/// equipe (o líder, pastor local, secretária da igreja ou super admin).
/// Para os demais (inclusive quem é da equipe) mostra só a página.
class DepartmentPage extends StatelessWidget {
  final String team;
  final Widget child;

  const DepartmentPage({super.key, required this.team, required this.child});

  @override
  Widget build(BuildContext context) {
    final user = useAuth(context).user;
    if (!(user?.canManageTeam(team) ?? false)) return child;
    return TabbedPage(
      tabs: [
        (icon: Icons.dashboard_outlined, label: 'Painel', child: child),
        (
          icon: Icons.groups_2_outlined,
          label: 'Minha Equipe',
          child: TeamTab(team: team),
        ),
      ],
    );
  }
}

/// Minha Equipe: quem está na equipe do departamento e a busca para
/// "Tornar membro da equipe" (mesmos poderes do líder no departamento).
class TeamTab extends StatefulWidget {
  final String team;

  const TeamTab({super.key, required this.team});

  @override
  State<TeamTab> createState() => _TeamTabState();
}

class _TeamTabState extends State<TeamTab> {
  final _search = TextEditingController();
  String _query = '';

  @override
  void dispose() {
    _search.dispose();
    super.dispose();
  }

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback(
      (_) => useUsers(context, listen: false).load(),
    );
  }

  Future<void> _set(User person, bool add) async {
    final team = teamOf(widget.team);
    if (!add &&
        !await confirmAction(
          context,
          title: 'Tirar da equipe',
          message:
              '${person.name} deixa a equipe do ${team.label} e perde o '
              'acesso às páginas do departamento.',
          confirmLabel: 'Tirar',
          icon: Icons.group_remove_outlined,
        )) {
      return;
    }
    if (!mounted) return;
    final users = useUsers(context, listen: false);
    final auth = useAuth(context, listen: false);
    final ok = await users.setTeam(person.id, widget.team, add);
    if (!mounted) return;
    if (ok) {
      final updated = users.byId(person.id);
      if (updated != null) await auth.syncUser(updated);
      // Adicionou: limpa a busca para a próxima pessoa
      if (add && mounted) {
        _search.clear();
        setState(() => _query = '');
      }
    }
    if (!mounted) return;
    showResult(
      context,
      ok: ok,
      success: add
          ? '${person.name} agora é membro da equipe do ${team.label}'
          : '${person.name} saiu da equipe do ${team.label}',
      error: users.error,
    );
  }

  @override
  Widget build(BuildContext context) {
    final team = teamOf(widget.team);
    final auth = useAuth(context);
    final users = useUsers(context);
    final churchId = auth.user?.churchId;

    if (churchId == null) {
      return const EmptyState(
        icon: Icons.church_outlined,
        message: 'Cadastre sua igreja em Minha Conta para montar a equipe',
      );
    }

    final people = users.ofChurch(churchId);
    final members = people.where((u) => u.isInTeam(widget.team)).toList()
      ..sort((a, b) => a.name.compareTo(b.name));
    final results = _query.trim().isEmpty
        ? const <User>[]
        : users
              .search(_query, churchId: churchId)
              .where((u) => !u.isInTeam(widget.team))
              .toList();

    return ListView(
      padding: const EdgeInsets.fromLTRB(16, 16, 16, 32),
      children: [
        Text(
          'Quem é membro da equipe tem os mesmos poderes do líder no '
          '${team.label}. Só o líder monta a equipe.',
          style: Theme.of(context).textTheme.bodyMedium,
        ),
        const SizedBox(height: 20),
        SectionTitle(
          'Equipe do ${team.label} (${members.length})',
          icon: Icons.groups_2_outlined,
        ),
        const SizedBox(height: 8),
        if (users.isLoading && people.isEmpty)
          const Padding(
            padding: EdgeInsets.all(24),
            child: Center(child: CircularProgressIndicator()),
          )
        else if (members.isEmpty)
          const Padding(
            padding: EdgeInsets.symmetric(vertical: 12),
            child: Text('Ninguém na equipe ainda. Pesquise abaixo.'),
          )
        else
          for (final person in members)
            _PersonRow(
              person: person,
              action: TextButton(
                onPressed: users.isLoading ? null : () => _set(person, false),
                style: TextButton.styleFrom(
                  foregroundColor: Theme.of(context).colorScheme.error,
                ),
                child: const Text('Tirar da equipe'),
              ),
            ),
        const SizedBox(height: 24),
        SectionTitle('Adicionar à equipe', icon: Icons.person_search),
        const SizedBox(height: 8),
        TextField(
          key: const ValueKey('team-search'),
          controller: _search,
          onChanged: (value) => setState(() => _query = value),
          decoration: const InputDecoration(
            hintText: 'Pesquisar por nome ou telefone...',
            prefixIcon: Icon(Icons.search),
          ),
        ),
        const SizedBox(height: 8),
        if (_query.trim().isNotEmpty && results.isEmpty)
          const Padding(
            padding: EdgeInsets.symmetric(vertical: 12),
            child: Text('Ninguém encontrado na sua igreja.'),
          ),
        for (final person in results)
          _PersonRow(
            person: person,
            action: FilledButton.tonal(
              onPressed: users.isLoading ? null : () => _set(person, true),
              child: const Text('Tornar membro da equipe'),
            ),
          ),
      ],
    );
  }
}

class _PersonRow extends StatelessWidget {
  final User person;
  final Widget action;

  const _PersonRow({required this.person, required this.action});

  @override
  Widget build(BuildContext context) {
    return Card(
      margin: const EdgeInsets.only(bottom: 8),
      clipBehavior: Clip.antiAlias,
      child: InkWell(
        onTap: () => UserDetailDialog.show(context, person),
        child: Padding(
          padding: const EdgeInsets.fromLTRB(12, 10, 8, 10),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            spacing: 6,
            children: [
              Row(
                children: [
                  UserAvatar(person, size: 38),
                  const SizedBox(width: 12),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          person.name,
                          maxLines: 1,
                          overflow: TextOverflow.ellipsis,
                          style: const TextStyle(fontWeight: FontWeight.w600),
                        ),
                        Text(
                          person.phone ?? person.email,
                          style: Theme.of(context).textTheme.bodySmall,
                        ),
                      ],
                    ),
                  ),
                ],
              ),
              Align(alignment: Alignment.centerRight, child: action),
            ],
          ),
        ),
      ),
    );
  }
}
