import 'package:flutter/material.dart';
import 'package:raraapp/components/midia_local/midia_local_grid.dart';
import 'package:raraapp/hooks/use_auth.dart';
import 'package:raraapp/hooks/use_churches.dart';

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback(
      (_) => useChurches(context, listen: false).ensureLoaded(),
    );
  }

  @override
  Widget build(BuildContext context) {
    final user = useAuth(context).user;
    final churchName =
        useChurches(context).findById(user?.churchId)?.name ??
        'Igreja não encontrada';

    return SingleChildScrollView(
      padding: const EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Bem vindo, ${user?.name ?? "Usuário"}',
            style: Theme.of(
              context,
            ).textTheme.headlineSmall?.copyWith(fontWeight: FontWeight.bold),
          ),
          const SizedBox(height: 12),
          Text(
            'Igreja: $churchName',
            style: Theme.of(context).textTheme.titleMedium,
          ),
          const SizedBox(height: 32),
          Text(
            'Mídias Locais',
            style: Theme.of(
              context,
            ).textTheme.titleLarge?.copyWith(fontWeight: FontWeight.bold),
          ),
          const SizedBox(height: 16),
          const MidiaLocalGrid(),
        ],
      ),
    );
  }
}
