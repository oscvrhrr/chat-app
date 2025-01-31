
declare global {
  namespace Express {
    interface User {
      id: number;
      fullname: string | null;
      email: string;
    }
  }
}

export {}