import 'package:flutter/material.dart';
import 'package:raraapp/api/dizimo_oferta_api.dart';
import 'package:raraapp/components/church/church_filter.dart';
import 'package:raraapp/components/dizimo_oferta/contribution_labels.dart';
import 'package:raraapp/components/dizimo_oferta/manual_contribution_dialog.dart';
import 'package:raraapp/components/shared/effects/fade_slide_in.dart';
import 'package:raraapp/components/shared/empty_state.dart';
import 'package:raraapp/components/shared/entity_card.dart';
import 'package:raraapp/components/shared/feedback.dart';
import 'package:raraapp/components/shared/format.dart';
import 'package:raraapp/components/shared/list_page.dart';
import 'package:raraapp/components/shared/money.dart';
import 'package:raraapp/components/shared/section.dart';
import 'package:raraapp/components/shared/tag.dart';
import 'package:raraapp/components/theme/app_effects.dart';
import 'package:raraapp/hooks/use_auth.dart';
import 'package:raraapp/hooks/use_treasury.dart';

/// Relatório financeiro: filtro diário/mensal/anual, totais de dízimo e
/// oferta, por forma de pagamento e evolução.
///
/// - Financeiro Liderança: só a própria igreja, com lançamentos e "Registrar".
/// - Financeiro Super Intendente Geral ([allChurches]): todas as igrejas com
///   filtro por igreja, só o relatório.
class TreasuryPage extends StatefulWidget {
  final bool allChurches;

  const TreasuryPage({super.key, this.allChurches = false});

  @override
  State<TreasuryPage> createState() => _TreasuryPageState();
}

class _TreasuryPageState extends State<TreasuryPage> {
  @override
  void initState() {
    super.initState();
    // Sem notificar: o primeiro frame já sai sem o relatório da outra visão
    useTreasury(context, listen: false).configure(
      allChurches: widget.allChurches,
      ownChurchId: useAuth(context, listen: false).user?.churchId,
    );
    WidgetsBinding.instance.addPostFrameCallback(
      (_) => useTreasury(context, listen: false).load(),
    );
  }

  Future<void> _delete(Contribution c) async {
    if (!await confirmDelete(
      context,
      title: 'Apagar lançamento',
      itemName: '${c.personName} — ${formatMoney(c.total)}',
    )) {
      return;
    }
    if (!mounted) return;
    final treasury = useTreasury(context, listen: false);
    final ok = await treasury.remove(c.id);
    if (!mounted) return;
    showResult(
      context,
      ok: ok,
      success: 'Lançamento apagado',
      error: treasury.error,
    );
  }

  @override
  Widget build(BuildContext context) {
    final treasury = useTreasury(context);
    final report = treasury.report;
    final all = widget.allChurches;

    // Sem igreja no perfil o backend não tem o que filtrar
    if (!all && useAuth(context).user?.churchId == null) {
      return const EmptyState(
        icon: Icons.church_outlined,
        message: 'Cadastre sua igreja em Minha Conta para ver o financeiro',
      );
    }

    return Scaffold(
      backgroundColor: Colors.transparent,
      floatingActionButton: all
          ? null
          : FloatingActionButton.extended(
              onPressed: () => ManualContributionDialog.show(context),
              icon: const Icon(Icons.add),
              label: const Text('Registrar'),
            ),
      body: RefreshIndicator(
        onRefresh: treasury.load,
        child: ListView(
          physics: const AlwaysScrollableScrollPhysics(),
          padding: const EdgeInsets.fromLTRB(16, 16, 16, 100),
          children: [
            SegmentedButton<ReportPeriod>(
              showSelectedIcon: false,
              segments: const [
                ButtonSegment(value: ReportPeriod.day, label: Text('Diário')),
                ButtonSegment(value: ReportPeriod.month, label: Text('Mensal')),
                ButtonSegment(value: ReportPeriod.year, label: Text('Anual')),
              ],
              selected: {treasury.period},
              onSelectionChanged: (v) => treasury.setPeriod(v.first),
            ),
            const SizedBox(height: 8),
            const _PeriodNavigator(),
            if (all) ...[
              const SizedBox(height: 8),
              ChurchFilter(
                value: treasury.churchId,
                onChanged: treasury.setChurch,
              ),
            ],
            const SizedBox(height: 16),
            if (report == null && treasury.isLoading)
              const CardSkeleton()
            else if (report == null)
              EmptyState(
                icon: Icons.error_outline,
                message: treasury.error ?? 'Não foi possível carregar',
              )
            else ...[
              FadeSlideIn(child: _TotalCard(report: report)),
              const SizedBox(height: 12),
              FadeSlideIn(
                delay: stagger(1),
                child: Row(
                  spacing: 12,
                  children: [
                    Expanded(
                      child: _StatCard(
                        label: 'Dízimos',
                        value: report.tithe,
                        icon: Icons.volunteer_activism_outlined,
                      ),
                    ),
                    Expanded(
                      child: _StatCard(
                        label: 'Ofertas',
                        value: report.offering,
                        icon: Icons.card_giftcard,
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 24),
              const SectionTitle(
                'Por forma de pagamento',
                icon: Icons.account_balance_wallet_outlined,
              ),
              const SizedBox(height: 12),
              FadeSlideIn(
                delay: stagger(2),
                child: _Breakdown(
                  total: report.total,
                  rows: [
                    for (final m in contributionMethods)
                      (
                        methodLabels[m]!,
                        methodIcons[m]!,
                        report.byMethod[m] ?? 0,
                      ),
                  ],
                ),
              ),
              if (treasury.period != ReportPeriod.day &&
                  report.series.isNotEmpty) ...[
                const SizedBox(height: 24),
                SectionTitle(
                  treasury.period == ReportPeriod.year
                      ? 'Mês a mês'
                      : 'Dia a dia',
                  icon: Icons.bar_chart,
                ),
                const SizedBox(height: 12),
                _SeriesChart(report: report, period: treasury.period),
              ],
              const SizedBox(height: 24),
              const SectionTitle('Por origem', icon: Icons.source_outlined),
              const SizedBox(height: 12),
              Wrap(
                spacing: 8,
                runSpacing: 8,
                children: [
                  for (final s in ['app', 'tesouraria', 'membro'])
                    Tag(
                      '${sourceLabels[s]}: ${formatMoney(report.bySource[s] ?? 0)}',
                    ),
                ],
              ),
              if (!all) ...[
                const SizedBox(height: 24),
                SectionTitle(
                  'Lançamentos (${treasury.entries.length})',
                  icon: Icons.receipt_long,
                ),
                const SizedBox(height: 12),
                if (treasury.entries.isEmpty)
                  const EmptyState(
                    icon: Icons.receipt_long,
                    message: 'Nenhuma contribuição neste período',
                  )
                else
                  for (final c in treasury.entries) ...[
                    _EntryCard(contribution: c, onDelete: _delete),
                    const SizedBox(height: 10),
                  ],
              ],
            ],
          ],
        ),
      ),
    );
  }
}

/// ‹ Setembro de 2026 › — tocar no meio abre o calendário.
class _PeriodNavigator extends StatelessWidget {
  const _PeriodNavigator();

  String _label(ReportPeriod period, DateTime a) => switch (period) {
    ReportPeriod.day => formatDate(a),
    ReportPeriod.month => monthLabel(a),
    ReportPeriod.year => '${a.year}',
  };

  @override
  Widget build(BuildContext context) {
    final treasury = useTreasury(context);

    return Row(
      children: [
        IconButton.outlined(
          tooltip: 'Anterior',
          onPressed: () => treasury.shift(-1),
          icon: const Icon(Icons.chevron_left),
        ),
        Expanded(
          child: TextButton.icon(
            onPressed: () async {
              final picked = await showDatePicker(
                context: context,
                initialDate: treasury.anchor,
                firstDate: DateTime(2000),
                lastDate: DateTime(2100),
                initialDatePickerMode: treasury.period == ReportPeriod.year
                    ? DatePickerMode.year
                    : DatePickerMode.day,
              );
              if (picked != null) treasury.setAnchor(picked);
            },
            icon: const Icon(Icons.calendar_month),
            label: Text(
              _label(treasury.period, treasury.anchor),
              style: Theme.of(
                context,
              ).textTheme.titleMedium?.copyWith(fontWeight: FontWeight.w800),
            ),
          ),
        ),
        IconButton.outlined(
          tooltip: 'Próximo',
          onPressed: () => treasury.shift(1),
          icon: const Icon(Icons.chevron_right),
        ),
      ],
    );
  }
}

/// Número que conta de 0 até o valor (CSS/JS: counter animation).
class _CountUpMoney extends StatelessWidget {
  final double value;
  final TextStyle? style;

  const _CountUpMoney(this.value, {this.style});

  @override
  Widget build(BuildContext context) {
    return TweenAnimationBuilder<double>(
      tween: Tween(begin: 0, end: value),
      duration: MediaQuery.of(context).disableAnimations
          ? Duration.zero
          : const Duration(milliseconds: 900),
      curve: Curves.easeOutCubic,
      builder: (context, v, _) => FittedBox(
        fit: BoxFit.scaleDown,
        alignment: Alignment.centerLeft,
        child: Text(formatMoney(v), style: style),
      ),
    );
  }
}

class _TotalCard extends StatelessWidget {
  final FinanceReport report;

  const _TotalCard({required this.report});

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
          Text('Total arrecadado', style: text.titleMedium),
          _CountUpMoney(
            report.total,
            style: text.displaySmall?.copyWith(fontWeight: FontWeight.w800),
          ),
          Text('${report.count} contribuição(ões)', style: text.bodyMedium),
        ],
      ),
    );
  }
}

class _StatCard extends StatelessWidget {
  final String label;
  final double value;
  final IconData icon;

  const _StatCard({
    required this.label,
    required this.value,
    required this.icon,
  });

  @override
  Widget build(BuildContext context) {
    final scheme = Theme.of(context).colorScheme;
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          spacing: 8,
          children: [
            Icon(icon, color: scheme.primary),
            _CountUpMoney(
              value,
              style: Theme.of(
                context,
              ).textTheme.titleLarge?.copyWith(fontWeight: FontWeight.w800),
            ),
            Text(
              label,
              style: TextStyle(color: scheme.onSurface.withValues(alpha: 0.75)),
            ),
          ],
        ),
      ),
    );
  }
}

/// Barras horizontais com valor e porcentagem (Pix / Dinheiro / Cartão).
class _Breakdown extends StatelessWidget {
  final double total;
  final List<(String, IconData, double)> rows;

  const _Breakdown({required this.total, required this.rows});

  @override
  Widget build(BuildContext context) {
    final text = Theme.of(context).textTheme;
    final muted = Theme.of(
      context,
    ).colorScheme.onSurface.withValues(alpha: 0.7);

    return Card(
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          spacing: 16,
          children: [
            for (final (label, icon, value) in rows)
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                spacing: 6,
                children: [
                  Row(
                    children: [
                      Icon(icon, size: 20),
                      const SizedBox(width: 8),
                      Expanded(
                        child: Text(
                          label,
                          style: const TextStyle(fontWeight: FontWeight.w700),
                        ),
                      ),
                      Text(
                        formatMoney(value),
                        style: const TextStyle(fontWeight: FontWeight.w800),
                      ),
                      SizedBox(
                        width: 48,
                        child: Text(
                          total == 0
                              ? '0%'
                              : '${(value / total * 100).round()}%',
                          textAlign: TextAlign.end,
                          style: text.bodySmall?.copyWith(color: muted),
                        ),
                      ),
                    ],
                  ),
                  TweenAnimationBuilder<double>(
                    tween: Tween(begin: 0, end: total == 0 ? 0 : value / total),
                    duration: MediaQuery.of(context).disableAnimations
                        ? Duration.zero
                        : const Duration(milliseconds: 900),
                    curve: Curves.easeOutCubic,
                    builder: (context, v, _) => LinearProgressIndicator(
                      value: v,
                      minHeight: 10,
                      borderRadius: BorderRadius.circular(999),
                    ),
                  ),
                ],
              ),
          ],
        ),
      ),
    );
  }
}

/// Gráfico de barras simples: dízimo + oferta empilhados por dia ou mês.
class _SeriesChart extends StatelessWidget {
  final FinanceReport report;
  final ReportPeriod period;

  const _SeriesChart({required this.report, required this.period});

  @override
  Widget build(BuildContext context) {
    final scheme = Theme.of(context).colorScheme;
    final text = Theme.of(context).textTheme;
    final byKey = {for (final s in report.series) s.key: s};

    // Todos os dias do mês (ou meses do ano), mesmo os sem contribuição
    final first = report.series.first.key;
    final year = int.parse(first.substring(0, 4));
    final keys = period == ReportPeriod.year
        ? [
            for (var m = 1; m <= 12; m++)
              '$year-${m.toString().padLeft(2, '0')}',
          ]
        : () {
            final month = int.parse(first.substring(5, 7));
            final days = DateTime(year, month + 1, 0).day;
            return [
              for (var d = 1; d <= days; d++)
                '${first.substring(0, 7)}-${d.toString().padLeft(2, '0')}',
            ];
          }();
    final max = report.series
        .map((s) => s.tithe + s.offering)
        .fold<double>(0, (a, b) => a > b ? a : b);

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
                  for (final key in keys)
                    Expanded(
                      child: Padding(
                        padding: const EdgeInsets.symmetric(horizontal: 1.5),
                        child: _Bar(
                          tithe: byKey[key]?.tithe ?? 0,
                          offering: byKey[key]?.offering ?? 0,
                          max: max,
                          tooltip:
                              '${period == ReportPeriod.year ? shortMonth(int.parse(key.substring(5))) : key.substring(8)}: '
                              '${formatMoney((byKey[key]?.tithe ?? 0) + (byKey[key]?.offering ?? 0))}',
                        ),
                      ),
                    ),
                ],
              ),
            ),
            Row(
              children: [
                for (final (i, key) in keys.indexed)
                  Expanded(
                    child: Text(
                      period == ReportPeriod.year
                          ? shortMonth(int.parse(key.substring(5)))[0]
                          : (i % 5 == 0 ? key.substring(8) : ''),
                      textAlign: TextAlign.center,
                      style: text.labelSmall,
                      // colunas finas (31 dias): o número "vaza" para os lados
                      softWrap: false,
                      overflow: TextOverflow.visible,
                    ),
                  ),
              ],
            ),
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              spacing: 16,
              children: [
                _Legend(color: scheme.primary, label: 'Dízimo'),
                _Legend(
                  color: scheme.primary.withValues(alpha: 0.4),
                  label: 'Oferta',
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}

class _Bar extends StatelessWidget {
  final double tithe;
  final double offering;
  final double max;
  final String tooltip;

  const _Bar({
    required this.tithe,
    required this.offering,
    required this.max,
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
          builder: (context, c) {
            double h(double v) => max == 0 ? 0 : c.maxHeight * v / max * t;
            return Column(
              mainAxisAlignment: MainAxisAlignment.end,
              children: [
                Container(
                  height: h(offering),
                  decoration: BoxDecoration(
                    color: scheme.primary.withValues(alpha: 0.4),
                    borderRadius: const BorderRadius.vertical(
                      top: Radius.circular(3),
                    ),
                  ),
                ),
                Container(height: h(tithe), color: scheme.primary),
              ],
            );
          },
        ),
      ),
    );
  }
}

class _Legend extends StatelessWidget {
  final Color color;
  final String label;

  const _Legend({required this.color, required this.label});

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisSize: MainAxisSize.min,
      children: [
        Container(
          width: 12,
          height: 12,
          decoration: BoxDecoration(
            color: color,
            borderRadius: BorderRadius.circular(3),
          ),
        ),
        const SizedBox(width: 6),
        Text(label),
      ],
    );
  }
}

/// Um lançamento: pessoa, valores, forma, origem.
class _EntryCard extends StatelessWidget {
  final Contribution contribution;
  final ValueChanged<Contribution> onDelete;

  const _EntryCard({required this.contribution, required this.onDelete});

  @override
  Widget build(BuildContext context) {
    final c = contribution;
    final text = Theme.of(context).textTheme;

    return Card(
      child: Padding(
        padding: const EdgeInsets.fromLTRB(16, 12, 4, 12),
        child: Row(
          children: [
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                spacing: 6,
                children: [
                  Row(
                    children: [
                      Expanded(
                        child: Text(
                          c.personName,
                          style: text.titleSmall?.copyWith(
                            fontWeight: FontWeight.w700,
                          ),
                        ),
                      ),
                      Text(
                        formatMoney(c.total),
                        style: text.titleSmall?.copyWith(
                          fontWeight: FontWeight.w800,
                        ),
                      ),
                    ],
                  ),
                  Text(amountsLabel(c), style: text.bodySmall),
                  Wrap(
                    spacing: 6,
                    runSpacing: 6,
                    children: [
                      Tag(formatDate(c.date.toLocal()), icon: Icons.event),
                      if (c.isPending)
                        const Tag(
                          'Aguardando pagamento',
                          icon: Icons.hourglass_top,
                        )
                      else if (c.method != null)
                        Tag(
                          methodLabels[c.method]!,
                          icon: methodIcons[c.method],
                        ),
                      Tag(sourceLabels[c.source] ?? c.source),
                    ],
                  ),
                ],
              ),
            ),
            if (c.source != 'app')
              ItemMenu(onDelete: () => onDelete(c))
            else
              const SizedBox(width: 12),
          ],
        ),
      ),
    );
  }
}
