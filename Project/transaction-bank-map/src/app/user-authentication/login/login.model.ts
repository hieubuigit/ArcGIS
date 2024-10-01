export namespace Login {
  export interface Request {
    username: string | null;
    password: string | null;
  }

  export interface User {
    id: string;
    fullName: string;
    username: string;
    role: string;
  }

  export interface Response {
    user: User;
    accessToken: string;
    refreshToken: string;
  }
}
