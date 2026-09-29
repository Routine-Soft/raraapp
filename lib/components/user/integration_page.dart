import 'package:flutter/material.dart';
import 'package:raraapp/components/user/facilitator_user_form.dart';
import 'package:raraapp/components/user/user_chips.dart';
import 'package:raraapp/components/user/user_detail_dialog.dart';
import 'package:raraapp/components/user/user_integration_dialog.dart';
import 'package:raraapp/hooks/use_users.dart';

/// Integração: números, cadastro de visitantes e acompanhamento.
class IntegrationPage extends StatefulWidget {
  const IntegrationPage({super.key});

  @override
  State<IntegrationPage> createState() => _IntegrationPageState();
}

class _IntegrationPageState extends State<IntegrationPage> {
  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback(
      (_) => useUsers(context, listen: false).load(),
    );
  }

  @override
  Widget build(BuildContext context) {
    return DefaultTabController(
      length: 3,
      child: Scaffold(
        appBar: AppBar(
          title: const Text('Integração'),
          bottom: const TabBar(
            tabs: [
              Tab(icon: Icon(Icons.dashboard), text: 'Dashboard'),
              Tab(icon: Icon(Icons.person_add), text: 'Facilitador'),
              Tab(icon: Icon(Icons.person_search), text: 'Integração'),
            ],
          ),
        ),
        body: const TabBarView(
          children: [_Dashboard(), _FacilitatorTab(), _SearchTab()],
        ),
      ),
    );
  }
}

class _Dashboard extends StatelessWidget {
  const _Dashboard();

  @override
  Widget build(BuildContext context) {
    final users = useUsers(context);
    final total = users.users.length;

    return ListView(
      padding: const EdgeInsets.all(16),
      children: [
        _StatCard(
          'Não Membros',
          users.nonMembers.length,
          Icons.person_outline,
          Colors.orange,
        ),
        _StatCard(
          'Membros',
          users.members.length,
          Icons.verified_user,
          Colors.green,
        ),
        _StatCard(
          'Batizados',
          users.baptizedCount,
          Icons.favorite,
          Colors.blue,
        ),
        _StatCard(
          'Não Batizados',
          total - users.baptizedCount,
          Icons.remove_circle_outline,
          Colors.red,
        ),
      ],
    );
  }
}

class _StatCard extends StatelessWidget {
  final String label;
  final int value;
  final IconData icon;
  final Color color;

  const _StatCard(this.label, this.value, this.icon, this.color);

  @override
  Widget build(BuildContext context) {
    return Card(
      margin: const EdgeInsets.only(bottom: 12),
      child: Padding(
        padding: const EdgeInsets.all(20),
        child: Row(
          children: [
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    label,
                    style: const TextStyle(fontSize: 14, color: Colors.grey),
                  ),
                  const SizedBox(height: 8),
                  Text(
                    '$value',
                    style: TextStyle(
                      fontSize: 32,
                      fontWeight: FontWeight.bold,
                      color: color,
                    ),
                  ),
                ],
              ),
            ),
            Icon(icon, size: 48, color: color),
          ],
        ),
      ),
    );
  }
}

class _FacilitatorTab extends StatelessWidget {
  const _FacilitatorTab();

  @override
  Widget build(BuildContext context) {
    return const DefaultTabController(
      length: 2,
      child: Column(
        children: [
          TabBar(
            tabs: [
              Tab(text: 'Criar Usuário'),
              Tab(text: 'Ver e Editar'),
            ],
          ),
          Expanded(
            child: TabBarView(children: [FacilitatorUserForm(), _EditList()]),
          ),
        ],
      ),
    );
  }
}

class _EditList extends StatelessWidget {
  const _EditList();

  @override
  Widget build(BuildContext context) {
    final users = useUsers(context).users;
    if (users.isEmpty) {
      return const Center(child: Text('Nenhum usuário encontrado'));
    }

    return ListView(
      padding: const EdgeInsets.all(12),
      children: [
        for (final user in users)
          Card(
            margin: const EdgeInsets.only(bottom: 12),
            child: ListTile(
              leading: UserAvatar(user),
              title: Text(user.name),
              subtitle: Text(
                user.facilitator != null
                    ? 'Facilitador: ${user.facilitator}'
                    : 'Sem facilitador atribuído',
                style: TextStyle(
                  color: user.facilitator != null
                      ? Colors.grey[600]
                      : Colors.red,
                ),
              ),
              trailing: Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  IconButton(
                    tooltip: 'Editar usuário',
                    icon: const Icon(Icons.edit),
                    onPressed: () => UserIntegrationDialog.show(context, user),
                  ),
                  IconButton(
                    icon: const Icon(Icons.info_outline),
                    onPressed: () => UserDetailDialog.show(context, user),
                  ),
                ],
              ),
            ),
          ),
      ],
    );
  }
}

class _SearchTab extends StatefulWidget {
  const _SearchTab();

  @override
  State<_SearchTab> createState() => _SearchTabState();
}

class _SearchTabState extends State<_SearchTab> {
  String _query = '';

  @override
  Widget build(BuildContext context) {
    final results = useUsers(context).search(_query);

    return Column(
      children: [
        Padding(
          padding: const EdgeInsets.all(12),
          child: TextField(
            onChanged: (value) => setState(() => _query = value),
            decoration: InputDecoration(
              hintText: 'Pesquisar por nome ou telefone...',
              prefixIcon: const Icon(Icons.search),
              border: OutlineInputBorder(
                borderRadius: BorderRadius.circular(8),
              ),
            ),
          ),
        ),
        Expanded(
          child: results.isEmpty
              ? const Center(child: Text('Nenhum usuário encontrado'))
              : ListView(
                  padding: const EdgeInsets.all(12),
                  children: [
                    for (final user in results)
                      Card(
                        margin: const EdgeInsets.only(bottom: 8),
                        child: ListTile(
                          leading: UserAvatar(user),
                          title: Text(user.name),
                          subtitle: UserChips(user: user),
                          onTap: () => UserDetailDialog.show(context, user),
                        ),
                      ),
                  ],
                ),
        ),
      ],
    );
  }
}
