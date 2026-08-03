import 'package:flutter/material.dart';
import 'package:raraapp/models/cura.dart';
import 'package:raraapp/services/cura_service.dart';

class CuraController extends ChangeNotifier {
  List<CuraDTO> _curas = [];
  List<CuraDTO> _myCuras = [];
  CuraDTO? _selectedCura;
  bool _isLoading = false;
  String? _error;
  
  // Dashboard counters
  int _filaEsperaCount = 0;
  int _andamentoCount = 0;
  int _concluidoCount = 0;

  // Getters
  List<CuraDTO> get curas => _curas;
  List<CuraDTO> get myCuras => _myCuras;
  CuraDTO? get selectedCura => _selectedCura;
  bool get isLoading => _isLoading;
  String? get error => _error;
  
  int get filaEsperaCount => _filaEsperaCount;
  int get andamentoCount => _andamentoCount;
  int get concluidoCount => _concluidoCount;

  // ============ Patient Side ============

  /// Criar novo pedido de cura
  Future<bool> createCura({
    required String type,
    String? churchId,
    required String token,
  }) async {
    _isLoading = true;
    _error = null;
    notifyListeners();

    try {
      final newCura = await CuraService.createCura(
        type: type,
        churchId: churchId,
        token: token,
      );
      _myCuras.add(newCura);
      _isLoading = false;
      notifyListeners();
      return true;
    } catch (e) {
      _error = e.toString();
      _isLoading = false;
      notifyListeners();
      return false;
    }
  }

  /// Carregar meus pedidos de cura
  Future<bool> loadMyCura({required String token}) async {
    _isLoading = true;
    _error = null;
    notifyListeners();

    try {
      _myCuras = await CuraService.getMyCura(token: token);
      _isLoading = false;
      notifyListeners();
      return true;
    } catch (e) {
      _error = e.toString();
      _isLoading = false;
      notifyListeners();
      return false;
    }
  }

  // ============ Manager/Admin Side ============

  /// Carregar todos os pedidos de cura (com filtros)
  Future<bool> loadAllCura({
    String? status,
    String? type,
    required String token,
  }) async {
    _isLoading = true;
    _error = null;
    notifyListeners();

    try {
      _curas = await CuraService.getAllCura(
        status: status,
        type: type,
        token: token,
      );
      _isLoading = false;
      notifyListeners();
      return true;
    } catch (e) {
      _error = e.toString();
      _isLoading = false;
      notifyListeners();
      return false;
    }
  }

  /// Carregar pedido de cura por ID
  Future<bool> loadCuraById({
    required String curaId,
    required String token,
  }) async {
    _isLoading = true;
    _error = null;
    notifyListeners();

    try {
      final cura = await CuraService.getCuraById(curaId, token: token);
      _selectedCura = cura;
      _isLoading = false;
      notifyListeners();
      return true;
    } catch (e) {
      _error = e.toString();
      _isLoading = false;
      notifyListeners();
      return false;
    }
  }

  /// Selecionar pedido da lista
  void selectCura(CuraDTO cura) {
    _selectedCura = cura;
    notifyListeners();
  }

  /// Limpar seleção
  void clearSelection() {
    _selectedCura = null;
    notifyListeners();
  }

  /// Atualizar pedido (type, notes, assignedTo)
  Future<bool> updateCura({
    required String curaId,
    required Map<String, dynamic> data,
    required String token,
  }) async {
    _isLoading = true;
    _error = null;
    notifyListeners();

    try {
      final updatedCura = await CuraService.updateCura(
        curaId,
        data: data,
        token: token,
      );
      final index = _curas.indexWhere((c) => c.id == curaId);
      if (index != -1) {
        _curas[index] = updatedCura;
      }

      final myIndex = _myCuras.indexWhere((c) => c.id == curaId);
      if (myIndex != -1) {
        _myCuras[myIndex] = updatedCura;
      }

      if (_selectedCura?.id == curaId) {
        _selectedCura = updatedCura;
      }

      _isLoading = false;
      notifyListeners();
      return true;
    } catch (e) {
      _error = e.toString();
      _isLoading = false;
      notifyListeners();
      return false;
    }
  }

  /// Atualizar status (kanban drag-and-drop)
  Future<bool> updateStatus({
    required String curaId,
    required String status,
    required String token,
  }) async {
    _isLoading = true;
    _error = null;
    notifyListeners();

    try {
      final updatedCura = await CuraService.updateStatus(
        curaId,
        status: status,
        token: token,
      );
      final index = _curas.indexWhere((c) => c.id == curaId);
      if (index != -1) {
        _curas[index] = updatedCura;
      }

      final myIndex = _myCuras.indexWhere((c) => c.id == curaId);
      if (myIndex != -1) {
        _myCuras[myIndex] = updatedCura;
      }

      if (_selectedCura?.id == curaId) {
        _selectedCura = updatedCura;
      }

      _isLoading = false;
      notifyListeners();
      return true;
    } catch (e) {
      _error = e.toString();
      _isLoading = false;
      notifyListeners();
      return false;
    }
  }

  /// Deletar pedido
  Future<bool> deleteCura({
    required String curaId,
    required String token,
  }) async {
    _isLoading = true;
    _error = null;
    notifyListeners();

    try {
      await CuraService.deleteCura(curaId, token: token);
      _curas.removeWhere((c) => c.id == curaId);
      _myCuras.removeWhere((c) => c.id == curaId);
      if (_selectedCura?.id == curaId) {
        _selectedCura = null;
      }
      _isLoading = false;
      notifyListeners();
      return true;
    } catch (e) {
      _error = e.toString();
      _isLoading = false;
      notifyListeners();
      return false;
    }
  }

  /// Carregar contadores do dashboard
  Future<bool> loadSummary({required String token}) async {
    _isLoading = true;
    _error = null;
    notifyListeners();

    try {
      final summary = await CuraService.getSummary(token: token);
      _filaEsperaCount = summary['fila_espera'] ?? 0;
      _andamentoCount = summary['andamento'] ?? 0;
      _concluidoCount = summary['concluido'] ?? 0;
      _isLoading = false;
      notifyListeners();
      return true;
    } catch (e) {
      _error = e.toString();
      _isLoading = false;
      notifyListeners();
      return false;
    }
  }

  // ============ Helpers ============

  /// Encontrar pedido na lista por ID
  CuraDTO? findCuraById(String curaId) {
    try {
      return _curas.firstWhere((c) => c.id == curaId);
    } catch (e) {
      return null;
    }
  }

  /// Filtrar pedidos por status
  List<CuraDTO> getCurasByStatus(String status) {
    return _curas.where((c) => c.status == status).toList();
  }

  /// Filtrar pedidos por tipo
  List<CuraDTO> getCurasByType(String type) {
    return _curas.where((c) => c.type == type).toList();
  }
}
