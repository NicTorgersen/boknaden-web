(function () {
    'use strict';

    angular
        .module('boknaden')
        .controller('AdStoreCtrl', [
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
        $scope.showSpinner = true

        reload()

        $scope.go = function (path) {
            $location.path(path)
        }

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

        function reload () {
            var filterParams = {}

            if ($location.search().hasOwnProperty('course')) {
                filterParams.courseid = $location.search().course
            }

            if ($location.search().hasOwnProperty('campus')) {
                filterParams.campusid = $location.search().campus
            }

            if ($location.search().hasOwnProperty('university')) {
                filterParams.universityid = $location.search().university
            }

            AdService.getAll(filterParams).then(function (res) {
                $scope.showSpinner = false
                $scope.flyers = res
            }, function (err) {
                growl.error(err, {title: 'Error'})
            })
        }

    }

})();
