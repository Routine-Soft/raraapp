import 'package:flutter/widgets.dart';
import 'package:provider/provider.dart';
import 'package:raraapp/api/midia_local_api.dart';
import 'package:raraapp/hooks/crud_hook.dart';

MidiaLocalsHook useMidiaLocals(BuildContext context, {bool listen = true}) =>
    Provider.of<MidiaLocalsHook>(context, listen: listen);

class MidiaLocalsHook extends CrudHook<MidiaLocal> {
  List<MidiaLocal> get midias => items;

  @override
  String idOf(MidiaLocal midia) => midia.id;
  @override
  Future<List<MidiaLocal>> fetchAll() => MidiaLocalApi.getAll();
  @override
  Future<MidiaLocal> create(MidiaLocal midia) => MidiaLocalApi.create(midia);
  @override
  Future<MidiaLocal> update(MidiaLocal midia) => MidiaLocalApi.update(midia);
  @override
  Future<void> destroy(String id) => MidiaLocalApi.delete(id);

  /// Move o card de [from] para [to] e salva a ordem (a tela já muda na
  /// hora; se o backend falhar, recarrega a ordem salva).
  Future<bool> move(int from, int to) async {
    final list = [...midias];
    list.insert(to, list.removeAt(from));
    items = list;
    final ok = await run(
      () => MidiaLocalApi.reorder([for (final m in list) m.id]),
    );
    if (!ok) await load();
    return ok;
  }
}
