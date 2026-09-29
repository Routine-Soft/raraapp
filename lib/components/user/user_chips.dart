import 'package:flutter/material.dart';
import 'package:raraapp/api/user_api.dart';

/// Chips "Batizado/Não Batizado" e "Membro/Não Membro".
class UserChips extends StatelessWidget {
  final User user;
  final bool showMember;

  const UserChips({super.key, required this.user, this.showMember = true});

  Widget _chip(String label, Color color) => Chip(
    label: Text(
      label,
      style: const TextStyle(fontSize: 11, color: Colors.white),
    ),
    backgroundColor: color,
    visualDensity: VisualDensity.compact,
  );

  @override
  Widget build(BuildContext context) {
    return Wrap(
      spacing: 6,
      children: [
        user.baptized
            ? _chip('Batizado', Colors.green)
            : _chip('Não Batizado', Colors.orange),
        if (showMember)
          user.member
              ? _chip('Membro', Colors.blue)
              : _chip('Não Membro', Colors.grey),
      ],
    );
  }
}

/// Avatar com a inicial do nome.
class UserAvatar extends StatelessWidget {
  final User user;

  const UserAvatar(this.user, {super.key});

  @override
  Widget build(BuildContext context) {
    return CircleAvatar(
      backgroundColor: user.member ? Colors.green[100] : null,
      child: Text(user.name.isEmpty ? '?' : user.name[0].toUpperCase()),
    );
  }
}
