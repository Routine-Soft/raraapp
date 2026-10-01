import 'package:flutter/material.dart';
import 'package:raraapp/components/church/church_filter.dart';
import 'package:raraapp/components/shared/effects/fade_slide_in.dart';
import 'package:raraapp/components/shared/empty_state.dart';
import 'package:raraapp/components/shared/tabbed_page.dart';
import 'package:raraapp/components/shared/tag.dart';
import 'package:raraapp/components/theme/app_effects.dart';
import 'package:raraapp/components/user/facilitator_user_form.dart';
import 'package:raraapp/components/user/general_dashboard.dart';
import 'package:raraapp/components/user/member_growth.dart';
import 'package:raraapp/components/user/people_stats.dart';
import 'package:raraapp/components/user/user_chips.dart';
import 'package:raraapp/components/user/user_detail_dialog.dart';
import 'package:raraapp/components/user/user_integration_dialog.dart';
import 'package:raraapp/hooks/use_auth.dart';
import 'package:raraapp/hooks/use_users.dart';

/// Membros Liderança: números e lista detalhada dos membros da própria
/// igreja.
class MembersLeadershipPage extends StatelessWidget {
  const MembersLeadershipPage({super.key});

  @override
  Widget build(BuildContext context) {
    final churchId = useAuth(context).user?.churchId;
    if (churchId == null) {
      return const _NoChurch();
    }
    return _UsersLoader(child: _MembersTabs(churchId: churchId));
  }
}

/// Membros Super Intendente Geral: dashboard próprio (visão geral + um card
/// por igreja) e a lista detalhada com filtro de igreja.
class MembersGeneralPage extends StatefulWidget {
  const MembersGeneralPage({super.key});

  @override
  State<MembersGeneralPage> createState() => _MembersGeneralPageState();
}

class _MembersGeneralPageState extends State<MembersGeneralPage> {
  String? _churchId;

  @override
  Widget build(BuildContext context) {
    return _UsersLoader(
      child: TabbedPage(
        tabs: [
          (
            icon: Icons.insights,
            label: 'Dashboard',
            child: const GeneralDashboard(),
          ),
          (
            icon: Icons.person_search,
            label: 'Membros Detalhado',
            child: Column(
              children: [
                Padding(
                  padding: const EdgeInsets.fromLTRB(16, 16, 16, 0),
                  child: ChurchFilter(
                    value: _churchId,
                    onChanged: (id) => setState(() => _churchId = id),
                  ),
                ),
                Expanded(
                  child: _MembersDetailed(
                    key: ValueKey(_churchId),
                    churchId: _churchId,
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

class _MembersTabs extends StatelessWidget {
  final String? churchId;

  const _MembersTabs({required this.churchId});

  @override
  Widget build(BuildContext context) {
    return TabbedPage(
      tabs: [
        (
          icon: Icons.insights,
          label: 'Dashboard',
          child: _Dashboard(churchId: churchId),
        ),
        (
          icon: Icons.person_search,
          label: 'Membros Detalhado',
          child: _MembersDetailed(churchId: churchId),
        ),
      ],
    );
  }
}

/// Facilitadores: números, cadastro de visitantes e lista detalhada da
/// própria igreja.
class FacilitatorsPage extends StatelessWidget {
  const FacilitatorsPage({super.key});

  @override
  Widget build(BuildContext context) {
    final churchId = useAuth(context).user?.churchId;
    if (churchId == null) {
      return const _NoChurch();
    }
    return _UsersLoader(
      child: TabbedPage(
        tabs: [
          (
            icon: Icons.insights,
            label: 'Dashboard',
            child: _Dashboard(churchId: churchId),
          ),
          (
            icon: Icons.person_add_alt,
            label: 'Criar Usuário',
            child: const FacilitatorUserForm(),
          ),
          (
            icon: Icons.person_search,
            label: 'Membros Detalhado',
            child: _MembersDetailed(churchId: churchId),
          ),
        ],
      ),
    );
  }
}

class _NoChurch extends StatelessWidget {
  const _NoChurch();

  @override
  Widget build(BuildContext context) => const EmptyState(
    icon: Icons.church_outlined,
    message: 'Cadastre sua igreja em Minha Conta para ver os membros',
  );
}

/// Carrega os usuários ao abrir a página.
class _UsersLoader extends StatefulWidget {
  final Widget child;

  const _UsersLoader({required this.child});

  @override
  State<_UsersLoader> createState() => _UsersLoaderState();
}

class _UsersLoaderState extends State<_UsersLoader> {
  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback(
      (_) => useUsers(context, listen: false).load(),
    );
  }

  @override
  Widget build(BuildContext context) => widget.child;
}

/// Números dos usuários da igreja [churchId] (`null` = todas), com filtro
/// de quem entra nos números (membros / não membros, gênero).
class _Dashboard extends StatefulWidget {
  final String? churchId;

  const _Dashboard({this.churchId});

  @override
  State<_Dashboard> createState() => _DashboardState();
}

class _DashboardState extends State<_Dashboard> {
  PeopleScope _scope = PeopleScope.all;
  String? _gender;

  @override
  Widget build(BuildContext context) {
    final users = useUsers(context);
    final total = users.ofChurch(widget.churchId).length;
    final stats = PeopleStats.of(
      users.people(churchId: widget.churchId, scope: _scope, gender: _gender),
    );

    return RefreshIndicator(
      onRefresh: users.load,
      child: ListView(
        physics: const AlwaysScrollableScrollPhysics(),
        padding: const EdgeInsets.fromLTRB(16, 12, 16, 32),
        children: [
          FadeSlideIn(child: _TotalCard(total: total)),
          const SizedBox(height: 16),
          PeopleFilterBar(
            scope: _scope,
            gender: _gender,
            onChanged: (scope, gender) => setState(() {
              _scope = scope;
              _gender = gender;
            }),
          ),
          const SizedBox(height: 16),
          StatGrid(peopleCounts(stats)),
          const SizedBox(height: 28),
          StatsSection(
            title: 'Cargo eclesiástico',
            icon: Icons.workspace_premium_outlined,
            child: StatGrid(
              ecclesiasticalCounts(stats),
              columns: 3,
              dense: true,
            ),
          ),
          const SizedBox(height: 28),
          StatsSection(
            title: 'Faixa etária',
            icon: Icons.pie_chart_outline,
            child: Card(
              margin: EdgeInsets.zero,
              child: Padding(
                padding: const EdgeInsets.all(16),
                child: AgePieChart(stats: stats),
              ),
            ),
          ),
          const SizedBox(height: 28),
          MemberGrowth(
            key: ValueKey(widget.churchId),
            churchId: widget.churchId,
          ),
        ],
      ),
    );
  }
}

/// Destaque com o total, no degradê do modo.
class _TotalCard extends StatelessWidget {
  final int total;

  const _TotalCard({required this.total});

  @override
  Widget build(BuildContext context) {
    final effects = AppEffects.of(context);
    final text = Theme.of(context).textTheme;

    return Container(
      padding: const EdgeInsets.all(24),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(24),
        border: Border.all(color: effects.glassBorder),
        gradient: LinearGradient(
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
          colors: effects.backgroundGradient,
        ),
      ),
      child: Row(
        children: [
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text('Pessoas cadastradas', style: text.titleMedium),
                CountUpText(
                  total,
                  style: text.displayMedium?.copyWith(
                    fontWeight: FontWeight.w800,
                  ),
                ),
              ],
            ),
          ),
          const Icon(Icons.groups_outlined, size: 48),
        ],
      ),
    );
  }
}

/// Pesquisa + lista com etiquetas, facilitador e edição da integração.
class _MembersDetailed extends StatefulWidget {
  final String? churchId;

  const _MembersDetailed({super.key, this.churchId});

  @override
  State<_MembersDetailed> createState() => _MembersDetailedState();
}

class _MembersDetailedState extends State<_MembersDetailed> {
  String _query = '';

  @override
  Widget build(BuildContext context) {
    final results = useUsers(context).search(_query, churchId: widget.churchId);

    return Column(
      children: [
        Padding(
          padding: const EdgeInsets.fromLTRB(16, 12, 16, 4),
          child: TextField(
            onChanged: (value) => setState(() => _query = value),
            decoration: const InputDecoration(
              hintText: 'Pesquisar por nome ou telefone...',
              prefixIcon: Icon(Icons.search),
            ),
          ),
        ),
        Expanded(
          child: results.isEmpty
              ? const EmptyState(
                  icon: Icons.person_search,
                  message: 'Nenhum usuário encontrado',
                )
              : ListView(
                  padding: const EdgeInsets.fromLTRB(16, 12, 16, 32),
                  children: [
                    for (final user in results) ...[
                      UserTile(
                        user: user,
                        subtitle: Wrap(
                          spacing: 8,
                          runSpacing: 8,
                          children: [
                            UserChips(user: user),
                            Tag(
                              user.facilitator ?? 'Sem facilitador',
                              icon: Icons.support_agent,
                            ),
                          ],
                        ),
                        onTap: () => UserDetailDialog.show(context, user),
                        trailing: IconButton(
                          tooltip: 'Editar integração',
                          icon: const Icon(Icons.edit_outlined),
                          onPressed: () =>
                              UserIntegrationDialog.show(context, user),
                        ),
                      ),
                      const SizedBox(height: 12),
                    ],
                  ],
                ),
        ),
      ],
    );
  }
}
