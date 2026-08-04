import 'package:raraapp/constants/api_constants.dart';
import 'package:raraapp/models/lesson_progress.dart';
import 'package:raraapp/services/api_service.dart';

class LessonProgressService {
  // ============ Protected (Admin - multiple roles) ============

  /// Get todas as progressões de lições (admin only)
  static Future<List<LessonProgressDTO>> getAllProgress({
    required String token,
  }) async {
    try {
      final response = await ApiService.get(
        ApiConstants.lessonProgressGetAll,
        token: token,
      );

      // Resposta padronizada: { success: true, data: [...] }
      final List<dynamic> progresses = response['data'] as List<dynamic>;
      return progresses
          .map((p) => LessonProgressDTO.fromJson(p as Map<String, dynamic>))
          .toList();
    } catch (e) {
      rethrow;
    }
  }

  // ============ Protected (User can see own progress) ============

  /// Get meu progresso de lições
  static Future<List<LessonProgressDTO>> getMyProgress({
    required String token,
  }) async {
    try {
      final response = await ApiService.get(
        ApiConstants.lessonProgressGetMy,
        token: token,
      );

      // Resposta padronizada: { success: true, data: [...] }
      final List<dynamic> progresses = response['data'] as List<dynamic>;
      return progresses
          .map((p) => LessonProgressDTO.fromJson(p as Map<String, dynamic>))
          .toList();
    } catch (e) {
      rethrow;
    }
  }

  /// Get progresso de lição por ID
  static Future<LessonProgressDTO> getProgressById(
    String progressId, {
    required String token,
  }) async {
    try {
      final response = await ApiService.get(
        ApiConstants.lessonProgressGetById.replaceFirst(':id', progressId),
        token: token,
      );
      // Resposta padronizada: { success: true, data: {...} }
      return LessonProgressDTO.fromJson(response['data'] as Map<String, dynamic>);
    } catch (e) {
      rethrow;
    }
  }

  /// Criar novo progresso de lição
  static Future<LessonProgressDTO> createProgress({
    required String userId,
    required String lessonId,
    required int score,
    required int totalQuestions,
    List<Map<String, dynamic>>? answers,
    DateTime? completedAt,
    required String token,
  }) async {
    try {
      final body = {
        'userId': userId,
        'lessonId': lessonId,
        'score': score,
        'totalQuestions': totalQuestions,
        'answers': answers ?? [],
        'completedAt': completedAt?.toIso8601String(),
      };

      // Remove valores null
      body.removeWhere((key, value) => value == null);

      final response = await ApiService.post(
        ApiConstants.lessonProgressCreate,
        body: body,
        token: token,
      );
      // Resposta padronizada: { success: true, data: {...} }
      return LessonProgressDTO.fromJson(response['data'] as Map<String, dynamic>);
    } catch (e) {
      rethrow;
    }
  }

  /// Submeter respostas de lição e calcular score
  static Future<Map<String, dynamic>> submitAnswers({
    required String lessonId,
    required List<Map<String, dynamic>> answers,
    required String token,
  }) async {
    try {
      final body = {
        'answers': answers,
      };

      final response = await ApiService.post(
        ApiConstants.lessonSubmitAnswers.replaceFirst(':lessonId', lessonId),
        body: body,
        token: token,
      );

      // Resposta padronizada: { success: true, data: {...} }
      return response['data'] as Map<String, dynamic>;
    } catch (e) {
      rethrow;
    }
  }

  /// Atualizar progresso de lição
  static Future<LessonProgressDTO> updateProgress(
    String progressId, {
    required Map<String, dynamic> data,
    required String token,
  }) async {
    try {
      final response = await ApiService.patch(
        ApiConstants.lessonProgressUpdate.replaceFirst(':id', progressId),
        body: data,
        token: token,
      );
      // Resposta padronizada: { success: true, data: {...} }
      return LessonProgressDTO.fromJson(response['data'] as Map<String, dynamic>);
    } catch (e) {
      rethrow;
    }
  }

  /// Deletar progresso de lição
  static Future<void> deleteProgress(
    String progressId, {
    required String token,
  }) async {
    try {
      await ApiService.delete(
        ApiConstants.lessonProgressDelete.replaceFirst(':id', progressId),
        token: token,
      );
    } catch (e) {
      rethrow;
    }
  }
}
