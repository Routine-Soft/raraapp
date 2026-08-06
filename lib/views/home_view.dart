import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:raraapp/controllers/user_controller.dart';
import 'package:raraapp/controllers/church_controller.dart';
import 'package:raraapp/controllers/midialocal_controller.dart';

class HomeView extends StatefulWidget {
  const HomeView({super.key});

  @override
  State<HomeView> createState() => _HomeViewState();
}

class _HomeViewState extends State<HomeView> {
  @override
  void initState() {
    super.initState();
    // Carregar as mídias locais ao abrir a home
    WidgetsBinding.instance.addPostFrameCallback((_) {
      final userController = context.read<UserController>();
      final churchController = context.read<ChurchController>();
      final midiaController = context.read<MidiaLocalController>();

      // Carregar igrejas se ainda não carregou
      if (churchController.churches.isEmpty) {
        churchController.loadAllChurches();
      }

      // Carregar mídias locais
      if (userController.currentUser?.accessToken != null) {
        midiaController.loadAllMidiasLocais(
          token: userController.currentUser!.accessToken!,
        );
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    final screenWidth = MediaQuery.of(context).size.width;
    final isMobile = screenWidth < 600;

    return SingleChildScrollView(
      padding: const EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Bem-vindo
          Consumer<UserController>(
            builder: (context, userController, _) {
              return Text(
                'Bem vindo, ${userController.currentUser?.name ?? "Usuário"}',
                style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                  fontWeight: FontWeight.bold,
                ),
              );
            },
          ),
          const SizedBox(height: 12),

          // Igreja
          Consumer2<UserController, ChurchController>(
            builder: (context, userController, churchController, _) {
              final churchId = userController.currentUser?.churchId;
              final churchName =
                  churchController.churches
                      .where((church) => church.id == churchId)
                      .firstOrNull
                      ?.name ??
                  'Igreja não encontrada';

              return Text(
                'Igreja: $churchName',
                style: Theme.of(context).textTheme.titleMedium,
              );
            },
          ),
          const SizedBox(height: 32),

          // Mídias Locais
          Text(
            'Mídias Locais',
            style: Theme.of(
              context,
            ).textTheme.titleLarge?.copyWith(fontWeight: FontWeight.bold),
          ),
          const SizedBox(height: 16),

          Consumer<MidiaLocalController>(
            builder: (context, midiaController, _) {
              if (midiaController.isLoading) {
                return const Center(child: CircularProgressIndicator());
              }

              if (midiaController.midiasLocais.isEmpty) {
                return const Text('Nenhuma mídia local encontrada');
              }

              final crossAxisCount = isMobile ? 2 : 3;

              return GridView.builder(
                shrinkWrap: true,
                physics: const NeverScrollableScrollPhysics(),
                gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
                  crossAxisCount: crossAxisCount,
                  crossAxisSpacing: 12,
                  mainAxisSpacing: 12,
                  childAspectRatio: 0.85,
                ),
                itemCount: midiaController.midiasLocais.length,
                itemBuilder: (context, index) {
                  final midia = midiaController.midiasLocais[index];
                  return LimitedBox(
                    maxHeight: 200,
                    child: Card(
                      elevation: 2,
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(8),
                      ),
                      child: Padding(
                        padding: const EdgeInsets.all(12),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          mainAxisSize: MainAxisSize.min,
                          children: [
                            // Título
                            Text(
                              midia.title ?? 'Sem título',
                              style: const TextStyle(
                                fontWeight: FontWeight.bold,
                                fontSize: 13,
                              ),
                              maxLines: 2,
                              overflow: TextOverflow.ellipsis,
                            ),
                            const SizedBox(height: 6),

                            // Hora
                            if (midia.time != null && midia.time!.isNotEmpty)
                              Padding(
                                padding: const EdgeInsets.only(bottom: 4),
                                child: Text(
                                  'Hora: ${midia.time}',
                                  style: const TextStyle(
                                    fontSize: 11,
                                    color: Colors.grey,
                                  ),
                                ),
                              ),

                            // Data
                            if (midia.date != null)
                              Padding(
                                padding: const EdgeInsets.only(bottom: 4),
                                child: Text(
                                  'Data: ${midia.date.toString().split(' ')[0]}',
                                  style: TextStyle(
                                    fontSize: 10,
                                    color: Colors.grey[600],
                                  ),
                                ),
                              ),

                            // Descrição
                            if (midia.text != null && midia.text!.isNotEmpty)
                              Padding(
                                padding: const EdgeInsets.only(top: 4),
                                child: Text(
                                  midia.text!,
                                  style: const TextStyle(fontSize: 11),
                                  maxLines: 2,
                                  overflow: TextOverflow.ellipsis,
                                ),
                              ),
                          ],
                        ),
                      ),
                    ),
                  );
                },
              );
            },
          ),
        ],
      ),
    );
  }
}
