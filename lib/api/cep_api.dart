import 'dart:async';
import 'dart:convert';

import 'package:http/http.dart' as http;
import 'package:raraapp/api/address.dart';

/// Busca de endereço pelo CEP no ViaCEP (serviço público, sem chave).
/// Não passa pelo [ApiClient] porque não é o nosso backend.
class CepApi {
  /// Só os 8 dígitos do CEP ("01001-000" -> "01001000").
  static String digits(String cep) => cep.replaceAll(RegExp(r'\D'), '');

  /// Endereço do CEP, ou `null` se não existir. Lança [CepException] quando
  /// não dá para consultar (sem internet, serviço fora do ar).
  static Future<Address?> lookup(String cep) async {
    final code = digits(cep);
    if (code.length != 8) return null;

    final http.Response response;
    try {
      response = await http
          .get(Uri.parse('https://viacep.com.br/ws/$code/json/'))
          .timeout(const Duration(seconds: 8));
    } on TimeoutException {
      throw CepException('A busca do CEP demorou demais');
    } catch (_) {
      throw CepException('Não foi possível buscar o CEP');
    }
    // CEP com formato válido mas inexistente: 200 com {"erro": "true"}
    if (response.statusCode == 400) return null;
    if (response.statusCode != 200) {
      throw CepException('Não foi possível buscar o CEP');
    }

    final json = jsonDecode(utf8.decode(response.bodyBytes));
    if (json is! Map<String, dynamic> || json.containsKey('erro')) return null;

    String? text(String key) {
      final value = (json[key] as String?)?.trim();
      return value == null || value.isEmpty ? null : value;
    }

    return Address(
      cep: '${code.substring(0, 5)}-${code.substring(5)}',
      address: text('logradouro'),
      neighborhood: text('bairro'),
      city: text('localidade'),
      state: text('uf'),
      country: 'Brasil',
    );
  }
}

class CepException implements Exception {
  final String message;

  CepException(this.message);

  @override
  String toString() => message;
}
