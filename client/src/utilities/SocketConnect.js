import io from 'socket.io-client'

const socket = io(process.env.VUE_APP_WS_URL)
window.socket = socket

export function authWS(username) {
	socket.emit('loggedIn',username)
}

export function sendChatMessage(msg,user) {
  socket.emit('chatMessage', {msg:msg, user:user})
}

export function getMessages(updateMessages) {
  socket.on('message', (msg) => {
    updateMessages({...msg,isNotification:false})
  })
  socket.on('loggedIn', (msg) => {
    updateMessages({...msg,isNotification:true})
  })
}
