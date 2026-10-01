import 'package:flutter/material.dart';
import 'package:raraapp/components/theme/app_effects.dart';
import 'package:raraapp/components/theme/app_palette.dart';
import 'package:raraapp/hooks/use_appearance.dart';

const _red = AppPalette.red;
const _black = AppPalette.black;
const _white = AppPalette.white;
const _green = AppPalette.green;
final _mix = AppPalette.mix;

/// Monta o tema completo de um modo.
ThemeData buildAppTheme(AppMode mode) {
  final scheme = _scheme(mode);
  final radius = BorderRadius.circular(14);

  return ThemeData(
    useMaterial3: true,
    colorScheme: scheme,
    scaffoldBackgroundColor: scheme.surface,
    extensions: [_effects(mode)],
    appBarTheme: AppBarTheme(
      backgroundColor: scheme.surface,
      foregroundColor: scheme.onSurface,
      surfaceTintColor: Colors.transparent,
    ),
    inputDecorationTheme: InputDecorationTheme(
      filled: true,
      fillColor: scheme.surfaceContainerHigh.withValues(alpha: 0.7),
      border: OutlineInputBorder(
        borderRadius: radius,
        borderSide: BorderSide.none,
      ),
      enabledBorder: OutlineInputBorder(
        borderRadius: radius,
        borderSide: BorderSide(color: scheme.outlineVariant),
      ),
      focusedBorder: OutlineInputBorder(
        borderRadius: radius,
        borderSide: BorderSide(color: scheme.primary, width: 2),
      ),
      errorBorder: OutlineInputBorder(
        borderRadius: radius,
        borderSide: BorderSide(color: scheme.error),
      ),
      focusedErrorBorder: OutlineInputBorder(
        borderRadius: radius,
        borderSide: BorderSide(color: scheme.error, width: 2),
      ),
    ),
    elevatedButtonTheme: ElevatedButtonThemeData(
      style: ElevatedButton.styleFrom(
        backgroundColor: scheme.primary,
        foregroundColor: scheme.onPrimary,
        shape: RoundedRectangleBorder(borderRadius: radius),
      ),
    ),
    outlinedButtonTheme: OutlinedButtonThemeData(
      style: OutlinedButton.styleFrom(
        foregroundColor: scheme.onSurface,
        side: BorderSide(color: scheme.outline),
        shape: RoundedRectangleBorder(borderRadius: radius),
      ),
    ),
    textButtonTheme: TextButtonThemeData(
      style: TextButton.styleFrom(foregroundColor: scheme.onSurface),
    ),
    cardTheme: CardThemeData(
      color: scheme.surfaceContainer,
      margin: EdgeInsets.zero,
      elevation: 0,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(18)),
    ),
    snackBarTheme: SnackBarThemeData(
      behavior: SnackBarBehavior.floating,
      backgroundColor: scheme.inverseSurface,
      contentTextStyle: TextStyle(color: scheme.onInverseSurface),
      shape: RoundedRectangleBorder(borderRadius: radius),
    ),
    dialogTheme: DialogThemeData(
      backgroundColor: scheme.surfaceContainerLow,
      surfaceTintColor: Colors.transparent,
      insetPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 24),
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(28)),
    ),
    bottomSheetTheme: BottomSheetThemeData(
      backgroundColor: scheme.surfaceContainerLow,
      surfaceTintColor: Colors.transparent,
      showDragHandle: true,
    ),
    popupMenuTheme: PopupMenuThemeData(
      color: scheme.surfaceContainerHigh,
      surfaceTintColor: Colors.transparent,
      shape: RoundedRectangleBorder(borderRadius: radius),
    ),
    floatingActionButtonTheme: FloatingActionButtonThemeData(
      backgroundColor: scheme.primary,
      foregroundColor: scheme.onPrimary,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(18)),
    ),
    tabBarTheme: TabBarThemeData(
      labelColor: scheme.onPrimary,
      unselectedLabelColor: scheme.onSurface.withValues(alpha: 0.75),
      dividerColor: Colors.transparent,
      indicatorSize: TabBarIndicatorSize.tab,
      splashBorderRadius: radius,
      indicator: BoxDecoration(color: scheme.primary, borderRadius: radius),
      labelStyle: const TextStyle(fontWeight: FontWeight.w700),
    ),
    progressIndicatorTheme: ProgressIndicatorThemeData(
      color: scheme.primary,
      linearTrackColor: scheme.onSurface.withValues(alpha: 0.12),
      circularTrackColor: scheme.onSurface.withValues(alpha: 0.12),
    ),
    expansionTileTheme: const ExpansionTileThemeData(
      shape: Border(),
      collapsedShape: Border(),
    ),
    dividerTheme: DividerThemeData(color: scheme.outlineVariant),
    segmentedButtonTheme: SegmentedButtonThemeData(
      style: ButtonStyle(
        backgroundColor: WidgetStateProperty.resolveWith(
          (states) => states.contains(WidgetState.selected)
              ? scheme.primary
              : Colors.transparent,
        ),
        foregroundColor: WidgetStateProperty.resolveWith(
          (states) => states.contains(WidgetState.selected)
              ? scheme.onPrimary
              : scheme.onSurface,
        ),
        side: WidgetStatePropertyAll(BorderSide(color: scheme.outline)),
      ),
    ),
    listTileTheme: ListTileThemeData(
      selectedColor: scheme.primary,
      selectedTileColor: scheme.primary.withValues(alpha: 0.12),
      shape: RoundedRectangleBorder(borderRadius: radius),
    ),
  );
}

/// Cores base de cada modo. Nos modos vermelho e verde o texto foi escolhido
/// pelo contraste: branco no vermelho (4,6:1) e preto no verde (8,6:1).
ColorScheme _scheme(AppMode mode) => switch (mode) {
  AppMode.dark => ColorScheme(
    brightness: Brightness.dark,
    primary: _red,
    onPrimary: _white,
    secondary: _green,
    onSecondary: _black,
    error: _mix(_red, _white, 0.35),
    onError: _black,
    surface: _black,
    onSurface: _white,
    surfaceContainerLowest: _black,
    surfaceContainerLow: _mix(_black, _white, 0.04),
    surfaceContainer: _mix(_black, _white, 0.07),
    surfaceContainerHigh: _mix(_black, _white, 0.10),
    surfaceContainerHighest: _mix(_black, _white, 0.14),
    outline: _mix(_black, _white, 0.45),
    outlineVariant: _mix(_black, _white, 0.18),
    inverseSurface: _white,
    onInverseSurface: _black,
  ),
  AppMode.light => ColorScheme(
    brightness: Brightness.light,
    primary: _red,
    onPrimary: _white,
    secondary: _green,
    onSecondary: _black,
    error: _mix(_red, _black, 0.2),
    onError: _white,
    surface: _white,
    onSurface: _black,
    surfaceContainerLowest: _white,
    surfaceContainerLow: _mix(_white, _black, 0.02),
    surfaceContainer: _mix(_white, _black, 0.04),
    surfaceContainerHigh: _mix(_white, _black, 0.06),
    surfaceContainerHighest: _mix(_white, _black, 0.09),
    outline: _mix(_white, _black, 0.45),
    outlineVariant: _mix(_white, _black, 0.14),
    inverseSurface: _black,
    onInverseSurface: _white,
  ),
  AppMode.red => ColorScheme(
    brightness: Brightness.dark,
    primary: _white,
    onPrimary: _red,
    secondary: _black,
    onSecondary: _white,
    error: _black,
    onError: _white,
    surface: _red,
    onSurface: _white,
    surfaceContainerLowest: _red,
    surfaceContainerLow: _mix(_red, _black, 0.08),
    surfaceContainer: _mix(_red, _black, 0.14),
    surfaceContainerHigh: _mix(_red, _black, 0.20),
    surfaceContainerHighest: _mix(_red, _black, 0.26),
    outline: _mix(_red, _white, 0.55),
    outlineVariant: _mix(_red, _white, 0.30),
    inverseSurface: _black,
    onInverseSurface: _white,
  ),
  AppMode.green => ColorScheme(
    brightness: Brightness.light,
    primary: _black,
    onPrimary: _white,
    secondary: _white,
    onSecondary: _black,
    error: _black,
    onError: _white,
    surface: _green,
    onSurface: _black,
    surfaceContainerLowest: _green,
    surfaceContainerLow: _mix(_green, _white, 0.10),
    surfaceContainer: _mix(_green, _white, 0.18),
    surfaceContainerHigh: _mix(_green, _white, 0.26),
    surfaceContainerHighest: _mix(_green, _white, 0.34),
    outline: _mix(_green, _black, 0.60),
    outlineVariant: _mix(_green, _black, 0.30),
    inverseSurface: _black,
    onInverseSurface: _white,
  ),
};

AppEffects _effects(AppMode mode) => switch (mode) {
  AppMode.dark => AppEffects(
    backgroundGradient: [_black, _mix(_black, _red, 0.18), _black],
    orbA: _red.withValues(alpha: 0.45),
    orbB: _green.withValues(alpha: 0.25),
    titleGradient: [_white, _red],
    glow: _red.withValues(alpha: 0.55),
    glassFill: _white.withValues(alpha: 0.06),
    glassBorder: _white.withValues(alpha: 0.14),
  ),
  AppMode.light => AppEffects(
    backgroundGradient: [_white, _mix(_white, _red, 0.08), _white],
    orbA: _red.withValues(alpha: 0.22),
    orbB: _green.withValues(alpha: 0.18),
    titleGradient: [_black, _red],
    glow: _red.withValues(alpha: 0.35),
    glassFill: _white.withValues(alpha: 0.65),
    glassBorder: _black.withValues(alpha: 0.08),
  ),
  AppMode.red => AppEffects(
    backgroundGradient: [_red, _mix(_red, _black, 0.35), _red],
    orbA: _white.withValues(alpha: 0.25),
    orbB: _black.withValues(alpha: 0.35),
    titleGradient: [_white, _mix(_white, _red, 0.25)],
    glow: _white.withValues(alpha: 0.45),
    glassFill: _black.withValues(alpha: 0.18),
    glassBorder: _white.withValues(alpha: 0.25),
  ),
  AppMode.green => AppEffects(
    backgroundGradient: [_green, _mix(_green, _black, 0.25), _green],
    orbA: _white.withValues(alpha: 0.35),
    orbB: _black.withValues(alpha: 0.25),
    titleGradient: [_black, _mix(_black, _green, 0.4)],
    glow: _black.withValues(alpha: 0.35),
    glassFill: _white.withValues(alpha: 0.22),
    glassBorder: _black.withValues(alpha: 0.12),
  ),
};
