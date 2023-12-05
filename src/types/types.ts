export type UserData = {
  name: string;
  age: number;
  email: string;
  gender: string;
  country: string;
  picture: string;
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
  picture: HTMLInputElement;
  password: HTMLInputElement;
  confirm_password: HTMLInputElement;
  accept: HTMLInputElement;
}

export interface DataForm extends HTMLFormElement {
  readonly elements: DataElements;
}

export type FormInputs = {
  name: string;
  age: number;
  email: string;
  gender: string;
  country: string;
  picture: FileList;
  password: string;
  confirm_password: string;
  accept?: boolean | undefined;
};
