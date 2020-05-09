module.exports = (global) => {
    const Schema = global.mongoose.Schema

    const userSchema = new Schema({
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        friends: [{
            type: Schema.Types.ObjectId,
            ref: "Friends"
        }]
    });
    
    const Users = global.mongoose.model('Users', userSchema);
    global.Users = Users

    global.model.Users = {
        register(firstName, lastName) {
            return new Promise((resolve, reject) => {
                const user = {
                    firstName,
                    lastName
                }
                Users.create(user).then((result) => {
                    resolve(result)
                }).catch((err) => {
                    reject(err)
                });
            });
        },
        listFriends(accountId) {
            return new Promise((resolve, reject) => {
                Users.findOne({_id: accountId}).populate('friends').then((result) => {
                    console.log(result)
                }).catch((err) => {
                    
                });
            });
        }
    }
}
