let express = require('express');
let mySql = require('mysql');
const port = 3000;


let app = express();
app.use(express.static("public"));

app.get('/',function(req, res){
    res.redirect('/src/index.html');
});

var accountList = [
    {userID : 1, username : 'quanghuy', password : "1234567"},
    {userID : 2, username : 'quanghuy2', password: "123456789"}
];

app.post('/api/valiatePassword/username/:username/password/:password',function(req, res){
    var username = req.params.username;
    var password = req.params.password;
    var isCorrect = accountList.find(a => a.username === username && a.password === password);
    console.log(isCorrect);
    if(isCorrect){
        console.log("co chay nhung ko redirect");
        res.contentType('application/json');
        var data = JSON.stringify('/src/chatForm.html');
        res.header('Content-Length', data.length);
        res.end(data);
    } else{
        console.log("Wrong cmnr");
    }
});


app.listen(port);

