import { useState } from "react";
import { useId } from "react";
import { Formik, Form, Field } from "formik";

import css from "./Form.module.css";
import EyeIco from "./icons/Eye.png";
import Button from "../../../Button/Button";

export default function SignInForm() {
  const fieldId = useId();

  // STATE

  const [showPassword, setShowPassword] = useState(false);

  // CONST

  const maxHeight = 44;

  // FUNCTION

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Formik initialValues={{ acceptConfig: false }} onSubmit={() => {}}>
      <Form className={css.formSettup}>
        <fieldset>
          <legend>Sign Up form</legend>

          <label htmlFor={`${fieldId}-email`} className={css.form_label}>
            <span>Email</span>
            <Field
              type="email"
              name="email"
              id={`${fieldId}-email`}
              className={css.modal_form_input}
            />
          </label>

          <label htmlFor={`${fieldId}-password`} className={css.form_label}>
            <span>Password</span>
            <div className={css.input_wrapper}>
              <Field
                type={showPassword ? "text" : "password"}
                name="password"
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
          <Button height={maxHeight}>Sign up</Button>
        </fieldset>
      </Form>
    </Formik>
  );
}
