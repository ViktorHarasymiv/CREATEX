import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

// ICONS

import signOutIco from "../../../../public/icons/auth/SignOut.png";

// REDUX STORE
import { useDispatch } from "react-redux";
import { getLogged, setUserInfo } from "../../../redux/accountSlice";

import css from "./TopTile.module.css";

import Phone from "./Phone/Phone";
import Navigation from "./Navigation/Navigation";
import Currency from "./Сurrency/Сurrency";
import Authorization from "../../Authorization/Authorization";
import { useEffect } from "react";

function TopTile({ active, setValute, valute }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.account.profile);
  const isLogged = useSelector((state) => state.account.isLogged);
  const loggedUser = useSelector((state) => state.account.loggedUser);

  useEffect(() => {
    if (!isLogged) {
      navigate("/");
    }
  }, [isLogged]);

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
    <div className={css.top_tile_wrapper}>
      <div className="container">
        <div className={css.top_tile}>
          {!active && (
            <>
              <Phone />
              <Navigation />
            </>
          )}
          <Currency setValute={setValute} valute={valute} />
          {isLogged == false ? (
            <Authorization />
          ) : (
            <div className={css.auth_content_tile}>
              <NavLink
                to={
                  loggedUser.info.persone.role == "user" ? "/account" : "/admin"
                }
                className={css.auth_user_tile}
              >
                <span className={css.auth_welcome_text}>Welcome,</span>
                {loggedUser?.info?.persone?.fullname}
              </NavLink>
              <button
                type="button"
                onClick={logOut}
                className={css.sign_out_button}
              >
                Sign out
                <img src={signOutIco} alt="signOutIco" width={15} height={15} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TopTile;
