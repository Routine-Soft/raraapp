import 'package:flutter/material.dart';
import 'package:raraapp/api/dizimo_oferta_api.dart';
import 'package:raraapp/components/shared/money.dart';

const methodLabels = {'pix': 'Pix', 'dinheiro': 'Dinheiro', 'cartao': 'Cartão'};

const methodIcons = {
  'pix': Icons.pix,
  'dinheiro': Icons.payments_outlined,
  'cartao': Icons.credit_card,
};

const sourceLabels = {
  'app': 'Pago pelo app',
  'membro': 'Informado pelo membro',
  'tesouraria': 'Registrado pela tesouraria',
};

const _monthNames = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro',
];

/// DateTime(2026, 9) -> "Setembro de 2026"
String monthLabel(DateTime month) =>
    '${_monthNames[month.month - 1]} de ${month.year}';

/// 1..12 -> "Setembro"
String monthName(int month) => _monthNames[month - 1];

/// 1..12 -> "Set"
String shortMonth(int month) => _monthNames[month - 1].substring(0, 3);

/// "Dízimo R$ 100,00 • Oferta R$ 20,00"
String amountsLabel(Contribution c) => [
  if (c.tithe != null) 'Dízimo ${formatMoney(c.tithe!)}',
  if (c.offering != null) 'Oferta ${formatMoney(c.offering!)}',
].join(' • ');

/// Escolha Pix / Dinheiro / Cartão: três cartões lado a lado com o ícone em
/// cima e o nome embaixo (cabe na largura do celular mesmo com letra grande).
class MethodSelector extends StatelessWidget {
  final String? value;
  final ValueChanged<String> onChanged;

  const MethodSelector({
    super.key,
    required this.value,
    required this.onChanged,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      spacing: 8,
      children: [
        Text(
          'Forma de pagamento',
          style: Theme.of(
            context,
          ).textTheme.titleSmall?.copyWith(fontWeight: FontWeight.w700),
        ),
        Row(
          spacing: 8,
          children: [
            for (final m in contributionMethods)
              Expanded(
                child: _MethodTile(
                  label: methodLabels[m]!,
                  icon: methodIcons[m]!,
                  selected: value == m,
                  onTap: () => onChanged(m),
                ),
              ),
          ],
        ),
      ],
    );
  }
}

class _MethodTile extends StatelessWidget {
  final String label;
  final IconData icon;
  final bool selected;
  final VoidCallback onTap;

  const _MethodTile({
    required this.label,
    required this.icon,
    required this.selected,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    final scheme = Theme.of(context).colorScheme;
    final color = selected ? scheme.onPrimary : scheme.onSurface;
    final radius = BorderRadius.circular(14);

    return Semantics(
      button: true,
      selected: selected,
      label: label,
      excludeSemantics: true,
      child: Material(
        color: Colors.transparent,
        child: InkWell(
          borderRadius: radius,
          onTap: onTap,
          child: AnimatedContainer(
            duration: const Duration(milliseconds: 200),
            padding: const EdgeInsets.symmetric(horizontal: 4, vertical: 12),
            decoration: BoxDecoration(
              color: selected ? scheme.primary : Colors.transparent,
              borderRadius: radius,
              border: Border.all(
                color: selected ? scheme.primary : scheme.outline,
              ),
            ),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              spacing: 6,
              children: [
                Icon(icon, color: color),
                FittedBox(
                  fit: BoxFit.scaleDown,
                  child: Text(
                    label,
                    maxLines: 1,
                    style: TextStyle(color: color, fontWeight: FontWeight.w700),
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
