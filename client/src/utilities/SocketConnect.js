import io from 'socket.io-client'

const socket = io(process.env.VUE_APP_WS_URL)
window.socket = socket

export function authWS(username, room) {
  if (username) {
    socket.open()
    socket.emit('newUser', { username, room })
  }
}

export function getHistory() {
  let messageArr = []
  socket.emit('getHistory', (answer) => {
    console.log('the array with messages was received', answer)
    messageArr = answer
  })
  return messageArr
}

export function sendChatMessage(msg, user) {
  socket.emit('chatMessage', { msg: msg, user: user })
}

export function getMessages(updateSigleMessage) {
  socket.on('message', (message) => {
    updateSigleMessage({ ...message, isNotification: false })
  })
  socket.on('loggedIn', (message) => {
    updateSigleMessage({ ...message, isNotification: true })
  })
  socket.on('userDisconnect', (message) => {
    updateSigleMessage({ ...message, isNotification: true })
  })
  //here i should make it run only once per request, not every time the messages array is
}

export function getChatInfo(updateUsersArray) {
  socket.on('userList', (chatInfo) => {
    updateUsersArray(chatInfo.users)
  })
}

export function closeConnection() {
  socket.close()
}
