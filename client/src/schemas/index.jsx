import * as Yup from "yup";

export const loginSchema = Yup.object({
  email: Yup.string().email().required("Email can't be empty"),
  password: Yup.string().min(6).required("Pasword can't be empty"),
});
