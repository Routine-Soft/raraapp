import 'package:flutter/material.dart';
import 'package:raraapp/api/user_api.dart';
import 'package:raraapp/components/shared/content_dialog.dart';
import 'package:raraapp/components/shared/detail_row.dart';
import 'package:raraapp/components/shared/format.dart';
import 'package:raraapp/components/shared/whatsapp.dart';
import 'package:raraapp/components/user/user_chips.dart';

/// Ficha do usuário (somente leitura).
class UserDetailDialog extends StatelessWidget {
  final User user;

  const UserDetailDialog({super.key, required this.user});

  static Future<void> show(BuildContext context, User user) => showDialog(
    context: context,
    builder: (_) => UserDetailDialog(user: user),
  );

  @override
  Widget build(BuildContext context) {
    final address = user.address;
    final addressText = address?.oneLine ?? '';

    return ContentDialog(
      title: user.name,
      subtitle: user.email,
      actions: [
        OutlinedButton(
          onPressed: () => Navigator.pop(context),
          child: const Text('Fechar'),
        ),
      ],
      children: [
        Row(
          children: [
            UserAvatar(user, size: 56),
            const SizedBox(width: 16),
            Expanded(child: UserChips(user: user)),
          ],
        ),
        if ((user.phone ?? '').isNotEmpty)
          Align(
            alignment: Alignment.centerLeft,
            child: WhatsAppLink(user.phone!),
          ),
        const SectionTitle('Informações Pessoais', icon: Icons.person_outline),
        Column(
          children: [
            DetailRow('Gênero', user.gender, icon: Icons.wc, hideEmpty: true),
            DetailRow(
              'Nascimento',
              formatDate(user.birthdate),
              icon: Icons.cake_outlined,
              hideEmpty: true,
            ),
            DetailRow(
              'Status',
              user.status,
              icon: Icons.flag_outlined,
              hideEmpty: true,
            ),
            DetailRow(
              'Convite da Graça',
              user.invitationofgrace,
              icon: Icons.mail_outline,
              hideEmpty: true,
            ),
            DetailRow(
              'Facilitador',
              user.facilitator,
              icon: Icons.support_agent,
              hideEmpty: true,
            ),
            DetailRow(
              'Endereço',
              addressText,
              icon: Icons.place_outlined,
              hideEmpty: true,
            ),
          ],
        ),
      ],
    );
  }
}
