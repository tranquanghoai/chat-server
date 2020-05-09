const users = []

const addUser = ({ socketId, name, room }) => {
    name = name.trim().toLowerCase()
    room = room.trim().toLowerCase()
    const existingUser = users.find(user => user.room === room && user.name === name)
    if(existingUser) {
        return {error: 'User is taken'}
    }
    const user = {socketId, name, room}
    users.push(user)
    return {user}
}

const removeUser = (socketId) => {
    const index = users.findIndex(user => user.socketId === socketId)
    if(index !== -1) {
        return users.splice(index, 1)[0]
    }
}

const getUsers = (socketId) => users.find(user => user.socketId === socketId)

const getUsersInRoom = (room) => users.filter(user => user.room === room)

const getUserByName = (name) => users.find(user => user.name === name) 

module.exports = {addUser, removeUser, getUsers, getUsersInRoom, getUserByName}