import 'package:flutter/material.dart';
import 'package:raraapp/components/app/home_page.dart';
import 'package:raraapp/components/app/sidebar.dart';
import 'package:raraapp/components/lesson/lesson_page.dart';
import 'package:raraapp/components/lesson/lesson_admin_page.dart';
import 'package:raraapp/components/lesson/lesson_teacher_page.dart';
import 'package:raraapp/components/christian_group/christian_group_page.dart';
import 'package:raraapp/components/christian_group/christian_group_admin_page.dart';
import 'package:raraapp/components/midia_local/midia_local_admin_page.dart';
import 'package:raraapp/components/church/church_admin_page.dart';
import 'package:raraapp/components/cura/cura_page.dart';
import 'package:raraapp/components/cura/cura_board_page.dart';
import 'package:raraapp/components/user/integration_page.dart';
import 'package:raraapp/components/user/my_account_page.dart';

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
      'home' => const HomePage(),
      'lesson' => const LessonPage(),
      'lesson-professor' => const LessonTeacherPage(),
      'lesson-supremo' => const LessonAdminPage(),
      'christian-group' => const ChristianGroupPage(),
      'christian-group-admin' => const ChristianGroupAdminPage(),
      'midialocal-admin' => const MidiaLocalAdminPage(),
      'church-admin' => const ChurchAdminPage(),
      'integration' => const IntegrationPage(),
      'cura' => const CuraPage(),
      'cura-admin' => const CuraBoardPage(),
      'my-account' => const MyAccountPage(),
      _ => const HomePage(),
    };
  }

  String _getMenuTitle(String menuKey) {
    return switch (menuKey) {
      'home' => 'Home',
      'lesson' => 'Lições',
      'lesson-professor' => 'Painel do Professor',
      'lesson-supremo' => 'Administração de Lições',
      'christian-group' => 'Grupos Cristãos',
      'christian-group-admin' => 'Administração de Grupos Cristãos',
      'midialocal-admin' => 'Administração de Mídias',
      'church-admin' => 'Administração de Igrejas',
      'integration' => 'Integração',
      'cura' => 'Pedidos de Cura',
      'cura-admin' => 'Gerenciamento de Cura',
      'my-account' => 'Minha Conta',
      _ => 'Home',
    };
  }

  Widget _buildTitle(String menuKey) {
    return Text(_getMenuTitle(menuKey));
  }
}
