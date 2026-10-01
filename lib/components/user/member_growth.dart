import 'package:flutter/material.dart';
import 'package:raraapp/components/dizimo_oferta/contribution_labels.dart';
import 'package:raraapp/components/shared/effects/fade_slide_in.dart';
import 'package:raraapp/components/shared/format.dart';
import 'package:raraapp/components/shared/section.dart';
import 'package:raraapp/components/theme/app_effects.dart';
import 'package:raraapp/components/user/user_chips.dart';
import 'package:raraapp/hooks/use_users.dart';

/// Novos membros por mês: filtro de ano e mês, total acumulado, gráfico,
/// um card por mês e, com um mês escolhido, quem virou membro nele.
class MemberGrowth extends StatefulWidget {
  /// Igreja considerada (`null` = todas).
  final String? churchId;

  const MemberGrowth({super.key, this.churchId});

  @override
  State<MemberGrowth> createState() => _MemberGrowthState();
}

class _MemberGrowthState extends State<MemberGrowth> {
  int _year = DateTime.now().year;

  /// 1..12, ou null = o ano todo.
  int? _month;

  void _toggleMonth(int month) =>
      setState(() => _month = _month == month ? null : month);

  @override
  Widget build(BuildContext context) {
    final users = useUsers(context);
    final growth = users.memberGrowth(_year, churchId: widget.churchId);
    final months = growth.months;
    final text = Theme.of(context).textTheme;
    final scheme = Theme.of(context).colorScheme;

    final joined = _month == null
        ? months.fold(0, (sum, m) => sum + m.joined)
        : months[_month! - 1].joined;
    final accumulated = months[(_month ?? 12) - 1].accumulated;
    final periodLabel = _month == null
        ? 'em $_year'
        : 'em ${monthLabel(DateTime(_year, _month!))}';

    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        const SectionTitle('Novos membros', icon: Icons.trending_up),
        const SizedBox(height: 12),
        _YearNavigator(
          year: _year,
          onChanged: (y) => setState(() => _year = y),
        ),
        const SizedBox(height: 8),
        DropdownButtonFormField<int?>(
          key: ValueKey(_month),
          initialValue: _month,
          isExpanded: true,
          decoration: const InputDecoration(
            labelText: 'Mês',
            prefixIcon: Icon(Icons.calendar_view_month),
          ),
          items: [
            const DropdownMenuItem(value: null, child: Text('Todos os meses')),
            for (var m = 1; m <= 12; m++)
              DropdownMenuItem(value: m, child: Text(monthName(m))),
          ],
          onChanged: (m) => setState(() => _month = m),
        ),
        const SizedBox(height: 16),
        FadeSlideIn(
          child: _AccumulatedCard(
            accumulated: accumulated,
            joined: joined,
            periodLabel: periodLabel,
            untilLabel: _month == null
                ? 'até o fim de $_year'
                : 'até o fim de ${monthLabel(DateTime(_year, _month!))}',
          ),
        ),
        if (growth.undated > 0) ...[
          const SizedBox(height: 8),
          Text(
            '${growth.undated} membro(s) sem data de entrada (anteriores ao '
            'registro da data) entram só no acumulado.',
            style: text.bodySmall?.copyWith(
              color: scheme.onSurface.withValues(alpha: 0.7),
            ),
          ),
        ],
        const SizedBox(height: 16),
        _GrowthChart(
          joined: [for (final m in months) m.joined],
          selected: _month,
          onTap: _toggleMonth,
        ),
        const SizedBox(height: 16),
        GridView.count(
          crossAxisCount: 2,
          shrinkWrap: true,
          physics: const NeverScrollableScrollPhysics(),
          mainAxisSpacing: 12,
          crossAxisSpacing: 12,
          childAspectRatio: 1.5,
          children: [
            for (var m = 1; m <= 12; m++)
              _MonthCard(
                month: m,
                joined: months[m - 1].joined,
                accumulated: months[m - 1].accumulated,
                selected: _month == m,
                future: DateTime(_year, m).isAfter(DateTime.now()),
                onTap: () => _toggleMonth(m),
              ),
          ],
        ),
        if (_month != null) ...[
          const SizedBox(height: 24),
          SectionTitle(
            'Viraram membros em ${monthLabel(DateTime(_year, _month!))}',
            icon: Icons.how_to_reg_outlined,
          ),
          const SizedBox(height: 12),
          _NewMembersList(
            year: _year,
            month: _month!,
            churchId: widget.churchId,
          ),
        ],
      ],
    );
  }
}

/// ‹ 2026 ›
class _YearNavigator extends StatelessWidget {
  final int year;
  final ValueChanged<int> onChanged;

  const _YearNavigator({required this.year, required this.onChanged});

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        IconButton.outlined(
          tooltip: 'Ano anterior',
          onPressed: () => onChanged(year - 1),
          icon: const Icon(Icons.chevron_left),
        ),
        Expanded(
          child: Row(
            mainAxisAlignment: MainAxisAlignment.center,
            spacing: 8,
            children: [
              const Icon(Icons.calendar_month, size: 20),
              Text(
                '$year',
                style: Theme.of(
                  context,
                ).textTheme.titleMedium?.copyWith(fontWeight: FontWeight.w800),
              ),
            ],
          ),
        ),
        IconButton.outlined(
          tooltip: 'Próximo ano',
          onPressed: () => onChanged(year + 1),
          icon: const Icon(Icons.chevron_right),
        ),
      ],
    );
  }
}

/// Destaque: total de membros acumulado e quantos entraram no período.
class _AccumulatedCard extends StatelessWidget {
  final int accumulated;
  final int joined;
  final String periodLabel;
  final String untilLabel;

  const _AccumulatedCard({
    required this.accumulated,
    required this.joined,
    required this.periodLabel,
    required this.untilLabel,
  });

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
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text('Total de membros acumulado', style: text.titleMedium),
          Text(
            '$accumulated',
            style: text.displayMedium?.copyWith(fontWeight: FontWeight.w800),
          ),
          Text(untilLabel),
          const SizedBox(height: 12),
          Text(
            '+$joined novo(s) membro(s) $periodLabel',
            style: text.titleSmall?.copyWith(fontWeight: FontWeight.w700),
          ),
        ],
      ),
    );
  }
}

/// Barras de novos membros por mês (mesmo estilo do gráfico do financeiro).
class _GrowthChart extends StatelessWidget {
  final List<int> joined;
  final int? selected;
  final ValueChanged<int> onTap;

  const _GrowthChart({
    required this.joined,
    required this.selected,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    final scheme = Theme.of(context).colorScheme;
    final text = Theme.of(context).textTheme;
    final max = joined.fold(0, (a, b) => a > b ? a : b);

    return Card(
      child: Padding(
        padding: const EdgeInsets.fromLTRB(12, 16, 12, 12),
        child: Column(
          spacing: 8,
          children: [
            SizedBox(
              height: 140,
              child: Row(
                crossAxisAlignment: CrossAxisAlignment.end,
                children: [
                  for (var m = 1; m <= 12; m++)
                    Expanded(
                      child: GestureDetector(
                        onTap: () => onTap(m),
                        behavior: HitTestBehavior.opaque,
                        child: Padding(
                          padding: const EdgeInsets.symmetric(horizontal: 3),
                          child: _Bar(
                            value: joined[m - 1],
                            max: max,
                            dimmed: selected != null && selected != m,
                            tooltip: '${shortMonth(m)}: ${joined[m - 1]}',
                          ),
                        ),
                      ),
                    ),
                ],
              ),
            ),
            Row(
              children: [
                for (var m = 1; m <= 12; m++)
                  Expanded(
                    child: Text(
                      shortMonth(m)[0],
                      textAlign: TextAlign.center,
                      style: text.labelSmall?.copyWith(
                        fontWeight: selected == m ? FontWeight.w800 : null,
                        color: selected == m ? scheme.primary : null,
                      ),
                    ),
                  ),
              ],
            ),
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              spacing: 6,
              children: [
                Container(
                  width: 12,
                  height: 12,
                  decoration: BoxDecoration(
                    color: scheme.primary,
                    borderRadius: BorderRadius.circular(3),
                  ),
                ),
                const Text('Novos membros'),
              ],
            ),
          ],
        ),
      ),
    );
  }
}

class _Bar extends StatelessWidget {
  final int value;
  final int max;
  final bool dimmed;
  final String tooltip;

  const _Bar({
    required this.value,
    required this.max,
    required this.dimmed,
    required this.tooltip,
  });

  @override
  Widget build(BuildContext context) {
    final scheme = Theme.of(context).colorScheme;
    return Tooltip(
      message: tooltip,
      child: TweenAnimationBuilder<double>(
        tween: Tween(begin: 0, end: 1),
        duration: MediaQuery.of(context).disableAnimations
            ? Duration.zero
            : const Duration(milliseconds: 800),
        curve: Curves.easeOutCubic,
        builder: (context, t, _) => LayoutBuilder(
          builder: (context, c) => Column(
            mainAxisAlignment: MainAxisAlignment.end,
            children: [
              if (value > 0)
                Text('$value', style: Theme.of(context).textTheme.labelSmall),
              AnimatedContainer(
                duration: const Duration(milliseconds: 200),
                height: max == 0 ? 0 : (c.maxHeight - 18) * value / max * t,
                decoration: BoxDecoration(
                  color: scheme.primary.withValues(alpha: dimmed ? 0.3 : 1),
                  borderRadius: const BorderRadius.vertical(
                    top: Radius.circular(3),
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

/// Card do mês: quantos entraram e o total no fim do mês.
class _MonthCard extends StatelessWidget {
  final int month;
  final int joined;
  final int accumulated;
  final bool selected;
  final bool future;
  final VoidCallback onTap;

  const _MonthCard({
    required this.month,
    required this.joined,
    required this.accumulated,
    required this.selected,
    required this.future,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    final scheme = Theme.of(context).colorScheme;
    final text = Theme.of(context).textTheme;
    final muted = scheme.onSurface.withValues(alpha: 0.7);

    return Opacity(
      opacity: future ? 0.45 : 1,
      child: Card(
        clipBehavior: Clip.antiAlias,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(18),
          side: BorderSide(
            color: selected ? scheme.primary : Colors.transparent,
            width: 2,
          ),
        ),
        child: InkWell(
          onTap: onTap,
          child: Padding(
            padding: const EdgeInsets.all(14),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  monthName(month),
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
                  style: text.titleSmall?.copyWith(fontWeight: FontWeight.w700),
                ),
                const Spacer(),
                FittedBox(
                  child: Text(
                    '+$joined',
                    style: text.headlineSmall?.copyWith(
                      fontWeight: FontWeight.w800,
                      color: joined > 0 ? scheme.primary : null,
                    ),
                  ),
                ),
                Text(
                  'Acumulado: $accumulated',
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
                  style: TextStyle(color: muted),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

/// Pessoas que viraram membro no mês escolhido.
class _NewMembersList extends StatelessWidget {
  final int year;
  final int month;
  final String? churchId;

  const _NewMembersList({
    required this.year,
    required this.month,
    required this.churchId,
  });

  @override
  Widget build(BuildContext context) {
    final list = useUsers(context).newMembers(year, month, churchId: churchId);
    if (list.isEmpty) {
      return Text(
        'Ninguém virou membro neste mês.',
        style: TextStyle(
          color: Theme.of(context).colorScheme.onSurface.withValues(alpha: 0.7),
        ),
      );
    }
    return Column(
      spacing: 10,
      children: [
        for (final user in list)
          UserTile(
            user: user,
            subtitle: Text('Membro desde ${formatDate(user.memberSince)}'),
          ),
      ],
    );
  }
}
