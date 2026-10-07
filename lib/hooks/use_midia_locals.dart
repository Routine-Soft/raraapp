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

  /// Move o card de [from] para [to] dentro de [visible] (as mídias de uma
  /// igreja) e salva essa ordem. A tela já muda na hora; se o backend
  /// falhar, recarrega a ordem salva.
  Future<bool> move(List<MidiaLocal> visible, int from, int to) async {
    final ordered = [...visible];
    ordered.insert(to, ordered.removeAt(from));
    // As outras igrejas ficam onde estavam; as visíveis trocam de lugar
    final ids = {for (final m in visible) m.id};
    final queue = ordered.iterator;
    items = [
      for (final m in midias)
        if (ids.contains(m.id)) (queue..moveNext()).current else m,
    ];
    final ok = await run(
      () => MidiaLocalApi.reorder([for (final m in ordered) m.id]),
    );
    if (!ok) await load();
    return ok;
  }
}
