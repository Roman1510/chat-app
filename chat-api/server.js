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
  const currDate =  new Date().toLocaleTimeString('en-GB').substring(0,5)
  socket.on('newUser', (user) => {
    users.push(user.username)
    socket.username = user.username
    socket.room = user.room
    socket.join(user.room)

    //message to a current client =>
    io.to(socket.id).emit('loggedIn', { msg: `WELCOME ${user.username}!`,  date: currDate })

    //notification to everyone except the current =>
    socket.to(user.room).emit('loggedIn', {
      msg: `${user.username} joined the chat in this room`, date:currDate
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

  // the messages from frontend:
  socket.on('chatMessage', (msg) => {
    const room = socket.room
    const message = {...msg, date: currDate}

    console.log(message)
    console.log(`${message.msg} was sent from the user ${message.user}`)
    messages.push(message)
    io.to(room).emit('message', message)
  })
})

http.listen(process.env.port || 3000, () => {
  console.log('listening on port %s', process.env.port || 3000)
})
