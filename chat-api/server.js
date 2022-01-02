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
    //message to a current client
    socket.emit('loggedIn', `WELCOME ${user}!`)
    //message to all the clients except the current
    socket.broadcast.emit('loggedIn', `${user} joined the chat.`)
    //message to all the clients (just in case)
  })

  socket.on('disconnect', () => {
    io.emit('message', {msg:'A user has left the chat'})
  })

  socket.on('chatMessage', (msg) => {
    console.log(`${msg.msg} was sent from the user ${msg.user}`)
    messages.push(msg)
    io.emit('message', msg)
  })
})

http.listen(process.env.port || 3000, () => {
  console.log('listening on port %s', process.env.port || 3000)
})
