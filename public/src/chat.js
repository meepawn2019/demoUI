var socket = io.connect("http://localhost:3000");

angular.module('myApp', []).controller('myCtrl', function($scope){
    $scope.text = 'concac';
    $scope.sendmessage = () =>{
        angular.element(".message").append("<p>" + $scope.message + "</p>");
        $scope.message = "";
    }
})

