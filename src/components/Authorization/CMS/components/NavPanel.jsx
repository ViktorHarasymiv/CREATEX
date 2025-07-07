import {
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";

import css from "./NavPanel.module.css";
import clsx from "clsx";

// ICONS

import { FaRegUser } from "react-icons/fa";
import { RiShoppingCartLine } from "react-icons/ri";
import { FiHeart } from "react-icons/fi";
import { TbEyeSearch } from "react-icons/tb";
import { FaRegStar } from "react-icons/fa";
import { PiSignOutBold } from "react-icons/pi";

// REDUX STORE

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getLogged, setUserInfo } from "../../../../redux/accountSlice";

export default function NavPanel() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  // CONST

  const loggedUser = useSelector((state) => state.account.loggedUser);

  // FUNCTION

  const logOut = () => {
    navigate("/");
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
  };

  const buildLinkClass = (localPath) => {
    return clsx(
      css.panel_link,
      location.pathname.includes(localPath) && css.active
    );
  };

  return (
    <div className={css.account_page_wrapper}>
      <nav className={css.account_panel_navigation}>
        <div className={css.account_user_content_wrapper}>
          <h3 className={css.account_user_fullname}>
            {loggedUser.info.persone.fullname}
          </h3>
          <span className={css.account_user_email}>
            {loggedUser.info.contacts.email}
          </span>
        </div>
        <NavLink
          to={"profile"}
          state={location.state}
          className={buildLinkClass("/profile")}
        >
          <FaRegUser className={css.ico} />
          My Profile
        </NavLink>
        <NavLink
          to={"addProduct"}
          state={location.state}
          className={buildLinkClass("/addProduct")}
        >
          <RiShoppingCartLine className={css.ico} />
          Add product
        </NavLink>
        <NavLink
          to={"wishlist"}
          state={location.state}
          className={buildLinkClass("/wishlist")}
        >
          <FiHeart className={css.ico} />
          Wishlist
        </NavLink>
        <NavLink
          to={"viewed"}
          state={location.state}
          className={buildLinkClass("/viewed")}
        >
          <TbEyeSearch className={css.ico} />
          Recently viewed
        </NavLink>
        <NavLink
          to={"reviews"}
          state={location.state}
          className={buildLinkClass("/reviews")}
        >
          <FaRegStar className={css.ico} />
          My reviews
        </NavLink>
        <button type="button" onClick={logOut} className={css.panel_link}>
          <PiSignOutBold className={css.ico} />
          Sign out
        </button>
      </nav>
      <Outlet />
    </div>
  );
}
