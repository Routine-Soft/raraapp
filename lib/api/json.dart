// Helpers para ler campos do JSON do backend.

/// Refs do Mongo podem vir como id (`"abc"`) ou populadas (`{ _id: "abc", ... }`).
String? refId(dynamic value) =>
    value is Map ? value['_id'] as String? : value as String?;

DateTime? parseDate(dynamic value) =>
    value is String ? DateTime.tryParse(value)?.toLocal() : null;
