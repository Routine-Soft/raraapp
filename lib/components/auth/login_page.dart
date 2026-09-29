import 'package:flutter/material.dart';
import 'package:raraapp/components/app/authenticated_app.dart';
import 'package:raraapp/components/auth/register_page.dart';
import 'package:raraapp/components/shared/custom_text_field.dart';
import 'package:raraapp/components/shared/feedback.dart';
import 'package:raraapp/components/shared/input_formatters.dart';
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

  @override
  void dispose() {
    _email.dispose();
    _password.dispose();
    super.dispose();
  }

  Future<void> _login() async {
    if (!_formKey.currentState!.validate()) return;

    final auth = useAuth(context, listen: false);
    final ok = await auth.login(_email.text.trim(), _password.text);
    if (!mounted) return;

    showResult(
      context,
      ok: ok,
      success: 'Bem-vindo, ${auth.user?.name}!',
      error: auth.error ?? 'Falha ao fazer login',
    );
    if (ok) {
      Navigator.of(context).pushAndRemoveUntil(
        MaterialPageRoute(builder: (_) => const AuthenticatedApp()),
        (_) => false,
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    final isLoading = useAuth(context).isLoading;

    return Scaffold(
      appBar: AppBar(
        title: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            Image.asset('assets/images/logorara.png', width: 32, height: 32),
            const SizedBox(width: 8),
            const Text('Rara - Login'),
          ],
        ),
        centerTitle: true,
        elevation: 0,
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Form(
          key: _formKey,
          child: Column(
            children: [
              const SizedBox(height: 40),
              Image.asset('assets/images/logorara.png', width: 64, height: 64),
              const SizedBox(height: 16),
              const Text(
                'Rara App',
                style: TextStyle(fontSize: 28, fontWeight: FontWeight.bold),
              ),
              const Text(
                'Plataforma de aprendizado cristão',
                style: TextStyle(fontSize: 14, color: Colors.grey),
              ),
              const SizedBox(height: 40),
              CustomTextField(
                label: 'Email',
                hintText: 'seu@email.com',
                controller: _email,
                prefixIcon: Icons.email,
                keyboardType: TextInputType.emailAddress,
                validator: RegisterValidators.validateEmail,
                inputFormatters: [LowercaseNoSpaceFormatter()],
              ),
              const SizedBox(height: 16),
              CustomTextField(
                label: 'Senha',
                controller: _password,
                prefixIcon: Icons.lock,
                obscureText: true,
                validator: RegisterValidators.validatePassword,
              ),
              const SizedBox(height: 24),
              SizedBox(
                width: double.infinity,
                child: ElevatedButton.icon(
                  onPressed: isLoading ? null : _login,
                  icon: isLoading
                      ? const SizedBox(
                          height: 20,
                          width: 20,
                          child: CircularProgressIndicator(strokeWidth: 2),
                        )
                      : const Icon(Icons.login),
                  label: Text(
                    isLoading ? 'Entrando...' : 'Entrar',
                    style: const TextStyle(fontSize: 16),
                  ),
                  style: ElevatedButton.styleFrom(
                    padding: const EdgeInsets.symmetric(vertical: 12),
                  ),
                ),
              ),
              const SizedBox(height: 16),
              TextButton(
                onPressed: () => ScaffoldMessenger.of(context).showSnackBar(
                  const SnackBar(
                    content: Text('Funcionalidade em desenvolvimento'),
                  ),
                ),
                child: const Text('Esqueceu a senha?'),
              ),
              const Divider(height: 32),
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  const Text('Não tem conta? '),
                  TextButton(
                    onPressed: () => Navigator.of(context).push(
                      MaterialPageRoute(builder: (_) => const RegisterPage()),
                    ),
                    child: const Text(
                      'Criar conta',
                      style: TextStyle(fontWeight: FontWeight.bold),
                    ),
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }
}
