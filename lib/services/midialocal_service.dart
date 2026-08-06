import 'package:raraapp/constants/api_constants.dart';
import 'package:raraapp/models/midialocal.dart';
import 'package:raraapp/services/api_service.dart';

class MidiaLocalService {
  // ============ Públicas ============

  /// Create midia local
  static Future<MidiaLocalDTO> createMidiaLocal({
    required DateTime date,
    required String time,
    required String title,
    required String text,
    required String churchId,
    required String image,
    required String token,
  }) async {
    try {
      final body = {
        'date': date.toIso8601String(),
        'time': time,
        'title': title,
        'text': text,
        'churchId': churchId,
        'image': image,
      };

      final response = await ApiService.post(
        ApiConstants.createMidiaLocal,
        body: body,
        token: token,
      );
      // Resposta padronizada: { success: true, data: {...} }
      return MidiaLocalDTO.fromJson(response['data'] as Map<String, dynamic>);
    } catch (e) {
      rethrow;
    }
  }

  /// Get todas as mídias locais (protegido, requer token)
  static Future<List<MidiaLocalDTO>> getAllMidiasLocais({
    required String token,
  }) async {
    try {
      print('[MidiaLocalService] GET: ${ApiConstants.getAllMidiaLocals}');
      final response = await ApiService.get(ApiConstants.getAllMidiaLocals, token: token);
      print('[MidiaLocalService] Response: $response');

      // Resposta padronizada: { success: true, data: [...] }
      final List<dynamic> midiasLocais = response['data'] as List<dynamic>;
      print('[MidiaLocalService] Mídias parseadas: ${midiasLocais.length}');
      return midiasLocais
          .map((m) => MidiaLocalDTO.fromJson(m as Map<String, dynamic>))
          .toList();
    } catch (e) {
      print('[MidiaLocalService] Erro: $e');
      rethrow;
    }
  }

  /// Get mídia local por ID
  static Future<MidiaLocalDTO> getMidiaLocalById(
    String midiaLocalId, {
    required String token,
  }) async {
    try {
      final response = await ApiService.get(
        ApiConstants.getMidiaLocalById.replaceFirst(':id', midiaLocalId),
        token: token,
      );
      // Resposta padronizada: { success: true, data: {...} }
      return MidiaLocalDTO.fromJson(response['data'] as Map<String, dynamic>);
    } catch (e) {
      rethrow;
    }
  }

  /// Update mídia local
  static Future<MidiaLocalDTO> updateMidiaLocal(
    String midiaLocalId, {
    required Map<String, dynamic> data,
    required String token,
  }) async { 
    try {
      final response = await ApiService.patch(
        ApiConstants.updateMidiaLocal.replaceFirst(':id', midiaLocalId),
        body: data,
        token: token,
      );
      // Resposta padronizada: { success: true, data: {...} }
      return MidiaLocalDTO.fromJson(response['data'] as Map<String, dynamic>);
    } catch (e) {
      rethrow;
    }
  }

  /// Delete mídia local
  static Future<void> deleteMidiaLocal(
    String midiaLocalId, {
    required String token,
  }) async {
    try { 
      await ApiService.delete(
        ApiConstants.deleteMidiaLocal.replaceFirst(':id', midiaLocalId),
        token: token,
      );
    } catch (e) {
      rethrow;
    }
  }
}