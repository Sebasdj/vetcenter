export interface AuthInfo {
  isAuthenticated: boolean;
  user: User | null;
}
export interface AuthContextType extends AuthInfo {
  login(email: string, password: string)
  logout()
};