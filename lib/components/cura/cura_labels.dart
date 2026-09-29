import 'package:flutter/material.dart';

const curaTypeLabels = {
  'cura_alma': 'Cura da Alma',
  'reciclagem': 'Reciclagem',
  'gabinete_pastoral': 'Gabinete Pastoral',
};

const curaStatusLabels = {
  'fila_espera': 'Fila de Espera',
  'andamento': 'Em Andamento',
  'concluido': 'Concluído',
};

const curaStatusColors = {
  'fila_espera': Colors.orange,
  'andamento': Colors.blue,
  'concluido': Colors.green,
};

/// Etiqueta colorida com o status do pedido.
class CuraStatusBadge extends StatelessWidget {
  final String status;

  const CuraStatusBadge(this.status, {super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
      decoration: BoxDecoration(
        color: curaStatusColors[status] ?? Colors.grey,
        borderRadius: BorderRadius.circular(4),
      ),
      child: Text(
        curaStatusLabels[status] ?? status,
        style: const TextStyle(
          color: Colors.white,
          fontSize: 12,
          fontWeight: FontWeight.bold,
        ),
      ),
    );
  }
}

/// Caixa cinza com as anotações do pastor.
class CuraNotes extends StatelessWidget {
  final String notes;
  final int? maxLines;

  const CuraNotes(this.notes, {super.key, this.maxLines});

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(8),
      decoration: BoxDecoration(
        color: Colors.grey[200],
        borderRadius: BorderRadius.circular(4),
      ),
      child: Text(
        notes,
        style: const TextStyle(fontSize: 12),
        maxLines: maxLines,
        overflow: maxLines == null ? null : TextOverflow.ellipsis,
      ),
    );
  }
}
