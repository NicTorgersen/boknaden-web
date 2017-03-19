(function () {
    'use strict';

    angular
        .module('boknaden')
        .directive('bnNavigation', [
            'AuthService',
            bnNavigation
        ])

    function bnNavigation (AuthService) {
        return {
            restrict: 'A',
            templateUrl: 'app/components/navigation/navigation.html',
            link: function (scope, element, attrs) {
                scope.isAuthenticated = AuthService.isAuthenticated()
                scope.show = false
            }
        }
    }

})();
