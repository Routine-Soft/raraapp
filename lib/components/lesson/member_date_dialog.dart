import 'package:flutter/material.dart';
import 'package:raraapp/api/user_api.dart';
import 'package:raraapp/components/shared/date_field.dart';
import 'package:raraapp/components/shared/feedback.dart';
import 'package:raraapp/components/shared/form_dialog.dart';
import 'package:raraapp/hooks/use_users.dart';

/// "Tornar membro": escolhe a data em que a pessoa virou membro (hoje, ou a
/// data real para quem já era membro há anos) e salva.
class MemberDateDialog extends StatefulWidget {
  final User user;

  const MemberDateDialog({super.key, required this.user});

  /// `true` quando salvou.
  static Future<bool> show(BuildContext context, User user) async =>
      await showDialog<bool>(
        context: context,
        builder: (_) => MemberDateDialog(user: user),
      ) ??
      false;

  @override
  State<MemberDateDialog> createState() => _MemberDateDialogState();
}

class _MemberDateDialogState extends State<MemberDateDialog> {
  final _formKey = GlobalKey<FormState>();
  late DateTime _date = widget.user.memberSince ?? _today;

  static DateTime get _today {
    final now = DateTime.now();
    return DateTime(now.year, now.month, now.day);
  }

  Future<void> _submit() async {
    final users = useUsers(context, listen: false);
    final ok = await users.setMember(widget.user.id, true, since: _date);
    if (!mounted) return;
    showResult(
      context,
      ok: ok,
      success: '${widget.user.name} agora é membro',
      error: users.error,
    );
    if (ok) Navigator.pop(context, true);
  }

  @override
  Widget build(BuildContext context) {
    final editing = widget.user.member;

    return FormDialog(
      title: editing ? 'Data de membro' : 'Tornar membro',
      formKey: _formKey,
      submitLabel: editing ? 'Salvar data' : 'Tornar membro',
      isSaving: useUsers(context).isLoading,
      onSubmit: _submit,
      children: [
        Text(
          'Em que data ${widget.user.name} se tornou membro? Para quem já era '
          'membro antes do app, escolha a data real — ela conta no relatório '
          'de novos membros por mês.',
        ),
        DateField(
          label: 'Membro desde',
          value: _date,
          onChanged: (d) => setState(() => _date = d ?? _date),
        ),
        Align(
          alignment: Alignment.centerLeft,
          child: TextButton.icon(
            onPressed: () => setState(() => _date = _today),
            icon: const Icon(Icons.today),
            label: const Text('Usar a data de hoje'),
          ),
        ),
      ],
    );
  }
}
