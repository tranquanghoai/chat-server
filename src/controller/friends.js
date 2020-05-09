module.exports = (app, global) => {
    app.post('/friends/invite', (req, res) => {
        const { requester, recipient } = req.body
        global.model.Friends.invite(requester, recipient).then((friendShip) => {
            res.send(friendShip)
        }).catch((err) => {
            res.status(400).send(err)
        });
    })

    app.put('/friends/accept', (req, res) => {
        const {accountId, friendShipId} = req.body
        global.model.Friends.accept(accountId, friendShipId).then((result) => {
            res.send(friendShip)
        }).catch((err) => {
            res.status(400).send(err)
        });
    })
}