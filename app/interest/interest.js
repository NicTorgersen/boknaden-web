(function () {
    'use strict';

    angular
        .module('boknaden')
        .controller('InterestCtrl', [
            '$scope',
            '$location',
            '$routeParams',
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
        $scope.showSpinner = true
        $scope.selectedAdItems = []
        $scope.itemId = $routeParams.itemId

        reload()

        $scope.go = function (path) {
            $location.path(path)
        }

        function reload () {
            AdService.get($scope.itemId).then(function (res) {
                console.log(res.data.aditems)
                $scope.showSpinner = false
                $scope.flyer = res.data
            }, function (err) {
                growl.error(err, {title: 'Error'})
            })
        }

    }

})();
