import 'package:flutter/material.dart';
import 'package:flutter_markdown_plus/flutter_markdown_plus.dart';
import 'package:url_launcher/url_launcher.dart';

/// Mostra um texto formatado (Markdown) com o visual do app:
/// títulos, negrito, itálico, listas, citações, links e divisórias.
/// Texto sem formatação continua aparecendo normal, com as quebras de linha.
class FormattedText extends StatelessWidget {
  final String text;

  const FormattedText(this.text, {super.key});

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final scheme = theme.colorScheme;
    final t = theme.textTheme;
    final body = t.bodyLarge?.copyWith(height: 1.6);

    final style = MarkdownStyleSheet.fromTheme(theme).copyWith(
      textScaler: MediaQuery.textScalerOf(context),
      p: body,
      pPadding: EdgeInsets.zero,
      h1: t.headlineSmall?.copyWith(fontWeight: FontWeight.w800, height: 1.3),
      h1Padding: const EdgeInsets.only(top: 12, bottom: 4),
      h2: t.titleLarge?.copyWith(
        fontWeight: FontWeight.w700,
        color: scheme.primary,
        height: 1.3,
      ),
      h2Padding: const EdgeInsets.only(top: 8, bottom: 2),
      h3: t.titleMedium?.copyWith(fontWeight: FontWeight.w700, height: 1.3),
      h3Padding: const EdgeInsets.only(top: 4),
      strong: const TextStyle(fontWeight: FontWeight.w800),
      em: const TextStyle(fontStyle: FontStyle.italic),
      del: TextStyle(
        decoration: TextDecoration.lineThrough,
        color: scheme.onSurface.withValues(alpha: 0.6),
      ),
      a: TextStyle(
        color: scheme.primary,
        fontWeight: FontWeight.w600,
        decoration: TextDecoration.underline,
        decorationColor: scheme.primary,
      ),
      blockSpacing: 14,
      listIndent: 28,
      listBullet: body?.copyWith(
        color: scheme.primary,
        fontWeight: FontWeight.w800,
      ),
      blockquote: body?.copyWith(fontStyle: FontStyle.italic),
      blockquotePadding: const EdgeInsets.fromLTRB(16, 12, 16, 12),
      blockquoteDecoration: BoxDecoration(
        color: scheme.primary.withValues(alpha: 0.10),
        borderRadius: BorderRadius.circular(12),
        border: Border(left: BorderSide(color: scheme.primary, width: 4)),
      ),
      code: t.bodyMedium?.copyWith(
        fontFamily: 'monospace',
        backgroundColor: scheme.onSurface.withValues(alpha: 0.08),
      ),
      codeblockPadding: const EdgeInsets.all(12),
      codeblockDecoration: BoxDecoration(
        color: scheme.onSurface.withValues(alpha: 0.08),
        borderRadius: BorderRadius.circular(12),
      ),
      horizontalRuleDecoration: BoxDecoration(
        border: Border(top: BorderSide(color: scheme.outlineVariant, width: 2)),
      ),
    );

    return MarkdownBody(
      data: text,
      styleSheet: style,
      softLineBreak: true,
      onTapLink: (_, href, _) {
        if (href == null) return;
        launchUrl(Uri.parse(href), mode: LaunchMode.externalApplication);
      },
    );
  }
}
