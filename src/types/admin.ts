export interface AdminUser {
  uid: string;
  name: string;
  email: string;
  role: string;
  active: boolean;
  photoURL?: string;
}
