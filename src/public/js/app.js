// import clint from 'socket.io-client';
const ul = document.querySelector('ul')
const clint = io()
let newClint
const createGroupForm = document.querySelector('#createGroupForm')

createGroupForm.addEventListener('submit', (e) => {
    e.preventDefault()
    clint.emit('creatGroup', (e.target.nickname.value), () => {
        clint.disconnect()
         newClint = io(`/${e.target.nickname.value}`)
         newClint.on('newMessage',(message)=>{appendMessage(ul,message)})
    });
    

});
const joinGroup = document.querySelector('#joinGroup')
joinGroup.addEventListener('submit', (e) => {
    e.preventDefault()
     newClint = io(`/${e.target.join.value}`)
    console.log(newClint)
    newClint.on('newMessage',(message)=>{appendMessage(ul,message)})
})


const messageForm = document.querySelector('#messageForm')
messageForm.addEventListener('submit', (e) => {
    e.preventDefault()
     newClint.emit('newMessage',(e.target.message.value))
     appendMessage(ul,(`You said : ${e.target.message.value}`))
    console.log(newClint)
 
    
})



function appendMessage(ul,message){
let li = document.createElement('li')
ul.appendChild(li)
li.textContent=message

}