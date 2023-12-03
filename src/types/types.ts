export type UserData = {
  name: string;
  age: number | string;
  email: string;
  gender: string;
  country: string;
  // photo: string;
};

export type ResultsState = {
  data: UserData[];
};
