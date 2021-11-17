// import clint from 'socket.io-client';
const ul = document.querySelector("ul");
const clint = io();
let newClint;

const createGroupForm = document.querySelector("#createGroupForm");
const messageForm = document.getElementById("messageForm");
const nickname = document.getElementById("nickname");
messageForm.hidden = true;
nickname.hidden = true;
createGroupForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (newClint) {
    newClint.disconnect();
    clint.emit("creatGroup", e.target.nickname.value, () => {
      clint.disconnect();
      newClint = io(`/${e.target.nickname.value}`);
      newClint.on("newMessage", (message) => {
        console.log(message);
        appendMessage(ul, message);
      });
    });
  } else {
    clint.emit("creatGroup", e.target.nickname.value, () => {
      clint.disconnect();
      newClint = io(`/${e.target.nickname.value}`);
      newClint.on("newMessage", (message) => {
        console.log(message);
        appendMessage(ul, message);
      });
    });
  }
  messageForm.hidden = false;
  nickname.hidden = false;
});

const joinGroup = document.querySelector("#joinGroup");
joinGroup.addEventListener("submit", (e) => {
  e.preventDefault();

  if (newClint) {
    newClint.disconnect();
    newClint = io(`/${e.target.join.value}`);
    ul.textContent = "";
    newClint.on("newMessage", (message) => {
      appendMessage(ul, message);
    });
  } else {
    newClint = io(`/${e.target.join.value}`);
    ul.innerHTML = "";
    newClint.on("newMessage", (message) => {
      appendMessage(ul, message);
    });
  }
  messageForm.hidden = false;
  nickname.hidden = false;
});

messageForm.addEventListener("submit", (e) => {
  e.preventDefault();
  newClint.emit("newMessage", e.target.message.value);
  appendMessage(ul, `You said : ${e.target.message.value}`);
});

nickname.addEventListener("submit", (e) => {
  e.preventDefault();
  newClint.emit("nickName", e.target.nickname.value);
});
/**
 * @param {HTMLUListElement} ul
 * @param {string} message
 * render li and add a message to ul
 * @description render li and add a message to ul
 * @returns {void}
 * @example appendMessage(ul, "hello");
 */
function appendMessage(ul, message) {
  let li = document.createElement("li");
  ul.appendChild(li);
  li.textContent = message;
}
