import 'package:flutter/material.dart';
import 'package:raraapp/models/christian_group.dart';
import 'package:raraapp/services/christian_group_service.dart';

class ChristianGroupController extends ChangeNotifier {
  List<ChristianGroupDTO> _groups = [];
  ChristianGroupDTO? _selectedGroup;
  bool _isLoading = false;
  String? _error;

  // Getters
  List<ChristianGroupDTO> get groups => _groups;
  ChristianGroupDTO? get selectedGroup => _selectedGroup;
  bool get isLoading => _isLoading;
  String? get error => _error;

  // ============ Protected ============

  /// Carregar todos os grupos cristãos
  Future<bool> loadAllChristianGroups({required String token}) async {
    _isLoading = true;
    _error = null;
    notifyListeners();

    try {
      _groups = await ChristianGroupService.getAllChristianGroups(
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

  /// Carregar grupo cristão por ID
  Future<bool> loadChristianGroupById({
    required String groupId,
    required String token,
  }) async {
    _isLoading = true;
    _error = null;
    notifyListeners();

    try {
      final group = await ChristianGroupService.getChristianGroupById(
        groupId,
        token: token,
      );
      _selectedGroup = group;
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

  /// Selecionar grupo da lista
  void selectGroup(ChristianGroupDTO group) {
    _selectedGroup = group;
    notifyListeners();
  }

  /// Limpar seleção
  void clearSelection() {
    _selectedGroup = null;
    notifyListeners();
  }

  /// Criar novo grupo cristão
  Future<bool> createChristianGroup({
    required String name,
    Map<String, dynamic>? address,
    String? leader,
    String? coleader,
    String? host,
    List<String>? contact,
    String? churchId,
    required String token,
  }) async {
    _isLoading = true;
    _error = null;
    notifyListeners();

    try {
      final newGroup = await ChristianGroupService.createChristianGroup(
        name: name,
        address: address,
        leader: leader,
        coleader: coleader,
        host: host,
        contact: contact,
        churchId: churchId,
        token: token,
      );
      _groups.add(newGroup);
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

  /// Atualizar grupo cristão
  Future<bool> updateChristianGroup({
    required String groupId,
    required Map<String, dynamic> data,
    required String token,
  }) async {
    _isLoading = true;
    _error = null;
    notifyListeners();

    try {
      final updatedGroup = await ChristianGroupService.updateChristianGroup(
        groupId,
        data: data,
        token: token,
      );
      final index = _groups.indexWhere((g) => g.id == groupId);
      if (index != -1) {
        _groups[index] = updatedGroup;
      }
      if (_selectedGroup?.id == groupId) {
        _selectedGroup = updatedGroup;
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

  /// Deletar grupo cristão
  Future<bool> deleteChristianGroup({
    required String groupId,
    required String token,
  }) async {
    _isLoading = true;
    _error = null;
    notifyListeners();

    try {
      await ChristianGroupService.deleteChristianGroup(
        groupId,
        token: token,
      );
      _groups.removeWhere((g) => g.id == groupId);
      if (_selectedGroup?.id == groupId) {
        _selectedGroup = null;
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

  // ============ Helpers ============

  /// Encontrar grupo na lista por ID
  ChristianGroupDTO? findGroupById(String groupId) {
    try {
      return _groups.firstWhere((g) => g.id == groupId);
    } catch (e) {
      return null;
    }
  }

  /// Filtrar grupos por chiesa
  List<ChristianGroupDTO> getGroupsByChurch(String churchId) {
    return _groups.where((g) => g.churchId == churchId).toList();
  }

  /// Filtrar grupos por líder
  List<ChristianGroupDTO> getGroupsByLeader(String leaderId) {
    return _groups.where((g) => g.leader == leaderId).toList();
  }
}
