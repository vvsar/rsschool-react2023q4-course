import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppState } from "../../redux/store";
import { saveUsersData } from "../../redux/usersDataSlice";
import { useNavigate } from "react-router-dom";
import Header from "../../components/header/Header";
import "./Form1.css";
import { UserData, DataForm } from "../../types/types";
import { convertToBase64 } from "../../utils/utils";
import { ValidationError } from "yup";
import yupSchema from "../../yup/yup";

export default function Form1() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const data = useSelector((state: AppState) => state.data);
  const [errors, setErrors] = useState<{
    [index: string]: ValidationError | undefined;
  }>({});

  const handleSubmit = async (e: React.FormEvent<DataForm>) => {
    e.preventDefault();
    const newErrors: { [index: string]: ValidationError } = {};
    const elements = e.currentTarget.elements;
    const formData = {
      name: elements.name.value,
      age: elements.age.value,
      email: elements.email.value,
      gender: elements.gender.value,
      country: elements.country.value,
      picture: elements.picture.files,
      password: elements.password.value,
      confirm_password: elements.confirm_password.value,
      accept: elements.accept.checked,
    };

    await yupSchema
      .validate(formData, {
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

    const transformedPicture = formData.picture
      ? await convertToBase64(formData.picture[0])
      : "";

    let newData: UserData[] = [];
    const addition = {
      name: formData.name,
      age: +formData.age,
      email: formData.email,
      gender: formData.gender,
      country: formData.country,
      picture: transformedPicture,
      password: formData.password,
      confirm_password: formData.confirm_password,
      accept: formData.accept,
    };

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
        <form className="form1-wrapper" onSubmit={handleSubmit} noValidate>
          <label htmlFor="name">Name:</label>
          <input
            className="form1-input-text"
            id="name"
            name="name"
            type="text"
          ></input>
          <div className="form1-error">
            {errors.name && <p>{errors.name.message}</p>}
          </div>

          <label htmlFor="age">Age:</label>
          <input
            className="form1-input-text"
            id="age"
            name="age"
            type="number"
          ></input>
          <div className="form1-error">
            {errors.age && <p>{errors.age.message}</p>}
          </div>

          <label htmlFor="email">E-mail:</label>
          <input
            className="form1-input-text"
            id="email"
            name="email"
            type="email"
          ></input>
          <div className="form1-error">
            {errors.email && <p>{errors.email.message}</p>}
          </div>

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
          <div className="form1-error">
            {errors.gender && <p>{errors.gender.message}</p>}
          </div>

          <label htmlFor="country">Select country:</label>
          <input
            className="form1-input-text"
            id="country"
            name="country"
            type="text"
            autoComplete="country-name"
          ></input>
          <div className="form1-error">
            {errors.country && <p>{errors.country.message}</p>}
          </div>

          <label htmlFor="picture">Choose a profile picture:</label>
          <input
            className="form1-input-file"
            type="file"
            id="picture"
            name="picture"
            accept="image/png, image/jpeg"
          />
          <div className="form1-error">
            {errors.picture && <p>{errors.picture.message}</p>}
          </div>

          <label htmlFor="password">Password:</label>
          <input
            className="form1-input-text"
            id="password"
            name="password"
            type="password"
          ></input>
          <div className="form1-error">
            {errors.password && <p>{errors.password.message}</p>}
          </div>

          <label htmlFor="confirm_password">Confirm password:</label>
          <input
            className="form1-input-text"
            id="confirm_password"
            name="confirm_password"
            type="password"
          ></input>
          <div className="form1-error">
            {errors.confirm_password && (
              <p>{errors.confirm_password.message}</p>
            )}
          </div>

          <div className="form1-accept-terms">
            <input type="checkbox" id="accept" name="accept"></input>
            <label htmlFor="accept">Accept terms and conditions</label>
          </div>
          <div className="form1-error">
            {errors.accept && <p>{errors.accept.message}</p>}
          </div>

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
