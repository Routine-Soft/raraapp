import 'package:flutter/material.dart';
import 'package:raraapp/api/user_api.dart';
import 'package:raraapp/components/church/church_dropdown.dart';
import 'package:raraapp/components/shared/address_fields.dart';
import 'package:raraapp/components/shared/custom_dropdown.dart';
import 'package:raraapp/components/shared/custom_text_field.dart';
import 'package:raraapp/components/shared/date_field.dart';
import 'package:raraapp/components/shared/effects/fade_slide_in.dart';
import 'package:raraapp/components/shared/effects/glow_button.dart';
import 'package:raraapp/components/shared/effects/gradient_text.dart';
import 'package:raraapp/components/shared/feedback.dart';
import 'package:raraapp/components/shared/initials_avatar.dart';
import 'package:raraapp/components/shared/section.dart';
import 'package:raraapp/components/shared/tabbed_page.dart';
import 'package:raraapp/components/theme/app_effects.dart';
import 'package:raraapp/components/user/ecclesiastical_roles_field.dart';
import 'package:raraapp/components/user/password_form.dart';
import 'package:raraapp/hooks/use_auth.dart';

class MyAccountPage extends StatelessWidget {
  const MyAccountPage({super.key});

  @override
  Widget build(BuildContext context) {
    return const TabbedPage(
      tabs: [
        (icon: Icons.person_outline, label: 'Perfil', child: _ProfileTab()),
        (icon: Icons.lock_outline, label: 'Senha', child: _PasswordTab()),
      ],
    );
  }
}

class _ProfileTab extends StatefulWidget {
  const _ProfileTab();

  @override
  State<_ProfileTab> createState() => _ProfileTabState();
}

class _ProfileTabState extends State<_ProfileTab> {
  final _name = TextEditingController();
  final _phone = TextEditingController();
  final _address = AddressForm();
  String? _gender;
  String? _churchId;
  DateTime? _birthdate;
  bool _baptized = false;
  List<String> _ecclesiastical = [];
  bool _editing = false;

  @override
  void initState() {
    super.initState();
    _fill(useAuth(context, listen: false).user);
  }

  /// Preenche o formulário com os dados do usuário logado.
  void _fill(User? user) {
    _name.text = user?.name ?? '';
    _phone.text = user?.phone ?? '';
    _address.fill(user?.address);
    _gender = user?.gender;
    _churchId = user?.churchId;
    _birthdate = user?.birthdate;
    _baptized = user?.baptized ?? false;
    _ecclesiastical = user?.ecclesiasticalRoles ?? [];
  }

  @override
  void dispose() {
    _name.dispose();
    _phone.dispose();
    _address.dispose();
    super.dispose();
  }

  Future<void> _save() async {
    final auth = useAuth(context, listen: false);
    final current = auth.user!;
    final phone = _phone.text.trim();

    // Liderança é por igreja: avisa antes de trocar e perder os cargos
    final lost = current.roles.where((r) => !globalRoles.contains(r)).toList();
    if (_churchId != current.churchId && lost.isNotEmpty) {
      if (!await confirmAction(
        context,
        title: 'Trocar de igreja',
        message:
            'Seus cargos de liderança valem só na igreja atual. Ao trocar, '
            'você entra na nova igreja como usuário comum e perde: '
            '${lost.map(roleLabel).join(', ')}.',
        confirmLabel: 'Trocar',
        icon: Icons.swap_horiz,
      )) {
        return;
      }
      if (!mounted) return;
    }

    final ok = await auth.updateProfile(
      User(
        id: current.id,
        name: _name.text.trim(),
        email: current.email,
        phone: phone.isEmpty ? null : phone,
        gender: _gender,
        birthdate: _birthdate,
        churchId: _churchId,
        address: _address.toAddress(),
        invitationofgrace: current.invitationofgrace,
        status: current.status,
        baptized: _baptized,
        member: current.member,
        ecclesiasticalRoles: _ecclesiastical,
      ),
    );
    if (!mounted) return;
    showResult(
      context,
      ok: ok,
      success: 'Perfil atualizado com sucesso!',
      error: auth.error,
    );
    if (ok) setState(() => _editing = false);
  }

  void _cancel() => setState(() {
    _fill(useAuth(context, listen: false).user);
    _editing = false;
  });

  @override
  Widget build(BuildContext context) {
    final auth = useAuth(context);
    final user = auth.user;

    return SingleChildScrollView(
      padding: const EdgeInsets.fromLTRB(16, 12, 16, 32),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        spacing: 24,
        children: [
          FadeSlideIn(
            child: _ProfileHeader(
              name: user?.name ?? 'Usuário',
              email: user?.email ?? '',
            ),
          ),
          // IgnorePointer deixa os campos "somente leitura" fora do modo edição
          IgnorePointer(
            ignoring: !_editing,
            child: AnimatedOpacity(
              duration: const Duration(milliseconds: 250),
              opacity: _editing ? 1 : 0.75,
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                spacing: 28,
                children: [
                  FormSection(
                    title: 'Dados pessoais',
                    icon: Icons.person_outline,
                    children: [
                      CustomTextField(
                        label: 'Nome',
                        controller: _name,
                        prefixIcon: Icons.person,
                      ),
                      CustomTextField(
                        label: 'Telefone',
                        controller: _phone,
                        prefixIcon: Icons.phone,
                        keyboardType: TextInputType.phone,
                      ),
                      CustomDropdown<String>(
                        label: 'Gênero',
                        value: _gender,
                        items: userGenders,
                        onChanged: (v) => setState(() => _gender = v),
                      ),
                      DateField(
                        label: 'Data de Nascimento',
                        value: _birthdate,
                        onChanged: (d) => setState(() => _birthdate = d),
                      ),
                      CheckboxListTile(
                        title: const Text('Batizado'),
                        value: _baptized,
                        onChanged: (v) =>
                            setState(() => _baptized = v ?? false),
                      ),
                    ],
                  ),
                  FormSection(
                    title: 'Igreja',
                    icon: Icons.church_outlined,
                    children: [
                      ChurchDropdown(
                        value: _churchId,
                        onChanged: (id) => setState(() => _churchId = id),
                      ),
                      EcclesiasticalRolesField(
                        value: _ecclesiastical,
                        onChanged: (v) => setState(() => _ecclesiastical = v),
                      ),
                    ],
                  ),
                  FormSection(
                    title: 'Endereço',
                    icon: Icons.place_outlined,
                    children: [AddressFields(form: _address, showTitle: false)],
                  ),
                ],
              ),
            ),
          ),
          AnimatedSwitcher(
            duration: const Duration(milliseconds: 250),
            child: !_editing
                ? GlowButton(
                    key: const ValueKey('edit'),
                    label: 'Editar Perfil',
                    icon: Icons.edit,
                    onPressed: () => setState(() => _editing = true),
                  )
                : Row(
                    key: const ValueKey('save'),
                    spacing: 12,
                    children: [
                      Expanded(
                        child: SizedBox(
                          height: 54,
                          child: OutlinedButton.icon(
                            icon: const Icon(Icons.close),
                            label: const Text('Cancelar'),
                            onPressed: _cancel,
                          ),
                        ),
                      ),
                      Expanded(
                        child: GlowButton(
                          label: 'Salvar',
                          icon: Icons.save,
                          loading: auth.isLoading,
                          onPressed: _save,
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

/// Topo do perfil: avatar + nome + email no degradê do modo.
class _ProfileHeader extends StatelessWidget {
  final String name;
  final String email;

  const _ProfileHeader({required this.name, required this.email});

  @override
  Widget build(BuildContext context) {
    final effects = AppEffects.of(context);
    final text = Theme.of(context).textTheme;

    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(24),
        border: Border.all(color: effects.glassBorder),
        gradient: LinearGradient(
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
          colors: effects.backgroundGradient,
        ),
      ),
      child: Row(
        children: [
          InitialsAvatar(name, size: 64),
          const SizedBox(width: 16),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                GradientText(
                  name,
                  textAlign: TextAlign.start,
                  style: text.titleLarge?.copyWith(fontWeight: FontWeight.w800),
                ),
                Row(
                  children: [
                    const Icon(Icons.email_outlined, size: 16),
                    const SizedBox(width: 6),
                    Expanded(
                      child: Text(email, overflow: TextOverflow.ellipsis),
                    ),
                  ],
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

class _PasswordTab extends StatelessWidget {
  const _PasswordTab();

  @override
  Widget build(BuildContext context) => const SingleChildScrollView(
    padding: EdgeInsets.fromLTRB(16, 20, 16, 32),
    child: PasswordForm(),
  );
}
