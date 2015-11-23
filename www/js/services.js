angular.module('flosi.services', ['firebase'])


  .factory('Auth', function($firebaseAuth) {
    var endPoint = 'https://flossy.firebaseIO.com';
    var usersRef = new Firebase(endPoint);
    return $firebaseAuth(usersRef);
  })

.factory('User_Factory', ['$http','$window', function($http, $window){
    //for dev env quickly switching
    var remote = 'https://flosi-node-oauth.herokuapp.com';
    var localUrl = 'http://localhost:3000';

    var o ={
      username: false,
      email: false,
      task: false,
      friendName: false,
      friendEmail: false,
      taskCompleted: 0,
      token: false,
      first_name: false,
      last_name: false,
      authData: false
    };

    o.setAuthData = function(authdata) {
      o.authData = authdata;
    };

    o.fbRoute = function(){
     var loginWindow, hasToken, hasEmail;

      loginWindow = $window.open(remote + '/auth/google', '_blank', 'location=no,toolbar=no,hidden=yes,height=300,width=300');

      setTimeout(function(){

      loginWindow.addEventListener('loadstart', function(event){

        alert('event ' + event);
        hasToken = event.url.indexOf('?token=');
        hasEmail = event.url.indexOf('&user=');
        if (hasToken > -1 && hasEmail > -1){
          o.token = event.url.match("token=(.*)&user=")[1];
          o.email = event.url.match("&user=(.*)&fname=")[1];
          o.first_name = event.url.match("&fname=(.*)&lname=")[1];
          o.last_name = event.url.match("&lname=(.*)")[1];
          loginWindow.close();
        }

      });

        alert("Hello"); }, 1500);

    };

    o.complete = function () { //passing function o object
      o.taskCompleted++;
      return $http.put(remote + '/taskCompleted', o).success(function(user){
        console.log('upboat success for: ' + user.username, o.taskCompleted);
      });
    };

    o.authEmailName = function (name, email) {
      if (name) o.username = name;
      if (email) o.email = email;

        //Checking to see if they were invited
        return $http.put(remote + '/register', o)
          .success(function (match) {

            console.log('inside /register, username is: ' + match.username);

            if (match.friendName != "") { //User was invited! Match = info of their inviter
              o.task = match.task;
              o.friendEmail = match.email;
              o.friendName = match.username;
            }
            else {console.log('no match found ' + match.username + ' saved');}
          });
    };

    o.saveTask = function(task){
      if(task) o.task = task;
    };

    o.saveFriendInfo = function(name,email){
      //This function will send to server in future
      //$http
      if (name) o.friendName = name;
      if (email) o.friendEmail = email;
    };

    return o;
  }]);
