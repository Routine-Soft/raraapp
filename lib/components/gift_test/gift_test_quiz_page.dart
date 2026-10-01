import 'package:flutter/material.dart';
import 'package:raraapp/api/gift_test_api.dart';
import 'package:raraapp/components/gift_test/gift_test_result_page.dart';
import 'package:raraapp/components/shared/feedback.dart';
import 'package:raraapp/hooks/use_auth.dart';
import 'package:raraapp/hooks/use_gift_tests.dart';

/// Uma pergunta por vez; tocar na resposta já passa para a próxima.
/// Na última, envia e abre o resultado.
class GiftTestQuizPage extends StatefulWidget {
  final GiftTest test;
  final List<String> answers;

  const GiftTestQuizPage({
    super.key,
    required this.test,
    required this.answers,
  });

  static Future<void> open(
    BuildContext context,
    GiftTest test,
    List<String> answers,
  ) => Navigator.of(context).push(
    MaterialPageRoute(
      builder: (_) => GiftTestQuizPage(test: test, answers: answers),
    ),
  );

  @override
  State<GiftTestQuizPage> createState() => _GiftTestQuizPageState();
}

class _GiftTestQuizPageState extends State<GiftTestQuizPage> {
  static const _emojis = ['😞', '😐', '😊', '😄', '😜', '😎'];

  final List<int> _answers = [];

  int get _total => widget.test.questions.length;
  int get _current => _answers.length; // índice da pergunta na tela

  Future<void> _answer(int value) async {
    setState(() => _answers.add(value));
    if (_answers.length == _total) await _submit();
  }

  Future<void> _submit() async {
    final tests = useGiftTests(context, listen: false);
    final auth = useAuth(context, listen: false);
    final ok = await tests.submit(widget.test.key, _answers);
    if (!mounted) return;
    if (!ok) {
      // Volta para a última pergunta para tentar enviar de novo
      setState(() => _answers.removeLast());
      showResult(context, ok: false, success: '', error: tests.error);
      return;
    }
    await auth.syncUser(tests.submitted!);
    if (!mounted) return;
    Navigator.of(context).pushReplacement(
      MaterialPageRoute(
        builder: (_) => GiftTestResultPage(testKey: widget.test.key),
      ),
    );
  }

  Future<void> _confirmExit() async {
    if (await confirmAction(
          context,
          title: 'Sair do teste',
          message: 'Suas respostas até aqui serão perdidas.',
          confirmLabel: 'Sair',
          icon: Icons.logout,
        ) &&
        mounted) {
      Navigator.of(context).pop();
    }
  }

  @override
  Widget build(BuildContext context) {
    final scheme = Theme.of(context).colorScheme;
    final text = Theme.of(context).textTheme;
    final sending = useGiftTests(context).isLoading;
    final index = _current.clamp(0, _total - 1);
    final progress = (_current + 1).clamp(1, _total);

    return PopScope(
      canPop: _answers.isEmpty,
      onPopInvokedWithResult: (didPop, _) {
        if (!didPop && !sending) _confirmExit();
      },
      child: Scaffold(
        appBar: AppBar(title: Text(widget.test.title)),
        body: SafeArea(
          child: ListView(
            padding: const EdgeInsets.fromLTRB(16, 12, 16, 32),
            children: [
              Row(
                children: [
                  Expanded(
                    child: Text(
                      'Pergunta $progress de $_total',
                      style: text.labelLarge?.copyWith(
                        fontWeight: FontWeight.w700,
                      ),
                    ),
                  ),
                  Text('${(progress / _total * 100).round()}%'),
                ],
              ),
              const SizedBox(height: 8),
              TweenAnimationBuilder<double>(
                tween: Tween(end: progress / _total),
                duration: const Duration(milliseconds: 300),
                builder: (context, value, _) => LinearProgressIndicator(
                  value: value,
                  minHeight: 10,
                  borderRadius: BorderRadius.circular(999),
                ),
              ),
              const SizedBox(height: 28),
              AnimatedSwitcher(
                duration: const Duration(milliseconds: 250),
                child: Text(
                  widget.test.questions[index],
                  key: ValueKey(index),
                  style: text.titleLarge?.copyWith(fontWeight: FontWeight.w700),
                ),
              ),
              const SizedBox(height: 28),
              if (sending)
                const Padding(
                  padding: EdgeInsets.all(32),
                  child: Center(child: CircularProgressIndicator()),
                )
              else
                for (final (value, label) in widget.answers.indexed) ...[
                  Card(
                    color: scheme.surfaceContainerHigh,
                    margin: EdgeInsets.zero,
                    clipBehavior: Clip.antiAlias,
                    child: ListTile(
                      contentPadding: const EdgeInsets.symmetric(
                        horizontal: 16,
                        vertical: 4,
                      ),
                      title: Text(
                        label,
                        style: const TextStyle(fontWeight: FontWeight.w600),
                      ),
                      trailing: Text(
                        value < _emojis.length ? _emojis[value] : '',
                        style: const TextStyle(fontSize: 26),
                      ),
                      onTap: () => _answer(value),
                    ),
                  ),
                  const SizedBox(height: 10),
                ],
              if (_answers.isNotEmpty && !sending) ...[
                const SizedBox(height: 8),
                TextButton.icon(
                  onPressed: () => setState(() => _answers.removeLast()),
                  icon: const Icon(Icons.arrow_back),
                  label: const Text('Pergunta anterior'),
                ),
              ],
            ],
          ),
        ),
      ),
    );
  }
}
