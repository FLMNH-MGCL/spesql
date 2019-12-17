const express = require('./config/express.js')
const mysql = require('mysql')
// Use env port or default
const port = process.env.PORT || 5000;

const connection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'P@rr0t032869',
    database: 'mtest'
})

connection.connect((err) => {
    if (err) {
        console.log(err)
    }
})

const app = express.init()
require('./routes/fetch.routes')(connection, app)

app.listen(port, () => console.log(`Server now running on port ${port}!`));


// https://stackoverflow.com/questions/18087696/express-framework-app-post-and-app-get