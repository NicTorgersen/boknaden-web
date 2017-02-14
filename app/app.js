;(function() {

  angular
    .module('boknaden', [
      'ngRoute',
      'ngAnimate',
      'angular-storage',
      'ui.bootstrap',
    ])
    .config(config);

  config.$inject = ['$routeProvider', '$locationProvider', '$httpProvider', '$compileProvider'];

  function config($routeProvider, $locationProvider, $httpProvider, $compileProvider) {

    $locationProvider.html5Mode(false);

    // routes
    $routeProvider
      .when('/', {
        templateUrl: 'app/home/home.html',
        controller: 'HomeCtrl',
      })
      .when('/bookstore', {
          templateUrl: 'app/bookstore/bookstore.html',
          controller: 'BookstoreCtrl',
      })
      .otherwise({
        redirectTo: '/'
      });

    $httpProvider.interceptors.push('authInterceptor');

  }

  angular
    .module('boknaden')
    .factory('authInterceptor', authInterceptor);

  authInterceptor.$inject = ['$rootScope', '$q', '$location'];

  function authInterceptor($rootScope, $q, $location) {

    return {

      // intercept every request
      request: function(config) {
        config.headers = config.headers || {};
        return config;
      },

      // Catch 404 errors
      responseError: function(response) {
        if (response.status === 404) {
          $location.path('/');
          return $q.reject(response);
        } else {
          return $q.reject(response);
        }
      }
    };
  }

  angular
    .module('boknaden')
    .run(run);

  run.$inject = ['$rootScope', '$location'];

  function run($rootScope, $location) {

    // run on page load

  }


})();
