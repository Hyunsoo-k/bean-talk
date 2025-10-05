type LoginFormValue = {
  email: string;
  password: string;
};

type SignupFormValue = {
  email: string;
  nickname: string;
  password: string;
  checkPassword: string;
};

export type { LoginFormValue, SignupFormValue };