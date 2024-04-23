export type User = {
  id: string;
  firstname: string;
  lastname: string;
  password: string;
  email: string;
  userName: string;
  role: string;
  avatar: string;
};

export type Payload = {
  email: string;
  id: string;
};