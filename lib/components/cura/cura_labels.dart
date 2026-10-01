import 'package:flutter/material.dart';
import 'package:raraapp/components/shared/tag.dart';

const curaTypeLabels = {
  'cura_alma': 'Cura da Alma',
  'reciclagem': 'Reciclagem',
  'gabinete_pastoral': 'Gabinete Pastoral',
};

const curaTypeIcons = {
  'cura_alma': Icons.favorite_outline,
  'reciclagem': Icons.autorenew,
  'gabinete_pastoral': Icons.forum_outlined,
};

const curaStatusLabels = {
  'fila_espera': 'Fila de Espera',
  'andamento': 'Em Andamento',
  'concluido': 'Concluído',
  'interrompido': 'Interrompido',
  'cancelado': 'Cancelado',
};

/// Cor do status (usada só na bolinha, para não perder contraste no texto).
Color curaStatusColor(BuildContext context, String status) {
  final scheme = Theme.of(context).colorScheme;
  return switch (status) {
    'andamento' => scheme.primary,
    'concluido' => scheme.secondary,
    'interrompido' => scheme.onSurface,
    'cancelado' => scheme.error,
    _ => Colors.transparent,
  };
}

/// Etiqueta com o status do pedido.
class CuraStatusBadge extends StatelessWidget {
  final String status;

  const CuraStatusBadge(this.status, {super.key});

  @override
  Widget build(BuildContext context) {
    return Tag(
      curaStatusLabels[status] ?? status,
      dot: curaStatusColor(context, status),
    );
  }
}

/// Anotações do pastor, num bloco destacado.
class CuraNotes extends StatelessWidget {
  final String notes;
  final int? maxLines;

  const CuraNotes(this.notes, {super.key, this.maxLines});

  @override
  Widget build(BuildContext context) {
    final scheme = Theme.of(context).colorScheme;
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: scheme.onSurface.withValues(alpha: 0.06),
        borderRadius: BorderRadius.circular(12),
        border: Border(left: BorderSide(color: scheme.primary, width: 3)),
      ),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Icon(
            Icons.sticky_note_2_outlined,
            size: 18,
            color: scheme.onSurface.withValues(alpha: 0.7),
          ),
          const SizedBox(width: 8),
          Expanded(
            child: Text(
              notes,
              maxLines: maxLines,
              overflow: maxLines == null ? null : TextOverflow.ellipsis,
            ),
          ),
        ],
      ),
    );
  }
}
