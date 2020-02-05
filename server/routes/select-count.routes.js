const mysql = require('mysql')

module.exports = function(connection, app) {
    app.post('/api/select-count/', function(req, res) {
        let command = req.body

        connection.query(command.command, (err, data) => {
            if (err) {
                res.send({error: err});
            }
            else {
                res.json({data: data})
            }
            
        }) 
    })
}