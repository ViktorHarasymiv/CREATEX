import { Link } from "react-router-dom";

import "./authorization.css";

import { MdOutlineAccountCircle } from "react-icons/md";

function Authorization({ switchSignIn, switchSignUp }) {
  return (
    <div className="authorization_tile">
      <MdOutlineAccountCircle
        style={{ fontSize: "18px", marginRight: "8px  " }}
      />
      <Link onClick={switchSignIn}>Log In</Link>
      <span style={{ marginInline: "5px" }}>/</span>
      <Link onClick={switchSignUp}>Sign Up</Link>
    </div>
  );
}

export default Authorization;
