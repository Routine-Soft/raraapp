import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'dart:convert';
import 'package:raraapp/models/user.dart';
import 'package:raraapp/services/user_service.dart';

class UserController extends ChangeNotifier {
  UserDTO? _currentUser;
  List<UserDTO> _allUsers = [];
  bool _isLoading = false;
  String? _error;

  // Getters
  UserDTO? get currentUser => _currentUser;
  List<UserDTO> get allUsers => _allUsers;
  bool get isLoading => _isLoading;
  String? get error => _error;
  bool get isAuthenticated => _currentUser != null;

  // ============ Storage (Persistência) ============

  /// Salvar usuário no storage
  Future<void> saveUserToStorage(UserDTO user) async {
    try {
      final prefs = await SharedPreferences.getInstance();
      final userJson = jsonEncode(user.toJson());
      await prefs.setString('user_data', userJson);
    } catch (e) {
      print('Erro ao salvar usuário no storage: $e');
    }
  }

  /// Carregar usuário do storage
  Future<bool> loadUserFromStorage() async {
    try {
      final prefs = await SharedPreferences.getInstance();
      final userJson = prefs.getString('user_data');
      
      if (userJson != null) {
        final userMap = jsonDecode(userJson) as Map<String, dynamic>;
        _currentUser = UserDTO.fromJson(userMap);
        notifyListeners();
        return true;
      }
      return false;
    } catch (e) {
      print('Erro ao carregar usuário do storage: $e');
      return false;
    }
  }

  /// Limpar dados de login do storage
  Future<void> clearUserStorage() async {
    try {
      final prefs = await SharedPreferences.getInstance();
      await prefs.remove('user_data');
    } catch (e) {
      print('Erro ao limpar storage: $e');
    }
  }

  // ============ Autenticação ============

  /// Login com email e senha
  Future<bool> login({
    required String email,
    required String password,
  }) async {
    _isLoading = true;
    _error = null;
    notifyListeners();

    try {
      final user = await UserService.login(
        email: email,
        password: password,
      );
      _currentUser = user;
      
      // Salvar dados no storage
      await saveUserToStorage(user);
      
      _isLoading = false;
      notifyListeners();
      return true;
    } catch (e) {
      if (e is Exception) {
        _error = e.toString();
      } else {
        _error = 'Erro ao fazer login';
      }
      _isLoading = false;
      notifyListeners();
      return false;
    }
  }

  /// Register com dados completos
  Future<bool> register({
    required String name,
    required String email,
    required String password,
    String? phone,
    String? gender,
    DateTime? birthdate,
    String? churchId,
    AddressDTO? address,
    String? invitationofgrace,
    String? status,
    bool? baptized,
    bool? member,
  }) async {
    _isLoading = true;
    _error = null;
    notifyListeners();

    try {
      final user = await UserService.register(
        name: name,
        email: email,
        password: password,
        phone: phone,
        gender: gender,
        birthdate: birthdate,
        churchId: churchId,
        address: address,
        invitationofgrace: invitationofgrace,
        status: status,
        baptized: baptized,
        member: member,
      );
      _currentUser = user;
      _isLoading = false;
      notifyListeners();
      return true;
    } catch (e) {
      if (e is Exception) {
        _error = e.toString();
      } else {
        _error = 'Erro ao registrar';
      }
      _isLoading = false;
      notifyListeners();
      return false;
    }
  }

  /// Refresh token
  Future<bool> refreshTokenMethod(String refreshToken) async {
    try {
      final newAccessToken = await UserService.refreshToken(refreshToken);
      if (_currentUser != null) {
        _currentUser = _currentUser!.copyWith(
          accessToken: newAccessToken,
        );
        notifyListeners();
      }
      return true;
    } catch (e) {
      _error = e.toString();
      notifyListeners();
      return false;
    }
  }

  /// Logout
  Future<bool> logout({String? token}) async {
    _isLoading = true;
    _error = null;
    notifyListeners();

    try {
      if (_currentUser?.id != null && token != null) {
        await UserService.logout(
          userId: _currentUser!.id!,
          token: token,
        );
      }
      _currentUser = null;
      _allUsers = [];
      
      // Limpar dados do storage
      await clearUserStorage();
      
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

  // ============ Usuários (GET/UPDATE) ============

  /// Buscar todos os usuários
  Future<bool> loadAllUsers({required String token}) async {
    _isLoading = true;
    _error = null;
    notifyListeners();

    try {
      _allUsers = await UserService.getAllUsers(token: token);
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

  /// Buscar usuário por ID
  Future<bool> loadUserById({
    required String userId,
    required String token,
  }) async {
    _isLoading = true;
    _error = null;
    notifyListeners();

    try {
      final user = await UserService.getUserById(userId, token: token);
      _currentUser = user;
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

  /// Atualizar usuário
  Future<bool> updateUser({
    required String userId,
    required Map<String, dynamic> data,
    required String token,
  }) async {
    _isLoading = true;
    _error = null;
    notifyListeners();

    try {
      final user = await UserService.updateUser(
        userId,
        data: data,
        token: token,
      );
      _currentUser = user;

      // Atualiza na lista de usuários também
      final index = _allUsers.indexWhere((u) => u.id == userId);
      if (index != -1) {
        _allUsers[index] = user;
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

  /// Deletar usuário
  Future<bool> deleteUser({
    required String userId,
    required String token,
  }) async {
    _isLoading = true;
    _error = null;
    notifyListeners();

    try {
      await UserService.deleteUser(userId, token: token);
      
      // Remove da lista
      _allUsers.removeWhere((u) => u.id == userId);
      
      // Se é o usuário atual, limpa
      if (_currentUser?.id == userId) {
        _currentUser = null;
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

  // ============ Senha ============

  /// Atualizar senha
  Future<bool> updatePassword({
    required String userId,
    required String currentPassword,
    required String newPassword,
    required String token,
  }) async {
    _isLoading = true;
    _error = null;
    notifyListeners();

    try {
      await UserService.updatePassword(
        userId,
        currentPassword: currentPassword,
        newPassword: newPassword,
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

  // ============ Facilitadores (admin) ============

  /// Criar facilitador (admin only)
  Future<bool> createFacilitator({
    required String name,
    required String phone,
    required String email,
    String? gender,
    DateTime? birthdate,
    String? churchId,
    AddressDTO? address,
    String? invitationofgrace,
    String? status,
    bool? baptized,
    bool? member,
    required String token,
  }) async {
    _isLoading = true;
    _error = null;
    notifyListeners();

    try {
      final user = await UserService.createFacilitatorUser(
        name: name,
        phone: phone,
        email: email,
        gender: gender,
        birthdate: birthdate,
        churchId: churchId,
        address: address,
        invitationofgrace: invitationofgrace,
        status: status,
        baptized: baptized,
        member: member,
        token: token,
      );
      
      // Adiciona à lista
      _allUsers.add(user);
      
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

  /// Atualizar facilitador (admin only)
  Future<bool> updateFacilitator({
    required String userId,
    required bool facilitator,
    required String token,
  }) async {
    _isLoading = true;
    _error = null;
    notifyListeners();

    try {
      final user = await UserService.updateFacilitatorUser(
        userId,
        facilitator: facilitator,
        token: token,
      );
      
      if (_currentUser?.id == userId) {
        _currentUser = user;
      }
      
      final index = _allUsers.indexWhere((u) => u.id == userId);
      if (index != -1) {
        _allUsers[index] = user;
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

  // ============ Roles (admin) ============

  /// Atualizar roles do usuário (super_admin e pastor_local only)
  Future<bool> updateUserRoles({
    required String userId,
    required List<String> roles,
    required String token,
  }) async {
    _isLoading = true;
    _error = null;
    notifyListeners();

    try {
      final user = await UserService.updateUserRoles(
        userId,
        roles: roles,
        token: token,
      );
      
      if (_currentUser?.id == userId) {
        _currentUser = user;
      }
      
      final index = _allUsers.indexWhere((u) => u.id == userId);
      if (index != -1) {
        _allUsers[index] = user;
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

  /// Checar se user tem uma role específica
  bool hasRole(String role) {
    if (_currentUser?.roles == null) return false;
    return _currentUser!.roles!.contains(role);
  }

  /// Checar se user é super_admin
  bool isSuperAdmin() => hasRole('super_admin');

  /// Checar se user é pastor_local
  bool isPastor() => hasRole('pastor_local');

  /// Checar se user é facilitador
  bool isFacilitator() => hasRole('facilitador');
}
