var socket = io.connect("http://localhost:3000");


angular.module('myApp', [])
.controller('myCtrl', function($scope, $http, $window){
    $scope.sendmessage = () =>{
        // angular.element(".message").append("<p>" + $scope.message + "</p>");
        socket.emit('message', {text: $scope.message, username: $scope.username});
        $scope.message = "";
    }
    $scope.init = () =>{
        $http.get('/home/username').then((result) => {
            $scope.username = result.data;
            console.log(result.data);
        })
    }
    socket.on('message' , (msg) => {
        angular.element(".message").append("<p><strong> " + msg.username +  "</strong>"  + ": " + msg.text + "</p>");
    })
})



