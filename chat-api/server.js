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
    users.push(user.username)
    socket.username = user.username
    socket.room = user.room
    socket.join(user.room)

    //message to a current client =>
    io.to(socket.id).emit('loggedIn', { msg: `WELCOME ${user.username}!` })

    //notification to everyone except the current =>
    socket.to(user.room).emit('loggedIn', {
      msg: `${user.username} joined the chat in the room ${user.room}`,
    })
    io.to(user.room).emit('userList', users)
  })

  socket.on('disconnect', () => {
    const room = socket.room
    console.log(`${socket.username} left`)
    var toDelete = users.indexOf(socket.username)
    if (toDelete !== -1) {
      users.splice(toDelete, 1)
    }
    io.to(room).emit('message', { msg: `User ${socket.username} has left the chat` })
    io.to(room).emit('userList', users)
  })

  socket.on('chatMessage', (msg) => {
    const room = socket.room
    console.log(users)
    console.log(`${msg.msg} was sent from the user ${msg.user}`)
    messages.push(msg)
    io.to(room).emit('message', msg)
  })
})

http.listen(process.env.port || 3000, () => {
  console.log('listening on port %s', process.env.port || 3000)
})
