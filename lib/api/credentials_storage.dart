import 'package:flutter_secure_storage/flutter_secure_storage.dart';

/// Email e senha lembrados no login ("Lembrar meus dados"). Ficam no cofre
/// criptografado do aparelho (Keystore no Android, Keychain no iPhone).
class CredentialsStorage {
  static const _storage = FlutterSecureStorage();
  static const _emailKey = 'remembered_email';
  static const _passwordKey = 'remembered_password';

  static Future<({String email, String password})?> load() async {
    try {
      final email = await _storage.read(key: _emailKey);
      final password = await _storage.read(key: _passwordKey);
      if (email == null || password == null) return null;
      return (email: email, password: password);
    } catch (_) {
      return null; // cofre indisponível: só não preenche
    }
  }

  static Future<void> save(String email, String password) async {
    try {
      await _storage.write(key: _emailKey, value: email);
      await _storage.write(key: _passwordKey, value: password);
    } catch (_) {
      // não lembrar não impede o login
    }
  }

  static Future<void> clear() async {
    try {
      await _storage.delete(key: _emailKey);
      await _storage.delete(key: _passwordKey);
    } catch (_) {}
  }
}
