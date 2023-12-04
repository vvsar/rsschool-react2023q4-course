export type UserData = {
  name: string;
  age: number;
  email: string;
  gender: string;
  country: string;
  // photo: string;
  password: string;
  confirm_password: string;
  accept?: boolean | undefined;
};

export type ResultsState = {
  data: UserData[];
};
