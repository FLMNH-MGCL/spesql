const mysql = require('mysql')

module.exports = function(connection, app) {
    app.post('/api/update/', function(req, res) {
        //console.log(connection)
        let command = req.body
        //console.log(command)

        connection.query(command.command, (err, data) => {
            if (err) {
                console.log('Update Failure. Error logged.')
                // console.log(err)
                res.json({
                        success: false,
                        data: err
                    })
            }
            else {
                console.log('Sucess!')
                res.json({
                    success: true,
                    data: data
                })
            }
            
        }) 
    })
}