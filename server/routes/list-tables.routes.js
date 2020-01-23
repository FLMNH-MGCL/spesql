const mysql = require('mysql')

module.exports = function(connection, app) {
    app.post('/api/list-tables/', function(req, res) {
        //console.log(connection)
        let command = 'SHOW TABLES;'
        //console.log(command)
        connection.query(command, (err, data) => {
            console.log(data)
            if (err) {
                res.json({tables: [], error: err});
            }
            else {
                const tables = data.map(table => {
                    return table.Tables_in_mtest
                })
                res.json({tables: tables})
            }
            
        }) 
    })
}