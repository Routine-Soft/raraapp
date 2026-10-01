import 'package:flutter/services.dart';

/// 1234.5 -> "R$ 1.234,50"
String formatMoney(double value) {
  final negative = value < 0;
  final cents = (value.abs() * 100).round();
  final reais = (cents ~/ 100).toString();
  final grouped = reais.replaceAllMapped(
    RegExp(r'\B(?=(\d{3})+(?!\d))'),
    (_) => '.',
  );
  final result = 'R\$ $grouped,${(cents % 100).toString().padLeft(2, '0')}';
  return negative ? '-$result' : result;
}

/// "1.234,50" -> 1234.5 | "" -> null
double? parseMoney(String text) {
  final digits = text.replaceAll(RegExp(r'[^0-9]'), '');
  if (digits.isEmpty) return null;
  final value = int.parse(digits) / 100;
  return value == 0 ? null : value;
}

/// Campo de valor que preenche da direita para a esquerda, como caixa
/// eletrônico: digitar 1, 5, 0, 5, 0 vira "150,50".
class MoneyInputFormatter extends TextInputFormatter {
  @override
  TextEditingValue formatEditUpdate(
    TextEditingValue oldValue,
    TextEditingValue newValue,
  ) {
    final digits = newValue.text.replaceAll(RegExp(r'[^0-9]'), '');
    if (digits.isEmpty) return const TextEditingValue();
    final text = formatMoney(int.parse(digits) / 100).replaceFirst('R\$ ', '');
    return TextEditingValue(
      text: text,
      selection: TextSelection.collapsed(offset: text.length),
    );
  }
}
