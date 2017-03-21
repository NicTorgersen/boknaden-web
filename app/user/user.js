(function () {
    'use strict';

    angular
        .module('boknaden')
        .controller('ItemCtrl', [
            '$scope',
            '$routeParams',
            'store',
            '$location',
            'growl',
            'UserService',
            'AuthService',
            AdStoreCtrl
        ])

    function AdStoreCtrl ($scope, $routeParams, store, $location, growl, UserService, AuthService) {
        $scope.flyer = {}
        $scope.isAuthenticated = AuthService.isAuthenticated()
        $scope.showSpinner = true

        $scope.go = function (path) {
            $location.path(path)
        }

        UserService.get($routeParams.itemId).then(function (res) {
            $scope.showSpinner = false
            $scope.flyer = res.data
            console.log(res.data)
        }, function (err) {
            console.log(err)
            growl.error(err, {title: 'Error'})
        })
    }

})();
