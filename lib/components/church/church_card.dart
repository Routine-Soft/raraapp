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
      onEdit: onEdit,
      onDelete: onDelete,
      children: [
        InfoLine('Pastor 1', church.pastor1),
        InfoLine('Pastor 2', church.pastor2),
        InfoLine('CNPJ', church.cnpj),
        InfoLine('Total de Membros', '${church.totalMembers}'),
        if (church.address != null) AddressText(church.address!),
      ],
    );
  }
}
