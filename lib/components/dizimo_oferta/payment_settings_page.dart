import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:raraapp/api/dizimo_oferta_api.dart';
import 'package:raraapp/components/shared/custom_text_field.dart';
import 'package:raraapp/components/shared/entity_card.dart';
import 'package:raraapp/components/shared/feedback.dart';
import 'package:raraapp/components/shared/format.dart';
import 'package:raraapp/components/shared/form_dialog.dart';
import 'package:raraapp/components/shared/list_page.dart';
import 'package:raraapp/components/shared/section.dart';
import 'package:raraapp/components/shared/tag.dart';
import 'package:raraapp/hooks/use_payment_settings.dart';

/// Chaves do Mercado Pago de cada igreja (super_admin).
class PaymentSettingsPage extends StatefulWidget {
  const PaymentSettingsPage({super.key});

  @override
  State<PaymentSettingsPage> createState() => _PaymentSettingsPageState();
}

class _PaymentSettingsPageState extends State<PaymentSettingsPage> {
  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback(
      (_) => usePaymentSettings(context, listen: false).load(),
    );
  }

  Future<void> _remove(ChurchPaymentSettings s) async {
    if (!await confirmDelete(
      context,
      title: 'Remover chaves',
      itemName: 'as chaves de ${s.churchName}',
    )) {
      return;
    }
    if (!mounted) return;
    final settings = usePaymentSettings(context, listen: false);
    final ok = await settings.remove(s.churchId);
    if (!mounted) return;
    showResult(
      context,
      ok: ok,
      success: 'Chaves removidas',
      error: settings.error,
    );
  }

  @override
  Widget build(BuildContext context) {
    final settings = usePaymentSettings(context);

    return ListPage(
      icon: Icons.key_outlined,
      title: 'Financeiro Programador',
      subtitle: 'Chaves do Mercado Pago de cada igreja',
      loading: settings.isLoading,
      onRefresh: settings.load,
      emptyIcon: Icons.church_outlined,
      emptyMessage: settings.error ?? 'Nenhuma igreja cadastrada',
      children: [
        const _WebhookCard(),
        for (final s in settings.churches)
          _ChurchCard(
            settings: s,
            onEdit: () => _SettingsDialog.show(context, s),
            onRemove: s.configured ? () => _remove(s) : null,
          ),
      ],
    );
  }
}

/// Endereço do webhook (o mesmo para todas as igrejas) + como configurar.
class _WebhookCard extends StatelessWidget {
  const _WebhookCard();

  static const _url = 'https://SEU-DOMINIO${PaymentSettingsApi.webhookPath}';

  @override
  Widget build(BuildContext context) {
    final scheme = Theme.of(context).colorScheme;
    final muted = scheme.onSurface.withValues(alpha: 0.75);

    return Card(
      child: Padding(
        padding: const EdgeInsets.all(20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          spacing: 12,
          children: [
            const SectionTitle('Webhook', icon: Icons.webhook),
            Text(
              'Use este endereço no painel do Mercado Pago de cada igreja '
              '(Suas integrações → Webhooks → evento "Pagamentos"):',
              style: TextStyle(color: muted),
            ),
            Container(
              padding: const EdgeInsets.fromLTRB(12, 4, 4, 4),
              decoration: BoxDecoration(
                color: scheme.onSurface.withValues(alpha: 0.06),
                borderRadius: BorderRadius.circular(12),
                border: Border.all(color: scheme.outlineVariant),
              ),
              child: Row(
                children: [
                  const Expanded(
                    child: SelectableText(
                      _url,
                      style: TextStyle(
                        fontFamily: 'monospace',
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                  ),
                  IconButton(
                    tooltip: 'Copiar',
                    icon: const Icon(Icons.copy),
                    onPressed: () {
                      Clipboard.setData(const ClipboardData(text: _url));
                      ScaffoldMessenger.of(context).showSnackBar(
                        const SnackBar(content: Text('Endereço copiado')),
                      );
                    },
                  ),
                ],
              ),
            ),
            Text(
              'Troque SEU-DOMINIO pelo endereço público do backend. '
              'Depois copie a "assinatura secreta" gerada pelo Mercado Pago '
              'para o campo de mesmo nome da igreja abaixo.',
              style: TextStyle(color: muted),
            ),
          ],
        ),
      ),
    );
  }
}

class _ChurchCard extends StatelessWidget {
  final ChurchPaymentSettings settings;
  final VoidCallback onEdit;
  final VoidCallback? onRemove;

  const _ChurchCard({
    required this.settings,
    required this.onEdit,
    this.onRemove,
  });

  @override
  Widget build(BuildContext context) {
    final scheme = Theme.of(context).colorScheme;
    final s = settings;

    return Card(
      clipBehavior: Clip.antiAlias,
      child: InkWell(
        onTap: onEdit,
        child: Padding(
          padding: const EdgeInsets.fromLTRB(20, 12, 4, 16),
          child: Row(
            children: [
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  spacing: 8,
                  children: [
                    Text(
                      s.churchName,
                      style: Theme.of(context).textTheme.titleMedium?.copyWith(
                        fontWeight: FontWeight.w700,
                      ),
                    ),
                    Wrap(
                      spacing: 8,
                      runSpacing: 8,
                      children: [
                        Tag(
                          s.configured ? 'Ativo' : 'Não configurado',
                          dot: s.configured
                              ? scheme.primary
                              : Colors.transparent,
                        ),
                        if (s.accessTokenHint != null)
                          Tag('Token ${s.accessTokenHint}', icon: Icons.key),
                        if (s.configured)
                          Tag(
                            s.hasWebhookSecret
                                ? 'Assinatura do webhook ok'
                                : 'Sem assinatura do webhook',
                            icon: Icons.webhook,
                          ),
                        if (s.updatedAt != null)
                          Tag(
                            'Atualizado ${formatDate(s.updatedAt!.toLocal())}',
                            icon: Icons.update,
                          ),
                      ],
                    ),
                  ],
                ),
              ),
              if (onRemove != null)
                ItemMenu(onEdit: onEdit, onDelete: onRemove)
              else
                const Padding(
                  padding: EdgeInsets.all(12),
                  child: Icon(Icons.chevron_right),
                ),
            ],
          ),
        ),
      ),
    );
  }
}

/// Formulário das chaves. Os segredos nunca voltam do servidor: deixar em
/// branco mantém o que já está salvo.
class _SettingsDialog extends StatefulWidget {
  final ChurchPaymentSettings settings;

  const _SettingsDialog({required this.settings});

  static Future<void> show(BuildContext context, ChurchPaymentSettings s) =>
      showDialog(
        context: context,
        builder: (_) => _SettingsDialog(settings: s),
      );

  @override
  State<_SettingsDialog> createState() => _SettingsDialogState();
}

class _SettingsDialogState extends State<_SettingsDialog> {
  final _formKey = GlobalKey<FormState>();
  late final _publicKey = TextEditingController(
    text: widget.settings.publicKey,
  );
  final _accessToken = TextEditingController();
  final _webhookSecret = TextEditingController();

  bool get _configured => widget.settings.configured;

  @override
  void dispose() {
    for (final c in [_publicKey, _accessToken, _webhookSecret]) {
      c.dispose();
    }
    super.dispose();
  }

  Future<void> _submit() async {
    if (!_formKey.currentState!.validate()) return;
    String? value(TextEditingController c) =>
        c.text.trim().isEmpty ? null : c.text.trim();

    final settings = usePaymentSettings(context, listen: false);
    final ok = await settings.save(
      widget.settings.churchId,
      publicKey: value(_publicKey),
      accessToken: value(_accessToken),
      webhookSecret: value(_webhookSecret),
    );
    if (!mounted) return;
    showResult(
      context,
      ok: ok,
      success: 'Chaves salvas',
      error: settings.error,
    );
    if (ok) Navigator.pop(context);
  }

  @override
  Widget build(BuildContext context) {
    final keep = 'Deixe em branco para manter';

    return FormDialog(
      title: widget.settings.churchName,
      formKey: _formKey,
      submitLabel: 'Salvar',
      isSaving: usePaymentSettings(context).isLoading,
      onSubmit: _submit,
      children: [
        Text(
          'Pegue as credenciais de produção em mercadopago.com.br/developers '
          '→ Suas integrações → Credenciais.',
          style: TextStyle(
            color: Theme.of(
              context,
            ).colorScheme.onSurface.withValues(alpha: 0.75),
          ),
        ),
        CustomTextField(
          label: 'Public Key',
          controller: _publicKey,
          prefixIcon: Icons.vpn_key_outlined,
          hintText: 'APP_USR-...',
        ),
        CustomTextField(
          label: 'Access Token',
          controller: _accessToken,
          prefixIcon: Icons.key,
          obscureText: true,
          hintText: _configured
              ? '$keep (${widget.settings.accessTokenHint})'
              : 'APP_USR-...',
          validator: (v) => !_configured && (v ?? '').trim().isEmpty
              ? 'Access Token é obrigatório'
              : null,
        ),
        CustomTextField(
          label: 'Assinatura secreta do webhook',
          controller: _webhookSecret,
          prefixIcon: Icons.webhook,
          obscureText: true,
          hintText: widget.settings.hasWebhookSecret ? keep : 'Opcional',
        ),
      ],
    );
  }
}
