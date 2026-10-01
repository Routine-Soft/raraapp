import 'package:flutter/foundation.dart';
import 'package:google_sign_in/google_sign_in.dart';
import 'package:raraapp/api/api_client.dart';

/// Login nativo do Google (Android/iOS). Só entrega o idToken; quem troca
/// ele pela sessão do app é o `UserApi.loginWithGoogle`.
class GoogleSignInApi {
  /// ID "Aplicativo da Web": o Android exige como `serverClientId` e o
  /// backend usa para conferir o token.
  static const _serverClientId =
      '600964662831-1fi1jdhva1bvofg714iv0a2kntn4b2b9.apps.googleusercontent.com';
  static const _iosClientId =
      '600964662831-m98j0hmubsm6spijuedrhfbg09uq5bko.apps.googleusercontent.com';

  static Future<void>? _init;

  static Future<void> _ensureInitialized() =>
      _init ??= GoogleSignIn.instance.initialize(
        clientId: defaultTargetPlatform == TargetPlatform.iOS
            ? _iosClientId
            : null,
        serverClientId: _serverClientId,
      );

  /// Abre a escolha de conta. Retorna `null` se a pessoa cancelar.
  static Future<String?> idToken() async {
    await _ensureInitialized();
    try {
      final account = await GoogleSignIn.instance.authenticate();
      final token = account.authentication.idToken;
      if (token == null) throw ApiException('O Google não retornou o token', 0);
      return token;
    } on GoogleSignInException catch (e) {
      final detail = e.description ?? '';
      // O Android também usa "cancelado" quando o Google recusa o login
      // depois de escolher a conta (ex.: "[16] Account reauth failed" =
      // app mal cadastrado no Google Cloud). Só é silêncio se a pessoa
      // realmente fechou a janela.
      final userClosed =
          detail.isEmpty ||
          detail.toLowerCase().contains('cancelled by the user');
      if ((e.code == GoogleSignInExceptionCode.canceled ||
              e.code == GoogleSignInExceptionCode.interrupted) &&
          userClosed) {
        return null;
      }
      throw ApiException(
        'O Google não autorizou o login'
        '${detail.isEmpty ? '' : ' ($detail)'}',
        0,
      );
    }
  }

  /// Esquece a conta escolhida (na próxima vez mostra a lista de novo).
  static Future<void> signOut() async {
    try {
      await _ensureInitialized();
      await GoogleSignIn.instance.signOut();
    } catch (_) {
      // sem conta Google conectada: nada a fazer
    }
  }
}
