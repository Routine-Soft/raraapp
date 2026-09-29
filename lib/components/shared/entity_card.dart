import 'package:flutter/material.dart';

/// Card padrão das listas: título em negrito + menu Editar/Deletar
/// (o menu só aparece quando [onEdit]/[onDelete] são passados).
class EntityCard extends StatelessWidget {
  final String title;
  final List<Widget> children;
  final VoidCallback? onEdit;
  final VoidCallback? onDelete;

  const EntityCard({
    super.key,
    required this.title,
    required this.children,
    this.onEdit,
    this.onDelete,
  });

  @override
  Widget build(BuildContext context) {
    return Card(
      margin: const EdgeInsets.only(bottom: 12),
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                Expanded(
                  child: Text(
                    title,
                    style: Theme.of(context).textTheme.titleMedium?.copyWith(
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ),
                if (onEdit != null || onDelete != null)
                  PopupMenuButton(
                    itemBuilder: (_) => [
                      if (onEdit != null)
                        PopupMenuItem(
                          onTap: onEdit,
                          child: const Text('Editar'),
                        ),
                      if (onDelete != null)
                        PopupMenuItem(
                          onTap: onDelete,
                          child: const Text('Deletar'),
                        ),
                    ],
                  ),
              ],
            ),
            const SizedBox(height: 12),
            ...children,
          ],
        ),
      ),
    );
  }
}
