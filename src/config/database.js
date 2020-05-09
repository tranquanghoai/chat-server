module.exports = (global) => {
    const connection = global.mongoose.connection
    global.mongoose.connect(global.mongodb, { useUnifiedTopology: true, useNewUrlParser: true })
    connection.on('error', () => console.log(' - The MongoDB connection succeeded.'))
    connection.once('open', () => console.log(' - The MongoDB connection succeeded.'))
    global.model = {}
}