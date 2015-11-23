angular.module('flosi.controllers',
  [
    'ionic',
    'flosi.services',
    'angular-svg-round-progress',
    'firebase',
    'ngCordova'
  ])

.filter('reverse', function() {
  return function(items) {
    return items.slice().reverse();
  };
})

.filter('reverseAnything', function() {
  return function(items) {
    if(typeof items === 'undefined') { return; }
    return angular.isArray(items) ?
      items.slice().reverse() : // If it is an array, split and reverse it
      (items + '').split('').reverse().join(''); // else make it a string (if it isn't already), and reverse it
  };
})

.controller("SecureController", function($scope, $state, $ionicHistory, $firebaseArray, $cordovaCamera, User_Factory) {
    $scope.o = User_Factory;
  //$ionicHistory.clearHistory();

    console.log("inside Secure");
  $scope.images = [];
  var fb = new Firebase('https://flossy.firebaseIO.com');
  var fbAuth = fb.getAuth();
  if(fbAuth) {
    var userReference = fb.child("users/" + fbAuth.uid);
    var syncArray = $firebaseArray(userReference.child("images"));
    $scope.images = syncArray;
    console.log($scope.images);
  } else {
    $state.go("app.challenge");
    console.log("fbAuth could not be found");
  }

  $scope.upload = function() {
    var options = {
      quality : 75,
      destinationType : Camera.DestinationType.DATA_URL,
      sourceType : Camera.PictureSourceType.CAMERA,
      allowEdit : true,
      encodingType: Camera.EncodingType.JPEG,
      popoverOptions: CameraPopoverOptions,
      targetWidth: 500,
      targetHeight: 500,
      saveToPhotoAlbum: false
    };

    try {
      $cordovaCamera.getPicture(options).then(function (imageData) {
        syncArray.$add({image: imageData}).then(function () {
          alert("Image has been uploaded");
        });
      }, function (error) {
        console.error(error);
      });
    } catch (err){
      throw " fatal error camera crashed unavailable";
    }
  }
})


.controller('SplashCtrl',
  [
    '$scope',
    '$state',
    'User_Factory',
    'Auth',
    '$ionicSideMenuDelegate',
    '$ionicModal',


    function($scope, $state, User_Factory, Auth, $ionicSideMenuDelegate, $ionicModal){


      $scope.login = function() {
        Auth.$authWithOAuthRedirect("google").then(function(authData) {
          // User successfully logged in
          //$state.go('app.dashboard');
          console.log("redirect Auth");
        }).catch(function(error) {
          if (error.code === "TRANSPORT_UNAVAILABLE") {
            Auth.$authWithOAuthPopup("google").then(function(authData) {
              // User successfully logged in. We can log to the console
              // since we’re using a popup here
             console.log("popup Auth");
              //$state.go('app.dashboard');
            });
          } else {
            // Another error occurred
            console.log(error);
          }
        });
      }
      //

      Auth.$onAuth(function(authData) {
        if (authData === null) {
          console.log('Not logged in yet');
        } else {
          console.log('Logged in as', authData.uid);
          $state.go('app.dashboard');
        }
        // This will display the user's name in our view
        $scope.authData = authData;
        User_Factory.setAuthData(authData);
        //console.log(authData);
      })

      $scope.o = User_Factory;
      $scope.openChallenges = 0;


      $scope.logout = function(){
        //$state.go('intro');
        console.log("logged out");
        Auth.$unauth();
        $state.go('intro', {}, {reload: true});
      }

      // Create the login modal that we will use later
      $ionicModal.fromTemplateUrl('templates/splash-3-friend.html', {
        scope: $scope
      }).then(function(modal) {
        $scope.modal = modal;
      })

      // Triggered in the login modal to close it
      $scope.closeLogin = function() {
        $scope.modal.hide();
      }

      $scope.invite = function () {
        $scope.modal.show();
      }

      $scope.saveFriendInfo = function(name, email){

        $scope.modal.hide();
        $scope.openChallenges++;
        $scope.friend = name;
        //User_Factory.saveFriendInfo(name, email);
        //$state.go('dashboard');
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



    $scope.goChallenge = function(){
      $state.go('app.secure');
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
