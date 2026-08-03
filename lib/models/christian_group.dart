// DTO principal de grupo cristão
class ChristianGroupDTO {
  final String? id;
  final String? name;
  final Map<String, dynamic>? address;
  final String? leader;
  final String? coleader;
  final String? host;
  final List<String>? contact;
  final String? churchId;
  final DateTime? createdAt;
  final DateTime? updatedAt;

  ChristianGroupDTO({
    this.id,
    this.name,
    this.address,
    this.leader,
    this.coleader,
    this.host,
    this.contact,
    this.churchId,
    this.createdAt,
    this.updatedAt,
  });

  factory ChristianGroupDTO.fromJson(Map<String, dynamic>? json) {
    if (json == null) return ChristianGroupDTO();
    return ChristianGroupDTO(
      id: json['_id'] ?? json['id'],
      name: json['name'],
      address: json['address'] != null
          ? Map<String, dynamic>.from(json['address'] as Map)
          : null,
      leader: json['leader'],
      coleader: json['coleader'],
      host: json['host'],
      contact: json['contact'] != null
          ? List<String>.from(json['contact'] as List)
          : null,
      churchId: json['churchId'] is Map
          ? (json['churchId'] as Map)['_id'] ?? (json['churchId'] as Map)['id']
          : json['churchId'],
      createdAt: json['createdAt'] != null
          ? DateTime.parse(json['createdAt'] as String)
          : null,
      updatedAt: json['updatedAt'] != null
          ? DateTime.parse(json['updatedAt'] as String)
          : null,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      '_id': id,
      'name': name,
      'address': address,
      'leader': leader,
      'coleader': coleader,
      'host': host,
      'contact': contact,
      'churchId': churchId,
      'createdAt': createdAt?.toIso8601String(),
      'updatedAt': updatedAt?.toIso8601String(),
    };
  }

  ChristianGroupDTO copyWith({
    String? id,
    String? name,
    Map<String, dynamic>? address,
    String? leader,
    String? coleader,
    String? host,
    List<String>? contact,
    String? churchId,
    DateTime? createdAt,
    DateTime? updatedAt,
  }) {
    return ChristianGroupDTO(
      id: id ?? this.id,
      name: name ?? this.name,
      address: address ?? this.address,
      leader: leader ?? this.leader,
      coleader: coleader ?? this.coleader,
      host: host ?? this.host,
      contact: contact ?? this.contact,
      churchId: churchId ?? this.churchId,
      createdAt: createdAt ?? this.createdAt,
      updatedAt: updatedAt ?? this.updatedAt,
    );
  }
}
