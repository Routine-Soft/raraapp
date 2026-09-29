import 'package:flutter/material.dart';
import 'package:raraapp/api/address.dart';
import 'package:raraapp/components/shared/custom_text_field.dart';

/// Guarda os TextEditingControllers de um endereço.
/// Crie no State do formulário e chame [dispose] no dispose dele.
class AddressForm {
  final TextEditingController street;
  final TextEditingController cep;
  final TextEditingController neighborhood;
  final TextEditingController city;
  final TextEditingController state;
  final TextEditingController country;

  AddressForm([Address? address])
    : street = TextEditingController(text: address?.address),
      cep = TextEditingController(text: address?.cep),
      neighborhood = TextEditingController(text: address?.neighborhood),
      city = TextEditingController(text: address?.city),
      state = TextEditingController(text: address?.state),
      country = TextEditingController(text: address?.country);

  static String? _text(TextEditingController c) =>
      c.text.trim().isEmpty ? null : c.text.trim();

  Address toAddress() => Address(
    address: _text(street),
    cep: _text(cep),
    neighborhood: _text(neighborhood),
    city: _text(city),
    state: _text(state),
    country: _text(country),
  );

  /// Troca os valores dos campos (ex.: botão "Cancelar" de uma edição).
  void fill(Address? address) {
    street.text = address?.address ?? '';
    cep.text = address?.cep ?? '';
    neighborhood.text = address?.neighborhood ?? '';
    city.text = address?.city ?? '';
    state.text = address?.state ?? '';
    country.text = address?.country ?? '';
  }

  void clear() => fill(null);

  void dispose() {
    for (final c in [street, cep, neighborhood, city, state, country]) {
      c.dispose();
    }
  }
}

/// Campos de endereço (Rua, CEP, Bairro, Cidade, Estado, País).
class AddressFields extends StatelessWidget {
  final AddressForm form;
  final bool showCountry;

  const AddressFields({super.key, required this.form, this.showCountry = true});

  @override
  Widget build(BuildContext context) {
    const gap = SizedBox(height: 12, width: 12);

    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        Text(
          'Endereço',
          style: Theme.of(
            context,
          ).textTheme.titleSmall?.copyWith(fontWeight: FontWeight.bold),
        ),
        gap,
        CustomTextField(label: 'Rua', controller: form.street),
        gap,
        Row(
          children: [
            Expanded(
              child: CustomTextField(label: 'CEP', controller: form.cep),
            ),
            gap,
            Expanded(
              child: CustomTextField(
                label: 'Bairro',
                controller: form.neighborhood,
              ),
            ),
          ],
        ),
        gap,
        Row(
          children: [
            Expanded(
              child: CustomTextField(label: 'Cidade', controller: form.city),
            ),
            gap,
            SizedBox(
              width: 100,
              child: CustomTextField(label: 'Estado', controller: form.state),
            ),
          ],
        ),
        if (showCountry) ...[
          gap,
          CustomTextField(label: 'País', controller: form.country),
        ],
      ],
    );
  }
}

/// Endereço em texto, para cards.
class AddressText extends StatelessWidget {
  final Address address;

  const AddressText(this.address, {super.key});

  @override
  Widget build(BuildContext context) {
    final style = Theme.of(context).textTheme.bodySmall;
    final lines = [
      address.address,
      address.neighborhood,
      if (address.city != null) '${address.city}, ${address.state ?? ''}',
      if (address.cep != null) 'CEP: ${address.cep}',
    ].whereType<String>().where((line) => line.trim().isNotEmpty);

    if (lines.isEmpty) return const SizedBox.shrink();

    return Padding(
      padding: const EdgeInsets.only(bottom: 8),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Endereço:',
            style: style?.copyWith(fontWeight: FontWeight.bold),
          ),
          for (final line in lines) Text('  $line', style: style),
        ],
      ),
    );
  }
}
