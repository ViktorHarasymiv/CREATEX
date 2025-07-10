import { useState } from "react";

// REDUX STORE

import { useSelector, useDispatch } from "react-redux";
import { setNewProduct } from "../../../../../redux/goodsSlice";

// FORM SETTUP
import css from "./SetProduct.module.css";
import style from "../SetHeroSlider/SetSlider.module.css";
import { useId } from "react";

// FORMIK

import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import Button from "../../../../Button/Button";

import MuiSelect from "./MuiSelect";
import GoodsList from "./GoodsList";

// VALIDATION SCHEMA

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, "Ім'я повинно містити щонайменше 3 символи")
    .max(50, "Ім'я не повинно перевищувати 50 символів")
    .required("Назва товару обов'язкова"),
});

export default function SetGoods() {
  const dispatch = useDispatch();
  const fieldId = useId();

  // STATE

  const [tab, setTab] = useState(1);

  // CONST

  const goods = useSelector((state) => state.goods.items);

  const randomId = Math.floor(Math.random() * 9999) + 9;

  const initialValues = {
    id: `1832600${randomId}`,
    filter: "",
    gender: "",
    title: "",
    category: "",
    subCategory: "",
    alt: "",
    image: ["", "", ""],
    size: [],
    sizeNumm: [],
    color: [],
    favorite: null,
    rating: null,
    sale: null,
    saleValue: null,
    price: null,
  };

  const handleSubmit = (values, actions) => {
    dispatch(
      setNewProduct({
        ...values,
      })
    );
    // const matchedUser = profile.find((user) => user.email === values.email);
    // if (matchedUser) {
    //   if (matchedUser.email === values.email) {
    //     actions.setErrors({
    //       email: "Email already exists",
    //     });
    //   }
    // } else {
    //   dispatch(getProfile(values));
    //   close();
    // }
    actions.resetForm();
  };

  return (
    <div className={css.page_wrapper}>
      <div className={style.tabs_buttons}>
        <button
          onClick={() => {
            setTab(1);
          }}
          className={tab == 1 ? style.active : style.tabs_button}
        >
          All goods
        </button>
        <button
          onClick={() => {
            setTab(2);
          }}
          className={tab == 2 ? style.active : style.tabs_button}
        >
          Add goods
        </button>
      </div>
      {tab == 2 ? (
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, values }) => (
            <Form>
              <fieldset className={css.formSettup}>
                <div className={css.form_column}>
                  {/* Title */}
                  <label
                    htmlFor={`${fieldId}-title`}
                    className={css.form_label}
                  >
                    <span className={css.form_label}>Title</span>
                    <div className={css.input_wrapper}>
                      <Field
                        type="text"
                        name="title"
                        id={`${fieldId}-title`}
                        className={css.modal_form_input}
                        style={{
                          outline:
                            errors.fullname && touched.fullname
                              ? "2px solid red"
                              : "",
                        }}
                        placeholder="Product title"
                        required
                      />
                    </div>
                    <ErrorMessage
                      name="fullname"
                      component="span"
                      className={css.error_message}
                    />
                  </label>
                  {/* ALT TEXT */}
                  <label htmlFor={`${fieldId}-alt-text`}>
                    <span className={css.form_label}>Alt text</span>
                    <div className={css.input_wrapper}>
                      <Field
                        type="text"
                        name="alt-text"
                        id={`${fieldId}-alt-text`}
                        className={css.modal_form_input}
                        style={{
                          outline:
                            errors.fullname && touched.fullname
                              ? "2px solid red"
                              : "",
                        }}
                        placeholder="Product alt text"
                        required
                      />
                    </div>
                    <ErrorMessage
                      name="alt-text"
                      component="span"
                      className={css.error_message}
                    />
                  </label>
                  {/* GENDER */}
                  <label htmlFor={`${fieldId}-gender`}>
                    <span className={css.form_label}>Gender</span>
                    <MuiSelect
                      name="gender"
                      label="Please select"
                      options={[
                        { value: "men", label: "Men" },
                        { value: "women", label: "Women" },
                        { value: "girl", label: "Girl" },
                        { value: "boy", label: "Boy" },
                      ]}
                    />
                  </label>
                  {/* CATEGORY */}
                  <label htmlFor={`${fieldId}-category`}>
                    <span className={css.form_label}>Category</span>
                    <MuiSelect
                      name="category"
                      label="Please select"
                      options={[
                        {
                          value: "Sweatshirts & hoodies",
                          label: "Sweatshirts & hoodies",
                        },
                        { value: "T-shirt", label: "T-shirt" },
                        { value: "Shorts", label: "Shorts" },
                        { value: "Jeans", label: "Jeans" },
                        { value: "Boots", label: "Boots" },
                        { value: "Accessories", label: "Accessories" },
                        { value: "Cap", label: "Cap" },
                        { value: "Clock", label: "Clock" },
                        { value: "Earrings", label: "Earrings" },
                        { value: "Sunglasses", label: "Sunglasses" },
                        { value: "Bag", label: "Bag" },
                      ]}
                    />
                  </label>
                  {/* FILTER */}
                  <label htmlFor={`${fieldId}-filter`}>
                    <span className={css.form_label}>Filter</span>
                    <MuiSelect
                      name="filter"
                      label="Please select"
                      options={[
                        { value: "Popular", label: "Popular" },
                        { value: "New", label: "New" },
                        { value: "Interesting", label: "Interesting" },
                        { value: "Sale", label: "Sale" },
                        { value: "Hot", label: "Hot" },
                      ]}
                    />
                  </label>
                </div>
                <div className={css.form_column}>
                  {/* IMAGE */}
                  <FieldArray name="image">
                    {
                      <>
                        <div className={css.images_wrapper}>
                          {values.image.map((img, index) => (
                            <div key={index} className={css.input_wrapper}>
                              <label>
                                <span className={css.form_label}>{`${
                                  index == 0 ? "Title image" : "Details image"
                                }`}</span>
                              </label>
                              <Field
                                type="text"
                                name={`image[${index}]`}
                                id={`${fieldId}-image-${index}`}
                                className={css.modal_form_input}
                                placeholder={"URL for image"}
                                required
                                style={{
                                  outline:
                                    errors.image &&
                                    errors.image[index] &&
                                    touched.image &&
                                    touched.image[index]
                                      ? "2px solid red"
                                      : "",
                                }}
                              />
                            </div>
                          ))}
                        </div>
                      </>
                    }
                  </FieldArray>
                  {/* PRICE */}
                  <label
                    htmlFor={`${fieldId}-price`}
                    className={css.form_label}
                  >
                    <span className={css.form_label}>Price</span>
                    <div className={css.input_wrapper}>
                      <Field
                        type="number"
                        name="price"
                        id={`${fieldId}-price`}
                        className={css.modal_form_input}
                        style={{
                          outline:
                            errors.fullname && touched.fullname
                              ? "2px solid red"
                              : "",
                        }}
                        placeholder="Product price"
                        required
                      />
                    </div>
                    <ErrorMessage
                      name="price"
                      component="span"
                      className={css.error_message}
                    />
                  </label>
                  {/* SALE VALUE */}
                  <label
                    htmlFor={`${fieldId}-sale_value`}
                    className={css.form_label}
                  >
                    <span className={css.form_label}>Sale value</span>
                    <div className={css.input_wrapper}>
                      <Field
                        type="number"
                        name="saleValue"
                        id={`${fieldId}-sale_value`}
                        className={css.modal_form_input}
                        style={{
                          outline:
                            errors.fullname && touched.fullname
                              ? "2px solid red"
                              : "",
                        }}
                        placeholder="Product sale value"
                      />
                    </div>
                    <ErrorMessage
                      name="price"
                      component="span"
                      className={css.error_message}
                    />
                  </label>
                </div>
                <div className={css.form_column}>
                  {/* SALE */}
                  <label htmlFor={`${fieldId}-sale`}>
                    <span className={css.form_label}>Sale</span>
                    <MuiSelect
                      name="sale"
                      label="Please select"
                      options={[
                        { value: true, label: "Yes" },
                        { value: false, label: "No" },
                      ]}
                    />
                  </label>
                </div>
              </fieldset>
              <Button>Save</Button>
            </Form>
          )}
        </Formik>
      ) : (
        <GoodsList />
      )}
    </div>
  );
}
