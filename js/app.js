var app = angular.module('main',['ngRoute','chart.js'])
          .config(['$routeProvider', function($routeProvider){
              $routeProvider
              .when('/',{templateUrl:'templates/main.html'})
              .otherwise({redirectTo:'/'});
          }]);
app.factory('socket',function ($rootScope){
    var socket = io.connect();
    return {
        on: function (eventName,callback){
            socket.on(eventName,function(){
                var args = [].slice.call(arguments);
                $rootScope.$apply(function(){
                    if(callback){
                        callback.apply(socket,args);
                    }
                });
            });
        },
        emit: function (eventName, data, callback){
            var args = [].slice.call(arguments), cb;
            if( typeof args[args.length-1]  == "function" ){
                cb = args[args.length-1];
                args[args.length-1] = function(){
                    var args = [].slice.call(arguments);
                    $rootScope.$apply(function(){
                        if(cb){
                            cb.apply(socket,args);
                        }
                    });
                };
            }
            socket.emit.apply(socket, args);
        }
    };
});
app.controller('mainCtrl',function($scope,socket){
  $scope.chart={};
  $scope.chart.labels=[];
  $scope.chart.data=[];
  $scope.queryThis=function(a){
    socket.emit('query',a);
    console.log(a);
  };
  socket.on('answer',function(msg){
    //console.log(msg)
    $scope.data=msg;
    $scope.data.forEach(function(item,i,arr){
      let tt = $scope.chart.labels;
      let ind = tt.indexOf(item.make);
      if(ind===-1){tt[tt.length]=item.make}
      else{
        if($scope.chart.data[ind]===undefined){
          $scope.chart.data[ind]=1;
        } else {
          $scope.chart.data[ind]++;
        };
      };
    });
    //console.log($scope.chart)
  });
});
