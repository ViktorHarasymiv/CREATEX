import React, { useState } from "react";

import "./muiStyle.css";
import css from "./Subscribe.module.css";

import Button from "@mui/material/Button";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";

function Subscribe({ isSubscribe, openSubscribe }) {
  const [successModal, setSuccessModal] = useState(false);
  const [formData, setFormData] = useState({
    gender: "",
    email: "",
    checkbox: "",
  });

  return (
    <>
      <Dialog
        open={isSubscribe}
        onClose={openSubscribe}
        slotProps={{
          paper: {
            component: "form",
            onSubmit: (event) => {
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
            },
          },
        }}
      >
        <div className={css.success_tile}>
          <h2 className={css.subscribe_title}>Subscribe for updates</h2>
          <DialogContent>
            <h3 className={css.subscribe_sub_title}>
              Subscribe for exclusive early sale access and new arrivals.
            </h3>
            <div className={css.radio_tile}>
              {["Women", "Men", "Girls", "Boys"].map((gender) => (
                <div key={gender}>
                  <input
                    type="radio"
                    id={gender}
                    name="gender"
                    value={gender}
                  />
                  <label className="radio_label" htmlFor={gender}>
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
                autoFocus
                required
              />
              <Button type="submit" className={css.subscribe_button}>
                Subscribe
              </Button>
            </label>
            <label htmlFor="checkbox" className={css.subscribe_checkbox}>
              <span className={css.checkbox_label}>
                I agree to receive communications from Createx Store.
              </span>
              <div className={css.custom_checkbox}>
                <input
                  className={css.checkbox_input}
                  type="checkbox"
                  id="checkbox"
                  name="checkbox"
                  defaultChecked={true}
                />
                <div className={css.primary_checkbox}></div>
              </div>
            </label>
          </DialogContent>
          <DialogActions>
            <Button className={css.cancel_button} onClick={openSubscribe}>
              Cancel
            </Button>
          </DialogActions>
        </div>
      </Dialog>
      <Dialog
        open={successModal}
        onClose={openSubscribe}
        className={css.success_dialog_tile}
      >
        <div className={css.success_info_tile}>
          <h2 className={css.success_title}> Success subscribe</h2>
          <span className={css.success_info}>
            <b>Email:</b> {formData.email}
          </span>
          <span className={css.success_info}>
            <b>Gender:</b> {formData.gender}
          </span>
          <span className={css.success_info}>
            <b>Config:</b> {formData.checkbox}
          </span>
        </div>
        <DialogActions>
          <Button onClick={openSubscribe} className={css.cancel_button}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Subscribe;
