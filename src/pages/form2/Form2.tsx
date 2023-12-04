import { useSelector, useDispatch } from "react-redux";
import { AppState } from "../../redux/store";
import { saveUsersData } from "../../redux/usersDataSlice";
import { useNavigate } from "react-router-dom";
import Header from "../../components/header/Header";
import "./Form2.css";
import { UserData } from "../../types/types";
import { SubmitHandler, useForm } from "react-hook-form";
import yupSchema from "../../yup/yup";
import { yupResolver } from "@hookform/resolvers/yup";

export default function Form2() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const data = useSelector((state: AppState) => state.data);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserData>({ mode: "onChange", resolver: yupResolver(yupSchema) });

  const doSubmit: SubmitHandler<UserData> = (formData) => {
    const newData: UserData[] = [...data, formData];
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
          <input id="name" type="text" {...register("name")}></input>
          <div>{errors.name && <p>{errors.name.message}</p>}</div>
          <label htmlFor="age">Age:</label>
          <input id="age" type="number" {...register("age")}></input>
          <div>{errors.age && <p>{errors.age.message}</p>}</div>
          <label htmlFor="email">E-mail:</label>
          <input id="email" type="email" {...register("email")}></input>
          <div>{errors.email && <p>{errors.email.message}</p>}</div>
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
          <div>{errors.gender && <p>{errors.gender.message}</p>}</div>
          <label htmlFor="country">Select country:</label>
          <input
            id="country"
            type="text"
            autoComplete="country-name"
            {...register("country")}
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
          <input
            id="password"
            type="password"
            {...register("password")}
          ></input>
          <div>{errors.password && <p>{errors.password.message}</p>}</div>
          <label htmlFor="confirm-password">Confirm password:</label>
          <input
            id="confirm_password"
            type="password"
            {...register("confirm_password")}
          ></input>
          <div>
            {errors.confirm_password && (
              <p>{errors.confirm_password.message}</p>
            )}
          </div>
          <div className="form2-accept-terms">
            <input type="checkbox" id="accept" {...register("accept")}></input>
            <label htmlFor="accept">Accept terms and conditions</label>
          </div>
          <div>{errors.accept && <p>{errors.accept.message}</p>}</div>
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
