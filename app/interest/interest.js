(function () {
    'use strict';

    angular
        .module('boknaden')
        .controller('InterestCtrl', [
            '$scope',
            '$location',
            'growl',
            'AdService',
            'AuthService',
            InterestCtrl
        ])

    function InterestCtrl ($scope, $location, $routeParams, growl, AdService, AuthService) {
        if (!AuthService.isAuthenticated()) {
            $location.path('/store')
        }

        $scope.flyer = {}
        $scope.isAuthenticated = AuthService.isAuthenticated()
        $scope.showSpinner = true

        reload()

        $scope.go = function (path) {
            $location.path(path)
        }

        function reload () {
            AdService.get($routeParams.itemId).then(function (res) {
                $scope.showSpinner = false
                $scope.flyer = res.data
            }, function (err) {
                growl.error(err, {title: 'Error'})
            })
        }

    }

})();
