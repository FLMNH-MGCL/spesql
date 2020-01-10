const mysql = require('mysql')

module.exports = function(connection, app) {
    app.post('/api/fetch/', function(req, res) {
        let command = req.body
        connection.query(command.command, (err, data) => {
            if (err) {
                res.send(err);
            }

            res.json({specimen: data})
        }) 
    })
}