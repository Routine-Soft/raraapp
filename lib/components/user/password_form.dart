import 'package:flutter/material.dart';
import 'package:raraapp/components/shared/custom_text_field.dart';
import 'package:raraapp/components/shared/effects/glow_button.dart';
import 'package:raraapp/components/shared/feedback.dart';
import 'package:raraapp/components/shared/input_formatters.dart';
import 'package:raraapp/components/shared/section.dart';
import 'package:raraapp/hooks/use_auth.dart';
import 'package:raraapp/utils/validators.dart';

/// Criar / redefinir / alterar senha, conforme a sessão:
/// - conta sem senha (criada pelo Google) → "Criar senha";
/// - senha provisória do facilitador ("123") → "Crie sua senha";
/// - entrou pelo Google → "Redefinir senha", sem pedir a atual;
/// - entrou com email e senha → "Alterar senha", pedindo a atual.
class PasswordForm extends StatefulWidget {
  /// Chamado depois de salvar com sucesso.
  final VoidCallback? onSaved;

  const PasswordForm({super.key, this.onSaved});

  @override
  State<PasswordForm> createState() => _PasswordFormState();
}

enum _Mode { create, provisional, reset, change }

class _PasswordFormState extends State<PasswordForm> {
  final _formKey = GlobalKey<FormState>();
  final _current = TextEditingController();
  final _new = TextEditingController();
  final _confirm = TextEditingController();

  @override
  void dispose() {
    _current.dispose();
    _new.dispose();
    _confirm.dispose();
    super.dispose();
  }

  _Mode _mode(AuthHook auth) {
    if (!(auth.user?.hasPassword ?? true)) return _Mode.create;
    if (auth.mustChangePassword) return _Mode.provisional;
    return auth.canSkipCurrentPassword ? _Mode.reset : _Mode.change;
  }

  Future<void> _submit() async {
    if (!_formKey.currentState!.validate()) return;
    final auth = useAuth(context, listen: false);
    final mode = _mode(auth);
    final ok = await auth.changePassword(
      mode == _Mode.change ? _current.text : '',
      _new.text,
    );
    if (!mounted) return;
    showResult(
      context,
      ok: ok,
      success: switch (mode) {
        _Mode.create =>
          'Senha criada! Agora você também pode entrar com email e senha.',
        _Mode.provisional => 'Senha criada! Use ela nos próximos acessos.',
        _Mode.reset => 'Senha redefinida com sucesso!',
        _Mode.change => 'Senha alterada com sucesso!',
      },
      error: auth.error,
    );
    if (!ok) return;
    _current.clear();
    _new.clear();
    _confirm.clear();
    widget.onSaved?.call();
  }

  String? _required(String? v) => (v ?? '').isEmpty ? 'Obrigatório' : null;

  @override
  Widget build(BuildContext context) {
    final auth = useAuth(context);
    final mode = _mode(auth);
    final hint = switch (mode) {
      _Mode.create =>
        'Você entra com o Google. Crie uma senha para também poder entrar '
            'com email e senha.',
      _Mode.provisional =>
        'Sua senha atual é provisória. Crie uma senha só sua para usar nos '
            'próximos acessos.',
      _Mode.reset =>
        'Você entrou com o Google, então pode definir uma nova senha sem '
            'informar a atual.',
      _Mode.change => null,
    };

    return Form(
      key: _formKey,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        spacing: 28,
        children: [
          FormSection(
            title: switch (mode) {
              _Mode.create => 'Criar senha',
              _Mode.provisional => 'Crie sua senha',
              _Mode.reset => 'Redefinir senha',
              _Mode.change => 'Alterar senha',
            },
            icon: Icons.lock_outline,
            children: [
              if (hint != null)
                Text(hint, style: Theme.of(context).textTheme.bodyMedium)
              else
                CustomTextField(
                  label: 'Senha Atual',
                  controller: _current,
                  obscureText: true,
                  prefixIcon: Icons.lock,
                  validator: _required,
                ),
              CustomTextField(
                label: mode == _Mode.change || mode == _Mode.reset
                    ? 'Nova Senha'
                    : 'Senha',
                controller: _new,
                obscureText: true,
                prefixIcon: Icons.lock_reset,
                validator: RegisterValidators.validatePassword,
                inputFormatters: [NoSpaceFormatter()],
              ),
              CustomTextField(
                label: mode == _Mode.change || mode == _Mode.reset
                    ? 'Confirmar Nova Senha'
                    : 'Confirmar Senha',
                controller: _confirm,
                obscureText: true,
                prefixIcon: Icons.lock_reset,
                validator: (v) => v != _new.text ? 'Senhas não conferem' : null,
              ),
            ],
          ),
          GlowButton(
            label: switch (mode) {
              _Mode.create || _Mode.provisional => 'Criar Senha',
              _Mode.reset => 'Redefinir Senha',
              _Mode.change => 'Alterar Senha',
            },
            icon: Icons.save,
            loading: auth.isLoading,
            onPressed: _submit,
          ),
        ],
      ),
    );
  }
}
