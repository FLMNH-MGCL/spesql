const mysql = require('mysql')

module.exports = function(connection, app) {
    app.post('/api/shutdown-sequence/', function(req, res) {
        // process.kill(process.pid, 'SIGTERM')

        app.close()
    })
}

