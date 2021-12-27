import io from 'socket.io-client'
let messages = []
let users = []
const socket = io(process.env.VUE_APP_WS_URL)
window.socket = socket
export const loggedIn = (username, cb) => {
  //newUser event
	socket.on('loggedIn', (data) => {
		messages = data.messages
		users = data.users
		socket.emit('newuser', username)
	})
	listen(username, cb)
	// here I just pass the function, so that through the event listener,
	// the messages list can be updated
}

export const listen = (username, cb) => {
	socket.on('userOnline', (username) => {
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

export const establishWS = () => {
	socket.connect()
}

export const sendSocket = (message) => {
	socket.emit('msg', message)
}

export const leaveParty = () => {
	socket.disconnect()
}
