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
            '$timeout',
            'AdService',
            'AuthService',
            AdStoreCtrl
        ])

    function AdStoreCtrl ($scope, $routeParams, store, $location, growl, $timeout, AdService, AuthService) {
        $scope.flyer = {}
        $scope.isAuthenticated = AuthService.isAuthenticated()
        $scope.showSpinner = true

        AdService.get($routeParams.itemId).then(function (res) {
            $scope.showSpinner = false
            $scope.flyer = res.data
        }, function (err) {
            console.log(err)
            growl.error(err.toString(), {title: 'Error'})
        })

        $scope.go = function (path) {
            var location = $location.url()
            $location.path(path).search({return: location})
        }

        function calculateTotalPrice (aditems) {
            let price = 0
            if (aditems) {
                for (var i = 0; i < aditems.length; i++) {
                    price += aditems[i].price
                }
            }
            return price
        }

        $scope.calculateTotalPrice = calculateTotalPrice
    }

})();
