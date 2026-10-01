import 'package:flutter/material.dart';

/// Uma aba: ícone, texto e conteúdo.
typedef TabItem = ({IconData? icon, String label, Widget child});

/// Abas em "pílula" no topo + conteúdo. Substitui o AppBar com TabBar dentro
/// das páginas (o título já aparece no AppBar do app).
class TabbedPage extends StatelessWidget {
  final List<TabItem> tabs;

  const TabbedPage({super.key, required this.tabs});

  @override
  Widget build(BuildContext context) {
    return DefaultTabController(
      length: tabs.length,
      child: Column(
        children: [
          PillTabBar(tabs: tabs),
          Expanded(
            child: TabBarView(children: [for (final tab in tabs) tab.child]),
          ),
        ],
      ),
    );
  }
}

/// Barra de abas com fundo arredondado e a aba ativa preenchida.
class PillTabBar extends StatelessWidget {
  final List<TabItem> tabs;

  const PillTabBar({super.key, required this.tabs});

  @override
  Widget build(BuildContext context) {
    final scheme = Theme.of(context).colorScheme;
    // Com 3+ abas não cabe ícone + texto na largura do celular
    final showIcons = tabs.length <= 2;
    return Container(
      margin: const EdgeInsets.fromLTRB(16, 12, 16, 4),
      padding: const EdgeInsets.all(4),
      decoration: BoxDecoration(
        color: scheme.surfaceContainerHigh,
        borderRadius: BorderRadius.circular(18),
      ),
      child: TabBar(
        labelPadding: EdgeInsets.symmetric(horizontal: showIcons ? 16 : 6),
        tabs: [
          for (final tab in tabs)
            Tab(
              height: 44,
              child: Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  if (showIcons && tab.icon != null) ...[
                    Icon(tab.icon, size: 18),
                    const SizedBox(width: 6),
                  ],
                  Flexible(
                    child: Text(
                      tab.label,
                      maxLines: 2,
                      textAlign: TextAlign.center,
                      overflow: TextOverflow.ellipsis,
                      style: const TextStyle(height: 1.1),
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
