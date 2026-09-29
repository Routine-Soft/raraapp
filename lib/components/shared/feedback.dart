import 'package:flutter/material.dart';

/// Pergunta "Tem certeza?" antes de apagar. Retorna true se confirmou.
Future<bool> confirmDelete(
  BuildContext context, {
  required String title,
  required String itemName,
}) async {
  final confirmed = await showDialog<bool>(
    context: context,
    builder: (dialogContext) => AlertDialog(
      title: Text(title),
      content: Text('Tem certeza que deseja deletar "$itemName"?'),
      actions: [
        TextButton(
          onPressed: () => Navigator.pop(dialogContext, false),
          child: const Text('Cancelar'),
        ),
        TextButton(
          onPressed: () => Navigator.pop(dialogContext, true),
          child: const Text('Deletar', style: TextStyle(color: Colors.red)),
        ),
      ],
    ),
  );
  return confirmed ?? false;
}

/// Snackbar verde (sucesso) ou vermelho (erro).
void showResult(
  BuildContext context, {
  required bool ok,
  required String success,
  String? error,
}) {
  ScaffoldMessenger.of(context).showSnackBar(
    SnackBar(
      content: Text(ok ? success : 'Erro: ${error ?? 'tente novamente'}'),
      backgroundColor: ok ? Colors.green : Colors.red,
    ),
  );
}
