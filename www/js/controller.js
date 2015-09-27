angular.module('flosi.controllers',
  [
    'ionic',
    'flosi.services',
    'angular-svg-round-progress'
  ])


.controller('SplashCtrl', ['$scope', '$state', 'User_Factory',
    function($scope, $state, User_Factory){

    $scope.o = User_Factory;
    $scope.startApp = function(){
    $state.go('start');
    console.log('Starting App');
  }

    //check to see if user exists & save info
    $scope.signinEmailName = function(name, email){
      User_Factory.authEmailName(name, email).then(function(){
        console.log('inside authEmailName ' + User_Factory.friendName);
        if (!User_Factory.friendName){ $state.go('start-invite'); console.log(User_Factory.friendName)}
        else {$state.go('start-task');}
      });

  }

    $scope.saveTask = function(task){
      User_Factory.saveTask(task);
      $state.go('start-friend');
      console.log('o ' + User_Factory)
    }

    $scope.saveFriendInfo = function(name, email){
      User_Factory.saveFriendInfo(name, email);
      $state.go('dashboard');
    }

    $scope.goDashboard = function(){
      $state.go('dashboard');
    }

  }])

  .controller('DashboardCtrl', ['$scope', '$interval', 'roundProgressService', 'User_Factory',
    function($scope, $interval, roundProgressService, User_Factory){
      $scope.userObj = User_Factory;
      $scope.max = 21;

      //$scope.friendCurrent = User_Factory.getFriendTaskCompleted();

      //send user object off to service which sends it to server
      $scope.increment = function(){
        User_Factory.complete();
      };
  }]);
