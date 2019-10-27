import mysql from 'mysql';

function Connection(){
//     this.pool = null;
    
    this.pool = mysql.createPool({
        connectionLimit: 10,
        host: 'localhost',
        user: 'root',
        password: '123456',
        database: 'webchat',
        multipleStatments: true
    })

    this.aquire = function(callback) {
        this.pool.getConnection(function(err, connection){
            callback(err, connection);
        });
    }
};
module.exports = new Connection();