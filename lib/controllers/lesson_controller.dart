import 'package:flutter/material.dart';
import 'package:raraapp/models/lesson.dart';
import 'package:raraapp/services/lesson_service.dart';

class LessonController extends ChangeNotifier {
  List<LessonDTO> _lessons = [];
  LessonDTO? _selectedLesson;
  bool _isLoading = false;
  String? _error;

  // Getters
  List<LessonDTO> get lessons => _lessons;
  LessonDTO? get selectedLesson => _selectedLesson;
  bool get isLoading => _isLoading;
  String? get error => _error;

  // ============ Public ============

  /// Carregar todas as lições
  Future<bool> loadAllLessons() async {
    _isLoading = true;
    _error = null;
    notifyListeners();

    try {
      _lessons = await LessonService.getAllLessons();
      _isLoading = false;
      notifyListeners();
      return true;
    } catch (e) {
      _error = e.toString();
      _isLoading = false;
      notifyListeners();
      return false;
    }
  }

  /// Carregar lição por ID
  Future<bool> loadLessonById({required String lessonId}) async {
    _isLoading = true;
    _error = null;
    notifyListeners();

    try {
      final lesson = await LessonService.getLessonById(lessonId);
      _selectedLesson = lesson;
      _isLoading = false;
      notifyListeners();
      return true;
    } catch (e) {
      _error = e.toString();
      _isLoading = false;
      notifyListeners();
      return false;
    }
  }

  /// Selecionar lição da lista
  void selectLesson(LessonDTO lesson) {
    _selectedLesson = lesson;
    notifyListeners();
  }

  /// Limpar seleção
  void clearSelection() {
    _selectedLesson = null;
    notifyListeners();
  }

  // ============ Admin (super_admin) ============

  /// Criar nova lição
  Future<bool> createLesson({
    required String module,
    required int number,
    required String title,
    required String videoUrl,
    required String content,
    String? image,
    List<Map<String, dynamic>>? questions,
    required String token,
  }) async {
    _isLoading = true;
    _error = null;
    notifyListeners();

    try {
      final newLesson = await LessonService.createLesson(
        module: module,
        number: number,
        title: title,
        videoUrl: videoUrl,
        content: content,
        image: image,
        questions: questions,
        token: token,
      );
      _lessons.add(newLesson);
      _isLoading = false;
      notifyListeners();
      return true;
    } catch (e) {
      _error = e.toString();
      _isLoading = false;
      notifyListeners();
      return false;
    }
  }

  /// Atualizar lição
  Future<bool> updateLesson({
    required String lessonId,
    required Map<String, dynamic> data,
    required String token,
  }) async {
    _isLoading = true;
    _error = null;
    notifyListeners();

    try {
      final updatedLesson = await LessonService.updateLesson(
        lessonId,
        data: data,
        token: token,
      );
      final index = _lessons.indexWhere((l) => l.id == lessonId);
      if (index != -1) {
        _lessons[index] = updatedLesson;
      }
      if (_selectedLesson?.id == lessonId) {
        _selectedLesson = updatedLesson;
      }
      _isLoading = false;
      notifyListeners();
      return true;
    } catch (e) {
      _error = e.toString();
      _isLoading = false;
      notifyListeners();
      return false;
    }
  }

  /// Deletar lição
  Future<bool> deleteLesson({
    required String lessonId,
    required String token,
  }) async {
    _isLoading = true;
    _error = null;
    notifyListeners();

    try {
      await LessonService.deleteLesson(
        lessonId,
        token: token,
      );
      _lessons.removeWhere((l) => l.id == lessonId);
      if (_selectedLesson?.id == lessonId) {
        _selectedLesson = null;
      }
      _isLoading = false;
      notifyListeners();
      return true;
    } catch (e) {
      _error = e.toString();
      _isLoading = false;
      notifyListeners();
      return false;
    }
  }

  // ============ Helpers ============

  /// Encontrar lição na lista por ID
  LessonDTO? findLessonById(String lessonId) {
    try {
      return _lessons.firstWhere((l) => l.id == lessonId);
    } catch (e) {
      return null;
    }
  }

  /// Filtrar lições por módulo
  List<LessonDTO> getLessonsByModule(String module) {
    return _lessons.where((l) => l.module == module).toList();
  }
}
