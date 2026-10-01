import 'package:flutter/material.dart';
import 'package:raraapp/api/user_api.dart';
import 'package:raraapp/components/church/church_filter.dart';
import 'package:raraapp/components/shared/content_dialog.dart';
import 'package:raraapp/components/shared/empty_state.dart';
import 'package:raraapp/components/shared/feedback.dart';
import 'package:raraapp/components/shared/tag.dart';
import 'package:raraapp/components/user/user_chips.dart';
import 'package:raraapp/hooks/use_auth.dart';
import 'package:raraapp/hooks/use_users.dart';

/// Poderes: marca e desmarca os cargos (roles) de cada pessoa.
/// - [general] (Super Intendente Geral): todas as igrejas, todos os cargos;
/// - Liderança (pastor local): só a própria igreja, sem "Super Intendente
///   Geral" nem "Programador" — e quem é Super Intendente fica bloqueado.
class PowersPage extends StatefulWidget {
  final bool general;

  const PowersPage({super.key, this.general = false});

  @override
  State<PowersPage> createState() => _PowersPageState();
}

class _PowersPageState extends State<PowersPage> {
  String? _churchId;
  String _query = '';

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback(
      (_) => useUsers(context, listen: false).load(),
    );
  }

  @override
  Widget build(BuildContext context) {
    final churchId = widget.general
        ? _churchId
        : useAuth(context).user?.churchId;
    if (!widget.general && churchId == null) {
      return const EmptyState(
        icon: Icons.church_outlined,
        message: 'Cadastre sua igreja em Minha Conta para ver as pessoas',
      );
    }

    final users = useUsers(context);
    final results = users.search(_query, churchId: churchId);

    return Column(
      children: [
        if (widget.general)
          Padding(
            padding: const EdgeInsets.fromLTRB(16, 16, 16, 0),
            child: ChurchFilter(
              value: _churchId,
              onChanged: (id) => setState(() => _churchId = id),
            ),
          ),
        Padding(
          padding: const EdgeInsets.fromLTRB(16, 12, 16, 4),
          child: TextField(
            onChanged: (value) => setState(() => _query = value),
            decoration: const InputDecoration(
              hintText: 'Pesquisar por nome ou telefone...',
              prefixIcon: Icon(Icons.search),
            ),
          ),
        ),
        Expanded(
          child: users.isLoading && users.users.isEmpty
              ? const Center(child: CircularProgressIndicator())
              : results.isEmpty
              ? const EmptyState(
                  icon: Icons.person_search,
                  message: 'Nenhum usuário encontrado',
                )
              : ListView(
                  padding: const EdgeInsets.fromLTRB(16, 12, 16, 32),
                  children: [
                    for (final user in results) ...[
                      _PersonTile(user: user, general: widget.general),
                      const SizedBox(height: 12),
                    ],
                  ],
                ),
        ),
      ],
    );
  }
}

class _PersonTile extends StatelessWidget {
  final User user;
  final bool general;

  const _PersonTile({required this.user, required this.general});

  /// Pastor local não mexe em quem é Super Intendente.
  bool get _locked => !general && user.roles.contains('super_admin');

  @override
  Widget build(BuildContext context) {
    final roles = [
      for (final r in userRoles)
        if (user.roles.contains(r)) r,
    ];

    return UserTile(
      user: user,
      onTap: _locked ? null : () => _RolesDialog.show(context, user, general),
      subtitle: Wrap(
        spacing: 8,
        runSpacing: 8,
        children: [
          if (roles.isEmpty)
            const Tag('Sem cargos', icon: Icons.person_outline),
          for (final role in roles)
            Tag(roleLabel(role), icon: Icons.verified_user_outlined),
        ],
      ),
      trailing: _locked
          ? const Tooltip(
              message: 'Só o Super Intendente Geral altera',
              child: Padding(
                padding: EdgeInsets.all(12),
                child: Icon(Icons.lock_outline),
              ),
            )
          : IconButton(
              tooltip: 'Editar cargos',
              icon: const Icon(Icons.edit_outlined),
              onPressed: () => _RolesDialog.show(context, user, general),
            ),
    );
  }
}

/// Checkbox para cada cargo: a pessoa pode ter quantos quiser.
class _RolesDialog extends StatefulWidget {
  final User user;
  final bool general;

  const _RolesDialog({required this.user, required this.general});

  static Future<void> show(BuildContext context, User user, bool general) =>
      showDialog(
        context: context,
        builder: (_) => _RolesDialog(user: user, general: general),
      );

  @override
  State<_RolesDialog> createState() => _RolesDialogState();
}

class _RolesDialogState extends State<_RolesDialog> {
  late final Set<String> _selected = {...widget.user.roles};

  /// Pastor local não dá nem tira Super Intendente e Programador (os que a
  /// pessoa já tem continuam, só não aparecem para marcar).
  List<String> get _available => widget.general
      ? userRoles
      : userRoles
            .where((r) => r != 'super_admin' && r != 'programador')
            .toList();

  Future<void> _save() async {
    final users = useUsers(context, listen: false);
    final auth = useAuth(context, listen: false);
    final ok = await users.setRoles(widget.user.id, [
      for (final r in userRoles)
        if (_selected.contains(r)) r,
    ]);
    if (!mounted) return;
    if (ok) {
      final updated = users.byId(widget.user.id);
      if (updated != null) await auth.syncUser(updated);
      if (!mounted) return;
      Navigator.pop(context);
    }
    showResult(
      context,
      ok: ok,
      success: 'Cargos de ${widget.user.name} atualizados',
      error: users.error,
    );
  }

  @override
  Widget build(BuildContext context) {
    final isSelf = useAuth(context).user?.id == widget.user.id;
    final busy = useUsers(context).isLoading;

    return ContentDialog(
      title: widget.user.name,
      subtitle: 'Marque os cargos desta pessoa',
      actions: [
        OutlinedButton(
          onPressed: busy ? null : () => Navigator.pop(context),
          child: const Text('Cancelar'),
        ),
        FilledButton.icon(
          onPressed: busy ? null : _save,
          icon: const Icon(Icons.save_outlined),
          label: const Text('Salvar'),
        ),
      ],
      children: [
        Column(
          children: [
            for (final role in _available)
              // O Super Intendente não pode tirar o próprio cargo: o sistema
              // ficaria sem quem administra tudo
              isSelf && role == 'super_admin'
                  ? CheckboxListTile(
                      value: true,
                      onChanged: null,
                      title: Text(roleLabel(role)),
                      subtitle: const Text(
                        'Você não pode remover o seu próprio cargo',
                      ),
                    )
                  : CheckboxListTile(
                      value: _selected.contains(role),
                      title: Text(roleLabel(role)),
                      onChanged: busy
                          ? null
                          : (checked) => setState(
                              () => checked == true
                                  ? _selected.add(role)
                                  : _selected.remove(role),
                            ),
                    ),
          ],
        ),
      ],
    );
  }
}
