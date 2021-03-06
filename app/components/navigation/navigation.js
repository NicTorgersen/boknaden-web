(function () {
    'use strict';

    angular
        .module('boknaden')
        .directive('bnNavigation', [
            '$location',
            'AuthService',
            bnNavigation
        ])

    function bnNavigation ($location, AuthService) {
        return {
            restrict: 'A',
            templateUrl: 'app/components/navigation/navigation.html',
            link: function (scope, element, attrs) {
                scope.isAuthenticated = AuthService.isAuthenticated()
                scope.showNav = false
                scope.go = function (path) {
                    $location.path(path)
                }
            }
        }
    }

})();
