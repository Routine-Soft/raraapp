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
}
