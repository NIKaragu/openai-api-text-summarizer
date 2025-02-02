export interface SignUpState {
  errors?: {
    username?: string[];
    password?: string[];
    confirmPAssword?: string[];
  };
  message?: string | null;
}
