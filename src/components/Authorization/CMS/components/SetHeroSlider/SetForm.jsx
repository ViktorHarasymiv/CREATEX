// FORMIK

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Button from "../../../../Button/Button";

// REDUX STORE

import { useSelector, useDispatch } from "react-redux";
import { setNewSlider } from "../../../../../redux/sliderSlice";

// FORM SETTUP
import css from "./SetSlider.module.css";
import { useId, useState } from "react";

// VALIDATION SCHEMA

const validationSchema = Yup.object().shape({
  relations: Yup.string()
    .min(5, "Minimum length is 5")
    .max(28, "Max length is 28")
    .required("Relations is required"),
  title: Yup.string()
    .min(5, "Minimum length is 5")
    .max(14, "Max length is 14")
    .required("Title is required"),
  data: Yup.string()
    .min(4, "Minimum length is 4")
    .max(5, "Max length is 5")
    .required("Data is required"),
  motivation: Yup.string()
    .min(8, "Minimum length is 4")
    .max(65, "Max length is 65")
    .required("Motivation text is required"),
  image: Yup.string()
    .min(30, "Minimum length is 30")
    .max(200, "Max length is 200")
    .matches(/^https:\/\/.+/, "URL must start with https://")
    .required("Motivation text is required"),
  context: Yup.string()
    .min(3, "Minimum length is 3")
    .max(6, "Max length is 6")
    .required("Context word is required"),
});

export default function SetForm() {
  const dispatch = useDispatch();
  const fieldId = useId();

  const [slideTitle, setSlideTitle] = useState("");

  const slide = useSelector((state) => state.slider.items);

  const initialValues = {
    id: crypto.randomUUID(),
    name: "",
    image: "",
    relations: "",
    title: "",
    data: "",
    motivation: "",
  };

  // FUNCTION

  const handleSubmit = (values, actions) => {
    dispatch(setNewSlider(values));

    actions.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form>
        <fieldset className={css.formSettup}>
          <legend className={css.form_title}>Add slide</legend>
          <div className={css.form_column}>
            {/* Relations */}
            <label htmlFor={`${fieldId}-relations`}>
              <span className={css.form_label}>Public relations</span>
              <div className={css.input_wrapper}>
                <Field
                  type="text"
                  name="relations"
                  id={`${fieldId}-relations`}
                  className={css.modal_form_input}
                  placeholder="Write relations"
                  required
                />
              </div>
              <ErrorMessage
                name="relations"
                component="span"
                className={css.error_message}
              />
            </label>
            {/* Title */}
            <label htmlFor={`${fieldId}-title`} className={css.form_label}>
              <span className={css.form_label}>Title</span>
              <div className={css.input_wrapper}>
                <Field
                  type="text"
                  name="title"
                  id={`${fieldId}-title`}
                  className={css.modal_form_input}
                  placeholder="Write title"
                  required
                />
                <ErrorMessage
                  name="title"
                  component="span"
                  className={css.error_message}
                />
              </div>
            </label>
            {/* Data */}
            <label htmlFor={`${fieldId}-year`} className={css.form_label}>
              <span className={css.form_label}>Sale data</span>
              <div className={css.input_wrapper}>
                <Field
                  type="text"
                  name="data"
                  id={`${fieldId}-data`}
                  className={css.modal_form_input}
                  placeholder="Write sale date"
                  required
                />
                <ErrorMessage
                  name="data"
                  component="span"
                  className={css.error_message}
                />
              </div>
            </label>
            {/* Motivation text */}
            <label htmlFor={`${fieldId}-motivation`}>
              <span className={css.form_label}>Motivational</span>
              <div className={css.input_wrapper}>
                <Field
                  type="text"
                  name="motivation"
                  id={`${fieldId}-motivation`}
                  className={css.modal_form_input}
                  placeholder="Write motivation text"
                  required
                />
              </div>
              <ErrorMessage
                name="motivation"
                component="span"
                className={css.error_message}
              />
            </label>
            {/* Image */}
            <label htmlFor={`${fieldId}-image`}>
              <span className={css.form_label}>Image</span>
              <div className={css.input_wrapper}>
                <Field
                  type="text"
                  name="image"
                  id={`${fieldId}-image`}
                  className={css.modal_form_input}
                  placeholder="Write URL"
                  required
                />
              </div>
              <ErrorMessage
                name="image"
                component="span"
                className={css.error_message}
              />
            </label>
            {/* Slide context (name) */}
            <label htmlFor={`${fieldId}-name`} className={css.form_label}>
              <span className={css.form_label}>Context</span>
              <div className={css.input_wrapper}>
                <Field
                  type="text"
                  name="context"
                  id={`${fieldId}-context`}
                  className={css.modal_form_input}
                  placeholder="Write context title"
                  required
                />
                <ErrorMessage
                  name="context"
                  component="span"
                  className={css.error_message}
                />
              </div>
            </label>
          </div>
        </fieldset>
        <Button type={"submit"}>Save</Button>
      </Form>
    </Formik>
  );
}
