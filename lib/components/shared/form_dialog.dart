import 'package:flutter/material.dart';
import 'package:raraapp/components/shared/effects/glow_button.dart';

/// Moldura padrão dos dialogs de formulário (título, campos, Cancelar/Salvar).
class FormDialog extends StatelessWidget {
  final String title;
  final GlobalKey<FormState> formKey;
  final List<Widget> children;
  final String submitLabel;
  final bool isSaving;
  final VoidCallback onSubmit;

  const FormDialog({
    super.key,
    required this.title,
    required this.formKey,
    required this.children,
    required this.submitLabel,
    required this.onSubmit,
    this.isSaving = false,
  });

  @override
  Widget build(BuildContext context) {
    return Dialog(
      child: Column(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          DialogHeader(title: title),
          Flexible(
            child: SingleChildScrollView(
              padding: const EdgeInsets.fromLTRB(24, 8, 24, 8),
              child: Form(
                key: formKey,
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.stretch,
                  spacing: 16,
                  children: children,
                ),
              ),
            ),
          ),
          Padding(
            padding: const EdgeInsets.fromLTRB(24, 12, 24, 24),
            child: Row(
              spacing: 12,
              children: [
                Expanded(
                  child: SizedBox(
                    height: 54,
                    child: OutlinedButton(
                      onPressed: () => Navigator.pop(context),
                      child: const Text('Cancelar'),
                    ),
                  ),
                ),
                Expanded(
                  child: GlowButton(
                    label: submitLabel,
                    loading: isSaving,
                    onPressed: onSubmit,
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

/// Topo dos dialogs: título (+ subtítulo) e botão fechar.
class DialogHeader extends StatelessWidget {
  final String title;
  final String? subtitle;

  const DialogHeader({super.key, required this.title, this.subtitle});

  @override
  Widget build(BuildContext context) {
    final text = Theme.of(context).textTheme;
    return Padding(
      padding: const EdgeInsets.fromLTRB(24, 20, 12, 8),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Expanded(
            child: Padding(
              padding: const EdgeInsets.only(top: 6),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    title,
                    style: text.titleLarge?.copyWith(
                      fontWeight: FontWeight.w800,
                    ),
                  ),
                  if (subtitle != null)
                    Text(
                      subtitle!,
                      style: text.bodyMedium?.copyWith(
                        color: Theme.of(
                          context,
                        ).colorScheme.onSurface.withValues(alpha: 0.7),
                      ),
                    ),
                ],
              ),
            ),
          ),
          IconButton(
            tooltip: 'Fechar',
            icon: const Icon(Icons.close),
            onPressed: () => Navigator.pop(context),
          ),
        ],
      ),
    );
  }
}
