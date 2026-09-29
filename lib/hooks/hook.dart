import 'package:flutter/foundation.dart';

/// Base de todo hook: guarda `isLoading` / `error` e evita repetir
/// o try/catch/notifyListeners em cada ação.
abstract class Hook extends ChangeNotifier {
  bool _isLoading = false;
  String? _error;

  bool get isLoading => _isLoading;
  String? get error => _error;

  /// Executa [action] marcando loading e capturando o erro.
  /// Retorna `true` se deu certo.
  @protected
  Future<bool> run(Future<void> Function() action) async {
    _isLoading = true;
    _error = null;
    notifyListeners();

    try {
      await action();
      return true;
    } catch (e) {
      _error = e.toString();
      return false;
    } finally {
      _isLoading = false;
      notifyListeners();
    }
  }
}
