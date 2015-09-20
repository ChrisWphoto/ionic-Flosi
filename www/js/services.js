angular.module('flosi.services', [])

.factory('User_Factory', function($http){
    var o ={
      username: false,
      email: false,
      task: false,
      friendName: false,
      friendEmail: false
    }

    o.authEmailName = function (name, email) {
      //This function will send to server in future
      //$http
      if (name) o.username = name;
      if (email) o.email = email;
    }

    o.saveTask = function(task){
      if(task) o.task = task;
    }

    o.saveFriendInfo = function(name,email){
      //This function will send to server in future
      //$http
      if (name) o.friendName = name;
      if (email) o.friendEmail = email;
    }

    return o;
  });
