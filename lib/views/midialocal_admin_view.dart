import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:raraapp/controllers/user_controller.dart';
import 'package:raraapp/controllers/midialocal_controller.dart';
import 'package:raraapp/models/midialocal.dart';

class MidiaLocalAdminView extends StatefulWidget {
  const MidiaLocalAdminView({super.key});

  @override
  State<MidiaLocalAdminView> createState() => _MidiaLocalAdminViewState();
}

class _MidiaLocalAdminViewState extends State<MidiaLocalAdminView> {
  @override
  void initState() {
    super.initState();
    _loadMidias();
  }

  void _loadMidias() {
    WidgetsBinding.instance.addPostFrameCallback((_) {
      final userController = context.read<UserController>();
      final midiaController = context.read<MidiaLocalController>();

      if (userController.currentUser?.accessToken != null) {
        midiaController.loadAllMidiasLocais(
          token: userController.currentUser!.accessToken!,
        );
      }
    });
  }

  void _showFormDialog({MidiaLocalDTO? midia}) {
    showDialog(
      context: context,
      builder: (context) => MidiaLocalFormDialog(
        midia: midia,
        onSave: (formData) {
          final userController = context.read<UserController>();
          final midiaController = context.read<MidiaLocalController>();
          final token = userController.currentUser?.accessToken;

          if (token == null) return;

          if (midia == null) {
            // Criar novo
            midiaController.createMidiaLocal(
              date: formData['date'],
              time: formData['time'],
              title: formData['title'],
              text: formData['text'],
              churchId: userController.currentUser?.churchId ?? '',
              image: formData['image'],
              token: token,
            );
          } else {
            // Editar existente
            midiaController.updateMidiaLocal(
              midiaLocalId: midia.id!,
              data: formData,
              token: token,
            );
          }
        },
      ),
    );
  }

  void _deleteMidia(MidiaLocalDTO midia) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Deletar Mídia'),
        content: Text('Tem certeza que deseja deletar "${midia.title}"?'),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('Cancelar'),
          ),
          TextButton(
            onPressed: () {
              final userController = context.read<UserController>();
              final midiaController = context.read<MidiaLocalController>();
              final token = userController.currentUser?.accessToken;

              if (token != null) {
                midiaController.deleteMidiaLocal(
                  midiaLocalId: midia.id!,
                  token: token,
                );
                Navigator.pop(context);
                ScaffoldMessenger.of(context).showSnackBar(
                  const SnackBar(content: Text('Mídia deletada com sucesso')),
                );
              }
            },
            child: const Text('Deletar', style: TextStyle(color: Colors.red)),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Consumer<MidiaLocalController>(
      builder: (context, midiaController, _) {
        return Scaffold(
          floatingActionButton: FloatingActionButton(
            onPressed: () => _showFormDialog(),
            child: const Icon(Icons.add),
          ),
          body: midiaController.isLoading
              ? const Center(child: CircularProgressIndicator())
              : midiaController.midiasLocais.isEmpty
                  ? Center(
                      child: Column(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          const Icon(Icons.image, size: 64, color: Colors.grey),
                          const SizedBox(height: 16),
                          const Text('Nenhuma mídia encontrada'),
                          const SizedBox(height: 16),
                          ElevatedButton.icon(
                            onPressed: () => _showFormDialog(),
                            icon: const Icon(Icons.add),
                            label: const Text('Criar Mídia'),
                          ),
                        ],
                      ),
                    )
                  : SingleChildScrollView(
                      padding: const EdgeInsets.all(16),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            'Mídias Locais (${midiaController.midiasLocais.length})',
                            style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                          const SizedBox(height: 16),
                          ListView.builder(
                            shrinkWrap: true,
                            physics: const NeverScrollableScrollPhysics(),
                            itemCount: midiaController.midiasLocais.length,
                            itemBuilder: (context, index) {
                              final midia = midiaController.midiasLocais[index];
                              return Card(
                                margin: const EdgeInsets.only(bottom: 12),
                                child: Padding(
                                  padding: const EdgeInsets.all(16),
                                  child: Column(
                                    crossAxisAlignment: CrossAxisAlignment.start,
                                    children: [
                                      Row(
                                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                        children: [
                                          Expanded(
                                            child: Text(
                                              midia.title ?? 'Sem título',
                                              style: Theme.of(context).textTheme.titleMedium?.copyWith(
                                                fontWeight: FontWeight.bold,
                                              ),
                                            ),
                                          ),
                                          PopupMenuButton(
                                            itemBuilder: (context) => [
                                              PopupMenuItem(
                                                child: const Text('Editar'),
                                                onTap: () => _showFormDialog(midia: midia),
                                              ),
                                              PopupMenuItem(
                                                child: const Text('Deletar'),
                                                onTap: () => _deleteMidia(midia),
                                              ),
                                            ],
                                          ),
                                        ],
                                      ),
                                      const SizedBox(height: 12),
                                      if (midia.date != null)
                                        Padding(
                                          padding: const EdgeInsets.only(bottom: 8),
                                          child: Text(
                                            'Data: ${midia.date}',
                                            style: Theme.of(context).textTheme.bodySmall,
                                          ),
                                        ),
                                      if (midia.time != null && midia.time!.isNotEmpty)
                                        Padding(
                                          padding: const EdgeInsets.only(bottom: 8),
                                          child: Text(
                                            'Hora: ${midia.time}',
                                            style: Theme.of(context).textTheme.bodySmall,
                                          ),
                                        ),
                                      if (midia.text != null && midia.text!.isNotEmpty)
                                        Padding(
                                          padding: const EdgeInsets.only(bottom: 8),
                                          child: Text(
                                            midia.text!,
                                            style: Theme.of(context).textTheme.bodySmall,
                                          ),
                                        ),
                                    ],
                                  ),
                                ),
                              );
                            },
                          ),
                        ],
                      ),
                    ),
        );
      },
    );
  }
}

/// Dialog para criar/editar mídias locais
class MidiaLocalFormDialog extends StatefulWidget {
  final MidiaLocalDTO? midia;
  final Function(Map<String, dynamic>) onSave;

  const MidiaLocalFormDialog({
    this.midia,
    required this.onSave,
  });

  @override
  State<MidiaLocalFormDialog> createState() => _MidiaLocalFormDialogState();
}

class _MidiaLocalFormDialogState extends State<MidiaLocalFormDialog> {
  late TextEditingController _titleController;
  late TextEditingController _textController;
  late TextEditingController _timeController;
  late TextEditingController _imageController;
  late DateTime _selectedDate;
  final _formKey = GlobalKey<FormState>();

  @override
  void initState() {
    super.initState();
    _initializeControllers();
  }

  void _initializeControllers() {
    final midia = widget.midia;
    _titleController = TextEditingController(text: midia?.title ?? '');
    _textController = TextEditingController(text: midia?.text ?? '');
    _timeController = TextEditingController(text: midia?.time ?? '');
    _imageController = TextEditingController(text: midia?.image ?? '');
    _selectedDate = midia?.date ?? DateTime.now();
  }

  @override
  void dispose() {
    _titleController.dispose();
    _textController.dispose();
    _timeController.dispose();
    _imageController.dispose();
    super.dispose();
  }

  Future<void> _selectDate(BuildContext context) async {
    final DateTime? picked = await showDatePicker(
      context: context,
      initialDate: _selectedDate,
      firstDate: DateTime(2000),
      lastDate: DateTime(2100),
    );
    if (picked != null && picked != _selectedDate) {
      setState(() {
        _selectedDate = picked;
      });
    }
  }

  void _saveForm() {
    if (!_formKey.currentState!.validate()) return;

    final formData = {
      'date': _selectedDate,
      'time': _timeController.text.isEmpty ? null : _timeController.text,
      'title': _titleController.text,
      'text': _textController.text.isEmpty ? null : _textController.text,
      'image': _imageController.text.isEmpty ? null : _imageController.text,
    };

    widget.onSave(formData);
    Navigator.pop(context);

    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(
          widget.midia == null ? 'Mídia criada com sucesso' : 'Mídia atualizada com sucesso',
        ),
        backgroundColor: Colors.green,
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Dialog(
      child: SingleChildScrollView(
        padding: const EdgeInsets.all(24),
        child: Form(
          key: _formKey,
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              Text(
                widget.midia == null ? 'Nova Mídia Local' : 'Editar Mídia Local',
                style: Theme.of(context).textTheme.titleLarge?.copyWith(
                  fontWeight: FontWeight.bold,
                ),
              ),
              const SizedBox(height: 24),

              // Data
              GestureDetector(
                onTap: () => _selectDate(context),
                child: Container(
                  padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 16),
                  decoration: BoxDecoration(
                    border: Border.all(color: Colors.grey),
                    borderRadius: BorderRadius.circular(8),
                  ),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text(
                        'Data: ${_selectedDate.toLocal().toString().split(' ')[0]}',
                      ),
                      const Icon(Icons.calendar_today),
                    ],
                  ),
                ),
              ),
              const SizedBox(height: 16),

              // Hora
              TextFormField(
                controller: _timeController,
                decoration: InputDecoration(
                  labelText: 'Hora',
                  border: OutlineInputBorder(borderRadius: BorderRadius.circular(8)),
                  hintText: '14:30',
                ),
              ),
              const SizedBox(height: 16),

              // Título
              TextFormField(
                controller: _titleController,
                decoration: InputDecoration(
                  labelText: 'Título',
                  border: OutlineInputBorder(borderRadius: BorderRadius.circular(8)),
                ),
                validator: (value) => value?.isEmpty ?? true ? 'Título é obrigatório' : null,
              ),
              const SizedBox(height: 16),

              // Texto/Descrição
              TextFormField(
                controller: _textController,
                decoration: InputDecoration(
                  labelText: 'Descrição',
                  border: OutlineInputBorder(borderRadius: BorderRadius.circular(8)),
                ),
                maxLines: 4,
              ),
              const SizedBox(height: 16),

              // Imagem
              TextFormField(
                controller: _imageController,
                decoration: InputDecoration(
                  labelText: 'URL da Imagem',
                  border: OutlineInputBorder(borderRadius: BorderRadius.circular(8)),
                  hintText: 'https://...',
                ),
              ),
              const SizedBox(height: 24),

              // Botões
              Row(
                mainAxisAlignment: MainAxisAlignment.end,
                children: [
                  TextButton(
                    onPressed: () => Navigator.pop(context),
                    child: const Text('Cancelar'),
                  ),
                  const SizedBox(width: 12),
                  ElevatedButton(
                    onPressed: _saveForm,
                    child: Text(widget.midia == null ? 'Criar' : 'Atualizar'),
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }
}
