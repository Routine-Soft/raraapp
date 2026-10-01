import 'package:flutter/material.dart';
import 'package:raraapp/components/auth/login_page.dart';
import 'package:raraapp/components/auth/google_sign_in_button.dart';
import 'package:raraapp/components/auth/register_page.dart';
import 'package:raraapp/components/shared/effects/fade_route.dart';
import 'package:raraapp/components/shared/effects/fade_slide_in.dart';
import 'package:raraapp/components/shared/effects/floating.dart';
import 'package:raraapp/components/shared/effects/glow_button.dart';
import 'package:raraapp/components/shared/effects/gradient_text.dart';
import 'package:raraapp/components/shared/or_divider.dart';
import 'package:raraapp/components/shared/rara_logo.dart';
import 'package:raraapp/components/shared/showcase_page.dart';

class WelcomePage extends StatelessWidget {
  const WelcomePage({super.key});

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
          reveal(1, Floating(child: const RaraLogo(height: 96))),
          const SizedBox(height: 24),
          reveal(
            2,
            Text(
              'Seja bem-vindo ao',
              textAlign: TextAlign.center,
              style: text.titleMedium?.copyWith(color: muted),
            ),
          ),
          reveal(
            3,
            GradientText(
              'Rara App',
              style: text.displaySmall?.copyWith(fontWeight: FontWeight.w800),
            ),
          ),
          const SizedBox(height: 4),
          reveal(
            4,
            Text(
              'o Aplicativo da Comunhão Rara',
              textAlign: TextAlign.center,
              style: text.bodyLarge?.copyWith(color: muted),
            ),
          ),
          const SizedBox(height: 40),
          reveal(
            5,
            GlowButton(
              label: 'Entrar',
              icon: Icons.login,
              onPressed: () =>
                  Navigator.of(context).push(fadeRoute(const LoginPage())),
            ),
          ),
          const SizedBox(height: 24),
          reveal(6, const OrDivider()),
          const SizedBox(height: 16),
          reveal(7, const GoogleSignInButton()),
          const SizedBox(height: 12),
          reveal(
            8,
            SizedBox(
              height: 54,
              child: OutlinedButton.icon(
                onPressed: () =>
                    Navigator.of(context).push(fadeRoute(const RegisterPage())),
                icon: const Icon(Icons.person_add_alt),
                label: const Text('Criar conta'),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
