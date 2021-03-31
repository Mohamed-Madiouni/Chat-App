import React from 'react'
import ScrollToBottom from "react-scroll-to-bottom"
import Message from "./Message"
import "../style/messages.css"
function Messages({messages,name}) {
    return (
        <ScrollToBottom className="messages">
{messages.map((message,i)=> <div key={i}><Message name={name} message={message}/></div> )}
        </ScrollToBottom>
    )
}
export default Messages
