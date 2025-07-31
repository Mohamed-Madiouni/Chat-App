import React, { useState, useEffect } from "react";
import "../style/chat.css";
import queryString from "query-string";
import io from "socket.io-client";
import InfoBar from "./InfoBar";
import Input from "./Input";
import Messages from "./Messages";
import TextContainer from "./TextContainer";

let socket;
function Chat({ location }) {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState("");
  const ENDPOINT = "chat-app-d5g4.onrender.com/";
  useEffect(() => {
    const { name, room } = queryString.parse(location.search);
    setRoom(room);
    setName(name);
    socket = io(ENDPOINT);
    // console.log(socket);
    socket.emit("join", { name, room }, () => {});
    return () => {
      socket.off();
    };
  }, [ENDPOINT, location.search]);
  useEffect(() => {
    socket.on("message", (message) => {
      setMessages([...messages, message]);
    });
    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
  }, [messages]);
  const sendMessage = (e) => {
    e.preventDefault();
    if (message) socket.emit("newMessage", message, () => setMessage(""));
  };
  // console.log("message", message, "messages", messages);

  return (
    <div className="outerContainer">
      <div className="container">
        <InfoBar room={room} />
        <Messages messages={messages} name={name} />
        <Input
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </div>
      <TextContainer users={users} />
    </div>
  );
}

export default Chat;
