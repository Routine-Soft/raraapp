import 'dart:math' as math;

import 'package:flutter/material.dart';
import 'package:raraapp/components/shared/effects/gradient_text.dart';
import 'package:raraapp/components/shared/effects/motion.dart';
import 'package:raraapp/components/shared/rara_logo.dart';
import 'package:raraapp/components/theme/app_palette.dart';
import 'package:raraapp/components/theme/app_theme.dart';
import 'package:raraapp/hooks/use_appearance.dart';

/// Abertura animada (sempre no visual do modo escuro, emendando com a
/// abertura nativa preta): a chama surge crescendo com um brilho vermelho,
/// fica "viva" (tremula e solta faíscas) e o nome aparece embaixo.
/// [onFinished] é chamado quando a entrada termina.
class IntroSplash extends StatefulWidget {
  final VoidCallback onFinished;

  const IntroSplash({super.key, required this.onFinished});

  /// Duração da entrada (a chama continua viva enquanto o app carrega).
  static const duration = Duration(milliseconds: 2400);

  @override
  State<IntroSplash> createState() => _IntroSplashState();
}

class _IntroSplashState extends State<IntroSplash>
    with TickerProviderStateMixin {
  late final _intro = AnimationController(
    vsync: this,
    duration: IntroSplash.duration,
  );

  /// Tremulação da chama e faíscas (repete enquanto a tela está aberta).
  late final _alive = AnimationController(
    vsync: this,
    duration: const Duration(seconds: 3),
  );

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    if (_intro.isAnimating || _intro.isCompleted) return;
    if (reduceMotion(context)) {
      _intro.value = 1;
      Future.delayed(const Duration(milliseconds: 600), widget.onFinished);
    } else {
      _alive.repeat();
      _intro.forward().whenComplete(widget.onFinished);
    }
  }

  @override
  void dispose() {
    _intro.dispose();
    _alive.dispose();
    super.dispose();
  }

  Animation<double> _interval(double begin, double end, Curve curve) =>
      CurvedAnimation(
        parent: _intro,
        curve: Interval(begin, end, curve: curve),
      );

  @override
  Widget build(BuildContext context) {
    final grow = _interval(0.0, 0.45, Curves.easeOutBack);
    final appear = _interval(0.0, 0.25, Curves.easeOut);
    final title = _interval(0.45, 0.75, Curves.easeOutCubic);
    final subtitle = _interval(0.6, 0.9, Curves.easeOut);

    return Theme(
      data: buildAppTheme(AppMode.dark),
      child: Builder(
        builder: (context) {
          final text = Theme.of(context).textTheme;
          return Scaffold(
            backgroundColor: AppPalette.black,
            body: AnimatedBuilder(
              animation: Listenable.merge([_intro, _alive]),
              builder: (context, _) {
                final t = _alive.value * 2 * math.pi;
                // Respira: o brilho pulsa e a chama balança de leve
                final pulse = 0.5 + 0.5 * math.sin(t * 2);
                return Stack(
                  children: [
                    Positioned.fill(
                      child: CustomPaint(
                        painter: _EmbersPainter(
                          progress: _alive.value,
                          opacity: appear.value,
                        ),
                      ),
                    ),
                    Center(
                      child: Column(
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          SizedBox.square(
                            dimension: 220,
                            child: Stack(
                              alignment: Alignment.center,
                              children: [
                                // Brilho vermelho atrás da chama
                                Opacity(
                                  opacity: appear.value,
                                  child: Container(
                                    width: 150 + 40 * pulse,
                                    height: 150 + 40 * pulse,
                                    decoration: BoxDecoration(
                                      shape: BoxShape.circle,
                                      gradient: RadialGradient(
                                        colors: [
                                          AppPalette.red.withValues(
                                            alpha: 0.55 + 0.2 * pulse,
                                          ),
                                          AppPalette.red.withValues(alpha: 0),
                                        ],
                                      ),
                                    ),
                                  ),
                                ),
                                Opacity(
                                  opacity: appear.value,
                                  child: Transform(
                                    alignment: Alignment.bottomCenter,
                                    transform: Matrix4.identity()
                                      ..scaleByDouble(
                                        grow.value,
                                        grow.value *
                                            (1 + 0.035 * math.sin(t * 3)),
                                        1,
                                        1,
                                      )
                                      ..rotateZ(0.025 * math.sin(t * 2)),
                                    child: const RaraLogo(height: 120),
                                  ),
                                ),
                              ],
                            ),
                          ),
                          const SizedBox(height: 8),
                          Opacity(
                            opacity: title.value,
                            child: Transform.translate(
                              offset: Offset(0, 24 * (1 - title.value)),
                              child: GradientText(
                                'Rara App',
                                style: text.displaySmall?.copyWith(
                                  fontWeight: FontWeight.w800,
                                  letterSpacing: 1.5,
                                ),
                              ),
                            ),
                          ),
                          const SizedBox(height: 6),
                          Opacity(
                            opacity: subtitle.value,
                            child: Text(
                              'o Aplicativo da Comunhão Rara',
                              style: text.bodyLarge?.copyWith(
                                color: Colors.white.withValues(alpha: 0.7),
                              ),
                            ),
                          ),
                        ],
                      ),
                    ),
                  ],
                );
              },
            ),
          );
        },
      ),
    );
  }
}

/// Faíscas subindo em volta da chama.
class _EmbersPainter extends CustomPainter {
  final double progress;
  final double opacity;

  _EmbersPainter({required this.progress, required this.opacity});

  static final _embers = List.generate(28, (i) {
    final r = math.Random(i * 7919);
    return (
      x: (r.nextDouble() - 0.5) * 0.55, // em volta do centro
      speed: 0.6 + r.nextDouble() * 0.9,
      phase: r.nextDouble(),
      size: 1.2 + r.nextDouble() * 2.6,
      drift: (r.nextDouble() - 0.5) * 30,
    );
  });

  @override
  void paint(Canvas canvas, Size size) {
    if (opacity == 0) return;
    final paint = Paint();
    for (final e in _embers) {
      // 0 = nasce embaixo da chama, 1 = some lá em cima
      final life = (progress * e.speed + e.phase) % 1;
      final y = size.height * (0.62 - life * 0.55);
      final x =
          size.width * (0.5 + e.x) +
          e.drift * math.sin((life + e.phase) * 2 * math.pi);
      final fade = math.sin(life * math.pi); // acende e apaga
      paint.color = Color.lerp(
        const Color(0xFFFFB13B),
        AppPalette.red,
        life,
      )!.withValues(alpha: 0.8 * fade * opacity);
      canvas.drawCircle(Offset(x, y), e.size * (1 - life * 0.5), paint);
    }
  }

  @override
  bool shouldRepaint(_EmbersPainter old) =>
      old.progress != progress || old.opacity != opacity;
}
