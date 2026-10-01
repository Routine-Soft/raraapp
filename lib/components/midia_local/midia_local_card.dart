import 'package:flutter/material.dart';
import 'package:raraapp/api/midia_local_api.dart';
import 'package:raraapp/components/shared/content_dialog.dart';
import 'package:raraapp/components/shared/entity_card.dart';
import 'package:raraapp/components/shared/format.dart';
import 'package:raraapp/components/shared/formatted/formatted_text.dart';

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

  bool get _hasText => (midia.text ?? '').trim().isNotEmpty;

  /// Texto grande demais para o card compacto da Home.
  bool get _isLong {
    final text = midia.text ?? '';
    return text.length > 140 || '\n'.allMatches(text.trim()).length > 2;
  }

  /// Mídia completa, com a descrição formatada.
  void _open(BuildContext context) => showDialog(
    context: context,
    builder: (_) => ContentDialog(
      title: midia.title.isEmpty ? 'Sem título' : midia.title,
      children: [
        _Tags(midia: midia),
        if (_hasText) FormattedText(midia.text!),
      ],
    ),
  );

  @override
  Widget build(BuildContext context) {
    final textTheme = Theme.of(context).textTheme;
    final scheme = Theme.of(context).colorScheme;

    return Card(
      clipBehavior: Clip.antiAlias,
      child: InkWell(
        // Na Home o card abre a mídia completa; no admin mostra tudo direto
        onTap: !_isAdmin && _isLong ? () => _open(context) : null,
        child: Padding(
          padding: const EdgeInsets.all(20),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            mainAxisSize: MainAxisSize.min,
            children: [
              Row(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Expanded(
                    child: Text(
                      midia.title.isEmpty ? 'Sem título' : midia.title,
                      maxLines: 2,
                      overflow: TextOverflow.ellipsis,
                      style: textTheme.titleMedium?.copyWith(
                        fontWeight: FontWeight.w700,
                      ),
                    ),
                  ),
                  if (_isAdmin) ItemMenu(onEdit: onEdit, onDelete: onDelete),
                ],
              ),
              if (midia.date != null || (midia.time ?? '').isNotEmpty) ...[
                const SizedBox(height: 10),
                _Tags(midia: midia),
              ],
              if (_hasText) ...[
                const SizedBox(height: 12),
                if (_isAdmin)
                  FormattedText(midia.text!)
                else if (!_isLong)
                  FormattedText(midia.text!)
                else ...[
                  _Excerpt(text: midia.text!),
                  const SizedBox(height: 4),
                  Text(
                    'Ler mais',
                    style: textTheme.labelLarge?.copyWith(
                      color: scheme.primary,
                      fontWeight: FontWeight.w700,
                    ),
                  ),
                ],
              ],
            ],
          ),
        ),
      ),
    );
  }
}

/// Começo do texto formatado, cortado com um esmaecido no final
/// (CSS: max-height + mask-image: linear-gradient).
class _Excerpt extends StatelessWidget {
  final String text;

  const _Excerpt({required this.text});

  @override
  Widget build(BuildContext context) {
    final maxHeight = MediaQuery.textScalerOf(context).scale(140);
    return ShaderMask(
      blendMode: BlendMode.dstIn,
      shaderCallback: (bounds) => const LinearGradient(
        begin: Alignment.topCenter,
        end: Alignment.bottomCenter,
        colors: [Colors.white, Colors.white, Colors.transparent],
        stops: [0, 0.6, 1],
      ).createShader(bounds),
      child: ConstrainedBox(
        constraints: BoxConstraints(maxHeight: maxHeight),
        child: ClipRect(
          child: SingleChildScrollView(
            physics: const NeverScrollableScrollPhysics(),
            child: IgnorePointer(child: FormattedText(text)),
          ),
        ),
      ),
    );
  }
}

/// Data e hora da mídia.
class _Tags extends StatelessWidget {
  final MidiaLocal midia;

  const _Tags({required this.midia});

  @override
  Widget build(BuildContext context) {
    return Wrap(
      spacing: 8,
      runSpacing: 8,
      children: [
        if (midia.date != null)
          _Tag(icon: Icons.event, label: formatDate(midia.date)),
        if ((midia.time ?? '').isNotEmpty)
          _Tag(icon: Icons.schedule, label: midia.time!),
      ],
    );
  }
}

/// Etiqueta de data/hora.
class _Tag extends StatelessWidget {
  final IconData icon;
  final String label;

  const _Tag({required this.icon, required this.label});

  @override
  Widget build(BuildContext context) {
    final scheme = Theme.of(context).colorScheme;
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 5),
      decoration: BoxDecoration(
        color: scheme.primary.withValues(alpha: 0.12),
        borderRadius: BorderRadius.circular(999),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(icon, size: 14, color: scheme.primary),
          const SizedBox(width: 6),
          Text(
            label,
            style: Theme.of(
              context,
            ).textTheme.labelMedium?.copyWith(color: scheme.primary),
          ),
        ],
      ),
    );
  }
}
