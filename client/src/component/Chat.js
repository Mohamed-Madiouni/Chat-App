import React, { useState, useEffect } from "react";
import "../style/chat.css";
import queryString from "query-string";
import io from "socket.io-client";
import InfoBar from "./InfoBar";
import Input from "./Input";
import Messages from "./Messages";

let socket;
function Chat({ location }) {
  
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const ENDPOINT = "localhost:5100";
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
  }, [messages]);
  const sendMessage = (e) => {
    e.preventDefault();
    if (message) socket.emit("newMessage", message, () => setMessage(""));
  };
  // console.log("message", message, "messages", messages);
  
  return (
    <div className="outerContainer">
      <div className="container">
        <InfoBar room={room}/>
        <Messages messages = {messages} name={name}/>
        <Input message={message} setMessage={setMessage} sendMessage={sendMessage}/>

      </div>
     
    </div>
  );
}

export default Chat;
