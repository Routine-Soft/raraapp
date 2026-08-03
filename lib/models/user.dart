// DTO de endereço (sub-documento)
class AddressDTO {
  final String? address;
  final String? cep;
  final String? neighborhood;
  final String? city;
  final String? state;
  final String? country;

  AddressDTO({
    this.address,
    this.cep,
    this.neighborhood,
    this.city,
    this.state,
    this.country,
  });

  factory AddressDTO.fromJson(Map<String, dynamic>? json) {
    if (json == null) return AddressDTO();
    return AddressDTO(
      address: json['address'],
      cep: json['cep'],
      neighborhood: json['neighborhood'],
      city: json['city'],
      state: json['state'],
      country: json['country'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'address': address,
      'cep': cep,
      'neighborhood': neighborhood,
      'city': city,
      'state': state,
      'country': country,
    };
  }

  AddressDTO copyWith({
    String? address,
    String? cep,
    String? neighborhood,
    String? city,
    String? state,
    String? country,
  }) {
    return AddressDTO(
      address: address ?? this.address,
      cep: cep ?? this.cep,
      neighborhood: neighborhood ?? this.neighborhood,
      city: city ?? this.city,
      state: state ?? this.state,
      country: country ?? this.country,
    );
  }
}

// DTO principal de usuário
class UserDTO {
  final String? id;
  final String name;
  final String email;
  final String? phone;
  final String? gender;
  final DateTime? birthdate;
  final String? churchId;
  final AddressDTO? address;
  final String? invitationofgrace;
  final String? status;
  final bool baptized;
  final bool member;
  final List<String>? roles;
  final String? facilitator;
  final String? accessToken;
  final String? refreshToken;
  final DateTime? createdAt;
  final DateTime? updatedAt;

  UserDTO({
    this.id,
    required this.name,
    required this.email,
    this.phone,
    this.gender,
    this.birthdate,
    this.churchId,
    this.address,
    this.invitationofgrace,
    this.status,
    this.baptized = false,
    this.member = false,
    this.roles,
    this.facilitator,
    this.accessToken,
    this.refreshToken,
    this.createdAt,
    this.updatedAt,
  });

  // Converter JSON para objeto
  factory UserDTO.fromJson(Map<String, dynamic> json) {
    return UserDTO(
      id: json['_id'] ?? json['id'],
      name: json['name'] ?? '',
      email: json['email'] ?? '',
      phone: json['phone'],
      gender: json['gender'],
      birthdate: json['birthdate'] != null
          ? DateTime.parse(json['birthdate'] as String)
          : null,
      churchId: json['churchId'],
      address: json['address'] != null
          ? AddressDTO.fromJson(json['address'] as Map<String, dynamic>)
          : null,
      invitationofgrace: json['invitationofgrace'],
      status: json['status'],
      baptized: json['baptized'] ?? false,
      member: json['member'] ?? false,
      roles: json['roles'] != null
          ? List<String>.from(json['roles'] as List)
          : null,
      facilitator: json['facilitator'],
      accessToken: json['accessToken'],
      refreshToken: json['refreshToken'],
      createdAt: json['createdAt'] != null
          ? DateTime.parse(json['createdAt'] as String)
          : null,
      updatedAt: json['updatedAt'] != null
          ? DateTime.parse(json['updatedAt'] as String)
          : null,
    );
  }

  // Converter objeto para JSON
  Map<String, dynamic> toJson() {
    return {
      '_id': id,
      'name': name,
      'email': email,
      'phone': phone,
      'gender': gender,
      'birthdate': birthdate?.toIso8601String(),
      'churchId': churchId,
      'address': address?.toJson(),
      'invitationofgrace': invitationofgrace,
      'status': status,
      'baptized': baptized,
      'member': member,
      'roles': roles,
      'facilitator': facilitator,
      'accessToken': accessToken,
      'refreshToken': refreshToken,
      'createdAt': createdAt?.toIso8601String(),
      'updatedAt': updatedAt?.toIso8601String(),
    };
  }

  // Copy with para imutabilidade
  UserDTO copyWith({
    String? id,
    String? name,
    String? email,
    String? phone,
    String? gender,
    DateTime? birthdate,
    String? churchId,
    AddressDTO? address,
    String? invitationofgrace,
    String? status,
    bool? baptized,
    bool? member,
    List<String>? roles,
    String? facilitator,
    String? accessToken,
    String? refreshToken,
    DateTime? createdAt,
    DateTime? updatedAt,
  }) {
    return UserDTO(
      id: id ?? this.id,
      name: name ?? this.name,
      email: email ?? this.email,
      phone: phone ?? this.phone,
      gender: gender ?? this.gender,
      birthdate: birthdate ?? this.birthdate,
      churchId: churchId ?? this.churchId,
      address: address ?? this.address,
      invitationofgrace: invitationofgrace ?? this.invitationofgrace,
      status: status ?? this.status,
      baptized: baptized ?? this.baptized,
      member: member ?? this.member,
      roles: roles ?? this.roles,
      facilitator: facilitator ?? this.facilitator,
      accessToken: accessToken ?? this.accessToken,
      refreshToken: refreshToken ?? this.refreshToken,
      createdAt: createdAt ?? this.createdAt,
      updatedAt: updatedAt ?? this.updatedAt,
    );
  }
}
