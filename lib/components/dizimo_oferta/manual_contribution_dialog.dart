import 'package:flutter/material.dart';
import 'package:raraapp/api/user_api.dart';
import 'package:raraapp/components/dizimo_oferta/contribution_labels.dart';
import 'package:raraapp/components/dizimo_oferta/money_field.dart';
import 'package:raraapp/components/shared/custom_text_field.dart';
import 'package:raraapp/components/shared/date_field.dart';
import 'package:raraapp/components/shared/feedback.dart';
import 'package:raraapp/components/shared/form_dialog.dart';
import 'package:raraapp/components/shared/money.dart';
import 'package:raraapp/hooks/use_treasury.dart';
import 'package:raraapp/hooks/use_users.dart';

/// Tesouraria registra um dízimo/oferta dado fora do app
/// (de um membro do app ou de qualquer outra pessoa).
class ManualContributionDialog extends StatefulWidget {
  const ManualContributionDialog({super.key});

  static Future<void> show(BuildContext context) => showDialog(
    context: context,
    builder: (_) => const ManualContributionDialog(),
  );

  @override
  State<ManualContributionDialog> createState() =>
      _ManualContributionDialogState();
}

class _ManualContributionDialogState extends State<ManualContributionDialog> {
  final _formKey = GlobalKey<FormState>();
  final _donorName = TextEditingController();
  final _tithe = TextEditingController();
  final _offering = TextEditingController();
  final _notes = TextEditingController();
  bool _appUser = true;
  User? _user;
  String? _method;
  DateTime? _date = DateTime.now();

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      final users = useUsers(context, listen: false);
      if (users.users.isEmpty) users.load();
    });
  }

  @override
  void dispose() {
    for (final c in [_donorName, _tithe, _offering, _notes]) {
      c.dispose();
    }
    super.dispose();
  }

  Future<void> _submit() async {
    final tithe = parseMoney(_tithe.text);
    final offering = parseMoney(_offering.text);
    final name = _donorName.text.trim();
    final error = _appUser && _user == null
        ? 'Escolha a pessoa'
        : !_appUser && name.isEmpty
        ? 'Informe o nome de quem contribuiu'
        : tithe == null && offering == null
        ? 'Preencha o dízimo e/ou a oferta'
        : _method == null
        ? 'Escolha a forma de pagamento'
        : null;
    if (error != null) {
      showResult(context, ok: false, success: '', error: error);
      return;
    }

    final treasury = useTreasury(context, listen: false);
    final ok = await treasury.createManual(
      userId: _appUser ? _user!.id : null,
      donorName: _appUser ? null : name,
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
      error: treasury.error,
    );
    if (ok) Navigator.pop(context);
  }

  @override
  Widget build(BuildContext context) {
    final users = useUsers(context);
    final treasury = useTreasury(context);

    return FormDialog(
      title: 'Registrar contribuição',
      formKey: _formKey,
      submitLabel: 'Registrar',
      isSaving: treasury.isLoading,
      onSubmit: _submit,
      children: [
        SegmentedButton<bool>(
          showSelectedIcon: false,
          segments: const [
            ButtonSegment(
              value: true,
              icon: Icon(Icons.person_search),
              label: Text('Membro do app'),
            ),
            ButtonSegment(
              value: false,
              icon: Icon(Icons.person_add_alt),
              label: Text('Outra pessoa'),
            ),
          ],
          selected: {_appUser},
          onSelectionChanged: (v) => setState(() => _appUser = v.first),
        ),
        if (_appUser)
          Autocomplete<User>(
            displayStringForOption: (u) => u.name,
            optionsBuilder: (value) =>
                users.search(value.text, churchId: treasury.churchId).take(20),
            onSelected: (u) => setState(() => _user = u),
            fieldViewBuilder: (context, controller, focusNode, onSubmit) =>
                TextFormField(
                  controller: controller,
                  focusNode: focusNode,
                  onChanged: (_) => setState(() => _user = null),
                  decoration: InputDecoration(
                    labelText: 'Buscar pessoa pelo nome ou telefone',
                    prefixIcon: const Icon(Icons.search),
                    suffixIcon: _user != null
                        ? const Icon(Icons.check_circle)
                        : null,
                  ),
                ),
          )
        else
          CustomTextField(
            label: 'Nome de quem contribuiu',
            controller: _donorName,
            prefixIcon: Icons.person,
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
