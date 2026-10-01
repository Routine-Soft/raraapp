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
import 'package:raraapp/components/dizimo_oferta/contribution_page.dart';
import 'package:raraapp/components/dizimo_oferta/payment_settings_page.dart';
import 'package:raraapp/components/dizimo_oferta/treasury_page.dart';
import 'package:raraapp/components/user/integration_page.dart';
import 'package:raraapp/components/user/my_account_page.dart';
import 'package:raraapp/components/user/powers_page.dart';

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
    return Scaffold(
      key: _scaffoldKey,
      drawer: Drawer(
        shape: const RoundedRectangleBorder(
          borderRadius: BorderRadius.horizontal(right: Radius.circular(28)),
        ),
        child: Sidebar(
          onMenuItemSelected: (key) {
            setState(() => _selectedMenuKey = key);
            Navigator.of(context).pop(); // Fecha o drawer
          },
          currentSelected: _selectedMenuKey,
          onClosePressed: () => Navigator.of(context).pop(),
        ),
      ),
      appBar: AppBar(
        title: _buildTitle(_selectedMenuKey),
        leading: IconButton(
          icon: const Icon(Icons.menu),
          onPressed: () {
            _scaffoldKey.currentState?.openDrawer();
          },
        ),
      ),
      // Troca de página com fade + leve subida
      body: AnimatedSwitcher(
        duration: MediaQuery.of(context).disableAnimations
            ? Duration.zero
            : const Duration(milliseconds: 350),
        switchInCurve: Curves.easeOutCubic,
        transitionBuilder: (child, animation) => FadeTransition(
          opacity: animation,
          child: SlideTransition(
            position: Tween(
              begin: const Offset(0, 0.02),
              end: Offset.zero,
            ).animate(animation),
            child: child,
          ),
        ),
        child: KeyedSubtree(
          key: ValueKey(_selectedMenuKey),
          child: _buildMainContent(_selectedMenuKey),
        ),
      ),
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
      'integration' => const MembersLeadershipPage(),
      'facilitadores' => const FacilitatorsPage(),
      'cura' => const CuraPage(),
      'cura-admin' => const CuraBoardPage(),
      'dizimo' => const ContributionPage(),
      'financeiro' => const TreasuryPage(),
      'financeiro-geral' => const TreasuryPage(allChurches: true),
      'membros-geral' => const MembersGeneralPage(),
      'poderes' => const PowersPage(),
      'poderes-geral' => const PowersPage(general: true),
      'mercado-pago' => const PaymentSettingsPage(),
      'my-account' => const MyAccountPage(),
      _ => const HomePage(),
    };
  }

  /// O título da página é o mesmo nome do item no menu.
  String _getMenuTitle(String menuKey) => Sidebar.labelOf(menuKey);

  Widget _buildTitle(String menuKey) {
    return Text(
      _getMenuTitle(menuKey),
      style: const TextStyle(fontWeight: FontWeight.w700),
    );
  }
}
