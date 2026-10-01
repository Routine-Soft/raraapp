import 'package:flutter/material.dart';
import 'package:flutter_localizations/flutter_localizations.dart';
import 'package:provider/provider.dart';
import 'package:raraapp/components/app/app_initializer.dart';
import 'package:raraapp/components/theme/app_theme.dart';
import 'package:raraapp/hooks/providers.dart';
import 'package:raraapp/hooks/use_appearance.dart';

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();
  // Carrega a aparência antes de abrir, para não "piscar" com o tema padrão.
  final appearance = AppearanceHook();
  await appearance.load();
  runApp(MyApp(appearance: appearance));
}

class MyApp extends StatelessWidget {
  final AppearanceHook? appearance;

  const MyApp({super.key, this.appearance});

  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [
        ChangeNotifierProvider.value(value: appearance ?? AppearanceHook()),
        ...hookProviders(),
      ],
      child: Builder(
        builder: (context) {
          final appearance = useAppearance(context);
          return MaterialApp(
            title: 'Rara App',
            debugShowCheckedModeBanner: false,
            // App todo em português (calendário, botões padrão, textos do
            // Material como "Cancelar", "OK", dias da semana e meses)
            locale: const Locale('pt', 'BR'),
            supportedLocales: const [Locale('pt', 'BR')],
            localizationsDelegates: GlobalMaterialLocalizations.delegates,
            theme: buildAppTheme(appearance.mode),
            themeAnimationDuration: const Duration(milliseconds: 400),
            // Tamanho da letra escolhido vale para o app inteiro.
            builder: (context, child) => MediaQuery(
              data: MediaQuery.of(
                context,
              ).copyWith(textScaler: TextScaler.linear(appearance.fontScale)),
              child: child!,
            ),
            home: const AppInitializer(),
          );
        },
      ),
    );
  }
}
