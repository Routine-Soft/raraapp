import 'package:flutter/material.dart';
import 'package:raraapp/api/user_api.dart';

/// Cargos eclesiásticos em "pílulas" marcáveis (a pessoa pode ter vários).
class EcclesiasticalRolesField extends StatelessWidget {
  final List<String> value;
  final ValueChanged<List<String>> onChanged;

  const EcclesiasticalRolesField({
    super.key,
    required this.value,
    required this.onChanged,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      spacing: 8,
      children: [
        Text(
          'Cargo eclesiástico',
          style: Theme.of(context).textTheme.labelLarge,
        ),
        Wrap(
          spacing: 8,
          runSpacing: 8,
          children: [
            for (final role in ecclesiasticalRoles)
              FilterChip(
                label: Text(ecclesiasticalRoleLabel(role)),
                selected: value.contains(role),
                onSelected: (selected) => onChanged([
                  // mantém a ordem da lista oficial
                  for (final r in ecclesiasticalRoles)
                    if (r == role ? selected : value.contains(r)) r,
                ]),
              ),
          ],
        ),
      ],
    );
  }
}
