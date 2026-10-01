import 'package:flutter/material.dart';
import 'package:raraapp/api/user_api.dart';
import 'package:raraapp/components/gift_test/gift_scores.dart';
import 'package:raraapp/components/shared/format.dart';
import 'package:raraapp/hooks/use_gift_tests.dart';

/// Resultados dos Testes de Dons de [user] (para o professor).
class GiftTestsSummary extends StatefulWidget {
  final User user;

  const GiftTestsSummary({super.key, required this.user});

  @override
  State<GiftTestsSummary> createState() => _GiftTestsSummaryState();
}

class _GiftTestsSummaryState extends State<GiftTestsSummary> {
  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback(
      (_) => useGiftTests(context, listen: false).ensureLoaded(),
    );
  }

  @override
  Widget build(BuildContext context) {
    final tests = useGiftTests(context).tests;
    final text = Theme.of(context).textTheme;

    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      spacing: 20,
      children: [
        for (final test in tests)
          Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            spacing: 10,
            children: [
              Text(
                test.title,
                style: text.titleSmall?.copyWith(fontWeight: FontWeight.w700),
              ),
              if (widget.user.giftTest(test.key) case final result?) ...[
                Text('Feito em ${formatDate(result.completedAt)}'),
                GiftScores(result: result, maxScore: test.questionsPerGift * 5),
              ] else
                const Text('Ainda não fez'),
            ],
          ),
      ],
    );
  }
}
