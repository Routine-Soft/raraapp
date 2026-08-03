class Validators {
  // ============ Email ============
  
  static String? validateEmail(String? value) {
    if (value == null || value.isEmpty) {
      return 'Email is required';
    }
    
    const pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$';
    final regex = RegExp(pattern);
    
    if (!regex.hasMatch(value)) {
      return 'Enter a valid email';
    }
    
    return null;
  }

  // ============ Senha ============

  static String? validatePassword(String? value) {
    if (value == null || value.isEmpty) {
      return 'Password is required';
    }
    
    if (value.length < 6) {
      return 'Password must be at least 6 characters';
    }
    
    if (value.length > 50) {
      return 'Password must be at most 50 characters';
    }
    
    return null;
  }

  static String? validatePasswordConfirm(String? value, String? password) {
    if (value == null || value.isEmpty) {
      return 'Password confirmation is required';
    }
    
    if (value != password) {
      return 'Passwords do not match';
    }
    
    return null;
  }

  // ============ Nome ============

  static String? validateName(String? value) {
    if (value == null || value.isEmpty) {
      return 'Name is required';
    }
    
    if (value.length < 3) {
      return 'Name must be at least 3 characters';
    }
    
    if (value.length > 100) {
      return 'Name must be at most 100 characters';
    }
    
    return null;
  }

  // ============ Telefone ============

  static String? validatePhone(String? value) {
    if (value == null || value.isEmpty) {
      return null; // Telefone é opcional
    }
    
    // Remove caracteres não numéricos
    final digitsOnly = value.replaceAll(RegExp(r'\D'), '');
    
    if (digitsOnly.length < 10) {
      return 'Phone must have at least 10 digits';
    }
    
    return null;
  }

  // ============ CEP ============

  static String? validateCep(String? value) {
    if (value == null || value.isEmpty) {
      return null; // CEP é opcional
    }
    
    // Remove caracteres não numéricos
    final digitsOnly = value.replaceAll(RegExp(r'\D'), '');
    
    if (digitsOnly.length != 8) {
      return 'CEP must have exactly 8 digits';
    }
    
    return null;
  }

  // ============ Data de nascimento ============

  static String? validateBirthdate(DateTime? value) {
    if (value == null) {
      return null; // Opcional
    }
    
    final now = DateTime.now();
    final age = now.year - value.year;
    
    if (age < 0 || age > 150) {
      return 'Please enter a valid birthdate';
    }
    
    if (value.isAfter(now)) {
      return 'Birthdate cannot be in the future';
    }
    
    return null;
  }

  // ============ Endereço ============

  static String? validateAddress(String? value) {
    if (value == null || value.isEmpty) {
      return null; // Opcional
    }
    
    if (value.length < 3) {
      return 'Address must be at least 3 characters';
    }
    
    return null;
  }

  // ============ Cidade ============

  static String? validateCity(String? value) {
    if (value == null || value.isEmpty) {
      return null; // Opcional
    }
    
    if (value.length < 2) {
      return 'City must be at least 2 characters';
    }
    
    return null;
  }

  // ============ Estado ============

  static String? validateState(String? value) {
    if (value == null || value.isEmpty) {
      return null; // Opcional
    }
    
    if (value.length != 2) {
      return 'State must have exactly 2 characters';
    }
    
    return null;
  }

  // ============ Utilitários ============

  /// Remove caracteres especiais do telefone deixando apenas números
  static String formatPhone(String phone) {
    return phone.replaceAll(RegExp(r'\D'), '');
  }

  /// Formata o CEP (XXXXX-XXX)
  static String formatCep(String cep) {
    final digitsOnly = cep.replaceAll(RegExp(r'\D'), '');
    if (digitsOnly.length != 8) return cep;
    return '${digitsOnly.substring(0, 5)}-${digitsOnly.substring(5)}';
  }

  /// Remove formatação do CEP
  static String unformatCep(String cep) {
    return cep.replaceAll(RegExp(r'\D'), '');
  }
}
