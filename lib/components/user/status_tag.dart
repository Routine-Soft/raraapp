import 'package:flutter/material.dart';
import 'package:raraapp/components/shared/effects/motion.dart';

/// Status de participação em destaque: Presente (verde), Ausente (amarelo,
/// piscando para chamar atenção) e Se desligou do ministério (vermelho).
class StatusTag extends StatefulWidget {
  final String status;

  const StatusTag(this.status, {super.key});

  @override
  State<StatusTag> createState() => _StatusTagState();
}

class _StatusTagState extends State<StatusTag>
    with SingleTickerProviderStateMixin {
  late final _blink = AnimationController(
    vsync: this,
    duration: const Duration(milliseconds: 800),
  );

  bool get _absent => widget.status == 'Ausente';

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    _sync();
  }

  @override
  void didUpdateWidget(StatusTag old) {
    super.didUpdateWidget(old);
    _sync();
  }

  /// Só "Ausente" pisca (e nada pisca com "reduzir movimento" ligado).
  void _sync() {
    if (_absent && !reduceMotion(context)) {
      if (!_blink.isAnimating) _blink.repeat(reverse: true);
    } else {
      _blink
        ..stop()
        ..value = 1;
    }
  }

  @override
  void dispose() {
    _blink.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final (Color bg, Color fg, IconData icon) = switch (widget.status) {
      'Presente' => (
        const Color(0xFF1E8E3E),
        Colors.white,
        Icons.check_circle_outline,
      ),
      'Ausente' => (
        const Color(0xFFF5C518),
        Colors.black,
        Icons.warning_amber_rounded,
      ),
      _ => (const Color(0xFFD32F2F), Colors.white, Icons.block),
    };

    final tag = Container(
      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 5),
      decoration: BoxDecoration(
        color: bg,
        borderRadius: BorderRadius.circular(999),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        spacing: 6,
        children: [
          Icon(icon, size: 16, color: fg),
          Text(
            widget.status,
            style: TextStyle(
              color: fg,
              fontWeight: FontWeight.w700,
              fontSize: 13,
            ),
          ),
        ],
      ),
    );

    if (!_absent) return tag;
    return FadeTransition(
      opacity: Tween<double>(begin: 0.35, end: 1).animate(_blink),
      child: tag,
    );
  }
}
