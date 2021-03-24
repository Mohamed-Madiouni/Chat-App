import React, { useState, useEffect } from "react";
import "../style/chat.css";
import queryString from "query-string";
import io from "socket.io-client";

let socket;

function Chat({ location }) {
  const [name, setName] = useState("ali");
  const [room, setRoom] = useState("");
  const ENDPOINT = "localhost:5100";
  useEffect(() => {
    const { name, room } = queryString.parse(location.search);
    setRoom(room);
    setName(name);
    socket = io(ENDPOINT);
    socket.emit("join", { name, room },(res)=>console.log(res));
    return () => {
      socket.off();
    };
  }, [ENDPOINT, location.search]);
  return (
    <div>
      <h1>{name}</h1>
    </div>
  );
}

export default Chat;
