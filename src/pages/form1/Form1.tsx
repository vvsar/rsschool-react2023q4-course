import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppState } from "../../redux/store";
import { saveUsersData } from "../../redux/usersDataSlice";
import { useNavigate } from "react-router-dom";
import Header from "../../components/header/Header";
import "./Form1.css";
import { UserData } from "../../types/types";
import { ValidationError } from "yup";
import yupSchema from "../../yup/yup";

export default function Form1() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const data = useSelector((state: AppState) => state.data);
  let accept: boolean | undefined;
  const [errors, setErrors] = useState<{
    [index: string]: ValidationError | undefined;
  }>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [index: string]: ValidationError } = {};
    const target = e.target as HTMLFormElement;
    const name = (target.elements.namedItem("name") as HTMLInputElement).value;
    const age = +(target.elements.namedItem("age") as HTMLInputElement).value;
    const email = (target.elements.namedItem("email") as HTMLInputElement)
      .value;
    const gender = (target.elements.namedItem("gender") as HTMLInputElement)
      .value;
    const country = (target.elements.namedItem("country") as HTMLInputElement)
      .value;
    const password = (target.elements.namedItem("password") as HTMLInputElement)
      .value;
    const confirm_password = (
      target.elements.namedItem("confirm_password") as HTMLInputElement
    ).value;
    const acceptValue = (
      target.elements.namedItem("accept") as HTMLInputElement
    ).value;
    if (acceptValue === "true") {
      accept = true;
    }
    if (acceptValue === "false") {
      accept = false;
    }
    let newData: UserData[] = [];
    const addition = {
      name: name,
      age: age,
      email: email,
      gender: gender,
      country: country,
      password: password,
      confirm_password: confirm_password,
      accept: accept,
    };
    await yupSchema
      .validate(addition, {
        abortEarly: false,
      })
      .catch((err: ValidationError) => {
        err.inner.forEach((error) => {
          const name = error.path as string;
          if (!newErrors[name]) {
            newErrors[name] = error;
          }
        });
        setErrors(newErrors);
      });
    if (Object.keys(newErrors).length === 0) {
      newData = [...data, addition];
      dispatch(saveUsersData(newData));
      navigate(-1);
    }
  };
  return (
    <>
      <Header />
      <main className="form1-main">
        <p className="form1-notice">All fields are required</p>
        <form className="form1-wrapper" onSubmit={handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input id="name" name="name" type="text"></input>
          <div>{errors.name && <p>{errors.name.message}</p>}</div>
          <label htmlFor="age">Age:</label>
          <input id="age" name="age" type="number"></input>
          <div>{errors.age && <p>{errors.age.message}</p>}</div>
          <label htmlFor="email">E-mail:</label>
          <input id="email" name="email" type="email"></input>
          <div>{errors.email && <p>{errors.email.message}</p>}</div>
          <div className="form1-gender-choice">
            <p>Gender:</p>
            <div className="form1-gender-options">
              <div className="form1-gender-option">
                <input
                  type="radio"
                  id="male"
                  name="gender"
                  value="Male"
                ></input>
                <label htmlFor="male">Male</label>
              </div>
              <div className="form1-gender-option">
                <input
                  type="radio"
                  id="female"
                  name="gender"
                  value="Female"
                ></input>
                <label htmlFor="female">Female</label>
              </div>
              <div className="form1-gender-option">
                <input
                  type="radio"
                  id="other"
                  name="gender"
                  value="Other"
                ></input>
                <label htmlFor="other">Other</label>
              </div>
            </div>
          </div>
          <div>{errors.gender && <p>{errors.gender.message}</p>}</div>
          <label htmlFor="country">Select country:</label>
          <input
            id="country"
            name="country"
            type="text"
            autoComplete="country-name"
          ></input>
          <div>{errors.country && <p>{errors.country.message}</p>}</div>
          {/* <label htmlFor="picture">Choose a profile picture:</label>
            <input
              type="file"
              id="picture"
              name="picture"
              accept="image/png, image/jpeg"
            /> */}
          <label htmlFor="password">Password:</label>
          <input id="password" name="password" type="password"></input>
          <div>{errors.password && <p>{errors.password.message}</p>}</div>
          <label htmlFor="confirm_password">Confirm password:</label>
          <input
            id="confirm_password"
            name="confirm_password"
            type="password"
          ></input>
          <div>
            {errors.confirm_password && (
              <p>{errors.confirm_password.message}</p>
            )}
          </div>
          <div className="form1-accept-terms">
            <input type="checkbox" id="accept" name="accept"></input>
            <label htmlFor="accept">Accept terms and conditions</label>
          </div>
          <div>{errors.accept && <p>{errors.accept.message}</p>}</div>
          <div className="form1-buttons">
            <button className="form1-button submit-button" type="submit">
              SUBMIT
            </button>
          </div>
        </form>
      </main>
    </>
  );
}
