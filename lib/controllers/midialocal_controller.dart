import 'package:flutter/material.dart';
import 'package:raraapp/models/midialocal.dart';
import 'package:raraapp/models/user.dart';
import 'package:raraapp/services/midialocal_service.dart';

class MidiaLocalController extends ChangeNotifier {
  UserDTO? _currentUser;
  List<MidiaLocalDTO> _midiasLocais = [];
  MidiaLocalDTO? _selectedMidiaLocal;
  bool _isLoading = false;
  String? _error;

  // Getters
  UserDTO? get currentUser => _currentUser;
  List<MidiaLocalDTO> get midiasLocais => _midiasLocais;
  MidiaLocalDTO? get selectedMidiaLocal => _selectedMidiaLocal;
  bool get isLoading => _isLoading;
  String? get error => _error;

  // ============ Públicas ============

  /// Criar nova mídia local
  Future<bool> createMidiaLocal({
    required DateTime date,
    required String time,
    required String title,
    required String text,
    required String churchId,
    required String image,
    required String token,
  }) async {
    _isLoading = true;
    _error = null;
    notifyListeners();

    try {
      final newMidiaLocal = await MidiaLocalService.createMidiaLocal(
        date: date,
        time: time,
        title: title,
        text: text,
        churchId: churchId,
        image: image,
        token: token,
      );
      _midiasLocais.add(newMidiaLocal);
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

  /// Carregar todas as mídias locais
  Future<bool> loadAllMidiasLocais({required String token}) async {
    _isLoading = true;
    _error = null;
    notifyListeners();

    try {
      _midiasLocais = await MidiaLocalService.getAllMidiasLocais(token: token);
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

  /// Carregar mídia local por ID
  Future<bool> loadMidiaLocalById({required String midiaLocalId, required String token}) async {
    _isLoading = true;
    _error = null;
    notifyListeners();

    try {
      final midiaLocal = await MidiaLocalService.getMidiaLocalById(
        midiaLocalId,
        token: token,
      );
      _selectedMidiaLocal = midiaLocal;
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

  /// Atualizar mídia local por ID
  Future<bool> updateMidiaLocal({
    required String midiaLocalId,
    required Map<String, dynamic> data,
    required String token,
  }) async {
    _isLoading = true;
    _error = null;
    notifyListeners();

    try {
      final updatedMidiaLocal = await MidiaLocalService.updateMidiaLocal(
        midiaLocalId,
        data: data,
        token: token,
      );
      final index = _midiasLocais.indexWhere((m) => m.id == midiaLocalId);
      if (index != -1) {
        _midiasLocais[index] = updatedMidiaLocal;
      }
      if (_selectedMidiaLocal?.id == midiaLocalId) {
        _selectedMidiaLocal = updatedMidiaLocal;
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

  /// Deletar mídia local por ID
  Future<bool> deleteMidiaLocal({
    required String midiaLocalId,
    required String token,
  }) async {
    _isLoading = true;
    _error = null;
    notifyListeners();
    try {
      await MidiaLocalService.deleteMidiaLocal(
        midiaLocalId,
        token: token,
      );
      _midiasLocais.removeWhere((m) => m.id == midiaLocalId);
      if (_selectedMidiaLocal?.id == midiaLocalId) {
        _selectedMidiaLocal = null;
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
}