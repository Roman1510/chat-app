const app = require('express')()
const cors = require('cors')
const http = require('http').Server(app.use(cors))
const io = require('socket.io')(http, {
  cors: {
    origin: '*',
  },
})

const messages = []
const users = []

io.on('connection', (socket) => {
  socket.on('newUser', (user) => {
    users.push(user)
    socket.username = user
    //message to a current client =>
    socket.emit('loggedIn', { msg: `WELCOME ${user}!` })
    //notification to everyone except the current =>
    socket.broadcast.emit('loggedIn', { msg: `${user} joined the chat.` })
  })

  socket.on('disconnect', () => {
    console.log(`${socket.username} left`)
    var toDelete = users.indexOf(socket.username)
    if (toDelete !== -1) {
      users.splice(toDelete, 1)
    }
    io.emit('message', { msg: `A user ${socket.username} has left the chat` })
  })

  socket.on('chatMessage', (msg) => {
    console.log(users)
    console.log(`${msg.msg} was sent from the user ${msg.user}`)
    messages.push(msg)
    io.emit('message', msg)
  })
})

http.listen(process.env.port || 3000, () => {
  console.log('listening on port %s', process.env.port || 3000)
})
