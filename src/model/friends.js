module.exports = (global) => {
    const Schema = global.mongoose.Schema

    const friendsSchema = new Schema({
        requester: {
            type: Schema.Types.ObjectId,
            ref: 'Users'
        },
        recipient: {
            type: Schema.Types.ObjectId,
            ref: 'Users'
        },
        status: {
            type: Number,
            enums: [
                0, // addfriend,
                1, // requested,
                2, // friends
            ]
        }
    })
    
    const Friends = global.mongoose.model('Friends', friendsSchema)
    global.Friends = Friends

    global.model.Friends = {
        invite(requester, recipient) {
            return new Promise((resolve, reject) => {
                let friendShip = {
                    requester,
                    recipient,
                    status: 1
                }
                Friends.create(friendShip).then((result) => {
                    resolve(result)
                }).catch((err) => {
                    console.log(err, 'error')
                    reject(err)
                });
            });
        },
        accept(accountId, friendShipId) {
            return new Promise((resolve, reject) => {
                this.checkValidAccept(accountId, friendShipId).then((result) => {
                    return Friends.updateOne({_id: friendShipId}, {$set: {status: 3}})
                }).then((result) => {
                    resolve(result)
                }).catch((err) => {
                    reject(err)
                });
            });
        },
        checkValidAccept(accountId, friendShipId) {
            return new Promise((resolve, reject) => {
                const checkFriendShip = {
                    recipient: accountId,
                    status: 1,
                    _id: friendShipId
                }
                Friends.findOne(checkFriendShip).then((result) => {
                    console.log(result, 'result')
                    if(result){
                        resolve(true)
                    } else {
                        reject(false)
                    }
                }).catch((err) => {
                    reject(false)
                });
            });
        }
    }

}