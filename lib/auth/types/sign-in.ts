export interface SignInState {
  errors?: {
    username?: string[];
    password?: string[];
  };
  message?: string | null;
}