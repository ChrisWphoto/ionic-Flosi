angular.module('flosi.services', [])

.factory('User_Factory', ['$http', function($http){
    //for dev env quickly switching
    var remote = 'https://flosi-node.herokuapp.com';
    var localUrl = 'http://localhost:3000';

    var o ={
      username: false,
      email: false,
      task: false,
      friendName: false,
      friendEmail: false,
      taskCompleted: 0
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
