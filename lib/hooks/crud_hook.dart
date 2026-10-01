import 'package:flutter/foundation.dart';
import 'package:raraapp/hooks/hook.dart';

/// Base para entidades com CRUD simples (listar, criar, editar, apagar).
/// Cada hook só diz quais funções da api usar.
abstract class CrudHook<T> extends Hook {
  List<T> _items = [];
  bool _loaded = false;

  List<T> get items => _items;

  String idOf(T item);
  Future<List<T>> fetchAll();
  Future<T> create(T item);
  Future<T> update(T item);
  Future<void> destroy(String id);

  T? findById(String? id) =>
      _items.where((item) => idOf(item) == id).firstOrNull;

  Future<bool> load() => run(() async {
    _items = await fetchAll();
    _loaded = true;
  });

  /// Carrega só se ainda não carregou (para chamar no initState das telas).
  Future<void> ensureLoaded() async {
    if (!_loaded && !isLoading) await load();
  }

  /// Cria se o item ainda não tem id, senão atualiza.
  Future<bool> save(T item) => run(() async {
    if (idOf(item).isEmpty) {
      _items = [..._items, await create(item)];
    } else {
      final saved = await update(item);
      _items = [for (final i in _items) idOf(i) == idOf(saved) ? saved : i];
    }
  });

  /// Troca a lista inteira (ex.: nova ordem), para os hooks filhos.
  @protected
  set items(List<T> value) {
    _items = value;
    notifyListeners();
  }

  Future<bool> remove(String id) => run(() async {
    await destroy(id);
    _items = _items.where((i) => idOf(i) != id).toList();
  });

  /// Limpa o estado (ex.: no logout).
  void reset() {
    _items = [];
    _loaded = false;
    notifyListeners();
  }
}
