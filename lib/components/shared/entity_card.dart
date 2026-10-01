import 'package:flutter/material.dart';

/// Card padrão das listas: ícone + título em negrito + menu Editar/Deletar
/// (o menu só aparece quando [onEdit]/[onDelete] são passados).
class EntityCard extends StatelessWidget {
  final String title;
  final IconData? icon;
  final List<Widget> children;
  final VoidCallback? onEdit;
  final VoidCallback? onDelete;

  const EntityCard({
    super.key,
    required this.title,
    required this.children,
    this.icon,
    this.onEdit,
    this.onDelete,
  });

  @override
  Widget build(BuildContext context) {
    final scheme = Theme.of(context).colorScheme;

    return Card(
      child: Padding(
        padding: const EdgeInsets.fromLTRB(20, 16, 8, 20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          spacing: 6,
          children: [
            Row(
              children: [
                if (icon != null) ...[
                  Container(
                    padding: const EdgeInsets.all(8),
                    decoration: BoxDecoration(
                      color: scheme.primary.withValues(alpha: 0.14),
                      borderRadius: BorderRadius.circular(10),
                    ),
                    child: Icon(icon, size: 20, color: scheme.primary),
                  ),
                  const SizedBox(width: 12),
                ],
                Expanded(
                  child: Text(
                    title,
                    style: Theme.of(context).textTheme.titleMedium?.copyWith(
                      fontWeight: FontWeight.w700,
                    ),
                  ),
                ),
                if (onEdit != null || onDelete != null)
                  ItemMenu(onEdit: onEdit, onDelete: onDelete)
                else
                  const SizedBox(height: 48),
              ],
            ),
            Padding(
              padding: const EdgeInsets.only(right: 12),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                spacing: 6,
                children: children,
              ),
            ),
          ],
        ),
      ),
    );
  }
}

/// Menu "⋮" com Editar/Deletar (Deletar em destaque).
class ItemMenu extends StatelessWidget {
  final VoidCallback? onEdit;
  final VoidCallback? onDelete;
  final List<PopupMenuEntry<void>> extra;

  const ItemMenu({
    super.key,
    this.onEdit,
    this.onDelete,
    this.extra = const [],
  });

  @override
  Widget build(BuildContext context) {
    final error = Theme.of(context).colorScheme.error;
    return PopupMenuButton<void>(
      tooltip: 'Opções',
      itemBuilder: (_) => [
        ...extra,
        if (onEdit != null)
          PopupMenuItem(
            onTap: onEdit,
            child: const ListTile(
              contentPadding: EdgeInsets.zero,
              leading: Icon(Icons.edit_outlined),
              title: Text('Editar'),
            ),
          ),
        if (onDelete != null)
          PopupMenuItem(
            onTap: onDelete,
            child: ListTile(
              contentPadding: EdgeInsets.zero,
              leading: Icon(Icons.delete_outline, color: error),
              title: Text('Deletar', style: TextStyle(color: error)),
            ),
          ),
      ],
    );
  }
}
