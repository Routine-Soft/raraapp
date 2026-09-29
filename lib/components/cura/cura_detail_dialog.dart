import 'package:flutter/material.dart';
import 'package:raraapp/api/cura_api.dart';
import 'package:raraapp/components/cura/cura_labels.dart';
import 'package:raraapp/components/shared/content_dialog.dart';
import 'package:raraapp/components/shared/format.dart';
import 'package:raraapp/components/shared/whatsapp.dart';

/// Dados do solicitante e do pedido (visão do gestor).
class CuraDetailDialog extends StatelessWidget {
  final Cura cura;

  const CuraDetailDialog({super.key, required this.cura});

  static Future<void> show(BuildContext context, Cura cura) => showDialog(
    context: context,
    builder: (_) => CuraDetailDialog(cura: cura),
  );

  @override
  Widget build(BuildContext context) {
    final user = cura.user;
    final address = user?.address;
    final addressText = [
      address?.address,
      address?.neighborhood,
      address?.city,
      address?.state,
      address?.cep,
    ].whereType<String>().where((s) => s.isNotEmpty).join(', ');

    Widget line(String label, String? value) => Padding(
      padding: const EdgeInsets.only(bottom: 8),
      child: Text('$label: ${(value ?? '').isEmpty ? 'N/A' : value}'),
    );

    return ContentDialog(
      title: user?.name ?? 'Solicitante',
      maxWidth: 480,
      children: [
        if ((user?.phone ?? '').isNotEmpty) ...[
          WhatsAppLink(user!.phone!),
          const SizedBox(height: 12),
        ],
        line('Gênero', user?.gender),
        line('Data de Nascimento', formatDate(user?.birthdate)),
        line('Endereço', addressText),
        line('Convite da Graça', user?.invitationofgrace),
        line('Status', user?.status),
        line('Batizado', user == null ? null : (user.baptized ? 'Sim' : 'Não')),
        line('Membro', user == null ? null : (user.member ? 'Sim' : 'Não')),
        line('Facilitador', user?.facilitator),
        const Divider(),
        Text(
          'Tipo: ${curaTypeLabels[cura.type] ?? cura.type}',
          style: const TextStyle(fontWeight: FontWeight.bold),
        ),
        const SizedBox(height: 8),
        CuraStatusBadge(cura.status),
        if ((cura.notes ?? '').isNotEmpty) ...[
          const SizedBox(height: 12),
          CuraNotes(cura.notes!),
        ],
      ],
    );
  }
}
