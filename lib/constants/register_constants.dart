// Constants for user registration
class RegisterConstants {
  // Gender options
  static const List<String> genderOptions = ['Masculino', 'Feminino'];

  // Status options
  static const List<String> statusOptions = [
    'Presente',
    'Ausente',
    'Foi embora',
  ];

  // Invitation of grace options
  static const List<String> invitationOptions = [
    'Aceitou Jesus',
    'Reconciliou',
    'Troca de Igreja',
    'Recebeu Oração',
  ];

  // Countries with DDI (country code)
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

  // Form field labels
  static const String labelName = 'Nome Completo';
  static const String labelEmail = 'Email';
  static const String labelPassword = 'Senha';
  static const String labelPhone = 'Telefone';
  static const String labelGender = 'Gênero';
  static const String labelBirthdate = 'Data de Nascimento';
  static const String labelAddress = 'Endereço';
  static const String labelCep = 'CEP';
  static const String labelNeighborhood = 'Bairro';
  static const String labelCity = 'Cidade';
  static const String labelState = 'Estado';
  static const String labelCountry = 'País';
  static const String labelInvitation = 'Convite da Graça';
  static const String labelStatus = 'Status';
  static const String labelBaptized = 'Batizado';
  static const String labelMember = 'Membro';
}
