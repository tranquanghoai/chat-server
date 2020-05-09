const express = require("express");
const socketio = require("socket.io");
const http = require("http");

const PORT = process.env.PORT || 5000;

// const router = require("./router");

const app = express();
const server = http.createServer(app);

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());

// Global Variables
let global = {}
global.mongoose = require('mongoose')
global.mongodb = 'mongodb://localhost:27017/chat'

const { addUser, removeUser, getUsers, getUsersInRoom, getUserByName } = require("./users");

// Config Database
require('./src/config/database')(global)

// Setup Socket.io
const SocketIO = require('./src/controller/io')
const socketIO = new SocketIO(server, global)
socketIO.onSocketConnect()

// Setup Database
require('./src/model/users')(global)
require('./src/model/friends')(global)

// Setup Route
require('./src/controller/users')(app, global)
require('./src/controller/friends')(app, global)

// Database Process

// const Database = require('./src/model')
// const database = new Database()

// io.on("connection", (socket) => {
// 	socket.on("join", ({ name, room }, callback) => {
// 		console.log('join')
// 		const { error, user } = addUser({ socketId: socket.id, name, room });
// 		if (error) return callback(error);
// 		socket.emit("message", {
// 			user: "admin",
// 			text: `${user.name}: Welcom to the room ${user.room}`,
// 		});
// 		socket.broadcast
// 			.to(user.room)
// 			.emit('message', { user: 'admin', text: `${user.name} has joined` });
// 		socket.join(user.room);
// 		// callback();
// 	});

// 	// socket.on("sendMessage", (message, callback) => {
// 	// 	const user = getUsers(socket.id);
// 	// 	io.to(user.room).emit("message", { user: user.name, text: message });
// 	// 	callback();
// 	// });
// 	socket.on("sendMessage", (message)).then((result) => {
		
// 	}).catch((err) => {
		
// 	});
// 	// socket.on('privateMessage', {toUserName, message}).then((result) => {
		
// 	// }).catch((err) => {
		
// 	// });
	
	
	
	
	
// 	// => {
// 	// 	const user = getUserByName(toUserName)
// 	// 	console.log(user,'co user nay k')
// 	// 	if (!user) return callback();
// 	// 	io.to(user.socketId).emit('receiveMessage', {user: user.name, text: message});

// 	// }) 

// 	socket.on("disconnect", () => {
// 		console.log("User had left");
// 	});
// });

// app.use(router);

server.listen(PORT, () => {
	console.log(`Server has started on port ${PORT}`);
});
