export interface LoginResponse {
  access_token: string;
  user: {
    id: number;
    email: string;
  };
}
