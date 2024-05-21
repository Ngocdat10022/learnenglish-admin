import * as yup from "yup";

export const schema = yup
  .object({
    email: yup.string().required("required"),
    password: yup.string().required("required"),
  })
  .required();
