import 'package:flutter/material.dart';
import 'package:raraapp/components/app/authenticated_app.dart';
import 'package:raraapp/components/app/signing_out_page.dart';
import 'package:raraapp/components/auth/complete_profile_page.dart';
import 'package:raraapp/components/auth/google_sign_in_button.dart';
import 'package:raraapp/components/shared/effects/fade_route.dart';
import 'package:raraapp/components/shared/effects/fade_slide_in.dart';
import 'package:raraapp/components/shared/effects/floating.dart';
import 'package:raraapp/components/shared/effects/gradient_text.dart';
import 'package:raraapp/components/shared/rara_logo.dart';
import 'package:raraapp/components/shared/showcase_page.dart';
import 'package:raraapp/components/user/password_form.dart';
import 'package:raraapp/hooks/use_auth.dart';

/// "Esqueceu a senha?": enquanto não há envio de email, a pessoa prova quem
/// é entrando com o Google (mesmo email da conta) e define uma senha nova.
class ForgotPasswordPage extends StatelessWidget {
  const ForgotPasswordPage({super.key});

  @override
  Widget build(BuildContext context) {
    final text = Theme.of(context).textTheme;
    final muted = Theme.of(
      context,
    ).colorScheme.onSurface.withValues(alpha: 0.75);

    Widget reveal(int order, Widget child) =>
        FadeSlideIn(delay: stagger(order), child: child);

    return ShowcasePage(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          reveal(1, Floating(child: const RaraLogo(height: 64))),
          const SizedBox(height: 16),
          reveal(
            2,
            GradientText(
              'Esqueceu a senha?',
              style: text.headlineMedium?.copyWith(fontWeight: FontWeight.w800),
            ),
          ),
          const SizedBox(height: 8),
          reveal(
            3,
            Text(
              'Entre com a conta Google do mesmo email que você usa no '
              'Rara App. Em seguida você define uma senha nova.',
              textAlign: TextAlign.center,
              style: text.bodyMedium?.copyWith(color: muted),
            ),
          ),
          const SizedBox(height: 32),
          reveal(
            4,
            GoogleSignInButton(
              // Email sem conta vira conta nova: completa o cadastro
              next: (auth) => auth.needsProfile
                  ? const CompleteProfilePage()
                  : const ResetPasswordPage(),
            ),
          ),
          const SizedBox(height: 12),
          TextButton(
            onPressed: () => Navigator.of(context).pop(),
            child: const Text('Voltar para o login'),
          ),
        ],
      ),
    );
  }
}

/// Nova senha sem pedir a antiga: depois do Google no "Esqueceu a senha?"
/// ou no 1º acesso com a senha provisória. Sem [canSkip] (entrou com "123"),
/// só sai daqui trocando a senha ou saindo da conta.
class ResetPasswordPage extends StatelessWidget {
  final bool canSkip;

  const ResetPasswordPage({super.key, this.canSkip = true});

  void _go(BuildContext context, Widget page) =>
      Navigator.of(context).pushAndRemoveUntil(fadeRoute(page), (_) => false);

  @override
  Widget build(BuildContext context) {
    return ShowcasePage(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          PasswordForm(onSaved: () => _go(context, const AuthenticatedApp())),
          const SizedBox(height: 12),
          canSkip
              ? TextButton(
                  onPressed: () => _go(context, const AuthenticatedApp()),
                  child: const Text('Agora não'),
                )
              : TextButton.icon(
                  onPressed: () => SigningOutPage.open(context),
                  icon: const Icon(Icons.logout),
                  label: const Text('Sair'),
                ),
        ],
      ),
    );
  }
}

/// Primeira tela depois de entrar: termina o cadastro (sem igreja) ou pede
/// a troca da senha provisória.
Widget homeAfterLogin(AuthHook auth) => auth.needsProfile
    ? const CompleteProfilePage()
    : auth.mustChangePassword
    ? ResetPasswordPage(canSkip: auth.viaGoogle)
    : const AuthenticatedApp();
