const setCurrentUser = (data) => {
	localStorage.setItem('user', data.user)
    localStorage.setItem('room',data.room)
}
const getCurrentUser = () => {
    const user = localStorage.getItem('user')
    const room = localStorage.getItem('room')
	return {user,room}
}

const removeUser = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('room')
}

export {
    setCurrentUser,
    getCurrentUser,
    removeUser
}