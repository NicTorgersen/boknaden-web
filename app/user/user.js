(function () {
    'use strict';

    angular
        .module('boknaden')
        .controller('UserCtrl', [
            '$scope',
            '$routeParams',
            'store',
            '$location',
            'growl',
            'UserService',
            'AuthService',
            UserCtrl
        ])

    function UserCtrl ($scope, $routeParams, store, $location, growl, UserService, AuthService) {
        $scope.user = {}
        $scope.isAuthenticated = AuthService.isAuthenticated()
        $scope.showSpinner = true

        $scope.go = function (path) {
            $location.path(path)
        }

        UserService.get($routeParams.username).then(function (res) {
            $scope.showSpinner = false
            $scope.user = res.data
        }, function (err) {
            console.log(err)
            growl.error(err, {title: 'Error'})
        })
    }

})();
