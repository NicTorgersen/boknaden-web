(function () {
    'use strict';

    angular
        .module('boknaden')
        .controller('ForgotPasswordCtrl', [
            '$scope',
            'store',
            '$location',
            'growl',
            'AdService',
            'AuthService',
            ForgotPasswordCtrl
        ])

    function ForgotPasswordCtrl ($scope, store, $location, growl, UserService) {
        $scope.username = ''

        $scope.doForgotPassword = function () {

            UserService.forgotPassword($scope.username)
        }
    }

})();
