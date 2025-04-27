export type UserData = {
  id: string;
  username: string;
  email: string;
  image: string | null;
  emailVerified?: boolean;
};

export type SignUpData = {
  username: string;
  email: string;
  password: string;
};

export type SignInData = {
  email: string;
  password: string;
};

export type global_user = {
  id: string;
  email: string;
  name: string;
};
