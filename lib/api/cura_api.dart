import 'package:raraapp/api/api_client.dart';
import 'package:raraapp/api/json.dart';
import 'package:raraapp/api/user_api.dart';

/// Valores aceitos pelo backend (enums em `models/cura.model.js`).
const curaTypes = ['cura_alma', 'reciclagem', 'gabinete_pastoral'];
const curaStatuses = ['fila_espera', 'andamento', 'concluido'];

/// Pedido de cura/aconselhamento — espelha `models/cura.model.js`.
class Cura {
  final String id;
  final String userId;

  /// Dados do solicitante (vem populado só na visão do gestor).
  final User? user;
  final String type;
  final String status;
  final String? assignedTo;
  final String? notes;
  final String? churchId;
  final DateTime? completedAt;
  final DateTime? createdAt;

  const Cura({
    required this.id,
    required this.userId,
    this.user,
    required this.type,
    required this.status,
    this.assignedTo,
    this.notes,
    this.churchId,
    this.completedAt,
    this.createdAt,
  });

  factory Cura.fromJson(Map<String, dynamic> json) => Cura(
    id: json['_id'] ?? '',
    userId: refId(json['userId']) ?? '',
    user: json['userId'] is Map ? User.fromJson(json['userId']) : null,
    type: json['type'] ?? '',
    status: json['status'] ?? curaStatuses.first,
    assignedTo: refId(json['assignedTo']),
    notes: json['notes'],
    churchId: refId(json['churchId']),
    completedAt: parseDate(json['completedAt']),
    createdAt: parseDate(json['createdAt']),
  );

  /// Cópia com outro status (usado para mover o card antes da API responder).
  Cura withStatus(String newStatus) => Cura(
    id: id,
    userId: userId,
    user: user,
    type: type,
    status: newStatus,
    assignedTo: assignedTo,
    notes: notes,
    churchId: churchId,
    completedAt: completedAt,
    createdAt: createdAt,
  );
}

/// Rotas de `/cura`.
class CuraApi {
  // ---- lado do membro ----
  static Future<Cura> create(String type) async =>
      Cura.fromJson(await ApiClient.post('/cura', {'type': type}));

  static Future<List<Cura>> getMine() async {
    final data = await ApiClient.get('/cura/me') as List;
    return data.map((json) => Cura.fromJson(json)).toList();
  }

  // ---- lado do gestor ----
  static Future<List<Cura>> getAll({String? status, String? type}) async {
    final query = Uri(
      queryParameters: {'status': ?status, 'type': ?type},
    ).query;
    final data =
        await ApiClient.get(query.isEmpty ? '/cura' : '/cura?$query') as List;
    return data.map((json) => Cura.fromJson(json)).toList();
  }

  /// Contagem por status: `{fila_espera: 3, andamento: 1, concluido: 7}`.
  static Future<Map<String, int>> summary() async =>
      Map<String, int>.from(await ApiClient.get('/cura/summary'));

  static Future<Cura> getById(String id) async =>
      Cura.fromJson(await ApiClient.get('/cura/$id'));

  static Future<Cura> update(
    String id, {
    String? type,
    String? notes,
    String? assignedTo,
  }) async => Cura.fromJson(
    await ApiClient.patch('/cura/$id', {
      'type': ?type,
      'notes': notes,
      'assignedTo': ?assignedTo,
    }),
  );

  static Future<Cura> updateStatus(String id, String status) async =>
      Cura.fromJson(
        await ApiClient.patch('/cura/$id/status', {'status': status}),
      );

  static Future<void> delete(String id) => ApiClient.delete('/cura/$id');
}
