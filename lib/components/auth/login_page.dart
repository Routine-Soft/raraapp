import 'package:flutter/material.dart';
import 'package:raraapp/components/auth/forgot_password_page.dart';
import 'package:raraapp/components/auth/google_sign_in_button.dart';
import 'package:raraapp/components/auth/register_page.dart';
import 'package:raraapp/components/shared/custom_text_field.dart';
import 'package:raraapp/components/shared/effects/fade_route.dart';
import 'package:raraapp/components/shared/effects/fade_slide_in.dart';
import 'package:raraapp/components/shared/effects/floating.dart';
import 'package:raraapp/components/shared/effects/glow_button.dart';
import 'package:raraapp/components/shared/effects/gradient_text.dart';
import 'package:raraapp/components/shared/feedback.dart';
import 'package:raraapp/components/shared/input_formatters.dart';
import 'package:raraapp/components/shared/or_divider.dart';
import 'package:raraapp/components/shared/rara_logo.dart';
import 'package:raraapp/components/shared/showcase_page.dart';
import 'package:raraapp/hooks/use_auth.dart';
import 'package:raraapp/utils/validators.dart';

class LoginPage extends StatefulWidget {
  const LoginPage({super.key});

  @override
  State<LoginPage> createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  final _formKey = GlobalKey<FormState>();
  final _email = TextEditingController();
  final _password = TextEditingController();
  bool _remember = false;

  @override
  void initState() {
    super.initState();
    _fillRemembered();
  }

  /// Preenche com os dados lembrados no último login, se houver.
  Future<void> _fillRemembered() async {
    final saved = await useAuth(context, listen: false).rememberedLogin();
    if (saved == null || !mounted) return;
    setState(() {
      _email.text = saved.email;
      _password.text = saved.password;
      _remember = true;
    });
  }

  @override
  void dispose() {
    _email.dispose();
    _password.dispose();
    super.dispose();
  }

  Future<void> _login() async {
    if (!_formKey.currentState!.validate()) return;

    final auth = useAuth(context, listen: false);
    final ok = await auth.login(
      _email.text.trim(),
      _password.text,
      remember: _remember,
    );
    if (!mounted) return;

    showResult(
      context,
      ok: ok,
      success: 'Bem-vindo, ${auth.user?.name}!',
      error: auth.error ?? 'Falha ao fazer login',
    );
    if (ok) {
      Navigator.of(
        context,
      ).pushAndRemoveUntil(fadeRoute(homeAfterLogin(auth)), (_) => false);
    }
  }

  @override
  Widget build(BuildContext context) {
    final isLoading = useAuth(context).isLoading;

    final text = Theme.of(context).textTheme;
    final scheme = Theme.of(context).colorScheme;

    // Cada item entra com um pequeno atraso em relação ao anterior (cascata).
    Widget reveal(int order, Widget child) =>
        FadeSlideIn(delay: stagger(order), child: child);

    return ShowcasePage(
      child: Form(
        key: _formKey,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            reveal(1, Floating(child: const RaraLogo(height: 80))),
            const SizedBox(height: 16),
            reveal(
              2,
              GradientText(
                'Rara App',
                style: text.headlineLarge?.copyWith(
                  fontWeight: FontWeight.w800,
                ),
              ),
            ),
            reveal(
              3,
              Text(
                'Plataforma de aprendizado cristão',
                textAlign: TextAlign.center,
                style: text.bodyMedium?.copyWith(
                  color: scheme.onSurface.withValues(alpha: 0.75),
                ),
              ),
            ),
            const SizedBox(height: 32),
            reveal(
              4,
              CustomTextField(
                label: 'Email',
                hintText: 'seu@email.com',
                controller: _email,
                prefixIcon: Icons.email_outlined,
                keyboardType: TextInputType.emailAddress,
                validator: RegisterValidators.validateEmail,
                inputFormatters: [LowercaseNoSpaceFormatter()],
              ),
            ),
            const SizedBox(height: 16),
            reveal(
              5,
              CustomTextField(
                label: 'Senha',
                controller: _password,
                prefixIcon: Icons.lock_outline,
                obscureText: true,
                // Sem mínimo aqui: a senha provisória do facilitador é "123"
                validator: (v) => (v ?? '').isEmpty ? 'Informe a senha' : null,
              ),
            ),
            Row(
              children: [
                // "Lembrar meus dados": preenche email e senha no próximo login
                Expanded(
                  child: InkWell(
                    borderRadius: BorderRadius.circular(8),
                    onTap: () => setState(() => _remember = !_remember),
                    child: Row(
                      children: [
                        Checkbox(
                          visualDensity: VisualDensity.compact,
                          materialTapTargetSize:
                              MaterialTapTargetSize.shrinkWrap,
                          value: _remember,
                          onChanged: (v) =>
                              setState(() => _remember = v ?? false),
                        ),
                        const Flexible(
                          child: Text(
                            'Lembrar meus dados',
                            maxLines: 1,
                            overflow: TextOverflow.fade,
                            softWrap: false,
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
                TextButton(
                  style: TextButton.styleFrom(
                    padding: const EdgeInsets.symmetric(horizontal: 6),
                    visualDensity: VisualDensity.compact,
                  ),
                  onPressed: () => Navigator.of(
                    context,
                  ).push(fadeRoute(const ForgotPasswordPage())),
                  child: const Text('Esqueceu a senha?'),
                ),
              ],
            ),
            const SizedBox(height: 8),
            reveal(
              6,
              GlowButton(
                label: 'Entrar',
                icon: Icons.login,
                loading: isLoading,
                onPressed: _login,
              ),
            ),
            const SizedBox(height: 24),
            reveal(7, const OrDivider()),
            const SizedBox(height: 16),
            reveal(8, const GoogleSignInButton()),
            const SizedBox(height: 12),
            reveal(
              9,
              SizedBox(
                height: 54,
                child: OutlinedButton.icon(
                  onPressed: () => Navigator.of(
                    context,
                  ).push(fadeRoute(const RegisterPage())),
                  icon: const Icon(Icons.person_add_alt),
                  label: const Text('Criar conta'),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
