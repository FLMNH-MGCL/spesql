const express = require('./config/express.js')
const mysql = require('mysql')
// Use env port or default
const port = process.env.PORT || 5000;

let connection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '',
    database: 'test'
})

connection.connect((err) => {
    if (err) {
        console.log(err)
    }
    else {
        console.log('Connected to MySQL Server')
    }
})



const app = express.init()
require('./routes/list-tables.routes')(connection, app)
require('./routes/fetch.routes')(connection, app)
require('./routes/update.routes')(connection, app)
require('./routes/select-count.routes')(connection, app)
require('./routes/insert.routes')(connection, app)
require('./routes/delete.routes')(connection, app)
require('./routes/sql-login.routes')(connection, app)
require('./routes/get-user.routes')(connection, app)
require('./routes/shutdown.routes')(connection, app)

app.listen(port, () => console.log(`Server now running on port ${port}!`));

// const frontListener = express.init(3000, () => console.log('tracking client port')).on('close', () => {
//     console.log('its closed wow')
// }).on('end', () => {
//     console.log('it ended wow')
// })

process.on('SIGTERM', () => {
    console.info('SIGTERM signal recieved...')
    console.log('Shutting down the server.')

    app.close(() => {
        connection.end((error) => {
            if (error) {
                console.info('Error occurred while closing the MySQL Connection.')
                console.log(error)
                process.exit(1)
            }
            else {
                console.log('MySQL connection sucessfully closed.')
                process.exit(0)
            }
        })
    })
})


// https://stackoverflow.com/questions/18087696/express-framework-app-post-and-app-get

// https://hackernoon.com/graceful-shutdown-in-nodejs-2f8f59d1c357

// https://stackoverflow.com/questions/35836582/nodejs-check-to-see-if-client-is-still-connected

// https://stackoverflow.com/questions/40141332/node-js-mysql-error-handling