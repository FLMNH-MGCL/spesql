const mysql = require('mysql')

module.exports = function(connection, app) {
    app.get('/api/fetch-all', function(req, res) {
        connection.query('SELECT * FROM specimen', (err, data) => {
            if (err) {
                res.send(err);
            }

            res.json({specimen: data})
        }) 
    })
}