import 'package:flutter/material.dart';
import 'package:raraapp/api/user_api.dart';
import 'package:raraapp/components/shared/custom_dropdown.dart';
import 'package:raraapp/components/shared/custom_text_field.dart';
import 'package:raraapp/components/shared/feedback.dart';
import 'package:raraapp/components/shared/form_dialog.dart';
import 'package:raraapp/hooks/use_users.dart';

/// Edita os dados de integração (facilitador, convite da graça, status).
class UserIntegrationDialog extends StatefulWidget {
  final User user;

  const UserIntegrationDialog({super.key, required this.user});

  static Future<void> show(BuildContext context, User user) => showDialog(
    context: context,
    builder: (_) => UserIntegrationDialog(user: user),
  );

  @override
  State<UserIntegrationDialog> createState() => _UserIntegrationDialogState();
}

class _UserIntegrationDialogState extends State<UserIntegrationDialog> {
  final _formKey = GlobalKey<FormState>();
  late final _facilitator = TextEditingController(
    text: widget.user.facilitator,
  );
  late String? _invitation = widget.user.invitationofgrace;
  late String? _status = widget.user.status;

  @override
  void dispose() {
    _facilitator.dispose();
    super.dispose();
  }

  Future<void> _submit() async {
    final users = useUsers(context, listen: false);
    final facilitator = _facilitator.text.trim();
    final ok = await users.updateIntegration(
      widget.user.id,
      facilitator: facilitator.isEmpty ? null : facilitator,
      invitationofgrace: _invitation,
      status: _status,
    );
    if (!mounted) return;
    showResult(
      context,
      ok: ok,
      success: 'Usuário atualizado com sucesso!',
      error: users.error,
    );
    if (ok) Navigator.pop(context);
  }

  @override
  Widget build(BuildContext context) {
    return FormDialog(
      title: 'Editar ${widget.user.name}',
      formKey: _formKey,
      submitLabel: 'Salvar',
      isSaving: useUsers(context).isLoading,
      onSubmit: _submit,
      children: [
        CustomTextField(
          label: 'Facilitador',
          prefixIcon: Icons.support_agent,
          controller: _facilitator,
          hintText: 'Nome do facilitador',
        ),
        CustomDropdown<String>(
          label: 'Convite da Graça',
          value: userInvitations.contains(_invitation) ? _invitation : null,
          items: userInvitations,
          onChanged: (v) => setState(() => _invitation = v),
        ),
        CustomDropdown<String>(
          label: 'Status',
          value: userStatuses.contains(_status) ? _status : null,
          items: userStatuses,
          onChanged: (v) => setState(() => _status = v),
        ),
      ],
    );
  }
}
