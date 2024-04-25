export type User = {
  id: string;
  firstName: string;
  lastName: string;
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