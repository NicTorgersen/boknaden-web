(function () {
    'use strict';

    angular
        .module('boknaden')
        .controller('ItemCtrl', [
            '$scope',
            'store',
            '$location',
            'growl',
            'AdService',
            'AuthService',
            AdStoreCtrl
        ])

    function AdStoreCtrl ($scope, store, $location, growl, AdService, AuthService) {
        $scope.flyers = []

        $scope.isAuthenticated = AuthService.isAuthenticated()

        AdService.getAll().then(function (res) {
            console.log(res)
            $scope.flyers = res
        }, function (err) {
            growl.error(err, {title: 'Error'})
        })

        $scope.activateAdItem = function (flyer, aditem) {
            if (flyer.selectedAdItem.adItem.aditemid == aditem.aditemid) {
                flyer.selectedAdItem.active = false
                setActiveAdItem(flyer, {aditemid:0})
            } else {
                flyer.selectedAdItem.active = true
                setActiveAdItem(flyer, aditem)
            }
        }

        $scope.calculateTotalPrice = function (aditems) {
            let price = 0
            for (var i = 0; i < aditems.length; i++) {
                price += aditems[i].price
            }
            return price
        }

        function setActiveAdItem (flyer, aditem) {
            flyer.selectedAdItem.adItem = aditem
        }

        function calculateCustomerPrice (price) {
            $scope.priceCalculated = (price * 1.1).toFixed(2)
        }

        $scope.addingNew = false
    }

})();
