import 'package:flutter/material.dart';
import 'package:raraapp/components/shared/effects/fade_slide_in.dart';
import 'package:raraapp/components/shared/effects/floating.dart';
import 'package:raraapp/components/theme/app_effects.dart';

/// Lista vazia: ícone flutuando num círculo com brilho + mensagem + ação.
class EmptyState extends StatelessWidget {
  final IconData icon;
  final String message;
  final String? actionLabel;
  final VoidCallback? onAction;

  const EmptyState({
    super.key,
    required this.icon,
    required this.message,
    this.actionLabel,
    this.onAction,
  });

  @override
  Widget build(BuildContext context) {
    final scheme = Theme.of(context).colorScheme;
    final effects = AppEffects.of(context);

    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 48, horizontal: 24),
      child: FadeSlideIn(
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Floating(
              child: Container(
                width: 96,
                height: 96,
                decoration: BoxDecoration(
                  shape: BoxShape.circle,
                  gradient: RadialGradient(
                    colors: [effects.orbA, effects.orbA.withValues(alpha: 0)],
                  ),
                ),
                child: Icon(icon, size: 44, color: scheme.primary),
              ),
            ),
            const SizedBox(height: 16),
            Text(
              message,
              textAlign: TextAlign.center,
              style: Theme.of(context).textTheme.titleMedium?.copyWith(
                color: scheme.onSurface.withValues(alpha: 0.75),
              ),
            ),
            if (onAction != null) ...[
              const SizedBox(height: 20),
              ElevatedButton.icon(
                onPressed: onAction,
                icon: const Icon(Icons.add),
                label: Text(actionLabel ?? 'Criar'),
              ),
            ],
          ],
        ),
      ),
    );
  }
}
