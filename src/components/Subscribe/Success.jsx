import "./muiStyle.css";
import css from "./Subscribe.module.css";
import Button from "@mui/material/Button";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";

const Success = ({ openModal, openSubscribe, formData }) => {
  return (
    <Dialog
      open={openModal}
      onClose={openSubscribe}
      className={css.success_dialog_tile}
    >
      <div className={css.success_info_tile}>
        <h2 className={css.success_title}> Success subscribe</h2>
        <h4 className={css.success_about_text}>
          We have sent a promotional code to your email {formData.email}, which
          will give you up to -20% discount
        </h4>
        <DialogActions>
          <Button onClick={openSubscribe} className={css.cancel_button}>
            Cancel
          </Button>
        </DialogActions>
      </div>
    </Dialog>
  );
};

export default Success;
