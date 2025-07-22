import { useState } from "react";
import css from "./Subscribe.module.css";

import Button from "@mui/material/Button";

import deliveryImage from "./icons/delivery.png";

export default function SubscribePage() {
  const [successModal, setSuccessModal] = useState(false);
  const [formData, setFormData] = useState({
    gender: "",
    email: "",
    checkbox: "",
  });

  return (
    <div className={css.subscribe_page}>
      <div className="container">
        <div className={css.subscribe_page_wrapper}>
          <form
            onSubmit={(event) => {
              event.preventDefault();

              const formDataObj = new FormData(event.currentTarget);
              const formJson = Object.fromEntries(formDataObj.entries());

              setFormData((prevData) => ({
                ...prevData,
                email: formJson.email || prevData.email,
                gender: formJson.gender || prevData.gender,
                checkbox: formJson.checkbox ? "true" : "false",
              }));

              setSuccessModal(true);
            }}
          >
            <div className={css.success_tile}>
              <h2 className={css.subscribe_title}>Subscribe for updates</h2>
              <div>
                <h3 className={css.subscribe_sub_title}>
                  Subscribe for exclusive early sale access and new arrivals.
                </h3>
                <div className={css.radio_tile}>
                  {["Women", "Men", "Girls", "Boys"].map((gender) => (
                    <div key={gender}>
                      <input
                        id={`subscribe-${gender}`}
                        type="radio"
                        name="gender"
                        value={gender}
                      />
                      <label
                        className="radio_label"
                        htmlFor={`subscribe-${gender}`}
                      >
                        {gender}
                      </label>
                    </div>
                  ))}
                </div>
                <label className={css.email_label} htmlFor="email">
                  <span>Email</span>
                  <input
                    type="email"
                    id="name"
                    name="email"
                    placeholder="Your working email"
                    pattern="^\w+(\.\w+)?@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$"
                    maxLength={30}
                    required
                  />
                  <Button type="submit" className={css.subscribe_button}>
                    Subscribe
                  </Button>
                </label>
                <label htmlFor="checkbox" className="subscribe_checkbox">
                  <span className="checkbox_label">
                    <span className="accept_text">
                      I agree to receive communications from Createx Store.
                    </span>
                  </span>
                  <div className="custom_checkbox">
                    <input
                      className="checkbox_input"
                      type="checkbox"
                      id="checkbox"
                      name="checkbox"
                      defaultChecked={true}
                    />
                    <div className="primary_checkbox"></div>
                  </div>
                </label>
              </div>
            </div>
          </form>
          <div className={css.subscribe_image}>
            <img src={deliveryImage} alt="Delivery image" />
          </div>
        </div>
      </div>
    </div>
  );
}
