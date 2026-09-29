/// Endereço embutido (usado por Church, User e ChristianGroup no backend).
class Address {
  final String? address;
  final String? cep;
  final String? neighborhood;
  final String? city;
  final String? state;
  final String? country;

  const Address({
    this.address,
    this.cep,
    this.neighborhood,
    this.city,
    this.state,
    this.country,
  });

  factory Address.fromJson(Map<String, dynamic> json) => Address(
    address: json['address'],
    cep: json['cep'],
    neighborhood: json['neighborhood'],
    city: json['city'],
    state: json['state'],
    country: json['country'],
  );

  Map<String, dynamic> toJson() => {
    'address': address,
    'cep': cep,
    'neighborhood': neighborhood,
    'city': city,
    'state': state,
    'country': country,
  };
}
