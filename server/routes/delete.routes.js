const mysql = require('mysql')

module.exports = function(connection, app) {
    app.post('/api/delete/:id', function(req, res) {
        let { id } = req.params;
        let command = `DELETE FROM specimen WHERE id = ${req.params.id};`
        connection.query(command, (err, data) => {
            if (err) {
                res.send(err);
            }

            // console.log("Deleted Row(s):", data.affectedRows);
            res.json(data)
        }) 
    })
}