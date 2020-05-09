module.exports = (app, global) => {
    app.post('/users/register', (req, res) => {
        const { firstName, lastName } = req.body
        global.model.Users.register(firstName, lastName).then((createdUser) => {
            res.send(createdUser)
        }).catch((err) => {
            res.status(400).send(err)
        });
    })
    app.get('/users/listFriends', (req, res) => {
        const { accountId } = req.body
        global.model.Users.listFriends(accountId).then((result) => {
            res.send(createdUser)
        }).catch((err) => {
            res.status(400).send(err)
        });

    })
}