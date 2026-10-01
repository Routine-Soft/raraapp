import 'package:flutter/material.dart';
import 'package:raraapp/components/shared/effects/motion.dart';
import 'package:raraapp/components/theme/app_effects.dart';

/// Botão principal com efeitos:
/// - hover: sobe um pouco, cresce 2% e o brilho aumenta (CSS: :hover +
///   transform + box-shadow + transition);
/// - toque: ondulação (ripple);
/// - carregando: troca o texto pelo spinner com crossfade.
class GlowButton extends StatefulWidget {
  final String label;
  final IconData? icon;
  final VoidCallback? onPressed;
  final bool loading;

  const GlowButton({
    super.key,
    required this.label,
    this.icon,
    this.onPressed,
    this.loading = false,
  });

  @override
  State<GlowButton> createState() => _GlowButtonState();
}

class _GlowButtonState extends State<GlowButton> {
  bool _hover = false;

  bool get _enabled => widget.onPressed != null && !widget.loading;

  @override
  Widget build(BuildContext context) {
    final scheme = Theme.of(context).colorScheme;
    final glow = AppEffects.of(context).glow;
    final lifted = _hover && _enabled && !reduceMotion(context);
    const duration = Duration(milliseconds: 200);
    final radius = BorderRadius.circular(14);

    return MouseRegion(
      cursor: _enabled ? SystemMouseCursors.click : SystemMouseCursors.basic,
      onEnter: (_) => setState(() => _hover = true),
      onExit: (_) => setState(() => _hover = false),
      child: AnimatedScale(
        scale: lifted ? 1.02 : 1,
        duration: duration,
        child: AnimatedSlide(
          offset: lifted ? const Offset(0, -0.04) : Offset.zero,
          duration: duration,
          child: AnimatedContainer(
            duration: duration,
            decoration: BoxDecoration(
              borderRadius: radius,
              boxShadow: [
                BoxShadow(
                  color: _enabled ? glow : Colors.transparent,
                  blurRadius: lifted ? 28 : 16,
                  spreadRadius: lifted ? 1 : 0,
                  offset: Offset(0, lifted ? 10 : 6),
                ),
              ],
            ),
            child: Material(
              color: _enabled
                  ? scheme.primary
                  : scheme.primary.withValues(alpha: 0.6),
              borderRadius: radius,
              child: InkWell(
                borderRadius: radius,
                onTap: _enabled ? widget.onPressed : null,
                child: SizedBox(
                  height: 54,
                  child: Center(
                    child: AnimatedSwitcher(
                      duration: duration,
                      child: widget.loading
                          ? SizedBox.square(
                              key: const ValueKey('loading'),
                              dimension: 22,
                              child: CircularProgressIndicator(
                                strokeWidth: 2.5,
                                color: scheme.onPrimary,
                              ),
                            )
                          // Texto longo ou letra grande: diminui para caber
                          : Padding(
                              key: const ValueKey('label'),
                              padding: const EdgeInsets.symmetric(
                                horizontal: 16,
                              ),
                              child: FittedBox(
                                fit: BoxFit.scaleDown,
                                child: Row(
                                  mainAxisSize: MainAxisSize.min,
                                  children: [
                                    if (widget.icon != null) ...[
                                      Icon(
                                        widget.icon,
                                        color: scheme.onPrimary,
                                      ),
                                      const SizedBox(width: 10),
                                    ],
                                    Text(
                                      widget.label,
                                      style: Theme.of(context)
                                          .textTheme
                                          .titleMedium
                                          ?.copyWith(
                                            color: scheme.onPrimary,
                                            fontWeight: FontWeight.w600,
                                          ),
                                    ),
                                  ],
                                ),
                              ),
                            ),
                    ),
                  ),
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }
}
