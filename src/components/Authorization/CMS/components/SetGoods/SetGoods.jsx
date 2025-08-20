import { useState } from "react";

// REDUX STORE

import { useSelector, useDispatch } from "react-redux";
import { setNewProduct } from "../../../../../redux/goodsSlice";

// FORM SETTUP
import { useId } from "react";
import clsx from "clsx";
import css from "./SetProduct.module.css";
import style from "../SetHeroSlider/SetSlider.module.css";

// FORMIK

import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import Button from "../../../../Button/Button";

import MuiSelect from "./MuiSelect";
import GoodsList from "./GoodsList";
import MuiSizeChacked from "./MuiSizeChacked";
import MuiColorsChecked from "./MuiColorsChecked";

// VALIDATION SCHEMA

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, "Ім'я повинно містити щонайменше 3 символи")
    .max(50, "Ім'я не повинно перевищувати 50 символів")
    .required("Назва товару обов'язкова"),
});

export default function SetGoods({ switcher, content }) {
  const dispatch = useDispatch();
  const fieldId = useId();

  // STATE

  const [tab, setTab] = useState(1);

  const [numeric, setNumeric] = useState(true);
  const [letter, setLetter] = useState(false);

  // CONST

  const randomId = Math.floor(Math.random() * 9999) + 9;

  const initialValues = {
    id: `1832600${randomId}`,
    filter: "",
    gender: "",
    title: "",
    alt: "",
    category: "",
    subCategory: "",
    image: ["", "", ""],
    price: "",
    size: null,
    numeric: null,
    color: [],
    rating: null,
    sale: "",
    saleValue: "",
  };

  const handleSubmit = (values, actions) => {
    dispatch(
      setNewProduct({
        ...values,
      })
    );
    switcher(true);
    content("The product has been added");
    actions.resetForm();
  };

  const buildLinkClass = (index) => {
    return clsx(style.tabs_button, tab === index && style.active);
  };

  const numericValue = [
    "32",
    "33",
    "34",
    "35",
    "36",
    "37",
    "38",
    "39",
    "40",
    "41",
    "42",
    "43",
    "44",
    "45",
  ];
  const lettetValue = ["XS", "S", "M", "L", "XL", "2XL", "3XL"];

  const colors = [
    "#AEC6CF", // ніжно-блакитний
    "#FFDAB9", // персиковий
    "#E6E6FA", // лаванда
    "#FFFACD", // лимонно-кремовий
    "#D8BFD8", // блідо-фіолетовий
    "#FADADD", // рожевий baby pink
    "#B0E0E6", // блідо-бірюзовий
    "#F5DEB3", // пісочний
    "#E0FFFF", // світло-cyan
    "#E3F9FD", // небесно-блакитний
    "#FFE4E1", // блідо-рожевий
    "#F0FFF0", // м'ятний
    "#FBE7C6", // кремовий
    "#C1E1C1", // пастель зелений
    "#D6AEDD", // ніжний бузок
    "#F8F4FF", // ghost lavender
    "#FFF5EE", // seashell
    "#EFD6AC", // блідо-карамельний
    "#D7E3FC", // пастельний блакитний
    "#FAE1DD", // ніжна рожева пудра
    "#fff",
    "#000",
    "#0D1B2A", // темно-синій індиго
    "#1B263B", // глибокий navy
    "#2C3E50", // темно-синій з сірим відтінком
    "#3E4E50", // сірий з синім вкрапленням
    "#4B3F2F", // темно-коричневий дерев'яний
    "#5C4033", // палений коричневий
    "#2F1B0C", // еспресо
    "#1C1C1C", // майже чорний
    "#2E2E2E", // антрацит
    "#3C3C3C", // темно-сірий
    "#121212", // глибокий чорний
    "#1F1F1F", // smoky black
    "#292929", // гранітний сірий
    "#444444", // сталевий сірий
    "#223843", // темний бірюзово-синій
    "#151E3D", // midnight blue
    "#2B2B2B", // графіт
    "#313639", // вугільний сірий
    "#404040", // neutral charcoal
    "#181818", // глибокий монохромний
  ];

  return (
    <div className={css.page_wrapper}>
      <div className={style.tabs_buttons}>
        <button
          onClick={() => {
            setTab(1);
          }}
          className={buildLinkClass(1)}
        >
          All goods
        </button>
        <button
          onClick={() => {
            setTab(2);
          }}
          className={buildLinkClass(2)}
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
                  <label htmlFor={`${fieldId}-alt`}>
                    <span className={css.form_label}>Alt text</span>
                    <div className={css.input_wrapper}>
                      <Field
                        type="text"
                        name="alt"
                        id={`${fieldId}-alt`}
                        className={css.modal_form_input}
                        style={{
                          outline:
                            errors.fullname && touched.fullname
                              ? "2px solid red"
                              : "",
                        }}
                        placeholder="Alt text"
                        required
                      />
                    </div>
                    <ErrorMessage
                      name="alt"
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
                  <div className={css.checkbox_size_values}>
                    {/* Numeric values */}

                    {!letter && (
                      <label
                        htmlFor="numeric_label"
                        className="subscribe_checkbox"
                      >
                        <span className="checkbox_label">
                          <span
                            className="accept_text"
                            style={{ color: "var(--gray-800)" }}
                          >
                            Numeric value
                          </span>
                        </span>
                        <div className="custom_checkbox">
                          <input
                            type="checkbox"
                            name="numeric_label"
                            id="numeric_label"
                            className="checkbox_input"
                            checked={numeric}
                            onClick={() => setNumeric((prev) => !prev)}
                          />
                          <div className="primary_checkbox"></div>
                        </div>
                      </label>
                    )}
                    {/* Letter values */}
                    {!numeric && (
                      <label htmlFor="letter" className="subscribe_checkbox">
                        <span className="checkbox_label">
                          <span
                            className="accept_text"
                            style={{ color: "var(--gray-800)" }}
                          >
                            Letter values
                          </span>
                        </span>
                        <div className="custom_checkbox">
                          <input
                            type="checkbox"
                            id="letter"
                            name="letter"
                            className="checkbox_input"
                            checked={letter}
                            onClick={() => setLetter((prev) => !prev)}
                          />
                          <div className="primary_checkbox"></div>
                        </div>
                      </label>
                    )}
                  </div>
                  {numeric && (
                    <MuiSizeChacked
                      name="numeric"
                      valuesSize={[...numericValue]}
                    />
                  )}
                  {letter && (
                    <MuiSizeChacked name="size" valuesSize={[...lettetValue]} />
                  )}
                  {/* Colors value */}
                  <MuiColorsChecked name="color" valuesSize={[...colors]} />
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
