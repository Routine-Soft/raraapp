import 'dart:convert';

import 'package:raraapp/api/user_api.dart';
import 'package:shared_preferences/shared_preferences.dart';

/// Guarda a sessão (usuário + tokens) no aparelho.
class SessionStorage {
  static const _key = 'session';

  static Future<Session?> load() async {
    try {
      final prefs = await SharedPreferences.getInstance();
      final json = prefs.getString(_key);
      return json == null ? null : Session.fromJson(jsonDecode(json));
    } catch (_) {
      return null; // formato antigo/corrompido: pede login de novo
    }
  }

  static Future<void> save(Session session) async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString(_key, jsonEncode(session.toJson()));
  }

  static Future<void> clear() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.remove(_key);
  }
}
