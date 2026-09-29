import 'package:raraapp/api/address.dart';
import 'package:raraapp/api/api_client.dart';
import 'package:raraapp/api/json.dart';

/// Grupo cristão (célula) — espelha `models/christiangroup.model.js`.
class ChristianGroup {
  final String id;
  final String name;
  final Address? address;
  final String? leader;
  final String? coleader;
  final String? host;
  final List<String> contact;
  final String? churchId;

  const ChristianGroup({
    this.id = '',
    required this.name,
    this.address,
    this.leader,
    this.coleader,
    this.host,
    this.contact = const [],
    this.churchId,
  });

  factory ChristianGroup.fromJson(Map<String, dynamic> json) => ChristianGroup(
    id: json['_id'] ?? '',
    name: json['name'] ?? '',
    address: json['address'] != null ? Address.fromJson(json['address']) : null,
    leader: json['leader'],
    coleader: json['coleader'],
    host: json['host'],
    contact: List<String>.from(json['contact'] ?? const []),
    churchId: refId(json['churchId']),
  );

  Map<String, dynamic> toJson() => {
    'name': name,
    'address': address?.toJson(),
    'leader': leader,
    'coleader': coleader,
    'host': host,
    'contact': contact,
    'churchId': churchId,
  };
}

/// Rotas de `/christiangroup`.
class ChristianGroupApi {
  static Future<List<ChristianGroup>> getAll() async {
    final data = await ApiClient.get('/christiangroup') as List;
    return data.map((json) => ChristianGroup.fromJson(json)).toList();
  }

  static Future<ChristianGroup> getById(String id) async =>
      ChristianGroup.fromJson(await ApiClient.get('/christiangroup/$id'));

  static Future<ChristianGroup> create(ChristianGroup group) async =>
      ChristianGroup.fromJson(
        await ApiClient.post('/christiangroup', group.toJson()),
      );

  static Future<ChristianGroup> update(ChristianGroup group) async =>
      ChristianGroup.fromJson(
        await ApiClient.patch('/christiangroup/${group.id}', group.toJson()),
      );

  static Future<void> delete(String id) =>
      ApiClient.delete('/christiangroup/$id');
}
