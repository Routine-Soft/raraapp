import 'package:flutter/material.dart';
import 'package:raraapp/api/user_api.dart';
import 'package:raraapp/components/shared/content_dialog.dart';
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

  Widget _row(String label, String? value) {
    if ((value ?? '').isEmpty) return const SizedBox.shrink();
    return Padding(
      padding: const EdgeInsets.only(bottom: 12),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(label, style: TextStyle(fontSize: 13, color: Colors.grey[600])),
          const SizedBox(width: 12),
          Expanded(
            child: Text(
              value!,
              textAlign: TextAlign.end,
              style: const TextStyle(fontSize: 13, fontWeight: FontWeight.w500),
            ),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final address = user.address;
    final addressText = [
      address?.address,
      address?.neighborhood,
      address?.city,
      address?.state,
      address?.cep,
    ].whereType<String>().where((s) => s.isNotEmpty).join(', ');

    return ContentDialog(
      title: user.name,
      subtitle: user.email,
      actions: [
        ElevatedButton(
          onPressed: () => Navigator.pop(context),
          child: const Text('Fechar'),
        ),
      ],
      children: [
        UserChips(user: user),
        const Divider(height: 32),
        const SectionTitle('Informações Pessoais'),
        if ((user.phone ?? '').isNotEmpty)
          Align(
            alignment: Alignment.centerRight,
            child: WhatsAppLink(user.phone!),
          ),
        _row('Gênero', user.gender),
        _row('Nascimento', formatDate(user.birthdate)),
        _row('Status', user.status),
        _row('Convite da Graça', user.invitationofgrace),
        _row('Facilitador', user.facilitator),
        _row('Endereço', addressText),
      ],
    );
  }
}
