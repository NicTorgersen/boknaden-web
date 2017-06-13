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

        $scope.go = go

        $scope.checkUserBeforeInterest = function () {
            if (!AuthService.isAuthenticated()) {
                growl.info('Du må være innlogget for å bruke denne funksjonen.')
                return
            }

            if (!AuthService.isVerified()) {
                growl.info('Du må være verifisert for å bruke denne funksjonen. Sjekk e-posten din!')
                return
            }

            go('/item/' + $scope.flyer.adid + '/interest')
        }

        function go (path) {
            var location = $location.url()
            $location.path(path).search({return: location})
        }

        function calculateTotalPrice (aditems) {
            var price = 0
            if (aditems) {
                for (var i = 0; i < aditems.length; i++) {
                    price += aditems[i].price
                }
            }

            if (price === 0) {
                price = 'GRATIS'
            } else {
                price = 'Kr ' + price
            }

            return price
        }

        $scope.calculateTotalPrice = calculateTotalPrice
    }

})();
