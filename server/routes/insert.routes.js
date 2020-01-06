const mysql = require('mysql')

module.exports = function(connection, app) {
    app.post('/api/insert', function(req, res) {
        let specimen = req.body
        console.log(specimen)
        // let command = `INSERT INTO specimen(id,superfamily,family,genus,species,locality,date_collected,rack) VALUES ('${specimen.id}', '${specimen.superfamily}', '${specimen.family}',' ${specimen.genus}', '${specimen.species}', '${specimen.locality}', '${specimen.date_collected}', '${specimen.rack}');`
        let command = `INSERT INTO collection(mgcl_num, lep_num, order_, superfamily, family, subfamily, tribe, section, genus, species, subspecies, sex, country, province, locality, latitude, longitude, elevation, mv_lamp, days, month, year, collectors, freezer, rack, box, size, note) VALUES ("${specimen.mgcl_num}", "${specimen.lep_num}", "${specimen.order_}", "${specimen.superfamily}", "${specimen.family}", "${specimen.subfamily}", "${specimen.tribe}", "${specimen.section}", "${specimen.genus}", "${specimen.species}", "${specimen.subspecies}", "${specimen.sex}", "${specimen.country}", "${specimen.province}", "${specimen.locality}", "${specimen.latitude}", "${specimen.longitude}", "${specimen.elevation}", "${specimen.mv_lamp}", "${specimen.days}", "${specimen.month}", "${specimen.year}", "${specimen.collectors}", "${specimen.freezer}", "${specimen.rack}", "${specimen.box}", "${specimen.size}", "${specimen.note}");`
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

