import 'package:raraapp/constants/api_constants.dart';
import 'package:raraapp/models/lesson.dart';
import 'package:raraapp/services/api_service.dart';

class LessonService {
  // ============ Private ============

  /// Get todas as lições
  static Future<List<LessonDTO>> getAllLessons() async {
    try {
      final response = await ApiService.get(ApiConstants.lessonGetAll);

      final List<dynamic> lessons = response['data'] ?? response;
      return lessons
          .map((l) => LessonDTO.fromJson(l as Map<String, dynamic>))
          .toList();
    } catch (e) {
      rethrow;
    }
  }

  /// Get lição por ID
  static Future<LessonDTO> getLessonById(String lessonId) async {
    try {
      final response = await ApiService.get(
        ApiConstants.lessonGetById.replaceFirst(':id', lessonId),
      );
      return LessonDTO.fromJson(response);
    } catch (e) {
      rethrow;
    }
  }

  // ============ Admin (super_admin) ============

  /// Create lição
  static Future<LessonDTO> createLesson({
    required String module,
    required int number,
    required String title,
    required String videoUrl,
    required String content,
    String? image,
    List<Map<String, dynamic>>? questions,
    required String token,
  }) async {
    try {
      final body = {
        'module': module,
        'number': number,
        'title': title,
        'videoUrl': videoUrl,
        'content': content,
        'image': image,
        'questions': questions ?? [],
      };

      // Remove valores null
      body.removeWhere((key, value) => value == null);

      final response = await ApiService.post(
        ApiConstants.lessonCreate,
        body: body,
        token: token,
      );
      return LessonDTO.fromJson(response);
    } catch (e) {
      rethrow;
    }
  }

  /// Update lição
  static Future<LessonDTO> updateLesson(
    String lessonId, {
    required Map<String, dynamic> data,
    required String token,
  }) async {
    try {
      final response = await ApiService.patch(
        ApiConstants.lessonUpdate.replaceFirst(':id', lessonId),
        body: data,
        token: token,
      );
      return LessonDTO.fromJson(response);
    } catch (e) {
      rethrow;
    }
  }

  /// Delete lição
  static Future<void> deleteLesson(
    String lessonId, {
    required String token,
  }) async {
    try {
      await ApiService.delete(
        ApiConstants.lessonDelete.replaceFirst(':id', lessonId),
        token: token,
      );
    } catch (e) {
      rethrow;
    }
  }
}
