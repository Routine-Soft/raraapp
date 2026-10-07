import 'package:flutter/material.dart';
import 'package:raraapp/components/midia_local/midia_local_card.dart';
import 'package:raraapp/components/shared/effects/fade_slide_in.dart';
import 'package:raraapp/components/shared/effects/hover_lift.dart';
import 'package:raraapp/components/shared/list_page.dart';
import 'package:raraapp/hooks/use_auth.dart';
import 'package:raraapp/hooks/use_midia_locals.dart';

/// Lista de mídias da igreja da pessoa (Home). Carrega a lista sozinha.
/// Sem igreja escolhida não mostra nenhuma mídia.
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
    final churchId = useAuth(context).user?.churchId;

    if (churchId == null) {
      return const _Empty(
        message: 'Escolha a sua igreja em Minha Conta para ver os avisos',
      );
    }
    if (midias.isLoading && midias.midias.isEmpty) {
      return _Grid(children: List.filled(3, const CardSkeleton()));
    }
    final mine = midias.midias.where((m) => m.churchId == churchId).toList();
    if (mine.isEmpty) {
      return _Empty(message: midias.error ?? 'Nenhuma mídia local encontrada');
    }

    return _Grid(
      children: [
        for (var i = 0; i < mine.length; i++)
          FadeSlideIn(
            delay: stagger(i + 3, stepMs: 70),
            child: HoverLift(child: MidiaLocalCard(midia: mine[i])),
          ),
      ],
    );
  }
}

/// Coluna de cards espaçados.
class _Grid extends StatelessWidget {
  final List<Widget> children;

  const _Grid({required this.children});

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      spacing: 12,
      children: children,
    );
  }
}

class _Empty extends StatelessWidget {
  final String message;

  const _Empty({required this.message});

  @override
  Widget build(BuildContext context) {
    final muted = Theme.of(
      context,
    ).colorScheme.onSurface.withValues(alpha: 0.6);
    return Card(
      margin: EdgeInsets.zero,
      child: Padding(
        padding: const EdgeInsets.symmetric(vertical: 40, horizontal: 20),
        child: Column(
          children: [
            Icon(Icons.inbox_outlined, size: 40, color: muted),
            const SizedBox(height: 12),
            Text(
              message,
              textAlign: TextAlign.center,
              style: TextStyle(color: muted),
            ),
          ],
        ),
      ),
    );
  }
}
