import 'package:shared_preferences/shared_preferences.dart';

/// Guarda no aparelho o modo de cor e o tamanho da letra escolhidos.
class AppearanceStorage {
  static const _modeKey = 'appearance_mode';
  static const _fontScaleKey = 'appearance_font_scale';

  static Future<({String? mode, double? fontScale})> load() async {
    final prefs = await SharedPreferences.getInstance();
    return (
      mode: prefs.getString(_modeKey),
      fontScale: prefs.getDouble(_fontScaleKey),
    );
  }

  static Future<void> saveMode(String mode) async =>
      (await SharedPreferences.getInstance()).setString(_modeKey, mode);

  static Future<void> saveFontScale(double scale) async =>
      (await SharedPreferences.getInstance()).setDouble(_fontScaleKey, scale);
}
