import 'dart:math' as math;

import 'package:flutter/material.dart';
import 'package:raraapp/components/auth/complete_profile_page.dart';
import 'package:raraapp/components/auth/forgot_password_page.dart';
import 'package:raraapp/components/shared/effects/fade_route.dart';
import 'package:raraapp/components/shared/feedback.dart';
import 'package:raraapp/hooks/use_auth.dart';

/// "Continuar com Google": entra (ou cria a conta) e segue para o app —
/// ou para completar o cadastro, se a conta ainda não tem igreja.
class GoogleSignInButton extends StatelessWidget {
  /// Tela depois do login (padrão: completar cadastro ou o app).
  final Widget Function(AuthHook auth)? next;

  const GoogleSignInButton({super.key, this.next});

  static Widget _defaultNext(AuthHook auth) =>
      auth.needsProfile ? const CompleteProfilePage() : homeAfterLogin(auth);

  Future<void> _signIn(BuildContext context) async {
    final auth = useAuth(context, listen: false);
    final ok = await auth.loginWithGoogle();
    if (!context.mounted) return;

    if (!ok && auth.error == null) return; // cancelou

    showResult(
      context,
      ok: ok,
      success: 'Bem-vindo, ${auth.user?.name}!',
      error: auth.error,
    );
    if (!ok) return;
    Navigator.of(
      context,
    ).pushAndRemoveUntil(fadeRoute((next ?? _defaultNext)(auth)), (_) => false);
  }

  @override
  Widget build(BuildContext context) {
    final isLoading = useAuth(context).isLoading;

    return SizedBox(
      height: 54,
      child: OutlinedButton.icon(
        onPressed: isLoading ? null : () => _signIn(context),
        icon: const SizedBox.square(
          dimension: 20,
          child: CustomPaint(painter: _GoogleLogoPainter()),
        ),
        label: const Text('Continuar com Google'),
      ),
    );
  }
}

/// O "G" colorido do Google, desenhado (sem precisar de asset).
class _GoogleLogoPainter extends CustomPainter {
  const _GoogleLogoPainter();

  static const _blue = Color(0xFF4285F4);
  static const _green = Color(0xFF34A853);
  static const _yellow = Color(0xFFFBBC05);
  static const _red = Color(0xFFEA4335);

  @override
  void paint(Canvas canvas, Size size) {
    final stroke = size.width * 0.2;
    final rect = Rect.fromLTWH(
      stroke / 2,
      stroke / 2,
      size.width - stroke,
      size.height - stroke,
    );
    Paint paint(Color color) => Paint()
      ..color = color
      ..style = PaintingStyle.stroke
      ..strokeWidth = stroke;

    double deg(double d) => d * math.pi / 180;

    // Ângulos no sentido horário a partir das 3 horas
    canvas.drawArc(rect, deg(-40), deg(-100), false, paint(_red));
    canvas.drawArc(rect, deg(-140), deg(-80), false, paint(_yellow));
    canvas.drawArc(rect, deg(140), deg(-100), false, paint(_green));
    canvas.drawArc(rect, deg(40), deg(-40), false, paint(_blue));

    // Barra horizontal do "G"
    canvas.drawRect(
      Rect.fromLTWH(
        size.width / 2,
        size.height / 2 - stroke / 2,
        size.width / 2,
        stroke,
      ),
      Paint()..color = _blue,
    );
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => false;
}
