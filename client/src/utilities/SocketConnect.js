import io from 'socket.io-client'
let messages = []
let users = []
const socket = io('http://localhost:3000')
export const loggedIn = (username, cb) => {
  socket.on('loggedIn', (data) => {
    //here we ge the initial data
    messages = data.messages
    users = data.users
    socket.emit('newuser', username)
  })
  listen(username,cb)
  // here I just pass the function, so that through the event listener, 
  // the messages list can be updated
}

export const listen = (username, cb) => {
  socket.on('userOnline', (username) => {
    console.log('user became online',username)
    users.push(username)
    cb && cb(messages, users)
  })

  socket.on('userLeft', (user) => {
    users.splice(users.indexOf(user), 1)
    cb && cb(messages, users)
  })

  socket.on('msg', (message) => {
    console.log(users)
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
