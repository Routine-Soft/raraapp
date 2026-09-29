import 'package:flutter/widgets.dart';
import 'package:provider/provider.dart';
import 'package:raraapp/api/cura_api.dart';
import 'package:raraapp/hooks/hook.dart';

CurasHook useCuras(BuildContext context, {bool listen = true}) =>
    Provider.of<CurasHook>(context, listen: listen);

class CurasHook extends Hook {
  List<Cura> _mine = [];
  List<Cura> _all = [];

  /// Pedidos do usuário logado.
  List<Cura> get mine => _mine;

  /// Todos os pedidos (kanban do gestor).
  List<Cura> get all => _all;

  List<Cura> byStatus(String status) =>
      _all.where((c) => c.status == status).toList();

  Future<bool> loadMine() => run(() async => _mine = await CuraApi.getMine());

  Future<bool> loadAll() => run(() async => _all = await CuraApi.getAll());

  Future<bool> create(String type) => run(() async {
    _mine = [await CuraApi.create(type), ..._mine];
  });

  Future<bool> update(Cura cura, {required String type, String? notes}) =>
      run(() async {
        _replace(await CuraApi.update(cura.id, type: type, notes: notes));
      });

  /// Move o card no kanban. Atualiza a tela na hora e desfaz se a API falhar.
  Future<bool> moveTo(Cura cura, String status) async {
    final before = _all;
    _all = [for (final c in _all) c.id == cura.id ? c.withStatus(status) : c];
    notifyListeners();

    final ok = await run(
      () async => _replace(await CuraApi.updateStatus(cura.id, status)),
    );
    if (!ok) {
      _all = before;
      notifyListeners();
    }
    return ok;
  }

  Future<bool> remove(String id) => run(() async {
    await CuraApi.delete(id);
    _all = _all.where((c) => c.id != id).toList();
    _mine = _mine.where((c) => c.id != id).toList();
  });

  void _replace(Cura updated) {
    // A resposta do PATCH vem com o usuário populado, então basta trocar.
    _all = [for (final c in _all) c.id == updated.id ? updated : c];
    _mine = [for (final c in _mine) c.id == updated.id ? updated : c];
  }

  void reset() {
    _mine = [];
    _all = [];
    notifyListeners();
  }
}
