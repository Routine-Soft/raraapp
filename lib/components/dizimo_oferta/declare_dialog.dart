import 'package:flutter/material.dart';
import 'package:raraapp/components/dizimo_oferta/contribution_labels.dart';
import 'package:raraapp/components/dizimo_oferta/money_field.dart';
import 'package:raraapp/components/shared/custom_text_field.dart';
import 'package:raraapp/components/shared/date_field.dart';
import 'package:raraapp/components/shared/feedback.dart';
import 'package:raraapp/components/shared/form_dialog.dart';
import 'package:raraapp/components/shared/money.dart';
import 'package:raraapp/hooks/use_contributions.dart';

/// A pessoa informa um dízimo/oferta que deu fora do app
/// (na igreja, em dinheiro, Pix direto etc.).
class DeclareDialog extends StatefulWidget {
  const DeclareDialog({super.key});

  static Future<void> show(BuildContext context) =>
      showDialog(context: context, builder: (_) => const DeclareDialog());

  @override
  State<DeclareDialog> createState() => _DeclareDialogState();
}

class _DeclareDialogState extends State<DeclareDialog> {
  final _formKey = GlobalKey<FormState>();
  final _tithe = TextEditingController();
  final _offering = TextEditingController();
  final _notes = TextEditingController();
  String? _method;
  DateTime? _date = DateTime.now();

  @override
  void dispose() {
    for (final c in [_tithe, _offering, _notes]) {
      c.dispose();
    }
    super.dispose();
  }

  Future<void> _submit() async {
    final tithe = parseMoney(_tithe.text);
    final offering = parseMoney(_offering.text);
    final error = tithe == null && offering == null
        ? 'Preencha o dízimo e/ou a oferta'
        : _method == null
        ? 'Escolha a forma de pagamento'
        : null;
    if (error != null) {
      showResult(context, ok: false, success: '', error: error);
      return;
    }

    final contributions = useContributions(context, listen: false);
    final ok = await contributions.declare(
      tithe: tithe,
      offering: offering,
      method: _method!,
      date: _date ?? DateTime.now(),
      notes: _notes.text.trim().isEmpty ? null : _notes.text.trim(),
    );
    if (!mounted) return;
    showResult(
      context,
      ok: ok,
      success: 'Contribuição registrada',
      error: contributions.error,
    );
    if (ok) Navigator.pop(context);
  }

  @override
  Widget build(BuildContext context) {
    return FormDialog(
      title: 'Informar contribuição',
      formKey: _formKey,
      submitLabel: 'Salvar',
      isSaving: useContributions(context).isLoading,
      onSubmit: _submit,
      children: [
        Text(
          'Registre aqui o dízimo ou a oferta que você deu fora do app, '
          'para manter seu histórico completo.',
          style: TextStyle(
            color: Theme.of(
              context,
            ).colorScheme.onSurface.withValues(alpha: 0.75),
          ),
        ),
        MoneyField(
          label: 'Dízimo (opcional)',
          controller: _tithe,
          icon: Icons.volunteer_activism_outlined,
        ),
        MoneyField(
          label: 'Oferta (opcional)',
          controller: _offering,
          icon: Icons.card_giftcard,
        ),
        MethodSelector(
          value: _method,
          onChanged: (m) => setState(() => _method = m),
        ),
        DateField(
          label: 'Data',
          value: _date,
          onChanged: (d) => setState(() => _date = d),
        ),
        CustomTextField(
          label: 'Observação (opcional)',
          controller: _notes,
          prefixIcon: Icons.notes,
        ),
      ],
    );
  }
}
