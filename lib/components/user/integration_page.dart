import 'package:flutter/material.dart';
import 'package:raraapp/components/church/church_filter.dart';
import 'package:raraapp/components/shared/effects/fade_slide_in.dart';
import 'package:raraapp/components/shared/empty_state.dart';
import 'package:raraapp/components/shared/tabbed_page.dart';
import 'package:raraapp/components/shared/tag.dart';
import 'package:raraapp/components/theme/app_effects.dart';
import 'package:raraapp/components/user/facilitator_user_form.dart';
import 'package:raraapp/components/user/member_growth.dart';
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

/// Membros Super Intendente Geral: o mesmo da Liderança, de todas as igrejas
/// ou da igreja escolhida no filtro.
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
      child: Column(
        children: [
          Padding(
            padding: const EdgeInsets.fromLTRB(16, 16, 16, 0),
            child: ChurchFilter(
              value: _churchId,
              onChanged: (id) => setState(() => _churchId = id),
            ),
          ),
          Expanded(child: _MembersTabs(churchId: _churchId)),
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

/// Números dos usuários da igreja [churchId] (`null` = todas).
class _Dashboard extends StatelessWidget {
  final String? churchId;

  const _Dashboard({this.churchId});

  @override
  Widget build(BuildContext context) {
    final users = useUsers(context);
    final list = users.ofChurch(churchId);
    final total = list.length;
    final members = list.where((u) => u.member).length;
    final baptized = list.where((u) => u.baptized).length;
    final stats = [
      ('Não Membros', total - members, Icons.person_outline),
      ('Membros', members, Icons.verified_user_outlined),
      ('Batizados', baptized, Icons.water_drop_outlined),
      ('Não Batizados', total - baptized, Icons.water_drop),
    ];

    return RefreshIndicator(
      onRefresh: users.load,
      child: ListView(
        physics: const AlwaysScrollableScrollPhysics(),
        padding: const EdgeInsets.fromLTRB(16, 12, 16, 32),
        children: [
          FadeSlideIn(child: _TotalCard(total: total)),
          const SizedBox(height: 12),
          GridView.count(
            crossAxisCount: 2,
            shrinkWrap: true,
            physics: const NeverScrollableScrollPhysics(),
            mainAxisSpacing: 12,
            crossAxisSpacing: 12,
            childAspectRatio: 1.1,
            children: [
              for (final (i, (label, value, icon)) in stats.indexed)
                FadeSlideIn(
                  delay: stagger(i + 1, stepMs: 70),
                  child: _StatCard(label, value, icon),
                ),
            ],
          ),
          const SizedBox(height: 28),
          MemberGrowth(key: ValueKey(churchId), churchId: churchId),
        ],
      ),
    );
  }
}

/// Número que "conta" de 0 até [value] (CSS/JS: counter animation).
class _CountUp extends StatelessWidget {
  final int value;
  final TextStyle? style;

  const _CountUp(this.value, {this.style});

  @override
  Widget build(BuildContext context) {
    return TweenAnimationBuilder<double>(
      tween: Tween(begin: 0, end: value.toDouble()),
      duration: MediaQuery.of(context).disableAnimations
          ? Duration.zero
          : const Duration(milliseconds: 900),
      curve: Curves.easeOutCubic,
      builder: (context, v, _) => Text('${v.round()}', style: style),
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
                _CountUp(
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

class _StatCard extends StatelessWidget {
  final String label;
  final int value;
  final IconData icon;

  const _StatCard(this.label, this.value, this.icon);

  @override
  Widget build(BuildContext context) {
    final scheme = Theme.of(context).colorScheme;
    final text = Theme.of(context).textTheme;

    return Card(
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Container(
              padding: const EdgeInsets.all(8),
              decoration: BoxDecoration(
                color: scheme.primary.withValues(alpha: 0.14),
                borderRadius: BorderRadius.circular(10),
              ),
              child: Icon(icon, color: scheme.primary, size: 20),
            ),
            const Spacer(),
            FittedBox(
              child: _CountUp(
                value,
                style: text.headlineMedium?.copyWith(
                  fontWeight: FontWeight.w800,
                ),
              ),
            ),
            Text(
              label,
              maxLines: 2,
              overflow: TextOverflow.ellipsis,
              style: TextStyle(color: scheme.onSurface.withValues(alpha: 0.75)),
            ),
          ],
        ),
      ),
    );
  }
}

/// Pesquisa + lista com etiquetas, facilitador e edição da integração.
class _MembersDetailed extends StatefulWidget {
  final String? churchId;

  const _MembersDetailed({this.churchId});

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
