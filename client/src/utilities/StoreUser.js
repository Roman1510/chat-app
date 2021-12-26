const setCurrentUser = (user) => {
	localStorage.setItem('user', user)
}
const getCurrentUser = () => {
	return localStorage.getItem('user')
}

const removeUser = () => {
    localStorage.removeItem('user')
}

export {
    setCurrentUser,
    getCurrentUser,
    removeUser
}