import 'package:flutter/widgets.dart';
import 'package:provider/provider.dart';
import 'package:raraapp/api/christian_group_api.dart';
import 'package:raraapp/hooks/crud_hook.dart';

ChristianGroupsHook useChristianGroups(
  BuildContext context, {
  bool listen = true,
}) => Provider.of<ChristianGroupsHook>(context, listen: listen);

class ChristianGroupsHook extends CrudHook<ChristianGroup> {
  List<ChristianGroup> get groups => items;

  @override
  String idOf(ChristianGroup group) => group.id;
  @override
  Future<List<ChristianGroup>> fetchAll() => ChristianGroupApi.getAll();
  @override
  Future<ChristianGroup> create(ChristianGroup group) =>
      ChristianGroupApi.create(group);
  @override
  Future<ChristianGroup> update(ChristianGroup group) =>
      ChristianGroupApi.update(group);
  @override
  Future<void> destroy(String id) => ChristianGroupApi.delete(id);
}
