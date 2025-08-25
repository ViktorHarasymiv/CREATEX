// SETUP
import { useEffect, useId } from "react";

import { useSelector, useDispatch } from "react-redux";

import { addReview } from "../../../../../redux/goodsSlice";

import { formattedDate } from "../../../../../utils/data";

// FORMIK

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

// REDUX STORE

// STYLE

import css from "../../../../Authorization/Modal/Form/Form.module.css";

// MEDIA

import Button from "../../../../Button/Button";

import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { IoMdClose } from "react-icons/io";

// BODY

export default function LeaveModal({ id, setLeaveReview }) {
  const dispatch = useDispatch();

  // CONST

  const fieldId = useId();

  const loggedUser = useSelector((state) => state.account.loggedUser);

  const valuesArray = ["1", "2", "3", "4", "5"];

  const initialValues = {
    name: loggedUser.info.persone.fullname || "",
    email: loggedUser.info.contacts.email || "",
    rating: "",
    review: "",
  };

  // VALIDATION SCHEMA

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .max(100, "name не повинен перевищувати 100 символів")
      .required("Name is required"),

    email: Yup.string()
      .max(100, "Email не повинен перевищувати 100 символів")
      .required("Email is required"),
    rating: Yup.string()
      .max(100, "rating не повинен перевищувати 100 символів")
      .required("Rating is required"),
    review: Yup.string()
      .max(100, "review не повинен перевищувати 100 символів")
      .required("Review is required"),
  });

  // EFFECT

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        setLeaveReview(false);
      }
    };

    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [setLeaveReview]);

  const handlerPush = (review) => {
    dispatch(addReview(review));
  };

  return (
    <div className="overlay">
      <div className="override">
        <button
          onClick={() => setLeaveReview(false)}
          className="auth_form--close-button"
        >
          <IoMdClose />
        </button>
        <div className="auth_title--tile">
          <h2 className="auth_form--title">Leave a review</h2>
        </div>
        <Formik
          initialValues={initialValues}
          enableReinitialize
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm }) => {
            const payload = {
              productId: id,
              review: {
                data: formattedDate(),
                name: values.name,
                rating: Number(values.rating),
                comment: values.review,
              },
            };
            resetForm();
            setLeaveReview(false);
            handlerPush(payload);
          }}
        >
          {({ setFieldValue, values }) => (
            <Form className={css.form_review}>
              <fieldset>
                <legend>Leave Review Form</legend>
              </fieldset>

              {/* Name */}

              <label htmlFor={`${fieldId}-name`} className={css.form_label}>
                <span>Name</span>
                <div className={css.input_wrapper}>
                  <Field
                    type="text"
                    name="name"
                    placeholder="Your name"
                    id={`${fieldId}-name`}
                    className={css.modal_form_input}
                  />
                </div>

                <ErrorMessage
                  name="name"
                  component="span"
                  className={css.error_message}
                />
              </label>

              {/* E- Mail */}

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

              {/* Rating */}

              <label htmlFor={`${fieldId}-rating`} className={css.form_label}>
                <span>Rating</span>
                <div className={css.input_wrapper}>
                  <FormControl
                    sx={{
                      m: 1,
                      minWidth: "100%",
                      margin: 0,
                    }}
                  >
                    <Select
                      sx={{
                        borderRadius: 1,
                        padding: 0,
                        fontSize: 14,
                        fontWeight: 300,
                        letterSpacing: 1,
                        color: "var(--white)",
                        fontFamily: "inherit",
                        maxHeight: "44px",
                        outline: "1px solid var(--gray-400)",

                        "& .MuiOutlinedInput-input": {
                          display: "flex",
                          alignItems: "center",
                          padding: "11px 16px",
                        },

                        "& .MuiOutlinedInput-notchedOutline": {
                          border: "none",
                        },

                        "&:hover": {
                          outlineColor: "var(--gray-200)",
                        },
                        "& .MuiSelect-icon": {
                          color: "var(--gray-200)", // Колір іконки
                          fontSize: "24px", // Розмір іконки
                          right: "12px", // Відступ справа
                        },
                      }}
                      value={values.rating}
                      onChange={(event) => {
                        setFieldValue("rating", event.target.value);
                      }}
                      displayEmpty
                      renderValue={(selected) => {
                        if (!selected) {
                          return <p style={{ padding: 0 }}>Choose rating</p>;
                        }
                        return selected;
                      }}
                    >
                      <MenuItem value="">
                        <em>Please select</em>
                      </MenuItem>
                      {valuesArray.map((item, index) => (
                        <MenuItem key={index} value={item}>
                          {item}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
                <ErrorMessage
                  name="rating"
                  component="span"
                  className={css.error_message}
                />
              </label>

              {/* Review */}

              <label htmlFor="review" className={css.form_label}>
                <span>Review</span>
                <div className={css.input_wrapper}>
                  <Field
                    as="textarea"
                    name="review"
                    id="review"
                    placeholder="Your feedback..."
                    rows={4}
                    style={{
                      width: "100%",
                      padding: "10px",
                      borderRadius: "4px",
                      border: "1px solid var(--gray-400)",
                      resize: "none",
                      fontSize: "16px",
                      fontFamily: "inherit",
                      outline: "none",
                    }}
                  />
                </div>
                <ErrorMessage
                  name="review"
                  component="span"
                  className={css.error_message}
                />
              </label>
              <Button type={"submit"}>{"Submit a review"}</Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
