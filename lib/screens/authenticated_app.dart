import 'package:flutter/material.dart';
import 'package:raraapp/widgets/sidebar.dart';
import 'package:raraapp/views/home_view.dart';
import 'package:raraapp/views/lesson_view.dart';
import 'package:raraapp/views/christian_group_view.dart';
import 'package:raraapp/views/cura_view.dart';

class AuthenticatedApp extends StatefulWidget {
  const AuthenticatedApp({super.key});

  @override
  State<AuthenticatedApp> createState() => _AuthenticatedAppState();
}

class _AuthenticatedAppState extends State<AuthenticatedApp> {
  String _selectedMenuKey = 'home';
  bool _isSidebarOpen = false;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Row(
        children: [
          // Sidebar
          if (_isSidebarOpen)
            SizedBox(
              width: 280,
              child: Sidebar(
                onMenuItemSelected: (key) {
                  setState(() => _selectedMenuKey = key);
                  setState(() => _isSidebarOpen = false);
                },
                currentSelected: _selectedMenuKey,
              ),
            ),

          // Conteúdo principal (expande)
          Expanded(
            child: Column(
              children: [
                // AppBar com botão de menu
                AppBar(
                  title: _buildTitle(_selectedMenuKey),
                  elevation: 2,
                  leading: IconButton(
                    icon: Icon(_isSidebarOpen ? Icons.close : Icons.menu),
                    onPressed: () {
                      setState(() => _isSidebarOpen = !_isSidebarOpen);
                    },
                  ),
                ),
                // Conteúdo
                Expanded(
                  child: _buildMainContent(_selectedMenuKey),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildMainContent(String menuKey) {
    return switch (menuKey) {
      'home' => const HomeView(),
      'lesson' => const LessonView(),
      'christian-group' => const ChristianGroupView(),
      'cura' => const CuraView(),
      _ => const HomeView(),
    };
  }

  String _getMenuTitle(String menuKey) {
    return switch (menuKey) {
      'home' => 'Home',
      'lesson' => 'Lições',
      'christian-group' => 'Grupos Cristãos',
      'cura' => 'Pedidos de Cura',
      _ => 'Home',
    };
  }

  Widget _buildTitle(String menuKey) {
    return Text(_getMenuTitle(menuKey));
  }
}
