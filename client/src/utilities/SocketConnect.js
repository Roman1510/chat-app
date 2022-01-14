import io from 'socket.io-client'

const socket = io(process.env.VUE_APP_WS_URL)
window.socket = socket

export function authWS(username, room) {
  if (username) {
    socket.open()
    socket.emit('newUser', { username, room })
  }
}

export function sendChatMessage(msg, user) {
  socket.emit('chatMessage', { msg: msg, user: user })
}

export function getMessages(updateSigleMessage, updateMessagesArray) {
  socket.on('message', (message) => {
    updateSigleMessage({ ...message, isNotification: false })
  })
  socket.on('loggedIn', (message) => {
    updateSigleMessage({ ...message, isNotification: true })
  })
  socket.on('userDisconnect', (message) => {
    updateSigleMessage({ ...message, isNotification: true })
  })
  socket.on('messagesList', (messages) => {
    updateMessagesArray(messages)
  })
}

export function getChatInfo(updateUsersArray) {
  socket.on('userList', (chatInfo) => {
    updateUsersArray(chatInfo.users)
  })
}

export function closeConnection() {
  socket.close()
}
