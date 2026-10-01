import 'package:flutter/widgets.dart';
import 'package:provider/provider.dart';
import 'package:raraapp/api/credentials_storage.dart';
import 'package:raraapp/api/google_sign_in_api.dart';
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

  /// [remember]: guarda email e senha para preencher no próximo login
  /// (desmarcado, apaga o que estava guardado).
  Future<bool> login(String email, String password, {bool remember = false}) =>
      run(() async {
        _session = await UserApi.login(email, password);
        await SessionStorage.save(_session!);
        remember
            ? await CredentialsStorage.save(email, password)
            : await CredentialsStorage.clear();
      });

  /// Dados lembrados no último login (para preencher a tela de login).
  Future<({String email, String password})?> rememberedLogin() =>
      CredentialsStorage.load();

  /// Login pelo Google. `false` sem [error] = a pessoa cancelou.
  Future<bool> loginWithGoogle() async {
    String? idToken;
    final ok = await run(() async {
      idToken = await GoogleSignInApi.idToken();
      if (idToken == null) return;
      _session = await UserApi.loginWithGoogle(idToken!);
      await SessionStorage.save(_session!);
    });
    return ok && idToken != null;
  }

  /// Troca de senha sem a atual: conta ainda sem senha ou login pelo Google.
  bool get canSkipCurrentPassword =>
      viaGoogle || !(user?.hasPassword ?? true) || mustChangePassword;

  bool get viaGoogle => _session?.viaGoogle ?? false;

  /// Ainda com a senha provisória do cadastro pelo facilitador.
  bool get mustChangePassword => user?.mustChangePassword ?? false;

  /// Conta criada pelo Google começa só com nome e email.
  bool get needsProfile => isLoggedIn && user!.churchId == null;

  /// Cadastro público. Não loga automaticamente (vai para a tela de login).
  Future<bool> register(User user, String password) =>
      run(() => UserApi.register(user, password));

  Future<void> logout() async {
    try {
      await UserApi.logout();
    } catch (_) {
      // mesmo se a API falhar, sai localmente
    }
    await GoogleSignInApi.signOut();
    await SessionStorage.clear();
    _session = null;
    notifyListeners();
  }

  Future<bool> updateProfile(User updated) => run(() async {
    await _setUser(await UserApi.update(updated));
  });

  /// Com [canSkipCurrentPassword], [current] pode ir vazio.
  Future<bool> changePassword(String current, String newPassword) =>
      run(() async {
        await UserApi.updatePassword(user!.id, current, newPassword);
        if (!user!.hasPassword || mustChangePassword) {
          await _setUser(await UserApi.getById(user!.id));
        }
      });

  /// Mantém o usuário logado em dia quando ele é editado em outra tela
  /// (ex.: os próprios cargos nas Poderes).
  Future<void> syncUser(User updated) async {
    if (updated.id != user?.id) return;
    await _setUser(updated);
    notifyListeners();
  }

  Future<void> _setUser(User user) async {
    _session = Session(
      user: user,
      accessToken: _session!.accessToken,
      refreshToken: _session!.refreshToken,
      viaGoogle: _session!.viaGoogle,
    );
    await SessionStorage.save(_session!);
  }
}
