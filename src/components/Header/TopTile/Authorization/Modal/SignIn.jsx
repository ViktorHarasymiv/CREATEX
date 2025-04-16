import React from "react";

function SignIn({ overlay, content, closePage }) {
  return (
    <div style={overlay}>
      <div style={content}>
        <button onClick={closePage}>Esc</button>
      </div>
    </div>
  );
}

export default SignIn;
