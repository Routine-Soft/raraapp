// DTO principal de solicitação de cura
class CuraDTO {
  final String? id;
  final String? userId;
  final Map<String, dynamic>?
  userDetails; // Dados completos do usuário quando populado
  final String? type; // 'cura_alma', 'reciclagem', 'gabinete_pastoral'
  final String? status; // 'fila_espera', 'andamento', 'concluido'
  final String? assignedTo; // ID do pastor/atendente responsável
  final String? notes; // anotações internas
  final String? churchId;
  final DateTime? completedAt;
  final DateTime? createdAt;
  final DateTime? updatedAt;

  CuraDTO({
    this.id,
    this.userId,
    this.userDetails,
    this.type,
    this.status,
    this.assignedTo,
    this.notes,
    this.churchId,
    this.completedAt,
    this.createdAt,
    this.updatedAt,
  });

  factory CuraDTO.fromJson(Map<String, dynamic>? json) {
    if (json == null) return CuraDTO();

    // Verifica se userId é um objeto (populado) ou string (ID)
    String? userId;
    Map<String, dynamic>? userDetails;

    if (json['userId'] is Map) {
      userDetails = json['userId'] as Map<String, dynamic>;
      userId = userDetails['_id'] ?? userDetails['id'];
    } else {
      userId = json['userId'] as String?;
    }

    return CuraDTO(
      id: json['_id'] ?? json['id'],
      userId: userId,
      userDetails: userDetails,
      type: json['type'],
      status: json['status'],
      assignedTo: json['assignedTo'] is Map
          ? (json['assignedTo'] as Map)['_id'] ??
                (json['assignedTo'] as Map)['id']
          : json['assignedTo'],
      notes: json['notes'],
      churchId: json['churchId'] is Map
          ? (json['churchId'] as Map)['_id'] ?? (json['churchId'] as Map)['id']
          : json['churchId'],
      completedAt: json['completedAt'] != null
          ? DateTime.parse(json['completedAt'] as String)
          : null,
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
      'userId': userId,
      'type': type,
      'status': status,
      'assignedTo': assignedTo,
      'notes': notes,
      'churchId': churchId,
      'completedAt': completedAt?.toIso8601String(),
      'createdAt': createdAt?.toIso8601String(),
      'updatedAt': updatedAt?.toIso8601String(),
    };
  }

  CuraDTO copyWith({
    String? id,
    String? userId,
    Map<String, dynamic>? userDetails,
    String? type,
    String? status,
    String? assignedTo,
    String? notes,
    String? churchId,
    DateTime? completedAt,
    DateTime? createdAt,
    DateTime? updatedAt,
  }) {
    return CuraDTO(
      id: id ?? this.id,
      userId: userId ?? this.userId,
      userDetails: userDetails ?? this.userDetails,
      type: type ?? this.type,
      status: status ?? this.status,
      assignedTo: assignedTo ?? this.assignedTo,
      notes: notes ?? this.notes,
      churchId: churchId ?? this.churchId,
      completedAt: completedAt ?? this.completedAt,
      createdAt: createdAt ?? this.createdAt,
      updatedAt: updatedAt ?? this.updatedAt,
    );
  }
}
