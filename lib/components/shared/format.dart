String _two(int n) => n.toString().padLeft(2, '0');

/// 2026-09-29 -> "29/09/2026"
String formatDate(DateTime? date) =>
    date == null ? '' : '${_two(date.day)}/${_two(date.month)}/${date.year}';
