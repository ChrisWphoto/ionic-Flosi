angular.module('flosi.controllers',
  [
    'ionic',
    'flosi.services',
    'angular-svg-round-progress'
  ])


.controller('SplashCtrl', function($scope, $state, User_Factory){

    $scope.startApp = function(){
    $state.go('start');
    console.log('Starting App');
  }

    //check to see if user exists & save info
    $scope.signinEmailName = function(name, email){
      User_Factory.authEmailName(name, email);
      $state.go('start-task');
  }

    $scope.saveTask = function(task){
      User_Factory.saveTask(task);
      $state.go('start-friend');
    }

    $scope.saveFriendInfo = function(name, email){
      User_Factory.saveFriendInfo(name, email);
      $state.go('dashboard');
    }

  })

.controller('DashboardCtrl', function($scope, $interval, roundProgressService, User_Factory){


    $scope.userName = User_Factory.username;
    $scope.friendName = User_Factory.friendName;

    $scope.max = 21;
    $scope.current = 1;

    $scope.increment = function(amount){
      $scope.current+=(amount || 1);
    };
})
