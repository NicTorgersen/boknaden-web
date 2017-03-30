(function () {
    'use strict';

    angular
        .module('boknaden')
        .controller('ForgotPasswordCtrl', [
            '$scope',
            'store',
            '$location',
            '$timeout',
            'growl',
            'UserService',
            ForgotPasswordCtrl
        ])

    function ForgotPasswordCtrl ($scope, store, $location, $timeout, growl, UserService) {
        $scope.username = ''
        $scope.sentConfirmation = false

        $scope.go = function (path) {
            $location.path(path)
        }

        $scope.doForgotPassword = function () {
            if ($scope.username.length > 0) {
                UserService.forgotPassword($scope.username).then(function (res) {
                    $scope.sentConfirmation = true
                    $scope.username = ''
                    $timeout(() => {
                        $location.path('/login')
                    }, 2500)
                })

            }
        }
    }

})();
