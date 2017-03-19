(function () {
    'use strict';

    angular
        .module('boknaden')
        .controller('AdStoreCtrl', [
            '$scope',
            'store',
            '$location',
            'AdService',
            'AuthService',
            AdStoreCtrl
        ])

    function AdStoreCtrl ($scope, store, $location, AdService, AuthService) {
        $scope.flyers = []

        $scope.isAuthenticated = AuthService.isAuthenticated()

        AdService.getAll().then(function (res) {
            console.log(res)
            $scope.flyers = res.data.ads
        })

        $scope.calculateTotalPrice = function (aditems) {
            let price = 0
            for (var i = 0; i < aditems.length; i++) {
                price += aditems[i].price
            }
            return price
        }

        function calculateCustomerPrice (price) {
            $scope.priceCalculated = (price * 1.1).toFixed(2)
        }

        $scope.addingNew = false
    }

})();
