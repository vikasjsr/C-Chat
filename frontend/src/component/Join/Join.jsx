import React from 'react'
import logo from "../../images/logo.png"
import "./Join.css";
import { Link } from "react-router-dom";
import { useState } from 'react';

let user;

const Join = () => {

    const [name, setname] = useState("");

const sendUser = () => {
    user = document.getElementById('joinInput').value;
    document.getElementById('joinInput').value = "";
}

  return (
    <div className="JoinPage">
      <div className="JoinContainer">
        <img src= {logo} alt = 'logo'/>
        <h1>C - Chat</h1>
        <input onChange={ (e) => setname(e.target.value)} placeholder='Enter your name' type='text' id='joinInput'/>
        {/* in case if someone pressing login without passing something into it then events are being stop */}
        <Link onClick={(event) => !name ? event.preventDefault()  : null} to='/chat'><button onClick={sendUser} className='joinbtn'>Login In</button></Link> 
      </div>
    </div> 
  )
}

export default Join
export  {user}
