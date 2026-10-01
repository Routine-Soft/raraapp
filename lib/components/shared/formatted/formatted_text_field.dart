import 'package:flutter/material.dart';
import 'package:raraapp/components/shared/formatted/formatted_text.dart';

/// Campo de texto com barra de formatação (Título, Negrito, Lista...) e
/// uma aba "Visualizar" que mostra o resultado como o aluno vai ver.
/// Guarda o texto em Markdown no [controller].
class FormattedTextField extends StatefulWidget {
  final String label;
  final TextEditingController controller;
  final String? Function(String?)? validator;

  const FormattedTextField({
    super.key,
    required this.label,
    required this.controller,
    this.validator,
  });

  @override
  State<FormattedTextField> createState() => _FormattedTextFieldState();
}

class _FormattedTextFieldState extends State<FormattedTextField> {
  final _focus = FocusNode();
  bool _preview = false;

  TextEditingController get _c => widget.controller;

  @override
  void dispose() {
    _focus.dispose();
    super.dispose();
  }

  /// Seleção atual; se não houver, o cursor vai para o fim do texto.
  TextSelection get _selection {
    final s = _c.selection;
    return s.isValid ? s : TextSelection.collapsed(offset: _c.text.length);
  }

  void _apply(String text, TextSelection selection) {
    _c.value = TextEditingValue(text: text, selection: selection);
    _focus.requestFocus();
  }

  /// Envolve a seleção: **negrito**, *itálico*...
  void _wrap(String left, String right, String placeholder) {
    final s = _selection;
    final text = _c.text;
    final inner = s.isCollapsed ? placeholder : s.textInside(text);
    final result =
        s.textBefore(text) + left + inner + right + s.textAfter(text);
    final start = s.start + left.length;
    _apply(
      result,
      TextSelection(baseOffset: start, extentOffset: start + inner.length),
    );
  }

  /// Aplica um prefixo em cada linha selecionada ("# ", "- ", "> ").
  /// Se todas já têm o prefixo, remove (liga/desliga).
  /// [numbered] numera as linhas (1. 2. 3.).
  void _prefixLines(String prefix, {bool numbered = false}) {
    final s = _selection;
    final text = _c.text;
    final start = text.lastIndexOf('\n', s.start == 0 ? 0 : s.start - 1) + 1;
    final endBreak = text.indexOf('\n', s.end);
    final end = endBreak == -1 ? text.length : endBreak;

    final lines = text.substring(start, end).split('\n');
    final pattern = numbered ? RegExp(r'^\d+\. ') : null;
    bool has(String line) =>
        pattern != null ? pattern.hasMatch(line) : line.startsWith(prefix);
    final remove = lines.every(has);

    // Títulos não se acumulam: "# " troca por "## " em vez de "## # "
    final heading = RegExp(r'^#{1,6} ');
    final updated = [
      for (final (i, line) in lines.indexed)
        if (remove)
          pattern != null
              ? line.replaceFirst(pattern, '')
              : line.substring(prefix.length)
        else
          (numbered ? '${i + 1}. ' : prefix) +
              (prefix.startsWith('#') ? line.replaceFirst(heading, '') : line),
    ].join('\n');

    final result = text.replaceRange(start, end, updated);
    _apply(result, TextSelection.collapsed(offset: start + updated.length));
  }

  void _link() {
    final s = _selection;
    final text = _c.text;
    final label = s.isCollapsed ? 'texto do link' : s.textInside(text);
    const url = 'https://';
    final result = '${s.textBefore(text)}[$label]($url)${s.textAfter(text)}';
    final urlStart = s.start + label.length + 3;
    _apply(
      result,
      TextSelection(baseOffset: urlStart, extentOffset: urlStart + url.length),
    );
  }

  void _divider() {
    final s = _selection;
    final text = _c.text;
    const hr = '\n\n---\n\n';
    final result = s.textBefore(text) + hr + s.textAfter(text);
    _apply(result, TextSelection.collapsed(offset: s.start + hr.length));
  }

  @override
  Widget build(BuildContext context) {
    final scheme = Theme.of(context).colorScheme;

    final tools = <(String, IconData?, String?, VoidCallback)>[
      ('Título', null, 'H1', () => _prefixLines('# ')),
      ('Subtítulo', null, 'H2', () => _prefixLines('## ')),
      ('Tópico', null, 'H3', () => _prefixLines('### ')),
      ('Negrito', Icons.format_bold, null, () => _wrap('**', '**', 'negrito')),
      ('Itálico', Icons.format_italic, null, () => _wrap('*', '*', 'itálico')),
      (
        'Riscado',
        Icons.format_strikethrough,
        null,
        () => _wrap('~~', '~~', 'riscado'),
      ),
      ('Lista', Icons.format_list_bulleted, null, () => _prefixLines('- ')),
      (
        'Lista numerada',
        Icons.format_list_numbered,
        null,
        () => _prefixLines('', numbered: true),
      ),
      ('Citação', Icons.format_quote, null, () => _prefixLines('> ')),
      ('Link', Icons.link, null, _link),
      ('Divisória', Icons.horizontal_rule, null, _divider),
    ];

    return FormField<String>(
      initialValue: _c.text,
      validator: (_) => widget.validator?.call(_c.text),
      builder: (field) => Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        spacing: 8,
        children: [
          Row(
            children: [
              Expanded(
                child: Text(
                  widget.label,
                  style: Theme.of(
                    context,
                  ).textTheme.titleSmall?.copyWith(fontWeight: FontWeight.w700),
                ),
              ),
              SegmentedButton<bool>(
                showSelectedIcon: false,
                style: const ButtonStyle(visualDensity: VisualDensity.compact),
                segments: const [
                  ButtonSegment(
                    value: false,
                    icon: Icon(Icons.edit_outlined, size: 18),
                    tooltip: 'Escrever',
                  ),
                  ButtonSegment(
                    value: true,
                    icon: Icon(Icons.visibility_outlined, size: 18),
                    tooltip: 'Visualizar',
                  ),
                ],
                selected: {_preview},
                onSelectionChanged: (v) => setState(() => _preview = v.first),
              ),
            ],
          ),
          AnimatedSwitcher(
            duration: const Duration(milliseconds: 250),
            child: _preview
                ? Container(
                    key: const ValueKey('preview'),
                    constraints: const BoxConstraints(minHeight: 180),
                    padding: const EdgeInsets.all(16),
                    decoration: BoxDecoration(
                      color: scheme.surfaceContainerHigh,
                      borderRadius: BorderRadius.circular(14),
                      border: Border.all(color: scheme.outlineVariant),
                    ),
                    child: _c.text.trim().isEmpty
                        ? Text(
                            'Nada para visualizar ainda',
                            style: TextStyle(
                              color: scheme.onSurface.withValues(alpha: 0.6),
                            ),
                          )
                        : FormattedText(_c.text),
                  )
                : Column(
                    key: const ValueKey('edit'),
                    crossAxisAlignment: CrossAxisAlignment.stretch,
                    spacing: 8,
                    children: [
                      // Barra de formatação (rola para o lado no celular)
                      Container(
                        decoration: BoxDecoration(
                          color: scheme.surfaceContainerHigh,
                          borderRadius: BorderRadius.circular(14),
                        ),
                        child: SingleChildScrollView(
                          scrollDirection: Axis.horizontal,
                          padding: const EdgeInsets.all(4),
                          child: Row(
                            children: [
                              for (final (tip, icon, label, action) in tools)
                                IconButton(
                                  tooltip: tip,
                                  onPressed: action,
                                  icon: icon != null
                                      ? Icon(icon)
                                      : Text(
                                          label!,
                                          style: const TextStyle(
                                            fontWeight: FontWeight.w800,
                                          ),
                                        ),
                                ),
                            ],
                          ),
                        ),
                      ),
                      TextField(
                        controller: _c,
                        focusNode: _focus,
                        minLines: 8,
                        maxLines: 20,
                        keyboardType: TextInputType.multiline,
                        onChanged: field.didChange,
                        decoration: InputDecoration(
                          hintText:
                              'Escreva o conteúdo da aula. Selecione um trecho '
                              'e use a barra acima para formatar.',
                          errorText: field.errorText,
                        ),
                      ),
                    ],
                  ),
          ),
        ],
      ),
    );
  }
}
