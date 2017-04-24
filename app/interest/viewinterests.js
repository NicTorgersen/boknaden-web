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
        $scope.aditems = []
        $scope.selectedAdItems = []
        $scope.isAuthenticated = AuthService.isAuthenticated()
        $scope.showSpinner = true

        reload()

        $scope.go = function (path) {
            $location.path(path)
        }

        $scope.calculateTotalPrice = function (aditems) {
            var price = 0
            for (var i = 0; i < aditems.length; i++) {
                price += aditems[i].price
            }
            return price
        }

        function reload () {
            var filterParams = {}

            if ($location.search().hasOwnProperty('course')) {
                filterParams.courseid = $location.search().course
            }

        }

    }

})();
