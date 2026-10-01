import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:raraapp/api/address.dart';
import 'package:raraapp/api/cep_api.dart';
import 'package:raraapp/components/shared/custom_text_field.dart';
import 'package:raraapp/components/shared/info_line.dart';

/// Guarda os TextEditingControllers de um endereço.
/// Crie no State do formulário e chame [dispose] no dispose dele.
class AddressForm {
  final TextEditingController street;
  final TextEditingController number;
  final TextEditingController complement;
  final TextEditingController cep;
  final TextEditingController neighborhood;
  final TextEditingController city;
  final TextEditingController state;
  final TextEditingController country;

  AddressForm([Address? address])
    : street = TextEditingController(text: address?.address),
      number = TextEditingController(text: address?.number),
      complement = TextEditingController(text: address?.complement),
      cep = TextEditingController(text: address?.cep),
      neighborhood = TextEditingController(text: address?.neighborhood),
      city = TextEditingController(text: address?.city),
      state = TextEditingController(text: address?.state),
      country = TextEditingController(text: address?.country);

  static String? _text(TextEditingController c) =>
      c.text.trim().isEmpty ? null : c.text.trim();

  Address toAddress() => Address(
    address: _text(street),
    number: _text(number),
    complement: _text(complement),
    cep: _text(cep),
    neighborhood: _text(neighborhood),
    city: _text(city),
    state: _text(state),
    country: _text(country),
  );

  /// Troca os valores dos campos (ex.: botão "Cancelar" de uma edição).
  void fill(Address? address) {
    street.text = address?.address ?? '';
    number.text = address?.number ?? '';
    complement.text = address?.complement ?? '';
    cep.text = address?.cep ?? '';
    neighborhood.text = address?.neighborhood ?? '';
    city.text = address?.city ?? '';
    state.text = address?.state ?? '';
    country.text = address?.country ?? '';
  }

  void clear() => fill(null);

  void dispose() {
    for (final c in [
      street,
      number,
      complement,
      cep,
      neighborhood,
      city,
      state,
      country,
    ]) {
      c.dispose();
    }
  }
}

/// Campos de endereço com o CEP primeiro: ao completar os 8 dígitos, busca
/// o endereço (ViaCEP) e preenche Rua, Bairro, Cidade, Estado e País.
class AddressFields extends StatefulWidget {
  final AddressForm form;
  final bool showCountry;

  /// Some com o título quando a tela já tem o seu (ex.: seção do cadastro).
  final bool showTitle;

  const AddressFields({
    super.key,
    required this.form,
    this.showCountry = true,
    this.showTitle = true,
  });

  @override
  State<AddressFields> createState() => _AddressFieldsState();
}

class _AddressFieldsState extends State<AddressFields> {
  bool _searching = false;
  String? _message;

  /// Último CEP buscado, para não repetir a busca a cada rebuild/edição.
  String? _lastLookup;

  /// Só a busca mais recente pode mexer na tela (o CEP pode mudar no meio).
  int _request = 0;

  Future<void> _onCepChanged(String value) async {
    final code = CepApi.digits(value);
    if (code.length != 8) {
      _request++;
      _lastLookup = null;
      if (_message != null || _searching) {
        setState(() {
          _message = null;
          _searching = false;
        });
      }
      return;
    }
    if (code == _lastLookup) return;
    _lastLookup = code;
    final request = ++_request;

    setState(() {
      _searching = true;
      _message = null;
    });
    String? message;
    try {
      final found = await CepApi.lookup(code);
      if (!mounted || request != _request) return;
      if (found == null) {
        message = 'CEP não encontrado. Preencha o endereço abaixo.';
      } else {
        _fill(found);
      }
    } on CepException catch (e) {
      message = '${e.message}. Preencha o endereço abaixo.';
    }
    if (!mounted || request != _request) return;
    setState(() {
      _searching = false;
      _message = message;
    });
  }

  /// Preenche o que o CEP trouxe. CEP de cidade inteira (sem rua/bairro)
  /// não apaga o que a pessoa já digitou nesses campos.
  void _fill(Address found) {
    final form = widget.form;
    void set(TextEditingController c, String? value) {
      if (value != null) c.text = value;
    }

    set(form.street, found.address);
    set(form.neighborhood, found.neighborhood);
    set(form.city, found.city);
    set(form.state, found.state);
    set(form.country, found.country);
  }

  @override
  Widget build(BuildContext context) {
    final form = widget.form;
    final scheme = Theme.of(context).colorScheme;

    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      spacing: 16,
      children: [
        if (widget.showTitle)
          Text('Endereço', style: Theme.of(context).textTheme.titleSmall),
        TextFormField(
          controller: form.cep,
          keyboardType: TextInputType.number,
          inputFormatters: [CepInputFormatter()],
          onChanged: _onCepChanged,
          decoration: InputDecoration(
            labelText: 'CEP',
            hintText: '00000-000',
            helperText: _message == null
                ? 'Digite o CEP para preencher o endereço'
                : null,
            errorText: _message,
            errorMaxLines: 2,
            prefixIcon: const Icon(Icons.local_post_office_outlined),
            suffixIcon: _searching
                ? Padding(
                    padding: const EdgeInsets.all(14),
                    child: SizedBox.square(
                      dimension: 20,
                      child: CircularProgressIndicator(
                        strokeWidth: 2,
                        color: scheme.primary,
                      ),
                    ),
                  )
                : null,
          ),
        ),
        CustomTextField(label: 'Rua', controller: form.street),
        CustomTextField(
          label: 'Nº',
          controller: form.number,
          keyboardType: TextInputType.streetAddress,
          hintText: 'Ex.: 123 ou S/N',
        ),
        CustomTextField(
          label: 'Complemento',
          controller: form.complement,
          hintText: 'Ex.: Apto 12, Bloco B, Fundos',
        ),
        CustomTextField(label: 'Bairro', controller: form.neighborhood),
        CustomTextField(label: 'Cidade', controller: form.city),
        CustomTextField(label: 'Estado', controller: form.state),
        if (widget.showCountry)
          CustomTextField(label: 'País', controller: form.country),
      ],
    );
  }
}

/// Máscara 00000-000.
class CepInputFormatter extends TextInputFormatter {
  @override
  TextEditingValue formatEditUpdate(
    TextEditingValue oldValue,
    TextEditingValue newValue,
  ) {
    var digits = CepApi.digits(newValue.text);
    if (digits.length > 8) digits = digits.substring(0, 8);
    final text = digits.length > 5
        ? '${digits.substring(0, 5)}-${digits.substring(5)}'
        : digits;
    return TextEditingValue(
      text: text,
      selection: TextSelection.collapsed(offset: text.length),
    );
  }
}

/// Endereço em texto (uma linha com ícone), para cards.
class AddressText extends StatelessWidget {
  final Address address;

  const AddressText(this.address, {super.key});

  @override
  Widget build(BuildContext context) {
    final text = address.oneLine;
    if (text.isEmpty) return const SizedBox.shrink();
    return InfoLine(null, text, icon: Icons.place_outlined);
  }
}
