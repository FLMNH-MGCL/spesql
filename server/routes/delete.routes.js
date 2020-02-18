const mysql = require('mysql')

module.exports = function(connection, app) {
    app.post('/api/delete/', function(req, res) {
        // let { id } = req.params;
        // let command = `DELETE FROM molecularLab WHERE id = ${req.params.id};`
        let command = req.body
        console.log(command)
        connection.query(command.command, (err, data) => {
            if (err) {
                res.json({
                    success: false,
                    data: err
                });
            }

            // console.log("Deleted Row(s):", data.affectedRows);
            res.json({
                success: true,
                data: data
            })
        }) 
    })
}