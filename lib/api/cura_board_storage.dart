import 'package:shared_preferences/shared_preferences.dart';

/// Guarda no aparelho como o gestor prefere ver os pedidos de cura
/// ("board" = quadro, "simple" = lista simples).
class CuraBoardStorage {
  static const _key = 'cura_board_view';

  static Future<String?> load() async =>
      (await SharedPreferences.getInstance()).getString(_key);

  static Future<void> save(String view) async =>
      (await SharedPreferences.getInstance()).setString(_key, view);
}
