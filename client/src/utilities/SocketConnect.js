import io from 'socket.io-client'

const socket = io(process.env.VUE_APP_WS_URL)
window.socket = socket

export function authWS(username,room) {
  if (username) {
    socket.open()
    socket.emit('newUser', {username,room})
  }
}

export function sendChatMessage(msg, user) {
  socket.emit('chatMessage', { msg: msg, user: user })
}

export function getMessages(updateMessages) {
  socket.on('message', (message) => {
    updateMessages({ ...message, isNotification: false })
  })
  socket.on('loggedIn', (message) => {
    updateMessages({ ...message, isNotification: true })
  })
}

export function getUsers(updateUsersArray) {
  socket.on('userList', (userList) => {
    console.log(userList)
    updateUsersArray(userList)
  })
}

export function closeConnection() {
  socket.close()
}
