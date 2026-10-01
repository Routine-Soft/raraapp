import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
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

/// Abre o WhatsApp com [text] pronto para enviar (a pessoa escolhe o
/// contato).
Future<void> shareOnWhatsApp(BuildContext context, String text) async {
  final messenger = ScaffoldMessenger.of(context);
  final url = Uri.parse('https://wa.me/?text=${Uri.encodeComponent(text)}');

  try {
    if (await launchUrl(url, mode: LaunchMode.externalApplication)) return;
  } catch (_) {}
  messenger.showSnackBar(
    const SnackBar(content: Text('Não foi possível abrir o WhatsApp')),
  );
}

/// Telefone clicável (pílula) que abre o WhatsApp.
class WhatsAppLink extends StatelessWidget {
  final String phone;

  const WhatsAppLink(this.phone, {super.key});

  @override
  Widget build(BuildContext context) {
    final scheme = Theme.of(context).colorScheme;
    final radius = BorderRadius.circular(999);
    return Semantics(
      button: true,
      label: 'Abrir WhatsApp de $phone',
      child: Material(
        color: scheme.secondary.withValues(alpha: 0.18),
        borderRadius: radius,
        child: InkWell(
          borderRadius: radius,
          onTap: () => openWhatsApp(context, phone),
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
            child: Row(
              mainAxisSize: MainAxisSize.min,
              children: [
                const FaIcon(
                  FontAwesomeIcons.whatsapp,
                  size: 18,
                  color: Color(0xFF25D366), // verde do WhatsApp
                ),
                const SizedBox(width: 8),
                Text(
                  phone,
                  style: const TextStyle(fontWeight: FontWeight.w600),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
