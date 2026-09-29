import 'package:raraapp/api/address.dart';
import 'package:raraapp/api/api_client.dart';
import 'package:raraapp/api/json.dart';

/// Valores aceitos pelo backend (enums em `models/user.model.js`).
const userGenders = ['Masculino', 'Feminino'];
const userStatuses = ['Presente', 'Ausente', 'Foi embora'];
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
  'super_admin',
];

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
  final List<String> roles;
  final String? facilitator;

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
    this.roles = const [],
    this.facilitator,
  });

  bool hasAnyRole(List<String> allowed) => roles.any(allowed.contains);

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
    roles: List<String>.from(json['roles'] ?? const []),
    facilitator: json['facilitator'],
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
    'roles': roles,
    'facilitator': facilitator,
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
  };
}

/// Resposta do login.
class Session {
  final User user;
  final String accessToken;
  final String refreshToken;

  const Session({
    required this.user,
    required this.accessToken,
    required this.refreshToken,
  });

  factory Session.fromJson(Map<String, dynamic> json) => Session(
    user: User.fromJson(json['user']),
    accessToken: json['accessToken'],
    refreshToken: json['refreshToken'],
  );

  Map<String, dynamic> toJson() => {
    'user': user.toJson(),
    'accessToken': accessToken,
    'refreshToken': refreshToken,
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
  }) async => User.fromJson(
    await ApiClient.patch('/users/facilitator/$id', {
      'invitationofgrace': ?invitationofgrace,
      'status': ?status,
      'baptized': ?baptized,
      'facilitator': ?facilitator,
    }),
  );
}
