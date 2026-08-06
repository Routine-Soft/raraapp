import 'package:raraapp/constants/api_constants.dart';
import 'package:raraapp/models/user.dart';
import 'package:raraapp/models/church.dart';
import 'package:raraapp/services/api_service.dart';

class ChurchService {
  // ============ Públicas ============

  /// Get todas as igrejas (público, sem token)
  static Future<List<ChurchDTO>> getAllChurches() async {
    try {
      final response = await ApiService.get(ApiConstants.churchGetAll);

      // Resposta padronizada: { success: true, data: [...] }
      if (response is! Map<String, dynamic>) {
        throw Exception('Unexpected response format');
      }

      final churches = response['data'] as List<dynamic>;

      return churches
          .map((c) => ChurchDTO.fromJson(c as Map<String, dynamic>))
          .toList();
    } catch (e) {
      rethrow;
    }
  }

  /// Get igreja por ID
  static Future<ChurchDTO> getChurchById(String churchId) async {
    try {
      final response = await ApiService.get(
        ApiConstants.churchGetById.replaceFirst(':id', churchId),
      );
      // Resposta padronizada: { success: true, data: {...} }
      return ChurchDTO.fromJson(response['data'] as Map<String, dynamic>);
    } catch (e) {
      rethrow;
    }
  }

  // ============ Admin Only (super_admin) ============

  /// Criar nova igreja (super_admin only)
  static Future<ChurchDTO> createChurch({
    required String name,
    required String token,
    String? pastor1,
    String? pastor2,
    AddressDTO? address,
    String? cnpj,
    int? totalMembers,
  }) async {
    try {
      final body = {
        'name': name,
        'pastor1': pastor1,
        'pastor2': pastor2,
        'address': address?.toJson(),
        'cnpj': cnpj,
        'totalMembers': totalMembers,
      };

      // Remove valores null
      body.removeWhere((key, value) => value == null);

      final response = await ApiService.post(
        ApiConstants.churchCreate,
        body: body,
        token: token,
      );
      // Resposta padronizada: { success: true, data: {...} }
      return ChurchDTO.fromJson(response['data'] as Map<String, dynamic>);
    } catch (e) {
      rethrow;
    }
  }

  /// Update igreja (super_admin only)
  static Future<ChurchDTO> updateChurch(
    String churchId, {
    required Map<String, dynamic> data,
    required String token,
  }) async {
    try {
      final response = await ApiService.patch(
        ApiConstants.churchUpdate.replaceFirst(':id', churchId),
        body: data,
        token: token,
      );
      // Resposta padronizada: { success: true, data: {...} }
      return ChurchDTO.fromJson(response['data'] as Map<String, dynamic>);
    } catch (e) {
      rethrow;
    }
  }

  /// Delete igreja (super_admin only)
  static Future<void> deleteChurch(
    String churchId, {
    required String token,
  }) async {
    try {
      await ApiService.delete(
        ApiConstants.churchDelete.replaceFirst(':id', churchId),
        token: token,
      );
    } catch (e) {
      rethrow;
    }
  }
}
