export interface UserSession {
  status: number;
  message: string;
  data: {
    id: string;
    email: string;
    fullName: string;
    createdAt: string;
  };
}
