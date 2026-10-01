import 'package:flutter/widgets.dart';

/// Acessibilidade: respeita o "reduzir movimento" do sistema operacional.
/// Quando ligado, os efeitos aparecem já no estado final, sem animar.
bool reduceMotion(BuildContext context) =>
    MediaQuery.of(context).disableAnimations;
