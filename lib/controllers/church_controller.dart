import 'package:flutter/material.dart';
import 'package:raraapp/models/user.dart';
import 'package:raraapp/models/church.dart';
import 'package:raraapp/services/church_service.dart';

class ChurchController extends ChangeNotifier {
  List<ChurchDTO> _churches = [];
  ChurchDTO? _selectedChurch;
  bool _isLoading = false;
  String? _error;

  // Getters
  List<ChurchDTO> get churches => _churches;
  ChurchDTO? get selectedChurch => _selectedChurch;
  bool get isLoading => _isLoading;
  String? get error => _error;

  // ============ Públicas ============

  /// Carregar todas as igrejas (sem token)
  Future<bool> loadAllChurches() async {
    _isLoading = true;
    _error = null;
    notifyListeners();

    try {
      _churches = await ChurchService.getAllChurches();
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

  /// Carregar igreja por ID
  Future<bool> loadChurchById(String churchId) async {
    _isLoading = true;
    _error = null;
    notifyListeners();

    try {
      final church = await ChurchService.getChurchById(churchId);
      _selectedChurch = church;
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

  /// Selecionar uma igreja da lista
  void selectChurch(ChurchDTO church) {
    _selectedChurch = church;
    notifyListeners();
  }

  /// Limpar seleção
  void clearSelection() {
    _selectedChurch = null;
    notifyListeners();
  }

  // ============ Admin Only (super_admin) ============

  /// Criar nova igreja (super_admin only)
  Future<bool> createChurch({
    required String name,
    required String token,
    String? pastor1,
    String? pastor2,
    AddressDTO? address,
    String? cnpj,
    int? totalMembers,
  }) async {
    _isLoading = true;
    _error = null;
    notifyListeners();

    try {
      final church = await ChurchService.createChurch(
        name: name,
        token: token,
        pastor1: pastor1,
        pastor2: pastor2,
        address: address,
        cnpj: cnpj,
        totalMembers: totalMembers,
      );

      _churches.add(church);
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

  /// Update igreja (super_admin only)
  Future<bool> updateChurch(
    String churchId, {
    required Map<String, dynamic> data,
    required String token,
  }) async {
    _isLoading = true;
    _error = null;
    notifyListeners();

    try {
      final church = await ChurchService.updateChurch(
        churchId,
        data: data,
        token: token,
      );

      // Atualiza na lista
      final index = _churches.indexWhere((c) => c.id == churchId);
      if (index != -1) {
        _churches[index] = church;
      }

      // Atualiza seleção se for a mesma
      if (_selectedChurch?.id == churchId) {
        _selectedChurch = church;
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

  /// Delete igreja (super_admin only)
  Future<bool> deleteChurch(String churchId, {required String token}) async {
    _isLoading = true;
    _error = null;
    notifyListeners();

    try {
      await ChurchService.deleteChurch(churchId, token: token);

      // Remove da lista
      _churches.removeWhere((c) => c.id == churchId);

      // Limpa seleção se for a mesma
      if (_selectedChurch?.id == churchId) {
        _selectedChurch = null;
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

  // ============ Utilitários ============

  /// Limpar erro
  void clearError() {
    _error = null;
    notifyListeners();
  }

  /// Encontrar igreja por ID
  ChurchDTO? findChurchById(String churchId) {
    try {
      return _churches.firstWhere((c) => c.id == churchId);
    } catch (e) {
      return null;
    }
  }
}
