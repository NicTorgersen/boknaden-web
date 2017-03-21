(function() {

    angular
        .module('boknaden', [
          'ngRoute',
          'ngAnimate',
          'angular-storage',
          'ui.bootstrap',
          'angular-jwt',
          'angular-growl',
          'angularMoment',
          'ksSwiper',
          'angularSpinner'
        ])
        .config(config)

    config.$inject = ['$routeProvider', '$locationProvider', '$httpProvider', '$compileProvider', 'growlProvider']

    function config($routeProvider, $locationProvider, $httpProvider, $compileProvider, $growlProvider) {

        $growlProvider
            .globalTimeToLive(2500)
            .globalDisableIcons(true)
            .globalDisableCountDown(true)
            .globalPosition('bottom-right')

        $locationProvider.html5Mode(false)

        // routes
        $routeProvider
            .when('/login', {
                templateUrl: 'app/login/login.html',
                controller: 'LoginCtrl',
            })
            .when('/store', {
                templateUrl: 'app/adstore/adstore.html',
                controller: 'AdStoreCtrl',
            })
            .when('/item/new', {
                templateUrl: 'app/item/new.html',
                controller: 'NewItemCtrl',
            })
            .when('/item/:itemId', {
                templateUrl: 'app/item/item.html',
                controller: 'ItemCtrl',
            })
            .otherwise({
                redirectTo: '/store'
            })

        $httpProvider.interceptors.push('authInterceptor')

    }

    angular
        .module('boknaden')
        .factory('authInterceptor', authInterceptor)

    authInterceptor.$inject = ['$rootScope', '$q', '$location']

    function authInterceptor($rootScope, $q, $location) {

        return {

            // intercept every request
            request: function(config) {
                config.headers = config.headers || {}
                return config
            },

            // Catch 404 errors
            responseError: function(response) {
                if (response.status === 404) {
                    $location.path('/')
                    return $q.reject(response)
                } else {
                    return $q.reject(response)
                }
            }
        }
    }

    angular
        .module('boknaden')
        .run(run)

    run.$inject = ['$rootScope', '$location', 'amMoment']

    function run($rootScope, $location, amMoment) {
        amMoment.changeLocale('nb')
    }


})()
