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

export interface DataElements extends HTMLFormControlsCollection {
  name: HTMLInputElement;
  age: HTMLInputElement;
  email: HTMLInputElement;
  gender: HTMLInputElement;
  country: HTMLInputElement;
  password: HTMLInputElement;
  confirm_password: HTMLInputElement;
  accept: HTMLInputElement;
}

export interface DataForm extends HTMLFormElement {
  readonly elements: DataElements;
}
