import 'package:flutter/material.dart';
import 'package:raraapp/components/gift_test/gift_scores.dart';
import 'package:raraapp/components/gift_test/gift_test_quiz_page.dart';
import 'package:raraapp/components/shared/effects/glow_button.dart';
import 'package:raraapp/components/shared/format.dart';
import 'package:raraapp/components/shared/whatsapp.dart';
import 'package:raraapp/hooks/use_auth.dart';
import 'package:raraapp/hooks/use_gift_tests.dart';

/// Resultado salvo de um teste: pontuação de cada dom, compartilhar com o
/// professor e refazer.
class GiftTestResultPage extends StatelessWidget {
  final String testKey;

  const GiftTestResultPage({super.key, required this.testKey});

  static Future<void> open(BuildContext context, String testKey) =>
      Navigator.of(context).push(
        MaterialPageRoute(builder: (_) => GiftTestResultPage(testKey: testKey)),
      );

  @override
  Widget build(BuildContext context) {
    final user = useAuth(context).user;
    final catalog = useGiftTests(context).catalog;
    final test = catalog?.byKey(testKey);
    final result = user?.giftTest(testKey);
    final text = Theme.of(context).textTheme;

    if (test == null || result == null) {
      return Scaffold(
        appBar: AppBar(),
        body: const Center(child: Text('Resultado não encontrado')),
      );
    }

    String shareText() => [
      '*${test.title.toUpperCase()}*',
      '',
      '*Nome:* ${user!.name}',
      '',
      for (final s in result.ranked) '*${s.gift}*: ${s.score}',
    ].join('\n');

    return Scaffold(
      appBar: AppBar(title: Text(test.title)),
      body: SafeArea(
        child: ListView(
          padding: const EdgeInsets.fromLTRB(16, 12, 16, 32),
          children: [
            Text(
              'Resultado do teste',
              style: text.headlineSmall?.copyWith(fontWeight: FontWeight.w800),
            ),
            const SizedBox(height: 4),
            Text(
              'Feito em ${formatDate(result.completedAt)} • quanto maior a '
              'pontuação, mais forte o dom',
              style: text.bodyMedium,
            ),
            const SizedBox(height: 24),
            GiftScores(result: result, maxScore: test.questionsPerGift * 5),
            const SizedBox(height: 32),
            GlowButton(
              label: 'Compartilhar no WhatsApp',
              icon: Icons.share_outlined,
              onPressed: () => shareOnWhatsApp(context, shareText()),
            ),
            const SizedBox(height: 12),
            SizedBox(
              height: 54,
              child: OutlinedButton.icon(
                onPressed: () => Navigator.of(context).pushReplacement(
                  MaterialPageRoute(
                    builder: (_) =>
                        GiftTestQuizPage(test: test, answers: catalog!.answers),
                  ),
                ),
                icon: const Icon(Icons.refresh),
                label: const Text('Refazer teste'),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
