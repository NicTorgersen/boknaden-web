(function () {
    'use strict';

    angular
        .module('boknaden')
        .controller('ResetPasswordCtrl', [
            '$scope',
            'store',
            '$location',
            '$routeParams',
            'growl',
            'UserService',
            ResetPasswordCtrl
        ])

    function ResetPasswordCtrl ($scope, store, $location, $routeParams, growl, UserService) {
        $scope.showSpinner = true
        $scope.passwordConfirmed = false

        UserService.verifyCode($routeParams.code).then(function (res) {
            $scope.showSpinner = false
            if (!res.data.success) {
                $location.path('/login')
            }
        })

        $scope.password = ''
        $scope.password2 = ''

        $scope.go = function (path) {
            $location.path(path)
        }

        $scope.doResetPassword = function () {
            if ($scope.password === $scope.password2) {
                $scope.showSpinner = true
                UserService.resetPassword($scope.password).then(function (res) {
                    if (res.data.success) {
                        $scope.showSpinner = false
                        $scope.passwordConfirmed = true
                    }
                })
            }
        }
    }

})();
