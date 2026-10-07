import 'package:raraapp/api/address.dart';
import 'package:raraapp/api/api_client.dart';
import 'package:raraapp/api/gift_test_api.dart';
import 'package:raraapp/api/json.dart';

/// Valores aceitos pelo backend (enums em `models/user.model.js`).
const userGenders = ['Masculino', 'Feminino'];
const userStatuses = ['Presente', 'Ausente', 'Se desligou do ministério'];
const userInvitations = [
  'Aceitou Jesus',
  'Reconciliou',
  'Troca de Igreja',
  'Recebeu Oração',
  'Não preencheu',
];
const userRoles = [
  'facilitador',
  'christian_group_lider',
  'departamento_lider',
  'secretaria_cura',
  'avancai_lider',
  'midia_lider',
  'pastor_local',
  'tesouraria',
  'secretaria_igreja',
  'super_admin',
  'programador',
  ...teamRoles,
];

/// Equipes dos departamentos (backend `utils/teams.js`): quem é "membro da
/// equipe" tem os mesmos poderes do líder; só o líder monta a equipe.
typedef Team = ({String key, String leader, String role, String label});

const teams = <Team>[
  (
    key: 'avancai',
    leader: 'avancai_lider',
    role: 'avancai_equipe',
    label: 'Avançai',
  ),
  (
    key: 'christian_group',
    leader: 'christian_group_lider',
    role: 'christian_group_equipe',
    label: 'Christian Group',
  ),
  (key: 'midia', leader: 'midia_lider', role: 'midia_equipe', label: 'Mídia'),
  (
    key: 'cura',
    leader: 'secretaria_cura',
    role: 'cura_equipe',
    label: 'Cura da Alma',
  ),
  (
    key: 'financeiro',
    leader: 'tesouraria',
    role: 'tesouraria_equipe',
    label: 'Financeiro',
  ),
  (
    key: 'facilitadores',
    leader: 'facilitador',
    role: 'facilitadores_equipe',
    label: 'Facilitadores',
  ),
];

const teamRoles = [
  'avancai_equipe',
  'christian_group_equipe',
  'midia_equipe',
  'cura_equipe',
  'tesouraria_equipe',
  'facilitadores_equipe',
];

Team teamOf(String key) => teams.firstWhere((t) => t.key == key);

/// Cargos efetivos: cada cargo de equipe vale como o do líder.
List<String> effectiveRoles(List<String> roles) => {
  ...roles,
  for (final t in teams)
    if (roles.contains(t.role)) t.leader,
}.toList();

/// Cargos eclesiásticos — enum `ECCLESIASTICAL_ROLES` do backend.
const ecclesiasticalRoles = [
  'pastor',
  'presbitero',
  'apostolo',
  'diacono',
  'obreiro',
  'evangelista',
];

String ecclesiasticalRoleLabel(String role) => switch (role) {
  'pastor' => 'Pastor(a)',
  'presbitero' => 'Presbítero(a)',
  'apostolo' => 'Apóstolo(a)',
  'diacono' => 'Diácono(a)',
  'obreiro' => 'Obreiro(a)',
  'evangelista' => 'Evangelista',
  _ => role,
};

/// Cargos que valem em todas as igrejas (backend `GLOBAL_ROLES`). Os demais
/// são da igreja onde foram dados e caem ao trocar de igreja.
const globalRoles = ['super_admin', 'programador'];

/// Nome do cargo na tela.
String roleLabel(String role) => switch (role) {
  'facilitador' => 'Facilitador',
  'christian_group_lider' => 'Líder de Christian Group',
  'departamento_lider' => 'Líder de Departamento',
  'secretaria_cura' => 'Secretaria da Cura',
  'avancai_lider' => 'Líder do Avançai',
  'midia_lider' => 'Líder de Mídia',
  'pastor_local' => 'Pastor Local',
  'tesouraria' => 'Tesouraria',
  'secretaria_igreja' => 'Secretária da Igreja',
  _ when teamRoles.contains(role) =>
    'Equipe ${teams.firstWhere((t) => t.role == role).label}',
  'super_admin' => 'Super Intendente Geral',
  'programador' => 'Programador',
  _ => role,
};

/// Usuário — espelha `models/user.model.js` (sem senha/tokens).
class User {
  final String id;
  final String name;
  final String email;
  final String? phone;
  final String? gender;
  final DateTime? birthdate;
  final String? churchId;
  final Address? address;
  final String? invitationofgrace;
  final String? status;
  final bool baptized;
  final bool member;

  /// Quando virou membro (o backend preenche ao marcar "membro").
  final DateTime? memberSince;
  final List<String> roles;
  final String? facilitator;

  /// `false` = conta criada pelo Google, ainda sem senha.
  final bool hasPassword;

  /// Senha provisória ("123", cadastro pelo facilitador): precisa trocar.
  final bool mustChangePassword;

  /// Pastor(a), Presbítero(a)... (quantos tiver).
  final List<String> ecclesiasticalRoles;

  /// Último resultado de cada Teste dos Dons.
  final List<GiftTestResult> giftTests;

  const User({
    this.id = '',
    required this.name,
    required this.email,
    this.phone,
    this.gender,
    this.birthdate,
    this.churchId,
    this.address,
    this.invitationofgrace,
    this.status,
    this.baptized = false,
    this.member = false,
    this.memberSince,
    this.roles = const [],
    this.facilitator,
    this.hasPassword = true,
    this.mustChangePassword = false,
    this.giftTests = const [],
    this.ecclesiasticalRoles = const [],
  });

  /// super_admin (Super Intendente Geral) acessa tudo.
  GiftTestResult? giftTest(String key) =>
      giftTests.where((r) => r.test == key).firstOrNull;

  /// Equipe de departamento conta como o líder (ver [effectiveRoles]).
  bool hasAnyRole(List<String> allowed) {
    final effective = effectiveRoles(roles);
    return effective.contains('super_admin') || effective.any(allowed.contains);
  }

  /// Pode montar a equipe [key]? Só pelos cargos reais (a equipe não monta
  /// a própria equipe).
  bool canManageTeam(String key) =>
      roles.contains('super_admin') ||
      roles.contains('pastor_local') ||
      roles.contains('secretaria_igreja') ||
      roles.contains(teamOf(key).leader);

  bool isInTeam(String key) => roles.contains(teamOf(key).role);

  factory User.fromJson(Map<String, dynamic> json) => User(
    id: json['_id'] ?? '',
    name: json['name'] ?? '',
    email: json['email'] ?? '',
    phone: json['phone'],
    gender: json['gender'],
    birthdate: parseDate(json['birthdate']),
    churchId: refId(json['churchId']),
    address: json['address'] != null ? Address.fromJson(json['address']) : null,
    invitationofgrace: json['invitationofgrace'],
    status: json['status'],
    baptized: json['baptized'] ?? false,
    member: json['member'] ?? false,
    memberSince: parseDate(json['memberSince']),
    roles: List<String>.from(json['roles'] ?? const []),
    facilitator: json['facilitator'],
    hasPassword: json['hasPassword'] ?? true,
    mustChangePassword: json['mustChangePassword'] ?? false,
    giftTests: [
      for (final r in json['giftTests'] ?? const []) GiftTestResult.fromJson(r),
    ],
    ecclesiasticalRoles: List<String>.from(
      json['ecclesiasticalRoles'] ?? const [],
    ),
  );

  /// Também usado para salvar o usuário logado no storage.
  Map<String, dynamic> toJson() => {
    '_id': id,
    'name': name,
    'email': email,
    'phone': phone,
    'gender': gender,
    'birthdate': birthdate?.toUtc().toIso8601String(),
    'churchId': churchId,
    'address': address?.toJson(),
    'invitationofgrace': invitationofgrace,
    'status': status,
    'baptized': baptized,
    'member': member,
    'memberSince': memberSince?.toUtc().toIso8601String(),
    'roles': roles,
    'facilitator': facilitator,
    'hasPassword': hasPassword,
    'mustChangePassword': mustChangePassword,
    'giftTests': [for (final r in giftTests) r.toJson()],
    'ecclesiasticalRoles': ecclesiasticalRoles,
  };

  /// Campos que o `PATCH /users/:id` aceita.
  Map<String, dynamic> toUpdateJson() => {
    'name': name,
    'email': email,
    'phone': phone,
    'gender': gender,
    'birthdate': birthdate?.toUtc().toIso8601String(),
    'churchId': churchId,
    'address': address?.toJson(),
    'invitationofgrace': invitationofgrace,
    'status': status,
    'baptized': baptized,
    'member': member,
    'ecclesiasticalRoles': ecclesiasticalRoles,
  };
}

/// Resposta do login.
class Session {
  final User user;
  final String accessToken;
  final String refreshToken;

  /// Entrou pelo Google: pode redefinir a senha sem informar a atual.
  final bool viaGoogle;

  const Session({
    required this.user,
    required this.accessToken,
    required this.refreshToken,
    this.viaGoogle = false,
  });

  factory Session.fromJson(Map<String, dynamic> json) => Session(
    user: User.fromJson(json['user']),
    accessToken: json['accessToken'],
    refreshToken: json['refreshToken'],
    viaGoogle: json['viaGoogle'] ?? false,
  );

  Map<String, dynamic> toJson() => {
    'user': user.toJson(),
    'accessToken': accessToken,
    'refreshToken': refreshToken,
    'viaGoogle': viaGoogle,
  };
}

/// Rotas de `/users`.
class UserApi {
  // ---- públicas ----
  static Future<Session> login(String email, String password) async =>
      Session.fromJson(
        await ApiClient.post('/users/login', {
          'email': email,
          'password': password,
        }),
      );

  /// Troca o idToken do Google pela sessão do app (cria a conta se for nova).
  static Future<Session> loginWithGoogle(String idToken) async =>
      Session.fromJson(
        await ApiClient.post('/users/google', {'idToken': idToken}),
      );

  /// Cadastro público (a própria pessoa).
  static Future<User> register(User user, String password) async =>
      User.fromJson(
        await ApiClient.post('/users', {
          ...user.toJson()..remove('_id'),
          'password': password,
        }),
      );

  static Future<String> refresh(String refreshToken) async {
    final data = await ApiClient.post('/users/refresh', {
      'refreshToken': refreshToken,
    });
    return data['accessToken'];
  }

  // ---- protegidas ----
  static Future<void> logout() => ApiClient.post('/users/logout');

  static Future<List<User>> getAll() async {
    final data = await ApiClient.get('/users') as List;
    return data.map((json) => User.fromJson(json)).toList();
  }

  static Future<User> getById(String id) async =>
      User.fromJson(await ApiClient.get('/users/$id'));

  static Future<User> update(User user) async => User.fromJson(
    await ApiClient.patch('/users/${user.id}', user.toUpdateJson()),
  );

  /// Atualiza só alguns campos (ex.: `{'member': true}`).
  static Future<User> patch(String id, Map<String, dynamic> fields) async =>
      User.fromJson(await ApiClient.patch('/users/$id', fields));

  static Future<void> updatePassword(
    String id,
    String current,
    String newPassword,
  ) => ApiClient.post('/users/$id/password', {
    'currentPassword': current,
    'newPassword': newPassword,
  });

  static Future<void> delete(String id) => ApiClient.delete('/users/$id');

  /// "Tornar membro da equipe" ([add]) ou tirar da equipe [team].
  static Future<User> setTeam(String id, String team, bool add) async =>
      User.fromJson(
        add
            ? await ApiClient.put('/users/$id/team/$team', {})
            : await ApiClient.delete('/users/$id/team/$team'),
      );

  static Future<User> updateRoles(String id, List<String> roles) async =>
      User.fromJson(
        await ApiClient.patch('/users/$id/roles', {'roles': roles}),
      );

  // ---- integração (facilitador cadastra visitante; senha é gerada no backend) ----
  static Future<User> createByFacilitator(User user) async => User.fromJson(
    await ApiClient.post('/users/facilitator', user.toJson()..remove('_id')),
  );

  static Future<User> updateByFacilitator(
    String id, {
    String? invitationofgrace,
    String? status,
    bool? baptized,
    String? facilitator,
    List<String>? ecclesiasticalRoles,
  }) async => User.fromJson(
    await ApiClient.patch('/users/facilitator/$id', {
      'invitationofgrace': ?invitationofgrace,
      'status': ?status,
      'baptized': ?baptized,
      'facilitator': ?facilitator,
      'ecclesiasticalRoles': ?ecclesiasticalRoles,
    }),
  );
}
