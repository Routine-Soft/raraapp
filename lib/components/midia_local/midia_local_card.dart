import 'package:flutter/material.dart';
import 'package:raraapp/api/midia_local_api.dart';
import 'package:raraapp/components/shared/format.dart';

/// Card da mídia. Com [onEdit]/[onDelete] mostra o menu de admin;
/// sem eles, é a versão compacta usada na Home.
class MidiaLocalCard extends StatelessWidget {
  final MidiaLocal midia;
  final VoidCallback? onEdit;
  final VoidCallback? onDelete;

  const MidiaLocalCard({
    super.key,
    required this.midia,
    this.onEdit,
    this.onDelete,
  });

  bool get _isAdmin => onEdit != null || onDelete != null;

  @override
  Widget build(BuildContext context) {
    final textTheme = Theme.of(context).textTheme;
    final small = textTheme.bodySmall?.copyWith(color: Colors.grey[700]);

    return Card(
      elevation: 2,
      margin: _isAdmin ? const EdgeInsets.only(bottom: 12) : EdgeInsets.zero,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
      child: Padding(
        padding: EdgeInsets.all(_isAdmin ? 16 : 12),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          mainAxisSize: MainAxisSize.min,
          children: [
            Row(
              children: [
                Expanded(
                  child: Text(
                    midia.title.isEmpty ? 'Sem título' : midia.title,
                    maxLines: 2,
                    overflow: TextOverflow.ellipsis,
                    style:
                        (_isAdmin
                                ? textTheme.titleMedium
                                : textTheme.bodyMedium)
                            ?.copyWith(fontWeight: FontWeight.bold),
                  ),
                ),
                if (_isAdmin)
                  PopupMenuButton(
                    itemBuilder: (_) => [
                      PopupMenuItem(onTap: onEdit, child: const Text('Editar')),
                      PopupMenuItem(
                        onTap: onDelete,
                        child: const Text('Deletar'),
                      ),
                    ],
                  ),
              ],
            ),
            const SizedBox(height: 6),
            if (midia.date != null)
              Text('Data: ${formatDate(midia.date)}', style: small),
            if ((midia.time ?? '').isNotEmpty)
              Text('Hora: ${midia.time}', style: small),
            if ((midia.text ?? '').isNotEmpty) ...[
              const SizedBox(height: 6),
              Text(
                midia.text!,
                style: textTheme.bodySmall,
                maxLines: _isAdmin ? null : 3,
                overflow: _isAdmin ? null : TextOverflow.ellipsis,
              ),
            ],
          ],
        ),
      ),
    );
  }
}
