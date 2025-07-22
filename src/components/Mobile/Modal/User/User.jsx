import { NavLink, useNavigate } from "react-router-dom";

// REDUX STORE
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getLogged, setUserInfo } from "../../../../redux/accountSlice";

import Authorization from "../../../Authorization/Authorization";

// ICONS

import { CiLogout } from "react-icons/ci";

import Avatar from "./icons/avatar.svg";

import css from "./User.module.css";

export default function User({ onClick }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLogged = useSelector((state) => state.account.isLogged);
  const loggedUser = useSelector((state) => state.account.loggedUser);

  const logOut = () => {
    setTimeout(() => {
      dispatch(getLogged(false));
      dispatch(
        setUserInfo({
          persone: { fullname: "", password: "", role: "" },
          contacts: { email: "" },
          logged: false,
          loggedTime: "",
          political: false,
        })
      );
    }, 400);
    navigate("/");
  };

  return (
    <>
      {isLogged == false ? (
        <Authorization />
      ) : (
        <div className={css.user_panel}>
          <div className={css.user_wrapper}>
            <img src={Avatar} alt="" className={css.user_avatar} />
            <div className={css.user_actions}>
              <NavLink
                to={
                  loggedUser.info.persone.role == "user" ? "/account" : "/admin"
                }
                className={css.auth_user_tile}
              >
                <span onClick={onClick} className={css.auth_welcome_text}>
                  Welcome,
                </span>
                {loggedUser?.info?.persone?.fullname}
              </NavLink>
              <button
                type="button"
                onClick={logOut}
                className={css.sign_out_button}
              >
                Sign out
                <CiLogout width={8} height={8} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
