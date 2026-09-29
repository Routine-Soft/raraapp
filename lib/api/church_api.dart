import 'package:raraapp/api/address.dart';
import 'package:raraapp/api/api_client.dart';

/// Igreja — espelha `models/church.model.js` do backend.
class Church {
  final String id;
  final String name;
  final String? pastor1;
  final String? pastor2;
  final Address? address;
  final String? cnpj;
  final String? logoUrl;
  final int totalMembers;

  const Church({
    this.id = '',
    required this.name,
    this.pastor1,
    this.pastor2,
    this.address,
    this.cnpj,
    this.logoUrl,
    this.totalMembers = 0,
  });

  bool get isNew => id.isEmpty;

  factory Church.fromJson(Map<String, dynamic> json) => Church(
    id: json['_id'] ?? '',
    name: json['name'] ?? '',
    pastor1: json['pastor1'],
    pastor2: json['pastor2'],
    address: json['address'] != null ? Address.fromJson(json['address']) : null,
    cnpj: json['cnpj'],
    logoUrl: json['logoUrl'],
    totalMembers: json['totalMembers'] ?? 0,
  );

  Map<String, dynamic> toJson() => {
    'name': name,
    'pastor1': pastor1,
    'pastor2': pastor2,
    'address': address?.toJson(),
    'cnpj': cnpj,
    'logoUrl': logoUrl,
    'totalMembers': totalMembers,
  };
}

/// Rotas de `/churchs` (listagem é pública; o resto exige super_admin).
class ChurchApi {
  static Future<List<Church>> getAll() async {
    final data = await ApiClient.get('/churchs') as List;
    return data.map((json) => Church.fromJson(json)).toList();
  }

  static Future<Church> getById(String id) async =>
      Church.fromJson(await ApiClient.get('/churchs/$id'));

  static Future<Church> create(Church church) async =>
      Church.fromJson(await ApiClient.post('/churchs', church.toJson()));

  static Future<Church> update(Church church) async => Church.fromJson(
    await ApiClient.patch('/churchs/${church.id}', church.toJson()),
  );

  static Future<void> delete(String id) => ApiClient.delete('/churchs/$id');
}
