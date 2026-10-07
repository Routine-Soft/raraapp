import 'package:flutter/widgets.dart';
import 'package:provider/provider.dart';
import 'package:raraapp/api/dizimo_oferta_api.dart';
import 'package:raraapp/hooks/hook.dart';

ContributionsHook useContributions(
  BuildContext context, {
  bool listen = true,
}) => Provider.of<ContributionsHook>(context, listen: listen);

/// Um mês do histórico da pessoa.
typedef ContributionMonth = ({
  DateTime month,
  double tithe,
  double offering,
  List<Contribution> entries,
});

/// Dízimos e ofertas do usuário logado.
class ContributionsHook extends Hook {
  List<Contribution> _mine = [];

  List<Contribution> get mine => _mine;

  bool get hasPending => _mine.any((c) => c.isPending);

  /// Histórico mês a mês (mais recente primeiro). Só soma o que foi aprovado.
  List<ContributionMonth> get months => filteredMonths();

  /// Anos que têm contribuição (para o filtro), do mais recente.
  List<int> get years =>
      ({for (final c in _mine) c.date.toLocal().year}.toList()
        ..sort((a, b) => b.compareTo(a)));

  /// Histórico filtrado por [year], [month] (1–12) e [day] (`null` = todos).
  List<ContributionMonth> filteredMonths({int? year, int? month, int? day}) {
    final groups = <DateTime, List<Contribution>>{};
    for (final c in _mine) {
      final local = c.date.toLocal();
      if ((year != null && local.year != year) ||
          (month != null && local.month != month) ||
          (day != null && local.day != day)) {
        continue;
      }
      groups.putIfAbsent(DateTime(local.year, local.month), () => []).add(c);
    }
    final keys = groups.keys.toList()..sort((a, b) => b.compareTo(a));
    return [
      for (final month in keys)
        (
          month: month,
          tithe: _sum(groups[month]!, (c) => c.tithe),
          offering: _sum(groups[month]!, (c) => c.offering),
          entries: groups[month]!,
        ),
    ];
  }

  static double _sum(
    List<Contribution> list,
    double? Function(Contribution) f,
  ) => list.where((c) => !c.isPending).fold(0, (sum, c) => sum + (f(c) ?? 0));

  /// Pagamento pelo app ativo na igreja da pessoa (`null` = ainda não sabe).
  bool? _paymentAvailable;
  bool? get paymentAvailable => _paymentAvailable;

  Future<bool> load() => run(() async {
    final results = await Future.wait([
      DizimoOfertaApi.getMine(),
      DizimoOfertaApi.paymentAvailable().catchError((_) => false),
    ]);
    _mine = results[0] as List<Contribution>;
    _paymentAvailable = results[1] as bool;
  });

  Future<bool> declare({
    double? tithe,
    double? offering,
    required String method,
    required DateTime date,
    String? notes,
  }) => run(() async {
    final created = await DizimoOfertaApi.declare(
      tithe: tithe,
      offering: offering,
      method: method,
      date: date,
      notes: notes,
    );
    _mine = [created, ..._mine]..sort((a, b) => b.date.compareTo(a.date));
  });

  /// Cria o pagamento no Mercado Pago e devolve o link (ou null se falhar).
  Future<String?> checkout({double? tithe, double? offering}) async {
    String? link;
    await run(() async {
      link = await DizimoOfertaApi.checkout(tithe: tithe, offering: offering);
    });
    return link;
  }

  Future<bool> remove(String id) => run(() async {
    await DizimoOfertaApi.deleteMine(id);
    _mine = _mine.where((c) => c.id != id).toList();
  });

  void reset() {
    _mine = [];
    _paymentAvailable = null;
    notifyListeners();
  }
}
