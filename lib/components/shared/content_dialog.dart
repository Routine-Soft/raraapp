import 'package:flutter/material.dart';
import 'package:raraapp/components/shared/form_dialog.dart';

export 'package:raraapp/components/shared/section.dart';

/// Dialog de leitura: título, subtítulo opcional, botão fechar e conteúdo rolável.
class ContentDialog extends StatelessWidget {
  final String title;
  final String? subtitle;
  final List<Widget> children;

  /// Botões do rodapé. Ficam lado a lado, ocupando a largura toda.
  final List<Widget> actions;

  const ContentDialog({
    super.key,
    required this.title,
    required this.children,
    this.subtitle,
    this.actions = const [],
  });

  @override
  Widget build(BuildContext context) {
    return Dialog(
      child: Column(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          DialogHeader(title: title, subtitle: subtitle),
          Flexible(
            child: SingleChildScrollView(
              padding: const EdgeInsets.fromLTRB(24, 8, 24, 24),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                spacing: 12,
                children: children,
              ),
            ),
          ),
          if (actions.isNotEmpty)
            Padding(
              padding: const EdgeInsets.fromLTRB(24, 0, 24, 24),
              child: Row(
                spacing: 12,
                children: [
                  for (final action in actions)
                    Expanded(child: SizedBox(height: 54, child: action)),
                ],
              ),
            ),
        ],
      ),
    );
  }
}
