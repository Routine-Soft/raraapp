import 'package:raraapp/api/api_client.dart';
import 'package:raraapp/api/json.dart';

/// Mídia/aviso da igreja — espelha `models/midialocal.model.js`.
class MidiaLocal {
  final String id;
  final String title;
  final String? text;
  final DateTime? date;
  final String? time;
  final String? churchId;
  final String? image;

  const MidiaLocal({
    this.id = '',
    required this.title,
    this.text,
    this.date,
    this.time,
    this.churchId,
    this.image,
  });

  factory MidiaLocal.fromJson(Map<String, dynamic> json) => MidiaLocal(
    id: json['_id'] ?? '',
    title: json['title'] ?? '',
    text: json['text'],
    date: parseDate(json['date']),
    time: json['time'],
    churchId: refId(json['churchId']),
    image: json['image'],
  );

  Map<String, dynamic> toJson() => {
    'title': title,
    'text': text,
    'date': date?.toUtc().toIso8601String(),
    'time': time,
    'churchId': churchId,
    'image': image,
  };
}

/// Rotas de `/midialocal`.
class MidiaLocalApi {
  static Future<List<MidiaLocal>> getAll() async {
    final data = await ApiClient.get('/midialocal') as List;
    return data.map((json) => MidiaLocal.fromJson(json)).toList();
  }

  static Future<MidiaLocal> getById(String id) async =>
      MidiaLocal.fromJson(await ApiClient.get('/midialocal/$id'));

  static Future<MidiaLocal> create(MidiaLocal midia) async =>
      MidiaLocal.fromJson(await ApiClient.post('/midialocal', midia.toJson()));

  static Future<MidiaLocal> update(MidiaLocal midia) async =>
      MidiaLocal.fromJson(
        await ApiClient.patch('/midialocal/${midia.id}', midia.toJson()),
      );

  static Future<void> delete(String id) => ApiClient.delete('/midialocal/$id');
}
