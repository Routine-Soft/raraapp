import 'package:flutter/material.dart';
import 'package:raraapp/components/midia_local/midia_local_card.dart';
import 'package:raraapp/hooks/use_midia_locals.dart';

/// Grade de mídias (Home). Carrega a lista sozinha.
class MidiaLocalGrid extends StatefulWidget {
  const MidiaLocalGrid({super.key});

  @override
  State<MidiaLocalGrid> createState() => _MidiaLocalGridState();
}

class _MidiaLocalGridState extends State<MidiaLocalGrid> {
  @override
  void initState() {
    super.initState();
    // Na Home sempre recarrega, para mostrar os avisos mais recentes
    WidgetsBinding.instance.addPostFrameCallback(
      (_) => useMidiaLocals(context, listen: false).load(),
    );
  }

  @override
  Widget build(BuildContext context) {
    final midias = useMidiaLocals(context);

    if (midias.isLoading && midias.midias.isEmpty) {
      return const Center(child: CircularProgressIndicator());
    }
    if (midias.midias.isEmpty) {
      return Text(midias.error ?? 'Nenhuma mídia local encontrada');
    }

    return GridView.builder(
      shrinkWrap: true,
      physics: const NeverScrollableScrollPhysics(),
      gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
        crossAxisCount: MediaQuery.of(context).size.width < 600 ? 2 : 3,
        crossAxisSpacing: 12,
        mainAxisSpacing: 12,
        childAspectRatio: 0.85,
      ),
      itemCount: midias.midias.length,
      itemBuilder: (_, index) => MidiaLocalCard(midia: midias.midias[index]),
    );
  }
}
