import 'package:flutter/widgets.dart';
import 'package:provider/provider.dart';
import 'package:raraapp/api/lesson_api.dart';
import 'package:raraapp/hooks/crud_hook.dart';

LessonsHook useLessons(BuildContext context, {bool listen = true}) =>
    Provider.of<LessonsHook>(context, listen: listen);

class LessonsHook extends CrudHook<Lesson> {
  List<Lesson> get lessons => items;

  /// Aulas agrupadas por módulo (na ordem de [lessonModules]) e por número.
  Map<String, List<Lesson>> get byModule {
    final grouped = {for (final m in lessonModules) m: <Lesson>[]};
    for (final lesson in items) {
      grouped.putIfAbsent(lesson.module, () => []).add(lesson);
    }
    for (final list in grouped.values) {
      list.sort((a, b) => a.number.compareTo(b.number));
    }
    return grouped;
  }

  @override
  String idOf(Lesson lesson) => lesson.id;
  @override
  Future<List<Lesson>> fetchAll() => LessonApi.getAll();
  @override
  Future<Lesson> create(Lesson lesson) => LessonApi.create(lesson);
  @override
  Future<Lesson> update(Lesson lesson) => LessonApi.update(lesson);
  @override
  Future<void> destroy(String id) => LessonApi.delete(id);
}
