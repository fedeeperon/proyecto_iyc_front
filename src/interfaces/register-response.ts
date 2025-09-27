export interface RegisterResponse {
  message: string;
  user: {
    id: number;
    email: string;
  };
}