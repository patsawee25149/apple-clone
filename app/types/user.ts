export interface User {
  id: string;
  name: string;
  lastname: string;
  email: string;
  phone?: string;
  country?: string;
  password?: string; // ใช้เฉพาะใน backend
  createdAt?: string;
}

export interface UserProfile {
  id: string;
  name: string;
  lastname: string;
  email: string;
  phone: string;
  country: string;
}

export interface UpdateProfileRequest {
  name: string;
  lastname: string;
  email: string;
  phone: string;
  country: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}