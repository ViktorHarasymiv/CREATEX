import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";

import css from "./NavPanel.module.css";
import clsx from "clsx";

// ICONS

import { FaRegUser } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { RiShoppingCartLine } from "react-icons/ri";
import { LuUsers } from "react-icons/lu";
import { TfiLayoutSliderAlt } from "react-icons/tfi";
import { PiSignOutBold } from "react-icons/pi";
import { SiWikibooks } from "react-icons/si";

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
  const USERS = useSelector((state) => state.account.profile);
  const goods = useSelector((state) => state.goods.items);
  const sliders = useSelector((state) => state.slider.items);

  // FUNCTION

  const logOut = () => {
    setTimeout(() => {
      dispatch(
        setUserInfo({
          persone: { fullname: "", password: "", role: "" },
          contacts: { email: "" },
          logged: false,
          loggedTime: "",
          political: false,
        })
      );
      dispatch(getLogged(false));
    }, 400);
    navigate("/");
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
          <NavLink to={"/admin"} className={css.userNameLink}>
            <h3 className={css.account_user_fullname}>
              {loggedUser.info.persone.fullname}
            </h3>
          </NavLink>
          <span className={css.account_user_email}>
            {loggedUser.info.contacts.email}
          </span>
        </div>
        {/* Profile */}
        <NavLink
          to={"profile"}
          state={location.state}
          className={buildLinkClass("/profile")}
        >
          <FaRegUser className={css.ico} />
          My Profile
        </NavLink>
        {/* Registered */}
        <NavLink
          to={"users"}
          state={location.state}
          className={buildLinkClass("/users")}
        >
          <span className={css.span_container}>
            <LuUsers className={css.ico} />
            Registered
          </span>
          <div className={css.account_amount_badge}>{USERS.length}</div>
        </NavLink>
        {/* Add product */}
        <NavLink
          to={"setGoods"}
          state={location.state}
          className={buildLinkClass("/setGoods")}
        >
          <span className={css.span_container}>
            <RiShoppingCartLine className={css.ico} />
            Goods
          </span>
          <div className={css.account_amount_badge}>{goods.length}</div>
        </NavLink>
        {/* Hero slider */}
        <NavLink
          to={"setHero"}
          state={location.state}
          className={buildLinkClass("/setHero")}
        >
          <span className={css.span_container}>
            <TfiLayoutSliderAlt className={css.ico} />
            Hero slider
          </span>
          <div className={css.account_amount_badge}>{sliders.length}</div>
        </NavLink>
        {/* Blog */}
        <NavLink
          to={"setBlog"}
          state={location.state}
          className={buildLinkClass("/setBlog")}
        >
          <SiWikibooks className={css.ico} />
          Blog
        </NavLink>
        {/* Root */}
        <NavLink
          to={"root"}
          state={location.state}
          className={buildLinkClass("/root")}
        >
          <IoSettingsOutline className={css.ico} />
          Root
        </NavLink>
        {/* SIGN OUT */}
        <button type="button" onClick={logOut} className={css.panel_link}>
          <PiSignOutBold className={css.ico} />
          Sign out
        </button>
      </nav>
      <Outlet />
    </div>
  );
}
