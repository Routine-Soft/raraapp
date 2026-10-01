import 'package:flutter/services.dart';

final _whitespace = RegExp(r'\s');

/// Tira qualquer espaço (inclusive colado ou do autocompletar) e mantém o
/// cursor no lugar certo — sem isso ele ficava fora do texto.
TextEditingValue _stripSpaces(TextEditingValue value, {bool lower = false}) {
  final cursor = value.selection.baseOffset.clamp(0, value.text.length);
  final before = value.text.substring(0, cursor).replaceAll(_whitespace, '');
  var text = value.text.replaceAll(_whitespace, '');
  if (lower) text = text.toLowerCase();
  return TextEditingValue(
    text: text,
    selection: TextSelection.collapsed(offset: before.length),
  );
}

/// Remove espaços e deixa minúsculo (email).
class LowercaseNoSpaceFormatter extends TextInputFormatter {
  @override
  TextEditingValue formatEditUpdate(
    TextEditingValue oldValue,
    TextEditingValue newValue,
  ) => _stripSpaces(newValue, lower: true);
}

/// Remove espaços (senha).
class NoSpaceFormatter extends TextInputFormatter {
  @override
  TextEditingValue formatEditUpdate(
    TextEditingValue oldValue,
    TextEditingValue newValue,
  ) => _stripSpaces(newValue);
}
