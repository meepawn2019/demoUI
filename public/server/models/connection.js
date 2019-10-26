var mysql = require('mysql');

function Connection(){
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123456',
        database: 'testing'
    });

    connection.connect((err) => {
        if (err) throw err;
        console.log('connected');
    })
}
module.exports = new Connection();