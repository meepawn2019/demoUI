import conn from './connection';

module.exports = (room, callback) =>{
    const sql1 = 'INSERT INTO chatroom (chatroom_name, chatroom_password, chatroom_description, member_num) VALUES (?, ?, ?, ?);';
    const sql2 = 'INSERT INTO userchatroom  VALUES (?, ?)';
    conn.aquire((err, con) =>{
        con.query(sql1, [room.name, room.pass, room.des, 5], (err, result, field) => {
            //console.log(result);
            if(err) {
                callback(err)
                return;
            } else {
                con.query(sql2, [room.userid, room.name], (err, result, field) => {
                    //if(err) throw err;
                    callback(err);
                    console.log('success2');
                });        
            }
            console.log('success1');
        });
        con.release();
    });
 }