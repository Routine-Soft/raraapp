import 'package:flutter/material.dart';
import 'package:raraapp/api/church_api.dart';
import 'package:raraapp/components/dizimo_oferta/contribution_labels.dart';
import 'package:raraapp/components/shared/effects/fade_slide_in.dart';
import 'package:raraapp/components/theme/app_effects.dart';
import 'package:raraapp/components/user/member_growth.dart';
import 'package:raraapp/components/user/people_stats.dart';
import 'package:raraapp/hooks/use_churches.dart';
import 'package:raraapp/hooks/use_users.dart';

/// Dashboard do Super Intendente Geral: o card supremo (todas as igrejas
/// juntas) e, embaixo, um card por igreja. O filtro vale para todos.
class GeneralDashboard extends StatefulWidget {
  const GeneralDashboard({super.key});

  @override
  State<GeneralDashboard> createState() => _GeneralDashboardState();
}

class _GeneralDashboardState extends State<GeneralDashboard> {
  PeopleScope _scope = PeopleScope.all;
  String? _gender;

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback(
      (_) => useChurches(context, listen: false).ensureLoaded(),
    );
  }

  @override
  Widget build(BuildContext context) {
    final users = useUsers(context);
    final churches = [...useChurches(context).churches]
      ..sort((a, b) => a.name.compareTo(b.name));
    PeopleStats statsOf(String? churchId) => PeopleStats.of(
      users.people(churchId: churchId, scope: _scope, gender: _gender),
    );

    // "Novos membros" do mês anterior (o mês que já fechou)
    final now = DateTime.now();
    final previous = DateTime(now.year, now.month - 1);

    return RefreshIndicator(
      onRefresh: users.load,
      child: ListView(
        physics: const AlwaysScrollableScrollPhysics(),
        padding: const EdgeInsets.fromLTRB(16, 12, 16, 32),
        children: [
          PeopleFilterBar(
            scope: _scope,
            gender: _gender,
            onChanged: (scope, gender) => setState(() {
              _scope = scope;
              _gender = gender;
            }),
          ),
          const SizedBox(height: 16),
          FadeSlideIn(
            child: _SupremeCard(
              stats: statsOf(null),
              churchCount: churches.length,
            ),
          ),
          const SizedBox(height: 28),
          Text(
            'Por igreja',
            style: Theme.of(
              context,
            ).textTheme.titleLarge?.copyWith(fontWeight: FontWeight.w800),
          ),
          const SizedBox(height: 12),
          for (final (i, church) in churches.indexed) ...[
            FadeSlideIn(
              delay: stagger(i.clamp(0, 8) + 1, stepMs: 60),
              child: _ChurchCard(
                church: church,
                stats: statsOf(church.id),
                newMembers: users
                    .newMembers(
                      previous.year,
                      previous.month,
                      churchId: church.id,
                    )
                    .length,
                previousMonth: previous,
              ),
            ),
            const SizedBox(height: 12),
          ],
        ],
      ),
    );
  }
}

/// Visão geral: todas as igrejas juntas.
class _SupremeCard extends StatelessWidget {
  final PeopleStats stats;
  final int churchCount;

  const _SupremeCard({required this.stats, required this.churchCount});

  @override
  Widget build(BuildContext context) {
    final effects = AppEffects.of(context);
    final text = Theme.of(context).textTheme;

    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(24),
        border: Border.all(color: effects.glassBorder),
        gradient: LinearGradient(
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
          colors: effects.backgroundGradient,
        ),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          Row(
            children: [
              const Icon(Icons.public, size: 28),
              const SizedBox(width: 10),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'Visão geral',
                      style: text.titleLarge?.copyWith(
                        fontWeight: FontWeight.w800,
                      ),
                    ),
                    Text('Todas as $churchCount igrejas juntas'),
                  ],
                ),
              ),
            ],
          ),
          const SizedBox(height: 16),
          StatGrid(
            peopleCounts(stats, withTotal: true),
            columns: 3,
            dense: true,
          ),
          const SizedBox(height: 24),
          StatsSection(
            title: 'Cargo eclesiástico',
            icon: Icons.workspace_premium_outlined,
            child: StatGrid(
              ecclesiasticalCounts(stats),
              columns: 3,
              dense: true,
            ),
          ),
          const SizedBox(height: 24),
          StatsSection(
            title: 'Faixa etária',
            icon: Icons.pie_chart_outline,
            child: AgePieChart(stats: stats),
          ),
          const SizedBox(height: 24),
          // Novos membros de todas as igrejas, com o filtro de mês e ano
          const MemberGrowth(),
        ],
      ),
    );
  }
}

/// Uma igreja: números principais sempre à vista; o botão embaixo abre
/// cargos e faixa etária.
class _ChurchCard extends StatefulWidget {
  final Church church;
  final PeopleStats stats;
  final int newMembers;
  final DateTime previousMonth;

  const _ChurchCard({
    required this.church,
    required this.stats,
    required this.newMembers,
    required this.previousMonth,
  });

  @override
  State<_ChurchCard> createState() => _ChurchCardState();
}

class _ChurchCardState extends State<_ChurchCard> {
  bool _open = false;

  @override
  Widget build(BuildContext context) {
    final scheme = Theme.of(context).colorScheme;
    final text = Theme.of(context).textTheme;
    final stats = widget.stats;

    return Card(
      margin: EdgeInsets.zero,
      child: Padding(
        padding: const EdgeInsets.fromLTRB(16, 16, 16, 8),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Row(
              children: [
                Icon(Icons.church_outlined, color: scheme.primary),
                const SizedBox(width: 10),
                Expanded(
                  child: Text(
                    widget.church.name,
                    style: text.titleMedium?.copyWith(
                      fontWeight: FontWeight.w800,
                    ),
                  ),
                ),
              ],
            ),
            const SizedBox(height: 12),
            StatGrid(
              peopleCounts(stats, withTotal: true),
              columns: 3,
              dense: true,
            ),
            const SizedBox(height: 10),
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
              decoration: BoxDecoration(
                color: scheme.primary.withValues(alpha: 0.12),
                borderRadius: BorderRadius.circular(12),
              ),
              child: Row(
                children: [
                  Icon(Icons.person_add_alt_1, color: scheme.primary),
                  const SizedBox(width: 10),
                  Expanded(
                    child: Text(
                      'Novos membros em '
                      '${monthName(widget.previousMonth.month).toLowerCase()}',
                    ),
                  ),
                  Text(
                    '${widget.newMembers}',
                    style: text.titleMedium?.copyWith(
                      fontWeight: FontWeight.w800,
                    ),
                  ),
                ],
              ),
            ),
            AnimatedSize(
              duration: const Duration(milliseconds: 300),
              curve: Curves.easeOutCubic,
              alignment: Alignment.topCenter,
              child: _open
                  ? Padding(
                      padding: const EdgeInsets.only(top: 20),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.stretch,
                        children: [
                          StatsSection(
                            title: 'Cargo eclesiástico',
                            icon: Icons.workspace_premium_outlined,
                            child: StatGrid(
                              ecclesiasticalCounts(stats),
                              columns: 3,
                              dense: true,
                            ),
                          ),
                          const SizedBox(height: 20),
                          StatsSection(
                            title: 'Faixa etária',
                            icon: Icons.pie_chart_outline,
                            child: AgePieChart(stats: stats, size: 130),
                          ),
                        ],
                      ),
                    )
                  : const SizedBox(width: double.infinity),
            ),
            TextButton.icon(
              onPressed: () => setState(() => _open = !_open),
              icon: Icon(_open ? Icons.expand_less : Icons.expand_more),
              label: Text(_open ? 'Ver menos' : 'Ver cargos e faixa etária'),
            ),
          ],
        ),
      ),
    );
  }
}
