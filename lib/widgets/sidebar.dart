import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:raraapp/controllers/user_controller.dart';
import 'package:raraapp/screens/welcome_screen.dart';
import 'package:raraapp/views/myaccount_view.dart';

class Sidebar extends StatelessWidget {
  final Function(String) onMenuItemSelected;
  final String currentSelected;
  final VoidCallback? onClosePressed;

  const Sidebar({
    required this.onMenuItemSelected,
    required this.currentSelected,
    this.onClosePressed,
  });

  @override
  Widget build(BuildContext context) {
    return Consumer<UserController>(
      builder: (context, userController, _) {
        final roles = userController.currentUser?.roles ?? [];

        return Material(
          color: Colors.grey[900],
          child: Column(
            children: [
              // Header
              Padding(
                padding: const EdgeInsets.all(20),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Image.asset(
                            'assets/images/logorara.png',
                            width: 40,
                            height: 40,
                          ),
                          const SizedBox(height: 12),
                          Text(
                            'Rara App',
                            style: Theme.of(context).textTheme.titleLarge
                                ?.copyWith(
                                  color: Colors.white,
                                  fontWeight: FontWeight.bold,
                                ),
                          ),
                          const SizedBox(height: 4),
                          Text(
                            userController.currentUser?.name ?? 'Usuário',
                            style: TextStyle(
                              color: Colors.grey[400],
                              fontSize: 12,
                            ),
                            overflow: TextOverflow.ellipsis,
                          ),
                        ],
                      ),
                    ),
                    // Botão de fechar
                    if (onClosePressed != null)
                      IconButton(
                        icon: const Icon(Icons.close, color: Colors.white),
                        onPressed: onClosePressed,
                        padding: EdgeInsets.zero,
                        constraints: const BoxConstraints(
                          minWidth: 40,
                          minHeight: 40,
                        ),
                      ),
                  ],
                ),
              ),
              const Divider(height: 1, color: Colors.grey),

              // Menu items
              Expanded(child: ListView(children: _buildMenuItems(roles))),

              // Footer
              const Divider(height: 1, color: Colors.grey),
              ListTile(
                leading: const Icon(Icons.logout, color: Colors.grey),
                title: const Text('Sair', style: TextStyle(color: Colors.grey)),
                onTap: () => _logout(context),
              ),
              const SizedBox(height: 12),
            ],
          ),
        );
      },
    );
  }

  List<Widget> _buildMenuItems(List<String> roles) {
    final menuItems = [
      {
        'key': 'home',
        'label': 'Home',
        'icon': Icons.home,
        'roles': ['user', 'super_admin', 'facilitator'],
      },
      {
        'key': 'lesson',
        'label': 'Lições',
        'icon': Icons.book,
        'roles': ['user', 'super_admin', 'facilitator'],
      },
      {
        'key': 'lesson-professor',
        'label': 'Painel Professor',
        'icon': Icons.dashboard,
        'roles': ['super_admin', 'avancai_lider'],
      },
      {
        'key': 'lesson-supremo',
        'label': 'Admin Lições',
        'icon': Icons.book_outlined,
        'roles': ['super_admin'],
      },
      {
        'key': 'christian-group',
        'label': 'Grupos Cristãos',
        'icon': Icons.group,
        'roles': ['facilitator', 'super_admin'],
      },
      {
        'key': 'christian-group-admin',
        'label': 'Admin Grupos',
        'icon': Icons.admin_panel_settings,
        'roles': ['super_admin'],
      },
      {
        'key': 'midialocal-admin',
        'label': 'Admin Mídias',
        'icon': Icons.image,
        'roles': ['super_admin'],
      },
      {
        'key': 'church-admin',
        'label': 'Admin Igrejas',
        'icon': Icons.church,
        'roles': ['super_admin'],
      },
      {
        'key': 'integration',
        'label': 'Integração',
        'icon': Icons.merge_type,
        'roles': ['super_admin'],
      },
      {
        'key': 'cura',
        'label': 'Pedidos de Cura',
        'icon': Icons.favorite,
        'roles': ['user', 'super_admin'],
      },
      {
        'key': 'cura-admin',
        'label': 'Admin Cura',
        'icon': Icons.healing,
        'roles': ['super_admin'],
      },
      {
        'key': 'my-account',
        'label': 'Minha Conta',
        'icon': Icons.person,
        'roles': ['user', 'super_admin', 'facilitator'],
      },
    ];

    return menuItems
        .where((item) {
          final requiredRoles = List<String>.from(item['roles'] as List);
          return requiredRoles.any((role) => roles.contains(role));
        })
        .map((item) {
          final isSelected = item['key'] == currentSelected;
          return ListTile(
            leading: Icon(
              item['icon'] as IconData,
              color: isSelected ? Colors.white : Colors.grey[400],
            ),
            title: Text(
              item['label'] as String,
              style: TextStyle(
                color: isSelected ? Colors.white : Colors.grey[400],
                fontWeight: isSelected ? FontWeight.bold : FontWeight.normal,
              ),
            ),
            onTap: () => onMenuItemSelected(item['key'] as String),
            tileColor: isSelected ? Colors.blue[900] : null,
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(8),
            ),
            contentPadding: const EdgeInsets.symmetric(
              horizontal: 16,
              vertical: 4,
            ),
          );
        })
        .toList();
  }

  void _logout(BuildContext context) {
    context.read<UserController>().logout();
    Navigator.of(context).pushReplacement(
      MaterialPageRoute(builder: (context) => const WelcomeScreen()),
    );
  }
}
