import 'package:flutter/widgets.dart';
import 'package:provider/provider.dart';
import 'package:raraapp/api/gift_test_api.dart';
import 'package:raraapp/api/user_api.dart';
import 'package:raraapp/hooks/hook.dart';

/// Testes dos Dons do Avançai (perguntas vêm do backend).
GiftTestsHook useGiftTests(BuildContext context, {bool listen = true}) =>
    Provider.of<GiftTestsHook>(context, listen: listen);

class GiftTestsHook extends Hook {
  GiftTestCatalog? _catalog;

  GiftTestCatalog? get catalog => _catalog;
  List<GiftTest> get tests => _catalog?.tests ?? const [];

  /// Usuário salvo pelo último envio (para atualizar o logado).
  User? _submitted;
  User? get submitted => _submitted;

  Future<bool> ensureLoaded() async =>
      _catalog != null ||
      await run(() async => _catalog = await GiftTestApi.list());

  Future<bool> submit(String key, List<int> answers) =>
      run(() async => _submitted = await GiftTestApi.submit(key, answers));

  void reset() {
    _catalog = null;
    _submitted = null;
    notifyListeners();
  }
}
