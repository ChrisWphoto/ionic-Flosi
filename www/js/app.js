// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('flosi', ['ionic', 'flosi.controllers', 'flosi.services'])


  .config(function($stateProvider, $urlRouterProvider) {


    $stateProvider


      .state('intro', {
        url: '/',
        templateUrl: 'templates/intro.html',
        controller: 'SplashCtrl'
      })

      .state('start', {
        url: '/start',
        templateUrl: 'templates/splash.html',
        controller: 'SplashCtrl'
      })

      .state('start-task', {
        url: '/start-task',
        templateUrl: 'templates/splash-2-task.html',
        controller: 'SplashCtrl'
      })

      .state('start-friend',{
        url: '/start-friend',
        templateUrl: 'templates/splash-3-friend.html',
        controller: 'SplashCtrl'
      })

      .state('dashboard', {
        url: '/dashboard',
        templateUrl: 'templates/dashboard.html',
        controller: 'DashboardCtrl'
    })
      .state('start-invite', {
        url: '/start-invite',
        templateUrl: 'templates/splash-invite.html',
        controller: 'SplashCtrl'
      })

    $urlRouterProvider.otherwise('/');
})
