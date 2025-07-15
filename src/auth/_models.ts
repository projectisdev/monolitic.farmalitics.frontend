import { type TLanguageCode } from '@/i18n';


export interface LoginUserInfo {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  roles: string[]; // Array de roles como strings
}

// Interfaz principal para la respuesta de login
export interface LoginResponse {
  success: boolean;
  message: string;
  access_token?: string; // Opcional porque puede no estar presente si falla
  user?: LoginUserInfo;   // Opcional porque puede no estar presente si falla
}
export interface AuthModel {
  success: boolean;
  message: string;
  access_token?: string; // Opcional porque puede no estar presente si falla
  user: LoginUserInfo; 
}

export interface UserModel {
  id: number;
  username: string;
  password: string | undefined;
  email: string;
  first_name: string;
  last_name: string;
  fullname?: string;
  occupation?: string;
  companyName?: string;
  phone?: string;
  roles?: number[];
  pic?: string;
  language?: TLanguageCode;
  auth?: AuthModel;
}
