import 'package:flutter/material.dart';
import 'package:raraapp/widgets/sidebar.dart';
import 'package:raraapp/views/home_view.dart';
import 'package:raraapp/views/lesson_view.dart';
import 'package:raraapp/views/lesson_admin_view.dart';
import 'package:raraapp/views/christian_group_view.dart';
import 'package:raraapp/views/christian_group_admin_view.dart';
import 'package:raraapp/views/midialocal_admin_view.dart';
import 'package:raraapp/views/church_admin_view.dart';
import 'package:raraapp/views/cura_view.dart';

class AuthenticatedApp extends StatefulWidget {
  const AuthenticatedApp({super.key});

  @override
  State<AuthenticatedApp> createState() => _AuthenticatedAppState();
}

class _AuthenticatedAppState extends State<AuthenticatedApp> {
  String _selectedMenuKey = 'home';
  final GlobalKey<ScaffoldState> _scaffoldKey = GlobalKey<ScaffoldState>();

  @override
  Widget build(BuildContext context) {
    final screenWidth = MediaQuery.of(context).size.width;

    return Scaffold(
      key: _scaffoldKey,
      drawer: SizedBox(
        width: screenWidth * 0.5,
        child: Drawer(
          child: Sidebar(
            onMenuItemSelected: (key) {
              setState(() => _selectedMenuKey = key);
              Navigator.of(context).pop(); // Fecha o drawer
            },
            currentSelected: _selectedMenuKey,
            onClosePressed: () {
              Navigator.of(context).pop(); // Fecha o drawer
            },
          ),
        ),
      ),
      appBar: AppBar(
        title: _buildTitle(_selectedMenuKey),
        elevation: 2,
        leading: IconButton(
          icon: const Icon(Icons.menu),
          onPressed: () {
            _scaffoldKey.currentState?.openDrawer();
          },
        ),
      ),
      body: _buildMainContent(_selectedMenuKey),
    );
  }

  Widget _buildMainContent(String menuKey) {
    return switch (menuKey) {
      'home' => const HomeView(),
      'lesson' => const LessonView(),
      'lesson-admin' => const LessonAdminView(),
      'christian-group' => const ChristianGroupView(),
      'christian-group-admin' => const ChristianGroupAdminView(),
      'midialocal-admin' => const MidiaLocalAdminView(),
      'church-admin' => const ChurchAdminView(),
      'cura' => const CuraView(),
      _ => const HomeView(),
    };
  }

  String _getMenuTitle(String menuKey) {
    return switch (menuKey) {
      'home' => 'Home',
      'lesson' => 'Lições',
      'lesson-admin' => 'Administração de Lições',
      'christian-group' => 'Grupos Cristãos',
      'christian-group-admin' => 'Administração de Grupos Cristãos',
      'midialocal-admin' => 'Administração de Mídias',
      'church-admin' => 'Administração de Igrejas',
      'cura' => 'Pedidos de Cura',
      _ => 'Home',
    };
  }

  Widget _buildTitle(String menuKey) {
    return Text(_getMenuTitle(menuKey));
  }
}
