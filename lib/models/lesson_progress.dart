// DTO para resposta do usuário
class AnswerDTO {
  final int? questionIndex;
  final int? selectedOptionIndex;
  final bool? isCorrect;

  AnswerDTO({
    this.questionIndex,
    this.selectedOptionIndex,
    this.isCorrect,
  });

  factory AnswerDTO.fromJson(Map<String, dynamic>? json) {
    if (json == null) return AnswerDTO();
    return AnswerDTO(
      questionIndex: json['questionIndex'],
      selectedOptionIndex: json['selectedOptionIndex'],
      isCorrect: json['isCorrect'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'questionIndex': questionIndex,
      'selectedOptionIndex': selectedOptionIndex,
      'isCorrect': isCorrect,
    };
  }

  AnswerDTO copyWith({
    int? questionIndex,
    int? selectedOptionIndex,
    bool? isCorrect,
  }) {
    return AnswerDTO(
      questionIndex: questionIndex ?? this.questionIndex,
      selectedOptionIndex: selectedOptionIndex ?? this.selectedOptionIndex,
      isCorrect: isCorrect ?? this.isCorrect,
    );
  }
}

// DTO principal de progresso da lição
class LessonProgressDTO {
  final String? id;
  final String? userId;
  final String? lessonId;
  final int? score;
  final int? totalQuestions;
  final List<AnswerDTO>? answers;
  final DateTime? completedAt;
  final DateTime? createdAt;
  final DateTime? updatedAt;

  LessonProgressDTO({
    this.id,
    this.userId,
    this.lessonId,
    this.score,
    this.totalQuestions,
    this.answers,
    this.completedAt,
    this.createdAt,
    this.updatedAt,
  });

  factory LessonProgressDTO.fromJson(Map<String, dynamic>? json) {
    if (json == null) return LessonProgressDTO();
    return LessonProgressDTO(
      id: json['_id'] ?? json['id'],
      userId: json['userId'] is Map
          ? (json['userId'] as Map)['_id'] ?? (json['userId'] as Map)['id']
          : json['userId'],
      lessonId: json['lessonId'] is Map
          ? (json['lessonId'] as Map)['_id'] ?? (json['lessonId'] as Map)['id']
          : json['lessonId'],
      score: json['score'],
      totalQuestions: json['totalQuestions'],
      answers: json['answers'] != null
          ? (json['answers'] as List)
              .map((a) => AnswerDTO.fromJson(a as Map<String, dynamic>))
              .toList()
          : null,
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
      'lessonId': lessonId,
      'score': score,
      'totalQuestions': totalQuestions,
      'answers': answers?.map((a) => a.toJson()).toList(),
      'completedAt': completedAt?.toIso8601String(),
      'createdAt': createdAt?.toIso8601String(),
      'updatedAt': updatedAt?.toIso8601String(),
    };
  }

  LessonProgressDTO copyWith({
    String? id,
    String? userId,
    String? lessonId,
    int? score,
    int? totalQuestions,
    List<AnswerDTO>? answers,
    DateTime? completedAt,
    DateTime? createdAt,
    DateTime? updatedAt,
  }) {
    return LessonProgressDTO(
      id: id ?? this.id,
      userId: userId ?? this.userId,
      lessonId: lessonId ?? this.lessonId,
      score: score ?? this.score,
      totalQuestions: totalQuestions ?? this.totalQuestions,
      answers: answers ?? this.answers,
      completedAt: completedAt ?? this.completedAt,
      createdAt: createdAt ?? this.createdAt,
      updatedAt: updatedAt ?? this.updatedAt,
    );
  }
}
