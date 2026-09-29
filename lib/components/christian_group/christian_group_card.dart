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
      onEdit: onEdit,
      onDelete: onDelete,
      children: [
        InfoLine('Líder', group.leader),
        InfoLine('Co-líder', group.coleader),
        InfoLine('Anfitrião', group.host),
        if (group.address != null) AddressText(group.address!),
        if (group.contact.isNotEmpty) ...[
          Text(
            'Contatos:',
            style: Theme.of(
              context,
            ).textTheme.bodySmall?.copyWith(fontWeight: FontWeight.bold),
          ),
          for (final phone in group.contact) WhatsAppLink(phone),
        ],
      ],
    );
  }
}
