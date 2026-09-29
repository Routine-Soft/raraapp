import 'package:flutter/widgets.dart';
import 'package:provider/provider.dart';
import 'package:raraapp/api/church_api.dart';
import 'package:raraapp/hooks/crud_hook.dart';

/// Uso nos componentes:
///   final churches = useChurches(context);             // reconstrói ao mudar
///   useChurches(context, listen: false).remove(id);    // dentro de callbacks
ChurchesHook useChurches(BuildContext context, {bool listen = true}) =>
    Provider.of<ChurchesHook>(context, listen: listen);

class ChurchesHook extends CrudHook<Church> {
  List<Church> get churches => items;

  @override
  String idOf(Church church) => church.id;
  @override
  Future<List<Church>> fetchAll() => ChurchApi.getAll();
  @override
  Future<Church> create(Church church) => ChurchApi.create(church);
  @override
  Future<Church> update(Church church) => ChurchApi.update(church);
  @override
  Future<void> destroy(String id) => ChurchApi.delete(id);
}
