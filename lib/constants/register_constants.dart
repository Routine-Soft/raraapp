/// Países com DDI, usados no telefone do cadastro.
class RegisterConstants {
  /// DDI do telefone salvo na conta (ex.: '+5511987654321' → '+55').
  /// Sem telefone ou DDI desconhecido, usa o do Brasil.
  static String ddiFromPhone(String? phone) {
    final p = '+${(phone ?? '').replaceAll(RegExp(r'[^0-9]'), '')}';
    final ddis = countriesWithDDI.values.toSet().toList()
      ..sort((a, b) => b.length.compareTo(a.length)); // +351 antes de +35
    return ddis.firstWhere(
      (ddi) => p.length > ddi.length && p.startsWith(ddi),
      orElse: () => '+55',
    );
  }

  static const Map<String, String> countriesWithDDI = {
    'Brasil (+55)': '+55',
    'Estados Unidos (+1)': '+1',
    'Canadá (+1)': '+1',
    'México (+52)': '+52',
    'Argentina (+54)': '+54',
    'Chile (+56)': '+56',
    'Colombia (+57)': '+57',
    'Peru (+51)': '+51',
    'Venezuela (+58)': '+58',
    'Portugal (+351)': '+351',
    'Espanha (+34)': '+34',
    'França (+33)': '+33',
    'Alemanha (+49)': '+49',
    'Itália (+39)': '+39',
    'Reino Unido (+44)': '+44',
    'Austrália (+61)': '+61',
    'Nova Zelândia (+64)': '+64',
    'Japão (+81)': '+81',
    'China (+86)': '+86',
    'Índia (+91)': '+91',
    'Moçambique (+258)': '+258',
    'Angola (+244)': '+244',
  };
}
