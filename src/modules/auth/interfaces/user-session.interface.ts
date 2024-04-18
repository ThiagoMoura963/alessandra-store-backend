export interface UserSession {
  data: {
    user: string;
    email: string;
  };
  id: number;
  roles: string;
}
