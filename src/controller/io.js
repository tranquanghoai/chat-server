class SocketIO {
    constructor(server) {
        this.io = require('socket.io')(server)
    }

    onSocketConnect() {
        this.io.on('connection', socket => {
            console.log('A user connection')
        });
    }
}

module.exports = SocketIO