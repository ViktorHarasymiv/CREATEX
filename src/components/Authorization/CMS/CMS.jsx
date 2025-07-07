import { NavLink, Outlet, useLocation, useParams } from "react-router-dom";

import HistoryBar from "../../HistoryBar/HistoryBar";

// STYLE

import css from "./CMS.module.css";

// REDUX STORE

import { useSelector, useDispatch } from "react-redux";

import { getLogged, setUserInfo } from "../../../redux/accountSlice";
import NavPanel from "./components/NavPanel";

export default function CMS() {
  const dispatch = useDispatch();

  // CONST

  const profile = useSelector((state) => state.account.profile);
  const loggedUser = useSelector((state) => state.account.loggedUser);

  return (
    <div>
      <HistoryBar></HistoryBar>
      <div className="container">
        <NavPanel />
      </div>
    </div>
  );
}
