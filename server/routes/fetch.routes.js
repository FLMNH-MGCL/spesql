const mysql = require('mysql')

module.exports = function(connection, app) {
    app.post('/api/fetch/', function(req, res) {
        //console.log(connection)
        let command = req.body
        //console.log(command)
        connection.query(command.command, (err, data) => {
            if (err) {
                res.send(err);
            }
            else {
                res.json({specimen: data})
            }
            
        }) 
    })
}