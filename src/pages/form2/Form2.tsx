import { useSelector, useDispatch } from "react-redux";
import { AppState } from "../../redux/store";
import { saveUsersData } from "../../redux/usersDataSlice";
import { useNavigate } from "react-router-dom";
import Header from "../../components/header/Header";
import "./Form2.css";
import { UserData, FormInputs } from "../../types/types";
import { SubmitHandler, useForm } from "react-hook-form";
import yupSchema from "../../yup/yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { convertToBase64 } from "../../utils/utils";

export default function Form2() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const data = useSelector((state: AppState) => state.data);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({
    mode: "onChange",
    resolver: yupResolver(yupSchema),
  });

  const doSubmit: SubmitHandler<FormInputs> = async (formData) => {
    const transformedPicture = formData.picture
      ? await convertToBase64(formData.picture[0])
      : "null";
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
    const newData: UserData[] = [...data, addition];
    dispatch(saveUsersData(newData));
    navigate(-1);
  };

  return (
    <>
      <Header />
      <main className="form2-main">
        <p className="form2-notice">All fields are required</p>
        <form
          className="form2-wrapper"
          onSubmit={handleSubmit(doSubmit)}
          noValidate
        >
          <label htmlFor="name">Name:</label>
          <input
            className="form2-input-text"
            id="name"
            type="text"
            {...register("name")}
          ></input>
          <div className="form2-error">
            {errors.name && <p>{errors.name.message}</p>}
          </div>

          <label htmlFor="age">Age:</label>
          <input
            className="form2-input-text"
            id="age"
            type="number"
            {...register("age")}
          ></input>
          <div className="form2-error">
            {errors.age && <p>{errors.age.message}</p>}
          </div>

          <label htmlFor="email">E-mail:</label>
          <input
            className="form2-input-text"
            id="email"
            type="email"
            {...register("email")}
          ></input>
          <div className="form2-error">
            {errors.email && <p>{errors.email.message}</p>}
          </div>

          <div className="form2-gender-choice">
            <p>Gender:</p>
            <div className="form2-gender-options">
              <div className="form2-gender-option">
                <input
                  type="radio"
                  id="male"
                  value="Male"
                  {...register("gender")}
                ></input>
                <label htmlFor="male">Male</label>
              </div>
              <div className="form2-gender-option">
                <input
                  type="radio"
                  id="female"
                  value="Female"
                  {...register("gender")}
                ></input>
                <label htmlFor="female">Female</label>
              </div>
              <div className="form2-gender-option">
                <input
                  type="radio"
                  id="other"
                  value="Other"
                  {...register("gender")}
                ></input>
                <label htmlFor="other">Other</label>
              </div>
            </div>
          </div>
          <div className="form2-error">
            {errors.gender && <p>{errors.gender.message}</p>}
          </div>

          <label htmlFor="country">Select country:</label>
          <input
            className="form2-input-text"
            id="country"
            type="text"
            autoComplete="country-name"
            {...register("country")}
          ></input>
          <div className="form2-error">
            {errors.country && <p>{errors.country.message}</p>}
          </div>

          <label htmlFor="picture">Choose a profile picture:</label>
          <input
            className="form2-input-file"
            type="file"
            id="picture"
            {...register("picture")}
            accept="image/png, image/jpeg"
          />
          <div className="form1-error">
            {errors.picture && <p>{errors.picture.message}</p>}
          </div>

          <label htmlFor="password">Password:</label>
          <input
            className="form2-input-text"
            id="password"
            type="password"
            {...register("password")}
          ></input>
          <div className="form2-error">
            {errors.password && <p>{errors.password.message}</p>}
          </div>

          <label htmlFor="confirm-password">Confirm password:</label>
          <input
            className="form2-input-text"
            id="confirm_password"
            type="password"
            {...register("confirm_password")}
          ></input>
          <div className="form2-error">
            {errors.confirm_password && (
              <p>{errors.confirm_password.message}</p>
            )}
          </div>

          <div className="form2-accept-terms">
            <input type="checkbox" id="accept" {...register("accept")}></input>
            <label htmlFor="accept">Accept terms and conditions</label>
          </div>
          <div className="form2-error">
            {errors.accept && <p>{errors.accept.message}</p>}
          </div>

          <div className="form1-buttons">
            <button className="form2-button submit-button" type="submit">
              SUBMIT
            </button>
          </div>
        </form>
      </main>
    </>
  );
}
