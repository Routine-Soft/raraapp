import 'dart:async';
import 'dart:convert';
import 'dart:io';
import 'package:http/http.dart' as http;
import 'package:raraapp/constants/api_constants.dart';

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
  static Future<Map<String, dynamic>> get(
    String endpoint, {
    String? token,
  }) async {
    try {
      final url = Uri.parse('$_baseUrl$endpoint');

      final response = await http
          .get(
            url,
            headers: _getHeaders(token: token),
          )
          .timeout(ApiConstants.receiveTimeout);

      return _handleResponse(response);
    } catch (e) {
      throw _handleError(e);
    }
  }

  // POST
  static Future<Map<String, dynamic>> post(
    String endpoint, {
    required Map<String, dynamic> body,
    String? token,
  }) async {
    try {
      final url = Uri.parse('$_baseUrl$endpoint');

      final response = await http
          .post(
            url,
            headers: _getHeaders(token: token),
            body: jsonEncode(body),
          )
          .timeout(ApiConstants.connectTimeout);

      return _handleResponse(response);
    } catch (e) {
      throw _handleError(e);
    }
  }

  // PUT
  static Future<Map<String, dynamic>> put(
    String endpoint, {
    required Map<String, dynamic> body,
    String? token,
  }) async {
    try {
      final url = Uri.parse('$_baseUrl$endpoint');

      final response = await http
          .put(
            url,
            headers: _getHeaders(token: token),
            body: jsonEncode(body),
          )
          .timeout(ApiConstants.connectTimeout);

      return _handleResponse(response);
    } catch (e) {
      throw _handleError(e);
    }
  }

  // PATCH
  static Future<Map<String, dynamic>> patch(
    String endpoint, {
    required Map<String, dynamic> body,
    String? token,
  }) async {
    try {
      final url = Uri.parse('$_baseUrl$endpoint');

      final response = await http
          .patch(
            url,
            headers: _getHeaders(token: token),
            body: jsonEncode(body),
          )
          .timeout(ApiConstants.connectTimeout);

      return _handleResponse(response);
    } catch (e) {
      throw _handleError(e);
    }
  }

  // DELETE
  static Future<Map<String, dynamic>> delete(
    String endpoint, {
    String? token,
  }) async {
    try {
      final url = Uri.parse('$_baseUrl$endpoint');

      final response = await http
          .delete(
            url,
            headers: _getHeaders(token: token),
          )
          .timeout(ApiConstants.receiveTimeout);

      return _handleResponse(response);
    } catch (e) {
      throw _handleError(e);
    }
  }

  // Tratador de resposta
  static Map<String, dynamic> _handleResponse(http.Response response) {
    try {
      final decoded = jsonDecode(response.body) as Map<String, dynamic>;

      if (response.statusCode >= 200 && response.statusCode < 300) {
        return decoded;
      } else {
        throw Exception(
          decoded['message'] ?? 'Error: ${response.statusCode}',
        );
      }
    } catch (e) {
      throw Exception('Failed to parse response: $e');
    }
  }

  // Tratador de erros
  static Exception _handleError(dynamic error) {
    if (error is http.ClientException) {
      return Exception('Network error: ${error.message}');
    } else if (error is SocketException) {
      return Exception('Connection failed');
    } else if (error is TimeoutException) {
      return Exception('Request timeout');
    } else {
      return Exception('Unexpected error: $error');
    }
  }
}
