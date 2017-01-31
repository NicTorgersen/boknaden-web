(function () {
    'use strict';

    var app = angular.module('boknaden')

    app.directive('bnLoginRegister', [bnLoginRegister])

    function bnLoginRegister () {
        return {
            restrict: 'A',
            templateUrl: 'app/components/loginRegister/loginRegister.html',
            controller: bnLoginRegisterCtrl,
        }
    }

    function bnLoginRegisterCtrl ($scope, $location, store) {
        $scope.login = true
        $scope.register = false

        var userDefault = {
            firstname: '',
            lastname: '',
            pass: '123456',
            pass2: '',
            email: 'test@mail.com',
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
            if ($scope.user.email.length > 0 && $scope.user.pass.length > 0) {
                if ($scope.user.email === userDefault.email && $scope.user.pass === userDefault.pass) {
                    store.set('token', {token: '1234'})
                    $location.path('/bookstore')
                }
            }
        }

        $scope.doLogin = doLogin

        $scope.toggleLogin = function () {
            reset()
            $scope.login = !$scope.login
        }
        $scope.toggleRegister = function () {
            reset()
            $scope.register = !$scope.register
        }
    }

})();
