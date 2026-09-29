import 'package:flutter/widgets.dart';
import 'package:provider/provider.dart';
import 'package:raraapp/api/lesson_progress_api.dart';
import 'package:raraapp/hooks/hook.dart';

LessonProgressHook useLessonProgress(
  BuildContext context, {
  bool listen = true,
}) => Provider.of<LessonProgressHook>(context, listen: listen);

class LessonProgressHook extends Hook {
  List<LessonProgress> _mine = [];
  List<LessonProgress> _all = [];

  /// Resultados do usuário logado.
  List<LessonProgress> get mine => _mine;

  /// Resultados de todos (painel do professor).
  List<LessonProgress> get all => _all;

  LessonProgress? mineForLesson(String lessonId) =>
      _mine.where((p) => p.lessonId == lessonId).firstOrNull;

  List<LessonProgress> forUser(String userId) =>
      _all.where((p) => p.userId == userId).toList();

  Future<bool> loadMine() =>
      run(() async => _mine = await LessonProgressApi.getMine());

  Future<bool> loadAll() =>
      run(() async => _all = await LessonProgressApi.getAll());

  /// Envia as respostas e devolve o progresso corrigido (ou null se falhar).
  Future<LessonProgress?> submit(String lessonId, List<Answer> answers) async {
    LessonProgress? result;
    await run(() async {
      result = await LessonProgressApi.submit(lessonId, answers);
      _mine = [..._mine.where((p) => p.lessonId != lessonId), result!];
    });
    return result;
  }

  void reset() {
    _mine = [];
    _all = [];
    notifyListeners();
  }
}
