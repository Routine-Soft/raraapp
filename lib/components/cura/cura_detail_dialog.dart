import 'package:flutter/material.dart';
import 'package:raraapp/api/cura_api.dart';
import 'package:raraapp/components/cura/cura_labels.dart';
import 'package:raraapp/components/shared/content_dialog.dart';
import 'package:raraapp/components/shared/detail_row.dart';
import 'package:raraapp/components/shared/format.dart';
import 'package:raraapp/components/shared/tag.dart';
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
    final addressText = address?.oneLine ?? '';

    return ContentDialog(
      title: user?.name ?? 'Solicitante',
      subtitle: 'Criado em ${formatDate(cura.createdAt)}',
      children: [
        const SectionTitle('Pedido', icon: Icons.healing_outlined),
        Wrap(
          spacing: 8,
          runSpacing: 8,
          children: [
            Tag(
              curaTypeLabels[cura.type] ?? cura.type,
              icon: curaTypeIcons[cura.type],
            ),
            CuraStatusBadge(cura.status),
          ],
        ),
        if ((cura.notes ?? '').isNotEmpty) CuraNotes(cura.notes!),
        const SizedBox(height: 4),
        const SectionTitle('Solicitante', icon: Icons.person_outline),
        if ((user?.phone ?? '').isNotEmpty)
          Align(
            alignment: Alignment.centerLeft,
            child: WhatsAppLink(user!.phone!),
          ),
        Column(
          children: [
            DetailRow('Gênero', user?.gender, icon: Icons.wc),
            DetailRow(
              'Nascimento',
              formatDate(user?.birthdate),
              icon: Icons.cake_outlined,
            ),
            DetailRow('Endereço', addressText, icon: Icons.place_outlined),
            DetailRow(
              'Convite da Graça',
              user?.invitationofgrace,
              icon: Icons.mail_outline,
            ),
            DetailRow('Status', user?.status, icon: Icons.flag_outlined),
            DetailRow(
              'Batizado',
              user == null ? null : (user.baptized ? 'Sim' : 'Não'),
              icon: Icons.water_drop_outlined,
            ),
            DetailRow(
              'Membro',
              user == null ? null : (user.member ? 'Sim' : 'Não'),
              icon: Icons.verified_user_outlined,
            ),
            DetailRow(
              'Facilitador',
              user?.facilitator,
              icon: Icons.support_agent,
            ),
          ],
        ),
      ],
    );
  }
}
