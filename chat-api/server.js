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
  console.log(`new connection was established =>`)
  const currDate = new Date().toLocaleTimeString('en-GB').substring(0, 5)
  socket.on('newUser', (user) => {
    console.log(`newUser event was triggered with the user ${user.username}`)
    users.push(user.username)
    socket.username = user.username
    socket.room = user.room
    socket.join(user.room)

    const message = {
      msg: `${socket.username} joined the chat in this room`,
      date: currDate,
      user:'system'
    }
    //emitting to a current client =>
    io.to(socket.id).emit('loggedIn', {
      msg: `WELCOME ${user.username}!`,
      date: currDate,
      user: 'system'
    })

    //emitting to everyone except the current =>
    socket.to(user.room).emit('loggedIn', message)

    //emitting to everyone =>
    io.to(user.room).emit('messagesList', messages)
    io.to(user.room).emit('userList', { users })
  })

  socket.on('disconnect', () => {
    const room = socket.room
    const username = socket.username
    const message = {
      msg: `User ${username} has left the chat`,
      date: currDate,
      user:username,
      isNotification: true
    }
    console.log(`${username} left`)
    var toDelete = users.indexOf(username)
    if (toDelete !== -1) {
      users.splice(toDelete, 1)
    }
    io.to(room).emit('userDisconnect', message)

    //i think this one should be refactored to the generic logic (with model)
    io.to(room).emit('userList', { users })
  })

  // the messages from frontend:
  socket.on('chatMessage', (msg) => {
    const room = socket.room
    const message = { ...msg, date: currDate, user: socket.username, isNotification: false }
    console.log(`${message.msg} was sent from the user ${message.user}`)
    messages.push(message)
    io.to(room).emit('message', message)
  })
})

http.listen(process.env.port || 3000, () => {
  console.log('listening on port %s', process.env.port || 3000)
})
