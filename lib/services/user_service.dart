import 'package:raraapp/constants/api_constants.dart';
import 'package:raraapp/models/user.dart';
import 'package:raraapp/services/api_service.dart';

class UserService {
  // ============ Autenticação ============

  /// Login com email e senha
  /// Retorna UserDTO com accessToken e refreshToken
  static Future<UserDTO> login({
    required String email,
    required String password,
  }) async {
    try {
      final response = await ApiService.post(
        ApiConstants.userLogin,
        body: {'email': email, 'password': password},
      );

      // Resposta padronizada: { success: true, data: { user, accessToken, refreshToken, ... } }
      if (response is! Map<String, dynamic>) {
        throw Exception('Resposta inválida do servidor');
      }

      if (!response.containsKey('data')) {
        throw Exception('Campo "data" não encontrado na resposta');
      }

      final data = response['data'];

      if (data is! Map<String, dynamic>) {
        throw Exception('Campo "data" não é um Map');
      }

      if (!data.containsKey('user')) {
        throw Exception('Campo "user" não encontrado em data');
      }

      if (!data.containsKey('accessToken')) {
        throw Exception('Campo "accessToken" não encontrado em data');
      }

      if (!data.containsKey('refreshToken')) {
        throw Exception('Campo "refreshToken" não encontrado em data');
      }

      final userData = data['user'];
      if (userData is! Map<String, dynamic>) {
        throw Exception('Campo "user" não é um Map');
      }

      final user = UserDTO.fromJson(userData);

      return user.copyWith(
        accessToken: data['accessToken'] as String?,
        refreshToken: data['refreshToken'] as String?,
      );
    } catch (e) {
      rethrow;
    }
  }

  /// Register com dados completos do usuário
  static Future<UserDTO> register({
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
    String? facilitador,
  }) async {
    try {
      final body = {
        'name': name,
        'email': email,
        'password': password,
        'phone': phone,
        'gender': gender,
        'birthdate': birthdate?.toIso8601String(),
        'churchId': churchId,
        'address': address?.toJson(),
        'invitationofgrace': invitationofgrace,
        'status': status,
        'baptized': baptized,
        'member': member,
        'facilitador': facilitador ?? '',
      };

      // Remove valores null
      body.removeWhere((key, value) => value == null);

      final response = await ApiService.post(
        ApiConstants.userRegister,
        body: body,
      );

      // Resposta padronizada: { success: true, data: {...} }
      return UserDTO.fromJson(response['data'] as Map<String, dynamic>);
    } catch (e) {
      rethrow;
    }
  }

  /// Refresh token
  /// Usa o refreshToken para obter um novo accessToken
  static Future<String> refreshToken(String refreshToken) async {
    try {
      final response = await ApiService.post(
        ApiConstants.userRefresh,
        body: {'refreshToken': refreshToken},
      );

      // Resposta padronizada: { success: true, data: { accessToken: "..." } }
      final data = response['data'] as Map<String, dynamic>;
      return data['accessToken'] ?? '';
    } catch (e) {
      rethrow;
    }
  }

  /// Logout (limpa o refreshToken no banco)
  static Future<void> logout({
    required String userId,
    required String token,
  }) async {
    try {
      await ApiService.post(ApiConstants.userLogout, body: {}, token: token);
    } catch (e) {
      rethrow;
    }
  }

  // ============ Usuários (GET/UPDATE) ============

  /// Get todos os usuários (requer autenticação e permissões)
  static Future<List<UserDTO>> getAllUsers({required String token}) async {
    try {
      final response = await ApiService.get(
        ApiConstants.userGetAll,
        token: token,
      );

      // Resposta padronizada: { success: true, data: [...] }
      final List<dynamic> users = response['data'] as List<dynamic>;
      return users
          .map((u) => UserDTO.fromJson(u as Map<String, dynamic>))
          .toList();
    } catch (e) {
      rethrow;
    }
  }

  /// Get usuário por ID
  static Future<UserDTO> getUserById(
    String userId, {
    required String token,
  }) async {
    try {
      final response = await ApiService.get(
        ApiConstants.userGetById.replaceFirst(':id', userId),
        token: token,
      );

      // Resposta padronizada: { success: true, data: {...} }
      return UserDTO.fromJson(response['data'] as Map<String, dynamic>);
    } catch (e) {
      rethrow;
    }
  }

  /// Update usuário
  static Future<UserDTO> updateUser(
    String userId, {
    required Map<String, dynamic> data,
    required String token,
  }) async {
    try {
      final response = await ApiService.patch(
        ApiConstants.userUpdate.replaceFirst(':id', userId),
        body: data,
        token: token,
      );

      // Resposta padronizada: { success: true, data: {...} }
      return UserDTO.fromJson(response['data'] as Map<String, dynamic>);
    } catch (e) {
      rethrow;
    }
  }

  /// Delete usuário
  static Future<void> deleteUser(String userId, {required String token}) async {
    try {
      await ApiService.delete(
        ApiConstants.userDelete.replaceFirst(':id', userId),
        token: token,
      );
    } catch (e) {
      rethrow;
    }
  }

  // ============ Senha ============

  /// Update password
  static Future<void> updatePassword(
    String userId, {
    required String currentPassword,
    required String newPassword,
    required String token,
  }) async {
    try {
      await ApiService.post(
        ApiConstants.userUpdatePassword.replaceFirst(':id', userId),
        body: {'currentPassword': currentPassword, 'newPassword': newPassword},
        token: token,
      );
    } catch (e) {
      rethrow;
    }
  }

  // ============ Facilitadores (admin) ============

  /// Create facilitador (admin only)
  static Future<UserDTO> createFacilitatorUser({
    required String name,
    required String phone,
    required String email,
    String? gender,
    DateTime? birthdate,
    String? churchId,
    AddressDTO? address,
    String? invitationofgrace,
    String? status,
    String? facilitador,
    bool? baptized,
    bool? member,
    required String token,
  }) async {
    try {
      final body = {
        'name': name,
        'phone': phone,
        'email': email,
        'gender': gender,
        'birthdate': birthdate?.toIso8601String(),
        'churchId': churchId,
        'address': address?.toJson(),
        'invitationofgrace': invitationofgrace,
        'status': status,
        'facilitador': facilitador,
        'baptized': baptized,
        'member': member,
      };

      // Remove valores null
      body.removeWhere((key, value) => value == null);

      final response = await ApiService.post(
        ApiConstants.userCreateFacilitator,
        body: body,
        token: token,
      );

      // Resposta padronizada: { success: true, data: {...} }
      return UserDTO.fromJson(response['data'] as Map<String, dynamic>);
    } catch (e) {
      rethrow;
    }
  }

  /// Update facilitador (admin only)
  static Future<UserDTO> updateFacilitatorUser(
    String userId, {
    required bool facilitator,
    required String token,
  }) async {
    try {
      final response = await ApiService.patch(
        ApiConstants.userUpdateFacilitator.replaceFirst(':id', userId),
        body: {'facilitator': facilitator},
        token: token,
      );

      // Resposta padronizada: { success: true, data: {...} }
      return UserDTO.fromJson(response['data'] as Map<String, dynamic>);
    } catch (e) {
      rethrow;
    }
  }

  // ============ Roles (admin) ============

  /// Update user roles (super_admin e pastor_local only)
  static Future<UserDTO> updateUserRoles(
    String userId, {
    required List<String> roles,
    required String token,
  }) async {
    try {
      final response = await ApiService.patch(
        ApiConstants.userUpdateRoles.replaceFirst(':id', userId),
        body: {'roles': roles},
        token: token,
      );

      // Resposta padronizada: { success: true, data: {...} }
      return UserDTO.fromJson(response['data'] as Map<String, dynamic>);
    } catch (e) {
      rethrow;
    }
  }
}
