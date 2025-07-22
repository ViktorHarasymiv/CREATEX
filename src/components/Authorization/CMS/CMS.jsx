import { NavLink, Outlet, useLocation, useParams } from "react-router-dom";

import HistoryBar from "../../HistoryBar/HistoryBar";

// STYLE

import css from "./CMS.module.css";

// REDUX STORE

import { useSelector, useDispatch } from "react-redux";

import { getLogged, setUserInfo } from "../../../redux/accountSlice";

// COMPONENT

import NavPanel from "./components/NavPanel";

export default function CMS() {
  const dispatch = useDispatch();

  // CONST

  const profile = useSelector((state) => state.account.profile);
  const loggedUser = useSelector((state) => state.account.loggedUser);

  return (
    <main className="main">
      <HistoryBar></HistoryBar>
      <div className="container">
        <div className={css.wrapper}>
          <div className={css.admin_page}>
            <h3 className={css.admin_text}>
              Hello, admin, have a good and productive day!
            </h3>
          </div>
          <NavPanel />
        </div>
      </div>
    </main>
  );
}
