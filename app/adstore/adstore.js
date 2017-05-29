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
        $scope.context = {
            inSearchContext: false,
            filterParams: {
                page: 1,
            },
            hasNextPage: false
        }

        reload()

        $scope.go = function (path) {
            $location.path(path)
        }

        $scope.cancelFilter = function () {
            for (var prop in $location.search()) {
                $location.search(prop, null)
            }


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
            var price = 0
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
            if ($location.search().hasOwnProperty('course')) {
                $scope.context.filterParams.courseid = $location.search().course
                $scope.context.inSearchContext = true
            }

            if ($location.search().hasOwnProperty('campus')) {
                $scope.context.filterParams.campusid = $location.search().campus
                $scope.context.inSearchContext = true
            }

            if ($location.search().hasOwnProperty('university')) {
                $scope.context.filterParams.universityid = $location.search().university
                $scope.context.inSearchContext = true
            }

            AdService.getAll($scope.context.filterParams).then(function (res) {
                $scope.showSpinner = false
                $scope.flyers = res.ads
                $scope.context.filterParams.page++
                $scope.context.hasNextPage = res.hasNextPage
            }, function (err) {
                growl.error(err, {title: 'Error'})
            })
        }

        $scope.loadMore = function () {
            if ($scope.flyers.length > 0) {
                $scope.showSpinner = true
                AdService.getAll($scope.context.filterParams).then(function (res) {
                    $scope.flyers = $scope.flyers.concat(res.ads)
                    if (res.length > 0) {
                        $scope.context.filterParams.page++
                        $scope.context.hasNextPage = res.hasNextPage
                    }
                    $scope.showSpinner = false
                })
            }
        }

    }

})();
