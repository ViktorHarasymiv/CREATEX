import React from "react";

function Registration({ overlay, content, closePage }) {
  return (
    <div style={overlay}>
      <div style={content}>
        <button onClick={closePage}>Esc</button>
      </div>
    </div>
  );
}

export default Registration;
