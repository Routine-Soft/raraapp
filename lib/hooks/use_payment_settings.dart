import 'package:flutter/widgets.dart';
import 'package:provider/provider.dart';
import 'package:raraapp/api/dizimo_oferta_api.dart';
import 'package:raraapp/hooks/hook.dart';

PaymentSettingsHook usePaymentSettings(
  BuildContext context, {
  bool listen = true,
}) => Provider.of<PaymentSettingsHook>(context, listen: listen);

/// Chaves do Mercado Pago de cada igreja (tela do super_admin).
class PaymentSettingsHook extends Hook {
  List<ChurchPaymentSettings> _churches = [];

  List<ChurchPaymentSettings> get churches => _churches;

  Future<bool> load() =>
      run(() async => _churches = await PaymentSettingsApi.getAll());

  Future<bool> save(
    String churchId, {
    String? publicKey,
    String? accessToken,
    String? webhookSecret,
  }) => run(() async {
    final saved = await PaymentSettingsApi.save(
      churchId,
      publicKey: publicKey,
      accessToken: accessToken,
      webhookSecret: webhookSecret,
    );
    _churches = [for (final c in _churches) c.churchId == churchId ? saved : c];
  });

  Future<bool> remove(String churchId) async {
    final ok = await run(() => PaymentSettingsApi.delete(churchId));
    if (ok) await load();
    return ok;
  }

  void reset() {
    _churches = [];
    notifyListeners();
  }
}
