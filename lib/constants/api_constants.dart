class ApiConstants {
  // Base URL do backend
  static const String baseUrl = 'http://localhost:3000/api';
  
  // ============ User Endpoints ============
  // Public
  static const String userRegister = '/users';
  static const String userLogin = '/users/login';
  static const String userRefresh = '/users/refresh';
  
  // Protected
  static const String userGetAll = '/users';
  static const String userGetById = '/users/:id';
  static const String userUpdate = '/users/:id';
  static const String userDelete = '/users/:id';
  static const String userLogout = '/users/logout';
  static const String userUpdatePassword = '/users/:id/password';
  
  // Admin (facilitator management)
  static const String userCreateFacilitator = '/users/facilitator';
  static const String userUpdateFacilitator = '/users/facilitator/:id';
  
  // Admin (roles management)
  static const String userUpdateRoles = '/users/:id/roles';
  
  // ============ Church Endpoints ============
  // Public
  static const String churchGetAll = '/churchs';
  
  // Protected
  static const String churchGetById = '/churchs/:id';
  static const String churchCreate = '/churchs';
  static const String churchUpdate = '/churchs/:id';
  static const String churchDelete = '/churchs/:id';

  // ============ Midia Local Endpoints ============
  // Public
  // No public endpoints

  // Protected
  static const String getAllMidiaLocals = '/midialocal';
  static const String getMidiaLocalById = '/midialocal/:id';
  static const String createMidiaLocal = '/midialocal';
  static const String updateMidiaLocal = '/midialocal/:id';
  static const String deleteMidiaLocal = '/midialocal/:id';

  // ============ Lesson Endpoints ============
  // Public
  static const String lessonGetAll = '/lessons';
  static const String lessonGetById = '/lessons/:id';
  
  // Protected (super_admin only)
  static const String lessonCreate = '/lessons';
  static const String lessonUpdate = '/lessons/:id';
  static const String lessonDelete = '/lessons/:id';

  // ============ Lesson Progress Endpoints ============
  // Protected (admin only - multiple roles)
  static const String lessonProgressGetAll = '/lesson-progresses';
  
  // Protected (user can see own progress)
  static const String lessonProgressGetMy = '/lesson-progresses/me';
  static const String lessonProgressGetById = '/lesson-progresses/:id';
  static const String lessonProgressCreate = '/lesson-progresses';
  static const String lessonProgressUpdate = '/lesson-progresses/:id';
  static const String lessonProgressDelete = '/lesson-progresses/:id';
  
  // Protected (user submits lesson answers)
  static const String lessonSubmitAnswers = '/lessons/:lessonId/submit';

  // ============ Cura Endpoints ============
  // Patient side
  static const String curaCreate = '/cura';
  static const String curaGetMine = '/cura/me';
  
  // Manager/Admin side
  static const String curaGetAll = '/cura';
  static const String curaGetById = '/cura/:id';
  static const String curaUpdate = '/cura/:id';
  static const String curaUpdateStatus = '/cura/:id/status';
  static const String curaDelete = '/cura/:id';
  static const String curaSummary = '/cura/summary';

  // ============ Christian Group Endpoints ============
  // Protected
  static const String christianGroupGetAll = '/christiangroup';
  static const String christianGroupGetById = '/christiangroup/:id';
  static const String christianGroupCreate = '/christiangroup';
  static const String christianGroupUpdate = '/christiangroup/:id';
  static const String christianGroupDelete = '/christiangroup/:id';

  
  
  // ============ Timeouts ============
  static const Duration connectTimeout = Duration(seconds: 10);
  static const Duration receiveTimeout = Duration(seconds: 10);
}
