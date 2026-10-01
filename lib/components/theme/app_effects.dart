import 'package:flutter/material.dart';

/// Cores dos efeitos visuais (gradientes, brilho, vidro) de cada modo.
/// Fica dentro do tema: `AppEffects.of(context)`.
@immutable
class AppEffects extends ThemeExtension<AppEffects> {
  /// Fundo em degradê das telas "de vitrine" (login, boas-vindas).
  final List<Color> backgroundGradient;

  /// Manchas de luz desfocadas atrás do conteúdo.
  final Color orbA;
  final Color orbB;

  /// Degradê do texto de destaque (ex.: "Rara App").
  final List<Color> titleGradient;

  /// Cor do brilho (glow) dos botões principais.
  final Color glow;

  /// Vidro fosco (glassmorphism): preenchimento e borda.
  final Color glassFill;
  final Color glassBorder;

  const AppEffects({
    required this.backgroundGradient,
    required this.orbA,
    required this.orbB,
    required this.titleGradient,
    required this.glow,
    required this.glassFill,
    required this.glassBorder,
  });

  static AppEffects of(BuildContext context) =>
      Theme.of(context).extension<AppEffects>()!;

  @override
  AppEffects copyWith() => this;

  /// Permite a transição suave de cores ao trocar de modo.
  @override
  AppEffects lerp(AppEffects? other, double t) {
    if (other == null) return this;
    List<Color> lerpList(List<Color> a, List<Color> b) => [
      for (var i = 0; i < a.length; i++) Color.lerp(a[i], b[i], t)!,
    ];
    return AppEffects(
      backgroundGradient: lerpList(
        backgroundGradient,
        other.backgroundGradient,
      ),
      orbA: Color.lerp(orbA, other.orbA, t)!,
      orbB: Color.lerp(orbB, other.orbB, t)!,
      titleGradient: lerpList(titleGradient, other.titleGradient),
      glow: Color.lerp(glow, other.glow, t)!,
      glassFill: Color.lerp(glassFill, other.glassFill, t)!,
      glassBorder: Color.lerp(glassBorder, other.glassBorder, t)!,
    );
  }
}
