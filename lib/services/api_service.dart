import 'dart:async';
import 'dart:convert';
import 'dart:io';
import 'package:http/http.dart' as http;
import 'package:raraapp/constants/api_constants.dart';

/// Exceção customizada da API
class ApiException implements Exception {
  final String message;
  final int statusCode;

  ApiException(this.message, this.statusCode);

  @override
  String toString() => message;
}

class ApiService {
  static const String _baseUrl = ApiConstants.baseUrl;

  // Headers padrão
  static Map<String, String> _getHeaders({String? token}) {
    final headers = {
      'Content-Type': 'application/json',
    };

    if (token != null) {
      headers['Authorization'] = 'Bearer $token';
    }

    return headers;
  }

  // GET
  static Future<dynamic> get(
    String endpoint, {
    String? token,
  }) async {
    try {
      final url = Uri.parse('$_baseUrl$endpoint');
      
      print('[API GET] URL: $url');

      final response = await http
          .get(
            url,
            headers: _getHeaders(token: token),
          )
          .timeout(ApiConstants.receiveTimeout);

      print('[API GET] Status: ${response.statusCode}');
      return _handleResponse(response);
    } catch (e) {
      print('[API GET] Error: $e');
      throw _handleError(e);
    }
  }

  // POST
  static Future<dynamic> post(
    String endpoint, {
    required Map<String, dynamic> body,
    String? token,
  }) async {
    try {
      final url = Uri.parse('$_baseUrl$endpoint');
      
      print('[API POST] URL: $url');
      print('[API POST] Body: $body');

      final response = await http
          .post(
            url,
            headers: _getHeaders(token: token),
            body: jsonEncode(body),
          )
          .timeout(ApiConstants.connectTimeout);

      print('[API POST] Status: ${response.statusCode}');
      return _handleResponse(response);
    } catch (e) {
      print('[API POST] Error: $e');
      throw _handleError(e);
    }
  }

  // PUT
  static Future<dynamic> put(
    String endpoint, {
    required Map<String, dynamic> body,
    String? token,
  }) async {
    try {
      final url = Uri.parse('$_baseUrl$endpoint');
      
      print('[API PUT] URL: $url');
      print('[API PUT] Body: $body');

      final response = await http
          .put(
            url,
            headers: _getHeaders(token: token),
            body: jsonEncode(body),
          )
          .timeout(ApiConstants.connectTimeout);

      print('[API PUT] Status: ${response.statusCode}');
      return _handleResponse(response);
    } catch (e) {
      print('[API PUT] Error: $e');
      throw _handleError(e);
    }
  }

  // PATCH
  static Future<dynamic> patch(
    String endpoint, {
    required Map<String, dynamic> body,
    String? token,
  }) async {
    try {
      final url = Uri.parse('$_baseUrl$endpoint');
      
      print('[API PATCH] URL: $url');
      print('[API PATCH] Body: $body');

      final response = await http
          .patch(
            url,
            headers: _getHeaders(token: token),
            body: jsonEncode(body),
          )
          .timeout(ApiConstants.connectTimeout);

      print('[API PATCH] Status: ${response.statusCode}');
      return _handleResponse(response);
    } catch (e) {
      print('[API PATCH] Error: $e');
      throw _handleError(e);
    }
  }

  // DELETE
  static Future<dynamic> delete(
    String endpoint, {
    String? token,
  }) async {
    try {
      final url = Uri.parse('$_baseUrl$endpoint');
      
      print('[API DELETE] URL: $url');

      final response = await http
          .delete(
            url,
            headers: _getHeaders(token: token),
          )
          .timeout(ApiConstants.receiveTimeout);

      print('[API DELETE] Status: ${response.statusCode}');
      return _handleResponse(response);
    } catch (e) {
      print('[API DELETE] Error: $e');
      throw _handleError(e);
    }
  }

  // Tratador de resposta
  static dynamic _handleResponse(http.Response response) {
    try {
      final decoded = jsonDecode(response.body);

      if (response.statusCode >= 200 && response.statusCode < 300) {
        print('[API RESPONSE] Success: ${response.statusCode}');
        return decoded;
      } else {
        // Se for um map, tenta pegar a mensagem
        if (decoded is Map<String, dynamic>) {
          final message = decoded['message'] ?? 'Erro ${response.statusCode}';
          print('[API RESPONSE] Error: $message (${response.statusCode})');
          throw ApiException(message, response.statusCode);
        } else {
          print('[API RESPONSE] Error: ${response.statusCode}');
          throw ApiException('Erro ${response.statusCode}', response.statusCode);
        }
      }
    } on ApiException {
      rethrow;
    } catch (e) {
      print('[API RESPONSE] Exception: $e');
      throw ApiException('Falha ao processar resposta: $e', 500);
    }
  }

  // Tratador de erros
  static ApiException _handleError(dynamic error) {
    if (error is ApiException) {
      print('[API ERROR] ApiException: ${error.message} (${error.statusCode})');
      return error;
    } else if (error is http.ClientException) {
      print('[API ERROR] ClientException: ${error.message}');
      return ApiException('Erro de rede: ${error.message}', 0);
    } else if (error is SocketException) {
      print('[API ERROR] SocketException: ${error.message}');
      return ApiException('Falha na conexão', 0);
    } else if (error is TimeoutException) {
      print('[API ERROR] TimeoutException: ${error.message}');
      return ApiException('Requisição expirou', 0);
    } else {
      print('[API ERROR] Unknown: $error');
      return ApiException('Erro inesperado: $error', 500);
    }
  }
}
