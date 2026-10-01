import 'package:flutter/material.dart';
import 'package:raraapp/api/church_api.dart';
import 'package:raraapp/components/shared/address_fields.dart';
import 'package:raraapp/components/shared/entity_card.dart';
import 'package:raraapp/components/shared/info_line.dart';

class ChurchCard extends StatelessWidget {
  final Church church;
  final VoidCallback? onEdit;
  final VoidCallback? onDelete;

  const ChurchCard({
    super.key,
    required this.church,
    this.onEdit,
    this.onDelete,
  });

  @override
  Widget build(BuildContext context) {
    return EntityCard(
      title: church.name,
      icon: Icons.church_outlined,
      onEdit: onEdit,
      onDelete: onDelete,
      children: [
        InfoLine('Pastor', church.pastor1, icon: Icons.person_outline),
        InfoLine('Pastor', church.pastor2, icon: Icons.person_outline),
        InfoLine('CNPJ', church.cnpj, icon: Icons.badge_outlined),
        // Contado sozinho pelo backend (usuários marcados como membro)
        InfoLine(
          'Membros',
          '${church.totalMembers}',
          icon: Icons.groups_outlined,
        ),
        if (church.address != null) AddressText(church.address!),
      ],
    );
  }
}
