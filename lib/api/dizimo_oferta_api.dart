import 'package:raraapp/api/api_client.dart';
import 'package:raraapp/api/json.dart';

/// Formas de pagamento aceitas pelo backend.
const contributionMethods = ['pix', 'dinheiro', 'cartao'];

double? _money(dynamic value) =>
    value == null ? null : (value as num).toDouble();

/// Um dízimo e/ou oferta — espelha `models/dizimoOferta.model.js`.
class Contribution {
  final String id;
  final String? userId;

  /// Nome do usuário (vem populado na visão da tesouraria).
  final String? userName;

  /// Nome de quem contribuiu quando não tem conta no app.
  final String? donorName;
  final String churchId;
  final double? tithe;
  final double? offering;

  /// pix | dinheiro | cartao (nulo enquanto o pagamento do app não confirma).
  final String? method;
  final DateTime date;

  /// app | membro | tesouraria
  final String source;

  /// pendente | aprovado | recusado
  final String status;
  final String? notes;

  const Contribution({
    required this.id,
    this.userId,
    this.userName,
    this.donorName,
    required this.churchId,
    this.tithe,
    this.offering,
    this.method,
    required this.date,
    required this.source,
    required this.status,
    this.notes,
  });

  double get total => (tithe ?? 0) + (offering ?? 0);
  bool get isPending => status == 'pendente';
  String get personName => userName ?? donorName ?? 'Sem nome';

  factory Contribution.fromJson(Map<String, dynamic> json) => Contribution(
    id: json['_id'] ?? '',
    userId: refId(json['userId']),
    userName: json['userId'] is Map ? json['userId']['name'] : null,
    donorName: json['donorName'],
    churchId: refId(json['churchId']) ?? '',
    tithe: _money(json['tithe']),
    offering: _money(json['offering']),
    method: json['method'],
    date: parseDate(json['date']) ?? DateTime.now(),
    source: json['source'] ?? 'membro',
    status: json['status'] ?? 'aprovado',
    notes: json['notes'],
  );
}

/// Totais de um período (diário, mensal ou anual).
class FinanceReport {
  final double tithe;
  final double offering;
  final double total;
  final int count;

  /// pix / dinheiro / cartao -> valor
  final Map<String, double> byMethod;

  /// app / membro / tesouraria -> valor
  final Map<String, double> bySource;

  /// Evolução: por dia (mês) ou por mês (ano). `key` = "2026-09-29" ou "2026-09".
  final List<({String key, double tithe, double offering})> series;

  const FinanceReport({
    required this.tithe,
    required this.offering,
    required this.total,
    required this.count,
    required this.byMethod,
    required this.bySource,
    required this.series,
  });

  factory FinanceReport.fromJson(Map<String, dynamic> json) {
    Map<String, double> amounts(Map<String, dynamic> m) =>
        m.map((k, v) => MapEntry(k, (v as num).toDouble()));
    final totals = json['totals'] as Map<String, dynamic>;
    return FinanceReport(
      tithe: _money(totals['tithe']) ?? 0,
      offering: _money(totals['offering']) ?? 0,
      total: _money(totals['total']) ?? 0,
      count: totals['count'] ?? 0,
      byMethod: amounts(json['byMethod']),
      bySource: amounts(json['bySource']),
      series: [
        for (final s in json['series'] as List)
          (
            key: s['key'] as String,
            tithe: _money(s['tithe']) ?? 0,
            offering: _money(s['offering']) ?? 0,
          ),
      ],
    );
  }
}

/// Rotas de `/dizimo-oferta`.
class DizimoOfertaApi {
  // ---- membro ----
  static Future<List<Contribution>> getMine() async {
    final data = await ApiClient.get('/dizimo-oferta/me') as List;
    return data.map((json) => Contribution.fromJson(json)).toList();
  }

  /// A pessoa informa um dízimo/oferta dado fora do app.
  static Future<Contribution> declare({
    double? tithe,
    double? offering,
    required String method,
    required DateTime date,
    String? notes,
  }) async => Contribution.fromJson(
    await ApiClient.post('/dizimo-oferta/me', {
      'tithe': tithe,
      'offering': offering,
      'method': method,
      'date': _day(date),
      'notes': notes,
    }),
  );

  /// Cria o pagamento no Mercado Pago. Devolve o link da página de pagamento.
  static Future<String> checkout({double? tithe, double? offering}) async {
    final data = await ApiClient.post('/dizimo-oferta/checkout', {
      'tithe': tithe,
      'offering': offering,
    });
    return data['initPoint'] as String;
  }

  static Future<void> deleteMine(String id) =>
      ApiClient.delete('/dizimo-oferta/me/$id');

  // ---- tesouraria ----
  /// [period]: day | month | year. [date]: "2026-09-29" | "2026-09" | "2026".
  static Future<List<Contribution>> list({
    required String period,
    required String date,
    String? churchId,
  }) async {
    final data =
        await ApiClient.get('/dizimo-oferta?${_query(period, date, churchId)}')
            as List;
    return data.map((json) => Contribution.fromJson(json)).toList();
  }

  static Future<FinanceReport> report({
    required String period,
    required String date,
    String? churchId,
  }) async => FinanceReport.fromJson(
    await ApiClient.get(
      '/dizimo-oferta/report?${_query(period, date, churchId)}',
    ),
  );

  /// Tesouraria registra a contribuição de alguém (com ou sem conta no app).
  static Future<Contribution> createManual({
    String? userId,
    String? donorName,
    String? churchId,
    double? tithe,
    double? offering,
    required String method,
    required DateTime date,
    String? notes,
  }) async => Contribution.fromJson(
    await ApiClient.post('/dizimo-oferta', {
      'userId': ?userId,
      'donorName': ?donorName,
      'churchId': ?churchId,
      'tithe': tithe,
      'offering': offering,
      'method': method,
      'date': _day(date),
      'notes': notes,
    }),
  );

  static Future<void> delete(String id) =>
      ApiClient.delete('/dizimo-oferta/$id');

  static String _query(String period, String date, String? churchId) => Uri(
    queryParameters: {'period': period, 'date': date, 'churchId': ?churchId},
  ).query;

  static String _day(DateTime d) =>
      '${d.year}-${d.month.toString().padLeft(2, '0')}-${d.day.toString().padLeft(2, '0')}';
}

/// Situação das chaves do Mercado Pago de uma igreja (sem os segredos).
class ChurchPaymentSettings {
  final String churchId;
  final String churchName;
  final bool configured;
  final String? publicKey;

  /// Final do Access Token salvo, ex.: "••••1234".
  final String? accessTokenHint;
  final bool hasWebhookSecret;
  final DateTime? updatedAt;

  const ChurchPaymentSettings({
    required this.churchId,
    required this.churchName,
    required this.configured,
    this.publicKey,
    this.accessTokenHint,
    this.hasWebhookSecret = false,
    this.updatedAt,
  });

  factory ChurchPaymentSettings.fromJson(Map<String, dynamic> json) =>
      ChurchPaymentSettings(
        churchId: refId(json['churchId']) ?? '',
        churchName: json['churchName'] ?? '',
        configured: json['configured'] ?? false,
        publicKey: json['publicKey'],
        accessTokenHint: json['accessTokenHint'],
        hasWebhookSecret: json['hasWebhookSecret'] ?? false,
        updatedAt: parseDate(json['updatedAt']),
      );
}

/// Rotas de `/payment-settings` (só super_admin).
class PaymentSettingsApi {
  /// Caminho do webhook (o mesmo para todas as igrejas).
  static const webhookPath = '/api/dizimo-oferta/webhook';

  static Future<List<ChurchPaymentSettings>> getAll() async {
    final data = await ApiClient.get('/payment-settings') as List;
    return data.map((json) => ChurchPaymentSettings.fromJson(json)).toList();
  }

  /// Campo secreto vazio = mantém o que já estava salvo.
  static Future<ChurchPaymentSettings> save(
    String churchId, {
    String? publicKey,
    String? accessToken,
    String? webhookSecret,
  }) async => ChurchPaymentSettings.fromJson(
    await ApiClient.put('/payment-settings/$churchId', {
      'publicKey': publicKey,
      'accessToken': ?accessToken,
      'webhookSecret': ?webhookSecret,
    }),
  );

  static Future<void> delete(String churchId) =>
      ApiClient.delete('/payment-settings/$churchId');
}
