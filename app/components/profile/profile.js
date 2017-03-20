(function () {
    'use strict';

    angular
        .module('boknaden')
        .directive('bnProfile', [
            '$location',
            'AuthService',
            bnProfile
        ])

    function bnProfile ($location, AuthService) {
        return {
            restrict: 'A',
            templateUrl: 'app/components/profile/profile.html',
            link: function (scope, element, attrs) {
                scope.isAuthenticated = AuthService.isAuthenticated()
                scope.show = false
                scope.go = function (path) {
                    $location.path(path)
                }
                scope.logout = function () {
                    AuthService.logout()
                    scope.go('/login')
                }
            }
        }
    }

})();
