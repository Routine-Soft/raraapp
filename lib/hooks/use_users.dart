import 'package:flutter/widgets.dart';
import 'package:provider/provider.dart';
import 'package:raraapp/api/user_api.dart';
import 'package:raraapp/hooks/hook.dart';

/// Quem entra nos números do dashboard.
enum PeopleScope { all, members, nonMembers }

/// Faixas etárias dos dashboards (idade mínima de cada uma).
const ageBands = [
  (label: 'Crianças (0–11)', from: 0),
  (label: 'Adolescentes (12–17)', from: 12),
  (label: 'Jovens (18–29)', from: 18),
  (label: 'Adultos (30–44)', from: 30),
  (label: 'Adultos (45–59)', from: 45),
  (label: 'Idosos (60+)', from: 60),
];

/// Números de um grupo de pessoas (uma igreja ou todas).
class PeopleStats {
  final int total;
  final int members;
  final int baptized;
  final int men;
  final int women;

  /// Quantos têm cada cargo eclesiástico (chave = 'pastor', ...).
  final Map<String, int> ecclesiastical;

  /// Pessoas em cada faixa de [ageBands] (mesma ordem).
  final List<int> ages;

  /// Sem data de nascimento (fora do gráfico de idade).
  final int noBirthdate;

  const PeopleStats({
    required this.total,
    required this.members,
    required this.baptized,
    required this.men,
    required this.women,
    required this.ecclesiastical,
    required this.ages,
    required this.noBirthdate,
  });

  int get nonMembers => total - members;
  int get notBaptized => total - baptized;

  factory PeopleStats.of(List<User> people, {DateTime? today}) {
    final now = today ?? DateTime.now();
    final ages = List.filled(ageBands.length, 0);
    var noBirthdate = 0;
    for (final u in people) {
      final b = u.birthdate;
      if (b == null) {
        noBirthdate++;
        continue;
      }
      var age = now.year - b.year;
      if (now.month < b.month || (now.month == b.month && now.day < b.day)) {
        age--;
      }
      final band = ageBands.lastIndexWhere((a) => age >= a.from);
      if (band >= 0) ages[band]++;
    }
    return PeopleStats(
      total: people.length,
      members: people.where((u) => u.member).length,
      baptized: people.where((u) => u.baptized).length,
      men: people.where((u) => u.gender == 'Masculino').length,
      women: people.where((u) => u.gender == 'Feminino').length,
      ecclesiastical: {
        for (final role in ecclesiasticalRoles)
          role: people
              .where((u) => u.ecclesiasticalRoles.contains(role))
              .length,
      },
      ages: ages,
      noBirthdate: noBirthdate,
    );
  }
}

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

  /// Pessoas da igreja (`null` = todas) filtradas para o dashboard.
  List<User> people({
    String? churchId,
    PeopleScope scope = PeopleScope.all,
    String? gender,
  }) => ofChurch(churchId)
      .where(
        (u) =>
            switch (scope) {
              PeopleScope.all => true,
              PeopleScope.members => u.member,
              PeopleScope.nonMembers => !u.member,
            } &&
            (gender == null || u.gender == gender),
      )
      .toList();

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
    List<String>? ecclesiasticalRoles,
  }) => run(
    () async => _replace(
      await UserApi.updateByFacilitator(
        id,
        invitationofgrace: invitationofgrace,
        status: status,
        facilitator: facilitator,
        ecclesiasticalRoles: ecclesiasticalRoles,
      ),
    ),
  );

  /// Exclui a pessoa (pastor local, facilitador e super admin).
  Future<bool> remove(String id) => run(() async {
    await UserApi.delete(id);
    _users = _users.where((u) => u.id != id).toList();
  });

  /// Põe ([add]) ou tira a pessoa da equipe do departamento [team].
  Future<bool> setTeam(String id, String team, bool add) =>
      run(() async => _replace(await UserApi.setTeam(id, team, add)));

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
