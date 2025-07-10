import UserTile from "./UserTile";
import css from "./Users.module.css";
// REDUX STORE

import { useSelector, useDispatch } from "react-redux";

import { deleteProfile } from "../../../../../redux/accountSlice";

export default function UsersProfile() {
  const dispatch = useDispatch();

  // CONST

  const USERS = useSelector((state) => state.account.profile);

  // FUNCTION

  const handleDelete = (name) => {
    dispatch(deleteProfile(name));
  };

  return (
    <div className={css.users_page}>
      <table className={css.users_table}>
        <thead>
          <tr className={css.label_table}>
            <th>Email</th>
            <th>Full Name</th>
            <th>Political Config</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {USERS.map((item, index) => {
            return (
              <UserTile
                user={item}
                key={index}
                onDelete={handleDelete}
              ></UserTile>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
