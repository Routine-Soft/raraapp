import 'package:flutter/material.dart';
import 'package:raraapp/components/dizimo_oferta/money_field.dart';
import 'package:raraapp/components/shared/effects/glow_button.dart';
import 'package:raraapp/components/shared/feedback.dart';
import 'package:raraapp/components/shared/money.dart';
import 'package:raraapp/hooks/use_contributions.dart';
import 'package:url_launcher/url_launcher.dart';

/// Folha "Contribuir pelo app": a pessoa digita os valores e vai para a
/// página segura do Mercado Pago (Pix ou cartão).
class GiveSheet extends StatefulWidget {
  const GiveSheet({super.key});

  static Future<void> show(BuildContext context) => showModalBottomSheet(
    context: context,
    isScrollControlled: true,
    builder: (_) => const GiveSheet(),
  );

  @override
  State<GiveSheet> createState() => _GiveSheetState();
}

class _GiveSheetState extends State<GiveSheet> {
  final _tithe = TextEditingController();
  final _offering = TextEditingController();

  double get _total =>
      (parseMoney(_tithe.text) ?? 0) + (parseMoney(_offering.text) ?? 0);

  @override
  void dispose() {
    _tithe.dispose();
    _offering.dispose();
    super.dispose();
  }

  Future<void> _pay() async {
    final contributions = useContributions(context, listen: false);
    final link = await contributions.checkout(
      tithe: parseMoney(_tithe.text),
      offering: parseMoney(_offering.text),
    );
    if (!mounted) return;
    if (link == null) {
      showResult(context, ok: false, success: '', error: contributions.error);
      return;
    }

    final messenger = ScaffoldMessenger.of(context);
    Navigator.pop(context);
    final opened = await launchUrl(
      Uri.parse(link),
      mode: LaunchMode.externalApplication,
    );
    messenger.showSnackBar(
      SnackBar(
        content: Text(
          opened
              ? 'Conclua o pagamento no Mercado Pago. A confirmação aparece aqui automaticamente.'
              : 'Não foi possível abrir o Mercado Pago',
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final text = Theme.of(context).textTheme;
    final scheme = Theme.of(context).colorScheme;
    final loading = useContributions(context).isLoading;

    return SafeArea(
      child: Padding(
        // sobe junto com o teclado
        padding: EdgeInsets.fromLTRB(
          20,
          0,
          20,
          20 + MediaQuery.viewInsetsOf(context).bottom,
        ),
        child: SingleChildScrollView(
          child: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.stretch,
            spacing: 16,
            children: [
              Text(
                'Contribuir pelo app',
                style: text.titleLarge?.copyWith(fontWeight: FontWeight.w800),
              ),
              Text(
                'Preencha o dízimo, a oferta ou os dois. O pagamento é feito '
                'com segurança no Mercado Pago, por Pix ou cartão.',
                style: TextStyle(
                  color: scheme.onSurface.withValues(alpha: 0.75),
                ),
              ),
              MoneyField(
                label: 'Dízimo',
                controller: _tithe,
                icon: Icons.volunteer_activism_outlined,
                onChanged: (_) => setState(() {}),
              ),
              MoneyField(
                label: 'Oferta',
                controller: _offering,
                icon: Icons.card_giftcard,
                onChanged: (_) => setState(() {}),
              ),
              Row(
                children: [
                  Text('Total', style: text.titleMedium),
                  const Spacer(),
                  Text(
                    formatMoney(_total),
                    style: text.headlineSmall?.copyWith(
                      fontWeight: FontWeight.w800,
                    ),
                  ),
                ],
              ),
              GlowButton(
                label: 'Ir para o pagamento',
                icon: Icons.lock_outline,
                loading: loading,
                onPressed: _total > 0 ? _pay : null,
              ),
            ],
          ),
        ),
      ),
    );
  }
}
