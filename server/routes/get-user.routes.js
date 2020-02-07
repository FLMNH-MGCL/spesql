const mysql = require('mysql')

module.exports = function(connection, app) {
    app.get('/api/fetchCurrentUser/', function(req, res) {
        connection.query('SELECT CURRENT_USER();', (err, data) => {
            if (err) {
                console.log('Failure. Error logged.')
                res.json({
                        success: false,
                        data: err
                    })
            }
            else {
                console.log('Sucess!')
                res.json({
                    success: true,
                    currentUser: data[0]["CURRENT_USER()"]
                })
            }
        }) 
    })
}

// https://stackoverflow.com/questions/8899802/how-do-i-do-a-bulk-insert-in-mysql-using-node-js