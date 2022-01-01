import io from 'socket.io-client'

const socket = io(process.env.VUE_APP_WS_URL)
window.socket = socket

export function sendSocket(msg) {
	socket.emit('chatMessage',msg)
}

export function getMessages(cb) {
	socket.on('message',(msg)=>{
		cb(msg)
	})
}