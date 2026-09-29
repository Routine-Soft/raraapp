import 'package:flutter/widgets.dart';
import 'package:provider/provider.dart';
import 'package:raraapp/api/session_storage.dart';
import 'package:raraapp/api/user_api.dart';
import 'package:raraapp/hooks/hook.dart';

/// Usuário logado e ações de conta.
AuthHook useAuth(BuildContext context, {bool listen = true}) =>
    Provider.of<AuthHook>(context, listen: listen);

class AuthHook extends Hook {
  Session? _session;

  User? get user => _session?.user;
  bool get isLoggedIn => _session != null;

  bool hasAnyRole(List<String> roles) => user?.hasAnyRole(roles) ?? false;

  /// Recupera a sessão salva (abertura do app).
  Future<bool> restore() async {
    _session = await SessionStorage.load();
    notifyListeners();
    return isLoggedIn;
  }

  Future<bool> login(String email, String password) => run(() async {
    _session = await UserApi.login(email, password);
    await SessionStorage.save(_session!);
  });

  /// Cadastro público. Não loga automaticamente (vai para a tela de login).
  Future<bool> register(User user, String password) =>
      run(() => UserApi.register(user, password));

  Future<void> logout() async {
    try {
      await UserApi.logout();
    } catch (_) {
      // mesmo se a API falhar, sai localmente
    }
    await SessionStorage.clear();
    _session = null;
    notifyListeners();
  }

  Future<bool> updateProfile(User updated) => run(() async {
    await _setUser(await UserApi.update(updated));
  });

  Future<bool> changePassword(String current, String newPassword) =>
      run(() => UserApi.updatePassword(user!.id, current, newPassword));

  Future<void> _setUser(User user) async {
    _session = Session(
      user: user,
      accessToken: _session!.accessToken,
      refreshToken: _session!.refreshToken,
    );
    await SessionStorage.save(_session!);
  }
}
