import 'package:flutter/material.dart';

/// Pergunta "Tem certeza?" antes de apagar. Retorna true se confirmou.
Future<bool> confirmDelete(
  BuildContext context, {
  required String title,
  required String itemName,
}) => confirmAction(
  context,
  title: title,
  message: 'Tem certeza que deseja deletar "$itemName"?',
  confirmLabel: 'Deletar',
);

/// Confirmação de uma ação destrutiva (botão vermelho). Retorna true se
/// confirmou.
Future<bool> confirmAction(
  BuildContext context, {
  required String title,
  required String message,
  required String confirmLabel,
  IconData icon = Icons.delete_outline,
}) async {
  final confirmed = await showDialog<bool>(
    context: context,
    builder: (dialogContext) {
      final scheme = Theme.of(dialogContext).colorScheme;
      return AlertDialog(
        icon: Icon(icon, color: scheme.error, size: 36),
        title: Text(title),
        content: Text(message, textAlign: TextAlign.center),
        actionsPadding: const EdgeInsets.fromLTRB(24, 0, 24, 24),
        actions: [
          Row(
            spacing: 12,
            children: [
              Expanded(
                child: OutlinedButton(
                  onPressed: () => Navigator.pop(dialogContext, false),
                  child: const Text('Cancelar'),
                ),
              ),
              Expanded(
                child: ElevatedButton(
                  style: ElevatedButton.styleFrom(
                    backgroundColor: scheme.error,
                    foregroundColor: scheme.onError,
                  ),
                  onPressed: () => Navigator.pop(dialogContext, true),
                  child: Text(confirmLabel),
                ),
              ),
            ],
          ),
        ],
      );
    },
  );
  return confirmed ?? false;
}

/// Snackbar de sucesso ou de erro, com ícone.
void showResult(
  BuildContext context, {
  required bool ok,
  required String success,
  String? error,
}) {
  final color = Theme.of(context).colorScheme.onInverseSurface;
  ScaffoldMessenger.of(context).showSnackBar(
    SnackBar(
      content: Row(
        children: [
          Icon(ok ? Icons.check_circle : Icons.error_outline, color: color),
          const SizedBox(width: 12),
          Expanded(
            child: Text(ok ? success : 'Erro: ${error ?? 'tente novamente'}'),
          ),
        ],
      ),
    ),
  );
}
