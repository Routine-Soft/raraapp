import 'package:flutter/material.dart';

/// Paleta do cliente. Todas as outras cores do app derivam destas quatro.
abstract final class AppPalette {
  static const red = Color(0xFFE41E1B);
  static const black = Color(0xFF000000);
  static const white = Color(0xFFFFFFFF);
  static const green = Color(0xFF00BF63);

  /// Mistura [a] com [b] (0 = só a, 1 = só b). Usado para tons intermediários.
  static Color mix(Color a, Color b, double t) => Color.lerp(a, b, t)!;
}
