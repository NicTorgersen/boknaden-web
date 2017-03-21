(function () {
    'use strict'

    angular
        .module('boknaden')
        .controller('LoginCtrl', [
            '$scope',
            '$location',
            'AuthService',
            'growl',
            LoginCtrl
        ])

    function LoginCtrl ($scope, $location, AuthService, growl) {
        $scope.isAuthenticated = AuthService.isAuthenticated()
        if ($scope.isAuthenticated) {
            $location.path('/store')
        }

        $scope.login = true
        $scope.register = false

        var userDefault = {
            firstname: '',
            lastname: '',
            pass: 'lol123',
            pass2: '',
            username: 'nictorgersen',
            number: '',
            business: {
                isBusiness: false,
                businessName: '',
                businessNumber: '',
            }
        }

        $scope.user = userDefault

        function reset () {
            $scope.user = userDefault
        }

        function doLogin () {
            if ($scope.user.username.length > 0 && $scope.user.pass.length > 0) {
                if ($scope.user.username === userDefault.username && $scope.user.pass === userDefault.pass) {
                    AuthService.verify($scope.user.username, $scope.user.pass).then(function (response) {
                        $location.path('/store')
                    }, function (err) {
                        growl.error('Feil brukernavn eller passord', { title: 'Feil' })
                    })
                }
            }
        }

        function doForgotPassword () {
            
        }

        $scope.doLogin = doLogin
        $scope.doForgotPassword = doForgotPassword

        $scope.toggleLogin = function () {
            reset()
            $scope.login = !$scope.login
        }
        $scope.toggleRegister = function () {
            reset()
            $scope.register = !$scope.register
        }
    }

})()
