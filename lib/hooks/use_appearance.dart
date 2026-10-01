import 'package:flutter/widgets.dart';
import 'package:provider/provider.dart';
import 'package:raraapp/api/appearance_storage.dart';

/// Modos de cor do app.
enum AppMode { dark, light, red, green }

/// Aparência escolhida pela pessoa: modo de cor e tamanho da letra.
AppearanceHook useAppearance(BuildContext context, {bool listen = true}) =>
    Provider.of<AppearanceHook>(context, listen: listen);

class AppearanceHook extends ChangeNotifier {
  /// Tamanhos de letra disponíveis (1.0 = normal).
  static const fontScales = [0.85, 1.0, 1.15, 1.3, 1.5, 1.75];

  AppMode _mode = AppMode.dark;
  double _fontScale = 1.0;

  AppMode get mode => _mode;
  double get fontScale => _fontScale;
  bool get canIncreaseFont => _fontScale < fontScales.last;
  bool get canDecreaseFont => _fontScale > fontScales.first;

  Future<void> load() async {
    final saved = await AppearanceStorage.load();
    _mode = AppMode.values.asNameMap()[saved.mode] ?? _mode;
    _fontScale = fontScales.contains(saved.fontScale)
        ? saved.fontScale!
        : _fontScale;
    notifyListeners();
  }

  void setMode(AppMode mode) {
    _mode = mode;
    notifyListeners();
    AppearanceStorage.saveMode(mode.name);
  }

  void increaseFont() => _setFontScale(fontScales.indexOf(_fontScale) + 1);
  void decreaseFont() => _setFontScale(fontScales.indexOf(_fontScale) - 1);
  void resetFont() => _setFontScale(fontScales.indexOf(1.0));

  void _setFontScale(int index) {
    if (index < 0 || index >= fontScales.length) return;
    _fontScale = fontScales[index];
    notifyListeners();
    AppearanceStorage.saveFontScale(_fontScale);
  }
}
