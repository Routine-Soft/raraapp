import 'package:flutter/material.dart';
import 'package:raraapp/components/theme/app_palette.dart';
import 'package:raraapp/hooks/use_appearance.dart';

const _modeLabels = {
  AppMode.dark: 'Modo escuro',
  AppMode.light: 'Modo claro',
  AppMode.red: 'Modo vermelho',
  AppMode.green: 'Modo verde',
};

/// Escolha do modo de cor + tamanho da letra (acessibilidade).
class AppearanceControls extends StatelessWidget {
  /// Versão baixa, sem títulos (card do menu lateral).
  final bool compact;

  const AppearanceControls({super.key, this.compact = false});

  @override
  Widget build(BuildContext context) {
    final appearance = useAppearance(context);
    final text = Theme.of(context).textTheme;
    final density = compact ? VisualDensity.compact : null;

    return Column(
      mainAxisSize: MainAxisSize.min,
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        if (!compact) ...[
          Text('Aparência', style: text.labelLarge),
          const SizedBox(height: 10),
        ],
        Wrap(
          spacing: 12,
          runSpacing: 8,
          children: [
            for (final mode in AppMode.values)
              _ModeSwatch(
                mode: mode,
                size: compact ? 36 : 44,
                selected: appearance.mode == mode,
                onTap: () => appearance.setMode(mode),
              ),
          ],
        ),
        SizedBox(height: compact ? 4 : 16),
        if (!compact) ...[
          Text('Tamanho da letra', style: text.labelLarge),
          const SizedBox(height: 6),
        ],
        Row(
          children: [
            IconButton.outlined(
              visualDensity: density,
              tooltip: 'Diminuir letra',
              onPressed: appearance.canDecreaseFont
                  ? appearance.decreaseFont
                  : null,
              icon: const Icon(Icons.text_decrease),
            ),
            Expanded(
              child: TextButton(
                style: TextButton.styleFrom(visualDensity: density),
                onPressed: appearance.resetFont,
                child: Text(
                  '${(appearance.fontScale * 100).round()}%',
                  semanticsLabel:
                      'Letra em ${(appearance.fontScale * 100).round()} por cento. Toque para voltar ao normal',
                ),
              ),
            ),
            IconButton.outlined(
              visualDensity: density,
              tooltip: 'Aumentar letra',
              onPressed: appearance.canIncreaseFont
                  ? appearance.increaseFont
                  : null,
              icon: const Icon(Icons.text_increase),
            ),
          ],
        ),
      ],
    );
  }
}

/// Bolinha com a cor do modo. A selecionada ganha um anel e um "check".
class _ModeSwatch extends StatelessWidget {
  final AppMode mode;
  final double size;
  final bool selected;
  final VoidCallback onTap;

  const _ModeSwatch({
    required this.mode,
    required this.size,
    required this.selected,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    final scheme = Theme.of(context).colorScheme;
    final (fill, icon, iconColor) = switch (mode) {
      AppMode.dark => (AppPalette.black, Icons.dark_mode, AppPalette.white),
      AppMode.light => (AppPalette.white, Icons.light_mode, AppPalette.black),
      AppMode.red => (AppPalette.red, Icons.favorite, AppPalette.white),
      AppMode.green => (AppPalette.green, Icons.eco, AppPalette.black),
    };

    return Tooltip(
      message: _modeLabels[mode],
      child: Semantics(
        button: true,
        selected: selected,
        label: _modeLabels[mode],
        child: InkWell(
          customBorder: const CircleBorder(),
          onTap: onTap,
          child: AnimatedContainer(
            duration: const Duration(milliseconds: 200),
            width: size,
            height: size,
            decoration: BoxDecoration(
              color: fill,
              shape: BoxShape.circle,
              border: Border.all(
                color: selected ? scheme.onSurface : scheme.outlineVariant,
                width: selected ? 3 : 1,
              ),
              boxShadow: selected
                  ? [
                      BoxShadow(
                        color: fill.withValues(alpha: 0.6),
                        blurRadius: 12,
                      ),
                    ]
                  : null,
            ),
            child: Icon(
              selected ? Icons.check : icon,
              color: iconColor,
              size: size * 0.45,
            ),
          ),
        ),
      ),
    );
  }
}

/// Botão compacto (ícone) que abre os controles numa folha inferior.
/// Usado nas telas sem sidebar, como o login.
class AppearanceButton extends StatelessWidget {
  const AppearanceButton({super.key});

  @override
  Widget build(BuildContext context) {
    return IconButton(
      tooltip: 'Aparência e tamanho da letra',
      icon: const Icon(Icons.contrast),
      onPressed: () => showModalBottomSheet(
        context: context,
        showDragHandle: true,
        builder: (_) => const SafeArea(
          child: Padding(
            padding: EdgeInsets.fromLTRB(24, 0, 24, 24),
            child: AppearanceControls(),
          ),
        ),
      ),
    );
  }
}
