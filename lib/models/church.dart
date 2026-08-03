import 'package:raraapp/models/user.dart';

class ChurchDTO {
  final String id;
  final String name;
  final String? pastor1;
  final String? pastor2;
  final AddressDTO? address;
  final String? cnpj;
  final String? logoUrl;
  final int? totalMembers;

  ChurchDTO({
    required this.id,
    required this.name,
    this.pastor1,
    this.pastor2,
    this.address,
    this.cnpj,
    this.logoUrl,
    this.totalMembers,
  });

  factory ChurchDTO.fromJson(Map<String, dynamic> json) {
    return ChurchDTO(
      id: json['_id'] ?? json['id'] ?? '',
      name: json['name'] ?? '',
      pastor1: json['pastor1'],
      pastor2: json['pastor2'],
      address: json['address'] != null
          ? AddressDTO.fromJson(json['address'])
          : null,
      cnpj: json['cnpj'],
      logoUrl: json['logoUrl'],
      totalMembers: json['totalMembers'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      '_id': id,
      'name': name,
      'pastor1': pastor1,
      'pastor2': pastor2,
      'address': address?.toJson(),
      'cnpj': cnpj,
      'logoUrl': logoUrl,
      'totalMembers': totalMembers,
    };
  }

  ChurchDTO copyWith({
    String? id,
    String? name,
    String? pastor1,
    String? pastor2,
    AddressDTO? address,
    String? cnpj,
    String? logoUrl,
    int? totalMembers,
  }) {
    return ChurchDTO(
      id: id ?? this.id,
      name: name ?? this.name,
      pastor1: pastor1 ?? this.pastor1,
      pastor2: pastor2 ?? this.pastor2,
      address: address ?? this.address,
      cnpj: cnpj ?? this.cnpj,
      logoUrl: logoUrl ?? this.logoUrl,
      totalMembers: totalMembers ?? this.totalMembers,
    );
  }
}
