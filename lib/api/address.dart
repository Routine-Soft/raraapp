/// Endereço embutido (usado por Church, User e ChristianGroup no backend).
class Address {
  final String? address;
  final String? number;
  final String? complement;
  final String? cep;
  final String? neighborhood;
  final String? city;
  final String? state;
  final String? country;

  const Address({
    this.address,
    this.number,
    this.complement,
    this.cep,
    this.neighborhood,
    this.city,
    this.state,
    this.country,
  });

  factory Address.fromJson(Map<String, dynamic> json) => Address(
    address: json['address'],
    number: json['number'],
    complement: json['complement'],
    cep: json['cep'],
    neighborhood: json['neighborhood'],
    city: json['city'],
    state: json['state'],
    country: json['country'],
  );

  Map<String, dynamic> toJson() => {
    'address': address,
    'number': number,
    'complement': complement,
    'cep': cep,
    'neighborhood': neighborhood,
    'city': city,
    'state': state,
    'country': country,
  };

  /// "Rua das Flores, 123 - Apto 4, Centro, São Paulo - SP, CEP 01001-000".
  /// Vazio quando não há nada preenchido.
  String get oneLine {
    bool filled(String? s) => s != null && s.trim().isNotEmpty;
    final street = [
      [address, number].where(filled).join(', '),
      if (filled(complement)) complement,
    ].where(filled).join(' - ');
    return [
      street,
      neighborhood,
      [city, state].where(filled).join(' - '),
      if (filled(cep)) 'CEP $cep',
    ].where(filled).join(', ');
  }
}
