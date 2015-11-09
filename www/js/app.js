// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('flosi', ['ionic', 'flosi.controllers', 'flosi.services'])


  .config(function($stateProvider, $urlRouterProvider) {


    $stateProvider


      .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'SplashCtrl'
      })

      .state('intro', {
        url: '/',
        templateUrl: 'templates/intro.html',
        controller: 'SplashCtrl'
      })

      .state('app.dashboard', {
        url: '/dashboard',
        views: {
          'menuContent': {
            templateUrl: 'templates/dashboard.html',
            controller: 'SplashCtrl'
          }
        }
      })
      .state('app.challenge', {
        url: '/challenge',
        views: {
          'menuContent': {
            templateUrl: 'templates/challenge.html',
            controller: 'DashboardCtrl'
          }
        }
      })

      .state('app.invite', {
        url: '/invite',
        views: {
          'menuContent': {
            templateUrl: 'templates/splash-3-friend.html',
            controller: 'SplashCtrl'
          }
        }
      })
      .state('app.secure', {
        url: '/secure',
        views: {
          'menuContent': {
            templateUrl: "templates/secure.html",
            controller: "SecureController"
          }
        }
      })


    $urlRouterProvider.otherwise('/');
})
