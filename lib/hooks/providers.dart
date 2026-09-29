import 'package:flutter/widgets.dart';
import 'package:provider/provider.dart';
import 'package:provider/single_child_widget.dart';
import 'package:raraapp/hooks/use_auth.dart';
import 'package:raraapp/hooks/use_christian_groups.dart';
import 'package:raraapp/hooks/use_churches.dart';
import 'package:raraapp/hooks/use_curas.dart';
import 'package:raraapp/hooks/use_lesson_progress.dart';
import 'package:raraapp/hooks/use_lessons.dart';
import 'package:raraapp/hooks/use_midia_locals.dart';
import 'package:raraapp/hooks/use_users.dart';

/// Todos os hooks do app, registrados uma vez no `main.dart`.
List<SingleChildWidget> hookProviders() => [
  ChangeNotifierProvider(create: (_) => AuthHook()),
  ChangeNotifierProvider(create: (_) => UsersHook()),
  ChangeNotifierProvider(create: (_) => ChurchesHook()),
  ChangeNotifierProvider(create: (_) => MidiaLocalsHook()),
  ChangeNotifierProvider(create: (_) => ChristianGroupsHook()),
  ChangeNotifierProvider(create: (_) => LessonsHook()),
  ChangeNotifierProvider(create: (_) => LessonProgressHook()),
  ChangeNotifierProvider(create: (_) => CurasHook()),
];

/// Faz logout e limpa os dados em memória do usuário anterior.
Future<void> logoutAndClear(BuildContext context) async {
  useUsers(context, listen: false).reset();
  useMidiaLocals(context, listen: false).reset();
  useChristianGroups(context, listen: false).reset();
  useLessons(context, listen: false).reset();
  useLessonProgress(context, listen: false).reset();
  useCuras(context, listen: false).reset();
  await useAuth(context, listen: false).logout();
}
