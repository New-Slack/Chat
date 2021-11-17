"use strict";

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
const queue = {};
let io = socket(server);
io.on("connection", (socket) => {
  socket.on("creatGroup", (groupName, done) => {
    const group = io.of(groupName);
    queue[groupName] = [];
    group.on("connection", (groupSocket) => {
      groupSocket.nickName = "Anonymous";

      groupSocket.on("newMessage", (message) => {
        queue[groupName].push(`${groupSocket.nickName}: ${message}`);
        console.log(queue);
        group.sockets.forEach((socket) => {
          if (socket !== groupSocket)
            socket.emit("newMessage", `${groupSocket.nickName}: ${message}`);
        });
      });

      groupSocket.on(
        "nickName",
        (nickname) => (groupSocket.nickName = nickname)
      );

      console.log(queue);
      queue[groupName].forEach((message) => {
        groupSocket.emit("newMessage", message);
      });
    });

    done();
  });
});
