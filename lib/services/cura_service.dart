import 'package:raraapp/constants/api_constants.dart';
import 'package:raraapp/models/cura.dart';
import 'package:raraapp/services/api_service.dart';

class CuraService {
  // ============ Patient Side ============

  /// Criar novo pedido de cura
  static Future<CuraDTO> createCura({
    required String type,
    String? churchId,
    required String token,
  }) async {
    try {
      final body = {
        'type': type,
        'churchId': churchId,
      };

      // Remove valores null
      body.removeWhere((key, value) => value == null);

      final response = await ApiService.post(
        ApiConstants.curaCreate,
        body: body,
        token: token,
      );
      return CuraDTO.fromJson(response);
    } catch (e) {
      rethrow;
    }
  }

  /// Get meus pedidos de cura
  static Future<List<CuraDTO>> getMyCura({
    required String token,
  }) async {
    try {
      final response = await ApiService.get(
        ApiConstants.curaGetMine,
        token: token,
      );

      final List<dynamic> curas = response['data'] ?? response;
      return curas
          .map((c) => CuraDTO.fromJson(c as Map<String, dynamic>))
          .toList();
    } catch (e) {
      rethrow;
    }
  }

  // ============ Manager/Admin Side ============

  /// Get todos os pedidos de cura (com filtros opcionais)
  static Future<List<CuraDTO>> getAllCura({
    String? status,
    String? type,
    required String token,
  }) async {
    try {
      final queryParams = <String, String>{};
      if (status != null) queryParams['status'] = status;
      if (type != null) queryParams['type'] = type;

      String url = ApiConstants.curaGetAll;
      if (queryParams.isNotEmpty) {
        final query = queryParams.entries
            .map((e) => '${e.key}=${e.value}')
            .join('&');
        url = '${ApiConstants.curaGetAll}?$query';
      }

      final response = await ApiService.get(url, token: token);

      final List<dynamic> curas = response['data'] ?? response;
      return curas
          .map((c) => CuraDTO.fromJson(c as Map<String, dynamic>))
          .toList();
    } catch (e) {
      rethrow;
    }
  }

  /// Get pedido de cura por ID
  static Future<CuraDTO> getCuraById(
    String curaId, {
    required String token,
  }) async {
    try {
      final response = await ApiService.get(
        ApiConstants.curaGetById.replaceFirst(':id', curaId),
        token: token,
      );
      return CuraDTO.fromJson(response);
    } catch (e) {
      rethrow;
    }
  }

  /// Atualizar pedido de cura (type, notes, assignedTo)
  static Future<CuraDTO> updateCura(
    String curaId, {
    required Map<String, dynamic> data,
    required String token,
  }) async {
    try {
      final response = await ApiService.patch(
        ApiConstants.curaUpdate.replaceFirst(':id', curaId),
        body: data,
        token: token,
      );
      return CuraDTO.fromJson(response);
    } catch (e) {
      rethrow;
    }
  }

  /// Atualizar status do pedido (kanban drag-and-drop)
  static Future<CuraDTO> updateStatus(
    String curaId, {
    required String status,
    required String token,
  }) async {
    try {
      final response = await ApiService.patch(
        ApiConstants.curaUpdateStatus.replaceFirst(':id', curaId),
        body: {'status': status},
        token: token,
      );
      return CuraDTO.fromJson(response);
    } catch (e) {
      rethrow;
    }
  }

  /// Deletar pedido de cura
  static Future<void> deleteCura(
    String curaId, {
    required String token,
  }) async {
    try {
      await ApiService.delete(
        ApiConstants.curaDelete.replaceFirst(':id', curaId),
        token: token,
      );
    } catch (e) {
      rethrow;
    }
  }

  /// Get contadores do dashboard (fila_espera, andamento, concluido)
  static Future<Map<String, dynamic>> getSummary({
    required String token,
  }) async {
    try {
      final response = await ApiService.get(
        ApiConstants.curaSummary,
        token: token,
      );

      return response as Map<String, dynamic>;
    } catch (e) {
      rethrow;
    }
  }
}
