import 'package:flutter/material.dart';
import 'package:raraapp/components/midia_local/midia_local_grid.dart';
import 'package:raraapp/components/shared/effects/fade_slide_in.dart';
import 'package:raraapp/components/shared/effects/floating.dart';
import 'package:raraapp/components/shared/effects/gradient_text.dart';
import 'package:raraapp/components/shared/page_header.dart';
import 'package:raraapp/components/shared/rara_logo.dart';
import 'package:raraapp/components/theme/app_effects.dart';
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
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          FadeSlideIn(
            offsetY: 0.08,
            child: _Hero(name: user?.name ?? 'Usuário', churchName: churchName),
          ),
          const SizedBox(height: 32),
          FadeSlideIn(
            delay: stagger(2),
            child: const PageHeader(
              icon: Icons.campaign_outlined,
              title: 'Mídias Locais',
              subtitle: 'Avisos e eventos da sua igreja',
            ),
          ),
          const SizedBox(height: 16),
          const MidiaLocalGrid(),
        ],
      ),
    );
  }
}

/// Faixa de boas-vindas: degradê do modo + mancha de luz + logo flutuando.
class _Hero extends StatelessWidget {
  final String name;
  final String churchName;

  const _Hero({required this.name, required this.churchName});

  String get _greeting {
    final hour = DateTime.now().hour;
    if (hour < 12) return 'Bom dia,';
    if (hour < 18) return 'Boa tarde,';
    return 'Boa noite,';
  }

  @override
  Widget build(BuildContext context) {
    final scheme = Theme.of(context).colorScheme;
    final effects = AppEffects.of(context);
    final text = Theme.of(context).textTheme;
    final radius = BorderRadius.circular(28);

    return ClipRRect(
      borderRadius: radius,
      child: Container(
        decoration: BoxDecoration(
          borderRadius: radius,
          border: Border.all(color: effects.glassBorder),
          gradient: LinearGradient(
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
            colors: effects.backgroundGradient,
          ),
        ),
        child: Stack(
          children: [
            // Mancha de luz no canto
            Positioned(
              right: -80,
              top: -80,
              child: IgnorePointer(
                child: Container(
                  width: 280,
                  height: 280,
                  decoration: BoxDecoration(
                    shape: BoxShape.circle,
                    gradient: RadialGradient(
                      colors: [effects.orbA, effects.orbA.withValues(alpha: 0)],
                    ),
                  ),
                ),
              ),
            ),
            // Logo grande e discreto ao fundo
            Positioned(
              right: 24,
              bottom: 16,
              child: ExcludeSemantics(
                child: Opacity(
                  opacity: 0.12,
                  child: Floating(child: const RaraLogo(height: 110)),
                ),
              ),
            ),
            Padding(
              padding: const EdgeInsets.all(28),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    _greeting,
                    style: text.titleMedium?.copyWith(
                      color: scheme.onSurface.withValues(alpha: 0.8),
                    ),
                  ),
                  GradientText(
                    name,
                    textAlign: TextAlign.start,
                    style: text.headlineMedium?.copyWith(
                      fontWeight: FontWeight.w800,
                    ),
                  ),
                  const SizedBox(height: 16),
                  _Pill(icon: Icons.church_outlined, label: churchName),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}

/// Etiqueta translúcida com ícone (vidro).
class _Pill extends StatelessWidget {
  final IconData icon;
  final String label;

  const _Pill({required this.icon, required this.label});

  @override
  Widget build(BuildContext context) {
    final effects = AppEffects.of(context);
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
      decoration: BoxDecoration(
        color: effects.glassFill,
        borderRadius: BorderRadius.circular(999),
        border: Border.all(color: effects.glassBorder),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(icon, size: 18),
          const SizedBox(width: 8),
          Flexible(child: Text(label, overflow: TextOverflow.ellipsis)),
        ],
      ),
    );
  }
}
