import * as yup from "yup";

const MAX_FILE_SIZE = 1048576; //1MB

const yupSchema = yup.object().shape({
  name: yup
    .string()
    .required("This field is required")
    .test("first_letter", "The first character must be uppercase", (value) =>
      checkFirstLetter(value),
    ),
  age: yup
    .number()
    .typeError("This field is required")
    .required("This field is required")
    .min(18, "Age must be between 18 and 99")
    .max(99, "Age must be between 18 and 99"),
  email: yup
    .string()
    .required("This field is required")
    .email("E-mail is not valid"),
  gender: yup.string().required("Gender must be selected"),
  country: yup.string().required("This field is required"),
  picture: yup
    .mixed<FileList>()
    .required("Picture must be uploaded")
    .test("is-required", "Picture must be uploaded", (list) =>
      list[0] ? true : false,
    )
    .test(
      "is-valid-type",
      "Not a valid image type",
      (list) => list[0]?.type === "image/jpeg" || list[0]?.type === "image/png",
    )
    .test(
      "is-valid-size",
      "Max allowed size is 1MB",
      (list) => list[0]?.size <= MAX_FILE_SIZE,
    ),
  password: yup
    .string()
    .required("This field is required")
    .min(8, "Password must have at least 8 characters")
    .matches(/[0-9]/, "Password must have at least one digit")
    .matches(/[a-z]/, "Password must have at least one lowercase letter")
    .matches(/[A-Z]/, "Password must have at least one uppercase letter")
    .matches(
      /[@#$!%*?&_]/,
      "Password must have at least one special character",
    ),
  confirm_password: yup
    .string()
    .required("This field is required")
    .oneOf([yup.ref("password")], "Passwords do not match"),
  accept: yup.bool().oneOf([true], "You must accept the terms and conditions"),
});

const checkFirstLetter = (string: string) => {
  return /[A-Z]/.test(string[0]);
};

export default yupSchema;
