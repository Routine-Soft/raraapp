import 'package:raraapp/api/api_client.dart';
import 'package:raraapp/api/json.dart';
import 'package:raraapp/api/user_api.dart';

/// Um Teste dos Dons — espelha `data/giftTests.js` do backend.
class GiftTest {
  final String key;
  final String title;
  final List<String> gifts;
  final List<String> questions;

  const GiftTest({
    required this.key,
    required this.title,
    required this.gifts,
    required this.questions,
  });

  /// Cada dom soma [questionsPerGift] respostas de 0 a 5.
  int get questionsPerGift => questions.length ~/ gifts.length;

  factory GiftTest.fromJson(Map<String, dynamic> json) => GiftTest(
    key: json['key'] ?? '',
    title: json['title'] ?? '',
    gifts: List<String>.from(json['gifts'] ?? const []),
    questions: List<String>.from(json['questions'] ?? const []),
  );
}

/// Testes + as opções de resposta (índice = valor: 0 "Nunca" … 5).
class GiftTestCatalog {
  final List<String> answers;
  final List<GiftTest> tests;

  const GiftTestCatalog({required this.answers, required this.tests});

  GiftTest? byKey(String key) => tests.where((t) => t.key == key).firstOrNull;

  factory GiftTestCatalog.fromJson(Map<String, dynamic> json) =>
      GiftTestCatalog(
        answers: List<String>.from(json['answers'] ?? const []),
        tests: [
          for (final t in json['tests'] ?? const []) GiftTest.fromJson(t),
        ],
      );
}

/// Último resultado de um teste, salvo no usuário (`user.giftTests`).
class GiftTestResult {
  final String test;
  final List<int> answers;
  final List<({String gift, int score})> scores;
  final DateTime? completedAt;

  const GiftTestResult({
    required this.test,
    required this.answers,
    required this.scores,
    this.completedAt,
  });

  /// Do maior para o menor.
  List<({String gift, int score})> get ranked =>
      [...scores]..sort((a, b) => b.score.compareTo(a.score));

  factory GiftTestResult.fromJson(Map<String, dynamic> json) => GiftTestResult(
    test: json['test'] ?? '',
    answers: List<int>.from(json['answers'] ?? const []),
    scores: [
      for (final s in json['scores'] ?? const [])
        (gift: s['gift'] as String, score: (s['score'] as num).toInt()),
    ],
    completedAt: parseDate(json['completedAt']),
  );

  Map<String, dynamic> toJson() => {
    'test': test,
    'answers': answers,
    'scores': [
      for (final s in scores) {'gift': s.gift, 'score': s.score},
    ],
    'completedAt': completedAt?.toUtc().toIso8601String(),
  };
}

/// Rotas de `/gift-tests`.
class GiftTestApi {
  static Future<GiftTestCatalog> list() async =>
      GiftTestCatalog.fromJson(await ApiClient.get('/gift-tests'));

  /// Envia as respostas; o backend soma os dons e devolve o usuário salvo.
  static Future<User> submit(String key, List<int> answers) async =>
      User.fromJson(
        await ApiClient.post('/gift-tests/$key/submit', {'answers': answers}),
      );
}
