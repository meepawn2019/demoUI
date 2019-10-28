import conn from './connection';

module.exports = function(app){
    app.route('/auth')
    .post((req, res) => {
            let username = req.body.username;
            let password = req.body.password;
            const sql = 'SELECT username, password FROM User WHERE username=? AND password=?';
            conn.aquire(function(err, con) {
                con.query(sql, [username,password], function(err, result, fields){
                    if(username && password){
                        if(result.length > 0){
                            req.session.username = username;
                            res.redirect('/home');
                            console.log(req.session.username);
                        } else{
                            res.send('SAI CMNR!!!');
                        }
                        res.end();
                        con.release();
                    } else{
                        res.send('Nhap tai khoan va mat khau vao');
                        res.end();
                        con.release();
                    }
                });
            });
    })
}

