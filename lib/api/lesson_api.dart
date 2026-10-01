import 'package:raraapp/api/api_client.dart';

/// Módulos aceitos pelo backend (enum em `models/lesson.model.js`), na ordem
/// em que aparecem no app.
const lessonModules = ['historia', 'reset', 'start', 'cdv'];

const _moduleLabels = {
  'historia': 'HISTÓRIA DA IGREJA',
  'reset': 'RESET',
  'start': 'START',
  'cdv': 'CDV',
};

/// Nome do módulo para mostrar na tela.
String moduleLabel(String module) =>
    _moduleLabels[module] ?? module.toUpperCase();

class Question {
  final String statement;
  final List<String> options;

  /// Só vem para super_admin; para os demais o backend esconde o gabarito.
  final int? correctOptionIndex;

  const Question({
    required this.statement,
    required this.options,
    this.correctOptionIndex,
  });

  factory Question.fromJson(Map<String, dynamic> json) => Question(
    statement: json['statement'] ?? '',
    options: List<String>.from(json['options'] ?? const []),
    correctOptionIndex: json['correctOptionIndex'],
  );

  Map<String, dynamic> toJson() => {
    'statement': statement,
    'options': options,
    'correctOptionIndex': correctOptionIndex,
  };
}

/// Aula — espelha `models/lesson.model.js`.
class Lesson {
  final String id;
  final String module;
  final int number;
  final String title;
  final String videoUrl;
  final String content;
  final String? image;

  final List<Question> questions;

  const Lesson({
    this.id = '',
    required this.module,
    required this.number,
    required this.title,
    required this.videoUrl,
    required this.content,
    this.image,
    this.questions = const [],
  });

  factory Lesson.fromJson(Map<String, dynamic> json) => Lesson(
    id: json['_id'] ?? '',
    module: json['module'] ?? '',
    number: json['number'] ?? 0,
    title: json['title'] ?? '',
    videoUrl: json['videoUrl'] ?? '',
    content: json['content'] ?? '',
    image: json['image'],
    questions: [
      for (final q in json['questions'] ?? const []) Question.fromJson(q),
    ],
  );

  Map<String, dynamic> toJson() => {
    'module': module,
    'number': number,
    'title': title,
    'videoUrl': videoUrl,
    'content': content,
    'image': image,
    'questions': [for (final q in questions) q.toJson()],
  };
}

/// Rotas de `/lessons` (criar/editar/apagar exige super_admin).
class LessonApi {
  static Future<List<Lesson>> getAll() async {
    final data = await ApiClient.get('/lessons') as List;
    return data.map((json) => Lesson.fromJson(json)).toList();
  }

  static Future<Lesson> getById(String id) async =>
      Lesson.fromJson(await ApiClient.get('/lessons/$id'));

  static Future<Lesson> create(Lesson lesson) async =>
      Lesson.fromJson(await ApiClient.post('/lessons', lesson.toJson()));

  static Future<Lesson> update(Lesson lesson) async => Lesson.fromJson(
    await ApiClient.patch('/lessons/${lesson.id}', lesson.toJson()),
  );

  static Future<void> delete(String id) => ApiClient.delete('/lessons/$id');
}
