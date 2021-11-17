'use strict';

const express = require("express");
const socket = require("socket.io");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

const server = app.listen("3002", () => {
  console.log("Server Running on Port 3002...");
});

app.set("view engine", "pug");
app.set("views", __dirname + "/views");

app.use("/public", express.static(__dirname + "/public"));
app.get("/", (req, res) => {
  res.render("home");
});

app.get("*", (req, res) => res.redirect("/"));

let io = socket(server);
io.on("connection", (socket) => {
  // console.log(socket.id);
  // console.log(socket.rooms);

  socket.on('creatGroup', (groupName, done) => {
    const of = io.of(groupName)
    of.on("connection", (socket) => {
      socket.on("newMassage", (message) => {
        of.emit('newMassage',(message))
        
    })
  })
    console.log(groupName);
    done()
  })
  
  

  
  // socket.on('joinGroup', (groupName, done) => {
  //   const of = io.of(groupName)
  //   of.on("connection", (socket) => console.log('joined'))
  //   console.log(groupName);
  //   done()
  // })


  // socket.on("join_room", (data) => {
  //   socket.join(data);
  //   console.log("User Joined Room: " + data);
  // });

  // socket.on("send_message", (data) => {
  //   console.log(data);
  //   socket.to(data.room).emit("receive_message", data.content);
  // });

  // socket.on("disconnect", () => {
  //   console.log("USER DISCONNECTED");
  // });
});















// const slack = require('socket.io')(PORT);
// require('dotenv').config()
// const PORT = process.env.PORT || 3001;
// // const group= slack.of()

// const msgQueue = {
//     pickUpData: {},
//     inTransitData: {},
//     deliveredData: {}
// };

// slack.on('connection',(socket)=>{
// console.log('CONNECTED', socket.id)
// slack.on('')



// })