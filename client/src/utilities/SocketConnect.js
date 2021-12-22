import io from 'socket.io-client'
var messages = []
var users = []
const socket = io('http://localhost:3000')
const loggedIn = (username, cb) => {
  socket.on('loggedIn', (data) => {
    //here we ge the initial data
    messages = data.messages
    users = data.users
    socket.emit('newuser', username)
    cb && cb(messages, users)
  })
  listen()
}

export const listen = (username, cb) => {
  socket.on('userOnline', (username) => {
    users.push(username)
  })

  socket.on('userLeft', (user) => {
    users.splice(users.indexOf(user), 1)
  })

  socket.on('msg', (message) => {
    messages.push(message)
    cb && cb(messages, users)
  })
}

export const establishWS = (username) => {
  loggedIn(username)
}

export const sendSocket = (message) => {
  socket.emit('msg', message)
}
