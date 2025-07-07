// IMPORTS

import { useState } from "react";

// FORM SETTUP
import { useId } from "react";

// FORMIK

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

// REDUX STORE
import { useSelector, useDispatch } from "react-redux";
import { getProfile } from "../../../../redux/accountSlice";

// STYLE AND ICONS

import css from "./Form.module.css";
import EyeIco from "./icons/Eye.png";
import Button from "../../../Button/Button";

// VALIDATION SCHEMA

const validationSchema = Yup.object().shape({
  fullname: Yup.string()
    .min(3, "Ім'я повинно містити щонайменше 3 символи")
    .max(50, "Ім'я не повинно перевищувати 50 символів")
    .required("Повне ім'я обов'язкове"),

  email: Yup.string()
    .email("Введіть коректний email")
    .max(100, "Email не повинен перевищувати 100 символів")
    .required("Email обов'язковий"),

  password: Yup.string()
    .min(8, "Пароль повинен бути щонайменше 8 символів")
    .matches(/[A-Z]/, "Пароль повинен містити хоча б одну велику літеру")
    .matches(/[a-z]/, "Пароль повинен містити хоча б одну маленьку літеру")
    .matches(/[0-9]/, "Пароль повинен містити хоча б одну цифру")
    .matches(
      /[@$!%*?&]/,
      "Пароль повинен містити хоча б один спеціальний символ"
    )
    .required("Пароль обов'язковий"),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Паролі повинні співпадати")
    .required("Підтвердження паролю обов'язкове"),
});

export default function SignUpForm({ close }) {
  const dispatch = useDispatch();
  const fieldId = useId();

  // STATE

  const [showPassword, setShowPassword] = useState(false);

  // CONST
  const profile = useSelector((state) => state.account.profile);
  const maxHeight = 44;

  const initialValues = {
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
    acceptConfig: false,
  };

  // FUNCTION

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = (values, actions) => {
    const matchedUser = profile.find((user) => user.email === values.email);

    if (matchedUser) {
      if (matchedUser.email === values.email) {
        actions.setErrors({
          email: "Email already exists",
        });
      }
    } else {
      dispatch(getProfile(values));
      close();
      actions.resetForm();
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched }) => (
        <Form className={css.formSettup}>
          <fieldset>
            <legend>Sign Up form</legend>
            {/* fullname */}
            <label htmlFor={`${fieldId}-fullname`} className={css.form_label}>
              <span>Full Name</span>
              <div className={css.input_wrapper}>
                <Field
                  type="text"
                  name="fullname"
                  id={`${fieldId}-fullname`}
                  className={css.modal_form_input}
                  style={{
                    outline:
                      errors.fullname && touched.fullname
                        ? "2px solid red"
                        : "",
                  }}
                  placeholder="Your full name"
                  required
                />
              </div>
              <ErrorMessage
                name="fullname"
                component="span"
                className={css.error_message}
              />
            </label>
            {/* email */}
            <label htmlFor={`${fieldId}-email`} className={css.form_label}>
              <span>Email</span>
              <div className={css.input_wrapper}>
                <Field
                  type="email"
                  name="email"
                  id={`${fieldId}-email`}
                  className={css.modal_form_input}
                  style={{
                    outline:
                      errors.email && touched.email ? "2px solid red" : "",
                  }}
                  placeholder="Your working email"
                  required
                />
              </div>
              <ErrorMessage
                name="email"
                component="span"
                className={css.error_message}
              />
            </label>
            {/* password */}
            <label htmlFor={`${fieldId}-password`} className={css.form_label}>
              <span>Password</span>
              <div className={css.input_wrapper}>
                <Field
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id={`${fieldId}-password`}
                  className={css.modal_form_input}
                  style={{
                    outline:
                      errors.password && touched.password
                        ? "2px solid red"
                        : "",
                  }}
                  placeholder="Your password"
                />
                <img
                  onMouseEnter={togglePassword}
                  onMouseLeave={togglePassword}
                  className={css.password_hide_icon}
                  src={EyeIco}
                  alt="Show password"
                  width={16}
                  height={16}
                />
              </div>
              <ErrorMessage
                name="password"
                component="span"
                className={css.error_message}
              />
            </label>
            {/* config password */}
            <label
              htmlFor={`${fieldId}-config-password`}
              className={css.form_label}
            >
              <span>Confirm Password</span>
              <div className={css.input_wrapper}>
                <Field
                  type={showPassword ? "text" : "password"}
                  name="confirmPassword"
                  id={`${fieldId}-config-password`}
                  className={css.modal_form_input}
                  style={{
                    outline:
                      errors.confirmPassword && touched.confirmPassword
                        ? "2px solid red"
                        : "",
                  }}
                  placeholder="Password confirmation"
                  required
                />
                <img
                  onMouseEnter={togglePassword}
                  onMouseLeave={togglePassword}
                  className={css.password_hide_icon}
                  src={EyeIco}
                  alt="Show password"
                  width={16}
                  height={16}
                />
              </div>
              <ErrorMessage
                name="confirmPassword"
                component="span"
                className={css.error_message}
              />
            </label>
            {/* checkbox */}
            <label
              htmlFor={`${fieldId}--config-checkbox`}
              className="checkbox_label"
            >
              <div className="custom_checkbox">
                <span className="accept_text">
                  I accept the Terms of Use & Private Policy.
                </span>
                <Field
                  type="checkbox"
                  name="acceptConfig"
                  id={`${fieldId}--config-checkbox`}
                  className="checkbox_input"
                  required
                />
                <div className="primary_checkbox"></div>
              </div>
            </label>
            <Button height={maxHeight}>Sign up</Button>
          </fieldset>
        </Form>
      )}
    </Formik>
  );
}
