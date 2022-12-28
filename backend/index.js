const http = require("http");
const express = require('express');
const cors = require('cors');

const socketIO = require("socket.io");

const app=express();

const users = [{}];

app.get("/chat",(req, res) => {
      res.send('server is working');
})

const port= 4500;

const server=http.createServer(app);

const io=socketIO(server);

io.on("connection",(socket)=>{
  console.log("new connection!");

  // socket.something ('event' , this function will execute);
  // here the data is come from chat.jsx from line number 17 
  // there data is passed as object and as user is accepeted by destructuring the object;

  // first event
  socket.on('joined', ( {user} ) => {
      
      users[socket.id] = user;
      console.log(`${user} has joined`);
      
  //notification will be sent to all others except one who joined ;
      socket.broadcast.emit('userJoined', {user:"Admin", message : ` ${users[socket.id]} has joined`});

      // second event :-
  socket.emit(`welcome`, {user :"Admin", message : `welcome to the chat`});

  })

  socket.on('message', ( { message, id }) =>{
      io.emit('sendMessage', {user:users[id], message, id});
  })

  socket.on('disconnect', () => {
    socket.broadcast.emit('leave', {user:"Admin", message : ` ${users[socket.id]} has left`});
    console.log('user left');
  })


})

server.listen(port, ()=>{
  console.log(`Working on port http://localhost:${port}`);
})