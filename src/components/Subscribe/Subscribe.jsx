import React, { useState } from "react";
import { css } from "styled-components";

import { IoCloseOutline } from "react-icons/io5";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Button from "@mui/material/Button";

import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

// const overlay = {
//   zIndex: "9999",
//   position: "fixed",

//   width: "100vw",
//   height: "100vh",

//   backgroundColor: "transparent",
// };

// const content = {
//   zIndex: "9999",
//   position: "fixed",

//   top: "50%",
//   left: "50%",

//   transform: "translate(-50%, -50%)",

//   backgroundColor: "var(--white)",
// };

function Subscribe({ isSubscribe, openSubscribe }) {
  const [formData, setFormData] = useState({
    radio: "",
    email: "",
    checkbox: "",
  });

  console.log(formData);

  return (
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
              radio: formJson.radio || prevData.radio,
            }));
            alert(`Welcome, ${formJson.email}`);
          },
        },
      }}
    >
      <DialogTitle>Subscribe for updates</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Subscribe for exclusive early sale access and new arrivals.
        </DialogContentText>
        <FormLabel
          style={{
            display: "none",
          }}
          id="subscribe_checked_inputs"
        >
          Gender
        </FormLabel>
        <RadioGroup
          row
          aria-labelledby="subscribe_checked_inputs"
          name="radio"
          required
        >
          <FormControlLabel value="Women" control={<Radio />} label="Women" />
          <FormControlLabel value="Men" control={<Radio />} label="Men" />
          <FormControlLabel value="Girls" control={<Radio />} label="Girls" />
          <FormControlLabel value="Boys" control={<Radio />} label="Boys" />
        </RadioGroup>
        <TextField
          autoFocus
          required
          margin="dense"
          id="name"
          name="email"
          label="Your working email"
          type="email"
          fullWidth
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={openSubscribe}>Cancel</Button>
        <Button type="submit">Subscribe</Button>
      </DialogActions>
    </Dialog>
  );
}

export default Subscribe;
