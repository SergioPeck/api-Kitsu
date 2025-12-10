export type AuthResponse = {
  uid: string;
  email: string | undefined;
  displayName?: string;
  provider: 'google' | 'email';
};
