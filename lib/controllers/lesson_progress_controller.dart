import 'package:flutter/material.dart';
import 'package:raraapp/models/lesson_progress.dart';
import 'package:raraapp/services/lesson_progress_service.dart';

class LessonProgressController extends ChangeNotifier {
  List<LessonProgressDTO> _progresses = [];
  List<LessonProgressDTO> _myProgresses = [];
  LessonProgressDTO? _selectedProgress;
  bool _isLoading = false;
  String? _error;

  // Getters
  List<LessonProgressDTO> get progresses => _progresses;
  List<LessonProgressDTO> get myProgresses => _myProgresses;
  LessonProgressDTO? get selectedProgress => _selectedProgress;
  bool get isLoading => _isLoading;
  String? get error => _error;

  // ============ Admin ============

  /// Carregar todas as progressões (admin only)
  Future<bool> loadAllProgress({required String token}) async {
    _isLoading = true;
    _error = null;
    notifyListeners();

    try {
      _progresses =
          await LessonProgressService.getAllProgress(token: token);
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

  // ============ User (Protected) ============

  /// Carregar meu progresso de lições
  Future<bool> loadMyProgress({required String token}) async {
    _isLoading = true;
    _error = null;
    notifyListeners();

    try {
      _myProgresses =
          await LessonProgressService.getMyProgress(token: token);
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

  /// Carregar progresso por ID
  Future<bool> loadProgressById({
    required String progressId,
    required String token,
  }) async {
    _isLoading = true;
    _error = null;
    notifyListeners();

    try {
      final progress = await LessonProgressService.getProgressById(
        progressId,
        token: token,
      );
      _selectedProgress = progress;
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

  /// Selecionar progresso da lista
  void selectProgress(LessonProgressDTO progress) {
    _selectedProgress = progress;
    notifyListeners();
  }

  /// Limpar seleção
  void clearSelection() {
    _selectedProgress = null;
    notifyListeners();
  }

  /// Criar novo progresso
  Future<bool> createProgress({
    required String userId,
    required String lessonId,
    required int score,
    required int totalQuestions,
    List<Map<String, dynamic>>? answers,
    DateTime? completedAt,
    required String token,
  }) async {
    _isLoading = true;
    _error = null;
    notifyListeners();

    try {
      final newProgress = await LessonProgressService.createProgress(
        userId: userId,
        lessonId: lessonId,
        score: score,
        totalQuestions: totalQuestions,
        answers: answers,
        completedAt: completedAt,
        token: token,
      );
      _progresses.add(newProgress);
      _myProgresses.add(newProgress);
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

  /// Submeter respostas de lição
  Future<bool> submitAnswers({
    required String lessonId,
    required List<Map<String, dynamic>> answers,
    required String token,
  }) async {
    _isLoading = true;
    _error = null;
    notifyListeners();

    try {
      final result = await LessonProgressService.submitAnswers(
        lessonId: lessonId,
        answers: answers,
        token: token,
      );

      // Se houver um progresso retornado, atualizar
      if (result['progress'] != null) {
        final updatedProgress =
            LessonProgressDTO.fromJson(result['progress'] as Map<String, dynamic>);
        final index =
            _progresses.indexWhere((p) => p.id == updatedProgress.id);
        if (index != -1) {
          _progresses[index] = updatedProgress;
        }

        final myIndex =
            _myProgresses.indexWhere((p) => p.id == updatedProgress.id);
        if (myIndex != -1) {
          _myProgresses[myIndex] = updatedProgress;
        } else {
          _myProgresses.add(updatedProgress);
        }

        if (_selectedProgress?.id == updatedProgress.id) {
          _selectedProgress = updatedProgress;
        }
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

  /// Atualizar progresso
  Future<bool> updateProgress({
    required String progressId,
    required Map<String, dynamic> data,
    required String token,
  }) async {
    _isLoading = true;
    _error = null;
    notifyListeners();

    try {
      final updatedProgress = await LessonProgressService.updateProgress(
        progressId,
        data: data,
        token: token,
      );
      final index = _progresses.indexWhere((p) => p.id == progressId);
      if (index != -1) {
        _progresses[index] = updatedProgress;
      }

      final myIndex = _myProgresses.indexWhere((p) => p.id == progressId);
      if (myIndex != -1) {
        _myProgresses[myIndex] = updatedProgress;
      }

      if (_selectedProgress?.id == progressId) {
        _selectedProgress = updatedProgress;
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

  /// Deletar progresso
  Future<bool> deleteProgress({
    required String progressId,
    required String token,
  }) async {
    _isLoading = true;
    _error = null;
    notifyListeners();

    try {
      await LessonProgressService.deleteProgress(
        progressId,
        token: token,
      );
      _progresses.removeWhere((p) => p.id == progressId);
      _myProgresses.removeWhere((p) => p.id == progressId);
      if (_selectedProgress?.id == progressId) {
        _selectedProgress = null;
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

  /// Encontrar progresso na lista por ID
  LessonProgressDTO? findProgressById(String progressId) {
    try {
      return _progresses.firstWhere((p) => p.id == progressId);
    } catch (e) {
      return null;
    }
  }

  /// Encontrar progresso de uma lição específica
  LessonProgressDTO? findProgressByLessonId(String lessonId) {
    try {
      return _myProgresses.firstWhere((p) => p.lessonId == lessonId);
    } catch (e) {
      return null;
    }
  }

  /// Calcular porcentagem de acerto
  double getScorePercentage(LessonProgressDTO progress) {
    if (progress.totalQuestions == null || progress.totalQuestions == 0) {
      return 0;
    }
    return ((progress.score ?? 0) / progress.totalQuestions!) * 100;
  }
}
