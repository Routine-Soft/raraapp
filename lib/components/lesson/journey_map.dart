import 'dart:math' as math;

import 'package:flutter/material.dart';
import 'package:raraapp/api/lesson_api.dart';
import 'package:raraapp/components/gift_test/gift_test_quiz_page.dart';
import 'package:raraapp/components/gift_test/gift_test_result_page.dart';
import 'package:raraapp/components/lesson/lesson_study_dialog.dart';
import 'package:raraapp/components/shared/effects/motion.dart';
import 'package:raraapp/hooks/use_auth.dart';
import 'package:raraapp/hooks/use_gift_tests.dart';
import 'package:raraapp/hooks/use_lesson_progress.dart';
import 'package:raraapp/hooks/use_lessons.dart';

/// Uma etapa da jornada: uma aula ou um Teste dos Dons.
class _Step {
  final String? module; // null = Teste dos Dons
  final bool done;
  final VoidCallback onTap;

  const _Step({required this.module, required this.done, required this.onTap});
}

/// "Mapa do Mario" do Avançai: todas as aulas + os Testes dos Dons numa
/// trilha que vai e volta (zigue-zague). Etapas feitas ficam acesas, a
/// atual pulsa com o "você está aqui" e o troféu espera no fim.
class JourneyMap extends StatefulWidget {
  const JourneyMap({super.key});

  @override
  State<JourneyMap> createState() => _JourneyMapState();
}

class _JourneyMapState extends State<JourneyMap>
    with SingleTickerProviderStateMixin {
  late final _pulse = AnimationController(
    vsync: this,
    duration: const Duration(milliseconds: 1100),
  );

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback(
      (_) => useGiftTests(context, listen: false).ensureLoaded(),
    );
  }

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    if (reduceMotion(context)) {
      _pulse.stop();
    } else if (!_pulse.isAnimating) {
      _pulse.repeat(reverse: true);
    }
  }

  @override
  void dispose() {
    _pulse.dispose();
    super.dispose();
  }

  List<_Step> _steps(BuildContext context) {
    final byModule = useLessons(context).byModule;
    final progress = useLessonProgress(context);
    final user = useAuth(context).user;
    final tests = useGiftTests(context);
    return [
      for (final module in lessonModules)
        for (final lesson in byModule[module] ?? const <Lesson>[])
          _Step(
            module: module,
            done: progress.mineForLesson(lesson.id) != null,
            onTap: () => LessonStudyDialog.show(context, lesson),
          ),
      for (final test in tests.tests)
        _Step(
          module: null,
          done: user?.giftTest(test.key) != null,
          onTap: () => user?.giftTest(test.key) != null
              ? GiftTestResultPage.open(context, test.key)
              : GiftTestQuizPage.open(context, test, tests.catalog!.answers),
        ),
    ];
  }

  @override
  Widget build(BuildContext context) {
    final steps = _steps(context);
    if (steps.isEmpty) return const SizedBox();

    final scheme = Theme.of(context).colorScheme;
    final text = Theme.of(context).textTheme;
    final done = steps.where((s) => s.done).length;
    final current = steps.indexWhere((s) => !s.done); // -1 = terminou tudo

    return Card(
      margin: EdgeInsets.zero,
      child: Padding(
        padding: const EdgeInsets.fromLTRB(12, 16, 12, 16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 4),
              child: Row(
                children: [
                  Icon(Icons.map_outlined, color: scheme.primary),
                  const SizedBox(width: 8),
                  Expanded(
                    child: Text(
                      'Sua jornada',
                      style: text.titleMedium?.copyWith(
                        fontWeight: FontWeight.w800,
                      ),
                    ),
                  ),
                  Text(
                    '$done de ${steps.length} conquistas',
                    style: text.labelLarge?.copyWith(
                      fontWeight: FontWeight.w700,
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 12),
            LayoutBuilder(
              builder: (context, constraints) => _Trail(
                steps: steps,
                current: current,
                width: constraints.maxWidth,
                pulse: _pulse,
              ),
            ),
          ],
        ),
      ),
    );
  }
}

/// A trilha em zigue-zague com os círculos numerados.
class _Trail extends StatelessWidget {
  final List<_Step> steps;
  final int current;
  final double width;
  final Animation<double> pulse;

  const _Trail({
    required this.steps,
    required this.current,
    required this.width,
    required this.pulse,
  });

  static const _node = 34.0;
  static const _rowHeight = 74.0;

  /// Margem lateral: espaço para a curva da trilha na virada de linha.
  static const _side = _rowHeight / 2 + 4;
  static const _top = 26.0; // espaço para o nome do módulo e o bonequinho

  @override
  Widget build(BuildContext context) {
    final scheme = Theme.of(context).colorScheme;
    final text = Theme.of(context).textTheme;

    // Quantos círculos cabem por linha (o troféu ocupa o último lugar)
    final usable = width - 2 * _side;
    final perRow = math.max(3, (usable / 46).floor() + 1);
    final gap = usable / (perRow - 1);
    final total = steps.length + 1; // + troféu
    final rows = (total / perRow).ceil();

    Offset center(int i) {
      final row = i ~/ perRow;
      final col = i % perRow;
      // linhas ímpares voltam da direita para a esquerda
      final x = _side + (row.isEven ? col : perRow - 1 - col) * gap;
      return Offset(x, _top + _node / 2 + row * _rowHeight);
    }

    final height = _top + _node + (rows - 1) * _rowHeight + 8;
    final reached = current == -1 ? steps.length : current;

    return SizedBox(
      height: height,
      child: Stack(
        clipBehavior: Clip.none,
        children: [
          Positioned.fill(
            child: CustomPaint(
              painter: _TrailPainter(
                points: [for (var i = 0; i < total; i++) center(i)],
                reached: reached,
                done: scheme.primary,
                todo: scheme.onSurface.withValues(alpha: 0.18),
              ),
            ),
          ),
          for (var i = 0; i < steps.length; i++) ...[
            // Nome do módulo onde ele começa
            if (i == 0 || steps[i].module != steps[i - 1].module)
              Positioned(
                left: center(i).dx - 40,
                width: 80,
                top: center(i).dy - _node / 2 - 18,
                child: Text(
                  steps[i].module == null
                      ? 'DONS'
                      : moduleLabel(steps[i].module!).split(' ').first,
                  textAlign: TextAlign.center,
                  style: text.labelSmall?.copyWith(
                    fontWeight: FontWeight.w800,
                    letterSpacing: 0.8,
                    color: scheme.primary,
                  ),
                ),
              ),
            Positioned(
              left: center(i).dx - _node / 2,
              top: center(i).dy - _node / 2,
              child: _Node(
                number: i + 1,
                done: steps[i].done,
                isCurrent: i == current,
                isTest: steps[i].module == null,
                pulse: pulse,
                onTap: steps[i].onTap,
              ),
            ),
          ],
          // Troféu no fim da trilha
          Positioned(
            left: center(steps.length).dx - _node / 2,
            top: center(steps.length).dy - _node / 2,
            child: Tooltip(
              message: 'Membro no culto da família!',
              child: Container(
                width: _node,
                height: _node,
                decoration: BoxDecoration(
                  shape: BoxShape.circle,
                  color: current == -1
                      ? const Color(0xFFF5C518)
                      : scheme.surfaceContainerHigh,
                ),
                child: Icon(
                  Icons.emoji_events,
                  size: 20,
                  color: current == -1
                      ? Colors.black
                      : scheme.onSurface.withValues(alpha: 0.5),
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}

class _Node extends StatelessWidget {
  final int number;
  final bool done;
  final bool isCurrent;
  final bool isTest;
  final Animation<double> pulse;
  final VoidCallback onTap;

  const _Node({
    required this.number,
    required this.done,
    required this.isCurrent,
    required this.isTest,
    required this.pulse,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    final scheme = Theme.of(context).colorScheme;
    const size = _Trail._node;

    final circle = Container(
      width: size,
      height: size,
      alignment: Alignment.center,
      decoration: BoxDecoration(
        shape: BoxShape.circle,
        color: done
            ? scheme.primary
            : isCurrent
            ? scheme.surface
            : scheme.surfaceContainerHigh,
        border: Border.all(
          color: done || isCurrent ? scheme.primary : scheme.outlineVariant,
          width: isCurrent ? 2.5 : 1.5,
        ),
      ),
      child: isTest && !done
          ? Icon(
              Icons.auto_awesome,
              size: 16,
              color: isCurrent
                  ? scheme.primary
                  : scheme.onSurface.withValues(alpha: 0.5),
            )
          : Text(
              '$number',
              style: TextStyle(
                fontSize: 13,
                fontWeight: FontWeight.w800,
                color: done
                    ? scheme.onPrimary
                    : isCurrent
                    ? scheme.primary
                    : scheme.onSurface.withValues(alpha: 0.5),
              ),
            ),
    );

    return Semantics(
      button: true,
      label:
          '${isTest ? 'Teste dos Dons' : 'Etapa'} $number'
          '${done
              ? ', concluída'
              : isCurrent
              ? ', próxima'
              : ''}',
      child: GestureDetector(
        onTap: onTap,
        child: isCurrent
            // A próxima etapa pulsa e tem o "você está aqui"
            ? AnimatedBuilder(
                animation: pulse,
                builder: (context, child) => Stack(
                  clipBehavior: Clip.none,
                  alignment: Alignment.center,
                  children: [
                    Container(
                      width: size + 14 * pulse.value,
                      height: size + 14 * pulse.value,
                      decoration: BoxDecoration(
                        shape: BoxShape.circle,
                        color: scheme.primary.withValues(
                          alpha: 0.28 * (1 - pulse.value),
                        ),
                      ),
                    ),
                    child!,
                    Positioned(
                      top: -22 - 3 * pulse.value,
                      child: Icon(
                        Icons.directions_walk,
                        size: 20,
                        color: scheme.primary,
                      ),
                    ),
                  ],
                ),
                child: circle,
              )
            : circle,
      ),
    );
  }
}

/// Linha da trilha: retas entre os círculos e meias-voltas nas viradas.
/// O trecho já percorrido fica colorido; o resto, apagado.
class _TrailPainter extends CustomPainter {
  final List<Offset> points;
  final int reached; // quantas etapas já foram feitas (em sequência)
  final Color done;
  final Color todo;

  _TrailPainter({
    required this.points,
    required this.reached,
    required this.done,
    required this.todo,
  });

  @override
  void paint(Canvas canvas, Size size) {
    for (var i = 0; i < points.length - 1; i++) {
      final a = points[i];
      final b = points[i + 1];
      final paint = Paint()
        ..color = i < reached ? done : todo
        ..strokeWidth = 5
        ..style = PaintingStyle.stroke
        ..strokeCap = StrokeCap.round;
      if ((a.dy - b.dy).abs() < 1) {
        canvas.drawLine(a, b, paint);
      } else {
        // Virada de linha: meia-volta para fora da trilha
        final radius = (b.dy - a.dy) / 2;
        final rightSide = a.dx > size.width / 2;
        final rect = Rect.fromCircle(
          center: Offset(a.dx, a.dy + radius),
          radius: radius,
        );
        canvas.drawArc(
          rect,
          -math.pi / 2,
          rightSide ? math.pi : -math.pi,
          false,
          paint,
        );
      }
    }
  }

  @override
  bool shouldRepaint(_TrailPainter old) =>
      old.reached != reached ||
      old.points.length != points.length ||
      old.done != done ||
      old.todo != todo;
}
