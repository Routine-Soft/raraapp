import 'package:flutter/material.dart';
import 'package:raraapp/api/christian_group_api.dart';
import 'package:raraapp/components/shared/address_fields.dart';
import 'package:raraapp/components/shared/entity_card.dart';
import 'package:raraapp/components/shared/info_line.dart';
import 'package:raraapp/components/shared/whatsapp.dart';

class ChristianGroupCard extends StatelessWidget {
  final ChristianGroup group;
  final VoidCallback? onEdit;
  final VoidCallback? onDelete;

  const ChristianGroupCard({
    super.key,
    required this.group,
    this.onEdit,
    this.onDelete,
  });

  @override
  Widget build(BuildContext context) {
    return EntityCard(
      title: group.name.isEmpty ? 'Sem nome' : group.name,
      icon: Icons.groups_outlined,
      onEdit: onEdit,
      onDelete: onDelete,
      children: [
        InfoLine('Líder', group.leader, icon: Icons.star_outline),
        InfoLine('Co-líder', group.coleader, icon: Icons.person_outline),
        InfoLine('Anfitrião', group.host, icon: Icons.home_outlined),
        if (group.address != null) AddressText(group.address!),
        if (group.contact.isNotEmpty) ...[
          const SizedBox(height: 4),
          Wrap(
            spacing: 8,
            runSpacing: 8,
            children: [for (final phone in group.contact) WhatsAppLink(phone)],
          ),
        ],
      ],
    );
  }
}
