import 'package:flutter/material.dart';
import 'package:raraapp/components/shared/effects/fade_slide_in.dart';
import 'package:raraapp/components/shared/effects/skeleton.dart';
import 'package:raraapp/components/shared/empty_state.dart';
import 'package:raraapp/components/shared/page_header.dart';

/// Página de lista padrão: cabeçalho, cards entrando em cascata, puxar para
/// atualizar, "esqueleto" enquanto carrega, estado vazio e botão de criar.
class ListPage extends StatelessWidget {
  final IconData icon;
  final String title;
  final String? subtitle;
  final bool loading;
  final Future<void> Function() onRefresh;
  final List<Widget> children;

  final IconData emptyIcon;
  final String emptyMessage;

  /// Topo no lugar do cabeçalho padrão (ex.: a logo do ministério).
  final Widget? header;

  /// Botão flutuante "+ [addLabel]". Sem [onAdd], não aparece.
  final VoidCallback? onAdd;
  final String addLabel;

  const ListPage({
    super.key,
    required this.icon,
    required this.title,
    required this.onRefresh,
    required this.children,
    required this.emptyMessage,
    this.subtitle,
    this.loading = false,
    this.emptyIcon = Icons.inbox_outlined,
    this.onAdd,
    this.addLabel = 'Novo',
    this.header,
  });

  @override
  Widget build(BuildContext context) {
    final count = children.length;

    return Scaffold(
      backgroundColor: Colors.transparent,
      floatingActionButton: onAdd == null
          ? null
          : FloatingActionButton.extended(
              onPressed: onAdd,
              icon: const Icon(Icons.add),
              label: Text(addLabel),
            ),
      body: RefreshIndicator(
        onRefresh: onRefresh,
        child: ListView(
          physics: const AlwaysScrollableScrollPhysics(),
          padding: const EdgeInsets.fromLTRB(16, 16, 16, 100),
          children: [
            FadeSlideIn(
              child:
                  header ??
                  PageHeader(
                    icon: icon,
                    title: title,
                    subtitle:
                        subtitle ??
                        (loading && count == 0
                            ? null
                            : '$count ${count == 1 ? 'item' : 'itens'}'),
                  ),
            ),
            const SizedBox(height: 20),
            if (loading && count == 0)
              for (var i = 0; i < 3; i++) ...[
                const CardSkeleton(),
                const SizedBox(height: 12),
              ]
            else if (count == 0)
              EmptyState(
                icon: emptyIcon,
                message: emptyMessage,
                actionLabel: addLabel,
                onAction: onAdd,
              )
            else
              for (var i = 0; i < count; i++) ...[
                // Só os primeiros entram em cascata; o resto aparece junto
                FadeSlideIn(
                  delay: stagger(i.clamp(0, 8) + 1, stepMs: 60),
                  child: children[i],
                ),
                const SizedBox(height: 12),
              ],
          ],
        ),
      ),
    );
  }
}

/// Card "fantasma" enquanto a lista carrega.
class CardSkeleton extends StatelessWidget {
  const CardSkeleton({super.key});

  @override
  Widget build(BuildContext context) {
    return const Card(
      child: Padding(
        padding: EdgeInsets.all(20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          spacing: 12,
          children: [
            Skeleton(width: 180, height: 20),
            Skeleton(width: 120, height: 14),
            Skeleton(height: 12),
            Skeleton(width: 220, height: 12),
          ],
        ),
      ),
    );
  }
}
