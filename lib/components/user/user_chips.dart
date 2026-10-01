import 'package:flutter/material.dart';
import 'package:raraapp/api/user_api.dart';
import 'package:raraapp/components/shared/initials_avatar.dart';
import 'package:raraapp/components/shared/tag.dart';

/// Etiquetas "Batizado/Não Batizado" e "Membro/Não Membro".
class UserChips extends StatelessWidget {
  final User user;
  final bool showMember;

  const UserChips({super.key, required this.user, this.showMember = true});

  @override
  Widget build(BuildContext context) {
    final scheme = Theme.of(context).colorScheme;
    return Wrap(
      spacing: 8,
      runSpacing: 8,
      children: [
        Tag(
          user.baptized ? 'Batizado' : 'Não Batizado',
          dot: user.baptized ? scheme.primary : Colors.transparent,
        ),
        if (showMember)
          Tag(
            user.member ? 'Membro' : 'Não Membro',
            dot: user.member ? scheme.primary : Colors.transparent,
          ),
      ],
    );
  }
}

/// Avatar com as iniciais do nome.
class UserAvatar extends StatelessWidget {
  final User user;
  final double size;

  const UserAvatar(this.user, {super.key, this.size = 44});

  @override
  Widget build(BuildContext context) => InitialsAvatar(user.name, size: size);
}

/// Card de pessoa: avatar + nome + [subtitle] + ações/seta.
class UserTile extends StatelessWidget {
  final User user;
  final Widget? subtitle;
  final Widget? trailing;
  final VoidCallback? onTap;

  const UserTile({
    super.key,
    required this.user,
    this.subtitle,
    this.trailing,
    this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return Card(
      clipBehavior: Clip.antiAlias,
      child: InkWell(
        onTap: onTap,
        child: Padding(
          padding: const EdgeInsets.fromLTRB(16, 14, 8, 14),
          child: Row(
            children: [
              UserAvatar(user),
              const SizedBox(width: 14),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  spacing: 8,
                  children: [
                    Text(
                      user.name,
                      style: Theme.of(context).textTheme.titleMedium?.copyWith(
                        fontWeight: FontWeight.w700,
                      ),
                    ),
                    ?subtitle,
                  ],
                ),
              ),
              trailing ??
                  (onTap != null
                      ? const Icon(Icons.chevron_right)
                      : const SizedBox.shrink()),
            ],
          ),
        ),
      ),
    );
  }
}
