import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';
import 'package:youtube_player_iframe/youtube_player_iframe.dart';

/// Vídeo da aula tocando dentro do app.
/// Links do YouTube mostram a capa e, ao tocar, tocam num player embutido.
/// Outros links continuam abrindo fora do app.
class LessonVideo extends StatefulWidget {
  final String url;

  const LessonVideo(this.url, {super.key});

  @override
  State<LessonVideo> createState() => _LessonVideoState();
}

class _LessonVideoState extends State<LessonVideo> {
  late final String? _videoId = YoutubePlayerController.convertUrlToId(
    widget.url,
  );

  /// Criado só no primeiro toque, para não carregar o player à toa.
  YoutubePlayerController? _controller;

  void _play() => setState(() {
    _controller = YoutubePlayerController.fromVideoId(
      videoId: _videoId!,
      autoPlay: true,
      params: const YoutubePlayerParams(
        showFullscreenButton: true,
        strictRelatedVideos: true,
      ),
    );
  });

  @override
  void dispose() {
    _controller?.close();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final videoId = _videoId;
    if (videoId == null) return _ExternalLink(widget.url);

    final controller = _controller;
    return AnimatedSwitcher(
      duration: const Duration(milliseconds: 300),
      child: controller != null
          ? YoutubePlayer(
              key: const ValueKey('player'),
              controller: controller,
              aspectRatio: 16 / 9,
            )
          : _Cover(
              key: const ValueKey('cover'),
              videoId: videoId,
              onTap: _play,
            ),
    );
  }
}

/// Capa do vídeo com botão de play que brilha (CSS: box-shadow glow).
class _Cover extends StatelessWidget {
  final String videoId;
  final VoidCallback onTap;

  const _Cover({super.key, required this.videoId, required this.onTap});

  @override
  Widget build(BuildContext context) {
    final scheme = Theme.of(context).colorScheme;
    final radius = BorderRadius.circular(18);

    return Semantics(
      button: true,
      label: 'Assistir vídeo da aula',
      child: DecoratedBox(
        decoration: BoxDecoration(
          borderRadius: radius,
          boxShadow: [
            BoxShadow(
              color: Colors.black.withValues(alpha: 0.25),
              blurRadius: 20,
              offset: const Offset(0, 8),
            ),
          ],
        ),
        child: ClipRRect(
          borderRadius: radius,
          child: AspectRatio(
            aspectRatio: 16 / 9,
            child: Material(
              color: Colors.black,
              child: InkWell(
                onTap: onTap,
                child: Stack(
                  fit: StackFit.expand,
                  children: [
                    Image.network(
                      YoutubePlayerController.getThumbnail(
                        videoId: videoId,
                        quality: ThumbnailQuality.high,
                        format: ThumbnailFormat.jpeg,
                      ),
                      fit: BoxFit.cover,
                      errorBuilder: (_, _, _) => const SizedBox.shrink(),
                    ),
                    // Escurece embaixo para o texto aparecer
                    const DecoratedBox(
                      decoration: BoxDecoration(
                        gradient: LinearGradient(
                          begin: Alignment.topCenter,
                          end: Alignment.bottomCenter,
                          colors: [Colors.transparent, Colors.black54],
                        ),
                      ),
                    ),
                    Center(
                      child: Container(
                        padding: const EdgeInsets.all(16),
                        decoration: BoxDecoration(
                          color: scheme.primary,
                          shape: BoxShape.circle,
                          boxShadow: [
                            BoxShadow(
                              color: scheme.primary.withValues(alpha: 0.6),
                              blurRadius: 24,
                            ),
                          ],
                        ),
                        child: Icon(
                          Icons.play_arrow_rounded,
                          size: 40,
                          color: scheme.onPrimary,
                        ),
                      ),
                    ),
                    const Positioned(
                      left: 14,
                      bottom: 10,
                      child: Text(
                        'Assistir aula',
                        style: TextStyle(
                          color: Colors.white,
                          fontWeight: FontWeight.w700,
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

/// Link que não é do YouTube: botão que abre no navegador/app externo.
class _ExternalLink extends StatelessWidget {
  final String url;

  const _ExternalLink(this.url);

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      height: 54,
      child: OutlinedButton.icon(
        onPressed: () =>
            launchUrl(Uri.parse(url), mode: LaunchMode.externalApplication),
        icon: const Icon(Icons.play_circle_outline),
        label: const Text('Assistir vídeo da aula'),
      ),
    );
  }
}
