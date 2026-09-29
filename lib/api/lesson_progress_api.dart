import 'package:raraapp/api/api_client.dart';
import 'package:raraapp/api/json.dart';

class Answer {
  final int questionIndex;
  final int selectedOptionIndex;
  final bool isCorrect;

  const Answer({
    required this.questionIndex,
    required this.selectedOptionIndex,
    this.isCorrect = false,
  });

  factory Answer.fromJson(Map<String, dynamic> json) => Answer(
    questionIndex: json['questionIndex'] ?? 0,
    selectedOptionIndex: json['selectedOptionIndex'] ?? 0,
    isCorrect: json['isCorrect'] ?? false,
  );

  /// O backend corrige sozinho, então só mandamos a escolha.
  Map<String, dynamic> toJson() => {
    'questionIndex': questionIndex,
    'selectedOptionIndex': selectedOptionIndex,
  };
}

/// Resultado de um aluno em uma aula — espelha `models/lessonProgress.model.js`.
class LessonProgress {
  final String id;
  final String userId;
  final String lessonId;
  final int score;
  final int totalQuestions;
  final List<Answer> answers;
  final DateTime? completedAt;

  const LessonProgress({
    required this.id,
    required this.userId,
    required this.lessonId,
    required this.score,
    required this.totalQuestions,
    this.answers = const [],
    this.completedAt,
  });

  factory LessonProgress.fromJson(Map<String, dynamic> json) => LessonProgress(
    id: json['_id'] ?? '',
    userId: refId(json['userId']) ?? '',
    lessonId: refId(json['lessonId']) ?? '',
    score: json['score'] ?? 0,
    totalQuestions: json['totalQuestions'] ?? 0,
    answers: [for (final a in json['answers'] ?? const []) Answer.fromJson(a)],
    completedAt: parseDate(json['completedAt']),
  );
}

/// Rotas de `/lesson-progresses` e `/lessons/:id/submit`.
class LessonProgressApi {
  /// Todos os resultados (líderes/admin).
  static Future<List<LessonProgress>> getAll() async {
    final data = await ApiClient.get('/lesson-progresses') as List;
    return data.map((json) => LessonProgress.fromJson(json)).toList();
  }

  /// Resultados do usuário logado.
  static Future<List<LessonProgress>> getMine() async {
    final data = await ApiClient.get('/lesson-progresses/me') as List;
    return data.map((json) => LessonProgress.fromJson(json)).toList();
  }

  /// Envia as respostas; o backend corrige e cria/atualiza o progresso.
  static Future<LessonProgress> submit(
    String lessonId,
    List<Answer> answers,
  ) async {
    final data = await ApiClient.post('/lessons/$lessonId/submit', {
      'answers': [for (final a in answers) a.toJson()],
    });
    return LessonProgress.fromJson(data['progress']);
  }

  static Future<void> delete(String id) =>
      ApiClient.delete('/lesson-progresses/$id');
}
