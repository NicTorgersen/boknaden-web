(function () {
    'use strict';

    angular
        .module('boknaden')
        .controller('MyAdsCtrl', [
            '$scope',
            'store',
            '$location',
            'growl',
            'AdService',
            'AuthService',
            MyAdsCtrl
        ])

    function MyAdsCtrl ($scope, store, $location, growl, AdService, AuthService) {
        if (!AuthService.isAuthenticated()) {
            $location.go('/store')
        }

        reload()

        $scope.flyers = []
        $scope.activeFlyer = $location.search().active || null
        $scope.showSpinner = true

        $scope.deleteAd = function (adid) {
            AdService.deleteAd(adid).then(function (res) {
                reload()
            }, function (err) {
                console.log(err)
                growl.error("Det skjedde en feil under slettingen.", {title: "Sletting feilet"})
            })
        }

        $scope.go = function (path) {
            $location.path(path)
        }

        function setActiveAdItem (flyer, aditem) {
            flyer.selectedAdItem.adItem = aditem
        }

        function calculateCustomerPrice (price) {
            $scope.priceCalculated = (price * 1.1).toFixed(2)
        }

        function reload () {
            $scope.showSpinner = true

            AdService.getAdsForUser().then(function (res) {
                $scope.showSpinner = false
                $scope.flyers = res.data.ads
            }, function (err) {
                growl.error(err, {title: 'Error'})
            })
        }

    }

})();
