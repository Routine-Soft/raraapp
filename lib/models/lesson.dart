// DTO para pergunta dentro da lição
class QuestionDTO {
  final String? statement;
  final List<String>? options;
  final int? correctOptionIndex;

  QuestionDTO({
    this.statement,
    this.options,
    this.correctOptionIndex,
  });

  factory QuestionDTO.fromJson(Map<String, dynamic>? json) {
    if (json == null) return QuestionDTO();
    return QuestionDTO(
      statement: json['statement'],
      options: json['options'] != null
          ? List<String>.from(json['options'] as List)
          : null,
      correctOptionIndex: json['correctOptionIndex'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'statement': statement,
      'options': options,
      'correctOptionIndex': correctOptionIndex,
    };
  }

  QuestionDTO copyWith({
    String? statement,
    List<String>? options,
    int? correctOptionIndex,
  }) {
    return QuestionDTO(
      statement: statement ?? this.statement,
      options: options ?? this.options,
      correctOptionIndex: correctOptionIndex ?? this.correctOptionIndex,
    );
  }
}

// DTO principal de lição
class LessonDTO {
  final String? id;
  final String? module;
  final int? number;
  final String? title;
  final String? videoUrl;
  final String? content;
  final String? image;
  final List<QuestionDTO>? questions;
  final DateTime? createdAt;
  final DateTime? updatedAt;

  LessonDTO({
    this.id,
    this.module,
    this.number,
    this.title,
    this.videoUrl,
    this.content,
    this.image,
    this.questions,
    this.createdAt,
    this.updatedAt,
  });

  factory LessonDTO.fromJson(Map<String, dynamic>? json) {
    if (json == null) return LessonDTO();
    return LessonDTO(
      id: json['_id'] ?? json['id'],
      module: json['module'],
      number: json['number'],
      title: json['title'],
      videoUrl: json['videoUrl'],
      content: json['content'],
      image: json['image'],
      questions: json['questions'] != null
          ? (json['questions'] as List)
              .map((q) => QuestionDTO.fromJson(q as Map<String, dynamic>))
              .toList()
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
      'module': module,
      'number': number,
      'title': title,
      'videoUrl': videoUrl,
      'content': content,
      'image': image,
      'questions': questions?.map((q) => q.toJson()).toList(),
      'createdAt': createdAt?.toIso8601String(),
      'updatedAt': updatedAt?.toIso8601String(),
    };
  }

  LessonDTO copyWith({
    String? id,
    String? module,
    int? number,
    String? title,
    String? videoUrl,
    String? content,
    String? image,
    List<QuestionDTO>? questions,
    DateTime? createdAt,
    DateTime? updatedAt,
  }) {
    return LessonDTO(
      id: id ?? this.id,
      module: module ?? this.module,
      number: number ?? this.number,
      title: title ?? this.title,
      videoUrl: videoUrl ?? this.videoUrl,
      content: content ?? this.content,
      image: image ?? this.image,
      questions: questions ?? this.questions,
      createdAt: createdAt ?? this.createdAt,
      updatedAt: updatedAt ?? this.updatedAt,
    );
  }
}
