const mysql = require('mysql')

module.exports = function(connection, app) {
    app.post('/api/login/', function(req, res) {
        const username = req.body.user
        const password = req.body.password
        // console.log(req.body)
        // console.log(username)
        // console.log(password)

        connection.changeUser({user: username, password: password}, (err) => {
            if (err) {
                console.log(err)
                let data = {logged_in: false, err: err}
                res.json(data)
            }
            else {
                console.log('Changed User')
                let data = {logged_in: true, err: err}
                res.json(data)
            }
        })
    })
}

