import express from 'express';
import validate from './public/server/models/validatepassword';  //Xác  thực đăng nhập
import msgdb from './public/server/models/msgDB';  //Thêm tin nhắn vào DB
import session from 'express-session';
import getHis from './public/server/models/getChatroomHistory';  //Lấy tin nhắn cũ
import getChatroom from './public/server/models/getRoomId';
import addChatroom from './public/server/models/addRoom';
const port = 3000;
import bodyParser from 'body-parser';
let app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);


/* Dùng Middleware session, static file, view engine(có thể không cần (chưa test)) */
app.use(session({secret: 'ssshhhhh'}));
app.use(express.static('public'));
app.set('views', __dirname + '/public');
app.set('view engine', 'html')
app.use(express.json())

/* Redirect tới home nếu đăng nhập rồi, tới login nếu chưa */
app.get('/',function(req, res){
    if(req.session.user){
        res.redirect('/home')
    } else{
        res.sendFile(__dirname + '/public/src/index.html');
    }
});

/* Render chatForm nếu request tới home */
app.get('/home', function(req, res){
    res.sendFile(__dirname + '/public/src/chatForm.html');
})

/* Lấy tin nhắn cũ */
app.get('/home/messageHis/:roomid', (req, res) => {
    getHis(req.params.roomid ,function (err, result) {
        if (err) console.log("Database error!");
        else res.send(result);
      });
})

/* Gửi username cho client */
app.get('/home/username', (req, res)=>{
    getChatroom(req.session.user.userId, function (err, result){
        console.log(result);
        res.send({userdata:req.session.user, chatroom: result});
    }); 
})

/* Gửi file chat.js khi chatForm được render (AngularJS) */
app.get('/chat.js', (req,res)=>{
    res.sendFile(__dirname + '/public/src/chat.js');
})

app.post('/home/addRoom', (req, res)=>{
    console.log(req.body);
    addChatroom(req.body);
})

app.use(bodyParser.urlencoded({ extended: true }));
validate(app);


const room = io.of('/home');
room.on('connection', (socket)=>{
    socket.on('join', function(roomid){
        socket.join(roomid);
    })
    socket.on('message', function (msg){   
        console.log(msg);
        msgdb(msg);
        room.to(msg.roomid).emit('message', msg);
    })
})


/* Mở cổng */
const server = http.listen(port, function(){
    console.log("listening on 3000");
})

