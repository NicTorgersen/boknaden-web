(function () {
    'use strict';

    angular
        .module('boknaden')
        .controller('ForgotPasswordCtrl', [
            '$scope',
            'store',
            '$location',
            'growl',
            'UserService',
            ForgotPasswordCtrl
        ])

    function ForgotPasswordCtrl ($scope, store, $location, growl, UserService) {
        $scope.username = ''
        $scope.sentConfirmation = false

        $scope.doForgotPassword = function () {
            if ($scope.username.length > 0) {
                UserService.forgotPassword($scope.username).then(function (res) {
                    $scope.sentConfirmation = true
                })

            }
        }
    }

})();
