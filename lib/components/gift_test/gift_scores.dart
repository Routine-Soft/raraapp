import 'package:flutter/material.dart';
import 'package:raraapp/api/gift_test_api.dart';

/// Pontuação de cada dom em barras, do maior para o menor. Os de maior
/// pontuação (empatados no topo) ficam destacados.
class GiftScores extends StatelessWidget {
  final GiftTestResult result;

  /// Pontuação máxima de um dom (perguntas por dom × 5).
  final int maxScore;

  /// Mostra só os [limit] primeiros (ex.: resumo no painel do professor).
  final int? limit;

  const GiftScores({
    super.key,
    required this.result,
    required this.maxScore,
    this.limit,
  });

  @override
  Widget build(BuildContext context) {
    final scheme = Theme.of(context).colorScheme;
    final text = Theme.of(context).textTheme;
    final ranked = result.ranked;
    final top = ranked.isEmpty ? 0 : ranked.first.score;
    final shown = limit == null ? ranked : ranked.take(limit!).toList();

    return Column(
      spacing: 12,
      children: [
        for (final s in shown)
          Semantics(
            label: '${s.gift}: ${s.score} de $maxScore',
            excludeSemantics: true,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              spacing: 6,
              children: [
                Row(
                  children: [
                    if (s.score == top && top > 0) ...[
                      Icon(Icons.star_rounded, size: 18, color: scheme.primary),
                      const SizedBox(width: 4),
                    ],
                    Expanded(
                      child: Text(
                        s.gift,
                        style: text.labelLarge?.copyWith(
                          fontWeight: s.score == top
                              ? FontWeight.w800
                              : FontWeight.w600,
                        ),
                      ),
                    ),
                    Text(
                      '${s.score} / $maxScore',
                      style: text.bodySmall?.copyWith(
                        fontWeight: FontWeight.w700,
                      ),
                    ),
                  ],
                ),
                LinearProgressIndicator(
                  value: maxScore == 0 ? 0 : s.score / maxScore,
                  minHeight: 10,
                  borderRadius: BorderRadius.circular(999),
                ),
              ],
            ),
          ),
      ],
    );
  }
}
