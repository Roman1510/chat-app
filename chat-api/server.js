const app = require('express')()
const cors = require('cors')
const http = require('http').Server(app.use(cors))
const io = require('socket.io')(http, {
  cors: {
    origin: '*'
  },
})

io.on('connection', (socket) => {
  //message to a current client
  socket.emit('message','WELCOME!')
  //message to all the clients except the current
  socket.broadcast.emit('message','A user joined a chat')
  //message to all the clients (just in case)
  socket.on('disconnect',()=>{
    io.emit('message','A user has left the chat')
  })

  socket.on('chatMessage',msg=>{
    io.emit('message',msg)
  })
})

http.listen(process.env.port || 3000, () => {
  console.log('listening on port %s', process.env.port || 3000)
})
