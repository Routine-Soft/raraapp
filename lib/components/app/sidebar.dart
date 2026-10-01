import 'package:flutter/material.dart';
import 'package:raraapp/components/app/appearance_controls.dart';
import 'package:raraapp/components/app/welcome_page.dart';
import 'package:raraapp/components/shared/effects/fade_route.dart';
import 'package:raraapp/components/shared/effects/fade_slide_in.dart';
import 'package:raraapp/components/shared/effects/gradient_text.dart';
import 'package:raraapp/components/shared/effects/motion.dart';
import 'package:raraapp/components/shared/initials_avatar.dart';
import 'package:raraapp/components/shared/rara_logo.dart';
import 'package:raraapp/components/theme/app_effects.dart';
import 'package:raraapp/hooks/providers.dart';
import 'package:raraapp/hooks/use_auth.dart';

class Sidebar extends StatelessWidget {
  final Function(String) onMenuItemSelected;
  final String currentSelected;
  final VoidCallback? onClosePressed;

  const Sidebar({
    super.key,
    required this.onMenuItemSelected,
    required this.currentSelected,
    this.onClosePressed,
  });

  @override
  Widget build(BuildContext context) {
    final user = useAuth(context).user;
    final roles = user?.roles ?? const <String>[];
    final items = _buildMenuItems(roles);

    return SafeArea(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          _Header(
            name: user?.name ?? 'Usuário',
            email: user?.email,
            onClosePressed: onClosePressed,
          ),
          Expanded(
            child: ListView(
              padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
              children: [
                for (var i = 0; i < items.length; i++)
                  FadeSlideIn(
                    delay: stagger(i, stepMs: 35),
                    offsetY: 0.3,
                    child: items[i],
                  ),
              ],
            ),
          ),
          Container(
            margin: const EdgeInsets.fromLTRB(12, 4, 12, 8),
            padding: const EdgeInsets.fromLTRB(14, 10, 14, 6),
            decoration: BoxDecoration(
              color: Theme.of(context).colorScheme.surfaceContainerHigh,
              borderRadius: BorderRadius.circular(18),
            ),
            child: const AppearanceControls(compact: true),
          ),
          Padding(
            padding: const EdgeInsets.fromLTRB(12, 0, 12, 12),
            child: _MenuItem(
              icon: Icons.logout,
              label: 'Sair',
              danger: true,
              onTap: () => _logout(context),
            ),
          ),
        ],
      ),
    );
  }

  /// Menu agrupado por seção. Cada item só aparece para quem tem um dos
  /// cargos; a seção some quando não sobra nenhum item nela.
  /// 'user' = qualquer pessoa logada (não é um cargo do backend).
  /// super_admin vê tudo.
  static const _sections =
      <(String, List<(String, String, IconData, List<String>)>)>[
        (
          'Membros',
          [
            ('home', 'Página Principal', Icons.home, ['user']),
            ('lesson', 'Avançai', Icons.book, ['user']),
            (
              'christian-group',
              'Christian Group',
              Icons.group,
              ['facilitador', 'super_admin'],
            ),
            ('cura', 'Cura da Alma', Icons.favorite, ['user']),
            (
              'dizimo',
              'Dízimos e Ofertas',
              Icons.volunteer_activism_outlined,
              ['user'],
            ),
            ('my-account', 'Minha Conta', Icons.person, ['user']),
          ],
        ),
        (
          'Líderes de Departamento',
          [
            (
              'lesson-professor',
              'Avançai Liderança',
              Icons.dashboard,
              ['super_admin', 'avancai_lider'],
            ),
            (
              'christian-group-admin',
              'Christian Group Liderança',
              Icons.admin_panel_settings,
              ['super_admin'],
            ),
            (
              'midialocal-admin',
              'Mídia Liderança',
              Icons.image,
              ['super_admin'],
            ),
            (
              'cura-admin',
              'Cura da Alma Liderança',
              Icons.healing,
              ['super_admin', 'pastor_local', 'secretaria_cura'],
            ),
            (
              'financeiro',
              'Financeiro Liderança',
              Icons.account_balance_wallet_outlined,
              ['super_admin', 'pastor_local', 'tesouraria'],
            ),
            (
              'integration',
              'Membros Liderança',
              Icons.groups_outlined,
              ['super_admin'],
            ),
            (
              'facilitadores',
              'Facilitadores',
              Icons.support_agent,
              [
                'super_admin',
                'pastor_local',
                'christian_group_lider',
                'facilitador',
              ],
            ),
            (
              'poderes',
              'Poderes Liderança',
              Icons.manage_accounts_outlined,
              ['pastor_local'],
            ),
          ],
        ),
        (
          'Super Intendente Geral',
          [
            (
              'lesson-supremo',
              'Avançai Super Intendente Geral',
              Icons.book_outlined,
              ['super_admin'],
            ),
            (
              'church-admin',
              'Igreja Super Intendente Geral',
              Icons.church,
              ['super_admin'],
            ),
            (
              'financeiro-geral',
              'Financeiro Super Intendente Geral',
              Icons.account_balance_outlined,
              ['super_admin'],
            ),
            (
              'membros-geral',
              'Membros Super Intendente Geral',
              Icons.diversity_3_outlined,
              ['super_admin'],
            ),
            (
              'poderes-geral',
              'Poderes Super Intendente Geral',
              Icons.admin_panel_settings_outlined,
              ['super_admin'],
            ),
          ],
        ),
        (
          'Programador',
          [
            (
              'mercado-pago',
              'Financeiro Programador',
              Icons.key_outlined,
              ['programador'],
            ),
          ],
        ),
      ];

  /// Nome do item no menu — também usado como título da página.
  static String labelOf(String key) {
    for (final (_, items) in _sections) {
      for (final (k, label, _, _) in items) {
        if (k == key) return label;
      }
    }
    return 'Página Principal';
  }

  List<Widget> _buildMenuItems(List<String> roles) {
    bool allowed(List<String> required) =>
        required.contains('user') ||
        roles.contains('super_admin') ||
        required.any(roles.contains);

    return [
      for (final (title, items) in _sections)
        if (items.any((item) => allowed(item.$4))) ...[
          _SectionLabel(title),
          for (final (key, label, icon, required) in items)
            if (allowed(required))
              _MenuItem(
                icon: icon,
                label: label,
                selected: key == currentSelected,
                onTap: () => onMenuItemSelected(key),
              ),
        ],
    ];
  }

  Future<void> _logout(BuildContext context) async {
    final navigator = Navigator.of(context);
    await logoutAndClear(context);
    navigator.pushAndRemoveUntil(fadeRoute(const WelcomePage()), (_) => false);
  }
}

/// Topo do menu: marca + avatar com as iniciais + nome/email.
class _Header extends StatelessWidget {
  final String name;
  final String? email;
  final VoidCallback? onClosePressed;

  const _Header({required this.name, this.email, this.onClosePressed});

  @override
  Widget build(BuildContext context) {
    final scheme = Theme.of(context).colorScheme;
    final effects = AppEffects.of(context);
    final text = Theme.of(context).textTheme;

    return Container(
      margin: const EdgeInsets.fromLTRB(12, 12, 12, 4),
      padding: const EdgeInsets.fromLTRB(16, 12, 8, 16),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(22),
        border: Border.all(color: effects.glassBorder),
        gradient: LinearGradient(
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
          colors: effects.backgroundGradient,
        ),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              const RaraLogo(height: 28),
              const SizedBox(width: 10),
              Expanded(
                child: GradientText(
                  'Rara App',
                  textAlign: TextAlign.start,
                  style: text.titleLarge?.copyWith(fontWeight: FontWeight.w800),
                ),
              ),
              if (onClosePressed != null)
                IconButton(
                  tooltip: 'Fechar menu',
                  icon: const Icon(Icons.close),
                  onPressed: onClosePressed,
                ),
            ],
          ),
          const SizedBox(height: 16),
          Row(
            children: [
              InitialsAvatar(name),
              const SizedBox(width: 12),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      name,
                      overflow: TextOverflow.ellipsis,
                      style: text.titleSmall?.copyWith(
                        fontWeight: FontWeight.w700,
                      ),
                    ),
                    if (email != null)
                      Text(
                        email!,
                        overflow: TextOverflow.ellipsis,
                        style: text.bodySmall?.copyWith(
                          color: scheme.onSurface.withValues(alpha: 0.7),
                        ),
                      ),
                  ],
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}

/// Item do menu. Selecionado: fundo + barrinha lateral + ícone na cor
/// principal. Hover: fundo suave e o conteúdo desliza um pouco para a direita.
class _MenuItem extends StatefulWidget {
  final IconData icon;
  final String label;
  final VoidCallback onTap;
  final bool selected;
  final bool danger;

  const _MenuItem({
    required this.icon,
    required this.label,
    required this.onTap,
    this.selected = false,
    this.danger = false,
  });

  @override
  State<_MenuItem> createState() => _MenuItemState();
}

class _MenuItemState extends State<_MenuItem> {
  bool _hover = false;

  @override
  Widget build(BuildContext context) {
    final scheme = Theme.of(context).colorScheme;
    const duration = Duration(milliseconds: 200);
    final radius = BorderRadius.circular(14);

    final accent = widget.danger ? scheme.error : scheme.primary;
    final color = widget.selected || (widget.danger && _hover)
        ? accent
        : scheme.onSurface;
    final background = widget.selected
        ? accent.withValues(alpha: 0.14)
        : _hover
        ? (widget.danger ? accent : scheme.onSurface).withValues(alpha: 0.08)
        : Colors.transparent;
    final nudge = _hover && !widget.selected && !reduceMotion(context);

    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 2),
      child: Semantics(
        selected: widget.selected,
        button: true,
        child: MouseRegion(
          onEnter: (_) => setState(() => _hover = true),
          onExit: (_) => setState(() => _hover = false),
          child: Material(
            color: Colors.transparent,
            child: InkWell(
              borderRadius: radius,
              onTap: widget.onTap,
              child: AnimatedContainer(
                duration: duration,
                decoration: BoxDecoration(
                  color: background,
                  borderRadius: radius,
                ),
                child: Row(
                  children: [
                    AnimatedContainer(
                      duration: duration,
                      width: 4,
                      height: widget.selected ? 24 : 0,
                      decoration: BoxDecoration(
                        color: accent,
                        borderRadius: BorderRadius.circular(4),
                      ),
                    ),
                    Expanded(
                      child: AnimatedPadding(
                        duration: duration,
                        curve: Curves.easeOut,
                        padding: EdgeInsets.fromLTRB(
                          nudge ? 16 : 12,
                          12,
                          12,
                          12,
                        ),
                        child: Row(
                          children: [
                            Icon(widget.icon, color: color),
                            const SizedBox(width: 14),
                            Expanded(
                              child: Text(
                                widget.label,
                                style: TextStyle(
                                  color: color,
                                  fontWeight: widget.selected
                                      ? FontWeight.w700
                                      : FontWeight.w500,
                                ),
                              ),
                            ),
                          ],
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }
}

/// Título de seção do menu ("MEMBROS", "PROGRAMADOR"...).
class _SectionLabel extends StatelessWidget {
  final String text;

  const _SectionLabel(this.text);

  @override
  Widget build(BuildContext context) {
    final scheme = Theme.of(context).colorScheme;
    return Semantics(
      header: true,
      child: Padding(
        padding: const EdgeInsets.fromLTRB(16, 16, 16, 6),
        child: Row(
          children: [
            Text(
              text.toUpperCase(),
              style: Theme.of(context).textTheme.labelMedium?.copyWith(
                color: scheme.onSurface.withValues(alpha: 0.6),
                fontWeight: FontWeight.w800,
                letterSpacing: 1.2,
              ),
            ),
            const SizedBox(width: 10),
            Expanded(child: Divider(color: scheme.outlineVariant)),
          ],
        ),
      ),
    );
  }
}
