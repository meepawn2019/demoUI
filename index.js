import express from 'express';
import validate from './public/server/models/validatepassword';
const port = 3000;
import bodyParser from 'body-parser';
let app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(express.static('public'));
app.set('views', __dirname + '/public');
app.set('view engine', 'html')

app.get('/',function(req, res){
    res.sendFile(__dirname + '/public/src/index.html');
});
app.use(bodyParser.urlencoded({ extended: false }));
validate(app);

io.sockets.on('connection', function(socket){
    console.log("someone connected");
});

const server = http.listen(port, function(){
    console.log("listening on 3000");
})

