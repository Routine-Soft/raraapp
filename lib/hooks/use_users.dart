import 'package:flutter/widgets.dart';
import 'package:provider/provider.dart';
import 'package:raraapp/api/user_api.dart';
import 'package:raraapp/hooks/hook.dart';

/// Lista de usuários (integração, painel do professor).
UsersHook useUsers(BuildContext context, {bool listen = true}) =>
    Provider.of<UsersHook>(context, listen: listen);

class UsersHook extends Hook {
  List<User> _users = [];

  List<User> get users => _users;
  List<User> get members => _users.where((u) => u.member).toList();
  List<User> get nonMembers => _users.where((u) => !u.member).toList();
  int get baptizedCount => _users.where((u) => u.baptized).length;

  List<User> search(String query) {
    final q = query.trim().toLowerCase();
    if (q.isEmpty) return _users;
    return _users
        .where(
          (u) =>
              u.name.toLowerCase().contains(q) || (u.phone ?? '').contains(q),
        )
        .toList();
  }

  Future<bool> load() => run(() async => _users = await UserApi.getAll());

  Future<bool> setMember(String id, bool member) =>
      run(() async => _replace(await UserApi.patch(id, {'member': member})));

  /// Cadastro feito pelo facilitador (senha gerada no backend).
  Future<bool> createByFacilitator(User user) => run(() async {
    _users = [..._users, await UserApi.createByFacilitator(user)];
  });

  Future<bool> updateIntegration(
    String id, {
    String? invitationofgrace,
    String? status,
    String? facilitator,
  }) => run(
    () async => _replace(
      await UserApi.updateByFacilitator(
        id,
        invitationofgrace: invitationofgrace,
        status: status,
        facilitator: facilitator,
      ),
    ),
  );

  void _replace(User updated) {
    _users = [for (final u in _users) u.id == updated.id ? updated : u];
  }

  void reset() {
    _users = [];
    notifyListeners();
  }
}
