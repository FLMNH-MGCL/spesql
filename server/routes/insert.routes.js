const mysql = require('mysql')

module.exports = function(connection, app) {
    app.post('/api/insert', function(req, res) {
        let specimen = req.body
        console.log(specimen)
        let command = `INSERT INTO specimen(id,superfamily,family,genus,species,locality,date_collected,rack) VALUES ('${specimen.id}', '${specimen.superfamily}', '${specimen.family}',' ${specimen.genus}', '${specimen.species}', '${specimen.locality}', '${specimen.date_collected}', '${specimen.rack}');`
        connection.query(command, (err, data) => {
            if (err) {
                console.log(err)
                res.send(err);
            }
            else {
                // console.log("Inserted Row(s):", data.affectedRows);
                console.log(data)
                res.json({specimen: data})
            }

        }) 
    })
}