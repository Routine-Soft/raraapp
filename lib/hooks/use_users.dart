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

  /// Usuários de uma igreja (`null` = todas).
  List<User> ofChurch(String? churchId) => churchId == null
      ? _users
      : _users.where((u) => u.churchId == churchId).toList();

  /// Pesquisa por nome ou telefone, opcionalmente só em uma igreja.
  List<User> search(String query, {String? churchId}) {
    final q = query.trim().toLowerCase();
    final users = ofChurch(churchId);
    if (q.isEmpty) return users;
    return users
        .where(
          (u) =>
              u.name.toLowerCase().contains(q) || (u.phone ?? '').contains(q),
        )
        .toList();
  }

  /// Novos membros em cada mês de [year] (índice 0 = janeiro) e o total de
  /// membros no fim de cada mês. Membros sem data de entrada (anteriores ao
  /// registro da data) entram só no acumulado e aparecem em `undated`.
  ({List<({int joined, int accumulated})> months, int undated}) memberGrowth(
    int year, {
    String? churchId,
  }) {
    final members = ofChurch(churchId).where((u) => u.member).toList();
    final undated = members.where((u) => u.memberSince == null).length;
    final dates = [for (final u in members) ?u.memberSince];
    return (
      undated: undated,
      months: [
        for (var m = 1; m <= 12; m++)
          (
            joined: dates.where((d) => d.year == year && d.month == m).length,
            accumulated:
                undated +
                dates.where((d) => d.isBefore(DateTime(year, m + 1))).length,
          ),
      ],
    );
  }

  /// Quem virou membro em [month]/[year], do mais recente ao mais antigo.
  List<User> newMembers(int year, int month, {String? churchId}) =>
      ofChurch(churchId)
          .where(
            (u) =>
                u.member &&
                u.memberSince?.year == year &&
                u.memberSince?.month == month,
          )
          .toList()
        ..sort((a, b) => b.memberSince!.compareTo(a.memberSince!));

  Future<bool> load() => run(() async => _users = await UserApi.getAll());

  /// Marca/desmarca membro. [since] = data em que virou membro (quem já era
  /// membro há anos entra com a data real, para o relatório mensal).
  Future<bool> setMember(String id, bool member, {DateTime? since}) => run(
    () async => _replace(
      await UserApi.patch(id, {
        'member': member,
        if (member && since != null)
          'memberSince': since.toUtc().toIso8601String(),
      }),
    ),
  );

  /// Cadastro feito pelo facilitador (senha provisória "123", trocada no
  /// primeiro acesso).
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

  /// Troca os cargos de [id] (marcados nas Poderes).
  Future<bool> setRoles(String id, List<String> roles) =>
      run(() async => _replace(await UserApi.updateRoles(id, roles)));

  User? byId(String id) => _users.where((u) => u.id == id).firstOrNull;

  void _replace(User updated) {
    _users = [for (final u in _users) u.id == updated.id ? updated : u];
  }

  void reset() {
    _users = [];
    notifyListeners();
  }
}
