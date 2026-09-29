import 'package:flutter_test/flutter_test.dart';
import 'package:raraapp/components/app/welcome_page.dart';
import 'package:raraapp/main.dart';
import 'package:shared_preferences/shared_preferences.dart';

void main() {
  testWidgets('sem sessão salva, o app abre na tela de boas-vindas', (tester) async {
    SharedPreferences.setMockInitialValues({});

    await tester.pumpWidget(const MyApp());
    await tester.pumpAndSettle();

    expect(find.byType(WelcomePage), findsOneWidget);
  });
}
