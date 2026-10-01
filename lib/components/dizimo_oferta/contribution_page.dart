import 'package:flutter/material.dart';
import 'package:raraapp/api/dizimo_oferta_api.dart';
import 'package:raraapp/components/dizimo_oferta/contribution_labels.dart';
import 'package:raraapp/components/dizimo_oferta/declare_dialog.dart';
import 'package:raraapp/components/dizimo_oferta/give_sheet.dart';
import 'package:raraapp/components/shared/effects/fade_slide_in.dart';
import 'package:raraapp/components/shared/effects/glow_button.dart';
import 'package:raraapp/components/shared/empty_state.dart';
import 'package:raraapp/components/shared/entity_card.dart';
import 'package:raraapp/components/shared/feedback.dart';
import 'package:raraapp/components/shared/format.dart';
import 'package:raraapp/components/shared/list_page.dart';
import 'package:raraapp/components/shared/money.dart';
import 'package:raraapp/components/shared/page_header.dart';
import 'package:raraapp/components/shared/tag.dart';
import 'package:raraapp/components/theme/app_effects.dart';
import 'package:raraapp/hooks/use_contributions.dart';

/// Dízimos e ofertas da pessoa: contribuir pelo app, informar o que deu fora
/// e ver o histórico mês a mês.
class ContributionPage extends StatefulWidget {
  const ContributionPage({super.key});

  @override
  State<ContributionPage> createState() => _ContributionPageState();
}

class _ContributionPageState extends State<ContributionPage> {
  int? _year;
  int? _month;
  int? _day;

  // Volta do Mercado Pago -> recarrega para mostrar o pagamento confirmado
  late final _lifecycle = AppLifecycleListener(onResume: _load);

  @override
  void initState() {
    super.initState();
    _lifecycle;
    WidgetsBinding.instance.addPostFrameCallback((_) => _load());
  }

  @override
  void dispose() {
    _lifecycle.dispose();
    super.dispose();
  }

  Future<void> _load() => useContributions(context, listen: false).load();

  Future<void> _delete(Contribution c) async {
    if (!await confirmDelete(
      context,
      title: 'Apagar registro',
      itemName: amountsLabel(c),
    )) {
      return;
    }
    if (!mounted) return;
    final contributions = useContributions(context, listen: false);
    final ok = await contributions.remove(c.id);
    if (!mounted) return;
    showResult(
      context,
      ok: ok,
      success: 'Registro apagado',
      error: contributions.error,
    );
  }

  @override
  Widget build(BuildContext context) {
    final contributions = useContributions(context);
    final months = contributions.filteredMonths(
      year: _year,
      month: _month,
      day: _day,
    );
    final filtering = _year != null || _month != null || _day != null;
    final now = DateTime.now();
    final current = contributions.months
        .where((m) => m.month == DateTime(now.year, now.month))
        .firstOrNull;

    return RefreshIndicator(
      onRefresh: _load,
      child: ListView(
        physics: const AlwaysScrollableScrollPhysics(),
        padding: const EdgeInsets.fromLTRB(16, 16, 16, 32),
        children: [
          const FadeSlideIn(
            child: PageHeader(
              icon: Icons.volunteer_activism_outlined,
              title: 'Dízimos e Ofertas',
              subtitle: 'Seu histórico mês a mês',
            ),
          ),
          const SizedBox(height: 20),
          FadeSlideIn(
            delay: stagger(1),
            child: _ThisMonth(
              tithe: current?.tithe ?? 0,
              offering: current?.offering ?? 0,
            ),
          ),
          const SizedBox(height: 12),
          FadeSlideIn(
            delay: stagger(2),
            child: GlowButton(
              label: 'Informar contribuição feita na igreja',
              icon: Icons.edit_note,
              onPressed: () => DeclareDialog.show(context),
            ),
          ),
          if (contributions.hasPending) ...[
            const SizedBox(height: 12),
            const _PendingNotice(),
          ],
          const SizedBox(height: 28),
          if (contributions.mine.isNotEmpty) ...[
            _Filters(
              years: contributions.years,
              year: _year,
              month: _month,
              day: _day,
              onChanged: (y, m, d) => setState(() {
                _year = y;
                _month = m;
                _day = d;
              }),
            ),
            const SizedBox(height: 16),
          ],
          if (contributions.isLoading && contributions.mine.isEmpty)
            for (var i = 0; i < 2; i++) ...[
              const CardSkeleton(),
              const SizedBox(height: 12),
            ]
          else if (months.isEmpty)
            EmptyState(
              icon: Icons.volunteer_activism_outlined,
              message: filtering
                  ? 'Nenhuma contribuição nesse período'
                  : 'Nenhuma contribuição registrada ainda',
            )
          else
            for (final (i, month) in months.indexed) ...[
              FadeSlideIn(
                delay: stagger(i.clamp(0, 6) + 3, stepMs: 60),
                child: _MonthCard(month: month, onDelete: _delete),
              ),
              const SizedBox(height: 12),
            ],
        ],
      ),
    );
  }
}

/// Filtro do histórico por dia, mês e ano ("Todos" = sem filtro).
class _Filters extends StatelessWidget {
  final List<int> years;
  final int? year;
  final int? month;
  final int? day;
  final void Function(int? year, int? month, int? day) onChanged;

  const _Filters({
    required this.years,
    required this.year,
    required this.month,
    required this.day,
    required this.onChanged,
  });

  Widget _select(
    String label,
    int? value,
    List<int> options,
    String Function(int) text,
    ValueChanged<int?> changed,
  ) => DropdownButtonFormField<int?>(
    key: ValueKey('$label-$value'),
    initialValue: value,
    isExpanded: true,
    decoration: InputDecoration(labelText: label, isDense: true),
    items: [
      const DropdownMenuItem(value: null, child: Text('Todos')),
      for (final o in options) DropdownMenuItem(value: o, child: Text(text(o))),
    ],
    onChanged: changed,
  );

  @override
  Widget build(BuildContext context) {
    final any = year != null || month != null || day != null;
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      spacing: 10,
      children: [
        Row(
          children: [
            Expanded(
              child: Text(
                'Histórico',
                style: Theme.of(
                  context,
                ).textTheme.titleMedium?.copyWith(fontWeight: FontWeight.w700),
              ),
            ),
            if (any)
              TextButton.icon(
                onPressed: () => onChanged(null, null, null),
                icon: const Icon(Icons.filter_alt_off_outlined, size: 18),
                label: const Text('Limpar'),
              ),
          ],
        ),
        Row(
          spacing: 8,
          children: [
            Expanded(
              flex: 3,
              child: _select(
                'Dia',
                day,
                [for (var d = 1; d <= 31; d++) d],
                (d) => '$d',
                (d) => onChanged(year, month, d),
              ),
            ),
            Expanded(
              flex: 5,
              child: _select(
                'Mês',
                month,
                [for (var m = 1; m <= 12; m++) m],
                monthName,
                (m) => onChanged(year, m, day),
              ),
            ),
            Expanded(
              flex: 4,
              child: _select(
                'Ano',
                year,
                years,
                (y) => '$y',
                (y) => onChanged(y, month, day),
              ),
            ),
          ],
        ),
      ],
    );
  }
}

/// Destaque do mês atual + botão de contribuir pelo app.
class _ThisMonth extends StatelessWidget {
  final double tithe;
  final double offering;

  const _ThisMonth({required this.tithe, required this.offering});

  @override
  Widget build(BuildContext context) {
    final effects = AppEffects.of(context);
    final text = Theme.of(context).textTheme;
    final now = DateTime.now();

    Widget amount(String label, double value) => Expanded(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(label, style: text.labelLarge),
          FittedBox(
            child: Text(
              formatMoney(value),
              style: text.titleLarge?.copyWith(fontWeight: FontWeight.w800),
            ),
          ),
        ],
      ),
    );

    return Container(
      padding: const EdgeInsets.all(20),
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
        spacing: 16,
        children: [
          Text(
            monthLabel(DateTime(now.year, now.month)),
            style: text.titleMedium?.copyWith(fontWeight: FontWeight.w700),
          ),
          Row(
            spacing: 12,
            children: [amount('Dízimo', tithe), amount('Oferta', offering)],
          ),
          GlowButton(
            label: 'Dizimar / Ofertar pelo app',
            icon: Icons.favorite,
            onPressed: () => GiveSheet.show(context),
          ),
        ],
      ),
    );
  }
}

class _PendingNotice extends StatelessWidget {
  const _PendingNotice();

  @override
  Widget build(BuildContext context) {
    final scheme = Theme.of(context).colorScheme;
    return Container(
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(
        color: scheme.onSurface.withValues(alpha: 0.06),
        borderRadius: BorderRadius.circular(14),
        border: Border.all(color: scheme.outlineVariant),
      ),
      child: const Row(
        children: [
          Icon(Icons.hourglass_top),
          SizedBox(width: 10),
          Expanded(
            child: Text(
              'Há pagamento aguardando confirmação do Mercado Pago. '
              'Puxe a tela para baixo para atualizar.',
            ),
          ),
        ],
      ),
    );
  }
}

/// Um mês: totais de dízimo e oferta + cada contribuição.
class _MonthCard extends StatelessWidget {
  final ContributionMonth month;
  final ValueChanged<Contribution> onDelete;

  const _MonthCard({required this.month, required this.onDelete});

  @override
  Widget build(BuildContext context) {
    final text = Theme.of(context).textTheme;
    final scheme = Theme.of(context).colorScheme;
    final muted = scheme.onSurface.withValues(alpha: 0.7);

    return Card(
      child: Padding(
        padding: const EdgeInsets.fromLTRB(20, 16, 8, 12),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Padding(
              padding: const EdgeInsets.only(right: 12),
              child: Row(
                children: [
                  Expanded(
                    child: Text(
                      monthLabel(month.month),
                      style: text.titleMedium?.copyWith(
                        fontWeight: FontWeight.w800,
                      ),
                    ),
                  ),
                  Text(
                    formatMoney(month.tithe + month.offering),
                    style: text.titleMedium?.copyWith(
                      fontWeight: FontWeight.w800,
                      color: scheme.primary,
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 8),
            Padding(
              padding: const EdgeInsets.only(right: 12),
              child: Wrap(
                spacing: 8,
                runSpacing: 8,
                children: [
                  Tag(
                    'Dízimo ${month.tithe > 0 ? formatMoney(month.tithe) : '—'}',
                    icon: Icons.volunteer_activism_outlined,
                  ),
                  Tag(
                    'Oferta ${month.offering > 0 ? formatMoney(month.offering) : '—'}',
                    icon: Icons.card_giftcard,
                  ),
                ],
              ),
            ),
            const SizedBox(height: 8),
            const Divider(),
            for (final c in month.entries)
              Row(
                children: [
                  Icon(
                    c.isPending
                        ? Icons.hourglass_top
                        : methodIcons[c.method] ?? Icons.payments_outlined,
                    size: 20,
                    color: muted,
                  ),
                  const SizedBox(width: 10),
                  Expanded(
                    child: Padding(
                      padding: const EdgeInsets.symmetric(vertical: 8),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            amountsLabel(c),
                            style: const TextStyle(fontWeight: FontWeight.w600),
                          ),
                          Text(
                            [
                              formatDate(c.date.toLocal()),
                              if (c.isPending)
                                'aguardando confirmação'
                              else
                                methodLabels[c.method] ?? '',
                              if (c.source == 'tesouraria')
                                'registrado pela igreja',
                            ].where((s) => s.isNotEmpty).join(' • '),
                            style: text.bodySmall?.copyWith(color: muted),
                          ),
                        ],
                      ),
                    ),
                  ),
                  if (c.source == 'membro')
                    ItemMenu(onDelete: () => onDelete(c))
                  else
                    const SizedBox(width: 48),
                ],
              ),
          ],
        ),
      ),
    );
  }
}
