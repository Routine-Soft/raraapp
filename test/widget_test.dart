import 'package:flutter_test/flutter_test.dart';
import 'package:raraapp/components/app/welcome_page.dart';
import 'package:raraapp/main.dart';
import 'package:shared_preferences/shared_preferences.dart';

void main() {
  testWidgets('sem sessão salva, o app abre na tela de boas-vindas', (tester) async {
    SharedPreferences.setMockInitialValues({});

    await tester.pumpWidget(const MyApp());
    // O fundo animado roda sem parar, então não dá para usar pumpAndSettle:
    // avança o tempo da abertura animada + leitura da sessão + entradas.
    for (var i = 0; i < 10; i++) {
      await tester.pump(const Duration(milliseconds: 500));
    }

    expect(find.byType(WelcomePage), findsOneWidget);
  });
}
