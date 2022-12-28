import React from 'react'
import socketIo from "socket.io-client";
import {user} from "../Join/Join.jsx";
import "./Chat.css"
import {useState, useEffect } from 'react';
import Messages from '../Messages/Messages.jsx';
import sendLogo from "../../images/send.png";
import closeIcon from "../../images/closeIcon.png"
import ReactScrollToBottom from "react-scroll-to-bottom";

const ENDPOINT = "http://localhost:4500/"

let socket;

const Chat = () => {

  const [id, setid] = useState("");
  const [messages, setMessages] = useState([]);

  const send = () => {
      const message = document.getElementById('chatInput').value;
      socket.emit('message', { message, id });
      document.getElementById('chatInput').value = "";
  }


  useEffect(() => {

    socket = socketIo(ENDPOINT, { transports : ['websocket'] });

    socket.on('connect',() => {
      alert('connected');
      setid(socket.id);
    })

    // socket.something ('event' , this function will execute);
    // here emit means at 'joined' event send the user
    socket.emit('joined',{ user });

    socket.on('welcome', (data) => {
      setMessages([...messages, data]);
        // console.log(data.user, data.message);
    })

    socket.on('userJoined',( data ) => {
      setMessages([...messages, data]);
        // console.log(data.user, data.message);
    })

    socket.on('leave',( data ) => {
      setMessages([...messages, data]);
      // console.log(data.user, data.message);
  })

    return () => {
       socket.emit('disconnect');
       socket.off();
    }
  }, []);

  useEffect(() => {
    socket.on('sendMessage', ( data ) => {
      setMessages([...messages, data]);
      console.log(data.user, data.message, data.id);
    })

  return () => {
    socket.off();
  }

  },[messages]);

  return (
    <div className="chatPage">
      <div className="chatContainer">
          <div className="header">
          <h2>C CHAT</h2>
            <a href="/"> <img src={closeIcon} alt="Close" /></a>
          </div>
          <ReactScrollToBottom className="chatBox">
            {
              messages.map((item, i) => <Messages user={item.id === id ? '' : item.user} message={item.message} classs={item.id === id ? 'right' : 'left'} />)
            }
          </ReactScrollToBottom>
          <div className="inputBox">
              <input onKeyPress={(event) => event.key === 'Enter' ? send() : null} type="text" id='chatInput'/>
              <button onClick={send} className='sendBtn'><img src={sendLogo} alt='not send'/></button>
          </div>
      </div>
    </div>
  )
}

export default Chat
