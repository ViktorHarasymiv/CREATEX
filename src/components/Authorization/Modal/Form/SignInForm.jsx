// SETUP

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useId } from "react";

// FORMIK

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

// REDUX STORE
import { useSelector, useDispatch } from "react-redux";
import { getLogged, setUserInfo } from "../../../../redux/accountSlice";

// STYLE
import css from "./Form.module.css";

// MEDIA
import EyeIco from "./icons/Eye.png";
import Button from "../../../Button/Button";

// BODY

export default function SignInForm({ close }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // CONST

  const fieldId = useId();
  const profile = useSelector((state) => state.account.profile);

  // STATE

  const [showPassword, setShowPassword] = useState(false);

  // CONST

  const maxHeight = 44;

  const initialValues = {
    email: "",
    password: "",
  };

  // VALIDATION SCHEMA

  const validationSchema = Yup.object().shape({
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
  });

  // FUNCTION

  const now = new Date();

  const createData =
    now.getFullYear() +
    "-" +
    String(now.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(now.getDate()).padStart(2, "0") +
    " " +
    String(now.getHours()).padStart(2, "0") +
    ":" +
    String(now.getMinutes()).padStart(2, "0");

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = (values, actions) => {
    const matchedUser = profile.find(
      (user) => user.email === values.email && user.password === values.password
    );

    if (values.email === "admin@mail.com" && values.password === "Admin@123") {
      dispatch(getLogged(true));
      close();
      dispatch(
        setUserInfo({
          persone: { fullname: "Admin", role: "admin" },
          contacts: { email: values.email },
          political: true,
        })
      );
      navigate("/admin/profile");
      return;
    }

    if (matchedUser) {
      dispatch(getLogged(true));
      dispatch(
        setUserInfo({
          persone: {
            fullname: matchedUser.fullname,
            password: values.password,
            role: "user",
          },
          contacts: { email: matchedUser.email },
          logged: true,
          loggedTime: createData,
          political: matchedUser.acceptConfig,
        })
      );
      close();
      navigate("/account/profile");
    } else {
      actions.setErrors({
        password: "Incorrect email or password",
      });
      actions.setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form className={css.formSettup}>
        <fieldset>
          <legend>Sign Up form</legend>

          <label htmlFor={`${fieldId}-email`} className={css.form_label}>
            <span>Email</span>
            <div className={css.input_wrapper}>
              <Field
                type="email"
                name="email"
                placeholder="Your working email"
                id={`${fieldId}-email`}
                className={css.modal_form_input}
              />
            </div>

            <ErrorMessage
              name="email"
              component="span"
              className={css.error_message}
            />
          </label>

          <label htmlFor={`${fieldId}-password`} className={css.form_label}>
            <span>Password</span>
            <div className={css.input_wrapper}>
              <Field
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Your password"
                id={`${fieldId}-password`}
                className={css.modal_form_input}
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

          <div className={css.user_change_btns}>
            <label
              htmlFor={`${fieldId}--config-checkbox`}
              className="checkbox_label signIn_label"
            >
              <div className="custom_checkbox">
                <span className="accept_text">Keep me signed in</span>
                <Field
                  type="checkbox"
                  name="acceptConfig"
                  id={`${fieldId}--config-checkbox`}
                  className="checkbox_input"
                />
                <div className="primary_checkbox"></div>
              </div>
            </label>
            <a href="#">
              <span className="accent_link">Forgot password?</span>
            </a>
          </div>
          <Button type={"submit"} height={maxHeight}>
            Sign up
          </Button>
        </fieldset>
      </Form>
    </Formik>
  );
}
