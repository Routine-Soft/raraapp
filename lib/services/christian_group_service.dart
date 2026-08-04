import 'package:raraapp/constants/api_constants.dart';
import 'package:raraapp/models/christian_group.dart';
import 'package:raraapp/services/api_service.dart';

class ChristianGroupService {
  // ============ Protected ============

  /// Get todos os grupos cristãos
  static Future<List<ChristianGroupDTO>> getAllChristianGroups({
    required String token,
  }) async {
    try {
      final response = await ApiService.get(
        ApiConstants.christianGroupGetAll,
        token: token,
      );

      // Resposta padronizada: { success: true, data: [...] }
      final List<dynamic> groups = response['data'] as List<dynamic>;
      return groups
          .map((g) => ChristianGroupDTO.fromJson(g as Map<String, dynamic>))
          .toList();
    } catch (e) {
      rethrow;
    }
  }

  /// Get grupo cristão por ID
  static Future<ChristianGroupDTO> getChristianGroupById(
    String groupId, {
    required String token,
  }) async {
    try {
      final response = await ApiService.get(
        ApiConstants.christianGroupGetById.replaceFirst(':id', groupId),
        token: token,
      );
      // Resposta padronizada: { success: true, data: {...} }
      return ChristianGroupDTO.fromJson(response['data'] as Map<String, dynamic>);
    } catch (e) {
      rethrow;
    }
  }

  /// Criar novo grupo cristão
  static Future<ChristianGroupDTO> createChristianGroup({
    required String name,
    Map<String, dynamic>? address,
    String? leader,
    String? coleader,
    String? host,
    List<String>? contact,
    String? churchId,
    required String token,
  }) async {
    try {
      final body = {
        'name': name,
        'address': address,
        'leader': leader,
        'coleader': coleader,
        'host': host,
        'contact': contact,
        'churchId': churchId,
      };

      // Remove valores null
      body.removeWhere((key, value) => value == null);

      final response = await ApiService.post(
        ApiConstants.christianGroupCreate,
        body: body,
        token: token,
      );
      // Resposta padronizada: { success: true, data: {...} }
      return ChristianGroupDTO.fromJson(response['data'] as Map<String, dynamic>);
    } catch (e) {
      rethrow;
    }
  }

  /// Atualizar grupo cristão
  static Future<ChristianGroupDTO> updateChristianGroup(
    String groupId, {
    required Map<String, dynamic> data,
    required String token,
  }) async {
    try {
      final response = await ApiService.patch(
        ApiConstants.christianGroupUpdate.replaceFirst(':id', groupId),
        body: data,
        token: token,
      );
      // Resposta padronizada: { success: true, data: {...} }
      return ChristianGroupDTO.fromJson(response['data'] as Map<String, dynamic>);
    } catch (e) {
      rethrow;
    }
  }

  /// Deletar grupo cristão
  static Future<void> deleteChristianGroup(
    String groupId, {
    required String token,
  }) async {
    try {
      await ApiService.delete(
        ApiConstants.christianGroupDelete.replaceFirst(':id', groupId),
        token: token,
      );
    } catch (e) {
      rethrow;
    }
  }
}
