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
          'angularSpinner',
          'angularAccounting'
        ])
        .config(config)

    config.$inject = ['$routeProvider', '$locationProvider', '$httpProvider', '$compileProvider', 'growlProvider', 'usSpinnerConfigProvider']

    function config($routeProvider, $locationProvider, $httpProvider, $compileProvider, $growlProvider, usSpinnerConfigProvider) {

        $growlProvider
            .globalTimeToLive(2500)
            .globalDisableIcons(true)
            .globalDisableCountDown(true)
            .globalPosition('bottom-right')

        $locationProvider.html5Mode(true)

        // routes
        $routeProvider
            .when('/login', {
                templateUrl: 'app/login/login.html',
                controller: 'LoginCtrl',
            })
            .when('/forgotpassword', {
                templateUrl: 'app/login/forgotpassword.html',
                controller: 'ForgotPasswordCtrl',
            })
            .when('/resetpassword/:code', {
                templateUrl: 'app/login/resetpassword.html',
                controller: 'ResetPasswordCtrl',
            })
            .when('/verify/:verificationcode', {
                templateUrl: 'app/user/verify.html',
                controller: 'VerifyUserCtrl',
            })
            .when('/store', {
                templateUrl: 'app/adstore/adstore.html',
                controller: 'AdStoreCtrl',
            })
            .when('/user/:username', {
                templateUrl: 'app/user/user.html',
                controller: 'UserCtrl',
            })
            .when('/item/new', {
                templateUrl: 'app/item/new.html',
                controller: 'NewItemCtrl',
            })
            .when('/item/mine', {
                templateUrl: 'app/adstore/mine.html',
                controller: 'MyAdsCtrl',
            })
            .when('/item/:itemId', {
                templateUrl: 'app/item/item.html',
                controller: 'ItemCtrl',
            })
            .when('/logs', {
                templateUrl: 'app/logs/logs.html',
                controller: 'LogsCtrl',
            })
            .otherwise({
                redirectTo: '/store',
            })

        $httpProvider.interceptors.push('authInterceptor')
        $httpProvider.defaults.headers.devare = { "Content-Type": "application/json;charset=utf-8" }

        usSpinnerConfigProvider.setDefaults({color: '#0075a1', radius:30, width:8, length: 16})

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
