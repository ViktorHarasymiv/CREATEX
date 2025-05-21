import { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useSelector, useDispatch } from "react-redux";
import * as Yup from "yup";
import { useId } from "react";

import { updateShipping } from "../../../redux/orderSlice";

import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import style from "./AddressForm.module.css";

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

  // COUNTRY

  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");

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
              <legend className={style.legend_form_label}>Client Info</legend>
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
                Phone
                <Field
                  type="number"
                  name="code"
                  placeholder="Your ZIP code"
                  className={style.legend_form_input}
                />
                <ErrorMessage
                  name="code"
                  component="span"
                  className={style.error}
                />
              </label>
            </fieldset>
            <button type="submit">Save</button>
          </Form>
        </Formik>
      ) : (
        shippingInfoItem && (
          <div className={style.shipping_info_succsess_tile}>
            <div className={style.shipping_info_tile}>
              Full name:
              <span>{shippingInfoItem.firstName}</span>
              <span>{shippingInfoItem.lastName}</span>
            </div>
            <div className={style.shipping_info_tile}>
              <span>Telephone: {shippingInfoItem.phone}</span>
              <span>E-mail: {shippingInfoItem.email}</span>
            </div>
            <div className={style.shipping_info_tile}>
              <span>Street: {shippingInfoItem.address}</span>
              <span>Country: {shippingInfoItem.country}</span>
              <span>City: {shippingInfoItem.city}</span>
            </div>
          </div>
        )
      )}
    </>
  );
}
