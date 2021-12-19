const app = require('express')()
const cors = require('cors')
const http = require('http').Server(app.use(cors))
const io = require('socket.io')(http, {
  cors: {
    origin: "http://localhost:8080",
    methods: ["GET", "POST"]
  }
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
    console.log(`${username} has entered the party`)
    socket.username = username
    users.push(socket)

    io.emit('userOnline', socket.username)
  })

  socket.on('msg', (msg) => {
    console.log(msg)
    let message = {
      index: index,
      username: socket.username,
      msg: msg,
    }
    messages.push(message)
    io.emit('msg', message)
    index++
  })

  //disconnect
  socket.on('disconnect', () => {
    console.log(`${socket.username} has left the party`)
    io.emit('userLeft', socket.username)
    users.splice(users.indexOf(socket), 1)
  })
})

http.listen(process.env.port || 3000, () => {
  console.log('listening on port %s', process.env.port || 3000)
})
