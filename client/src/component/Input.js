import React from "react";
import "../style/input.css";

function Input({message,setMessage,sendMessage}) {
  return (
    <form className="form">
      <input
        type="text"
        className="input"
        placeholder="Type a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={(e) => e.key === "Enter" && sendMessage(e)}
      />
      <button className="sendButton" onClick={(event)=>sendMessage(event)}>Send</button>
    </form>
  );
}

export default Input;
