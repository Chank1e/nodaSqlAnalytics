var app = angular.module('main',['ngRoute'])
          .config(['$routeProvider', function($routeProvider){
              $routeProvider
              .when('/',{templateUrl:'templates/main.html'})
              .otherwise({redirectTo:'/'});
          }]);
var socket = io();
app.controller('mainCtrl',function($scope){
    socket.on('answer',function(msg){
      $scope.data=msg;
    });

});
