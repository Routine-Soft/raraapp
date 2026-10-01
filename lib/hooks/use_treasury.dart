import 'package:flutter/widgets.dart';
import 'package:provider/provider.dart';
import 'package:raraapp/api/dizimo_oferta_api.dart';
import 'package:raraapp/hooks/hook.dart';

TreasuryHook useTreasury(BuildContext context, {bool listen = true}) =>
    Provider.of<TreasuryHook>(context, listen: listen);

enum ReportPeriod { day, month, year }

/// Relatório financeiro e contribuições registradas pela tesouraria.
class TreasuryHook extends Hook {
  ReportPeriod _period = ReportPeriod.month;
  DateTime _anchor = DateTime.now();
  bool _allChurches = false;
  String? _churchId;
  FinanceReport? _report;
  List<Contribution> _entries = [];

  ReportPeriod get period => _period;

  /// Dia de referência do período (o mês/ano é tirado dele).
  DateTime get anchor => _anchor;

  /// Visão do Super Intendente Geral (todas as igrejas, sem lançamentos).
  bool get allChurches => _allChurches;

  /// Igreja do relatório (null = todas, só na visão geral).
  String? get churchId => _churchId;
  FinanceReport? get report => _report;
  List<Contribution> get entries => _entries;

  String get _dateParam {
    String two(int n) => n.toString().padLeft(2, '0');
    return switch (_period) {
      ReportPeriod.day =>
        '${_anchor.year}-${two(_anchor.month)}-${two(_anchor.day)}',
      ReportPeriod.month => '${_anchor.year}-${two(_anchor.month)}',
      ReportPeriod.year => '${_anchor.year}',
    };
  }

  /// Chamado ao abrir a página: a Liderança fica presa à própria igreja
  /// ([ownChurchId]); a visão geral começa em "todas as igrejas".
  void configure({required bool allChurches, String? ownChurchId}) {
    _allChurches = allChurches;
    _churchId = allChurches ? null : ownChurchId;
    _report = null;
    _entries = [];
  }

  Future<bool> load() => run(() async {
    final args = (period: _period.name, date: _dateParam, churchId: _churchId);
    final results = await Future.wait([
      DizimoOfertaApi.report(
        period: args.period,
        date: args.date,
        churchId: args.churchId,
      ),
      if (!_allChurches)
        DizimoOfertaApi.list(
          period: args.period,
          date: args.date,
          churchId: args.churchId,
        ),
    ]);
    _report = results[0] as FinanceReport;
    _entries = _allChurches ? [] : results[1] as List<Contribution>;
  });

  void setPeriod(ReportPeriod period) {
    _period = period;
    load();
  }

  void setAnchor(DateTime date) {
    _anchor = date;
    load();
  }

  /// Vai para o dia/mês/ano anterior (-1) ou seguinte (+1).
  void shift(int delta) {
    final a = _anchor;
    setAnchor(switch (_period) {
      ReportPeriod.day => DateTime(a.year, a.month, a.day + delta),
      ReportPeriod.month => DateTime(a.year, a.month + delta),
      ReportPeriod.year => DateTime(a.year + delta),
    });
  }

  void setChurch(String? churchId) {
    if (!_allChurches) return;
    _churchId = churchId;
    load();
  }

  Future<bool> createManual({
    String? userId,
    String? donorName,
    double? tithe,
    double? offering,
    required String method,
    required DateTime date,
    String? notes,
  }) async {
    final ok = await run(
      () => DizimoOfertaApi.createManual(
        userId: userId,
        donorName: donorName,
        churchId: _churchId,
        tithe: tithe,
        offering: offering,
        method: method,
        date: date,
        notes: notes,
      ),
    );
    if (ok) await load();
    return ok;
  }

  Future<bool> remove(String id) async {
    final ok = await run(() => DizimoOfertaApi.delete(id));
    if (ok) await load();
    return ok;
  }

  void reset() {
    _report = null;
    _entries = [];
    _churchId = null;
    _allChurches = false;
    notifyListeners();
  }
}
