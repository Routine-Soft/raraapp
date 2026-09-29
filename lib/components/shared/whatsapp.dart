import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';

/// Abre a conversa no WhatsApp (https://wa.me/DDI+DDD+NUMERO).
Future<void> openWhatsApp(BuildContext context, String phone) async {
  final messenger = ScaffoldMessenger.of(context);
  final url = Uri.parse(
    'https://wa.me/${phone.replaceAll(RegExp(r'[^0-9]'), '')}',
  );

  try {
    if (await launchUrl(url, mode: LaunchMode.externalApplication)) return;
  } catch (_) {}
  messenger.showSnackBar(
    const SnackBar(content: Text('Não foi possível abrir o WhatsApp')),
  );
}

/// Telefone clicável que abre o WhatsApp.
class WhatsAppLink extends StatelessWidget {
  final String phone;

  const WhatsAppLink(this.phone, {super.key});

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: () => openWhatsApp(context, phone),
      child: Padding(
        padding: const EdgeInsets.only(top: 4),
        child: Text(
          '  📱 $phone',
          style: Theme.of(context).textTheme.bodySmall?.copyWith(
            color: Colors.blue,
            decoration: TextDecoration.underline,
          ),
        ),
      ),
    );
  }
}
