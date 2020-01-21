const express = require('./config/express.js')
const mysql = require('mysql')
// Use env port or default
const port = process.env.PORT || 5000;

let connection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'guest',
    password: 'guestp@ssword',
    database: 'mtest'
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
require('./routes/fetch.routes')(connection, app)
require('./routes/insert.routes')(connection, app)
require('./routes/delete.routes')(connection, app)
require('./routes/sql-login.routes')(connection, app)

app.listen(port, () => console.log(`Server now running on port ${port}!`));


// https://stackoverflow.com/questions/18087696/express-framework-app-post-and-app-get