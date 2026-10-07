import 'dart:math' as math;

import 'package:flutter/material.dart';
import 'package:raraapp/api/user_api.dart';
import 'package:raraapp/components/shared/content_dialog.dart';
import 'package:raraapp/components/shared/effects/fade_slide_in.dart';
import 'package:raraapp/components/user/user_chips.dart';
import 'package:raraapp/components/user/user_detail_dialog.dart';
import 'package:raraapp/hooks/use_users.dart';

/// Filtro dos dashboards: quem entra nos números (todas / membros / não
/// membros) e o gênero.
class PeopleFilterBar extends StatelessWidget {
  final PeopleScope scope;
  final String? gender;
  final void Function(PeopleScope scope, String? gender) onChanged;

  const PeopleFilterBar({
    super.key,
    required this.scope,
    required this.gender,
    required this.onChanged,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      spacing: 8,
      children: [
        SegmentedButton<PeopleScope>(
          showSelectedIcon: false,
          segments: const [
            ButtonSegment(value: PeopleScope.all, label: Text('Todos')),
            ButtonSegment(value: PeopleScope.members, label: Text('Membros')),
            ButtonSegment(
              value: PeopleScope.nonMembers,
              label: Text('Não membros'),
            ),
          ],
          selected: {scope},
          onSelectionChanged: (v) => onChanged(v.first, gender),
        ),
        SegmentedButton<String?>(
          showSelectedIcon: false,
          segments: const [
            ButtonSegment(value: null, label: Text('Ambos')),
            ButtonSegment(value: 'Masculino', label: Text('Homens')),
            ButtonSegment(value: 'Feminino', label: Text('Mulheres')),
          ],
          selected: {gender},
          onSelectionChanged: (v) => onChanged(scope, v.first),
        ),
      ],
    );
  }
}

/// Número que "conta" de 0 até [value].
class CountUpText extends StatelessWidget {
  final int value;
  final TextStyle? style;

  const CountUpText(this.value, {super.key, this.style});

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

/// Card de um número com ícone (grade de 2 ou 3 colunas).
class StatTile extends StatelessWidget {
  final String label;
  final int value;
  final IconData icon;

  /// Versão menor, para os cards de cada igreja.
  final bool dense;

  /// Toque no card (ex.: abrir a lista dessas pessoas).
  final VoidCallback? onTap;

  const StatTile(
    this.label,
    this.value,
    this.icon, {
    super.key,
    this.dense = false,
    this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    final scheme = Theme.of(context).colorScheme;
    final text = Theme.of(context).textTheme;

    return Card(
      margin: EdgeInsets.zero,
      clipBehavior: Clip.antiAlias,
      color: dense ? scheme.surfaceContainerHigh : null,
      child: InkWell(
        onTap: onTap,
        child: Padding(
          padding: EdgeInsets.all(dense ? 10 : 16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Container(
                padding: EdgeInsets.all(dense ? 5 : 8),
                decoration: BoxDecoration(
                  color: scheme.primary.withValues(alpha: 0.14),
                  borderRadius: BorderRadius.circular(10),
                ),
                child: Icon(icon, color: scheme.primary, size: dense ? 16 : 20),
              ),
              const Spacer(),
              FittedBox(
                child: CountUpText(
                  value,
                  style: (dense ? text.titleLarge : text.headlineMedium)
                      ?.copyWith(fontWeight: FontWeight.w800),
                ),
              ),
              Text(
                label,
                maxLines: 2,
                overflow: TextOverflow.ellipsis,
                style:
                    (dense ? text.bodySmall : null)?.copyWith(
                      color: scheme.onSurface.withValues(alpha: 0.75),
                    ) ??
                    TextStyle(color: scheme.onSurface.withValues(alpha: 0.75)),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

/// Um card do dashboard: nome, ícone e quem entra nele.
typedef PeopleCategory = ({
  String label,
  IconData icon,
  bool Function(User) test,
});

/// Números gerais: cadastradas, membros, batizados, homens e mulheres.
List<PeopleCategory> peopleCategories({bool withTotal = false}) => [
  if (withTotal)
    (
      label: 'Pessoas cadastradas',
      icon: Icons.groups_outlined,
      test: (_) => true,
    ),
  (label: 'Não Membros', icon: Icons.person_outline, test: (u) => !u.member),
  (label: 'Membros', icon: Icons.verified_user_outlined, test: (u) => u.member),
  (
    label: 'Batizados',
    icon: Icons.water_drop_outlined,
    test: (u) => u.baptized,
  ),
  (label: 'Não Batizados', icon: Icons.water_drop, test: (u) => !u.baptized),
  (label: 'Homens', icon: Icons.man, test: (u) => u.gender == 'Masculino'),
  (label: 'Mulheres', icon: Icons.woman, test: (u) => u.gender == 'Feminino'),
];

/// Um card por cargo eclesiástico.
List<PeopleCategory> ecclesiasticalCategories() => [
  for (final role in ecclesiasticalRoles)
    (
      label: ecclesiasticalRoleLabel(role),
      icon: Icons.workspace_premium_outlined,
      test: (u) => u.ecclesiasticalRoles.contains(role),
    ),
];

/// Grade de cards contados a partir de [people]; tocar num card abre a
/// lista dessas pessoas (e tocar numa pessoa, os dados dela).
class PeopleStatGrid extends StatelessWidget {
  final List<PeopleCategory> categories;
  final List<User> people;
  final int columns;
  final bool dense;

  const PeopleStatGrid(
    this.categories,
    this.people, {
    super.key,
    this.columns = 2,
    this.dense = false,
  });

  @override
  Widget build(BuildContext context) {
    final groups = [for (final c in categories) people.where(c.test).toList()];
    return GridView.count(
      crossAxisCount: columns,
      shrinkWrap: true,
      padding: EdgeInsets.zero,
      physics: const NeverScrollableScrollPhysics(),
      mainAxisSpacing: dense ? 8 : 12,
      crossAxisSpacing: dense ? 8 : 12,
      childAspectRatio: dense ? 1.05 : 1.1,
      children: [
        for (final (i, c) in categories.indexed)
          FadeSlideIn(
            delay: stagger(i + 1, stepMs: 50),
            child: StatTile(
              c.label,
              groups[i].length,
              c.icon,
              dense: dense,
              onTap: () => PeopleListDialog.show(context, c.label, groups[i]),
            ),
          ),
      ],
    );
  }
}

/// Lista das pessoas de um card; tocar abre os dados da pessoa.
class PeopleListDialog extends StatelessWidget {
  final String title;
  final List<User> people;

  const PeopleListDialog({
    super.key,
    required this.title,
    required this.people,
  });

  static Future<void> show(
    BuildContext context,
    String title,
    List<User> people,
  ) => showDialog(
    context: context,
    builder: (_) => PeopleListDialog(
      title: title,
      people: [...people]..sort((a, b) => a.name.compareTo(b.name)),
    ),
  );

  @override
  Widget build(BuildContext context) {
    return ContentDialog(
      title: title,
      subtitle: '${people.length} ${people.length == 1 ? 'pessoa' : 'pessoas'}',
      actions: [
        OutlinedButton(
          onPressed: () => Navigator.pop(context),
          child: const Text('Fechar'),
        ),
      ],
      children: [
        if (people.isEmpty)
          const Padding(
            padding: EdgeInsets.symmetric(vertical: 16),
            child: Text('Ninguém aqui ainda.'),
          )
        else
          Column(
            children: [
              for (final user in people)
                ListTile(
                  contentPadding: EdgeInsets.zero,
                  leading: UserAvatar(user, size: 40),
                  title: Text(
                    user.name,
                    maxLines: 1,
                    overflow: TextOverflow.ellipsis,
                    style: const TextStyle(fontWeight: FontWeight.w600),
                  ),
                  subtitle: Text(user.phone ?? user.email),
                  trailing: const Icon(Icons.chevron_right),
                  onTap: () => UserDetailDialog.show(context, user),
                ),
            ],
          ),
      ],
    );
  }
}

/// Faixa etária em pizza (rosca) + legenda com quantidade e porcentagem.
/// A faixa com mais pessoas aparece em destaque.
class AgePieChart extends StatelessWidget {
  final PeopleStats stats;

  /// Tamanho da rosca.
  final double size;

  const AgePieChart({super.key, required this.stats, this.size = 150});

  /// Paleta categórica validada (daltonismo e contraste) para os dois fundos;
  /// a ordem acompanha as faixas e nunca muda com o filtro.
  static const _dark = [
    Color(0xFF3987E5),
    Color(0xFFD95926),
    Color(0xFF199E70),
    Color(0xFFC98500),
    Color(0xFFD55181),
    Color(0xFF9085E9),
  ];
  static const _light = [
    Color(0xFF2A78D6),
    Color(0xFFEB6834),
    Color(0xFF1BAF7A),
    Color(0xFFEDA100),
    Color(0xFFE87BA4),
    Color(0xFF4A3AA7),
  ];

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final scheme = theme.colorScheme;
    final text = theme.textTheme;
    final colors = scheme.brightness == Brightness.dark ? _dark : _light;
    final withAge = stats.ages.fold(0, (a, b) => a + b);
    final muted = scheme.onSurface.withValues(alpha: 0.7);

    if (withAge == 0) {
      return Padding(
        padding: const EdgeInsets.symmetric(vertical: 12),
        child: Text(
          stats.total == 0
              ? 'Ninguém neste filtro'
              : 'Ninguém com data de nascimento cadastrada',
          style: TextStyle(color: muted),
        ),
      );
    }

    final top = stats.ages.indexOf(stats.ages.reduce(math.max));
    String pct(int n) => '${(n * 100 / withAge).round()}%';

    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      spacing: 14,
      children: [
        Row(
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            Semantics(
              label: 'Gráfico de faixa etária',
              excludeSemantics: true,
              child: SizedBox.square(
                dimension: size,
                child: TweenAnimationBuilder<double>(
                  tween: Tween(begin: 0, end: 1),
                  duration: MediaQuery.of(context).disableAnimations
                      ? Duration.zero
                      : const Duration(milliseconds: 900),
                  curve: Curves.easeOutCubic,
                  builder: (context, t, _) => CustomPaint(
                    painter: _DonutPainter(
                      values: stats.ages,
                      colors: colors,
                      gap: theme.cardTheme.color ?? scheme.surface,
                      progress: t,
                    ),
                    child: Center(
                      child: Column(
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          Text(
                            pct(stats.ages[top]),
                            style: text.titleLarge?.copyWith(
                              fontWeight: FontWeight.w800,
                            ),
                          ),
                          Text('predomina', style: text.bodySmall),
                        ],
                      ),
                    ),
                  ),
                ),
              ),
            ),
            const SizedBox(width: 16),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                spacing: 4,
                children: [
                  Text('Faixa predominante', style: text.bodySmall),
                  Text(
                    ageBands[top].label,
                    style: text.titleMedium?.copyWith(
                      fontWeight: FontWeight.w800,
                    ),
                  ),
                  Text(
                    '${stats.ages[top]} '
                    '${stats.ages[top] == 1 ? 'pessoa' : 'pessoas'} • '
                    '${pct(stats.ages[top])}',
                    style: TextStyle(color: muted),
                  ),
                ],
              ),
            ),
          ],
        ),
        // Legenda: identidade nunca só pela cor (bolinha + nome + números)
        Column(
          spacing: 6,
          children: [
            for (final (i, band) in ageBands.indexed)
              Row(
                children: [
                  Container(
                    width: 12,
                    height: 12,
                    decoration: BoxDecoration(
                      color: colors[i],
                      shape: BoxShape.circle,
                    ),
                  ),
                  const SizedBox(width: 10),
                  Expanded(
                    child: Text(
                      band.label,
                      style: TextStyle(
                        fontWeight: i == top
                            ? FontWeight.w800
                            : FontWeight.w500,
                      ),
                    ),
                  ),
                  Text(
                    '${stats.ages[i]}',
                    style: const TextStyle(fontWeight: FontWeight.w700),
                  ),
                  SizedBox(
                    width: 48,
                    child: Text(
                      pct(stats.ages[i]),
                      textAlign: TextAlign.right,
                      style: TextStyle(color: muted),
                    ),
                  ),
                ],
              ),
            if (stats.noBirthdate > 0)
              Padding(
                padding: const EdgeInsets.only(top: 4),
                child: Text(
                  '${stats.noBirthdate} sem data de nascimento (fora do '
                  'gráfico)',
                  style: text.bodySmall?.copyWith(color: muted),
                ),
              ),
          ],
        ),
      ],
    );
  }
}

class _DonutPainter extends CustomPainter {
  final List<int> values;
  final List<Color> colors;

  /// Cor do fundo do card: separa as fatias com um vão de 2px.
  final Color gap;
  final double progress;

  _DonutPainter({
    required this.values,
    required this.colors,
    required this.gap,
    required this.progress,
  });

  @override
  void paint(Canvas canvas, Size size) {
    final total = values.fold(0, (a, b) => a + b);
    if (total == 0) return;
    final stroke = size.width * 0.18;
    final rect = Rect.fromLTWH(
      stroke / 2,
      stroke / 2,
      size.width - stroke,
      size.height - stroke,
    );
    final sweepTotal = 2 * math.pi * progress;
    var start = -math.pi / 2;
    final slices = [
      for (final (i, v) in values.indexed)
        if (v > 0) (i, v / total * sweepTotal),
    ];
    for (final (i, sweep) in slices) {
      canvas.drawArc(
        rect,
        start,
        sweep,
        false,
        Paint()
          ..color = colors[i]
          ..style = PaintingStyle.stroke
          ..strokeWidth = stroke,
      );
      start += sweep;
    }
    // Vão entre as fatias (só se houver mais de uma)
    if (slices.length > 1) {
      final center = size.center(Offset.zero);
      final outer = size.width / 2;
      final inner = outer - stroke;
      final line = Paint()
        ..color = gap
        ..strokeWidth = 2;
      var angle = -math.pi / 2;
      for (final (_, sweep) in slices) {
        final dir = Offset(math.cos(angle), math.sin(angle));
        canvas.drawLine(center + dir * inner, center + dir * outer, line);
        angle += sweep;
      }
    }
  }

  @override
  bool shouldRepaint(_DonutPainter old) =>
      old.progress != progress ||
      old.values != values ||
      old.colors != colors ||
      old.gap != gap;
}

/// Seção com título dentro de um card (cargos, faixa etária...).
class StatsSection extends StatelessWidget {
  final String title;
  final IconData icon;
  final Widget child;

  const StatsSection({
    super.key,
    required this.title,
    required this.icon,
    required this.child,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      spacing: 12,
      children: [
        Row(
          children: [
            Icon(icon, size: 20, color: Theme.of(context).colorScheme.primary),
            const SizedBox(width: 8),
            Text(
              title,
              style: Theme.of(
                context,
              ).textTheme.titleMedium?.copyWith(fontWeight: FontWeight.w700),
            ),
          ],
        ),
        child,
      ],
    );
  }
}
