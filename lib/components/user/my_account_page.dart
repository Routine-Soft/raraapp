import 'package:flutter/material.dart';
import 'package:raraapp/api/user_api.dart';
import 'package:raraapp/components/church/church_dropdown.dart';
import 'package:raraapp/components/shared/address_fields.dart';
import 'package:raraapp/components/shared/custom_dropdown.dart';
import 'package:raraapp/components/shared/custom_text_field.dart';
import 'package:raraapp/components/shared/date_field.dart';
import 'package:raraapp/components/shared/feedback.dart';
import 'package:raraapp/hooks/use_auth.dart';

class MyAccountPage extends StatelessWidget {
  const MyAccountPage({super.key});

  @override
  Widget build(BuildContext context) {
    return DefaultTabController(
      length: 2,
      child: Scaffold(
        appBar: AppBar(
          title: const Text('Minha Conta'),
          bottom: const TabBar(
            tabs: [
              Tab(icon: Icon(Icons.person), text: 'Perfil'),
              Tab(icon: Icon(Icons.lock), text: 'Senha'),
            ],
          ),
        ),
        body: const TabBarView(children: [_ProfileTab(), _PasswordTab()]),
      ),
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
    const gap = SizedBox(height: 12);

    return SingleChildScrollView(
      padding: const EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          ListTile(
            contentPadding: EdgeInsets.zero,
            leading: const Icon(Icons.email),
            title: const Text(
              'Email',
              style: TextStyle(fontSize: 12, color: Colors.grey),
            ),
            subtitle: Text(
              auth.user?.email ?? '',
              style: const TextStyle(fontSize: 16),
            ),
          ),
          gap,
          // IgnorePointer deixa os campos "somente leitura" fora do modo edição
          IgnorePointer(
            ignoring: !_editing,
            child: Opacity(
              opacity: _editing ? 1 : 0.7,
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  CustomTextField(
                    label: 'Nome',
                    controller: _name,
                    prefixIcon: Icons.person,
                  ),
                  gap,
                  CustomTextField(
                    label: 'Telefone',
                    controller: _phone,
                    prefixIcon: Icons.phone,
                    keyboardType: TextInputType.phone,
                  ),
                  gap,
                  CustomDropdown<String>(
                    label: 'Gênero',
                    value: _gender,
                    items: userGenders,
                    onChanged: (v) => setState(() => _gender = v),
                  ),
                  gap,
                  DateField(
                    label: 'Data de Nascimento',
                    value: _birthdate,
                    onChanged: (d) => setState(() => _birthdate = d),
                  ),
                  gap,
                  ChurchDropdown(
                    value: _churchId,
                    onChanged: (id) => setState(() => _churchId = id),
                  ),
                  const SizedBox(height: 20),
                  AddressFields(form: _address),
                  CheckboxListTile(
                    title: const Text('Batizado'),
                    value: _baptized,
                    onChanged: (v) => setState(() => _baptized = v ?? false),
                  ),
                ],
              ),
            ),
          ),
          const SizedBox(height: 24),
          if (!_editing)
            ElevatedButton.icon(
              icon: const Icon(Icons.edit),
              label: const Text('Editar Perfil'),
              onPressed: () => setState(() => _editing = true),
            )
          else
            Row(
              children: [
                Expanded(
                  child: OutlinedButton.icon(
                    icon: const Icon(Icons.close),
                    label: const Text('Cancelar'),
                    onPressed: _cancel,
                  ),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: ElevatedButton.icon(
                    icon: const Icon(Icons.save),
                    label: const Text('Salvar'),
                    onPressed: auth.isLoading ? null : _save,
                  ),
                ),
              ],
            ),
        ],
      ),
    );
  }
}

class _PasswordTab extends StatefulWidget {
  const _PasswordTab();

  @override
  State<_PasswordTab> createState() => _PasswordTabState();
}

class _PasswordTabState extends State<_PasswordTab> {
  final _formKey = GlobalKey<FormState>();
  final _current = TextEditingController();
  final _new = TextEditingController();
  final _confirm = TextEditingController();

  @override
  void dispose() {
    _current.dispose();
    _new.dispose();
    _confirm.dispose();
    super.dispose();
  }

  Future<void> _submit() async {
    if (!_formKey.currentState!.validate()) return;
    final auth = useAuth(context, listen: false);
    final ok = await auth.changePassword(_current.text, _new.text);
    if (!mounted) return;
    showResult(
      context,
      ok: ok,
      success: 'Senha alterada com sucesso!',
      error: auth.error,
    );
    if (ok) {
      _current.clear();
      _new.clear();
      _confirm.clear();
    }
  }

  String? _required(String? v) => (v ?? '').isEmpty ? 'Obrigatório' : null;

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(16),
      child: Form(
        key: _formKey,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            CustomTextField(
              label: 'Senha Atual',
              controller: _current,
              obscureText: true,
              prefixIcon: Icons.lock,
              validator: _required,
            ),
            const SizedBox(height: 16),
            CustomTextField(
              label: 'Nova Senha',
              controller: _new,
              obscureText: true,
              prefixIcon: Icons.lock,
              validator: _required,
            ),
            const SizedBox(height: 16),
            CustomTextField(
              label: 'Confirmar Nova Senha',
              controller: _confirm,
              obscureText: true,
              prefixIcon: Icons.lock,
              validator: (v) => v != _new.text ? 'Senhas não conferem' : null,
            ),
            const SizedBox(height: 24),
            ElevatedButton.icon(
              icon: const Icon(Icons.save),
              label: const Text('Alterar Senha'),
              onPressed: useAuth(context).isLoading ? null : _submit,
            ),
          ],
        ),
      ),
    );
  }
}
