const app = require('express')()
const cors = require('cors')
const http = require('http').Server(app.use(cors))
const io = require('socket.io')(http, {
  cors: {
    origin: '*'
  },
})
let users = []
let messages = []
let index = 0
io.on('connection', (socket) => {
  socket.emit('loggedIn', {
    users: users.map((s) => s.username),
    messages: messages,
  })

  socket.on('newuser', (username) => {
    socket.username = username
    users.push(socket.username)
    console.log(socket.username, ' now online')
    io.emit('userOnline', socket.username)
  })

  socket.on('msg', (msg) => {
    let message = {
      index: index,
      username: socket.username,
      msg: msg,
    }
    messages.push(message)
    console.log('the message was sent: ',message)
    io.emit('msg', message)
    index++
  })

  //disconnect
  socket.on('disconnect', () => {
    console.log(`${socket.username} has left the party`)
    io.emit('userLeft', socket.username)
    users.splice(users.indexOf(socket.username), 1)
  })
})

http.listen(process.env.port || 3000, () => {
  console.log('listening on port %s', process.env.port || 3000)
})
