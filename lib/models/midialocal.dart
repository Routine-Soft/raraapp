class MidiaLocalDTO {
  final String? id;
  final DateTime? date;
  final String? time;
  final String? title; 
  final String? text;
  final String? churchId;
  final String? image;

  MidiaLocalDTO({
    this.id,
    this.date,
    this.time,
    this.title,
    this.text,
    this.churchId,
    this.image,
  });

  factory MidiaLocalDTO.fromJson(Map<String, dynamic>? json) {
    if (json == null) return MidiaLocalDTO();
    
    // churchId pode vir como String ou como Map (objeto)
    String? churchId;
    final churchIdValue = json['churchId'];
    if (churchIdValue is Map) {
      churchId = churchIdValue['_id'] as String?;
    } else if (churchIdValue is String) {
      churchId = churchIdValue;
    }
    
    return MidiaLocalDTO(
      id: json['_id'] ?? json['id'],
      date: json['date'] != null ? DateTime.parse(json['date'] as String) : null,
      time: json['time'] ?? '',
      title: json['title'] ?? '',
      text: json['text'] ?? '',
      churchId: churchId,
      image: json['image'] ?? '',
    );
  }

  Map<String, dynamic> toJson() {
    return {
      '_id': id,
      'date': date?.toIso8601String(),
      'time': time,
      'title': title,
      'text': text,
      'churchId': churchId,
      'image': image,
    };
  }

  MidiaLocalDTO copyWith({
    String? id,
    DateTime? date,
    String? time,
    String? title,
    String? text,
    String? churchId,
    String? image,
  }) {
    return MidiaLocalDTO(
      id: id ?? this.id,
      date: date ?? this.date,
      time: time ?? this.time,
      title: title ?? this.title,
      text: text ?? this.text,
      churchId: churchId ?? this.churchId,
      image: image ?? this.image,
    );
  }
}