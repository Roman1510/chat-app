import io from 'socket.io-client'
var messages = []
var users = []
const socket = io('http://localhost:3000')
const loggedIn = (username) => {
  socket.on('loggedIn', (data) => {
    //here we ge the initial data
    messages = data.messages
    users = data.users
    socket.emit('newuser', username)
  })
  listen()
}

export const listen = (cb) => {
  socket.on('userOnline', (user) => {
    users.push(user)
  })

  socket.on('userLeft', (user) => {
    users.splice(users.indexOf(user), 1)
  })

  socket.on('msg', (message) => {
    messages.push(message)
  })
  if(cb){
    cb(messages,users)
  }
  
}

export const establishWS = (username) => {
  loggedIn(username)
}

export const sendSocket = (message) => {
  socket.emit('msg', message)
}
