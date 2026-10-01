import 'dart:async';
import 'dart:convert';

import 'package:flutter/foundation.dart';
import 'package:http/http.dart' as http;
import 'package:raraapp/api/session_storage.dart';

/// Endereço do backend. Para testar com o backend local:
/// `flutter run --dart-define=API_URL=http://localhost:8080/api`
const baseUrl = String.fromEnvironment(
  'API_URL',
  defaultValue: 'https://rara.cestsegtrabalho.com.br/api',
);
const _timeout = Duration(seconds: 10);

/// Erro retornado pela API (ou de rede, com statusCode 0).
class ApiException implements Exception {
  final String message;
  final int statusCode;

  ApiException(this.message, this.statusCode);

  @override
  String toString() => message;
}

/// Cliente HTTP único do app.
///
/// - Injeta o token automaticamente (lido da sessão salva).
/// - Já devolve o `data` da resposta padrão `{ success, data, message }`.
class ApiClient {
  static Future<dynamic> get(String path) => _send('GET', path);

  static Future<dynamic> post(String path, [Map<String, dynamic>? body]) =>
      _send('POST', path, body);

  static Future<dynamic> patch(String path, Map<String, dynamic> body) =>
      _send('PATCH', path, body);

  static Future<dynamic> put(String path, Map<String, dynamic> body) =>
      _send('PUT', path, body);

  static Future<dynamic> delete(String path) => _send('DELETE', path);

  static Future<dynamic> _send(
    String method,
    String path, [
    Map<String, dynamic>? body,
  ]) async {
    final request = http.Request(method, Uri.parse('$baseUrl$path'));

    final token = (await SessionStorage.load())?.accessToken;
    if (token != null) request.headers['Authorization'] = 'Bearer $token';
    if (body != null) {
      request.headers['Content-Type'] = 'application/json';
      request.body = jsonEncode(body);
    }

    final http.Response response;
    try {
      final streamed = await request.send().timeout(_timeout);
      response = await http.Response.fromStream(streamed);
    } on TimeoutException {
      throw ApiException('Requisição expirou', 0);
    } catch (e) {
      throw ApiException('Falha na conexão', 0);
    }

    debugPrint('[API] $method $path -> ${response.statusCode}');

    final decoded = response.body.isEmpty ? null : jsonDecode(response.body);
    final ok = response.statusCode >= 200 && response.statusCode < 300;

    if (!ok) {
      final message = decoded is Map ? decoded['message'] : null;
      throw ApiException(
        message?.toString() ?? 'Erro ${response.statusCode}',
        response.statusCode,
      );
    }

    return decoded is Map ? decoded['data'] : decoded;
  }
}
