import { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useSelector, useDispatch } from "react-redux";
import * as Yup from "yup";
import { useId } from "react";

import { updateShipping, deleteShipping } from "../../../redux/orderSlice";

import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import style from "./AddressForm.module.css";
import checkbox from "../../Subscribe/Subscribe.module.css";

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  country: "",
  city: "",
  address: "",
  code: "",
};

const OrderFormSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "First name must be at least 2 characters")
    .max(30, "First name is too long")
    .required("First name is required"),
  lastName: Yup.string()
    .min(2, "Last name must be at least 2 characters")
    .max(30, "Last name is too long")
    .required("Last name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  phone: Yup.string()
    .min(9, "Phone must be at least 11 characters")
    .max(12, "Phone is too long")
    .required("Phone is required"),
  address: Yup.string()
    .min(2, "Address must be at least 2 characters")
    .max(30, "Address name is too long")
    .required("Address name is required"),
  code: Yup.string().required("Postal code is required"),
});

export default function AddressForm() {
  const dispatch = useDispatch();

  const fakture = useSelector((state) => state.order.fakture);

  /* SHIPPING */

  const [address, setAddrees] = useState(null);

  /* ADDRESS */

  useEffect(() => {
    if (address == null) {
      return;
    } else {
      dispatch(updateShipping(address));
    }
  }, [address]);
  const fieldId = useId();

  const handleSubmit = (values, actions) => {
    initialValues.firstName = values.firstName;
    values.country = country;
    values.city = city;
    setAddrees(values);

    setCountry("");
    setCity("");
    actions.resetForm();
  };

  const shippingInfoItem = fakture.find(
    (item) => item.shippingInfo
  )?.shippingInfo;
  console.log(shippingInfoItem);

  // COUNTRY, CITY

  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");

  const deleteFormInfo = () => {
    if (shippingInfoItem) {
      dispatch(deleteShipping());
      setAgree(false);
    }
  };

  // AGREE

  const [agree, setAgree] = useState(false);

  const handleChange = (event) => {
    setAgree(event.target.checked);
  };

  return (
    <>
      {!shippingInfoItem ? (
        <Formik
          initialValues={initialValues}
          validationSchema={OrderFormSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <fieldset className={style.legend_form_tile}>
              <legend className="visually-hidden">Client Info</legend>
              {/* FIRST NAME */}
              <label
                htmlFor={`${fieldId}-firstName`}
                className={style.legend_form_input_label}
              >
                First Name
                <Field
                  type="text"
                  name="firstName"
                  placeholder="Your first name"
                  className={style.legend_form_input}
                />
                <ErrorMessage
                  name="firstName"
                  component="span"
                  className={style.error}
                />
              </label>
              {/* LAST NAME */}
              <label
                htmlFor={`${fieldId}-lastName`}
                className={style.legend_form_input_label}
              >
                Last Name
                <Field
                  type="text"
                  name="lastName"
                  placeholder="Your last name"
                  className={style.legend_form_input}
                />
                <ErrorMessage
                  name="lastName"
                  component="span"
                  className={style.error}
                />
              </label>
              {/* E-MAIL */}
              <label
                htmlFor={`${fieldId}-email`}
                className={style.legend_form_input_label}
              >
                Email
                <Field
                  type="email"
                  name="email"
                  placeholder="Your working email"
                  className={style.legend_form_input}
                />
                <ErrorMessage
                  name="email"
                  component="span"
                  className={style.error}
                />
              </label>
              {/* PHONE */}
              <label
                htmlFor={`${fieldId}-phone`}
                className={style.legend_form_input_label}
              >
                Phone
                <Field
                  type="number"
                  name="phone"
                  placeholder="Your phone number"
                  className={style.legend_form_input}
                />
                <ErrorMessage
                  name="phone"
                  component="span"
                  className={style.error}
                />
              </label>
              {/* COUNTRY */}
              <label
                htmlFor={`${fieldId}-country`}
                className={style.legend_form_input_label}
              >
                <span style={{ marginBottom: 10 }}>Country</span>
                <FormControl
                  sx={{ m: 1, minWidth: 120 }}
                  className={style.legend_form_select_tile}
                  name="country"
                >
                  <Select
                    value={country}
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                    onChange={(event) => {
                      setCountry(event.target.value);
                    }}
                    className={style.legend_form_select}
                  >
                    <MenuItem value="">
                      <em>Choose your country</em>
                    </MenuItem>
                    <MenuItem value="Ukraine">Ukraine</MenuItem>
                    <MenuItem value="Poland">Poland</MenuItem>
                    <MenuItem value="Germany">Germany</MenuItem>

                    <MenuItem value="Italy">Italy</MenuItem>
                    <MenuItem value="France">France</MenuItem>
                  </Select>
                </FormControl>
              </label>
              {/* CITY */}
              <label
                htmlFor={`${fieldId}-city`}
                className={style.legend_form_input_label}
              >
                <span style={{ marginBottom: 10 }}>City</span>
                <FormControl
                  sx={{ m: 1, minWidth: 120 }}
                  className={style.legend_form_select_tile}
                  name="city"
                >
                  <Select
                    value={city}
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                    onChange={(event) => {
                      setCity(event.target.value);
                    }}
                    disabled={country.length > 0 ? false : true}
                    className={style.legend_form_select}
                  >
                    <MenuItem value="">
                      <em>
                        {country.length > 0
                          ? "Choose your city"
                          : "First select a city"}
                      </em>
                    </MenuItem>

                    {country == "Ukraine" && (
                      <MenuItem value="Lwow">Lwow</MenuItem>
                    )}
                    {country == "Poland" && (
                      <MenuItem value="Warszawa">Warszawa</MenuItem>
                    )}
                  </Select>
                </FormControl>
              </label>
              {/* ADDRESS */}
              <label
                htmlFor={`${fieldId}-address`}
                className={style.legend_form_input_label}
              >
                Address
                <Field
                  type="text"
                  name="address"
                  placeholder="Your address"
                  className={style.legend_form_input}
                />
                <ErrorMessage
                  name="address"
                  component="span"
                  className={style.error}
                />
              </label>
              {/* ZIP CODE */}
              <label
                htmlFor={`${fieldId}-code`}
                className={style.legend_form_input_label}
              >
                Postal code
                <Field
                  type="text"
                  name="code"
                  placeholder="Your postal code"
                  className={style.legend_form_input}
                />
                <ErrorMessage
                  name="code"
                  component="span"
                  className={style.error}
                />
              </label>
            </fieldset>
            <div className={style.form_actions_button}>
              <label
                htmlFor={`${fieldId}-agree-checkbox`}
                className={checkbox.subscribe_checkbox}
              >
                <span className={checkbox.checkbox_label}>
                  I agree to receive communications from Createx Store.
                </span>
                <div className={checkbox.custom_checkbox}>
                  <input
                    onChange={handleChange}
                    className={checkbox.checkbox_input}
                    type="checkbox"
                    id={`${fieldId}-agree-checkbox`}
                    name={`${fieldId}-agree-checkbox`}
                    defaultChecked={agree}
                  />
                  <div className={checkbox.primary_checkbox}></div>
                </div>
              </label>
              <button
                type="submit"
                className={style.form_delete_button}
                disabled={!agree}
              >
                Save
              </button>
            </div>
          </Form>
        </Formik>
      ) : (
        shippingInfoItem && (
          <>
            <div className={style.shipping_info_succsess_tile}>
              <div className={style.shipping_info_tile}>
                <div>
                  <h5>Full name:</h5>
                  <p className={style.shipping_info_text}>
                    <span>
                      {address.firstName}
                      {address.lastName}
                    </span>
                  </p>
                </div>
                <div>
                  <h5>E-mail:</h5>
                  <p className={style.shipping_info_text}>
                    <span>{address.email}</span>
                  </p>
                </div>
                <div>
                  <h5>Telephone:</h5>
                  <p className={style.shipping_info_text}>
                    <span>{address.phone}</span>
                  </p>
                </div>
              </div>
              <div className={style.shipping_info_tile}>
                <div>
                  <h5>Country:</h5>
                  <p className={style.shipping_info_text}>
                    <span>{address.country ? address.country : "-"}</span>
                  </p>
                </div>
                <div>
                  <h5>City:</h5>
                  <p className={style.shipping_info_text}>
                    <span>
                      {address.city ? address.city : "-"} ({address.code})
                    </span>
                  </p>
                </div>
                <div>
                  <h5>Street:</h5>
                  <p className={style.shipping_info_text}>
                    <span>{address.address}</span>
                  </p>
                </div>
              </div>
              <button
                onClick={deleteFormInfo}
                className={style.form_delete_button}
              >
                Delete
              </button>
            </div>
          </>
        )
      )}
    </>
  );
}
