import 'package:flutter/material.dart';
import 'package:raraapp/api/gift_test_api.dart';
import 'package:raraapp/components/gift_test/gift_test_quiz_page.dart';
import 'package:raraapp/components/gift_test/gift_test_result_page.dart';
import 'package:raraapp/components/lesson/module_progress.dart';
import 'package:raraapp/components/shared/format.dart';
import 'package:raraapp/hooks/use_auth.dart';
import 'package:raraapp/hooks/use_gift_tests.dart';

/// Card "Testes de Dons" do Avançai, depois dos módulos (mesmo visual).
class GiftTestsCard extends StatefulWidget {
  const GiftTestsCard({super.key});

  @override
  State<GiftTestsCard> createState() => _GiftTestsCardState();
}

class _GiftTestsCardState extends State<GiftTestsCard> {
  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback(
      (_) => useGiftTests(context, listen: false).ensureLoaded(),
    );
  }

  @override
  Widget build(BuildContext context) {
    final catalog = useGiftTests(context).catalog;
    final user = useAuth(context).user;
    if (catalog == null || catalog.tests.isEmpty) return const SizedBox();

    final done = catalog.tests
        .where((t) => user?.giftTest(t.key) != null)
        .length;

    return Card(
      clipBehavior: Clip.antiAlias,
      child: ExpansionTile(
        tilePadding: const EdgeInsets.fromLTRB(20, 12, 16, 12),
        childrenPadding: const EdgeInsets.fromLTRB(8, 0, 8, 12),
        title: ProgressBar(
          label: 'TESTES DE DONS',
          completed: done,
          total: catalog.tests.length,
        ),
        children: [
          for (final (i, test) in catalog.tests.indexed)
            _TestTile(
              number: i + 1,
              test: test,
              answers: catalog.answers,
              result: user?.giftTest(test.key),
            ),
        ],
      ),
    );
  }
}

class _TestTile extends StatelessWidget {
  final int number;
  final GiftTest test;
  final List<String> answers;
  final GiftTestResult? result;

  const _TestTile({
    required this.number,
    required this.test,
    required this.answers,
    required this.result,
  });

  @override
  Widget build(BuildContext context) {
    final scheme = Theme.of(context).colorScheme;
    final done = result != null;
    // Empate no topo: mostra todos ("Profecia e Ensino")
    final top = done ? result!.ranked.first.score : 0;
    final best = done
        ? result!.ranked
              .where((s) => s.score == top)
              .map((s) => s.gift)
              .join(' e ')
        : null;

    return ListTile(
      leading: Container(
        width: 40,
        height: 40,
        alignment: Alignment.center,
        decoration: BoxDecoration(
          shape: BoxShape.circle,
          color: done ? scheme.primary : Colors.transparent,
          border: Border.all(color: done ? scheme.primary : scheme.outline),
        ),
        child: done
            ? Icon(Icons.check, color: scheme.onPrimary, size: 20)
            : Text(
                '$number',
                style: const TextStyle(fontWeight: FontWeight.w700),
              ),
      ),
      title: Text(
        test.title,
        style: const TextStyle(fontWeight: FontWeight.w600),
      ),
      subtitle: Text(
        done
            ? 'Mais forte: $best • ${formatDate(result!.completedAt)}'
            : '${test.questions.length} perguntas • não iniciado',
      ),
      trailing: const Icon(Icons.chevron_right),
      onTap: () => done
          ? GiftTestResultPage.open(context, test.key)
          : GiftTestQuizPage.open(context, test, answers),
    );
  }
}
