angular.module('flosi.controllers',
  [
    'ionic',
    'flosi.services',
    'angular-svg-round-progress',
    'ezfb'
  ])
  .config(function (ezfbProvider) {
    /**
     * Basic setup
     *
     * https://github.com/pc035860/angular-easyfb#configuration
     */
    ezfbProvider.setInitParams({
      appId: '528921067256011'
    });
  })

  .controller('MainCtrl', function($scope, ezfb, $window, $location, $q) {

    updateMe();

    updateLoginStatus()
      .then(updateApiCall);

    /**
     * Subscribe to 'auth.statusChange' event to response to login/logout
     */
    ezfb.Event.subscribe('auth.statusChange', function (statusRes) {
      $scope.loginStatus = statusRes;

      updateMe();
      updateApiCall();
    });

    $scope.login = function () {
      /**
       * Calling FB.login with required permissions specified
       * https://developers.facebook.com/docs/reference/javascript/FB.login/v2.0
       */
      ezfb.login(null, {scope: 'email'});

      /**
       * In the case you need to use the callback
       *
       * ezfb.login(function (res) {
     *   // Executes 1
     * }, {scope: 'email,user_likes'})
       * .then(function (res) {
     *   // Executes 2
     * })
       *
       * Note that the `res` result is shared.
       * Changing the `res` in 1 will also change the one in 2
       */
    };

    $scope.logout = function () {
      /**
       * Calling FB.logout
       * https://developers.facebook.com/docs/reference/javascript/FB.logout
       */
      ezfb.logout();

      /**
       * In the case you need to use the callback
       *
       * ezfb.logout(function (res) {
     *   // Executes 1
     * })
       * .then(function (res) {
     *   // Executes 2
     * })
       */
    };

    $scope.share = function () {
      var no = 1,
        callback = function (res) {
          console.log('FB.ui callback execution', no++);
          console.log('response:', res);
        };

      ezfb.ui(
        {
          method: 'feed',
          name: 'angular-easyfb API demo',
          picture: 'http://plnkr.co/img/plunker.png',
          link: 'http://plnkr.co/edit/qclqht?p=preview',
          description: 'angular-easyfb is an AngularJS module wrapping Facebook SDK.' +
          ' Facebook integration in AngularJS made easy!' +
          ' Please try it and feel free to give feedback.'
        },
        callback
      )
        .then(callback);
    };

    /**
     * For generating better looking JSON results
     */
    var autoToJSON = ['loginStatus', 'apiRes'];
    angular.forEach(autoToJSON, function (varName) {
      $scope.$watch(varName, function (val) {
        $scope[varName + 'JSON'] = JSON.stringify(val, null, 2);
      }, true);
    });

    /**
     * Update api('/me') result
     */
    function updateMe () {
      ezfb.getLoginStatus()
        .then(function (res) {
          // res: FB.getLoginStatus response
          // https://developers.facebook.com/docs/reference/javascript/FB.getLoginStatus
          return ezfb.api('/me');
        })
        .then(function (me) {
          // me: FB.api('/me') response
          // https://developers.facebook.com/docs/javascript/reference/FB.api
          $scope.me = me;
          console.log('token '+ $scope.loginStatus.authResponse.accessToken);
          console.log('me '+ $scope.me.id);
        });


    }

    /**
     * Update loginStatus result
     */
    function updateLoginStatus () {
      return ezfb.getLoginStatus()
        .then(function (res) {
          // res: FB.getLoginStatus response
          // https://developers.facebook.com/docs/reference/javascript/FB.getLoginStatus
          $scope.loginStatus = res;
        });
    }

    /**
     * Update demostration api calls result
     */
    function updateApiCall () {
      return $q.all([
        ezfb.api('/me'),
        ezfb.api('/me/likes')
      ])
        .then(function (resList) {
          // Runs after both api calls are done
          // resList[0]: FB.api('/me') response
          // resList[1]: FB.api('/me/likes') response
          $scope.apiRes = resList;
        });

    }
  })





.controller('SplashCtrl',
  [
    '$scope',
    '$state',
    'User_Factory',
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
