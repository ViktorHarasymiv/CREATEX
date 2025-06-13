import Search from "../../Header/MiddleTile/Search/Search";
import { CgClose } from "react-icons/cg";
import css from "./Modal.module.css";

import Navigation from "./Navigation";
import User from "./User/User";

const overlay = {
  zIndex: "9999",
  position: "fixed",

  top: "0",
  bottom: "0",
  left: "0",
  right: "0",

  backgroundColor: "rgba(0, 0, 0, 0.7)",
};

function Modal({ setOpen }) {
  return (
    <div style={overlay}>
      <div className={css.content}>
        <button onClick={setOpen} className={css.modal_nav_close}>
          <CgClose />
        </button>
        <div className={css.user_function_panel}>
          <User />
          <Search></Search>
        </div>
        <Navigation setOpen={setOpen}></Navigation>
      </div>
    </div>
  );
}

export default Modal;
