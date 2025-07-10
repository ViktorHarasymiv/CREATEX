import css from "./Users.module.css";

import { AiOutlineDelete } from "react-icons/ai";
export default function UserTile({
  user: { fullname, email, acceptConfig },
  key,
  onDelete,
}) {
  // FUNCTION

  return (
    <tr key={key} className={css.user_item}>
      <td>{email}</td>
      <td>{fullname}</td>
      <td>{acceptConfig ? "Yes" : "No"}</td>
      <td>
        <button onClick={() => onDelete(email)} className={css.delete_button}>
          <AiOutlineDelete className={css.delete_ico} />
          Delete account
        </button>
      </td>
    </tr>
  );
}
3;
